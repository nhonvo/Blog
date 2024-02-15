---
layout:     post
title:      "Mongodb practice"
subtitle:   "Senior note section 3"
date:       2024-2-15 15:00:00
author:     "Truong Nhon"
published: true
catalog: true
tags:
  - mongodb
---

## Exam - 43/53 to PASS

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
- Driver NodeJS / Java / C# / Python / PHP 9 – 10
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

## Data Modeling

- Embedded Data
  - Embedded documents store related data in a single document structure. A document can contain arrays and sub-documents with related data.
- References
  - References store relationships between data by including links, called references, from one document to another.
- Ref: [Data Modeling Guide](https://www.mongodb.com/docs/manual/data-modeling/)
  
### Data Modeling - Embedded

- Model One-to-One Relationships
  - Ref: [Embedded One-to-One Relationships](https://www.mongodb.com/docs/manual/tutorial/model-embedded-one-to-one-relationships-between-documents/)
- Model One-to-Many Relationships with Embedded Documents
  - Receives all required information in a single read operation
  - Example: Country to major cities, Author to books, Student to classes
  - Limit size of a document: 16MB
  - Ref: [Embedded One-to-Many Relationships](https://www.mongodb.com/docs/manual/tutorial/model-embedded-one-to-many-relationships-between-documents/)

### Data Modeling - References

- Model One-to-Many Relationships with Document References
  - To avoid repetition of the referred data, use references
  - Example: Book and Publisher
  - Ref: [Referenced One-to-Many Relationships](https://www.mongodb.com/docs/manual/tutorial/model-referenced-one-to-many-relationships-between-documents/)

## Atlas Search – Index Field Mappings

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

### Atlas Search – Index Analyzer

- Ref: [Atlas Search Analyzers](https://www.mongodb.com/docs/atlas/atlas-search/analyzers/)
- Analyzer Description:
  - Standard: Uses the default analyzer for all Atlas Search indexes and queries.
  - Simple: Divides text into searchable terms wherever it finds a non-letter character.
  - Whitespace: Divides text into searchable terms wherever it finds a whitespace character.
  - Language: Provides a set of language-specific text analyzers.
  - Keyword: Indexes text fields as single terms.

### Atlas Search – Index Analyzer Tokenizer

- whitespace
- nGram
- edgeGram => Autocomplete
- regexCaptureGroup
- Ref: [Atlas Search - Tokenizers](https://www.mongodb.com/docs/atlas/atlas-search/analyzers/tokenizers/)

### Atlas Search – Query

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

### Atlas Search – Query Compound

- should
- must
- mustNot
- filter
- Ref: [Atlas Search - Compound](https://www.mongodb.com/docs/atlas/atlas-search/compound/)

## Node.js Driver

- Connection
  - Video: [Connecting to MongoDB in Node.js](https://learn.mongodb.com/courses/connecting-to-mongodb-in-nodejs)
  - Ref: [Node.js Driver Connection](https://www.mongodb.com/docs/drivers/node/current/fundamentals/connection/connect/)
  
### CRUD

- Video: [MongoDB CRUD Operations in Node.js](https://learn.mongodb.com/courses/mongodb-crud-operations-in-nodejs)
- Ref: [Node.js Driver CRUD](https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/)

### Aggregation

- Video: [MongoDB Aggregation with Node.js](https://learn.mongodb.com/courses/mongodb-aggregation-with-nodejs)
- Ref: [Node.js Driver Aggregation](https://www.mongodb.com/docs/drivers/node/current/fundamentals/aggregation/)

### MongoClient API

- Ref: [MongoClient API](https://mongodb.github.io/node-mongodb-native/6.3/classes/MongoClient.html)

### Node.js Driver – Connection Pool

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

## Practice Questions

- [Practice Questions](https://learn.mongodb.com/learn/course/associate-developer-node-practice-questions/prep-questions/practice-questions)

## Homework

- Review workshop record
- Follow the video of Node.js Driver and practice with your sample collections in MDB_EDU database ([cloud.mongodb.com](https://cloud.mongodb.com))
- Read document references in this slide
- Review all to prepare for the final test in the next week (53 questions, 80% to pass)
- Register and schedule for the exam

THANK YOU
