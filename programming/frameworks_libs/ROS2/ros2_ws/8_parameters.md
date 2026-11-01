# Explaining ROS Parameters 
Our nodes may need parameters that can be set from a launch file. First we'll create a new package `cpp_parameters`, and add `rclcpp` as a dependency (I mean yeah).
```bash
ros2 pkg create --build-type ament_cmake --license Apache-2.0 cpp_parameters --dependencies rclcpp
```
The package.xml and CMakeLists.txt will be populated with the dependencies that we listed after our `--dependencies` flag.

## Examining the Code
We create a parameter with the name `my_parameter` with default value of `world`. Its type is inferred from the default value as a string. The callback gets the parameter `my_parameter` from the node, and stores it in `my_param` (local scope). We log the event and `set_parameters will set parameter `my_parameter` back to the default value `world`.`In case the user changes the parameters externally (e.g., the launch file), the parameter is always reset to the original value. The callback to query the parameter happens every second.

## Add ParameterDescriptor (Optional)
Optionally, we can set a descriptor for the parameter. Descriptors let us specify a text description of the parameter and its constraints. For example, making them read-only, specifying a numerical range, etc.
```bash
ros2 param describe /minimal_param_node my_parameter
```
The above shows the type of the parameter and its description.

## Build and Run
```bash
# Terminal 1
# 1. Install workspace dependencies 
# 2. Build cpp_parameters and the packages it relies on
rosdep install -i --from-path src --rosdistro jazzy -y
colcon build --packages-select cpp_parameters

# Terminal 2
source install/setup.bash
ros2 run cpp_parameters minimal_param_node
```