# Submodules


We're combining GitHub and CMake to allow us to use libraries from GitHub repositories. We'll also talk about options and variables. We're already linking our own library, but we want to add another library.

For submodules and CMake in general, you probably want to use a gitignore for CMake, which ignores a lot of the artifacts and you want to ignore your build folder.

We'll clone the GLFW github repo which has to do with OpenGL

## Adding a submodule

```bash
git submodule add https://github.com/glfw/glfw.git external/glfw
```
Add it as a submodule. We'll put it in a folder called external.
This is useful because if you're going to clone multiple libraries
we can put it in `external` folder e.g. `external/opencv`.