---
layout:     post
title:      "Mongo with Csharp"
subtitle:   ""
date:       2024-3-1 00:00:00
author:     "Truong Nhon"
published: true
catalog: true
tags:
  - mongodb
  - c#
---

## Working with MongoDB Documents in C#

Review the following code, which demonstrates how to represent a document in C#.

### BsonDocument

Use `MongoDB.Bson` to represent a document with `BsonDocument`. Here's an example:

```csharp
using MongoDB.Bson;

var document = new BsonDocument
{
   { "account_id", "MDB829001337" },
   { "account_holder", "Linus Torvalds" },
   { "account_type", "checking" },
   { "balance", 50352434 }
};
```

### C# Class (POCOs)

Each public property maps to a field in the BSON document.

- The `BsonId` attribute specifies a field that must always be unique.
- The `BsonRepresentation` attribute maps a C# type to a specific BSON type.
- The `BsonElement` attribute maps to the BSON field name.

Here's an example:

```csharp
internal class Account
{
   [BsonId]
   [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]     
   public string Id { get; set; }
     
   [BsonElement("account_id")]
   public string AccountId { get; set; }

   [BsonElement("account_holder")]
   public string AccountHolder { get; set; }

   [BsonElement("account_type")]
   public string AccountType { get; set; } 

   [BsonRepresentation(BsonType.Decimal128)]
   [BsonElement("balance")]
   public decimal Balance { get; set; }

   [BsonElement("transfers_complete")]
   public string[] TransfersCompleted { get; set; }    
}
```

---

## Using MongoDB Aggregation Stages with C#: `Match` and `Group`

Review the following code, which demonstrates how to use the `Match` and `Group` aggregation methods in MongoDB.

### Match by Using C# Class

`Match` filters documents that match the specified conditions and passes them to the next stage of the pipeline. In following code, we request all documents where the `Balance` field has a value that's less than or equal to 1000. We can view the results by casting the `aggregate` object to a list.

```csharp
var matchStage = Builders<Accounts>.Filter.Lte(u => u.Balance, 1000);
var aggregate = accountsCollection.Aggregate()
                          .Match(matchStage);
var results = aggregate.ToList();

foreach (var account in results)
{
    Console.WriteLine(account.Balance);
}
```

### Match by Using `BsonDocument`

`Match` filters documents that match the specified conditions to the next stage of the pipeline. When you're working with BsonDocuments, the process is identical, except that we use a builder of type `BsonDocument`. Also, we can’t use LINQ to define the properties that we want to filter on. Here's an example:

```csharp
var matchStage = Builders<BsonDocument>.Filter.Lte("balance", 1000);
var aggregate = accountsCollection.Aggregate()
                          .Match(matchStage);
var results = aggregate.ToList();

foreach (var account in results)
{
    Console.WriteLine(account.Balance);
}
```

### `Group` Stage

The `Group` stage separates documents into groups according to a group key. The output of this stage is one document for each unique group key. In the following code, we use a LINQ expression and create a new generic object with the fields we want. We keep the same names for the first three properties: `AccountId`, `AccountType`, and `Balance`. We also create a new field called `GBP`, which is calculated by dividing the current `Balance` field by 1.3.

```csharp
var matchStage = Builders<BsonDocument>.Filter.Lte("balance", 1000);
var aggregate = accountCollection.Aggregate()
   .Match(matchStage)
   .Group(
       a => a.AccountType,
       r => new
       {
           accountType = r.Key,
           total = r.Sum(a => 1)
       }
   );

var results = aggregate.ToList();

foreach (var account in results)
{
    Console.WriteLine(account.Balance);
}
```

---

## Querying a MongoDB Collection in C# Applications

Review the following code, which demonstrates how to query documents in MongoDB with C#.

### Find a Document with `FirstOrDefault`

In the following example, the `Find()` command with a LINQ expression matches the `AccountID` field. The `FirstOrDefault()` method returns the first or default result.

```csharp
var account = accountsCollection
   .Find(a => a.AccountId == "MDB829001337")
   .FirstOrDefault();
```

### Find a Document with `FindAsync` and `FirstOrDefault`

The `FindAsync()` command with a LINQ expression matches the `AccountID` field. The `FirstOrDefault()` method returns the first or default result. For example:

```
var accounts = await accountsCollection
   .FindAsync(a => a.AccountId == "MDB829001337");

var account = accounts.FirstOrDefault();
```

### Find a Document with `ToList`

The `Find()` command with a LINQ expression matches all documents in the collection. The `ToList()` method returns a list of results. For example:

```csharp
var accounts = accountsCollection.Find(_ => true).ToList();
```

### Find a Document with Multiple LINQ Methods

The `Find()` command with a LINQ expression filters documents by `AccountType` (in this case, “checking”), sorts the results in descending order by the `Balance`, skips the first 5 results, and returns only 20 documents due to the limit.

