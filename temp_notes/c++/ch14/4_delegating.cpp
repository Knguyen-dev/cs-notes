#include <iostream>
#include <string>
#include <string_view>

class Employee {
private:
  std::string m_name{};
  int m_id{0};

public:
  Employee(std::string_view name, int id = 0)
    : m_name{name}, m_id{id} 
  {
    std::cout << "Employee " << m_name << " created\n";   
  }
};

