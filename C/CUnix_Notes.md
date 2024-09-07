# CUnix Notes
```
<!-- Login to silo regular -->
ssh nguyekev@silo.luddy.indiana.edu

<!-- Login on the sftp session  -->
ssh -m hmac-sha2-256 nguyekev@silo.luddy.indiana.edu

<!-- Adding and setting up sftp -->
sftp -o MACs=hmac-sha2-256 nguyekev@silo.luddy.indiana.edu

<!-- puts something from local machine to silo server -->
put 

<!-- Gets something from silo and downloads it to your machine -->
get
```

## Vim
By default this opens in command mode, which is why typing doesn't work by default.

NOTE: You may use nano text editor if you don't want to use vim.

```
<!-- Create or open this file -->
vim helloWorld.c
```

## How to submit an assignment to auto-grader


Create a C program file
```
vim A0Problem1.c
```
Compile the program and create an executable called with the `.out` suffix to differentiate it.
```
gcc A0Problem1.c -o A0problem1.out
```
Run the executable
```
./A0problem1.out
```
Add the file using `git add A0problem1.c` and commit it `git commit -m "Your commit message here"`

Now we need to submit this to autograder. Create a `.txt` file that contains a 'commit link' to the file.

1. Ensure that you're in the 'c291' folder, which is the folder that's actually cloned and connected to the github repo. Ensure that the C program file has the exact number that's accepted by auto-grader. So for example `A0Problem1`, means that it's assignment 0 (A0), and we're on the first problem (Problem 1).
2. Then add the collaborators to the github repository, which is a requirement for the auto-graders to run.
3. Assuming you've committed to main and pushed to github, go to your commits. So to the commit history on your github. You should have a commit that basically indicates when you committed the assignment 0 problem 1. Click on it and copy the github url in your search bar.

4. Something like this `https://github.iu.edu/nguyekev/c291_fall24/commit/706fd78545b6cb8d5869035112207bac576be9f1`. Then put that in a `.txt` file with the name `A0problem1.txt`. The name of the C file should match the name of the txt file. We assume you have a separate commit for every problem, and so you'll have a separate text file containing a separate commit link for every problem for the particular assignment. 

5. Now you should have like a couple of text files such as `A0problem1.txt`, `A0problem2.txt`, and so on. You'd then submit all of these to the auto-grader, and it compiles and grades your work.

### Okay let's review.
1. Be sure that you're in `c291_fall24` and ensure your `.c` files are there as well.
2. Compile the program ```gcc A0problem1.c -o A0problem1.out```
3. Run executable to see if things work ```./A0problem1.out```
4. Add the problem to version control `git add A0problem1.c`
5. Create a commit that indicates you completed that specific problem from the assignment. This is important, that you create a commit for every separate problem. ```git commit -m "Finished A0Problem1```.
6. Create a `A0problem1.txt` file that contains the commit link from github. The commit link should be in form `https://github.iu.edu/nguyekev/c291_fall24/commit/<unique-commit-hash>`. Also make sure that the collaborators are added on the IU Github Repo.
7. Now do this same for `A0problem2.c`. Create an executable, add it and commit it. Create a `A0problem2.txt` with the commit link. Do this for the same for the rest of the problems.
8. Now that we have `.txt` files from problems 1 to 7, we can submit this to autograder (https://autograder.luddy.indiana.edu/web/project/1365) for the assignment. I used my `nguyekev@iu.edu` account to sign in, so that should still work. Then auto-grader should be able to use this information to compile your c programs that exist.






## Link
From the root directory:
`cd /u/nguyekev`


## Download source stuff and putting it into silo stuff

```
<!-- Log into silo? -->
1. sftp -o MACs=hmac-sha2-256 nguyekev@silo.luddy.indiana.edu

<!-- See the local directory and map we're on -->
lls

<!-- Move via local  -->
lcd <path to the download directory>

<!-- Downloads them all to the base silo -->
put A0problem *

<!-- Now when you go onto your regular silo login, you'd those folders in your directory. -->
```

