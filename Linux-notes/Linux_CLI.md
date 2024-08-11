# Linux Commands Basics 
Let's learn the linux command line.

## Theory and need to know
- Shell/CLI: A program that takes keyboard input and gives them to the operating system to execute. This is also known as a command-line-interface.  
- Terminal: A tool that's used to open a window and interact with the Shell. 

### File System 
Files are arranged in a hierarchy or a tree-like structure. Files are contained in directories, and those directories can be contained by other directories.

When you open the shell you'll probably start off in the home directory.
```
<!-- Home directory -->
knguyensky@Kn3:~$

<!-- Root directory -->
knguyensky@Kn3:/$
```

## Basic commands
1. `passwd`: For changing the current password of your linux user
2. `ls`: For listing out all of the directories. However you can add in so many different options. 
3. `whoami`: This just outputs the username of the currently logged in user.
4. `clear`: Clears the output for the shell.
5. `logout`: Closes and exits the shell! But there are more consistent ways to shutdown the system properly.
6. `pwd`: Prints out the current working directory.
7. `cd`: Allows us to change the current working directory.


### ls (listing directory contents)
The ls command helps list the contents of a directory.
```
ls [options] [file or directory name]

<!-- Lists the contents of your current directory -->
ls

<!-- See the contents of a specific directory, the 'usr' directory -->
ls usr

<!-- Lists the contents of your root directory -->
ls /

<!-- Lists the contents of the home directory -->
ls ~

<!-- Lists the contents of the directory that's one directory back -->
ls ..

<!-- List all of the files in the directory in long format, meaning we get more detailed information.  -->
ls -l

<!-- Outputs everything, including hidden files -->
ls -a

<!-- Outputs everything (including hidden files), and they're all in long format -->
ls -al

<!-- Outputs the contents of the directory in descending order for file sizes -->
ls -lS

<!-- Find all html files in the 'Documents' directory -->
ls Documents/*.html

<!-- Saving the logged output of a command to a 'output.txt' file -->
ls -lS > output.txt

<!-- Listing out only the directories in the current working directory -->
ls -d */

<!-- This will print out all of the options you can use with the ls command -->
man ls
```
That should be mainly all of the more important things you can do with the `ls` command. 
Let's analyze directory information that's given in long format
```
drwxr-xr-x   2 root root    4096 Nov 22  2023 media
```
The string on the left indicates the permissions you have with the 'media' directory. So `drwxr`:
  - `d`: This indicates it's a directory. For files, this would be -.
  - `rwx`: These are the permissions for the owner of the directory (in this case, root). It means the owner can read (r), write (w), and execute (x).
  - `xr`: These are the permissions for the group associated with the directory. It means the group can read (r) and execute (x).
  - `x`: These are the permissions for others (everyone else). It 
  means they can read only execute 

Permission types:
- Read (r): Allows you to list the contents of the directory.
- Write (w): Allows you to create, delete, or rename files in the directory.
- Execute (x): Allows you to access the directory and its contents (e.g., cd into the directory).

### cd (changing directories)
Used to change the current working directory in Linux. 
```

<!-- Using cd without any arguments will change you to the home directory -->
cd 

<!-- Going into the root directory -->
cd /

<!-- Go one folder above the current working directory (CWD) -->
cd ..

<!-- Go into the 'games' directory that's inside the 'usr' directory -->
cd /usr/games


cd "My Cool Directory"
```

### cat (text files command)
A widely used command that's used to display text files, combining copies of text files, and creating text files. We'll learn about the creating files after we learn about 'redirection' in the next section.
```
<!-- It's done in this form -->
cat [options] [file1] [file2] ... 

<!-- Display the contents of the 'list1.txt' file -->
cat list1.txt

<!-- Lists the contents of Both  -->
cat list1.txt list2.txt

<!-- Outputs the contents of list1.txt, but it adds line numbers to any non-blank line -->
cat -b list1.txt 

<!-- Adds line numbers to all lines, blanks included  -->
cat -n list1.txt

<!-- Displays the contents of the file, but it ensures that at most there's only one blank line in between non-blank lines. Really good if you have a file with a lot of spaces in between your lines of content.  -->
cat -s list1.txt 

<!-- When it outputs the file contents, it adds a '$' at the end of each line to make it easier to see where a line ends. -->
cat -E list1.txt

<!--  -->
```
#### I/O Redirection
'Redirection' is the idea of capturing output from a file/command/program and sending that output to another file/command/program. 
```
<!-- This pseudo-code example means we want to send data from 'output' to 'file'. -->
output > file

<!-- Creates test.txt and allows you to type in some content for it  -->
cat > test.txt

<!-- Then you can transfer that data from the test.txt to test2.txt, so now test2.txt will have the text from test.txt -->
cat test.txt > test2.txt
```

### mkdir (Making directories)




### How to fix permission denied error:
The reason why you may get 'permission denied' hwen doing something such as making a directory, is because you're using Linux on Windows. It's confusing the Window's user with Linux user, so we need to fix that to ensure that it recognizes the Window's user as the Linux user as well. 

This only happens since you're running a Linux distribution on a Window's computer, which is fair. So to fix this just activate yourself as a super user.
```
<!-- Enable super user; should prompt for password after but that's alright -->
sudo su
```
As a result, you shouldn't be getting these permission denied errors anymore.


# Credits: 
1. [Linux Command Line Tutorial For Beginners](https://youtu.be/YHFzr-akOas?si=VpcYJHXvsdOUekJa)
2. [Bash Scripting Tutorial](https://www.youtube.com/watch?v=cQepf9fY6cE&list=PLS1QulWo1RIYmaxcEqw5JhK3b-6rgdWO_) 
3. [Fixing 'Permission Denied' error in Linux Ubuntu](https://www.youtube.com/watch?v=0T7ZwSJToBc)
