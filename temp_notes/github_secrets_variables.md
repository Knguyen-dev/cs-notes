# GitHub Secrets & Variables Explained

When working with GitHub Actions, managing secrets and variables securely and effectively is crucial for a CI/CD pipeline.

## Explaining GitHub Secrets
These are encrypted environment variables we create to store sensitive information that shouldn't be exposed in our code or logs. 
- **What they are:** Sensitive info like API tokens, passowrds, or cloud credentials. You'd define these at the repository level, so each repository can have its own set of secrets.
- **Key Features:** They cannot be retrieved once created (only available during workflow execution). They're masked (replaced with asterisks) in workflow logs to prevent exposure.
- **Use Case:** Good for authentication and authorization with external services or protected resources that are needed for our CI/CD pipeline.
```YAML
# In CI_CD.yaml, this is how we access GitHub secrets
env:
  AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
  AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
```
In general, use GitHub secrets for sensitive info. You shouldn't be hard-coding sensitive keys in your `CI_CD.yaml` file or something similar.

## GitHub Variables?
These are non-sensitive configuration values such as environment names, build versions, region names, etc. You can define these are the repository, environment, or even organization level. Since they're not sensitive, you can easily access them and edit them, unlike GitHub secretes.
```YAML
# Using a repository variable named MY_VARIABLE
steps:
  - name: Using Variable
    run: echo "The value is ${{ vars.MY_VARIABLE }}"
```

## Scope of Secrets and Variables
- **Repository Level:** Defined for that particular repo and all workflows within that repo can access the value.
- **Environment-Level:** Scoped to a specific GitHub environment that you create. A GitHub environment is an optional feature we can create under a repo, and it lets us create environments like `dev`, `staging`, `prod`. Each one can have its own secrets, variables, branch protection rules, etc. They're moreso intended for deploying the application rather than for building.
- **Organization Level:** Shared across multiple repositories in the organization. For example this would be really useful if your organization had a single Docker Hub repo/account that you upload all your images to.

What if we have name conflicts? If the organization has a variable named `api_key` and the repo has a variable named `api_key`? GitHub doesn't prevent name conflicts but it does use a clear priority order. 

Essentially, more specific variables are placed at a higher priority:
- Step-level `env:`
- Job-level `env:`
- Workflow-level `env:`
- Environment-level (`vars.*` / `secrets.*`)
- Repository-level (`vars.*` / `secrets.*`)
- Organization-level variables

A more specific scope will override a more general scope.

## Credits
- [Handling GitHub Actions Secrets And Variables - The Medium](https://medium.com/@naveenva07/handling-github-actions-secrets-and-variables-like-a-pro-1178f3a35a4d)
- [What Are GitHub Secrets And How To Use Them](https://www.howtogeek.com/devops/what-are-github-secrets-and-how-do-you-use-them/)