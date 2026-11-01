
# Git Submodules 
```bash
# Clones a repo as a submodule into extern folder
# and names the repo "repo".
git submodule add <https-link-for-git-repo> extern/repo
```
Allows us to use libraries by directly importing the GitHub repositories themselves. Typically, we'd stage and commit after adding the submodule to maintain proper version control history. The `extern` folder will contain all our submodules. When inside the submodule, we can treat it like a normal repo, and when in the parent repo, we can change the submodule's commit pointer.

## Cloning the Repo
**Approach 1: Standard**
```bash
git submodule update --init --recursive
```
When someone clones the project, they won't automatically clone those submodules. They'll have to do the above command after git cloning your project.

**Approach 2: Good** 
```CMake
find_package(Git QUIET)
if(GIT_FOUND AND EXISTS "${PROJECT_SOURCE_DIR}/.git")
# Update submodules as needed
    option(GIT_SUBMODULE "Check submodules during build" ON)
    if(GIT_SUBMODULE)
        message(STATUS "Submodule update")
        execute_process(COMMAND ${GIT_EXECUTABLE} submodule update --init --recursive
                        WORKING_DIRECTORY ${CMAKE_CURRENT_SOURCE_DIR}
                        RESULT_VARIABLE GIT_SUBMOD_RESULT)
        if(NOT GIT_SUBMOD_RESULT EQUAL "0")
            message(FATAL_ERROR "git submodule update --init --recursive failed with ${GIT_SUBMOD_RESULT}, please checkout submodules")
        endif()
    endif()
endif()

if(NOT EXISTS "${PROJECT_SOURCE_DIR}/extern/repo/CMakeLists.txt")
    message(FATAL_ERROR "The submodules were not downloaded! GIT_SUBMODULE was turned off or failed. Please update submodules and try again.")
endif()
```
First, check for Git Using CMake's built-in `FindGit.cmake` module. Run a command to get all repositories, handling an error wtih a human-readable error message. Finally verify that all repos exist before continuing. Everything is done!

## Updating a Submodule
When we edit code inside `extern/repo`, Git treats `extern/repo` as an independent Git repository. 
- To save changes inside the submodule, we must `cd` into `extern/repo`, commit our changes, and push them to the submodule's remote server.
- To update the parent project, we must return to the parent repo and stage the updated pointer (`git add extern/repo` followed by `git commit`).

If we edit files in the submodules without creating a commit inside the submodule, CMake running `git submodule update` might overwrite our uncommitted work, or fail.


## `add_subdirectory()` Explained
In CMake, `add_subdirectory(dirname)` tells CMake to enter a specified folder, look for a `CMakeLists.txt` inside, and process its build instructions as part of the main project build. The result? We automatically configure/build internal subprojects alongside our main target. 

**What's the Motivation?**
- **Modularization:** You can break a massive `CMakeLists.txt` into multiple smaller, folder-specific CMakeLists files. This makes the build system far easier to read, maintain, and navigate.
- **Monorepos and Dependencies:** If your project includes internal libraries, modules, dependencies in subfolders, then `add_subdirectory()` builds them automatical as part of building our main project. The result should be that someone can clone your repo, and building your project also installs/builds all other dependencies it relies on, everything runs out of the box.
- **Shared State:** Compiler flags, build types (Debug/Release), and target options set in the root script naturally propagate down into the subdirectories. This ensures every piece of code in the codebase builds under the exact same toolchain settings.


**Avoid adding as a subdirectory when:**
- The library is heavy, has slow builds, and complex dependencies we don't need.
- The library doesn't use CMake (e.g., Makefiles, pre-built binaries, etc.)
- The library creates target name collisions or modifies global CMake variables unexpectedly.

If `add_subdirectory()` works, then it's usually the cleanest way to integrate the library since now linking is as simple as:
```CMake 
target_link_libraries(your_target PRIVATE repo_target)
```

## Tracking Git Versions
```CMake
execute_process(
    # Outputs short 7-character SHA-1 hash of current commit
    COMMAND ${GIT_EXECUTABLE} rev-parse --short HEAD
    # Ensures git runs from repo root
    WORKING_DIRECTORY "${CMAKE_CURRENT_SOURCE_DIR}"
    # Saves output into CMake variable 'PACKAGE_GIT_ROOT`.
    OUTPUT_VARIABLE PACKAGE_GIT_VERSION
    ERROR_QUIET
    # Removes trailing newlines in git output, clean string.
    OUTPUT_STRIP_TRAILING_WHITESPACE
)
```
This captures the current commit hash of your repository into the CMake variable `PACKAGE_GIT_VERSION`. This strategy of embedding the git commit hash into your binary is quite normal, especially if we're doing debugging and versioning. Then to pass the version number into our C++ code. TO use `${PACKAGE_GIT_VERSION}` inside our C++ code, we have a couple of options.

**Approach 1: Preprocessor Definition (Quickest)**
```CMake
target_compile_definintions(<target-name> PRIVATE GIT_COMMIT_HASH="${PACKAGE_GIT_VERSION}")
```
Then in our C++ code:
```cpp
#include <iostream>

int main() {
    std::cout << "App Version (Git Commit): " << GIT_COMMIT_HASH << '\n';
}
```

**Approach 2: Generated Header File (Best Practice)**
Create a generated header to prevent forcing a full rebuild of targets when only the commit hash changes. First create a template named `version.h.in` and `#include` it in your target's source file(s).
```cpp
// In version.h.in
#pragma once
#define GIT_COMMIT_HASH "@PACKAGE_GIT_VERSION@"

// In target's source file
#include "version.h"
#include <iostream>

int main() {
    std::cout << "Commit: " << GIT_COMMIT_HASH << '\n';
    return 0;
}
```
Then configure the header file in the `CMakeLists.txt`:
```CMake
configure_file(
    "${CMAKE_CURRENT_SOURCE_DIR}/version.h.in"
    "${CMAKE_CURRENT_BINARY_DIR}/version.h"
)

# Ensures target can find the generated header file
target_include_directories(
    <target-name>
    PRIVATE
    "${CMAKE_CURRENT_BINARY_DIR}"
)
```
