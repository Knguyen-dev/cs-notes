# Multikey indexes
- Let's say we our documents were structured like this.
  When defining an index on an array field, it's a multikey index.
  
  
{
  name: "James2",
  email: "James@gmail.com",
  birthdate: date,
  accounts: [19283, 19309] 
}

- Situation: If we wanted to find customers with specific account numbers, we should have an index for the accounts field.

1. db.customers.createIndex({accounts:1}); Since accounts field is an array, we created a multikey index that is ascending order.
2. Now when doing a query solely based on account number such
  as db.customers.find({accounts:[39182]}), where we find a doc
  with 39182 as a value in one of its accounts arrays, it should
  use the index instead of 

# Restraints:
1. The maximum number of array fields per multikey index is 1. If an index has multiple fields, only one of them
  can be about an array. For example, db.customers.createIndex({accounts:1}) is fine since we're creating an index and 
  only one of them is an array (account). However if you did db.customers.createIndex({accounts:1, array_field_2: 1}) that
  wouldn't work since we're trying to go over the limit of only 1 field being an array.
  