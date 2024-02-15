---
layout:     post
title:      "Mongo note - udemy note"
subtitle:   "part 2"
date:       2024-1-4 12:00:00
author:     "Truong Nhon"
hidden: false
published: true
catalog: true
lang: en
tags:
  - mongo
---

## Installation

- compass, shell, database tool

```bash
atlas: username: truongnhon password: rVSBsr-X3R2e3XW
```

- connect to atlas

  - compass: `mongodb+srv://truongnhon:rVSBsr-X3R2e3XW@mongo.kh3ovey.mongodb.net/`

  - shell: `mongosh "mongodb+srv://sandbox.bvniwju.mongodb.net/" --apiVersion 1 --username truongnhon`

- basic command

  - `show dbs` : list down all database

  - `use <database_name>` : switch database

  - `show collections`

  - `db.<collection_name>.findOne()` : get first record

  - `db.<collection_name>.find()` : find

## MongoDB Data Types

### BSON Types

- Double: doesn’t have Float in MongoDB
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

## Query

### Find

- db.collection.findOne(query,projection)
  - eg: `db.grades.findOne({"class":"abc"})`
  - eg: `db.grades.findOne({"class":"abc","id":419})`

- db.collection.find(query,projection)
  - eg: `db.grades.find("class":"abc")`

### $

- Comparison: The following operators can be used in queries to compare values: `{field:{operator:value}}`
  - $eq: Values are equal
  - $ne: Values are not equal
  - $gt: Value is greater than another value
  - $gte: Value is greater than or equal to another value
  - $lt: Value is less than another value
  - $lte: Value is less than or equal to another value
  - $in: Value is matched within an array `{"salary":{$in:[5,10]}}`
  - $nin: Value not in

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

### $expr: `$expr: {operator:[field, value]}`

- operator: This is likely to be a comparison or logical operator used to perform a specific operation on the given field and value. Common operators include equality (==), inequality (!=), greater than (>), less than (<), etc.
- field: Refers to the attribute or property that you want to apply the operator to. It could be a column name in a database, a key in a JSON object, or a field in a data structure.
- value: Represents the value that you want to compare against the field using the specified operator.

```js
db.trips.find({$expr:{$gt: ["$price",400]}})
```

### Element operator

- `$exists`: returns documents that contain the specified field `db.collection.find({field:{$exists:<boolean>}})`
- `$type`: returns fields contain values of a specific data type `db.collection.find({field:{$type:<BSONtype>}})` and `db.collection.find({field:{$type:[<BSONtype1>,<BSONtype2>,...]}})`

```js
// exist
db.trips.find({"name":{$exist:true}})

// type
db.routes.find({"airplane":{$type:"int"}})
```

## Cursor

1. **Count:**
   - Syntax: `db.collection.find({query}).count()`
   - This command is used to count the number of documents in a collection that match a specific query.
2. **Sort:**
   - Syntax: `db.collection.find({query}).sort({field: 1 or -1})`
   - This command is used to sort the result of a query based on a specified field in ascending (1) or descending (-1) order.
3. **Limit:**
   - Syntax: `db.collection.find({query}).limit(number)`
   - This command is used to limit the number of documents returned by a query to a specified number.
4. **Size:**
   - Size is not a direct command in MongoDB queries. If you are referring to the size of a collection or an index, you can use the `db.collection.stats()` command.
5. **Skip:**
   - Syntax: `db.collection.find({query}).skip(number)`
   - This command is used to skip a specified number of documents and return the remaining documents in the result set.

```javascript
// Count documents that match a query
db.collection.find({ field: value }).count();

// Find documents, sort them by a specific field in descending order, limit the result to 10, and skip the first 5 documents
db.collection.find({}).sort({ fieldName: -1 }).limit(10).skip(5);
```

## Projection

Specify which fields should be included or excluded from the result set. `db.collection.find({ query }, { projection })`.

```javascript
// Find documents where "status" is "active", include "name" and "age" fields, exclude "_id" field
db.collection.find({ status: "active" }, { name: 1, age: 1, _id: 0 })
```

## Query array
