# Fundamentals 

### Binary Basics  
- **Binary**: A series of 0s and 1s representing digital information.  
- **Bit**: A single binary digit (0 or 1).  
- **Byte**: A group of 8 bits.  
- **Most Significant Bit (MSB):** The leftmost bit in the binary number
- **Least Significant Bit (LSB)**: The rightmost bit in a binary number.  
- **Setting a Bit**: Changing its value to 1.  
- **Resetting a Bit**: Changing its value to 0.  

---
#### Converting Binary to Decimal  
1. Write the binary number and assign powers of 2 to each position, starting from 0 on the right.  
   Example: For `1011`, the positions are $2^3, 2^2, 2^1, 2^0$. Binary is base 2, which is why we're doing $2^{i}$.
2. Multiply each term by its bit, either 0 or 1. Example: $1 \times 2^3 + 0 \times 2^2 + 1 \times 2^1 + 1 \times 2^0 $.  
3. Add the results.  
   Example: \( 8 + 0 + 2 + 1 = 11 \).  
   **Result**: `1011` in binary = `11` in decimal.  

---

#### Converting Decimal to Binary  
1. Divide the decimal number by 2, recording the **remainder** (0 or 1).  
2. Update the decimal number to the **quotient** of the division.  
3. Repeat until the quotient is 0.  
4. Write the remainders in reverse order.  

**Example**: Convert `19` to binary.  
   - $19 \div 2 = 9$ Remainder: `1`  
   - $9 \div 2 = 4$ Remainder: `1`  
   - $4 \div 2 = 2$ Remainder: `0`  
   - $2 \div 2 = 1$ Remainder: `0`  
   - $1 \div 2 = 0$ Remainder: `1`  
   **Result**: `19` in decimal = `10011` in binary.  

### Binary Addition
Very similar to longhand addition with decimalm numbers. Here are some rules that you should know:
1. $0+0=0$
2. $1+0=1$
3. $0+1=1$
4. $1+1=0$, carry the 1 to the next digit
5. $1+1+1=1$, carry 1 to the next digit

#### Example 1
Let's do `1000111` + `0010110`. Okay let's start processing from the rightmost digit to the left.
1. 1+0 = 1, so our binary number is `1` currently.
2. 1+1 = 0, but carry=1, and binary number is `01`.
3. 1+1+1=1, we include our prev carry. Carry 1 to the next place. Our binary number is `101`
4. 0+0+1 = 1, binary number is `1101`
5. 0+1=1, so `11101`
6. 0+0=0, so `011101`
7. 1+0=1, so `1011101`

#### Example 2
Do `1001001` + `0011001`:
1. 1+1 = 0, carry 1, binary=`0`
2. 0+0+1 = 1, binary=`10`
3. 0+0=0, binary=`010`
4. 1+1 = 0, carry 1, `0010`
5. 0 + 1 + 1 = 0, carry 1, `00010`
6. 0+0+1 = 1, `100010`
7. 1+0=1, `1100010`

