# Defining Custom .msg and .srv Files!


## Create New Package
Let's define custom interface files (`.msg` and `.srv) files. We'll create these custom files in their own package and then using them from a separate package. But both packages should be in the same workspace.
```bash
# In ros2_ws/src
ros2 pkg create --build-type ament_cmake --license Apache-2.0 tutorial_interfaces

# In ro2_ws/src/tutorial_interfaces package we just made.
mkdir msg srv
```
We'll create a package called `tutorial_interfaces`, which is an ament_cmake package. The `.msg` and `.srv` files must be placed in directories called `msg` and `srv`.

## Message Definition
In `tutorial_interfaces/msg/`, create a `Num.msg` file with the below contents:
```
int64 num
```
A custom message called `Num`, which has one field:
- **`num`:** An int64
```
geometry_msgs/Point center
float64 radius
```
A custom message called `Sphere`, which contain two fields: 
- **`center`:** A custom message of type `Point`, obtained from the `geometry_msgs` package.
- **`radius`:** A double-precision floating point representing the radius of the sphere.


## Service Definitions
```
int64 a
int64 b
int64 c
---
int64 sum
```
In `tutorial_interfaces/srv/`, we'll create a service file `AddThreeInts.srv`. A service that requests a message object containing 3 integers:  `a`, `b`, and `c`. The response message object has the an integer field `sum`, 

## CMakeLists and `package.xml`
```CMake
# a. One of our service files depended on this; get target
# b. Need to isntall the IDL code generator.
find_package(geometry_msgs REQUIRED)
find_package(rosidl_default_generators REQUIRED)

rosidl_generate_interfaces(
    ${PROJECT_NAME}
    "msg/Num.msg"
    "msg/Sphere.msg"
    "srv/AddThreeInts.srv
    DEPENDENCIES geometry_msgs # Add packages the above depend on
)
```
To convert the interfaces we've defined into language-specific code (e.g., C++ or Python), we'll add the above lines to our `CMakeLists.txt`. It should be noted that the first argumnet (library name) must start with the name of the package (i.e. `${PROJECT_NAME}`).
```xml
<depend>geometry_msgs</depend>
<buildtool_depend>rosidl_default_generators</buildtool_depend>
<exec_depend>rosidl_deafult_runtime</exec_depend>
```
- **`<depend>`:** A convenient catch-all tag. It tells the build system that your package needs this dependency to both build the code and to run it later. It's required at compile and runtime.
- **`<buildtool_depend>`:** Used for tools that are strictly required while building the package, rather than libraries that your code links against. For example, code generators, compilers, build system extensions (like `rosidl_default_generators`) go here since they create files during the compilation phase, but aren't needed at runtime. For example, `rosidl_default_generators` generates the language-specific code/classes during build time, but once it's done we don't need it anymore. It's needed at build-time but unnecessary whilst running
- **`<exec_depend>`:** A runtime dependency. This includes libraries, message definitions, or Python modules that your code imports and uses whilst it's actively running. 
- **`<test_depend>`:** A dependency required only when running tests. Such as when running unit/integration tests, but also when running your code linters.
- **`<export>`:** A wrapper used to pass custom info or config settings to external tools that read your `package.xml` (like the `colcon` build system ro other ROS packages).
- **`<build_type>`:** A setting in the `<export>` block that tells `colcon` how your package is written and how it should be built. The value `ament_cmake` is for C++ packages using CMake. The `ament_python` is for pure Python packages. Without this, the build system wouldn't know which compiler or plugin to use when you run `colcon build`.

## Build `tutorial_interfaces` Package
```bash
# Terminal 1: At workspace root ros2_ws
colcon build --packages-select tutorial_interfaces

# Terminal 2: At workspace root ros2_ws
# a. Source the package.
# b. Verify that the messages/service were created. 
source install/setup.bash
ros2 interface show tutorial_interfaces/msg/Num
ros2 interface show tutorial_interfaces/msg/Sphere
ros2 interface show tutorial_interfaces/srv/AddThreeInts
```

## Testing Num.msg with pub/sub
```cpp
#include <chrono>
#include <memory>

#include "rclcpp/rclcpp.hpp"
#include "tutorial_interfaces/msg/num.hpp"                                            // CHANGE

using namespace std::chrono_literals;

class MinimalPublisher : public rclcpp::Node
{
public:
  MinimalPublisher()
  : Node("minimal_publisher"), count_(0)
  {
    publisher_ = this->create_publisher<tutorial_interfaces::msg::Num>("topic", 10);  // CHANGE

    auto timer_callback = [this](){
      auto message = tutorial_interfaces::msg::Num();                                   // CHANGE
      message.num = this->count_++;                                                     // CHANGE
      RCLCPP_INFO_STREAM(this->get_logger(), "Publishing: '" << message.num << "'");    // CHANGE
      publisher_->publish(message);
    };
    timer_ = this->create_wall_timer(500ms, timer_callback);
  }

private:
  rclcpp::TimerBase::SharedPtr timer_;
  rclcpp::Publisher<tutorial_interfaces::msg::Num>::SharedPtr publisher_;             // CHANGE
  size_t count_;
};

int main(int argc, char * argv[])
{
  rclcpp::init(argc, argv);
  rclcpp::spin(std::make_shared<MinimalPublisher>());
  rclcpp::shutdown();
  return 0;
}
```
The big change is that we stopped using the message object provided by `std_msgs` and started using service and messages that were defined in our own package. Instead of including `std_msgs`, we'll include the corresponding `tutorial_interfaces/msg/...` and `tutorial_interfaces/srv/...`.
- **NOTE:** `rclcpp/rclcpp.hpp` is a convenience header as it pulls the entire `rclcpp` API. Every translation unit it includes is compiled against features it never uses. In practice, prefer including only the headers of for the specific APIs you use. For example, `rclcpp::Node` is declared in `rclcpp/node.hpp`, `rclcpp::spin` in `rclcpp/executor.hpp`, etc. Notice that we aren't importing from std_msgs anymore, but rather using the message type that's defined in our own package (`tutorial_interfaces`).

## Updating CMakeLists.txt and `package.xml` with `tutorial_interfaces`
Since we're using an interface from our own package, we include our own package as a dependency so we'd update our: CMakeLists.txt and package.xml. First is the `CMakeLists.txt`:
```CMake
#...
find_package(ament_cmake REQUIRED)
find_package(rclcpp REQUIRED)
find_package(tutorial_interfaces REQUIRED)                      # CHANGE

add_executable(talker src/publisher_lambda_function.cpp)
ament_target_dependencies(talker rclcpp tutorial_interfaces)    # CHANGE

add_executable(listener src/subscriber_lambda_function.cpp)
ament_target_dependencies(listener rclcpp tutorial_interfaces)  # CHANGE

install(TARGETS
  talker
  listener
  DESTINATION lib/${PROJECT_NAME})

ament_package()
```
Notice that we added `tutorial_interfaces` as a dependency and had our executables link against the `tutorial_interfaces` target. Then below in our `package.xml`, we include our new dependency:
```xml
<depend>tutorial_interfaces</depend>
```

## TDLR
Then the idea is that you'd be able to selectively build/run the package that uses tutorial_interfaces as a package. 