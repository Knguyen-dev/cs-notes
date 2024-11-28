# ACID Transactions

## What are transactions?
- **Situation:** Let's say at dinner friendA offers to pay the bill, and the friend B will just transfer money friend A's account as a way to pay friend A for paying the bill at this time. In this case, it'd be bad if one of the operations didn't work such as, friend A pays the bill, but friend B doesn't compensate A. We need a way to make sure either both of these operations happen, or the whole thing is cancelled.
- **Idea of transactions:** Any time database operations transfer a value from one record to another, we need to guarantee these operation happen all together or not at all to guarantee the integrity of our data. ACID transactions are a group of database operations that will be completed as a unit or not at all.

## ACID
ACID is a set of properties that ensure database transactions, which is a set of database operations, are processed reliably. These properties are critical for maintaining data integrity, especially in systems handling concurrent transactions.

1. **Atomicity**  
   - Ensures that a transaction is treated as a single unit.  
   - Either all operations in the transaction succeed, or none are applied.  
   - Example: In a money transfer, either both debit and credit occur, or neither happens.

2. **Consistency**  
   - Guarantees that a transaction brings the database from one valid state to another.  
   - Ensures rules, constraints, and relationships remain intact.  
   - Example: A transfer cannot leave an account with a negative balance if the database has a constraint disallowing it.

3. **Isolation**  
   - Ensures that concurrent transactions do not affect each other.  
   - Transactions appear as if they are executed sequentially, even if processed simultaneously.  
   - Example: Two users withdrawing money at the same time won't interfere with each other’s balances.

4. **Durability**  
   - Ensures that once a transaction is committed, its changes are permanent.  
   - Data is saved even in case of power failures or crashes.  
   - Example: A completed transfer won't be lost, even if the system crashes immediately after.


## When to use ACID transactions:
Should be used in scenarios that involve the transfer of a value from one record to another. Some examples include:
1. A mobile payment app where we've moving funds.
2. Systems that track inventory such as online shopping cart.