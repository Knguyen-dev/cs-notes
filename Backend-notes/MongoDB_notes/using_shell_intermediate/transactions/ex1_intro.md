# Transactions
- Situation: Let's say at dinner friendA offers to pay the bill, and
  the friend B will just transfer money friend A's account as a way
  to pay friend A for paying the bill at this time. In this case, it'd
  be bad if one of the operations didn't work such as, friend A pays the 
  bill, but friend B doesn't compensate A. We need a way to make sure either
  both of these operations happen, or the whole thing is cancelled.

- Idea of transactions: Any time database operations transfer a value from one record to 
another, we need to guarantee these operation happen all together or not at all
to guarantee the integrity of our data. ACID transactions are a group of database
operations that will be completed as a unit or not at all.


# ACID
1. Atomicity: All operations will either succeed or fail together
2. Consistency: All changes are consistent with database constraints.
  For example, if an account balance can't go below zero, then a transaction
  will fail if one of its operations violates this condition.
3. Isolation: Multiple transactions can happen simulanteously without
  affecting the outcomes of other transactions. 
4. Durability: All changes made by operations will persist, even in
  the event of power or hardware failure. Regardless, after a transaction
  the data should persist, and data is never lost.


# When to use ACID transactions:
- Should be used in scenarios that involve the transfer 
  of a value from one record to another. Some examples include:
1. A mobile payment app where we've moving funds.
2. Systems that track inventory such as online shopping cart.