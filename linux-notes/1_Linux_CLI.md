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

<!-- Given that 'test.txt' already has text in it, using this command allows us to overwrite the original text with new text. -->
cat > test.txt

<!-- Appending or adding on new lines of text to 'test.txt'. This allows us to add new content without messing with the original -->
cat >> test.txt

<!-- Then you can transfer that data from the test.txt to test2.txt, so now test2.txt will have the text from test.txt. This appends the text by the way, rather than overwriting. -->
cat test.txt >> test2.txt
```

### mkdir (Making directories)
Used to create directories/folders.

```
<!-- Creates a new directory called 'dawn' -->
mkdir dawn

<!-- Create nested directories using the 'parents' flag; it will create the 'night' and 'stars' directory. Without the 'parents' flag this won't work.   -->
mkdir -p night/stars

<!-- Creating multiple directories -->
mkdir first second third

<!-- Creating multiple directories inside the 'names' directory  -->
mkdir names/{john,tom,bob}
```

### rmdir and rm (Removing directories)
- rmdir: For removing directories.
- rm: For removing files and directories.
```
<!-- Removing a directory called 'Alpha' -->
rmdir Alpha

<!-- A neat trick to show the nested directory structure  -->
ls -R


<!-- Given directory structure '/a/b/c/d/e'. Delete the entire structure. Attempts to remove a directory and its parents when they're empty. However it won't delete a directory when it contains a file or something else. So here we're passing the 'parent' directory being deleted. So any directories that depend on 'e' will be deleted including e. -->
rmdir -p a/b/c/d/e


<!-- Delete 'c' directory and anything below it. -->
rmdir -p a/b/c

<!-- Using the 'verbose' flag to log out what's happening in english. -->
rmdir -pv a/b/c/d/e

<!-- Using rm command to remove files and directories. Given that '/stars/text.xt' exists, let's remove the stars directory and all other directories or files that are present in it! -->
rm -r stars
```

### cp (for copying/moving files and directories)
Used for copying files from one place to another place
```
<!-- Its general form -->
cp <options> <source> <destination>

<!-- Copies the contents of an old file into a new file. It creates the new file if the old one doesn't exist.-->
cp oldFile.txt newFile.txt

<!-- Copies 'oldFile' and puts a copy of it into the 'night' directory -->
cp oldFile.txt /night

<!-- Copying multiple files into a directory named 'myDir' -->
cp file1.txt file2.txt myDir

<!-- We want to copy the same files into 'myDir' again. However this time we want to choose which files are overwritten. Pass the 'i' flag so that when there's already an existing file, it'll ask you if you want to overwrite it or not. -->

cp -i file1.txt file2.txt myDir


<!-- Copies files from one directory above into our current directory. -->
cp ../files1.txt ../file2.txt .


