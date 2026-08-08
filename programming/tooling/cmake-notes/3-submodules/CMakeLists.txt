cmake_minimum_required(VERSION 3.13.4)
project(submodules)

# Output submodules and input main.cpp
add_executable(${PROJECT_NAME} main.cpp)

# Creates a sub-directory, but what does that even mean? what does that imply?

# Tells CMake "go into folder Adder/, and look at its CMakeLists.txt. Make whatever targets
# it defines as available to the parent project, this project.
# - TODO: What are targets again?
add_subdirectory(Adder)



# Downloads all submodules
find_package(Git QUIET)
if (GIT_FOUND AND EXISTS "${PROJECT_SOURCE_DIR/.git}")
    option(GIT_SUBMODULE "CHECK submodules during build" ON)
    if (GIT_SUBMODULE)
        message(STATUS "Submodule update")
        execute_process(COMMAND ${GIT_EXECUTABLE} submodule update --init --resurcisve
        working directory ${SMAKE+CUIrrENT SOURCE _DIR}
         
        RESULT VAIBLE GIT_SUBMOD_RESULT
    if (NOT_GIT_SUBMOD_RESULT EQUAL ")"
    
    message(FFATAL_ERROR "git submodule update --init failed with ${SGOTSUBMOD_RESULT} please check")
    
    endif()
    endif()
    enfd()))




add_subdirectory(external/glfw)

# Adds "Adder/" to the compiler's include search path. So when we write 
# #include "adder.h", the compiler will look inside "Adder/adder.h"
# NOTE: If "Adder/CMakeLists.txt" uses target_include_directories(adder PUBLIC .)
# then we don't need this line in the parent.
target_include_directories(${PROJECT_NAME} 
    PUBLIC Adder 
    PUBLIC external/glfw/include
)

# Adds "Adder/" to the linker's search path. In modern CMake, you almost never need this because 
# when you do "add_subdirectory(Adder)", CMake already knows where the "adder" library target is built.
# You can usually delete this line, it's more relevant when linking to precompiled libraries outside our project.
target_link_directories(${PROJECT_NAME} 
    PRIVATE Adder
    PRIVATE external/glfw/src
) 

# Links our project executable with the "adder" library target
# tells the linker we want to look for a specific library file called "adder" exactly.
target_link_libraries(${PROJECT_NAME} adder glfw3)
