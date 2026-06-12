# ASM Program Structure

```s
# Global/Data section
  .data
msg .asciiz "Hello RISC-V!\n"
  .text
  .global main

# -----------------
# Main function
# -----------------
main:
  # Variable setup
  li t0, 0  # t0 = 0
  li t1, 5, # t1 = 5 

# -------------------
# Simple while loop
# -------------------
.L_while:
  bge t0, t1, .L_while_end # if t0 >= t1, then jump to L_while_end; this would exit loop
  addi t0, t0, 1
  j .L_while
.L_while_end:

# --------------------------
# Conditional (if / if-else)
# --------------------------
  li t2, 3
  li t3, 7
  ble t2, t3, .L_else  # if t2 <= t3, jump to L_else
  mv t4, t2  # t4 = t2
.L_else:
  mv t4, t3  # t4 = t3
.L_cond_end:

# --------------
# For style loop
# --------------
  li t5, 0 # counter = 0
.L_for:
  bge t5, 10, .L_for_end # if counter >= 10, exit 
  addi t5, t5, 1         # counter +++



```