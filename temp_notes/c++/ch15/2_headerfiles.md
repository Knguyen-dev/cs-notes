
```cpp
// In User.h
#ifndef USER_H
#define USER_H
class User {
private:
  std::string m_username;
public:
  User(std::string username) : m_username{username} {}

  // ... rest of your function declarations
  void print() const; 
};

// In User.cpp
#include "User.h"
void User::print() const {
  std::cout << "<User username=", m_username << '\n';
}
```
C++ lets us separate class declarations from their definitions by defining member functions outside the class definition. You can define the `print` function outside of the class, but you have to prefix it with the `User::` to indicate the scope. Commonly, the class definition is placed in a header file and then #include that file into any other files that want to use that class type. Unlike functions which only need a function declaration to forward a function, we'd need to put the full class definition (or any program-defined type) to be used.

## Libraries
Header files provide the declarations whilst their implementations are contained in a precompiled file that's linked at the link stage. Most OSS packages provide the .h and .cpp files, otherwise most commercial libraries only provide the .h files and a precompiled library file.
1. It's faster to link a precompiled library file than to recompile it everytime we need it.
2. A single copy of a precompiled library can be share dby many applications.
3. IP rights.

# 15.3 Nested Types

```cpp
#include <iostream>
class Fruit {
public:
  enum Type {
    apple,
    banana,
    cherry
  };

  Fruit(Type type)
    : m_type{type} {}

  Type getType() { return m_type; }
  int getPercentageEaten() { return m_percentageEaten; }

  // NOTE: Inside the class, we don't need to prefix enums
  bool isCherry() { return m_type == cherry; }
private:
  Type m_type{};
  int m_percentageEaten{0};
};


```
Apart from data or function members, classes support nested types (aka member types). To create one, define a type inside the class. The fully qualified namespace for `Type` is `Fruit::Type`, and the fully qualified name of the `apple` enumerator is `Fruit::apple`. However outside of the class we have to use the fully qualified enumerator name. 

# 15.4 Destructors Intro
A destructor is a special member function that's called automatically hwen an object of a non-aggregate class type is destroyed. They're designed to allow a class to do any cleanup before the object of the class is destroyed. Destructors have specific naming rules:
1. Destructor must have teh same name as the class preceded by a tilde.
2. Destructor can't atke arguments.
3. Destructor has no return type.

A class can only have a single destructor. Typically, don't call a destructor explicitly as that will be done when the object is destroyed. Destructors can safely call other member functions since the object sin't destroyed until after the destructor finishes executing. Classes that use a resource (e.g., memory, files, databases, network connections, etc.) often need to be explicitly closed or cleaned up before the object using those resources is destroyed. In other cases, you may want to do record keeping prior to the object's destruction, etc. All of this falls under the clean up: Tasks that need to be done before the object itself is destroyed.

**Implicit Destructors:** If you don't create a destructor, the compiler generates one for you that's empty. It's basically a placeholder, so if your class doesn't need cleanup, then just let the compiler generate an implicit one.

**Aside: `std::exit()`**
When the program is terminated immediately, it simply ends. No destructors are called. So if your program relies on doing cleanup, then don't do this.


## Example 1: Bad Program 
```cpp
class NetworkData {
private:
  std::string m_serverName;
  DataStore m_dataQueue{};
public:
  NetworkData(std::string_view serverName) 
    : m_serverName{serverName} {}
  
  void addData(std::string_view data) {
    m_dataQueue.add(data);
  } 

  void sendData() {
    // connect to server, send all data, and clear data.
  }
};

int main() {
  NetworkData n("someipaddress");
  n.addData("somedata1");
  n.addData("somedata2");
  n.sendData();
  return 0;
}
```


