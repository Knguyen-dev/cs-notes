# Normalization and De-normalization

## **What is Normalization?**  
Normalization is the process of organizing database tables to reduce **data redundancy** and improve **data integrity**. It involves dividing data into smaller, related tables and defining relationships between them. Normalization progresses through levels called **Normal Forms (NFs)**, where higher levels enforce stricter rules. Most systems aim for **Third Normal Form (3NF)** as a good balance between efficiency and practicality.  

**Key Benefits**:  
- Reduces redundancy.
- Ensures data consistency.
- Improves write efficiency.  

---
### **Normal Forms**  
1. **First Normal Form (1NF):**  
   - Eliminate duplicate columns and ensure each table has a primary key.  
   - Ensure every column contains atomic (indivisible) values.  
   - **Example**: Split multi-valued attributes (e.g., a column with multiple phone numbers) into separate rows or tables.  

2. **Second Normal Form (2NF):**  
   - Remove **partial dependencies**, where an attribute depends on a part of a composite primary key.  
   - Achieved after 1NF.  

3. **Third Normal Form (3NF):**  
   - Remove **transitive dependencies**, where non-key attributes depend on other non-key attributes.  
   - Achieved after 2NF.  

4. **Boyce-Codd Normal Form (BCNF):**  
   - A stricter version of 3NF: every determinant (an attribute or set of attributes that uniquely determines another attribute) must be a candidate key.  

5. **Fourth Normal Form (4NF):**  
   - Remove **independent multi-valued dependencies**, where one attribute has multiple values independent of others.  

6. **Fifth Normal Form (5NF):**  
   - Ensure **lossless decomposition**, where data cannot be reconstructed incorrectly from smaller tables.  

---

### **Key Terms**  
- **Determinant**: An attribute or set of attributes that uniquely determines another attribute.  
   - Example: In an `Employee` table, `EmployeeID` determines `Name` and `DepartmentID`.  
- **Partial Dependency**: When an attribute depends on part of a composite primary key.  
- **Transitive Dependency**: When an attribute depends on another non-key attribute instead of the primary key.

---
### **Dependency Examples**  

#### **Partial Dependency example**:  
Table `OrderDetails` with composite primary key `(OrderID, ProductID)`:

| **OrderID** | **ProductID** | **ProductName** | **Quantity** |  
|-------------|---------------|-----------------|--------------|  

- **Issue**: `ProductName` can be found using only on `ProductID`, not the entire key `(OrderID, ProductID)`. 
- **Solution**: Move `ProductName` to a `Products` table with `ProductID` as the primary key.  

**Reorganized Tables**:  
**`Products`**:  

| **ProductID** | **ProductName** |  
|---------------|-----------------|  

**`OrderDetails`**:  

| **OrderID** | **ProductID** | **Quantity** |  
|-------------|---------------|--------------|  

---

#### **Transitive Dependency Example**:  
Table `Employee` with attributes:

| **EmployeeID** | **DepartmentID** | **DepartmentName** |  
|-----------------|------------------|---------------------|  

- **Issue**: `DepartmentName` depends on `DepartmentID`, not directly on `EmployeeID`.  
- **Solution**: Move `DepartmentName` to a `Departments` table with `DepartmentID` as the primary key.  

**Reorganized Tables**:  
**`Departments` table**:  

| **DepartmentID** | **DepartmentName** |  
|------------------|---------------------|  

**`Employee` table**:  
| **EmployeeID** | **DepartmentID** |  
|-----------------|------------------|  

--- 


## What is de-normalization?
Leaving some of our schema not normalized to improve read performance at the expense of write performance. You could use sharding or federation, but that makes joins complex and somewhat costly. In most systems reads outnumber writes 100:1 or even 1000:1. With denormalization you could avoid complex joins.

The drawbacks are duplicated data, a complex database schema, etc. If your app is very write heavy, then this isn't a good idea.