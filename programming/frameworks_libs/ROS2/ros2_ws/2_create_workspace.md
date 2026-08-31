# Creating A Workspace
Again, a workspace is just a driectory containing ROS 2 packages. Before using ROS 2, you'd source your ROS 2 installation workspace in the terminal you plan to work in. In general, put any packages in your workspace into the `src` directory. 
```bash
# Copy into 'src' dir
git clone https://github.com/ros/ros_tutorials.git
```
Now `ros_tutorials` is cloned in our workspace.

- **`COLCON_IGNORE`:** A file that marks ROS 2 packages that shouldn't be built.

## Resolving Dependencies
`rosdep` (ROS Dependency Manager) is a CLI tool used in ROS to find, download, and install dependencies for ROS packages. When we download source code for a ROS 2 package, that code often relies on: External C++ libraries, Python package,s and other system tools/drivers. `rosdep` automates the process of finding those external libraries and dependencies. Here's how it works:
1. **Reading `package.xml`:** Every ROS 2 package contains a file called `package.xml`. This file lists everything the package needs to run/build.
2. **Mapping Dependencies:** `rosdep` scans your workspace's `src` folder, reads all the `package.xml` files, and compares them against its master database.
3. **Installing:** It figures out which dependencies are missing on your system and uses your OS's package manager to install them automatically.

Without `rosdep`, building a complex robotics probject with various different dependencies would be significantly more difficult. 
```bash
sudo apt-get install python3-rosdep

# NOTE: Put this in ~/.bashrc 
export ROS_OS_OVERRIDE=ubuntu:noble
sudo rosdep init
rosdep update
rosdep install --from-paths src --ignore-src -y --skip-keys "fastcdr rti-connext-dds-6.0.1 urdfdom_headers"

# Install dependencies
rosdep install -i --from-path src --rosdistro jazzy -y
```

## Build Workspace with colcon
```bash
colcon build
```
After installing dependencies, you should be able to build your workspace ("building your project") without any issues.
After building, you should have build, install, log, and src.

## Source Overlay
```bash
# Source main ROS 2 installation
source /opt/ros/jazzy/setup.bash

# Source local/project-specific setup file
source install/setup.bash
```
Before sourcing the overlay, it's very important that you create a new terminal, separate from the one where you built the workspace. Sourcing an overlay within the same terminal where you built (or vice versa), can create complex issues. In the new terminal, source your main ROS 2 installation as the "underlay" that your overlay builds on. Again if you already setup your `~/.bashrc` file, then this isn't needed.
- Sourcing the `local_setup` of the overlay only adds the packages available in the overlay to your environment.
- Sourcing the `ros2_ws`'s `setup` sources the overlay and underlay, so it does both. 

**Why Two Terminals?**
- Terminal 1 (Builder): Dedicated to compiling code and running `colcon build --symlink-install`. During a build, files are actively being created, modified, or overwritten in our `build` and `install` directories.
- Terminal 2 (Runner): Used to `source` our setup files and actually run the ROS 2 nodes via `ros2 run ...`

If we try to build our workspace and run our nodes in the exact same terminal window, we'd run into a few major issues:
- **File Locking & Race Conditions:** While `colcon build --symlink-install` is actively writing new binaries and libraries to our `install` folder, our running nodes may try to read those exact same files. This cna cause the compiler to throw weird errors, crash our nodes, and corrupt our build.
- **Stale Environment Variables:** Sourcing an overlay inject.specific paths to your terminal's memory. If you rebuild your code after sourcing it in the same window, the shell can hold onto outdated paths, meaning your changes won't properly show up when you try to execute them.