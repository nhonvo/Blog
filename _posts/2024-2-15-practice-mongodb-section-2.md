---
layout:     post
title:      "Mongodb practice"
subtitle:   "Senior note section 2"
date:       2024-2-15 12:00:00
author:     "Truong Nhon"
published: true
catalog: true
tags:
    - mongodb
---

## Part 1: Query Operators

```javascript
codedb.collection.findOne(query, projection)
db.collection.find(query, projection)
Case Sensitivity in MongoDB
db.trips.FindOne() - is incorrect
db.trips.Find() - is incorrect
Query in Explorer
```

## Part 2: Logical Operators

```javascript
code$eq, $ne
db.trips.find({"tripduration":{$eq: 200}})
$gt, $gte
db.trips.find({"tripduration": {$lt: 200}})
$lt, $lte
db.trips.find({"tripduration": {$lt: 200}})
$in
db.trips.find({"start station id": {$in: [302, 536]}})
```

[Query Comparison Operators Reference](https://www.mongodb.com/docs/manual/reference/operator/query-comparison/)

## Part 3: Projection and Query

```javascript
codedb.collection.find({query},{projection});
db.trips.find({query}, {tripduration:1, bikeid:1, _id:0})
```

## Part 4: Embedded Documents

```javascript
code{operator: [{condition1}, {condition2}...]}
$and
$or, $nor
db.trips.find({$and: [{tripduration:{$gt: 400}}, {"birth year": {$gt: 1988}}]})
db.accounts.find({$and: [{products: 'CurrencyService'}, {products: 'InvestmentStock'}, {products: {$size: 2}}]})
db.trips.find({$or: [{tripduration: {$lt: 400}}, {tripduration: {$gt:1900}}]})
db.inspections.find({$or: [{result: "No Violation Issued"}, {result: "Violation Issued"}]})
```

[Logical Query Operators Reference](https://www.mongodb.com/docs/manual/reference/operator/query-logical/)

## Part 5: Array Operators

```javascript
codedb.inspections.find({"address.zip": 11427})
db.inspections.find({result: "Pass","address.zip": {$in:[11427]}}, {result: 1, date:1, address:1})
db.inspections.updateMany({_id: ObjectId('56d61033a378eccde8a83569')}, {$set: {"address.phone": {code: '84', number: '999988778'}})
Find 3 level of embedded documents
db.inspections.find({"address.phone.code": "84"});

db.accounts.find({"products":['Brokerage','InvestmentStock']);
$all
db.accounts.find({"products":{$all:['Brokerage','InvestmentStock']}})
$inc
db.accounts.find({"products":{$in:['Brokerage','InvestmentStock']}})
$size
db.accounts.find({"products":{$size: 3}})
$elemMatch
db.grades.find({"scores":{$elemMatch:{"type":"exam", "score: {$gt: 80}}}})
```

[Array Query Operators Reference](https://www.mongodb.com/docs/manual/reference/operator/query-array/)

## Part 6: Counting Documents

```javascript
codedb.collection.countDocuments();
db.trips.countDocuments({tripduration: {$gt: 1000}})
db.collection.find({query}).count();
```

## Part 7: Sorting, Limiting, and Skipping

```javascript
codedb.collection.find({query}).sort({field: 1}) => asc
db.collection.find({query}).sort({field: -1}) => desc
db.trips.find({}).sort({tripduration:1, "start station id": -1})
db.collection.find({query}).limit(number);
db.trips.find({tripduration: {$gt: 1400}}).limit(10)
db.collection.find({query}).skip(number);
db.trips.find({tripduration: {$gt: 1400}}).skip(5).limit(10);
```

## Part 8: Inserting Documents

```javascript
codedb.collection.insert([], {option}) 
db.testcollection.insert([{name:'test', age: 10}, {name:'test2', age: 12}])
db.collection.insertOne({});
We can insert empty object {}, it will generate _id for this object
We cannot insert with the same _id
db.testcollection.insertOne({_id: 1001, "name": "Test","scores":10})
```

[Insert Documents Tutorial](https://www.mongodb.com/docs/manual/tutorial/insert-documents/)

## Part 9: Deleting Documents

```javascript
codedb.collection.deleteOne();
db.testcollection.deleteMany({name:"test1"});
db.collection.deleteMany();
db.testcollection.deleteMany({name:"test1"});
db.testcollection.deleteMany({name:"test123"});
db.collection.findOneAndDelete()
Return a document after delete the document
db.accounts.findOneAndDelete({account_id: 977774})
db.collection.drop()
```

[Delete Methods Reference](https://www.mongodb.com/docs/manual/reference/delete-methods/)

## Part 10: Updating Documents

```javascript
codedb.collection.updateOne({filter}{update},{option})
db.collection.updateMany({filter},{update}, {option})
$set
$inc
db.zips.updateMany({city: "MC CALLA"}, {$inc: {pop: 1}})
$push = using to push an item embedded array of document
db.grades.updateMany({student_id: 4}, {$push: {scores: {type: "new exam", score: 100}}})
Update embedded array
db.sales.updateMany({items: {$elemMatch: {name: "printer paper"}}},{$set: {"items.$.price": 20 }}); 
db.grades.updateMany({scores:{$elemMatch:{score: {$gt : 33}}}}, {$set: {"scores.$.type": "exam2"}});

db.trips.updateMany({tripduration: 199999},{$set: {usertype: 'Subscriber'}})
db.trips.updateMany({tripduration: 199999},{$set: {usertype: 'Subscriber'}}, {upsert: true})
db.collection.replaceOne({filter}, {replacement},{option})
Option: {upsert: true/false}
db.accounts.replaceOne({account_id: "unknown"},{account_id: "new account", limit: 2024}, {upsert: true})
```

[Update Methods Reference](https://www.mongodb.com/docs/manual/reference/update-methods/)


## MONGODB PRACTICE SECTION 2

## Aggregation

```javascript
db.orders.aggregate( [
    // Stage 1: Filter pizza order documents by pizza size
    {
        $match: { size: "medium" }
    },
    // Stage 2: Group remaining documents by pizza name and calculate total quantity
    {
        $group: { _id: "$name", totalQuantity: { $sum: "$quantity" } }
    },
    // Stage 3: Select items having totalQuantity greater than 8
    {
        $match: { totalQuantity: { $gt: 8 } }
    }
] )
```

[Aggregation Reference](https://www.mongodb.com/docs/manual/aggregation/)

### Aggregation - Stage

- `$match`
- `$group`
- `$project`
- `$sort`
- `$limit`
- `$skip`
- `$out`

[Aggregation Pipeline Operators Reference](https://www.mongodb.com/docs/manual/reference/operator/aggregation-pipeline/)

### Aggregation - Optimize

- `$project` + `$match`
- `$project` + `$skip`
- `$sort` + `$match`

[Aggregation Pipeline Optimization](https://www.mongodb.com/docs/manual/core/aggregation-pipeline-optimization/)

### Aggregation - Exam Question

Given the following documents:

```
jsonCopy code{_id:1, restaurant: "Quesadillas Inc.", rating: 4.5 }
{_id:2, restaurant: "Pasta Inc.", rating: 3.9}
{_id:3, restaurant: "Tacos Inc.", rating: 2.5}
```

A developer wants to find the highest-rated restaurant in a list. An index has been created on the appropriate field. What query satisfies the requirements? (Choose 1)

A. `const pipeline = [ { $sort: { rating : -1, limit: 1 } } ]; const aggCursor = coll.runAggregation(pipeline);`
B. `const pipeline = [ { $sort: { rating : -1 } }, { $limit: 1 } ]; const aggCursor = coll.runAggregation(pipeline);`
C. `const pipeline = [ { $sort: { rating : -1 , limit: 1} } ]; const aggCursor = coll.aggregate(pipeline);`
D. `const pipeline = [ { $sort: { rating : -1 } }, { $limit: 1 } ]; const aggCursor = coll.aggregate(pipeline);`

## Index

### Index - Create

```javascript
db.collection.createIndex(<keys>, <options>)
db.collection.createIndex({"a": 1})
db.collection.createIndex({"a": -1})
db.collection.createIndex({"a": 1, "b": 1})
db.collection.createIndex({"a": 1}, {unique: true, expireAfterSeconds: 3600})
```

- Keys: 

  ```
  {<field>: <1 / –1>}
  ```

  - `1` => ascending index
  - `-1` => descending index

- Options: `unique`, `expireAfterSeconds`

[Index Creation Reference](https://www.mongodb.com/docs/manual/reference/method/db.collection.createIndex/)

### Index - Get

```javascript
db.collection.getIndexes()
```

[Index Retrieval Reference](https://www.mongodb.com/docs/manual/reference/method/db.collection.getIndexes/)

### Index - Drop

```javascript
db.collection.dropIndex(<index>)
db.products.dropIndex("name_1")
```

[Index Deletion Reference](https://www.mongodb.com/docs/manual/reference/method/db.collection.dropIndex/)

### Index - Hide

```javascript

db.collection.hideIndex(<index>)
```

[Index Hiding Reference](https://www.mongodb.com/docs/manual/reference/method/db.collection.hideIndex/)

### Index - Explain Query

```javascript
db.collection.explain(<mode>)
```

- Modes: `queryPlanner` (default), `executionStats`, `allPlansExecution`

[Index Query Explanation Reference](https://www.mongodb.com/docs/manual/reference/method/db.collection.explain/)

### Index – Hint

```javascript
db.collection.find({"a": "some value"}).hint({ a: 1 })
db.collection.find({"a": "some value"}).hint("a_1")
```

[Index Hinting Tutorial](https://www.mongodb.com/docs/manual/tutorial/measure-index-use/)

### Index – Compound

Given the following query:

```javascript
db.collection.find({ }).sort({ "product": 1, "price": 1 })
```

Which index will improve the performance of this query? (Choice 2)

A. `db.collection.createIndex( { "product": 1, "price": 1 } )`
B. `db.collection.createIndex( { "product": 1, "price": -1 } )`
C. `db.collection.createIndex( { "product": -1, "price": 1 } )`
D. `db.collection.createIndex( { "product": -1, "price": -1 } )`

### Index – Behind the Scene

Given a collection called collection:

```json
{ "a": 1, "b": 1 }
{ "a": 1, "b": 2 }
{ "a": 2, "b": 1 }
{ "a": 2, "b": 2 }
{ "a": 2, "b": 3 }
{ "a": 3, "b": 1 }
{ "a": 3, "b": 2 }
```

Find `a = 2`, `b > 1` sorted by `b`.

### Index – ESR Rule

The ESR (Equality, Sort, Range) Rule:

```javascript
db.cars.createIndex({ manufacturer: 1, model: 1, cost: 1 })
```

[ESR Rule Explanation Reference](https://www.mongodb.com/docs/manual/tutorial/equality-sort-range-rule/)

## Homework

- Review workshop record
- Practice commands in this section with your sample collections in MDB_EDU database (cloud.mongodb.com)
- Follow and practice section 10, 12 in Udemy Course: [MongoDB - The Complete Developer's Guide](https://fpt-software.udemy.com/course/mongodb-the-complete-developers-guide/learn/lecture/11850736)
- Preview Atlas search
