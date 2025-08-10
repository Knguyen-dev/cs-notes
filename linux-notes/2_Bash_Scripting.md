# Bash Shell Scripting 

## What is Bash and why learn it
A shell language. Basically you're creating programs that you can execute on your Unix-based OS. It's the most used shell and it's been popular for a while. However there are some downsides, as it lacks some features, doesn't support OOP, and there are always newer tools. However it's still useful and having a basic knowledge of being able to read them will come in handy in the tech world.

The main use for bash scripting is being able to automate processes and execute multiple commands very quickly. Imagine wanting to execute tens or even hundreds of commands, and you want to do that every morning. You're not going to type that stuff out, but rather you're going to create a script file that contains these commands. And that's what people really like about bash scripting, as it makes running commands a lot easier.

## So where do we write bash scripts?
Before we used nano to write our bash scripts. There are various different ways to do this. Before we used cat, and also nano. However, you could also use other text editors, one popular one being vim, but you could also use Visual Studio Code as well. Here's how you setup stuff on Vscode.

1. Download VSCode
2. Install the 'WSL' extension, which allows you to open any folder in WSL. Basically you can now create a Linux shell in any folder you want.
3. Now you can not only write your bash scripts with VScode, but also you can interact with the Linux shell in VsCode.


### 1. Variables
You can create variables in shell and then recall them. When we create a variable, it's stored in memory, which means the computer is using resources to remember the variable's name and value. A memory address is assigned to the variable. However, there are some rules you need to follow: There should be no spaces between the variable's name, assignment symbol, and value. If there's a space, then it will fail.

### 2. Input reading
You can also read user input in your scripts.

### 3. Passing parameters and position based arguments
By default the 0th argument is always the name of your bash script file. The rest are position based by default. Let's say you're running the command:
```
<!-- Here we're passing in 3 command line arguments -->
./3_arguments.sh "Kevin Nguyen" knguyen44@ivytech.edu "North America"
```

### 4. Operators and conditionals
There are many operator types such as arithmetic, relational, comparison, etc.

- Comparisons: Here are some common comparisons in bash
  1. Equal to: Tests if two numbers are equal. `[ $n1 -eq n2 ]`
  2. Not equal: Tests if two numbers aren't equal. `[ $n1 -ne $n2 ]`
There are a lot more which you can find [here](https://www.namehero.com/blog/bash-string-comparison-the-comprehensive-guide/). 

-  'if' syntax:
In bash there should be spaces around the brackets `[ ]`, and the `then` keyword should be on a new line or after a semicolon. Also `fi` is used to mark the end of an `if` statement, and essentially closes the block.
```
if [ $n1 -gt $n2 ]; then
    echo "$n1 is greater than $n2"
else
    echo "$n1 is not greater than $n2"
fi
```

While on the topic of operators and whatnot, we should talk about `(( ))`, `-eq`, and `==`.


1. Arithmetic evaluation with `(( ))`: Us this when evaluating arithmetic operations and when doing comparisons.
```

```

### 5. Switch case statements
In bash, switch case statements will match the value with the case's value. It cannot do complex comparison. Here's an example:
```
<!-- Reads a value -->
read -p "Enter letter grade: " grade

<!-- Matches the variable's value to an existing case's value -->
case $grade in
  # 'A' was entered, this case activates
  A)
    echo "Marks between 90-100"
    <!-- Semi-colon indicates a 'break' keyword -->
    ;;
  # If 'B' was entered, this activates.
  B)
    echo "Marks between 80-89"
    ;;
  C)
    echo "Marks between 70-79"
    ;;

  # The default case
  *)
    echo "Marks are below 70"
    ;;
esac
```

### 6. Arrays/Lists 
An array or list is a data structure that's used to store multiple values. This is the same idea as in programming, and you can do it in bash. You can also index the array to access values at certain positions also.

### 7. Loops
Loops and iteration (repetition) allows us to repeat an action various times. There are three types of loops in bash:
1. for-loop: Repeats for a certain 'number' of times.
2. while-loop: Repeats 'while' a condition is true.
3. until-loop: Repeats as long as the condition is false.

### functions 
Functions are commonly used to execute a piece of code repeatedly, or to organize code inside an area. 

