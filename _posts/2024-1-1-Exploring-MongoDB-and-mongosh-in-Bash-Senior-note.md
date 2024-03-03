---
layout:     post
title:      "Exploring MongoDB and mongosh in Bash"
subtitle:   "Associate developer MongoDB C# certificate exam"
date:       2024-1-1 12:00:00
author:     "Truong Nhon"
hidden: false
published: true
catalog:      true
lang: en
tags:
  - mongodb
  - database
---

Are you ready to dive into the world of MongoDB and its powerful shell, mongosh? Let's begin our journey by learning how to install mongosh.

## MongoDB Node.js Driver - Connection String Options

MongoDB supports various connection string options, including:

- MaxPoolSize
- MinPoolSize
- maxIdleTimeMS

## MongoDB Data Types - BSON Types

MongoDB uses BSON types to represent data. Here are some key BSON types:

- Double: MongoDB uses Double; there is no Float.
- String
- Object
- 32-Integer
- 64-Integer
- ObjectId
- Boolean
- Date
- Timestamp
- Decimal128
- Array

Data types ObjectId init from timestamp, increment, machineId, randomNumber

### Querying MongoDB

MongoDB provides powerful querying capabilities. Let's explore some query operations:

1. `Collection.findOne(query, options)`

2. `Collection.find().project().sort().skip().limit().count()`

- Comparison: The following operators can be used in queries to compare values: `{field:{operator:value}}`
  - $eq: Values are equal
  - $ne: Values are not equal
  - $gt: Value is greater than another value
  - $gte: Value is greater than or equal to another value
  - $lt: Value is less than another value
  - $lte: Value is less than or equal to another value
  - $in: Value is matched within an array `{"salary":{$in:[5,10]}}`
  - $nin: Value not in
  - `$all`: find in an array all elements matching in finding ['Smartphones', 'iOS']

Eg: `db.trips.find({"id":{$in:[1,20]}})`

- Logical: The following operators can logically compare multiple queries. `operator:[{condition1},{condition2},..]`
  - $and: Returns documents where both queries match
  - $or: Returns documents where either query matches
  - $nor: Returns documents where both queries fail to match
  - $not: Returns documents where the query does not match

Eg: `db.trips.find({$or:["id":{$gt:10},"price":{$lt:19}]})`

Evaluation: The following operators assist in evaluating documents.

- $regex: Allows the use of regular expressions when evaluating field values
- $text: Performs a text search
- $where: Uses a JavaScript expression to match documents

- `$expr`: `$expr: {operator:[field, value]}`
- `$elemMatch`: find an object in an array of objects only, cannot find in a field ot an array
- `$size`: find the number of elements in an array `{$scores: {$size: 6}}`

1. `Collection.find().count()`

2. `Collection.countDocuments()`

3. `Collection.aggregate()`
   1. `[{$match:{}}, {$group:{}}, {$sort: {}}, {$skip: 10}, {$limit}]`
   2. Group: total, average
   3. `Var pipeline = [state1, state2, state3]`
   4. `{$count: "total"}`

4. `Collection.listIndexes()`

5. `Collection.countDocuments(query)`

6. `FindAndModify(query:{}, update: {}, {new: true})`: new = true: return a modified document

7. Expression: `db.movies.find({$expr:{$gt: ["$idbm.votes", "$year"]}})`

8. `Db.products.find("name":"Smartphone").count();`

```javascript
{
  "customer.gender": "M",
  items: {
    $elemMatch: {
      name: 'printer paper'
    }
  }
}
```

### Working with Documents - Insert, Update, and Delete

- Inserting Documents

- `Collection.insertOne(document, option)`: Option = { writeConcern: { w : "majority", wtimeout : 100 } }
- `Db.insert({}, {returnId: true})`
- `Db.insert([])`
- `Collection.insertMany()`

- Updating Documents

- `Collection.updateOne(filter, update, option)`
  - Filter = query
  - Update = `{$set: {}} or {$inc: {balance: 1000}}`
  - Update = `{$push: {readings: {v: 10, t: new Date()}}}`
  - Option = `{upsert: true}` upsert not $upsert
  
