# Maven

## What is Maven?
A tool that's mainly used for building Java projects.
- Build Tool: It takes our source code and packages it up into a 'deployable artifact'. An artifact could be some output of your software project such as a 'JAR' file (it's bundled/compiled code) or many. So a 'deployable artifact' is 'deployment ready' software (the final software product that's ready to be used). Maven can also ensure we do things such as run tests, and it essentially helps developers build a workflow or process when developing software.
  1. JAR (Java Archive) Files: Used for packaging Java libraries and components. It bundles multiple Java `.class` files 
     into a single file for distribution. By doing it this way it makes it easy to distribute and deploy your software because all the necessary  stuff is available in one file.
  2. WAR (Web Application Archive) files: For packaging web apps. It contains the app's code, libraries, and other things.
  3. EAR (Enterprise Archive) Files: For packaging enterprise applications. They can contain multiple JARs, WARs, and other resources required to deploy an entire enterprise application to a server.
- Dependency management tool: Also used as a dependency management tool to manage third party libraries. When we use maven to handle dependencies, it handles 
   downloading the JAR files and code from an online repository. Of course, it allows us to 'scope' dependencies, which just means we can choose when to not 
   include dependencies. Such as not including development dependencies when you're deploying your project for production or distribution.
- Standardized software builds: Maven is very opinionated, it tells you where you need to put certain files such as your source code files. As well as this Maven expects your project to have various stages/phases such as compiling, testing, deploying, etc. So the idea is that when using Maven, you can expect many other Maven projects you work on and see to be very organized and have a similar structure. This uniformity makes it easier to transition to other projects and whatnot.
- Command line tool: It's primarily a command line tool, but there are of course, major integrations with popular IDE.

## Maven Landscape
- Project Object Model (POM): Responsible for configuring your Maven project, and Maven reads this `pom.xml` file to build your project. You use this to specify project dependencies, plugins, and other project info. This file defines the 'address' your project's artifact, which is useful for getting it from a remote repo.

#### Repositories
- Repositories: Holds all of your different artifacts and dependencies.
1. Local repo: Resides on your local machine and is part of the Maven installation. This is where Maven stores dependencies and artifacts that you pull down from a remote repo.
2. Remote repo: A repo that we access on the web. So this allows us to pull down artifacts such as a `JAR` file.

#### Plugins and Goals
1. Goal: A command or action that we perform on your codebase when building our project. For example, a goal could be a command/action that 'compiles our source code'. These are just actions that perform small steps in your Maven project build and to output that distribution file or bundle of deployable software. 
2. Plugin: A collection of goals. For example the 'Compiler' plugin has two goals/action, compile your `src` and then your `test` folders/code.
These plugins and goals are then designed to a 'lifecycle' phase, so during a certain phase in building, these actions will.
#### LifeCycle Phases
- Lifecycle: A named sequence of events/stages/phases. For software, you can have phases like 'compile', 'test', 'installation', and 'deploy'. Of course this is all done sequentially, so if you call to run the 'deploy' phase (typically the last phase in the project), then all phases earlier must be run as well.
NOTE: For lifecycles themselves, there are only 3: clean, default, and site. You just need to know that 'default' is the main one that people use.

## How Maven works (High Level Overview)
```mvn install```
1. Maven will look at pom.xml to look at the project info, which will be used to create a 'address' or identifier for the artifact the project will be creating. Also looks at your project's dependencies, and the plugins, which have the actions/commands that will be used when building the project and outputting an artifact.
2. Maven uses its 'Dependency Manager' looks at the dependencies and plugins, and tries to pull them down from a repo. If you don't have them locally, then it will look for any remote repositories that you've defined. 
3. Now the dependencies and plugins are available, begin the lifecycle.
4. First the compile phase executes, and also any plugins associated with it will be executed. 
5. Then your test phase executes, again any plugins associated with it are executed. You could have common plugins between your phases as well, so maybe a plugin is used in both phases.
6. Then your install phase will execute, again with the plugins as well. 

Takeaway, calling the command looks at our `pom.xml`, and downloads any software needed for your project, and gets ready for building. Then we start building the project. 


