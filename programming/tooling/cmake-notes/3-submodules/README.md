# Submodules


Allow us to use libraries from GitHub repositories. We'll also talk about options and variables. We're already linking our own library, but we want to add another library.

For submodules and CMake in general, you probably want to use a gitignore for CMake, which ignores a lot of the artifacts and you want to ignore your build folder.

We'll clone the GLFW github repo which has to do with OpenGL

## Adding a submodule

```bash
# Clones it as a submodule in the 'external' folder call it 'glfw'.
git submodule add https://github.com/glfw/glfw.git external/glfw
```
Add it as a submodule. We'll put it in a folder called external.
This is useful because if you're going to clone multiple libraries
we can put it in `external` folder e.g. `external/opencv`.

Please stage and commit the changes after adding the submodule.


So when you clone the project, it doesn't automatically get those submodules. You have to do:
```bash
git submodule update --init --recursive
```
But then you can simply include this command right into your cmake when someone tries to build your project.

```bash

find
```