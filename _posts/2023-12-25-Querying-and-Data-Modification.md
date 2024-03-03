---
layout:     post
title:      "Querying and Data Modification"
subtitle:   "SQL Essentials Part 2"
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
- sql
- database
---

## **Data Manipulation Language (DML) Operations:**

DML operations involve the manipulation of data within a database.
### **INSERT Data:**

```sql
-- Single Record
INSERT INTO Student(ID, FullName, Email, PhoneNumber, Math)
VALUES(5, 'HUY', 'HUY@gmail.com', '0123456789', 5);

-- Multiple Records
INSERT INTO Student(ID, FullName, Email, PhoneNumber, DateOfBirth, Math)
VALUES
    (4, 'LAN', 'LAN@gmail.com', '0123456789', '1/30/1999', 7),
    (3, 'HAO', 'HAO@gmail.com', '0123456789', '12/15/2000', 8);
```

The `INSERT` statement adds new records to a table.
### **UPDATE Data:**

```sql
-- Update Single Record
UPDATE Student
SET FullName = 'I AM A GOOD BOY'
WHERE ID = 3;

-- Update Multiple Records
UPDATE Student
SET FullName = 'Updated Name'
WHERE Math > 5;
```

The `UPDATE` statement modifies existing records in a table.
### **DELETE Data:**

```sql
-- Delete Single Record
DELETE FROM Student
WHERE ID = 3;

-- Delete All Records with a Condition
DELETE FROM Student
WHERE Math > 5;

-- Truncate Table (Remove all records)
TRUNCATE TABLE Parent;
```

The `DELETE` statement removes records from a table.

------

## **Operators:**

Operators perform various operations in SQL.
### **Arithmetic Operators:**

```sql
SELECT 30 + 20 AS 'ADDITION';
SELECT 30 - 20 AS 'SUBTRACTION';
SELECT 30 * 20 AS 'MULTIPLICATION';
SELECT 30 / 20 AS 'DIVISION';
SELECT 30 % 20 AS 'MODULO';
```

Arithmetic operators perform mathematical operations.
### **Comparison Operators:**

```sql
-- Equal To
SELECT ID, FullName
FROM Student
WHERE FullName = 'Lan Anh';

-- Greater Than
SELECT ID, FullName, Math
FROM Student
WHERE Math > 5;
```

Comparison operators compare values for equality, inequality, etc.
### **Logical Operators:**

```sql
-- AND Operator
SELECT ID, FullName
FROM Student
WHERE FullName = 'Lan Anh' AND ID = 1010;

-- OR Operator
SELECT ID, FullName
FROM Student
WHERE FullName = 'Lan Anh' OR ID = 1005;

-- NOT Operator
SELECT ID, FullName, Math
FROM Student
WHERE NOT Math > 5;
```

Logical operators combine conditions using AND, OR, and NOT.
### **BETWEEN - AND:**

```sql
-- Values within a Range
SELECT ID, FullName
FROM Student
WHERE ID BETWEEN 1003 AND 1005;
```

The `BETWEEN - AND` operator selects values within a specified range.
### **LIKE Operator:**

```sql
-- Pattern Matching
SELECT FullName, Math
FROM Student
WHERE FullName LIKE '%U%';
```

The `LIKE` operator searches for a specified pattern in a column.
### **IS NULL:**

```sql
-- Check for NULL Values
SELECT ID, FullName, Math
FROM Student
WHERE Math IS NULL;
```

The `IS NULL` operator checks for NULL values in a column.

------

## **SELECT Statement:**

The `SELECT` statement retrieves data from one or more tables.
### **ORDER BY Clause:**

```sql
-- Ascending Order
SELECT *
FROM Student
ORDER BY FullName ASC;

-- Descending Order
SELECT *
FROM Student
ORDER BY FullName DESC;

-- Order by Multiple Columns
SELECT *
FROM Student
ORDER BY FullName ASC, Math ASC;
```

The `ORDER BY` clause sorts query results in ascending or descending order.
### **TOP, PERCENT, and WITH TIES:**

```sql
-- SELECT TOP N Rows
SELECT TOP 3 *
FROM Student;

-- SELECT TOP N Percent of Rows
SELECT TOP 50 PERCENT ID, FullName
FROM Student;
```

`TOP` limits the number of rows returned, and `PERCENT` filters by a percentage.
### **DISTINCT Keyword:**

```sql
-- Select Distinct Values
SELECT DISTINCT FullName
FROM Student;

-- Select Distinct Values for Multiple Columns
SELECT DISTINCT ID, FullName
FROM Student;
```

