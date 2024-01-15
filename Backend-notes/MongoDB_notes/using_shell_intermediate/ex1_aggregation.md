# Aggregation

1. Aggregation: An analysis and summary of data
2. Stage: An aggregation operation performed on the data. Here
  you collect numbers and info about the data, but don't make any
  permanent changes to the data. A stage is usually one operation and you use specific operators for them:

  1. $match: Filters data based on certain criteria
  2. $group: Groups documents based on crtieria.
  3. $sort: Puts the documents in a specific order.

  NOTE: Sometimes field names can have '$' fixed, which allows us 
  to actually access the real value of that field. Here we're using the set and concat operators, but also, we're appending '$' to 'first_name' and 'last_name' to access and concatenate their real values.

  $set: {
    defaultUsername: {
      $concat: ["$first_name", "$last_name"]
    }
  }





3. Aggregation Pipeline: Multiple stages of aggregation to be executed to process data. Here they can be filtered, sorted, grouped, and transformed. Documents are kept and outputted to the next stage after finishing one.

# Using match
- When using match, use it as early as possible.

- We have a collection that has all of the zipcodes in the US and 
documents are in form: {
  city,
  zip,
  loc: {y,x},
  pop,
  state
}

1. db.zips.aggregate(
  [
    <!-- Stage 1 gets all documents where state="CA". These documents are then outputted for processing to the next stage -->
    {
      $match: {"state": "CA"}
    },
    <!-- Then we group those zipcodes by city. Documents are grouped by a key, and  -->
    {

    }
  ]
)

