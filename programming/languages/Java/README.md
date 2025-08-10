# my-first-java









## MISC
#### Folders
1. 'my-first-java': Here we have our source folder, with our package `com.myfirstjava`
   my-first-java.iml: This is the IntelliJ IDEA module file for your project. It stores information about your project structure, dependencies, and settings.
2. External Libraries: This directory contains the Java libraries that your project depends on. These are typically the standard Java libraries that come with the JDK, such as java.base, java.compiler, etc. IntelliJ manages these libraries for you and includes them in your project's classpath.
3. out: This directory is used by IntelliJ for output files, such as compiled .class files and other generated files. 
4. The production folder inside out contains the compiled .class files corresponding to your source code. The out directory also includes other folders like test for test output and production/<module_name> for production output.

IntelliJ IDEA can decompile .class files to show you the source code. When you view a decompiled file, IntelliJ might 
strip comments and present the code in a slightly different format than the original source code. And it's a good thing that they 
compile it into byte-code as well, as this makes your java applications portable and cross-platform.

#### Compiling Bytecode 
```
[//]: # (Compiler reads the `Main.java` file and compiles it into bytecode, so we did this in our source directory so it's just going to create 
a byte-code file in source for us)
javac Main.java

[//]: # (So this command runs a java application whose entry point is the `Main` class in the `com.myfirstjava` package)
java com.myfirstjava.Main
```
1. Compiling Java Code: When you run javac Main.java, the Java compiler (javac) reads the Main.java file and compiles it into bytecode (.class file). 
You typically do this in your source code directory, and the compiler creates the bytecode file in the same directory. However, the normal
way would just be running your `Main.java` using the code runner button. As a result intelliJ outputs all of your bytecode in a `out` directory.
2. Running a Java Application: To run the compiled Java application, you use the java command followed by the fully qualified 
class name of the main class. For example, `java com.myfirstjava.Main` tells the Java Virtual Machine (JVM) to look for the Main class file
in the `com.myfirstjava` package and execute its main method. The JVM expects .class files (bytecode) to run the application.
3. Directory Structure: If your class is in a package like `com.myfirstjava`, the JVM expects there to be a `Main.class` file in
the `/com/myfirstjava` directory.

#### Java Editions
There are a couple of different editions of Java for building different types of applications.  

1. Standard Edition (SE): Core Java Platform; has all of the libraries a Java developer should learn
2. Enterprise Edition (EE): For building very large scale and distributed systems. Has extra tools and libraries that help developers build fault-tolerant, distributed software. 
3. Micro Edition (ME): Java platform, for building embedded systems and mobile applications. Despite being deprecated, many legacy systems still rely on this.  
4. Java Card: Used in smart cards.

https://www.freecodecamp.org/news/learn-java-object-oriented-programming/