The `DISTINCT` keyword removes duplicate rows from query results.
### **SELECT INTO Statement:**

```sql
-- Create a New Table from SELECT Query
SELECT ID, FullName
INTO NewTable
FROM Student;

-- Select Data from Newly Created Table
SELECT *
FROM NewTable;
```

The `SELECT INTO` statement creates a new table from the result of a query.

------

## **VIEW:**

A view is a virtual table based on the result of a SELECT statement.
### CREATE VIEW:

```sql
-- Create a View
CREATE VIEW HelloView AS
SELECT FullName, Math
FROM Student
WHERE Math > 5;

-- Select Data from the View
SELECT *
FROM HelloView;
```

Use  ``` CREATE VIEW ``` to define a view.

## **SQL Operators (Continued):**

Additional SQL operators and their applications.
### NOT NULL and IS NOT NULL:

```sql
-- Records with NULL Values
SELECT ID, FullName, Math
FROM Student
WHERE Math IS NULL;

-- Records with Non-NULL Values
SELECT ID, FullName, Math
FROM Student
WHERE Math IS NOT NULL;
```

Check for NULL or non-NULL values using  ``` IS NULL ``` and  ``` IS NOT NULL ``` .

**Wildcards in LIKE Operator:**

Utilize `%` and `_` for pattern matching in the `LIKE` operator.
### Wildcards in LIKE Operator:

```sql
-- Pattern Matching with Wildcards
SELECT FullName, Math
FROM Student
WHERE FullName LIKE '%U%';
```

``` % ``` represents zero or more characters, and  ``` _ ``` represents a single character in pattern matching.

------

## **JOIN Operation:**

The `JOIN` operation combines rows from two or more tables based on related columns.
### JOIN Operation:

```sql
-- Combine Rows from Two Tables
SELECT Student.ID, Student.FullName, Course.CourseName
FROM Student
JOIN Course ON Student.CourseID = Course.CourseID;
```

Use the  ``` JOIN ``` keyword with specified conditions for combining rows.

------

## **GROUP BY and HAVING:**

The `GROUP BY` clause groups rows that have the same values in specified columns, and `HAVING` applies conditions to grouped data.
### GROUP BY and HAVING:

```sql
-- Group by CourseID and Calculate Average Math Score
SELECT CourseID, AVG(Math) AS AvgMathScore
FROM Student
GROUP BY CourseID
HAVING AVG(Math) > 7;
```

Use the ```GROUP BY``` clause for grouping and apply conditions with ```HAVING```.

---

## **Authentic Operators:**

### **Arithmetic:**

```sql
-- Mathematical Wonders
SELECT 5 + 3 AS 'Addition', 10 - 4 AS 'Subtraction', 6 * 2 AS 'Multiplication', 16 / 4 AS 'Division', 17 % 5 AS 'Modulo';
```

In this example, we perform basic arithmetic operations on numerical values, showcasing the versatility of SQL in handling mathematical tasks.

### **Comparison:**

```sql
-- Unveiling Equality and More
SELECT ID, FullName
FROM Students
WHERE Age = 25 OR Age > 30;
```

Here, we retrieve student records based on age, utilizing comparison operators to filter results for specific age criteria.

### **Logical:**

```sql
-- Crafting Conditions with AND, OR, and NOT
SELECT ID, FullName
FROM Students
WHERE Age > 25 AND Department = 'Engineering';
```

Crafting a query that combines logical operators to filter students who are older than 25 and belong to the Engineering department.

## **Selecting Wisely:**

### **SELECT Syntax:**

```sql
-- Crafting the Perfect SELECT Statement
SELECT FirstName, LastName, Age
FROM Employees;
```

In this example, we select specific columns from the Employees table, demonstrating the fundamental syntax of the SELECT statement.

### **TOP & PERCENT:**

```sql
-- Limiting and Filtering Rows
SELECT TOP 5 ID, ProductName, Price
FROM Products
ORDER BY Price DESC;
```

Limiting query results to the top 5 rows, showcasing the use of TOP in conjunction with ORDER BY to filter and sort data effectively.

### **ALIAS & DISTINCT:**

```sql
-- Bringing Clarity to Your Results
SELECT AVG(Salary) AS 'Average Salary'
FROM Employees;
```

Calculating the average salary and assigning it an alias for clarity, highlighting the use of aliases in result sets.

### **FROM, WHERE, VIEW, SELECT INTO:**

```sql
-- Mastering the Essentials
SELECT EmployeeID, FirstName, LastName
INTO NewEmployeeTable
FROM Employees
WHERE Department = 'IT';
```

Creating a new table named NewEmployeeTable by selecting specific columns from the Employees table and filtering results based on the IT department.

