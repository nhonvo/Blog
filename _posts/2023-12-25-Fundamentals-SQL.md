---
layout:     post
title:      "Basic SQL - Fundamental SQL"
subtitle:   "SQL Essentials Part 1"
date:       2023-12-25 12:00:00
author:     "Truong Nhon"
# hidden: true
# header-img: "img/post-bg-apple-event-2015.jpg"
# header-style: text
# header-img-credit: "@WebdesignerDepot"
# header-img-credit-href: "medium.com/@WebdesignerDepot/poll-should-css-become-more-like-a-programming-language-c74eb26a4270"
# published: true
# header-mask: 0.4
multilingual: false
catalog:      true
lang: en
tags:
- markdown
---

# INTRODUCTION

## Database Fundamentals

1. **What is a Database?**
   - Definition: An organized collection of data stored and accessed electronically.
   - Examples of data stored: Usernames, passwords, emails, addresses, salaries, images, videos, etc.
2. **What is DBMS?**
   - Definition: Database Management System, software managing databases.
   - Control access, create, modify, delete databases, and manipulate data.
   - RDBMS stores data in tables; queries are used for communication.
3. **What is RDBMS?**
   - Types of DBMS: Relational, Object-Oriented, Hierarchical, Network.
   - Focus on relational databases with tables and relationships.

## Entity Relation Model (ER Model)

1. **ER Model Basics**
   - Conceptual design representing relationships between data entities.
   - Visualizes overall database design.
2. **Entities, Attributes, and Relationships**
   - Strong vs. weak entities, entity attributes, and ER notation.
   - Understanding entity relationships: unary, binary, ternary, and n-nary.
3. **Designing ER Model**
   - Creating entities, attributes, and relationships in the context of a Shopee-like system.

## Database Schema and Instance

1. **Database Schema**
   - Describing how data should look but not holding any data.
   - Multiple tables with relationships make up a relational database schema.
2. **Database Instance**
   - A specific realization of a database at a particular moment in time.
   - Understanding instances through practical examples.

# KEY CONCEPT

## SQL Server and Basic Querying

1. **SQL Server Overview**
   - A deep dive into Microsoft SQL Server, a robust relational database management system developed by Microsoft.
   - Thorough exploration of SQL as Structured Query Language, employed for the storage, manipulation, and retrieval of data.
2. **Data Definition Language (DDL)**
   - In-depth exploration of DDL, with a specific focus on creating, modifying, and dropping databases.
   - Practical demonstrations illustrating the creation, alteration, and removal of databases, ensuring hands-on learning.
3. **SQL Data Types**
   - A detailed breakdown of SQL data types, covering <u>NULL values, exact numbers, float, real, decimal, numeric, money, character strings, Unicode character strings, binary strings, and datetime data types.</u>
   - Real-world examples and considerations for each data type, empowering a comprehensive grasp of their applications.
4. **Tables and Constraints**
   - A practical guide to creating tables enriched with constraints, such as PRIMARY KEY, FOREIGN KEY, UNIQUE, DEFAULT, NOT NULL, and CHECK constraints.
   - Hands-on experience in adding and modifying constraints, fostering an environment of data accuracy and reliability.
5. **Database Diagrams and Practices**
   - Implementation of database diagrams as a visual aid to comprehend relationships between tables.
   - Engaging in practical exercises to create tables, define constraints, and navigate the intricacies of database diagrams.
6. **SQL Process and Conventions**

   - A thorough understanding of the SQL process, accompanied by adherence to conventions for writing SQL statements.

   <img src="2023-12-25-Fundamentals-and-CRUD-Operations.assets/image-20231225151442556.png" alt="image-20231225151442556" style="zoom:67%;" />

   - Best practices for naming conventions, key word prefixes, and other considerations, elevating the quality and readability of SQL code.

