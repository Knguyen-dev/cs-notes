# Running Commands: Build and Configure Time

Remember, CMake is not a compiler or build system itself, but rather a build system generator. Therefore our project goes through two distinct phases.

Configure time happens when we first run `cmake -B build`. During this phase, CMake executes our `CMakeLists.txt`. 
- It inspects our system, finding compilers, packages, etc. 
- It evaluates control flow logic
- Finally it'll generate the native build files into our build directory using whatever build system we have setup e.g., Makefile, Ninja, or Visual Studio related.

At this point, no C++ code has been compiled yet. The second phase is build time, which happens hwen we run `cmake --build build` or invoke our native tool directly (e.g., `make` or `ninja`).

## Running a command at Configure Time
Use `execute_process` to process and access the results. Typically, avoid hard coding your program paths into CMake. Just use stuff like `find_program`, `find_package()`, etc. to access the command you want to run. Then use `RESULT_VARIABLE` to check the return code and `OUTPUT_VARIABLE` to get the output.
```CMake
find_package(Git QUIET)

if(GIT_FOUND AND EXISTS "${PROJECT_SOURCE_DIR}/.git")
    execute_process(COMMAND ${GIT_EXECUTABLE} submodule update --init --recursive
                    WORKING_DIRECTORY ${CMAKE_CURRENT_SOURCE_DIR}
                    RESULT_VARIABLE GIT_SUBMOD_RESULT)
    if(NOT GIT_SUBMOD_RESULT EQUAL "0")
        message(FATAL_ERROR "git submodule update --init --recursive failed with ${GIT_SUBMOD_RESULT}, please checkout submodules")
    endif()
endif()
```
The above script updates all git submodules.