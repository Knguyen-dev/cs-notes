/*
+ Type assertion: Explicitly telling TS to treat an entity
as a certain datatype.

1. Variable 'cid' is of any type
2. So when we assign cid to customerId, then customerId would 
    be type any. However, we can force it to be a 'number' 
- NOTE: Below are the two ways you can do type assertion.
*/

let cid: any = 1;
let customerId = <number>cid;
let customerId2 = cid as number;
