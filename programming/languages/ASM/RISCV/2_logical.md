# Logical/Bitwise Operations

## AND
The `and` and `andi` perform logical AND on our individual bits:
```s
and rd, rs1, rs2    # rd = rs1 & rs2
andi rd, rs1, imm12 # rd = rs1 & imm12
```
The constants are sign extended.

### Example 1
```s
li   t0, 42     # t0 = 42 (0...101010)
li   t1, 15     # t1 = 15 (0...001111)
and  t2, t0, t1 # t2 = 42 (0...101010) & 15 (0...001111) = 10 (0...001010)
andi t3, t0, 15 # t3 = 42 (0...101010) & 15 (0...001111) = 10 (0...001010)
```

## OR
The `or` and `ori` instructions perform logical OR on individual bits:
```s
or  rd, rs1, rs2  # rd = rs1 | rs2
ori rd, rs1, imm12  # rd = rs1 | imm12
```

### Example 1
```s
li   t0, 42      # t0 = 42 (0...101010)
li   t1, 15      # t1 = 15 (0...001111)
or   t2, t0, t1  # t2 = 42 (0...101010) | 15 (0...001111) = 47 (0...101111)
ori  t3, t0, 15  # t3 = 42 (0...101010) | 15 (0...001111) = 47 (0...101111)
```

## XOR 
The `xor` and `xori` instructions perform logical XOR (exclusive OR) on individual bits:
```s
xor  rd, rs1, rs2  # rd = rs1 ^ rs2
xori rd, rs1, imm12  # rd = rs1 ^ imm12
```

### Example 1
```s
li   t0, 42      # t0 = 42 (0...101010)
li   t1, 15      # t1 = 15 (0...001111)
xor  t2, t0, t1  # t2 = 42 (0...101010) ^ 15 (0...001111) = 37 (0...100101)
xori t3, t0, 15  # t3 = 42 (0...101010) ^ 15 (0...001111) = 37 (0...100101)
```

## NOT
The `not` pseudoinstruction inverts the bits in the register, turning 0 to 1 and 0 to 1. 
```s
not  rd, rs1     # rd = ~rs1 (pseudoinstruction)
```

### Example 1
```s
li   t0, 42      # t0 = 42 (0...101010)

# These are equivalent, generating the same machine code.
not  t2, t0      # t2 = ~(0...101010) = (1...010101)
xori t3, t0, -1  # t3 = (0...101010) ^ (1...111111) = (1...010101)
```