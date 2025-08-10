# Types of ACID Transactions in MongoDB

# Single-document Operations:
- Database operations that only affect one document
  are inherently atomic in MongoDB. Meaning an 
  operation such as updateOne() is technically already 
  an ACID transaction. 

1. db.products.updateOne(
  {
    {_id: 100},
  },
  {
    $set: {
      quantity: 500,
      details: {
        model: "2600",
        make: "Fashionaires"
      },
      tags: ["coats", "outerwear", "clothing"]
    }
  }
); To make it easier to see, in MongoDB, either all of these fields update, or none of them will.
  So no extra steps are required to make this an ACID transaction.


# Multi-document Operations:
- Aren't inherently atomic, so there are some extra steps
  to make these an ACID transaction. 

- For example, let's say we have two operations. One that
  updates the shopping cart when a user adds a product, and the 
  other one that updates the product inventory to show that
  there's one less of that product. This process involves 2 documents
  it isn't inherently atomic, so we need to change this to 
  a multi-document acid transaction:

  1. db.shoppingCart.updateOne(
    {
      userId: 1001,
      status: "active"
    },
    {
      $set: {
        modifiedOn: currentDate,
      },
      $push: {
        products: {
          productId: 2,
          quantity: 1,
          name: "Mobile Phone Charger",
          price: 30
        }
      }
    }
  )

  2. db.productInventory.updateOne(
    {
      productId: 2,
      quantity: {$gte: 1}
    },
    {
      $inc: {quantity: -1},
      $push: {
        reserved: {
          quantity: 1,
          userId: 1001,
          created_on: currentDate
        }
      }
    }
  )
- NOTE: Again this even applies to operations such as updateMany().
  Database operations that affect more than one document are not inherently atomic
  properties. So if you need to have ACID properties, use a multi-document
  acid transaction.

# Important Considerations:
- MongoDB "locks" resources, such as documents,
  involved in a transaction. As a result ACID transactions
  do have a performance cost and affect the latency of your app.
  Use multi-docuemnt transactions as a precise tool only 
  when ACID properties are absolutely necessary.
