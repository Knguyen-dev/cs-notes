# Bitwise Shifting

## Left Shift 
```s
sll, rd, rs1, rs2 # rd = rs1 << rs2
slli rd, rs1, imm # rd = rs1 << imm
```
`sll` stands for shift left logical. When you left shift an integer `n` by `k` positions, you are multiplying it by $2^{k}$. As a result, $n << k = n\cdot 2^{k}$.

### Example: Basic cases
```s
li t0, 42      # t0 = 0000 ... 0010 1010
li t2, 2       # t2 = 0000 ... 0010

sll t3, t0, t2 # t3 = t0 << t2 = 0000 ... 1010 1000
slli t4, t0, 2 # t4 = t2 << 2  = 0000 ... 1010 1000
```

## Right Shift 
There are four right shift instructions. With `srl` and `srli` performing a logical right shift, filling the vacated bits with zero. However when we need an arithmetic right shift, we'd use `sra` and `srai`.

```s
# Logical right shift
srl rd, rs1, rs2  # rd = rs1 >> rs2
srli rd, rs1, imm # rd = rs1 >> imm

# Arithmetic right shift
sra rd, rs1, rs2 # rd = rs1 >> rs2
srai rd, rs1, imm # rs
```

**Note:** Gnu assemblers will error if you try to shift by an immediate not in the range 0-31.