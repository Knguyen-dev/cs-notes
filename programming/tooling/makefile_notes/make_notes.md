# Makefile

**Build Systems** organize the steps to build your code. Automate the linking and compilation of your source code in order to get those final executables. You shouldn't really be typing out the commands every time. In a team of many developers, everyone needs to be able to build the code in the same way. 
- **Organize/Automate:** Automate the compilation and linking of source files into executables
- **Rebuild necessary files:** Recompile only the changed portion of the source code, and the portions dependent on the changed code.
- **Make maintenance better:** The build sysetm should be a programming language that allows us to avoid redundant code.

**Note:** You can run any shell script in your Makefile. Docker commands, git commands, etc. When running commands, the command you run will echo in the terminal alongside the result of that command. You can prepend `@` in front of you command to prevent echoing and reduce terminal clutter.

## Types of Variable Assignment

**Simple Assignment (Fixed Values)**
```makefile
BACKEND_SRC := $(shell find backend -type f -name '*.go')
```
The `:=` (colon-equals) notation is called simple variable assignment. It is different from `=` (recursive assignment). When we use `:=`, the right hand side is evaluated immediately and assigned to the variable. As a result the value won't change if the environment or files change later. The command is executed the moment the line is executed. The result (list of `.go` files in `backend/`) is assigned once to `BACKEND_SRC`. Even if new files are added later, `BACKEND_SRC` won't update.

**Conditional Assignment (Default Variable Values)**
```makefile
PORT?=8080
run-server:
	@./$(SERVER).out $(PORT)
```
If you call `make run-server`, the command will run with the default variable value `PORT=8080`. Otherwise, you can overwrite it e.g., `make run-server PORT=5173`.

**When to use each `:=` vs. `=`**
- Use `:=` when you want to evaluate once and store the result.
- Use `=` when you want it to be recomputed each time it's used.

## Explaining `.PHONY` in Makefiles
In a Makefile, `.PHONY` is a special target that tells `make` that the specified targets are "phony" targets. This means they do not correspond to actual files with those names.
- **Prevents Conflicts with Files:** If you have a file named `up`, `down`, `build`, or `deploy` in your directory, `make` would normally assume that the target `up` (for example) refers to that file. If the file exists and is newer than its dependencies (or has no dependencies), `make` might not run the commands associated with the `up` target. By declaring `up` as `.PHONY`, you tell `make` to always execute the commands for the `up` target, regardless of whether a file named `up` exists or its timestamp.
- **Improves Performance (Minor):** For phony targets, `make` doesn't need to check for the existence or modification times of files, which can slightly speed up the build process, though this is a minor benefit compared to preventing conflicts.

In your Makefile, targets like `up`, `down`, `restart`, `logs`, `shell`, `frontend`, `deploy`, and `build` are declared as `.PHONY`. This ensures that when you run `make up`, `make build`, `make deploy`, etc., the associated commands are always executed, even if a file with the same name happens to exist in your project directory.

## Automatic Variables
- **Target (`$@`):** The target being generated, this is the left side of the colon.
- **All Prerequisites (`$^`):** All pre-reqs (all files the target depends on), which is on the right side of the colon.
- **First Prereq Only (`$<`):** First prerequisite only, indicated by the first item on the right side of the colon.
- **Pattern Matcher (`%`):** This is a pattern matcher, a wildcard for filenames. This can exist on both sides.

### Example 1: The Target (`$@`)
```makefile
build_report.pdf: data.csv template.tex
  @echo "Generating $@..."
  pandoc $^ -o $@
```
Here `$@` is equivalent to `build_report.pdf`, so the `echo` will output "Generating build_report.pdf" (our build target). Additionally, we see that the `pandoc` package uses the pre-requisite (the right side) as input filepaths and then outputs `build_report.pdf` as a pdf file.

### Example 2: All Prerequisites (`$^`)
```makefile
# Suppose OBJECTS = main.o graphics.o audio.o physics.o
# make game_engine is equivalent to:
# gcc -o game_engine main.o graphics.o audio.o physics.o
game_engine: $(OBJECTS)
  $(CC) $(LDFLAGS) -o $@ $^
```
Imagine we're linking several independent modules into one final program. `$^` grabs the files listed after the colon. 

### Example 3: First Prerequisite (`$<`)
```makefile
main.o: main.c header.h functions.h
  $(CC) $(CFLAGS) -c $< -o $@
```
Compiling an individual source file that depends on headers. While a `.o` file depends on the `.c` file and several `.h` file, we only want to pass the `.c` file to the compiler command. Even though three files are prerequisites, we only pick `main.c` to be associated with the `-c` source code flag.

### Example 4: Pattern Matcher (`%`)
```makefile
# Handles all .jpg to .webp conversions
assets/webp/%.webp: assets/images/%.jpg
  magick $< $@
```
The pattern matcher is typically used to create factory for similar tasks. It's not a variable, but a wildcard. It allows one rule to handle hundreds of files.
1. If you ask for `assets/webp/hero.webp`, Make sees the `%` and matches the string `hero`.
2. It then looks for the prerequisite `assets/images/hero.jpg`.
3. Then `$@` becomes `assets/webp/hero.webp` and `$<` becomes `assets/images/hero.jpg`.

You write one rule instead of writing a separate block for every single image in your project.

## Credits
- [Learn make in 60 seconds - Jacob Sorber](https://www.youtube.com/watch?v=a8mPKBxQ9No)
- [Makefiles: 95% of what you need to know - Gabriel Parmer](https://youtu.be/DtGrdB8wQ_8?si=Pf2l8HR-h-knd8RU)
