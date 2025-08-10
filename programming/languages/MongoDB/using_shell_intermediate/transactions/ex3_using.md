# Using transactions in MongoDB
- Here we're going to be working with the transfer money case.
  The collection is called "accounts" in the "bank" database and here is a document:
{
  account_id: "MDB740836066",
  account_holder: "Naja Petersen",
  account_type: "savings",
  balance: 2891.8,
  transfers_complete: ["TR784553031", "TR728134708", "TR3966066257"]
}

# Transaction Constraints
- In MongoDB, a transaction has a maximum runtime of one minute.
  Once you make the first write in your transaction, you have 60 
  seconds to complete the entire transaction. So it's important
  you have your database commands beforehand.

# Sessions:
- A session is a group of database operations that are related, 
  and should be run together, similar to a transaction.

 

# Getting started
1. const session = db.getMongo().startSession(); start a MongoDB session and store it in a variable.
2. session.startTransaction(); Starts a transaction
3. const accounts = session.getDatabase("bank").getCollection("accounts"); 
    Make a variable so that we can reference the "accounts" collection later.
4. accounts.updateOne(
  {account_id: "MDB740836066"}, 
  {$inc: {balance: -30}}
); Take away thirty dollars from one person's account
5. accounts.updateOne(
  {account_id: "MDB963134500"}, 
  {$inc: {balance: 30}}
); Now add thirty dollars to another account to complete the money transfer
6. session.commitTransaction(); Ensures our operations are all committed at the same time.
  If you get a MongoServerError saying your transaction has been aborted, that probbaly means 
  you weren't fast enough and took more than 60 seconds in between starting and committing 
  your transaction. Which is why you should have the commands on hand.

# Aborting a transaction and rolling back data with sessions:
- Remember, single-document operations are transactions as well, 
  so you can use sessions. Assume our 'session' and 'accounts' variables 
  are still defined.

1. session.startTransaction(); start our transaction, timer has startedd
2. accounts.updateOne(
  {
    account_id:  "MDB963134500",
  },
  {
    $inc: {balance: 5},
  }
); Update one of our documents

3. session.abortTransaction(); hey we realized that we made a mistake in our update
  operation. Good news is that since we're in a session as we can just abort the 
  entire transaction so none of the operations actually affect our database.

