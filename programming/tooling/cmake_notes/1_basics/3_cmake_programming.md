# CMake Progarmming 

```CMake
if(variable)
    # If variable is `ON`, `YES`, `TRUE`, `Y`, or non zero number
else()
    # If variable is `0`, `OFF`, `NO`, `FALSE`, 
    # `N`, `IGNORE`, `NOTFOUND`, `""`, or ends in `-NOTFOUND`
endif()
# If variable does not expand to one of the 
# above, CMake will expand it then try again

if("${variable}")
    # True if variable is not false-like
else()
    # Note that undefined variables would be `""` thus false
endif()
```
CMake has an if-statement. You can often refer to variables directly by name or using the `${}` notation. 

## CMake Functions
```CMake
function(my_func RESULT_VAR)
    # Sets the variable named in RESULT_VAR in the caller's scope
    set(${RESULT_VAR} "Hello from function" PARENT_SCOPE)
endfunction()

my_func(MY_VAR)
message("Result: ${MY_VAR}") # Output: Result: Hello from function
```
You can also define your own CMake functions or macros, whether the former has a variable scope. Meaning any variable you define in your function is local to that function, vanishing whenever it ends.

Other than that, after you define your functions, you can call them anywhere within CMake. You can add extra positional arguments and there's more stuff you can do with this.