```csharp
accountsCollection
   .Find(a => a.AccountType == "checking")
   .SortByDescending(a => a.Balance)
   .Skip(5)
   .Limit(20);
```

### Find a Document with the `Builders` Class

Use the `Builders` class to match all documents in the collection with an `_id` field equal to the specified value. For example:

```csharp
var filter = Builders<BsonDocument>
   .Filter
   .Eq("_id", new    
      ObjectId("62d6e04ecab6d8e1304974ae"));

var document = accountsCollection
   .Find(filter)
   .FirstOrDefault();
```

Use the `Builders` class to match all documents in the collection with a `balance` field greater than 1000. For example:

```csharp
var filter = Builders<BsonDocument>
   .Filter
   .Gt("balance", 1000);

var documents = await accountsCollection
   .FindAsync(filter);
```

---

#### Lesson 4: Updating Documents in C# Applications / Learn

## Updating Documents in C# Applications

Review the following code, which demonstrates how to update documents in MongoDB with C#.

### Update a Single Document

The following example demonstrates how to update a single document. First, create a `filter` definition with the `.Filter` method on the `Builders` class, which returns the account with an `AccountId` equal to “MDB951086017”. Next, create an `update` definition that will set the `balance` to `5000`. Finally, use the `UpdateOne()` method to update the document.

```csharp
var filter = Builders<Account>
   .Filter
   .Eq(a => a.AccountId, "MDB951086017");

var update = Builders<Account>
   .Update
   .Set(a=>a.Balance, 5000);

var result = accountCollection.UpdateOne(filter, update);

Console.WriteLine(result.ModifiedCount);
```

### Update a Single Document Asynchronously

The `UpdateOneAsync()` command updates a single document in the collection asynchronously. For example:

```csharp
var result = await accountsCollection.UpdateOneAsync(filter, update);

Console.WriteLine(result.ModifiedCount);
```

### Update Multiple Documents

Use the `UpdateMany()` method to update multiple documents in a single operation. Just like the `UpdateOne()` method, the `UpdateMany()` method accepts a query and an update. Here's an example:

```csharp
var filter = Builders<Account>
   .Filter
   .Eq(a => a.AccountType, "checking");

var update = Builders<Account>
   .Update
   .Inc(a => a.Balance, 5);

var updateResult = accountCollection
   .UpdateMany(filter, update);

Console.WriteLine(updateResult.ModifiedCount);
```

### Update Multiple Documents Asynchronously

The `UpdateManyAsync()` command updates multiple documents in the collection asynchronously. For example:

```csharp
var filter = Builders<BsonDocument>
   .Filter
   .Lt("balance", 500);

var update = Builders<BsonDocument>
   .Update
   .Inc("balance", 10);

var result = await accountsCollection
   .UpdateManyAsync(filter, update);

Console.WriteLine(result.ModifiedCount);
```

---

## Deleting Documents in C# Applications

Review the following code, which demonstrates how to delete documents in MongoDB with C#.

### Delete a Single Document

To delete a single document, use the `DeleteOne()` method, which accepts a query filter that matches the document that you want to delete. `DeletedCount` tells you how many documents were found by the filter and were deleted. Here's an example:

```csharp
var accountsCollection = 
  database.GetCollection<Account>("Account");

var result  = accountsCollection
   .DeleteOne(a => a.AccountId == "MDB333829449");

Console.WriteLine(result.DeletedCount);
```

### Delete a Single Document Asynchronously

To delete a single document asynchronously, use the `DeleteOneAsync()` method, which accepts a query filter that matches the document that you want to delete. We use a `Builders` class that matches a document based on the specified `_id`. Async methods can be used with builders or LINQ. Here's an example:

```csharp
var filter = Builders<BsonDocument>
   .Filter
   .Eq("_id", new    
      ObjectId("63050518546c1e9d2d16ce4d"));

var accounts = await accountsCollection
   .DeleteOneAsync(filter);
```

### Delete Multiple Documents

To delete multiple documents, use the `DeleteMany()` method, which accepts a query filter that matches the documents that you want to delete. Once the documents are successfully deleted, the method returns an instance of `DeleteResult`, which enables the retrieval of information such as the number of documents that were deleted. For example:

```csharp
var deleteResult = accountCollection
   .DeleteMany(a => a.Balance < 500);

Console.WriteLine(result.DeleteCount)
```

### Delete Multiple Documents Asynchronously

To delete multiple documents asynchronously, use the `DeleteMany()` method, which accepts a query filter that matches the documents that you want to delete. Once the documents are successfully deleted, the method returns an instance of `DeleteResult`, which enables the retrieval of information such as the number of documents that were deleted. We use a `Builders` class that matches a document based on the specified `account_type`. Async methods can be used with builders or LINQ. For example:

