# Continuous Integration/Deployment

## Goals
- Here we're going to learn about CI/CD. Then we're going to apply this idea to a small coding project and take us through the steps of how the software process works. 

- As well as this, we'll also be working on stuff like Github workflows, artifacts, and other software engineering things to get you started.

- Finally we'll actually try to go through all of this via a small project so it's not all theoretical

## What is CI/CD?
- **Continuous Integration (CI):** Idea of frequently integrating code changes into a shared repo. Then automated tests are run to ensure that the new code works with existing codebase. So this should happen when you try to add your code to the main branch of your repo, through commits or merges. Immediately the 'CI server' it'll start a 'build' to see if your software is good, passing it if no tests fail. So commit -> repo -> CI Server -> Developers
  - **Benefits**: This allows us to automate the detection nof bugs, reduced time in finding integration issues such tests are run, and gives us confident that the software we're running is always in a working state.
- **Continuous Delivery (CD):** Ensures that the codebase is always in a deployable state. This automates the release process so that after changes are applied, those changes are ready for us to deploy on the production software. Note that deployment may still require manual approval.
  - **Benefits**: The changes that pass the CI phase are prepared to be deployed. However actual deployment to production is a manual step. This makes our releases more reliable, and reduces the risk of deployment issues.
  - **What about Continuous Deployment?**: The idea of 'Continuous Deployment' makes it so that once changes are applied from the CI phase, the application is automatically deployed to production! This is a lot faster, but of course please be careful.

- **CI/CD Pipeline**: A process that automates and organizes the integration, testing, and deployment stages. CI/CD helps teams deliver software faster and with higher quality through automation and continuous feedback loops. We'd be able to release new features and fixes more frequently, and it allows us to quickly hear from users and stakeholders.

### Continuous Testing 
Idea that we test our code when it's introduced into the codebase, which can help identify problems early. Three types of tests:
1. **Unit testing**: Checks individual units or functions
2. **Integration testing**: Verifies how different modules or services within an application work together.
3. **Regression testing**: Performed after a bug is fixed to ensure that the specified bug isn't going to appear again.

### CI/CD Fundamentals:
7 things that help your development lifecycle:
1. **Single source repo**: You have one repository for your main application. This has your source code, database structure, properties files, and even scripts to build the  application. With 'trunk-based development' you'd avoid long-lived feature branches like `authentication-functionality` and instead focus on making small commits to the main branch. Of course, short-lived stuff like maybe `password-hashing` could be good.
2. **Scripts**: You should have a script that builds everything from a single command. 
3. **Self-testing builds**: Testing scripts should ensure that the failure of a test would result in a failed build. 
4. **Frequent Iteration**: Make small and frequent iterations rather than major changes. As a result, it's possible to roll changes back easily if there's a problem later on.
5. **Visibility**: Every developer should know where the latest version of the software is. They should be able to see any changes made, etc. everyone should b be on the same page.
6. **Predictable Deployments**: Deployments should be routine, normal, and low-risk. Just make sure the CI/CD testing and verification processes are rigorous, so that we can get confidence that our app works.

## What is Github Actions and how does it play into this?
Github Actions is a CI/CD platform integrated into Github. It allows us to integrate, automatically test, and deploy or deliver your code based on events such as pushes, pulls, requests, or even schedule-based triggers. 

- **Workflow**: An automated process that you define in your Github repository. It consists of one or more jobs that run in response to events like pushing code, creating pull requests, or manually triggering a workflow.
- **Triggers**: Events that start a workflow
- **Jobs**: Series of steps that run on Github-hosted runners, or self-hosted runners. Each job does something like building your code, running tests, and deploying.
- **Steps**: Individual actions within a job. Such as installing dependencies, running tests, deploying to server, etc.
- **Runner**: The environment where your workflows are executed. Github provides cloud-hosted runners that are already pre-configured for Linux, Windows, etc. Of course you can use your own.

# Credits
1. [What is CI/CD - Gitlab](https://about.gitlab.com/topics/ci-cd/)
2. [DevOps CI/CD - Fireship](https://www.youtube.com/watch?v=scEDHsr3APg)