------

## **SQL Built-in Functions: A Symphony of Capabilities**

## **String Functions Showcase:**

### **LOWER & UPPER:**

```sql
-- Transforming Case with Flair
SELECT LOWER('Hello') AS 'lower function', UPPER('Hi there') AS 'UPPER FUNCTION';
```

Applying the LOWER and UPPER functions to manipulate text case, showcasing the versatility of string functions.

### **LEN & REVERSE:**

```sql
-- Revealing Lengths and Reversing Strings
SELECT LEN('Database') AS 'Length', REVERSE('SQL') AS 'Reversed';
```

Using LEN to find the length of a string and REVERSE to reverse the characters, demonstrating string manipulation capabilities.

### **CONCAT & SUBSTRING:**

```sql
-- Crafting and Extracting Strings
SELECT CONCAT('Hello', ' ', 'World') AS 'CONCAT FUNCTION', SUBSTRING('123456789', 3, 4) AS 'SUBSTRING FUNCTION';
```

Combining strings with CONCAT and extracting a substring, exemplifying the power of string functions in SQL.

### **LTRIM & RTRIM:**

```sql
-- Trimming with Finesse
SELECT '|' + LTRIM('   Hi') + '|' AS 'LTRIM FUNCTION', '|' + RTRIM('Hi   ') + '|' AS 'RTRIM FUNCTION';
```

Trimming leading and trailing spaces using LTRIM and RTRIM, showcasing string manipulation for cleaner outputs.

## **Datetime Functions: Unraveling Time's Mysteries:**

### **MONTH, DAY, YEAR:**

```sql
-- Extracting Temporal Insights
SELECT MONTH('11/13/2022') AS 'MONTH FUNCTION', DAY('11/13/2022') AS 'DAY FUNCTION', YEAR('11/13/2022') AS 'YEAR FUNCTION';
```

Extracting month, day, and year components from a date, unraveling temporal insights using datetime functions.

### **GETDATE & ISDATE:**

```sql
-- Unleashing the Power of Time
SELECT GETDATE() AS 'GETDATE FUNCTION', ISDATE('11/13/2022') AS 'ISDATE FUNCTION';
```

Utilizing GETDATE to retrieve the current date and time, along with ISDATE to validate a date string.

### **DATEPART:**

```sql
-- Precision in Date and Time
SELECT DATEPART(HOUR, '11/13/2022 19:20') AS 'DATEPART HOUR', DATEPART(MINUTE, '11/13/2022 19:20') AS 'DATEPART MINUTE';
```

Extracting specific components like hour and minute using DATEPART, providing precision in date and time manipulation.

### **Date Manipulation with DATEDIFF:**

```sql
-- Exploring the Gap Between Dates
SELECT DATEDIFF(MONTH, '10/15/2020', '11/25/2022') AS 'DATEDIFF MONTHS';
```

Calculating the difference in months between two dates using DATEDIFF, demonstrating date manipulation capabilities.

## **Aggregate Functions: Bringing Data Together**

### **SUM & AVG:**

```sql
-- Summing Up and Finding Averages
SELECT SUM(Sales) AS 'Total Sales', AVG(Price) AS 'Average Price'
FROM Products;
```

Aggregating data with SUM and AVG, showcasing their roles in summarizing numeric values.

### **MIN & MAX:**

```sql
-- Uncovering Extremes
SELECT MIN(Age) AS 'Minimum Age', MAX(Age) AS 'Maximum Age'
FROM Employees;
```

Identifying the minimum and maximum values within a dataset using MIN and MAX aggregate functions.

### **COUNT:**

```sql
-- Counting Rows Strategically
SELECT COUNT(*) AS 'Total Records'
FROM Customers;
```

Counting the total number of records in the Customers table, emphasizing the strategic use of COUNT.

### **Counting the COUNTs: Strategies Unveiled**

### **COUNT(\*) vs COUNT(1):**

```sql
-- Decoding the Mystery
SELECT COUNT(*) AS 'Total Records', COUNT(1) AS 'Another Count'
FROM Orders;
```

Comparing COUNT(*) and COUNT(1) to decode the mystery of counting rows effectively.

### **COUNT with DISTINCT:**

```sql
-- Navigating Unique Territories
SELECT COUNT(DISTINCT Department) AS 'Distinct Departments'
FROM Employees;
```

Counting the distinct departments within the Employees table, illustrating the usage of COUNT with DISTINCT.

### **Ceiling & Floor: Elevating and Lowering Numbers**

### **CEILING & FLOOR:**

```sql

-- Rounding Up and Down
```
