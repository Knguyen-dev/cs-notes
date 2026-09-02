# More Interfaces
Previously, we learned how to create custom msg and srv interfaces. While it's best practice to declare interfaces in dedicated interface packages, sometimes it's more convenient to declare, create, and use an interface all in one package. We'll create a `more_interfaces` package.

## Create a msg file
```
uint8 PHONE_TYPE_HOME=0
uint8 PHONE_TYPE_WORK=1
uint8 PHONE_TYPE_MOBILE=2

string first_name
string last_name
string phone_number
uint8 phone_type
```
Inside `more_interfaces/msg`, we'll create `AddressBook.msg` that's meant to carry info about a person. We define constants for the different phone number types, and then we define the message's fields: `first_name`, `last_name`, `phone_number,` and `phone_type`.

## Build a msg file
```xml
<buildtool_depend>rosidl_default_generators</buildtool_depend>
<exec_depends>rosidl_default_runtime</exec_depend>
<member_of_group>rosidl_interface_packages</member_of_group>
```
We'll generate source code for using that msg file by adding ROS 2's IDL to our `package.xml` and `CMakeLists.txt`. At build time, we need `rosidl_default_generator` and at runtime we only need `rosidl_default_runtime`. Well add those dependencies and so similar stuff in our `CMakeLists.txt`:
```CMake
# 1. Get package for generating code from interface definition files.
# 2. Declare a list of message files we want to generate code for.
find_package(rosidl_default_generators REQUIRED)
set(msg_files "msg/AddressBook.msg")

# 3. Configure to generate your list of files
# 4. "Export" the runtime dependency
rosidl_generate_interfaces(${PROJECT_NAME}
    ${msg_files}
)
ament_export_dependencies(rosidl_default_runtime)
```
At this point, you're read yto generate source files from the message definition files.

## Publisher Code & Build
In `more_interfaces/src` we'll have a `publish_address_book.cpp`. We'll create a node with with an `AddressBook` publisher instance that publishes `AddressBook` messages to the `address_book` topic. We defined `publish_msg`, which is a callback function that creates, populates, and publishes an `AddressBook` message object to the topic. We setup a timer that publishes this message to the topic every second.
```CMake
find_package(rclcpp REQUIRED)

add_executable(publish_address_book src/publish_address_book.cpp)
ament_target_dependencies(publish_address_book rclcpp)

install(TARGETS
    publish_address_book
  DESTINATION lib/${PROJECT_NAME})
```

## Link Against the Interface
```CMake
rosidl_get_typesupport_target(cpp_typesupport_target
  ${PROJECT_NAME} rosidl_typesupport_cpp)

target_link_libraries(publish_address_book "${cpp_typesupport_target}")
```
To use the messages generated in the same package, we need to use the above CMake code. It simply finds the relevant generated C++ code from `AddressBook.msg` and lets our target link against it. This step isn't needed when the interfaces we used were from a different package and built independently. The above CMake config is only required when we want to use interfaces in the same package as the one they are defined in.

## Build and Package
```bash
# Terminal 1 (ros2_ws)
colcon build --packages-up-to more_interfaces

# Terminal 2 (ros2_ws)
. install/local_setup.bash
ros2 run more_interfaces publish_address_book

# Terminal 3 (ros2_ws)
. install/setup.bash
ros2 topic echo /address_book
```