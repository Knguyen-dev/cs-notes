# CS-Programming-Notes

Notes about programming

# Useful git commands and tips

-   You created a new remote repo, but you have a local repo to
    that you want to link it with. So that your local repo
    can push and pull on the remote.
    A: First 'git init' on your local to make sure it's a git repo.
    Then do 'git remote add origin https:Your_Origin_Repo_Name.git.
    Make sure to pull

-   You have a repo branch that you want to pull down to local, and it isn't on your local yet?
    A: 1. git fetch origin 2. git checkout -b local_branch_name origin/repo_branch_name
    NOTE: Though, it's probably best to have your local branch the same name as the repo since
    the local branch is tracking the repo branch. Make sure to pull down commits or solve any merge
    conflicts, but now your local should be tracking the origin.

-   You have a local branch that isn't being tracked on origin repo,
    but you want to push the branch and have it tracked?
    A: git push --set-upstream origin local_branch_name

-   "fatal: A branch named 'gh-pages' already exists."; Getting this when deploying app?
    A: Manually delete the ".cache" directory located in path "node_modules/.cache/gh-pages".
    That is one good solution.

