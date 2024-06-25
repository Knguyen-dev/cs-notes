# Java 
A versatile programming language for websites, mobile apps, games, and other software applications. Since I already know some programming, I'm going to keep things short and assume an intermediate level of knowledge.

## How it works
We write Java source code in and place them in files with the `.java` extension. Then we compile that code, which is just transforming it into machine code (binary). However when we compile source code, it is machine specific. For example, if you compile source code on a machine, the machine code it generates will only be understood by a Mac, so it won't run on a Windows PC. However there's a way around this.

Source code can be compiled into 'byte code', which is cross platform and portable. These are placed in files with the `.class` extension, and you can send this to another computer to run. However that other computer needs to have a 'JVM', which will translate that bytecode into machine code, and allow the program to run! To get a JVM you just need to download a JDK.

- JDK (Java Development Kit): Contains developer tools to help us code. Then it laso contains the 'Java Runtime Environment' (JRE), which contains libraries and toolkits. And within that we have a 'Java Virtual Machine' (JVM), which runs Java programs.

## Setting up Java and related technologies
1. [Download JDK from Oracle](https://www.oracle.com/java/technologies/downloads/)
2. [Download IntelliJ Community Edition IDE; Make sure to 'Update PATH variable', create association .java, and 'open folder as project'](https://www.jetbrains.com/idea/download/?section=windows)

## How Java Works
1. Every Java program needs a 'main' function, which acts as an entry point to the program. It's basically like C++
2. As well as this, all functions must be located within a class, they can't exist on their own. You should assume this is true with variables and other things as well. So unlike Python, JavaScript, C++, and probably a lot of other languages, Java is fully object-oriented. So every java program will have a 'Main' class that runs the 'main' function, or more correctly 'method' since it belongs to a class, within it. 
3. Java has 'access modifiers', such as 'public', 'private', etc., which determines if other classes or methods in the program can access this particular method. Take the example below:
```
<!-- Means that other classes and methods can access the 'Bakery' class and the 'serveCookies' method inside the main class. -->
Public Class Bakery() {
  void serveCookies() {
    ...
  }
}
```
4. For naming classes, use PascalNamingConvention, and then for methods use camelNamingConvention.
5. Package: A 'namespace' that organizes a group of related classes and interfaces. By using packages, we help avoid name conflicts and it just makes it easier to locate classes and code within a larger codebase. Classes within the same package can access each other's private and protected members it seems. It basically helps organizze related code, making things easier to maintain. A package's name would be like `com.example.myapp`, basically a website but backwards.
6. Module: A module is a collection of related packages. Each module has a file called `module-info.java` which specifies hte module's name, dependencies, and exported packages. We use modules as they help manage dependencies, and encapsulate code by specifying what is exposed and hidden from other modules.  



## Excluding JetBrains from Windows Defender
Windows Defender can sometimes slow down the process of building or compiling files in JetBrains IDEs (like IntelliJ IDEA) due to real-time scanning. To improve performance, you can exclude specific JetBrains directories from Windows Defender's real-time scanning.
#### Steps to Exclude JetBrains Directories:
1. **Open File Explorer**:
   - Press `Win + E` to open File Explorer.
   - Type `%APPDATA%\JetBrains` in the address bar and press Enter.
   - Type `%LOCALAPPDATA%\JetBrains` in the address bar and press Enter.
2. **Open Windows Security**:
   - Press `Win + I` to open Settings.
   - Go to `Update & Security` > `Windows Security` > `Virus & threat protection`.
3. **Add Exclusions**:
   - Under the `Virus & threat protection settings` section, click `Manage settings`.
   - Scroll down to `Exclusions` and click `Add or remove exclusions`.
   - Click `Add an exclusion` and choose `Folder`.
   - Navigate to and select the folders for the following paths:
     - `C:\Users\<YourUsername>\AppData\Roaming\JetBrains`
     - `C:\Users\<YourUsername>\AppData\Local\JetBrains`
By following these steps, you ensure that Windows Defender will not scan the specified JetBrains directories, potentially improving the performance of your JetBrains IDEs during build and compile operations.


# Credits: 
To learn Java, I recommend watching the first video by 'Programming with Mosh'. They set up the basics and syntax of the language. While watching the video, follow along with the Roadmap to get the main or important ideas out of the way. For the video course published by 'Bro Code', I don't recommend watching the entire video, skip through the sections you already know, and get to the sections that you haven't covered in your Roadmap. 

1. [Java Tutorial for Beginners - Programming with Mosh](https://www.youtube.com/watch?v=eIrMbAQSU34)
2. [Java Full Course for free - Bro Code](https://www.youtube.com/watch?v=xk4_1vDrzzo)
3. [Java Developer Roadmap](https://roadmap.sh/java)