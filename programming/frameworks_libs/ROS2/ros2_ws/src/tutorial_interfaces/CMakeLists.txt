cmake_minimum_required(VERSION 3.8)
project(tutorial_interfaces)

if(CMAKE_COMPILER_IS_GNUCXX OR CMAKE_CXX_COMPILER_ID MATCHES "Clang")
  add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# a. One of our service files depended on this; get target
# b. Need to isntall the IDL code generator.
find_package(geometry_msgs REQUIRED)
find_package(rosidl_default_generators REQUIRED)

rosidl_generate_interfaces(
    ${PROJECT_NAME}
    "msg/Num.msg"
    "msg/Sphere.msg"
    "srv/AddThreeInts
    DEPENDENCIES geometry_msgs # Add packages the above depend on
)

ament_package()
