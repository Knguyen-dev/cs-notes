
int main() {
  // Bitwise operators: Operators used in bit-level programming and binary.
  // & = AND
  // | = OR
  // ^ = XOR
  // << left shift
  // >> right shift 
  
  int x = 6;  // 00000110
  int y = 12; // 00001100

  // For AND, bits in both positions must be 1, in order to get a 1 bit in the output. Else it's 0
  int z = 0;  // 00000100, should be 4
  z = x & y; 

  // For OR, at least one bit needs to be 1 for us to get an output bit of 1. Else 0
  z = x | y; // 00001110, should be 14

  // For XOR, one bit needs to be 1 and the other 0 for us to output a 1. If both bits are 1s or if both are 0, then output 0 since both are same.
  z = x ^ y; // 00001010, should be 10

  // Shifting left, so remove the left most bit, which is 0, so now we have '0001010', only 7 bits. Then add a zero to the end
  // which is now '00010100', which should be 20. This should increase the value by double approximately.
  z = z << 1;

  // Shifting right, remove the rightmost bit, and add a zero to the left side. Should be like cutting our original value in half.
  z = z >> 1; // '00001010', which is 10.
}