# 15.6 Static Member Variables
```cpp
// C++98 to C++14
#include <iostream>
struct Something {
  static int s_value;
};
int Something::s_value{1}; // Actual definition and initialization

class Something {
public:
  // Const and constexpr can be initialized inside the class.
  static const int s_value{4};
  // Inline can be initialized inside the class regardless if const or not
  inline static int s_value;
};
```
When we instantiate a class object, each object gets its own copy of all normal member variables. In contrast, static member variables are shared by all objects of the class. Member variables of a class can be made static using the `static` keyword. You generally can't initialize a static member inside the class body unless its `const` or `constexpr`. Instead, declare it isnide the class and define/initialize it outside in a `.cpp` file to avoid "multiple definition" errors.

- static members may use `auto` or CTAD to deduce template type arguments from the initializer.
- non-static members can't use `auto` or `CTAD`.

## Example 1: static member variable
```cpp
#include <iostream>
class Something {
private:
  static inline int s_idGenerator{1};
  int m_id{};
public:
  Something(): m_id{s_idGenerator++}
  {}

  int getID() const { return m_id; }
};

int main() {
  Something s1{}; // m_id=1
  Something s2{}; // m_id=2
  Something s3{}; // m_id=3
}
```

# 15.7 Static Member Functions
```cpp
class IDGenerator {
private:
  static inline int s_nextID{1};
public:
  static int getNextID(); // Forward Declaration of static member function
};

// Definition outside the class. Note that we don't use the static keyword here.
int IDGenerator::getNextID() { return s_nextID++; }

int main() {
  for (int count{0}; count < 5; count++) {
    std::cout << "The next ID is: " << IDGenerator::getNextID() << '\n';
  }
}

```
Member functions can be made static. Static member functions aren't associated with a class instance, and are accessed by using the class name and scope resolution operator. Here are other interesting facts:
- They don't have a `this` pointer.
- Static member functions are defined outside the class definition.

# 15.8 Friend non-member functions
The typical approach is that your class has private members and you expose those members in a controlled way using access functions. But sometimes this setup is not sufficient. For example, you have a `Storage` class that contains data that you want to display. However, our code provides many ways to display this data. There are two ways to do this:
1. Put the data storage management functions and display functions inside hte same class. Kind of complex.
2. Keep them separate. Have a `Storage` class manage storage and some other `Display` class managing display. But now the latter can't access all the private members of the former, which could hinder some of its capabilities.


In C++, a friend is a class or function (member or non-member) that's been granted full access to the private and protected members of another class. The class can selectively give other classes or functions full access to their private and protected members. A **friend function** is a function (member or non-member) that can access the private and protected members of a class as though it were a member of that class. Other than that, it behaves as a normal function.
```cpp
class Accumulator {
private:
  int m_value {0};
public:
  void add(int value) { m_value += value; }
  // friend declaration that makes non-member function:
  // void print(const Accumulator& accumulator) a friend of Accumulator
  friend void print(const Accumulator& accumulator);
};

void print(const Accumulator& accumulator) {
  // Because print() is a friend of Accumulator
  // it can access the private members of Accumulator.
  std::cout << accumulator.m_value;
}

int main() {
  Accumulator acc{};
  acc.add(5); // add 5 to the accumulator
  print(acc); // call the print() non-member function
  return 0;
}
```

# 15.9 Friend Classes and Member Functions

## Friend Classes
```cpp
class Storage {
private:
  int m_nValue{};
  double m_dValue{};
public:
  Storage(int nValue, double dValue)
    : m_nValue{nValue}, m_dValue{dValue} {}
  friend class Display;
};

class Display {
private:
  bool m_displayIntFirst{};
public:
  Display(bool displayIntFirst)
    : m_displayIntFirst{displayIntFirst} {}
  // Since we're a friend of the storage class, we 
  // can access its private member values!
  void displayStorage(const Storage& storage) {
    if (m_displayIntFirst) {
      std::cout << storage.m_nValue << ' ' << storage.m_dValue << '\n';
    } else {
      std::cout << storage.m_dValue << ' ' << storage.m_nValue << '\n';
    }
  }
  // ... extra functions ...
};


```
A friend class is a class that can access the private and protected members of another class.

## Friend Member Functions
```cpp
class Storage; // forward declaration for Storage class
Display {

}

```