<!-- Copying 'oldDir' to 'newDir' (assume newDir doesn't exist). To do this, we'll use the recursive flag to achieve this. As a result, newDir will have all of the data that oldDir has. In the case that the newDir already exists, the oldDir will just be placed inside of it. -->
cp -R oldDir new Dir 
```

### mv (For moving or renaming files and directories)
Used to 
```
<!-- General form -->
mv options source destination

<!-- Renaming a file. Can think of it as moving it into a new file called 'newFile'.  -->
mv oldFile.txt newFile.txt

<!-- Moving directories, if b doesn't exist, then it's like renaming. Else it's like putting the contents of a inside of b, instead of just nesting directory 'a' inside of 'b'. -->
mv a b

<!-- Moving a file up one directory.  -->
mv ../test.txt ./third

<!-- Moving 'text.txt' from the 'third' directory, one directory up. -->
mv ./third/test.txt ..
```

### less (for reading or searching inside a file)
Used for reading or searching inside of a file. So if you have a text file, you can use a command to search for certain towards and other things. Really useful if we have a really big file, and we don't want to use `cat` because the output would be too big. 

```
<!-- Allows us to scroll through the Book.txt -->
less Book.txt

```

### touch (For creating files)
Main way for creating files in Linux, or to update the timestamp for when a file has been created or modified.


```
<!-- Creates a new empty file called 'file1' -->
touch file1 

<!-- Creates multiple files. We created files for python, css, and javascript. -->
touch file2.py file3.css file4.js

<!-- Since this file already exists, it updates the timestamp of 'file2.py' to the current time. -->
touch file2.py

```

### nano (text editor command)
'Nano' is a small interactive text editor that's provided in Linux. Basically the notepad of Linux, and it gives you a lot of control. Allowing you to indent and do other fancy things. 

It even does code highlighting for certain programming languages. To save and exit the file, do `ctrl+x` for exiting. Enter `y` to save the buffer, which just means to save the file data. Then press `Enter` one last time to go back to the Linux shell.
```
<!-- Opens the 'nano' text editor and a -->
nano file.txt
```

### sudo 
Short for 'super user do', and allows us to do things that require admin privileges. Sometimes you'll get 'permission' denied when you try to create or do something in a directory that you don't have permissions for. 

You also commonly see this when you want to install third party software such as GCC, C++, etc. since doing that usually requires super user privileges and authorization.

```

<!-- Let's say you execute this in a protected place, and you get 'permission denied'. -->
mkdir coolNewDir

<!-- Do the same command to indicate that the super user has authorized the command. After you enter a correct password, the command will execute.  -->
sudo mkdir coolNewDir

<!-- The 'apt-get install' is for installing software, but most of the time we prefix sudo in front of it to give admin privileges. -->
sudo apt-get install gcc
```

### top (displays real-time system information)
Allows us to see processes that are currently running on our computer, and the memory that said processes are taking up. It shows you some detailed output, but here are some column meanings:
- PID: The process ID 
- Command: The name of the program or process. For exmaple you could see stuff like 'mongod' for the MongoDB instance, 'python3' for the python instance, 'docker-desktop', etc. Then
```
<!--  -->
top
```

### kill (terminating a process)
You can use this command to kill a process, given its process ID.

```
<!-- Finds the process ID of the process 'unity-control-center'. Let's say it returns '3294'. -->
pidof unity-control center

<!-- Kills the process with the corresponding PID -->
kill 3286

<!-- Forcibly terminate the process (not recommended) -->
kill -KILL 3294
```

### echo (Displaying stuff and intro to scripting)
At the base, the echo command can be used for print out commands, but it's most useful when you need to do scripting. 

```
<!-- Just prints out 'hello world' -->
echo "hello world"

<!-- Creating a variable 'myVar' and displaying its value using echo command. Saved variables will disappear after you close the terminal. -->
myVar="Mark"
echo $myVar

<!-- Using 'escaped' mode, which allows us to use escaped characters suc has tabs or new lines. -->
echo -e 'some \text'
```

### file and symbolic permissions alongside 'chmod'
```
-rw-r--r-- 1 root root  628 Aug 12 19:25 test.txt
```
Look at the first character. While `d` indicates directory, a `-` indicates it's a file. Of course there are other identifiers, but these are the basic ones. The first group `rw-` indicates the owner's permissions, which is reading and writing. The next group of 3 characters is `r--` contains the group permissions. Finally the last 3 `r--` are the permissions for any other person using the computer. 

Now at the end of that, we see the letter `1` to indicate the number of 'symbolic links' to the file. Then we see the owner of the file is `root` and the group associated with the file is `root`. To change file permissions you'd use the command `chmod`. Remember our permissions we can give are 'read', 'write', and 'executable'.

```
<!-- Adding the 'executable' permission to the 'other' group for the test.txt file. Now other users will be able to execute the text file.-->
chmod o+x test.txt

<!-- Adding read, write, and executable permissions to the group for this file  -->
chmod g+rwx test.txt

<!-- Removing writing and executable permissions for the group for this particular file -->
chmod g-wx test.txt

<!-- Allowing everyone to have read, write, and execute permissions -->
chmod a+rwx test.txt

<!-- Specifying and setting permissions for all -->
chmod u=rwx,g=rw,o=r test.txt

<!--  -->
```
Now let's speak about octal and numeric permissions. So it's just a way to represent file permissions using the 'octal' numeric system.   

### Intro to bash scripting 
Scripting is a deep concept, so this is just a brief introduction to it. A script is a text file that contains a sequence of commands that can be run in Linux.
```
<!-- Gives us the directory to our bash -->
which bash

<!-- Open nano and create a script file  -->
nano "myscript.sh"
```
Now inside the script file, all scripts start with a hash bang which is just the `#!`. Here we created a script, such that when we execute this 'shell' file, it's going to list the current directory that we're in. 
```
#!/usr/bin/bash
ls -l
```
First, make sure that this file has execution permissions. Then run the script file. Indicates that the script file is in the current directory and runs it. And as a result, it will print out the files in my CWD. While this is a simple example, we can extrapolate this to do various complex commands and amazing things.
```
./myscript.sh
```

### 'which' and 'what'
- 'which': Used to find the location of something.
Sometimes when working in other operating systems, which `ls` simply isn't enough, and they may want you to specify the full path or location of where that command is located. So use `which ls`, and you may use the full path in your script files instead.

- 'whatis': Going to display the short 'manual' page description. For example when you do `man ls`, it gives a 'manual' of what a given command is and does. So doing `whatis ls`, it gives you the description of the command.


### useradd (for creating users)
Adds a user named 'myNewUser'. The `-m` flag makes it so this user gets their own directory. The `-s` flag allows us to specify what kind of shell that they get, so here we give them the bash shell. Finally the `-g` indicates the group they're in, so here we place them in the `users` group. Then the `-c` flag indicates any comments associated with the user.
```
<!-- Create the new user -->
sudo useradd myNewUser -m -s /bin/bash -g users -c "Just a user for a tutorial"

<!-- Go to the home directory, and the user's directory should be there -->
cd /home/


<!-- We need to give the user a password. Use this command and give them a password -->
sudo passwd myNewUser
```

### userdel (for deleting users)
This deletes the username, password, and other data for the user. However this doesn't delete the home directory for the user, which is pretty useful. So like in a company when an employee resigns, we can delete their account, but the data that they have still exists. 

```
<!-- Deletes the user 'myNewUser', but keep their account -->
sudo userdel myNewUser

<!-- Deletes the user 'myNewUser' alongside their home directory -->
sudo userdel -r myNewUser
```

### Commands for managing groups
- `groups`: Allows you to see all groups that the currently authenticated user is connected to.
- `cat /etc/group`: Shows all groups that exist on your computer.
- `sudo groupadd ramsey`: Creates a group called 'ramsey'.
- `sudo groupdel ramsey`: Deletes the 'ramsey' group
- `sudo gpasswd -a myNewUser myGroup`: Adding user 'myNewUser' to the group 'myGroup'.
- `sudo gpasswd -d myNewUser myGroup`: Removing user from the group.

### What is the 'bashrc' file
A script that's executed when a terminal is started in interactive mode.
```
<!-- Access the file in nano text editor.  -->
nano /root/.bashrc

<!-- Then place some 'hello world' type command at the bottom. -->
echo "Opening Shell in interactive mode!"
```
After saving, then reopen ubuntu. Since we're using windows with Ubuntu, just log in as the super user using `sudo su` in order for the `.bashrc` file to run! More commonly we can use this to setup environment variables. When you install Java, we can use `.bashrc` to setup the environment variables for that.

### Viewing resources (du, df, and free command)
- `df`: Reports the amount available and used disk space being used by the file system
- `df -h`: Outputs the stuff in a more human-readable format.
- `du -sh`: Lets you see the 'summary' and 'human-readable' info. So you'll see the memory used for the directory.
- `free -m`: Displays the total amount of memory that's used or free in megabytes.
- `watch free -m`: Turns the command into a 'real-time' command. So every 2 seconds, things will change. You can prefix the `watch` keyword on other commands such as the `df` command as well. 

### Head and Tail 
Used for outputting the first or last 10 lines of a file.
```
<!-- Prints the first 10 lines of the 'test.txt' file -->
head test.txt

<!-- Prints the last 10 lines of the 'test.txt' file -->
tail test.txt
```

### find (for finding files)
Let's say you know a file called 'myFile.txt' is in your home directory, but you don't know exactly where it is. You can use the `find` command to get the location of that file

```
<!-- Finds the file named 'myFile.txt' in your home directory. -->
find /home/knguyensky -name myFile.txt

<!-- Finds the file named 'myFile'. It returns all files regardless of extension -->
find /home/knguyensky -name myFile.*
```

### wc (word count command)
Used to give the number of lines, words, or characters in a file.
```
<!-- 20 lines, 175 words, and 844 characters -->
wc test.txt
20 175 844 test.txt
```

### Running multiple commands
So far we've seen how to use commands, but not how to combine multiple commands and run them together. There are two ways to combine commands:
1. Using semi-colons: `ls;pwd`, this commands lists the contents of the current directory, and then prints out the name of the CWD. Commands are independent, meaning if one command doesn't work, then it doesn't affect any other commands. 
2. Using ampersands: `ls&&pwd`, this command does the same thing. Also the sequence matters, as it's always going to execute `ls` first, and then `pwd`. However, if a command fails, any commands after it will not run as the execution will stop early.
3. Using OR: `ls || pwd`, where if the left one fails, the right one will execute. 


### Managing packages with 'apt-get'
You can use `apt-get` to add, remove, and manage packages in your debian based OS.
```
<!-- Updates all of your packages -->
sudo apt-get update

<!-- Install php5 -->
sudo apt-get install php5

<!-- Uninstall php5 software from your system. It may not remove all configurations files. -->
sudo apt-get remove php5

<!-- Uninstalls php5 software and its configuration files -->
sudo apt-get remove --purge php5

<!-- Removes any dependencies that were installed due to installing php5. -->
sudo apt-get autoremove
```

### ifconfig 
Means 'Interface configuration', and it's used to change the network configurations on your computer. Now running `ifconfig` will output this information:
```
<!-- Wired Ethernet information: network is active, supports broadcasting, sending and recieving data, and can multicast -->
eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500

        <!-- Here are the various IP addresses -->
        inet 172.31.74.52  netmask 255.255.240.0  broadcast 172.31.79.255
        inet6 fe80::215:5dff:fe37:329c  prefixlen 64  scopeid 0x20<link>
        
        <!-- MAC address, and various other information. -->
        ether 00:15:5d:37:32:9c  txqueuelen 1000  (Ethernet)
        RX packets 4088  bytes 13269064 (13.2 MB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 1879  bytes 175396 (175.3 KB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        inet6 ::1  prefixlen 128  scopeid 0x10<host>
        loop  txqueuelen 1000  (Local Loopback)
        RX packets 74  bytes 8411 (8.4 KB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 74  bytes 8411 (8.4 KB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
```
You can also choose to use the `up` or `down` commands to turn on or off various network interfaces.
```
<!-- Deactivates ethernet interface, which disconnects our internet. -->
sudo ifconfig eth0 down

<!-- Activates the interface again, so you should be able to connect to internet now. -->
sudo ifconfig eth0 up
```

### tar command 
For creating, maintaining, and extracting 'tar' files, which are just another file type that's for compressing files. So it's kind of like zip files.

- c: Creating a tar file
- v: Verbose flag to give us the situation report about what's happening
- f: Allows us to specify a name for the tar file.
Here we want to create a tar file from a directory called 'test'. Now this 'test.tar' file is kind of like a zip file that contains all of our stuff
```
tar -cvf test.tar test
```
Now let's un-compress this stuff, and extract it. So use the 'x' flag. Now you should have a 'test' directory in your CWD.
```
tar -xvf test.tar
```
Okay so sometimes `tar` files come in this format called `gzip`. To handle these files you need to add the `z` flag to your commands.
```
<!-- Create the gzip tar file -->
tar -czvf test.tar.gz test

<!-- Extract teh gzip tar file -->
tar -xzvf test.tar.gz
```

### grep (text search tool)
Also known as the 'global regular expression print', it's able to search for specific patterns/strings in your files, and even filter the output of other commands.
```
<!-- Transfer the text for the 'tar' manual into 'file.txt' -->
man tar > file.txt

<!-- Returns the line or lines with the string 'options'. -->
grep "options" file.txt

<!-- Let's make it case insensitive, so it gets the lines with the string regardless of casing  -->
grep -i "options" file.txt

<!-- Use the n flag to print the line numbers associated with our matches -->
grep -n "options" file.txt

<!-- Searching in multiple files -->
grep -n "options" file.txt file2.txt file3.txt

<!-- Searching for lines that doesn't match the pattern using the 'v' flag -->
grep -v "options" file.txt
```

### netstat
For displaying 'network statistics'. These would be network connections, interfaces, routing tables, and other things.

```
<!-- Shows all connections on your computer. While good -->
netstat -a

<!-- Output the netstat output with the 'less' command to make things scrollable and more manageable. --
netstat -a | less 

<!-- Using 't' flag to only see tcp connections -->
netstat -at

<!-- Using 'l' flag to see only connections that are in the listening state -->
netstat -l
```

### How to fix permission denied error:
The reason why you may get 'permission denied' when doing something such as making a directory, is because you're using Linux on Windows. It's confusing the Window's user with Linux user, so we need to fix that to ensure that it recognizes the Window's user as the Linux user as well. 

This only happens since you're running a Linux distribution on a Window's computer, which is fair. So to fix this just activate yourself as a super user.
```
<!-- Enable super user; should prompt for password after but that's alright -->
sudo su
```
As a result, you shouldn't be getting these permission denied errors anymore.


# Credits: 
1. [Linux Command Line Tutorial For Beginners](https://youtu.be/YHFzr-akOas?si=VpcYJHXvsdOUekJa)
2. [Important Linux Commands](https://www.digitalocean.com/community/tutorials/linux-commands)

3. [Bash Scripting Tutorial](https://www.youtube.com/watch?v=cQepf9fY6cE&list=PLS1QulWo1RIYmaxcEqw5JhK3b-6rgdWO_) 
4. [Fixing 'Permission Denied' error in Linux Ubuntu](https://www.youtube.com/watch?v=0T7ZwSJToBc)
