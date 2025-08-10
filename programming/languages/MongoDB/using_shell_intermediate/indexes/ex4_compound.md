# Compound Indexes
- Indexes with multiple fields. It can turn into a multikey index
  if one of the fields is an array field. However, we must that if this
  is the case, only one array field is allowed per index. Supports queries
  that match on the prefix of the index field.

# Example
- Let's say this is our customers collection
{
  name: string,
  email: string,
  birthdate: ISO date string,
  active: bool,
  accounts: array,
} 
1. db.customers.createIndex({active:1, birthdate: -1, name:1});
  We create a compound index, where the prefix (starting index) is 
  whether or not they're active. 

2. db.customers.find(
  {
    birthDate: {$lt:ISODate("1995-08-01")},
    active:true,
  }
  ); Now any query that uses active, or sorts by active
    can make use of the index we've created above. Again
    this is because 'active' precedes all other fields when
    we created our index. It is the prefix
3. db.customers.find(
  {
    birthdate: {$lt:ISODate("1995-08-01")}
  }
); However, queries that don't include 'active' or the prefix index
  will not be able to make use of the index we've created, even if they
  use other fields included in the compound index. That is the gimmick.


# How do we efficient create a compound index 
- Since order of the fields matter, it's we follow a rule
  to ensure we're creating effective indexes. In general
  fields tested for equality first, then sort, and finally range.

- Equality: Tests exact matches on a single field
1. Such as findOne({active: true}) or find({birthdate:ISODate("1995-08-01")})
  are finding exact matches. You'd place your equality fields first in a compound index because 
  that retrieves fewer documents and makes it faster.

- Sort: Determine order of the results
1. sort({name: 1}) or sort({birthdate:-1}); Determines the orders of 
  the results and index sort eliminates the need for in-memory sorts.

- Range: Scans fields for all values within range.
1. find(
  {
    birthdate: {$gte:ISODate("1977-01-01"), $lt:ISODate("1995-01-01")}
  }
); Here we find all matches within these two dates. In general
  range and sort should be placed after equality to avoid in-memory sorts.


# Back to example:
1. db.customers.find(
  {
    birthdate: {$gte:ISODate("1977-01-01")},
    active: true
  }
).sort(
  {
    birthdate: -1,
    name: 1
  }
); Find all customers who are active and are born later than a certain date. Then sort them by birthdate in
  descending order and name in ascending order. When doing .explain() on the query, we see first 
  MongoDB performs an index scan on the birthdate. Then it does a fetch that uses a filter 
  based on the active field. Finally it sorts. Now let's review the guidelines on how to create a good index for this

  NOTE: Assume we already have an unsuitable index such as {birthdate: 1} 

2. db.customers.createIndex({active:1, birthdate:-1, name:1});
  - active is first, since we'd be using it to query based on equality.
  - birthdate and name are placed next since we sort based on these fields.
    The order of these fields matter, and match our sort query because we 
    mix descending and ascending.
  - we already have a range query for birthdate, but this is already included
    so that's good.
3. Now when running .explain() we see we do an "IXScan" (index scan) first with 
  keyPattern: {active:1, birthdate:-1, name:1}. This means our index is successfully
  working.
