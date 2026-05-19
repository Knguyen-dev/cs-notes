# 17.7 C-style Arrays

C-styles have their own special declaration syntax, we use square (`[]`). Inside the square brackets you can provie the length of the array. The array length must be a constant expression. Variable length arrays aren't valid in C++. You can also omit the length and the compiler will deduce the length of the array from the number of initializers. The `sizeof()` a C-style array will yield number of bytes used by the entire array. To get the length of a C-style array, you'd use the `std::size()` operator.

```cpp

int main() {
    int arr1[5]; // members are default init, ints are uninitialized.
    int arr2[5]{}; // Members are value-initialized.
    int arr3[5]{1,2,3,4,5};
    int arr4[5] = {1,2,3,4,5};
}
```

## Temp


```
index key -> record location
"Jordan"  -> disk address of row

```