| key word        | prefix                  |
| --------------- | ----------------------- |
| PRIMARY KEY PK_ | Primary Key constraints |
| FOREIGN KEY FK_ | Foreign Key constraints |
| UNIQUE UNI_     | Unique constraints      |
| DEFAULT DF_     | Default constraints     |
| NOT NULL        | Follow after column     |
| CHECK CHK_      | Check constraints       |
| View view_      | Views                   |
| Index IX_       | Indexes                 |

# Practices and Examples

## **Practice: Modify Database**

- Modify the name of an existing database.
- Syntax: `ALTER DATABASE old_name MODIFY NAME = new_name`
- Example: `ALTER DATABASE HELLO_SQL MODIFY NAME = HELLO_SQL_RENAME`

## **Practice: Drop Database**

- Drop an existing database.
- Syntax: `DROP DATABASE data_base_name`
- Example: `DROP DATABASE HELLO_SQL_RENAME`

## **Practice: Create Table**

- Create a new table named "MyFirstTable" with various columns.

- Syntax: `CREATE TABLE table_name (column1 datatype, column2 datatype, ...)`

- Example:

     ```sql
     CREATE TABLE MyFirstTable(
         ID int,
         FullName nchar(50),
         Email varchar(20),
         PhoneNumber varchar(10),
         DateOfBirth date,
         Wallet money
     );
     ```

## **Practice: Add Column and Modify Column**

- Add a new column "City" to an existing table.

- Modify the datatype of the "City" column.

- Drop the "City" column.

- Example:

     ```sql
     ALTER TABLE MyFirstTable
     ADD City nvarchar(100);
     
     ALTER TABLE MyFirstTable
     ALTER COLUMN City nvarchar(500);
     
     ALTER TABLE MyFirstTable
     DROP COLUMN City;
     ```

## **Practice: Create Table with Constraints**

- Create a new table named "MySecondTable" with various constraints.

- Example:

     ```sql
     CREATE TABLE MySecondTable(
         ID int PRIMARY KEY,
         FullName nchar(50) NOT NULL,
         Email varchar(20) UNIQUE,
         PhoneNumber varchar(10),
         DateOfBirth date DEFAULT GETDATE(),
         Wallet money CHECK (Wallet > 0)
     );
     ```

## **Practice: Add Constraints to Table**

- Add constraints to an existing table "MySecondTableWithAlter."

- Example:

     ```sql
     ALTER TABLE MySecondTableWithAlter ALTER COLUMN ID int NOT NULL;
     ALTER TABLE MySecondTableWithAlter ADD PRIMARY KEY (ID);
     ALTER TABLE MySecondTableWithAlter ALTER COLUMN FullName nchar(50) NOT NULL;
     ALTER TABLE MySecondTableWithAlter ADD UNIQUE (Email);
     ALTER TABLE MySecondTableWithAlter ADD CONSTRAINT df_DateOfBirth DEFAULT GETDATE() FOR DateOfBirth;
     ALTER TABLE MySecondTableWithAlter ADD CHECK (Wallet > 0);
     ```

## **Practice: Add Foreign Key**

- Add a foreign key to an existing table "StudentEmail."

- Example:

     ```sql
     ALTER TABLE StudentEmail
     ADD FOREIGN KEY (StudentID) REFERENCES Student(StudentID);
     ```

## **Practice: Auto-generate Identity**

- Create a table with an auto-incrementing identity column.

- Example:

     ```sql
     CREATE TABLE StudentWithAutoIncreaseID(
         StudentID int PRIMARY KEY IDENTITY(1, 1),
         FullName nchar(50) NOT NULL,
         DateOfBirth date DEFAULT GETDATE()
     );
     ```

## **Practice: Database Diagram**

- Create tables and relationships using a database diagram.
- Example: Refer to the "lecture2-practice-create-table-result.sql" file for visual representation.

## **Practice: SQL Process**

- Follow SQL conventions for writing statements.
- Example: Adherence to conventions like uppercase SELECT, lowercase data types, Pascal case for variables, etc.

## **Practice: View All Databases**

- Retrieve a list of all databases in the master.sys.databases table.
- Example: `SELECT name FROM master.sys.databases`

# Conclusion