```csharp
var filter = Builders<BsonDocument>
   .Filter
   .Eq("account_type", "checking");

var deleteResult = await accountsCollection
   .DeleteManyAsync(filter);

Console.WriteLine(deleteResult.DeletedCount);
```

---

## Creating MongoDB Transactions in C# Applications

Review the following code, which demonstrates how to create a multi-document transaction in MongoDB with C#.

### Multi-Document Transaction

The following are the steps and the code to create a multi-document transaction in MongoDB with C#. The transaction is started by using the session’s `WithTransaction()` method. Then, we define the sequence of operations to perform inside the transaction. Here are the steps:

1. Start a new session.
2. Begin a transaction with the `WithTransaction()` method on the session.
3. Create variables that will be used in the transaction.
4. Obtain the user accounts information that will be used in the transaction.
5. Create the transfer document.
6. Update the user accounts.
7. Insert the transfer document.
8. Commit the transaction.

Here's the code:

```csharp
using (var session = client.StartSession())
{

    // Define the sequence of operations to perform inside the transactions
    session.WithTransaction(
        (s, ct) =>
        {
            var fromId = "MDB310054629";
            var toId = "MDB546986470";

            // Create the transfer_id and amount being transfered
            var transferId = "TR02081994";
            var transferAmount = 20;

            // Obtain the account that the money will be coming from
            var fromAccountResult = accountsCollection.Find(e => e.AccountId == fromId).FirstOrDefault();
            // Get the balance and id of the account that the money will be coming from
            var fromAccountBalance = fromAccountResult.Balance - transferAmount;
            var fromAccountId = fromAccountResult.AccountId;

            Console.WriteLine(fromAccountBalance.GetType());

            // Obtain the account that the money will be going to
            var toAccountResult = accountsCollection.Find(e => e.AccountId == toId).FirstOrDefault();
            // Get the balance and id of the account that the money will be going to
            var toAccountBalance = toAccountResult.Balance + transferAmount;
            var toAccountId = toAccountResult.AccountId;

            // Create the transfer record
            var transferDocument = new Transfers
            {
                TransferId = transferId,
                ToAccount = toAccountId,
                FromAccount = fromAccountId,
                Amount = transferAmount
            };

            // Update the balance and transfer array for each account
            var fromAccountUpdateBalance = Builders<Accounts>.Update.Set("balance", fromAccountBalance);
            var fromAccountFilter = Builders<Accounts>.Filter.Eq("account_id", fromId);
            accountsCollection.UpdateOne(fromAccountFilter, fromAccountUpdateBalance);

            var fromAccountUpdateTransfers = Builders<Accounts>.Update.Push("transfers_complete", transferId);
            accountsCollection.UpdateOne(fromAccountFilter, fromAccountUpdateTransfers);

            var toAccountUpdateBalance = Builders<Accounts>.Update.Set("balance", toAccountBalance);
            var toAccountFilter = Builders<Accounts>.Filter.Eq("account_id", toId);
            accountsCollection.UpdateOne(toAccountFilter, toAccountUpdateBalance);
            var toAccountUpdateTransfers = Builders<Accounts>.Update.Push("transfers_complete", transferId);

            // Insert transfer doc
            transfersCollection.InsertOne(transferDocument);
            Console.WriteLine("Transaction complete!");
            return "Inserted into collections in different databases";
        });
}
```

---

## Using MongoDB Aggregation Stages with C#: `Match` and `Group`

Review the following code, which demonstrates how to use the `Match` and `Group` aggregation methods in MongoDB.

### Match by Using C# Class

`Match` filters documents that match the specified conditions and passes them to the next stage of the pipeline. In following code, we request all documents where the `Balance` field has a value that's less than or equal to 1000. We can view the results by casting the `aggregate` object to a list.

```
var matchStage = Builders<Accounts>.Filter.Lte(u => u.Balance, 1000);
var aggregate = accountsCollection.Aggregate()
                          .Match(matchStage);
var results = aggregate.ToList();

foreach (var account in results)
{
    Console.WriteLine(account.Balance);
}
```

### Match by Using `BsonDocument`

`Match` filters documents that match the specified conditions to the next stage of the pipeline. When you're working with BsonDocuments, the process is identical, except that we use a builder of type `BsonDocument`. Also, we can’t use LINQ to define the properties that we want to filter on. Here's an example:

```csharp
var matchStage = Builders<BsonDocument>.Filter.Lte("balance", 1000);
var aggregate = accountsCollection.Aggregate()
                          .Match(matchStage);
var results = aggregate.ToList();

foreach (var account in results)
{
    Console.WriteLine(account.Balance);
}
```

### `Group` Stage

