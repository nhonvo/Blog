---
layout:     post
title:      "Mongodb practice 3 section"
subtitle:   "TRAINING COURSE"
date:       2024-2-15 12:00:00
author:     "Truong Nhon"
published: true
catalog: true
tags:
    - mongodb
---

## MONGODB PRACTICE SECTION 1

### Part 1: Query Operators

```javascript
db.collection.findOne(query, projection)
db.collection.find(query, projection)
Case Sensitivity in MongoDB
db.trips.FindOne() - is incorrect
db.trips.Find() - is incorrect
Query in Explorer
```

### Part 2: Logical Operators

```javascript
$eq, $ne
db.trips.find({"tripduration":{$eq: 200}})
$gt, $gte
db.trips.find({"tripduration": {$lt: 200}})
$lt, $lte
db.trips.find({"tripduration": {$lt: 200}})
$in
db.trips.find({"start station id": {$in: [302, 536]}})
```

[Query Comparison Operators Reference](https://www.mongodb.com/docs/manual/reference/operator/query-comparison/)

### Part 3: Projection and Query

```javascript
db.collection.find({query},{projection});
db.trips.find({query}, {tripduration:1, bikeid:1, _id:0})
```

### Part 4: Embedded Documents

```javascript
{operator: [{condition1}, {condition2}...]}
$and
$or, $nor
db.trips.find({$and: [{tripduration:{$gt: 400}}, {"birth year": {$gt: 1988}}]})
db.accounts.find({$and: [{products: 'CurrencyService'}, {products: 'InvestmentStock'}, {products: {$size: 2}}]})
db.trips.find({$or: [{tripduration: {$lt: 400}}, {tripduration: {$gt:1900}}]})
db.inspections.find({$or: [{result: "No Violation Issued"}, {result: "Violation Issued"}]})
```

[Logical Query Operators Reference](https://www.mongodb.com/docs/manual/reference/operator/query-logical/)

### Part 5: Array Operators

```javascript
db.inspections.find({"address.zip": 11427})
db.inspections.find({result: "Pass","address.zip": {$in:[11427]}}, {result: 1, date:1, address:1})
db.inspections.updateMany({_id: ObjectId('56d61033a378eccde8a83569')}, {$set: {"address.phone": {: '84', number: '999988778'}})
Find 3 level of embedded documents
db.inspections.find({"address.phone.": "84"});

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

### Part 6: Counting Documents

```javascript
db.collection.countDocuments();
db.trips.countDocuments({tripduration: {$gt: 1000}})
db.collection.find({query}).count();
```

### Part 7: Sorting, Limiting, and Skipping

```javascript
db.collection.find({query}).sort({field: 1}) => asc
db.collection.find({query}).sort({field: -1}) => desc
db.trips.find({}).sort({tripduration:1, "start station id": -1})
db.collection.find({query}).limit(number);
db.trips.find({tripduration: {$gt: 1400}}).limit(10)
db.collection.find({query}).skip(number);
db.trips.find({tripduration: {$gt: 1400}}).skip(5).limit(10);
```

### Part 8: Inserting Documents

```javascript
db.collection.insert([], {option}) 
db.testcollection.insert([{name:'test', age: 10}, {name:'test2', age: 12}])
db.collection.insertOne({});
We can insert empty object {}, it will generate _id for this object
We cannot insert with the same _id
db.testcollection.insertOne({_id: 1001, "name": "Test","scores":10})
```

[Insert Documents Tutorial](https://www.mongodb.com/docs/manual/tutorial/insert-documents/)

### Part 9: Deleting Documents

```javascript
db.collection.deleteOne();
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

### Part 10: Updating Documents

```javascript
db.collection.updateOne({filter}{update},{option})
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

---

## MONGODB PRACTICE SECTION 2

### Aggregation

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

#### Aggregation - Stage

- `$match`
- `$group`
- `$project`
- `$sort`
- `$limit`
- `$skip`
- `$out`

[Aggregation Pipeline Operators Reference](https://www.mongodb.com/docs/manual/reference/operator/aggregation-pipeline/)

#### Aggregation - Optimize

- `$project` + `$match`
- `$project` + `$skip`
- `$sort` + `$match`

[Aggregation Pipeline Optimization](https://www.mongodb.com/docs/manual/core/aggregation-pipeline-optimization/)

- Another aggregation pipeline

```javascript
db.collection.aggregate.(
  [{
    "$search": {
    "text":
    {
      "path": "name",
      "query": "cuban"
    }
}}])
```

#### Aggregation - Exam Question

Given the following documents:

```json
{"_id":1, restaurant: "Quesadillas Inc.", rating: 4.5 },
{"_id":2, restaurant: "Pasta Inc.", rating: 3.9},
{"_id":3, restaurant: "Tacos Inc.", rating: 2.5}
```

A developer wants to find the highest-rated restaurant in a list. An index has been created on the appropriate field. What query satisfies the requirements? (Choose 1)

- A. `const pipeline = [ { $sort: { rating : -1, limit: 1 } } ]; const aggCursor = coll.runAggregation(pipeline);`
- B. `const pipeline = [ { $sort: { rating : -1 } }, { $limit: 1 } ]; const aggCursor = coll.runAggregation(pipeline);`
- C. `const pipeline = [ { $sort: { rating : -1 , limit: 1} } ]; const aggCursor = coll.aggregate(pipeline);`
- D. `const pipeline = [ { $sort: { rating : -1 } }, { $limit: 1 } ]; const aggCursor = coll.aggregate(pipeline);`

### Index

#### Index - Create

```javascript
db.collection.createIndex(<keys>, <options>)
db.collection.createIndex({"a": 1})
db.collection.createIndex({"a": -1})
db.collection.createIndex({"a": 1, "b": 1})
db.collection.createIndex({"a": 1}, {unique: true, expireAfterSeconds: 3600})
```

- Keys:

```json
{<field>: <1 / –1>}
```

- `1` => ascending index
- `-1` => descending index

- Options: `unique`, `expireAfterSeconds`

[Index Creation Reference](https://www.mongodb.com/docs/manual/reference/method/db.collection.createIndex/)

#### Index - Get

```javascript
db.collection.getIndexes()
```

[Index Retrieval Reference](https://www.mongodb.com/docs/manual/reference/method/db.collection.getIndexes/)

#### Index - Drop

```javascript
db.collection.dropIndex(<index>)
db.products.dropIndex("name_1")
```

[Index Deletion Reference](https://www.mongodb.com/docs/manual/reference/method/db.collection.dropIndex/)

#### Index - Hide

```javascript

db.collection.hideIndex(<index>)
```

[Index Hiding Reference](https://www.mongodb.com/docs/manual/reference/method/db.collection.hideIndex/)

#### Index - Explain Query

```javascript
db.collection.explain(<mode>)
```

- Modes: `queryPlanner` (default), `executionStats`, `allPlansExecution`

[Index Query Explanation Reference](https://www.mongodb.com/docs/manual/reference/method/db.collection.explain/)

#### Index – Hint

```javascript
db.collection.find({"a": "some value"}).hint({ a: 1 })
db.collection.find({"a": "some value"}).hint("a_1")
```

[Index Hinting Tutorial](https://www.mongodb.com/docs/manual/tutorial/measure-index-use/)

#### Index – Compound

Given the following query:

```javascript
db.collection.find({ }).sort({ "product": 1, "price": 1 })
```

Which index will improve the performance of this query? (Choice 2)

A. `db.collection.createIndex( { "product": 1, "price": 1 } )`
B. `db.collection.createIndex( { "product": 1, "price": -1 } )`
C. `db.collection.createIndex( { "product": -1, "price": 1 } )`
D. `db.collection.createIndex( { "product": -1, "price": -1 } )`

#### Index – Behind the Scene

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

#### Index – ESR Rule

The ESR (Equality, Sort, Range) Rule:

```javascript
db.cars.createIndex({ manufacturer: 1, model: 1, cost: 1 })
```

[ESR Rule Explanation Reference](https://www.mongodb.com/docs/manual/tutorial/equality-sort-range-rule/)

#### Homework

- Review workshop record
- Practice commands in this section with your sample collections in MDB_EDU database (cloud.mongodb.com)
- Follow and practice section 10, 12 in Udemy Course: [MongoDB - The Complete Developer's Guide](https://fpt-software.udemy.com/course/mongodb-the-complete-developers-guide/learn/lecture/11850736)
- Preview Atlas search

---

## MONGODB PRACTICE SECTION 3

### Exam - 43/53 to PASS

### What will be asked?

- CRUD 27 – 28
  - Mongo Shell
  - CRUD functions (findOne, find, insertOne, insertMany, updateOne, updateMany, deleteOne, deleteMany, findAndModify...)
  - Query in array fields, nested object fields ($in, $elemMatch)
  - Aggregation ($match, $group, $out)
  - Atlas Search index and query
- Index 9 – 10
  - Choose correct index for a query
  - From explain query output, identify if using index scan
  - Index with Nested object field
- Driver NodeJS / Java / C#/ Python / PHP 9 – 10
  - Driver significant features, URI, connection pooling
  - Driver source code syntax: CRUD, Aggregation pipeline
- The Document Model 4 – 5
  - Which document can/cannot store in the same collection
  - BSON data type (Ex: Decimal128, not Float64)
- Data Modeling 1 – 2
  - Embedded or Referred relationship
- Atlas Tools 1 – 2
  - MongoDB Atlas UI
  - Data Explorer to query data

### Data Modeling

- Embedded Data
  - Embedded documents store related data in a single document structure. A document can contain arrays and sub-documents with related data.
- References
  - References store relationships between data by including links, called references, from one document to another.
- Ref: [Data Modeling Guide](https://www.mongodb.com/docs/manual/data-modeling/)
  
#### Data Modeling - Embedded

- Model One-to-One Relationships
  - Ref: [Embedded One-to-One Relationships](https://www.mongodb.com/docs/manual/tutorial/model-embedded-one-to-one-relationships-between-documents/)
- Model One-to-Many Relationships with Embedded Documents
  - Receives all required information in a single read operation
  - Example: Country to major cities, Author to books, Student to classes
  - Limit size of a document: 16MB
  - Ref: [Embedded One-to-Many Relationships](https://www.mongodb.com/docs/manual/tutorial/model-embedded-one-to-many-relationships-between-documents/)

#### Data Modeling - References

- Model One-to-Many Relationships with Document References
  - To avoid repetition of the referred data, use references
  - Example: Book and Publisher
  - Ref: [Referenced One-to-Many Relationships](https://www.mongodb.com/docs/manual/tutorial/model-referenced-one-to-many-relationships-between-documents/)

### Atlas Search

#### Atlas Search – Index Field Mappings

- Dynamic Mapping
  - Automatically index all supported field types using dynamic mappings
- Static Mapping
  - Specify the fields to index
  - Syntax:

```json
{
    "mappings": {
    "dynamic": <boolean>,
    "fields": {
        "<field-name>": {
        "type": "<field-type>",
        …
        }
    }
    }
}
```

- Ref: [Atlas Search - Field Mappings](https://www.mongodb.com/docs/atlas/atlas-search/define-field-mappings/)

#### Atlas Search – Index Analyzer

- Ref: [Atlas Search Analyzers](https://www.mongodb.com/docs/atlas/atlas-search/analyzers/)
- Analyzer Description:
  - Standard: Uses the default analyzer for all Atlas Search indexes and queries.
  - Simple: Divides text into searchable terms wherever it finds a non-letter character.
  - Whitespace: Divides text into searchable terms wherever it finds a whitespace character.
  - Language: Provides a set of language-specific text analyzers.
  - Keyword: Indexes text fields as single terms.

#### Atlas Search – Index Analyzer Tokenizer

- whitespace
- nGram
- edgeGram => Autocomplete
- regexCaptureGroup
- Ref: [Atlas Search - Tokenizers](https://www.mongodb.com/docs/atlas/atlas-search/analyzers/tokenizers/)

#### Atlas Search – Query

- Single Field Search
- Multiple Field Search
- Nested Field Search
- Wildcard Field Search
- Ref: [Atlas Search - Path Construction](https://www.mongodb.com/docs/atlas/atlas-search/path-construction/)
- Example:

```json
$search: {
    "text": {
    "query": "Ford",
    "path": "make"
    }
}
```

#### Atlas Search – Query Compound

- should
- must
- mustNot
- filter
- Ref: [Atlas Search - Compound](https://www.mongodb.com/docs/atlas/atlas-search/compound/)

### Node.js Driver

- Connection
  - Video: [Connecting to MongoDB in Node.js](https://learn.mongodb.com/courses/connecting-to-mongodb-in-nodejs)
  - Ref: [Node.js Driver Connection](https://www.mongodb.com/docs/drivers/node/current/fundamentals/connection/connect/)
  
#### CRUD

- Video: [MongoDB CRUD Operations in Node.js](https://learn.mongodb.com/courses/mongodb-crud-operations-in-nodejs)
- Ref: [Node.js Driver CRUD](https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/)

#### Aggregation driver

- Video: [MongoDB Aggregation with Node.js](https://learn.mongodb.com/courses/mongodb-aggregation-with-nodejs)
- Ref: [Node.js Driver Aggregation](https://www.mongodb.com/docs/drivers/node/current/fundamentals/aggregation/)

#### MongoClient API

- Ref: [MongoClient API](https://mongodb.github.io/node-mongodb-native/6.3/classes/MongoClient.html)

#### Node.js Driver – Connection Pool

- Definition
  - A connection pool is a cache of open, ready-to-use database connections maintained by the driver.
  - Your application can seamlessly get connections from the pool, perform operations, and return connections back to the pool.
  - Connection pools are thread-safe.
- Benefits
  - Helps reduce application latency and the number of times new connections are created.
  - A connection pool creates connections at startup.
  - No need to manually return connections to the pool, connections return to the pool automatically.
  - When requesting a connection and there’s an available connection in the pool, a new connection does not need to be created.
- Ref: [Connection Pool Overview](https://www.mongodb.com/docs/manual/administration/connection-pool-overview/)

### Practice Questions

- [Practice Questions](https://learn.mongodb.com/learn/course/associate-developer-node-practice-questions/prep-questions/practice-questions)

### Homework driver

- Review workshop record
- Follow the video of Node.js Driver and practice with your sample collections in MDB_EDU database ([cloud.mongodb.com](https://cloud.mongodb.com))
- Read document references in this slide
- Review all to prepare for the final test in the next week (53 questions, 80% to pass)
- Register and schedule for the exam