## Project Building
'package' is a phase within the default lifecycle. This will build your project and you'll see a `target` directory with a `.jar` file. This is our artifact and it contains the contents of our project. You see the naming schema for the `.jar` file is <artifactId>-<versionNUmber>. 
```
mvn package
```
Use this command to compile your code
```
mvn compile
```
Create a website for your maven project
```
mvn site
```

## Maven Folder Structure
Maven relies on a directory/folder structure that it calls the Standard directory layout. You can read more about it [here](https://maven.apache.org/guides/introduction/introduction-to-the-standard-directory-layout.html), and this actually a pretty short page about it.
Here are some of them explained
- `src/main/java`: Where all of your main application source code will be 
- `src/main/resources`: This is where you put any non-Java files that your application needs during runtime. Some common files are configuration files such as an 'application.properties', which would contain the config settings for your app. For a `log4j2.xml` which is a config file for a logging framework. You could also put your static assets here if you app serves web pages. Or maybe database related files such as `.SQL` or database configuration files, etc.   

#### Profiles
Our project will be deployed in various different environments like development, production, etc. Each of these will have different configurations. We'll create 'profiles' for each environment and these will apply those configurations in those environments separately.

1. Designate a profile in your pom file 
```
<profiles>
    <profile>
        <id>production</id>
        <build>
            <directory>
                ./dist
            </directory>
        </build>
    </profile>
</profiles>
```
Build the project using the 'production' profile that we created.
```
[//]: # (Template)
mvn -P<profile-id> package

[//]: # (Build our project using the production file)
mvn -Pproduction package

[//]: # (You'll see it worked as it generated our production code in a 'dist' directory instead of the usual 'target' directory; if you want to clear your deployment directories do this comment)
mvn clean
```

#### Archetypes
Archetypes are templates for maven projects. So after learning how to setup Maven, just use an archetype to setup your project a lot quicker.  
```
mvn archetype:generate
```

## Dependency Management
The idea is that you'll specify a dependency within your Pom file, and Maven will first look to see if you already have the dependency cached on your local machine. If not, then it'll pull down that dependency from the 'Maven Central', which is a default online repository used by Maven where you cna download libraries, plugins, etc.
- Transitive dependencies: These are the dependencies of our dependencies. Most popular libraries aren't made from scratch, but rather they build upon and use the functionality of other libraries to have some of their features. So Maven downloading all of these dependencies so that we don't have to. Back in the old days you had to download a dependency, and download all of its dependencies by hand.

Let's learn how to install dependencies:
```
[//]: # (Indicate a dependency that we want)
<!-- https://mvnrepository.com/artifact/org.apache.commons/commons-lang3 -->
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-lang3</artifactId>
    <version>3.12.0</version>
</dependency>

[//]: # (Pull down (download the dependencies to our local repo)
mvn dependency:copy-dependencies
```
Now we just need to have those dependencies included in our project on intelliJ. On the toolbar at the right side click the Maven logo. Then click 'Reload all maven projects' or 'Reload project'. This will allow the IDE to install your Maven dependencies for the currnet current project.

1. Let's update our JUnit version to 4.12 in our POM file.
2. Reload our Maven project, which will update the JUnit package for our project. Remember that it's already downloaded in our local repo which is how we're able to do this.
3. Now we have a new dependency called 'hamcrest'. This is because in a newer version of JUnit, it uses a dependency called 'hamcrest'. Maven will look at JUnit's POM file and see that, and download that transitive dependency for us.
4. If you switch back to '3.8.1' and reload the maven project, this new dependency goes away.


#### Dependency Scoping
Here are some dependency scopes
- test: Dependency is only included when we execute our unit tests.
- compile: Used in all phases.
- provided: Available during build and test phases, but will not be included during deployment. When we say 'provided', it means we expect this dependency to be provided by our environment.
- runtime: Needed when we test and run the application. However, it's not needed during compilation; apparently not needed much since it doesn't make a big difference.
- system: Says a dependency will be provided by the file system; This is not recommended because you may have different directories on different machines, and the POM file wouldn't be able to find that directory properly.
It's good to be familiar, but this is something that you probably won't have to deal with too often.



# Credits
1. [Download the binary zip archive](https://maven.apache.org/download.cgi)
2. [Setup Maven on your computer](https://www.javatpoint.com/how-to-install-maven)

NOTE: When executing a command on the commandline, Windows looks at our path variables to see if there's a program for that command.  
