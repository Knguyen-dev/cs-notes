# Downloading Projects
Until CMake 3.11, we mainly downloaded projects at build time. In contrast, downloading projects at configure time is the modern approach, done via the built-in `FetchContent` CMake module. Though Shreiner thinks submodules work so extremely well.

FetchContent (CMake 3.14+) is a CMake module for downloading packages or data at configure time. Here's the main points:
- **`FetchContent_Declare`:** Registers the metadata (repository URL, git tag, commit hash, etc.) telling CMake where and how to retrieve the dependency. It doesn't download files or run any CMake scripts.
- **`FetchContent_MakeAvailable`:** Downloads and populates the dependency (if it hasn't been fetched already) and immediately adds it to our build using `add_subdirectory()`. The targets defined inside hte fetched project's `CMakeLists.txt` are created and made available (accessible) to our top-level build/`CMakeLists.txt`.

```CMake
include(FetchContent)

# 1. No targets exist yet — just defines retrieval rules
FetchContent_Declare(
  fmt
  GIT_REPOSITORY https://github.com/fmtlib/fmt.git
  GIT_TAG        10.2.1
)

# 2. Downloads fmt, calls add_subdirectory(), and creates the 'fmt::fmt' target
FetchContent_MakeAvailable(fmt)

# 3. Target is now ready to link
target_link_libraries(my_app PRIVATE fmt::fmt)
```

## Old Pattern 
Historically, when FetchContent was introduced in CMake 3.11, we didn't have a single built-in command to both fetch code and add it to our project. We'd write the following boilerplate code instead of `FetchContent_MakeAvailable`:
```CMake
FetchContent_Declare(googletest GIT_REPOSITORY ...)

# Check if the library has already been downloaded
FetchContent_GetProperties(googletest)
if(NOT googletest_POPULATED)
    # Download the files
    FetchContent_Populate(googletest)
    
    # Add it to the build tree manually
    add_subdirectory(${googletest_SOURCE_DIR} ${googletest_BINARY_DIR})
endif()
```
So if you see this in legacy codebases, just know that it's basically an older equivalent of `FetchContent_MakeAvailable`.