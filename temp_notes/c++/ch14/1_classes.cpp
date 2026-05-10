#include <iostream>
#include <string>

class Employee {
  std::string m_name{};
  public:
    void setName(std::string_view name) {
      m_name = name;
    }
    const auto& getName() const {
      return m_name;
    }
};

Employee createEmployee(std::string_view name) {
  Employee e;
  e.setName(name);
  return e;
}

int main() {
  Employee joe{};
  joe.setName("Joe");
  std::cout << joe.getName(); // ok: returns joe.m_name by reference

  // Case 1: fine, using returned reference to member of rvalue object in the same expression
  std::cout << createEmployee("Frank").getName();

  // Case 2: Bad, saved returned reference to member of rvalue class object for use later
  // The reference becomes dangling when the rvalue is destroyed after this expression!
  const std::string& ref {createEmployee("Garbo").getName()};

  // Case 3: Fine, copied the reference's value to a local variable for use later.
  // val is independent of referenced member since we're dealing with a copy.
  std::string val{createEmployee("Hans").getName()};
  return 0;
}

