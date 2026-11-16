# C++ Service Clients & Servers

## Step 1: Create a Package
```bash
# In ros2_ws/src
ros2 pkg create --build-type ament_cmake --license Apache-2.0 cpp_srvcli --dependencies rclcpp example_interfaces
```
We'll create a package called `cpp_srvcli`. The `--dependencies` flag automatically adds the `rclcpp` and `example_interfaces` as dependencies to our package. It automatically updates the `package.xml` and `CMakeLists.txt` of `cpp_srvcli`.
```txt
int64 a
int64 b
---
int64 sum
```
The `example_interfaces` package contains the above `.srv` file, allowing us to easily structure our requests and responses.

## Step 2: Update package.xml
Since we used `--dependencies` option using package creation, we don't have to manually add the dependencies to our `package.xml` or `CMakeLists.txt`. However, still ensure that you add a description, maintainer email and name, and license information in the `package.xml`.

## Step 3: Write the Service Node
Let's examine `ros2_ws/src/cpp_srvcli/src`. The `add` function adds two integers from the request and gives the sum to the response. All while logging the status using the logs.
```cpp
// Initialize ROS 2 C++ client library
rclcpp::init(argc, argv);

// Creates a node named "add_two_ints_server"; service server
std::shared_ptr<rclcpp::Node> node = rclcpp::Node::make_shared("add_two_ints_server");

// Creates a service named "add_two_ints" for that node
// Automatically advertise/expose the 'add_two_ints' endpoint 
// and register the callback that triggers when serving this endpoint
rclcpp::Service<example_interfaces::srv::AddTwoInts>::SharedPtr service = node->create_service<example_interfaces::srv::AddTwoInts>("add_two_ints", &add);

// Log when ready, and spins the node; making the service available.
RCLCPP_INFO(rclcpp::get_logger("rclcpp"), "Ready to add two ints.");
rclcpp::spin(node);
rclcpp::shutdown();
```

## Step 4: Write Client Node
```cpp
std::shared_ptr<rclcpp::Node> node = rclcpp::Node::make_shared("add_two_ints_client");
rclcpp::Client<example_interfaces::srv::AddTwoInts>::SharedPtr client =
    node->create_client<example_interfaces::srv::AddTwoInts>("add_two_ints");
```
First we'll create a node that acts as the service client. Then we'll create `client`, a specific service for that node. Notice how a single node can potenitally be a service client for multiple different services if needed.
```cpp
auto request = std::make_shared<example_interfaces::srv::AddTwoInts::Request>();
request->a = atoll(argv[1]);
request->b = atoll(argv[2]);
```
We'll create a request object for the `AddTwoInts` service. Again this is defined by some `.srv` file. A while loop client checks for available service server nodes in the network. If we can't find any, we'd log and pause for 1 second. Then we try again. Finally we send a request to the service server that's available.

## Step 5: CMakeLists
```CMake
cmake_minimum_required(VERSION 3.5)
project(cpp_srvcli)

# Install dependencies
find_package(ament_cmake REQUIRED)
find_package(rclcpp REQUIRED)
find_package(example_interfaces REQUIRED)

add_executable(server src/add_two_ints_server.cpp)
ament_target_dependencies(server rclcpp example_interfaces)
add_executable(client src/add_two_ints_client.cpp)
ament_target_dependencies(client rclcpp example_interfaces)

install(TARGETS server client DESTINATION libs/${PROJECT_NAME})
ament_package()
```
Add executables, link dependencies to executables, and install the binaries into a place in the package that ROS2 can find.

## Step 6: Build and Run
```bash
# In terminal 1 (ros2_ws): Building Project
# a. Check for missing dependencies
# b. Build only the 'cpp_srvcli' package
rosdep install -i --from-path src --rosdistro jazzy -y
colcon build --packages-select cpp_srvcli

# In Terminal 2 (ros2_ws): Running Service Server Node
# a. Sources setup files
# b. Run the service server node
source install/setup.bash
ros2 run cpp_srvcli server

# In Terminal 3 (ros2_ws): Running Service Client Node
# a. Sources setup files
# b. Run the service client node with clargs
source install/setup.bash
ros2 run cpp_srvcli client 2 3
```