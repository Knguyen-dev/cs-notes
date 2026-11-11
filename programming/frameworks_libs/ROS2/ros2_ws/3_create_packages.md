# Creating ROS Packages
A ROS 2 package is a unit for your ROS 2 code. If you want to be able to install your code or share it with others, then you'll need to organize it in a package. Via packages, you can release your ROS 2 work and let others build/use it easily. Package creation in ROS 2 uses the "ament" build system and colcon as the build tool. You can create a package using CMake or Python as both are officially supported, but other build types exist as well. ROS 2 Python and CMake packages have their own minimum required contents.

**ROS 2 Package Contents: CMake**
- `CMakeLists.txt` file that describes how to build the code within the package.
- `include/<package_name>` directory containing public headers for the package.
- `package.xml` file containing metadataabout the package.
- `src` directory containing the source code for the package.

**ROS 2 Package Contents: Python**
- `package.xml` file containing metadataabout the package.
- `resource/<package_name>` marker file for the package.
- `setup.cfg` is required when a package has executables, so `ros2 run` can find them.
- `setup.py` containing instructions for how to install the package.
- `<package_name>` a directory with the same naem as our package, used by ROS 2 tools to find our package. It contains a `__init__.py`.

## Packages In A Workspace
A single workspace can contain many packages, each in its own folder. We can have packages of different build types within a given workspace (CMake, Python, etc). However we can't have packages nested within other packages. In general, we create packages within our `src` directory, keeping the top-level workspace clean. Below is the generalized structure of a ROS 2 workspace:
```
workspace_folder/
    src/
      cpp_package_1/
          CMakeLists.txt
          include/cpp_package_1/
          package.xml
          src/

      py_package_1/
          package.xml
          resource/py_package_1
          setup.cfg
          setup.py
          py_package_1/
      ...
      cpp_package_n/
          CMakeLists.txt
          include/cpp_package_n/
          package.xml
          src/
```

## Step 1: Create a Package
```bash
# ros2 pkg create --build-type ament_cmake --license Apache-2.0 <my_package_name>
ros2 pkg create --build-type ament_cmake --license Apache-2.0 --node-name my_node my_package
```
Ensure you're in the `src` folder and then run the above command to create a package. There are some optional arguments:
- **`--node-name`:** Generates a template file (typically a "Hello World" program) inside our package. This is quite useful as instead of manually creating a source file, writing basic boilerplate structure, and setting up entry poitns from scratch, ROS 2 writes a skeleton script for us. This lets us test building and running a node immediately.
- **`--license`:** Injects your chosen OSS license into your package's metadata file (`package.xml`) and template files.

## Step 2: Build a Package
With many packages in a given workspace, we can build many packages at once via `colcon build` at the workspace root. A lot better than building each package individually. We can also selectively build packages like below:
```bash
colcon build --packages-select my_package
```

## Step 3: Use the Package
1. Open a separate terminal from the one we built the workspace with. We'll run the remaining commands in this terminal.
2. Do `source install/local_setup.bash`
3. Use the package and run the executable: `ros2 run my_package my_node`

## Step 4: Customize `package.xml`
When creating your package in your first terminal, notice that your package description and license aren't automatically set. You need to fill these out if you ever want to release your package. The `maintainer` field may also need to be filled in. You'd go to `ros2_ws/src/my_package/package.xml` to edit it.