---
### 2's complement
- **Why:** Binary (as we've seen before) is great for non-negative integers (unsigned numbers). Two's complement extends this by allowing us to represent positive and negative integers in binary. They achieve this by making the leftmost bit be used as the sign bit. So `0` for a positive number and `1` for negative numbers.

#### Calculating 2's complement
To find a two's complement (negate a number):
1. Invert the bits: Flip all 0s to 1s and all 1s to 0s.
2. Add 1 to the result.

**Example:** Convert `5` (in 4-digit binary) to `-5`
  1. `5` is `0101` in binary.
  2. Step 1 (Invert bits): `1010`
  3. Step 2 (Add 1): `1010` + `1` = `1011`; 
  4. Now we have `-5`. This is because in 2's complement that first bit is a `-8`. Then $-8+2+1 = -5$.

### 1's complement
For positive numbers, the one's complement representation leaves it unchanged. But for negative numbers, you'd 
flip all of the bits to the reverse. Not common to see as in modern computing we'd just use two's complement.

An example is `+5` is `0101` in normal binary. Then `-5` in one's complement is `1010`.

---
### Binary Subtraction
We can take advantage of the two's complement. To subtract two numbers, have the positive one in regular, and have the negative in two's complement form. Then just do binary addition and it works out

#### Example
Let's do `7-5` in binary. Have positive seven = `0111` and negative 5 = `1011`. So `1011` is in two's complement to represent that negative number. Now just do simple binary addition:
1. 1+1 = 0, carry 1, binary = `0`
2. 1+1+1 = 1, carry 1, binary=`10`
3. 1+0+1=0, carry 1, binary=`010`
4. 0+1+1 = 0, carry 1, binary= `0010`. Discard leftover carry. This result is correct since it's 2.

---
### Binary Logical Operations
1. AND (&): Outputs 1 if both bits are 1.
  - Example: `1010 & 1100 = 1000`.
2. OR (|): Outputs 1 if at least one bit is 1.
  - Example: `1010 | 1100 = 1110`.
3. XOR (^): Outputs 1 if bits are different.
  - Example: `1010 ^ 1100 = 0110`.
4. NOT (~): Inverts the bits.
  - Example: `~1010 = 0101` (assuming 4-bit representation).

---
### Bitwise Shifts
1. **Left Shift (<<):** Shifts bits to the left, filling with 0s
  - Multiplies a number by $2^{n}$, where n is hte number of shifts. Essentially adds an n number of zero bits to the right.
  - Example: `1010` is 10 in decimal. Then doing `1010 << 1 = 10100`. So we shift by 1, so the operation is $10 \cdot 2=20$. 
2. **Right Shift (>>):** Shifts bits to the right.
  - Divides the number by $2^{n}$. Basically removes n bits from the right, and then adds n zeros on the left. 
  - Example: `1010 >> 1 = `0101` (10 becomes 5)


---
### Bit overflow and carry
The issue with signed binary numbers is the risk of overflow. This is when the answer to an operation exceeds the limit of what can be represented with the bits we've allotted. For example, 



Occurs when the result exceeds the bit width. 
  - Example: Adding two 4-bits `1010+1010=10100`, which is 5 bits. 

---
### Applications in Embedded Programming 
- **Masking:** You can use masking do general bit manipulation.
- **Toggling a bit:** `number ^ (1 << n)` (flipping the nth bit).
- **Checking a bit:** `number & (1<<n)` (check if nth bit is 1)
- **Setting/Resetting bits:**
  1. Set: `number | (1<<n)` (change nth bit to 1)
  2. Reset: `number & ~(1 << n)` (change nth bit to 0)
- **Masking:** Using AND to extract specific 
Setting, resetting, complement, toggling bits.

---
### Hexadecimal (Base 16)  
Hexadecimal is a numeral system with a base of 16. It is often used in computing to represent binary numbers in a more compact and human-readable form.  

- **Digits:** Hexadecimal uses the digits 0–9 and the letters A–F, where:  
  - `A = 10`, `B = 11`, `C = 12`, `D = 13`, `E = 14`, `F = 15`  

#### **Why Hexadecimal?**  
- Compact representation of binary (4 binary bits = 1 hex digit).  
- Easier to interpret and write than long binary sequences.  
- Used extensively in **memory addresses**, machine instructions, and color codes in programming.

#### **Conversion**  
1. **Binary to Hexadecimal**  
   - Group binary digits into sets of 4 (from right to left).  
   - Convert each group into its hexadecimal equivalent.  

   Example:  
   - Binary: `110101110101`  
   - Grouped: `1101 0111 0101`  
   - Hexadecimal: `D75`  

2. **Hexadecimal to Binary**  
   - Convert each hex digit into its 4-bit binary equivalent.  
   Example:  
   - Hexadecimal: `1F`  
   - Binary: `0001 1111`  

3. **Hexadecimal to Decimal**  
   - Multiply each digit by \(16^{\text{position}}\) (starting from 0).  

   Example:  
   - Hexadecimal: `2F`  
   - Decimal: \(2 \times 16^1 + 15 \times 16^0 = 32 + 15 = 47\)  

4. **Decimal to Hexadecimal**  
   - Divide the decimal number by 16.  
   - Record the remainder.  
   - Repeat for the quotient until it is 0.  

   Example:  
   - Decimal: `47`  
   - Steps:  
     - \(47 \div 16 = 2\) remainder \(15 (F)\)  
     - Result: `2F`

---
### Memory Address Calculations  

In embedded programming, memory is divided into **addressable locations**, typically represented in hexadecimal.  

#### **Memory Addresses**  
- Each memory location has a unique **address**, which is a binary number usually represented in hexadecimal for simplicity.  
- Example: Memory address `0x1A3F` refers to a specific location in memory. Note that `0x` isn't apart of the hexadecimal, but its a prefix to indicate the following (`1A3F`) represents a hexadecimal number.

#### **Starting and Ending Address Calculations**  
When memory is partitioned, starting and ending addresses are calculated based on the size of each partition.  

1. **Partition Size**  
   - Memory size is often given in **bytes**, **KB**, **MB**, etc.  
   - 1 KB = 1024 , \text{bytes}\).  

2. **Calculate Ending Address**  
   - **Ending Address** = Starting Address + Partition Size - 1  
   - Example:  
     - Starting Address: `0x1000`  
     - Partition Size: `256 bytes` (\(0x100\) in hex)  
     - Ending Address: `0x1000 + 0x100 - 1 = 0x10FF`  

3. **Address Alignment**  
   - An n-byte aligned address is a memory address that's divisible by n (a power of 2). For example, a 4-byte aligned addresses means it's divisible by 4, which is a power of 2.
   Addresses are often aligned to powers of 2 for performance reasons. The reason this matters is because CPUs interact with chunks of data at specific boundaries (e.g. 4, 8, of 16 bytes). Misaligned accesses can take longer or even cause errors in some systems.
   - Example: A 4-byte aligned address ends in `0`, `4`, `8`, or `C`. These values are multiples of 4 in hexadecimal.

#### **Example**  
Partition a 4 KB memory block into 4 equal sections.  
- Total Memory: 4KB = 4096 bytes
- Section Size: 4096 / 4 = 1024 bytes per section (0x400)  

| Section | Starting Address | Ending Address |  
|---------|------------------|----------------|  
| 1       | `0x0000`         | `0x03FF`       |  
| 2       | `0x0400`         | `0x07FF`       |  
| 3       | `0x0800`         | `0x0BFF`       |  
| 4       | `0x0C00`         | `0x0FFF`       |  