- `Collection.update()`

- `Collection.updateMany()`

- `await salesCollection.updateMany({items: {$elemMatch: {name: "printer paper"}}},{$set: {"items.$.price": 20 }});`

- Deleting Documents

- `deleteMany(query)`: If the query = {} delete all documents in the collection
- `deleteOne()`: return `({acknowledge:true, deleteCount: 1})`
- `deleteMany().deletedCount`

### MongoDB Indexing

MongoDB offers various indexing options to optimize query performance:

- Single Index

- Compound Index

- MultiKey Index

- Unique Index vs Non-Unique Index

- Sparse Index vs Non-Sparse Index

- Geography index: `createIndex({locationField:'2dsphere'})`

  - Example Query: You can perform geospatial queries using operators like $near, $geoWithin, $geoIntersects, and others to find documents based on their geographical proximity or containment.

### MongoDB Aggregation Framework

MongoDB's Aggregation Framework is a powerful tool for data transformation and analysis. Let's explore some aggregation stages:

- `$match`
- `$addFields`
- `$group`
- `$sample`: {size: 10} get random 10 documents
- `$project: {total_avg: $round {number, place}}`
- `$sortByCount: "$city"` => descending = $group $sort descending
- `$lookup:{from: , localField:, foreignField, as:}`
- `$out`: to another collection must be in the same database => Last stage only
- `$bucketAuto :{groupBy: "$tripduration", buckets:5, output: {}}`
- `$bucket: {groupBy:"$tripduration",boundaries: [10,100,1000,1000,100000], default: "other", output}`

### Full Text Search in MongoDB

MongoDB supports full-text search with various options for tokenization and fuzzy searching.

## Static Search

```json
{
  "mappings": {
    "dynamic": false,
    "fields": {
      "company": {
        "type": "string"
      },
      "title": {
        "type": "string"
      }
    }
  }
}
```

## Tokenization and Fuzzy Options

- EdgeGram beginning of the word
- rightEdgeGram
- nGram

Fuzzy option:

- maxEdits
- MaxExpansions
- prefixLength

## MongoDB Transactions

MongoDB provides support for transactions, ensuring data consistency in complex operations.

```javascript
// Transaction
Session startSession()
UpdateOne({}, {$inc: {balance: -30}})
CommitTransaction
AbortTransaction
```

## MongoDB Sharding and Replica Set

Sharding and Replica Set are essential concepts for scaling and ensuring high availability in MongoDB.

### Sharding

Sharding distributes data across multiple servers to improve read and write scalability.

### Replica Set

A Replica Set consists of multiple nodes with one primary node and two replicate nodes.

## MongoDB Best Practices

MongoDB offers various best practices and considerations for efficient data modeling and management.

### Data Model Patterns

There are 12 data model patterns, including Computed Pattern, Attribute Pattern, Polymorphic pattern, Bucket, Outline, and others.

### Capped Collection

```javascript
db.createCollection("", {capped: true, size: 10, max: 3})
```

Capped collection has a Limit size.

### Read and Write Concern

- Read Concern: Available, Majority, Local
- Write Concern: Majority

## MongoDB Views

Creating and working with views in MongoDB:

```javascript
Db.createView("view_name","source_collection",[pipeline],collation)
Db.createView("name", "source", [])
```

Cannot update to view.

## MongoDB Administration and Tools

MongoDB provides tools and commands for administrative tasks, backup, and restore.

### mongorestore

Use `mongorestore` to restore a dump file to MongoDB.

### Cursor Method and Indexing

Choose the appropriate cursor method, like `Cursor.hint()`, to force MongoDB to use a specific index for a query.

## MongoDB Security

Ensure the security of your MongoDB instance by understanding the importance of the "admin" database and controlling user access.

## Conclusion

In conclusion, MongoDB offers a robust and flexible database solution with a wide range of features for efficient data management and querying. Understanding the various concepts and best practices will empower you to make the most out of MongoDB in your projects. Happy coding!