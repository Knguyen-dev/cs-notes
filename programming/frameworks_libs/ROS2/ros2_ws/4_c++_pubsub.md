# C++ Pub/Sub

The goal is to create and a pub/sub nodes using C++. Nodes are processes that communicate over the ROS graph. Nodes pass information in the form of string messages to each other over a network. 

# Create A Publisher
## Step 1: Create A Package
```bash
# In workspace root
cd src && ros2 pkg create --build-type ament_cmake --license Apache-2.0 cpp_pubsub
```
Then navigate to `ros2_ws/src/cpp_pubsub/src` since this is where we'll write our source files.

## Step 2: Writer Publisher Node
```cpp
#include <chrono>
#include <memory>
#include <string>
#include "rclcpp/rclcpp.hpp"
#include "std_msgs/msg/string.hpp"

using namespace std::chrono_literals;
```
Let's look at `publisher_lambda_function.cpp`. At the top, we see ROS2 header `rclcpp/rclcpp.hpp`, whihc exposes the common ROS2 API. Then `std_msgs/msg/string.hpp`, which includes ROS2's built-in message type (again not a custom message, a built-in, minimal message data type) we'll use to publish data.
```cpp
class MinimalPublisher : public rclcpp::Node
```
We then create the `MinimalPublihser` class by inheriting from `rclcpp::Node`. Our public constructor names the node `minimal_publisher` and initializezs `count_` to 0. The publisher is initialized with the `String` message type, the topic name `topic`, and given a queue with a maximum size of 10 before it starts dropping publisher messages.

We create a callback `timer_callback` which performs a reference capture of the current object `this`. The function creates a ROS2 message of type `String`, populates its `data` field with your message, and publishes the message to the topic IDed by `topic`. The `RCLCPP_INFO` macro logs each published message to the console. We register `timer_callback` to executes every 500ms, and `timer_` is just the timer object/handle for that registration.
```cpp
private:
    rclcpp::TimerBase::SharedPtr timer_;
    rclcpp::Publisher<std_msg::msg::String>::SharedPtr publisher_;
    size_t count_;
```
Then it's the timer/callback, pointer to publisher object, and a count tracking the number of messages that have been published so far.

`main` is where the node actually executes. The `rclcpp::init` initializes ROS2. `rclcpp::spin` starts running an infinite loop to process data from the node.
- TODO: What? rclcpp::spin starts processing data from the node? What node the publisher? The only reason i have an inkling of what this does is this. "Spinning" means running on the CPU, just like normal, as opposed to some kind of sleep-signal-wakeup mechanism used in concurrent programming. Then I can reason, okay this just runs this node in a while loop until shutdown. Other than that, we see that `rclcpp` API needs a shared pointer to our publisher, and here we do default constructor.

On shutdown, we stop spinning and run a shutdown script.

## Step 3: Add Dependencies
```xml
<depend>rclcpp</depend>
<depend>std_msgs</depend>
```
Well edit the `ros2_ws/src/cpp_pubsub`'s `package.xml`, filling in `<description>`, `<maintainer>`, and `<license>` tags. After `ament_cmake` buildtool dependency, we'll paste the above lines. This declares the package needs `rclcpp` and `std_msgs` when its code is built and executed.

## Step 4: Update CMakeLists.txt
```CMake
find_package(rclcpp REQUIRED)
find_package(std_msgs REQUIRED)

add_executable(talker src/publisher_lambda_function.cpp)
ament_target_dependencies(talker rclcpp std_msgs)

install(TARGETS talker DESTINATION lib/$(PROJECT_NAME))
```
1. Add the packages/dependencies that you listed in section 2.2
2. Create your executable. Here it's `talker`, which consists of one source file.
3. Link the executable against its dependencies (libraries) `rclcpp` and `std_msgs`. 
4. Install target into a predictable destination folder. I don't remember what install originally does in CMake but I think this just copies a target into a directory.
5. Finally cleanup the `CMakeLists.txt` by cutting down on unnecessary garbage:

```CMake
cmake_minimum_required(VERSION 3.5)
project(cpp_pubsub)

# Default to C++14
if (NOT_CMAKE_CXX_STANDARD)
    set(CMAKE_CXX_STANDARD 14)
endif()

# If using GNU g++ or Clang, add compiler flags.
if (CMAKE_COMPILER_IS_GNUCXX OR CMAKE_CXX_COMPILER_ID MATCHES "Clang")
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

find_package(ament_cmake REQUIRED)
find_package(rclcpp REQUIRED)
find_package(std_msgs REQUIRED)

add_executable(talker src/publisher_lambda_function.cpp)
ament_target_dependencies(talker rclcpp std_msgs)
install(TARGETS talker DESTINATION lib/$(PROJECT_NAME))

ament_package()
```

# Create A Subscriber

## Step 1: Write Subscriber Node
Lets examine `subscriber_lambda_function.cpp`. It inherits from `rclcpp::Node` with name `minimal_subscriber`. We register a callback function that reference captures `this`, and  expects parameter `std_msgs::msg::String::UniquePtr`. The subscriber node expects a `String` message object to be sent from the publisher.

The callback itself parses the message and logs the message it has received. Finally we actually subscribe to the topic named `topic`, and register that callback function to trigger each time we receive a message. Again `subscription_` is a handle to the subscription object we created when we subscribed to the topic with that callback.

## Step 2: Dependencies and CMakeLists?
```CMake
add_executable(listener src/subscriber_lambda_function.cpp)
ament_target_dependencies(listener rclcpp std_msgs)
install(TARGETS talker listener DESTINATION libs/${PROJECT_NAME})
```
This file depends on the same stuff as the publisher node, so there's nothing new to add to `package.xml`. However in our `CMakeLists.txt`, we'll create a new exectable, link it to the libraries, and install it so that it's visible to ROS2. Now both talker and listener are installed in libs/${PROJECT_NAME}, allowing ROS2 to find both.

## Step 3: Build and Run Project
We likely already have rclcpp and std_msgs installed as part of our ROS 2 system. But it's always good practice to run `rosdep` at the workspace root to check for missing dependencies before building.

```bash
# In terminal 1, at workspace root (ros2_ws)
# a. Install dependencies 
# b. Build cpp_pubsub package
rosdep install -i --from-path src --rosdistro jazzy -y
colcon build --packages-select cpp_pubsub --symlink-install

# In terminal 2, at workspace root
# a. Source project files
# b. In the 'cpp_pubsub' package, run the 'talker' node.
source ./install/setup.bash
ros2 run cpp_pubsub talker

# In terminal 3, at workspace root
# a. Source project files again
source ./install/setup.bash
ros2 run cpp_pubsub listener
```
