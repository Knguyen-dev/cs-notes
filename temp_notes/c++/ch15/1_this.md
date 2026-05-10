## Introducing `this`
```cpp
// ... Inside a class ...

// Compiled/rewritten to: 
// static void setID(Simple* const this, int id) { this->m_id = id }
void setID(int id) {
  m_id = id; // Implicit and explicit use of 'this'.
}

int main() {

  // Compiled and rewritten as: Simple::setID(&my_simple_obj, 2);
  simple.setID(2);
}
```
Present inside every member function, `this` is a const pointer that holds the address of the current impliciit object. The compiler will do three things:
1. The call to `setID(2)` is compiled to `Simple::setID(&simple, 2)`.
2. The function has a hidden parameter `this` which is just a pointer.
3. Member variables use `this->` which always points to the object being operated on. Inside the class whether you use `this->` or just access member variables, it's just preference.

**Note:** Typically you don't need to explicitly reference the `this` pointer.

## Returning *this

```cpp
class Calc {
private:
  int m_value{};
public:
    Calc& add(int value) { m_value += value; return *this; }
    Calc& sub(int value) { m_value -= value; return *this; }
    Calc& mult(int value) { m_value *= value; return *this; }
    int getValue() const { m_value; }

    void reset() {
      *this = {};
    }
};

int main() {
  Calc my_calculator{};
  calc.add(5).sub(3).mult(4); // method chaining
}

```
The main reason you'd do this is to be able to do **function/method chaining**. Here each function returns a rvalue reference to the object, allowing this to even work. Remember that `this` is a const pointer to a non-const value, meaning the pointer can't point to another thing but the object befing pointed to can be modified.