The `Group` stage separates documents into groups according to a group key. The output of this stage is one document for each unique group key. In the following code, we use a LINQ expression and create a new generic object with the fields we want. We keep the same names for the first three properties: `AccountId`, `AccountType`, and `Balance`. We also create a new field called `GBP`, which is calculated by dividing the current `Balance` field by 1.3.

```csharp
var matchStage = Builders<BsonDocument>.Filter.Lte("balance", 1000);
var aggregate = accountCollection.Aggregate()
   .Match(matchStage)
   .Group(
       a => a.AccountType,
       r => new
       {
           accountType = r.Key,
           total = r.Sum(a => 1)
       }
   );

var results = aggregate.ToList();

foreach (var account in results)
{
    Console.WriteLine(account.Balance);
}
```

---

## Using MongoDB Aggregation Stages with C#: `Sort` and `Project`

Review the following code, which demonstrates how to use the `Sort` and `Project` aggregation methods in MongoDB.

### `Sort` Stage

A `Sort` stage sorts all input documents and passes them to the next pipeline stage in the sorted order.This can be a numeric value, strings arranged in alphabetical order, dates, or timestamps. You can define the sort as a LINQ statement within the `.SortBy()` or `.SortByDescending()` methods. For example:

```csharp
var matchStage = Builders<Accounts>.Filter.Lt(user => user.Balance, 1500);

var aggregate = accountsCollection.Aggregate()                        
                    .Match(matchBalanceStage)
                    .SortByDescending(u => u.Balance):

var results = aggregate.ToList();

foreach (var account in results)
{
    Console.WriteLine(account.Balance);
}
```

#### Sort by Using `BsonDocument`

A `Sort` stage sorts all input documents and passes them to the next pipeline stage in the sorted order. This can be a numeric value, strings arranged in alphabetical order, dates, or timestamps. For example:

```csharp
var matchBalanceStage = Builders<BsonDocument>.Filter.Lt("balance", 1500);
var sort = Builders<BsonDocument>.Sort.Descending("balance");

var aggregate = accountsCollection.Aggregate()
                        .Match(matchBalanceStage)
                        .Sort(sort);
var results = aggregate.ToList();

foreach (var account in results)
{
    Console.WriteLine(account.ToString());
}
```

### `Project` Stage

To create a projection, we use the `ProjectionDefinitionBuilder`. We use the `Expression` method to define the output of the `Project` stage.

In the following code, we use a LINQ expression to create a new generic object with the fields we want. We keep the same names for the first three properties: `AccountId`, `AccountType`, and `Balance`. We create a new field called `GBP`, which is calculated by dividing the current `Balance` field by `1.3`.

```csharp
var matchBalanceStage = Builders<Accounts>.Filter.Lt(user => user.Balance, 1500);
var projectStage = Builders<Accounts>.Projection.Expression(u =>
    new
    {
        AccountId = u.AccountId,
        AccountType = u.AccountType,
        Balance = u.Balance,
        GBP = u.Balance / 1.30M
    });

var aggregate = accountsCollection.Aggregate()
                        .Match(matchBalanceStage)
                        .SortByDescending(u => u.Balance)
                        .Project(projectStage);

var results = aggregate.ToList();

foreach (var account in results)
{
    Console.WriteLine(account.Balance);
}
```

---

## MongoDB Aggregation with C#

In this unit, you learned how to:

- Define an aggregation pipeline and its stages and operators.
- Build the `Match` and `Group` stages of an aggregation pipeline.
- Build the `Sort` and `Project` stages of an aggregation pipeline.

### Resources

Use the following resources to learn more about performing basic aggregation with C#:

#### Lesson 01: Building a MongoDB Aggregation Pipeline in C# Applications

- [Aggregation](https://mongodb.github.io/mongo-csharp-driver/2.17/reference/driver/crud/reading/#aggregation)
- [C# Aggregation Pipelines](https://mongodb.github.io/mongo-csharp-driver/2.17/reference/driver/definitions/#pipelines)

#### Using MongoDB Aggregation Stages with C#: `Match` and `Group`

- [Match](https://mongodb.github.io/mongo-csharp-driver/2.17/reference/driver/crud/reading/#match)
- [Group](https://mongodb.github.io/mongo-csharp-driver/2.17/reference/driver/crud/reading/#group/)

#### Using MongoDB Aggregation Stages with C#: `Sort` and `Project`

- [Sorting](https://mongodb.github.io/mongo-csharp-driver/2.17/reference/driver/crud/reading/#sort/)
- [Projection](https://mongodb.github.io/mongo-csharp-driver/2.17/reference/driver/definitions/#projections)

### MongoDB C# Drivers Course

By completing this unit, you've taken a step toward completing the MongoDB C# Drivers course.

If you're interested in continuing, your next step is to review the following topic:

- Additional aggregation stages and operators in C
