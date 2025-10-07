
# - adder: name of the library
# - adder.cpp and adder.h define the library
# this by default builds a static library
add_library(adder adder.cpp adder.h)

# The CMakeLists.txt here allows us to compile our 
# adder library separate from our main executable. Allowing us 
# to work on them separately. Then in our main project, we can have 
# target_link_libraries(main PRIVATE adder), to indicate we're looking for the 
# "adder" library that we defined here.
