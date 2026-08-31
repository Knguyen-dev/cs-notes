# Colcon Explained
```bash
sudo apt install python3-colcon-common-extensions
```
colcon is the build tool for ROS. A ROS workspace is a directory with a particular structure. It typically has a `src` subdirectory, which conatins the source code of the ROS package(s). colcon perofrms "out-of-source builds". By default, it creates the following directories are peers of the `src` directory:
- **`build`:** where intermediate files are stored. Each package will generate a subfolder that invokes CMake. 
- **`install`:** Directory where each package is installed inot. By default each package is installed into a separate subdirectory inside this folder.
- **`log`:** Contains various logging info about each colcon invocation.

## Creating a Workspace
```bash
# Create an example directory
mkdir -p ./ros2_ws/src
cd ./ros2

# Clone repo omtp ./src/examples and checkout the 'jazzy' branch
git clone https://github.com/ros2/examples src/examples -b jazzy
```
- **Underlay (Base)**: the main ROS 2 installation (e.g., install at `/opt/ros/jazzy`. It provides all the core depencendies, libraries, and tools that our project is going to use.
- **Overlay (`ros2_ws`):** Our workspace. When we cloned examples into `/src/examples`, the ROS packages in that repo also become part of our workspace. 

In ROS 2, building a package doesn't just compile the code, it copies the executables, config files, and scripts into an `install` folder. This process of copying those build artifacts into the `install` folder is called **installing**. ROS needs everything to be in this specific folder so it can find/run our nodes.
```bash
colcon build --symlink-install
```
If you modify a source code file, you'd need to rebuild the build artifacts and copy (install) them into the `install` directory. We'd have to call `colcon build` each time we make changes. That's unavoidable, but what if you're modifying files that aren't compiled by nature?

The `--symlink-install` flag allows installed files to be changed by changing the files in the `source` space (e.g., Python files or other non-compiled) for faster iteration. You no longer have to rebuild the entire workspace when changing a python file or something like that. After the build is finished, we'd have `build`, `install`, and `log` directories.

## Running Tests
```bash
colcon test
```

## Source the Environmnet
When colcon builds successfully, its output is in the `install` directory. Before we can use the executables or libraries, we'll need to add them to our path and library paths. colcon generates bash/bat files in `install` that help setup the environment:
```bash
source install/setup.bash

# Terminal 1: Run subscriber
ros2 run examples_rclcpp_minimal_subscriber subscriber_member_function

# Terminal 2: Run publisher
ros2 run examples_rclcpp_minimal_publisher publisher_member_function
```
After sourcing the environment, we can run the executables built by colon. 

## Create Your Own Package
colcon uses `package.xml`. You can use `ros2 pkg create` to create a new package based on a template. We'll discuss more about this later.

## Setup colcon_cd
The `colcon_cd` command lets you quickly change the CWD of your shell to the directory of ap ackage. For example `colcon_cd <some_ros_package>` quickly changes our CWD to the directory `~/ros2_ws/src/some_ros_package`. To setup `colcon_cd`, run the below commands:
```bash
echo "source /usr/share/colcon_cd/function/colcon_cd.sh" >> ~/.bashrc
echo "export _colcon_cd_root=/opt/ros/jazzy/" >> ~/.bashrc
```

## Setup `colcon` mixins
Various command line options are tedious to write or difficult to remember. For example, to change the CMake build type to debug, you'd typically use:
```bash
colcon build --cmake-args -DCMAKE_BUILD_TYPE=Debug
```

To make common command line options easier, we can create shortcuts: