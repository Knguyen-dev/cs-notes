# General Testing Information

## Explaining CTest
CTest is the builtin "testing driver" packaged with CMake. It doesn't write or run test logic itself, but acts as a test runner and orchestrator. It finds and executes the compiled test executables created by CMake, tracks whether by passed based on exit codes, and prints a summary report. Let's review the step by step process from bottom to top:
```CMake
cmake_minimum_required(VERSION 3.19)
project(MyTestProject CXX)

# 1. Enable testing (creates CTest infrastructure and BUILD_TESTING option)
include(CTest)

# Only define tests if BUILD_TESTING is ON
if(BUILD_TESTING)
  # 2. Define the test executable target
  add_executable(simple_test test_main.cpp)

  # 3. Register the test with CTest
  add_test(NAME RunSimpleTest COMMAND simple_test)
endif()
```
1. **Framework Level (e.g., GoogleTest):** Defines assertions like `EXPECT_EQ()` or ASSERT_TRUE()`, and compiles into a runnable test binary.
2. **CMake Level:** Builds those binaries via `add_executable()` and registers those executables with CTest via `add_test(NAME <name> COMMAND <executable>)`.
3. **CTest Level:** Discovers the registered tests, runs them in paralell if requested (e.g., `ctest -j4`), enforces timeouts, collects pass/fail results, and prints them out to the console.


## Enabling Testing Support
```CMake
include(CTest)

# Or similar:
enable_testing()
```
Both functions enable CTest support in our project, but work slightly differently:
- **`enable_testing()`:** Enables test generation for the current directory and all subdirectories beneath it. It creates intenral configuration files (`CTestTestFile.cmake`) required for the `ctest` CLI to work.
- **`include(CTest)`:** Calls `enable_testing()` internally and adds extra built-in CMake options and targets. First, it creates the `BUILD_TESTING` cache variable (defaulting to `ON`), allowing developers to toggle tests on or off via CMake options or presets. Second, it adds standard testing targets to your build system (e.g., `Experimental`, `Nightly`, etc.) and dashboard build targets. It's the standard for modern CMake projects and it's the recommended convention over calling `enable_testing()` directlry

Overall, when testing is enabled and we configure our project:
1. **Test Registration:** Calls to `add_test()` write entries into `CTestTestfile.cmake` in our build directory.
2. **Command Activation:** Running `ctest` in the build folder reads the `CTestTestfile.cmake`.
3. **Execution:** CTest invokes each test binary. If the executable exits with code 0, CTest marks the test as passed. Otherwise, it's marked as failed.

## Guarding Tests for Top-Level Builds Only
When users add your project as a dependency (via `add_subdirectory` or `FetchContent`), they usually only want to run thier own tests, not yours. To prevent your unit tests from building when your project is consumed as a dependency, wrap `add_subdirectory(tests)` in a check.
```CMake
# Only include tests if this project 
# is being built standalone (top-level)
if (CMAKE_PROJECT_NAME STREQUAL PROJECT_NAME) 
    add_subdirectory(tests)
endif()
```
`CMAKE_PROJECT_NAME` is the name set by the top-level `project()` command, and this has global scope across the entire build. In contrast, `PROJECT_NAME` is set by the most recent `project()` command, and it's local to the current directory or module scope.

When we build the project directly, both `CMAKE_PROJECT_NAME` and `PROJECT_NAME` are identical, so `add_subdirectory(tests)` executes. Therefore, tests will be built when the top-level `CMakeLists.txt` project builds. In contrast, when another project includes our code, the `CMAKE_PROJECT_NAME` is set by an outer/top-level CMakeLists file, whilst `PROJECT_NAME` is set my the current directory's CMakeLists file. Therefore, they differ, and so `tests` is not added as a subdirectory, preventing our testing code from being built with their project.

# GoogleTest Test Framework
GoogleTest and GoogleMock are classic choices for testing. They follow Google's development philosophy, dropping old compilers quickly, assuming users want to live at the HEAD commit (of what?), etc. GoogleMock can have a somewhat steeper learning curve to get "matchers".

## FetchContent Method
```CMake
# Import FetchContent
include(FetchContent)

# Configuration the 'googletest' installation
FetchContent_Declare(
  googletest
  GIT_REPOSITORY https://github.com/google/googletest.git
  GIT_TAG        v1.17.0
)

# Install googletest and make it a subdirectory
FetchContent_MakeAvailable(googletest)
```
This creates targets `GTest::gtest`, `GTest::gtest_main`, `GTest::gmock`, and `GTest::gmock_main`. You can also get the same stuff via `find_package()`.

## Submodule Method
```bash
git submodule add --branch=v1.17.x https://github.com/google/googletest.git extern/googletest
```
The above installs GoogleTest as a submodule to our repo.
```CMake
if (CMAKE_PROJECT_NAME STREQUAL PROJECT_NAME)
    option(PACKAGE_TESTS, "Build the tests" ON)
endif()

if (PACKAGE_TESTS)
    enable_testing()
    include(GoogleTest)
    add_subdirectory(tests)
endif()
```
Then in the /tests subdirectory, we'll have to update its `CMakeLists.txt` file like so:
```
add_subdirectory("${PROJECT_SOURCE_DIR}/extern/googletest" "extern/googletest")
```
The test portion of our project adds googletest itself as a subdirectly/dependency. Of course we'd have to include a variable `PROJECT_SOURCE_DIR` to get the pathing correct. The rest of the snippets keep your CMake cache clean and support IDE Integration:
```CMake
mark_as_advanced(
    BUILD_GMOCK BUILD_GTEST BUILD_SHARED_LIBS
    gmock_build_tests gtest_build_samples gtest_build_tests
    gtest_disable_pthreads gtest_force_shared_crt gtest_hide_internal_symbols
)

set_target_properties(gtest PROPERTIES FOLDER extern)
set_target_properties(gtest_main PROPERTIES FOLDER extern)
set_target_properties(gmock PROPERTIES FOLDER extern)
set_target_properties(gmock_main PROPERTIES FOLDER extern)
```

