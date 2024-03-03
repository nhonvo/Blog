---
layout:     post
title:      "Advanced topic in SQL"
subtitle:   "SQL Essentials Part 3"
date:       2023-12-25 15:00:00
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

## SQL Clauses

- WHERE, ORDER BY, GROUP BY, and HAVING: Crafting strategic queries.
- Today's exploration: INNER JOIN, OUTER JOIN, EXCLUDING JOIN, SELF JOIN, CROSS JOIN, UNION, and UNION ALL.

## Why Do We Need JOIN?

- Combining data from multiple tables based on matching conditions for comprehensive analysis.

## INNER JOIN: A Deeper Dive

```sql
-- Example of INNER JOIN
SELECT c.CustomerID, c.FullName, o.FoodName
FROM Customer c
INNER JOIN CustomerOrder o ON c.CustomerID = o.CustomerID;
```

In this practice, we retrieve customer information along with their corresponding orders using INNER JOIN.

## JOIN More Than 2 Tables

```sql
-- Example of INNER JOIN with 3 tables
SELECT c.CustomerID, c.FullName, o.FoodName, d.FullAddress
FROM Customer c
INNER JOIN CustomerOrder o ON c.CustomerID = o.CustomerID
INNER JOIN DeliveryAddress d ON d.ID = o.DeliveryAddressID;
```

Extending the concept of INNER JOIN to involve three tables for a more comprehensive result set.

## LEFT JOIN: Embracing Incompleteness

```sql
-- Example of LEFT JOIN
SELECT c.CustomerID, c.FullName, o.FoodName
FROM Customer c
LEFT JOIN CustomerOrder o ON c.CustomerID = o.CustomerID;
```

Incorporating LEFT JOIN to include all customers, even those without orders.

## RIGHT JOIN: Balancing the Equation

```sql
-- Example of RIGHT JOIN
SELECT c.CustomerID, c.FullName, o.FoodName
FROM Customer c
RIGHT JOIN CustomerOrder o ON c.CustomerID = o.CustomerID;
```

Implementing RIGHT JOIN to include all orders, even those without customers.

## FULL JOIN: Embracing Completeness

```sql
-- Example of FULL JOIN
SELECT c.CustomerID, c.FullName, o.FoodName
FROM Customer c
FULL JOIN CustomerOrder o ON c.CustomerID = o.CustomerID;
```

Utilizing FULL JOIN to encompass all customers and orders, regardless of matches.

## LEFT EXCLUDING JOIN: Seeking the Unique

```sql
-- Example of LEFT EXCLUDING JOIN
SELECT c.CustomerID, c.FullName, o.FoodName
FROM Customer c
LEFT JOIN CustomerOrder o ON c.CustomerID = o.CustomerID
WHERE o.CustomerID IS NULL;
```

Applying LEFT EXCLUDING JOIN to identify customers without orders.

## RIGHT EXCLUDING JOIN: Excluding to the Right

```sql
-- Example of RIGHT EXCLUDING JOIN
SELECT c.CustomerID, c.FullName, o.FoodName
FROM Customer c
RIGHT JOIN CustomerOrder o ON c.CustomerID = o.CustomerID
WHERE c.CustomerID IS NULL;
```

Implementing RIGHT EXCLUDING JOIN to identify orders without customers.

## OUTER EXCLUDING JOIN: Excluding in Unison

```sql
-- Example of OUTER EXCLUDING JOIN
SELECT c.CustomerID, c.FullName, o.FoodName
FROM Customer c
FULL JOIN CustomerOrder o ON c.CustomerID = o.CustomerID
WHERE c.CustomerID IS NULL OR o.CustomerID IS NULL;
```

Integrating OUTER EXCLUDING JOIN to identify unmatched records from both tables.

## SELF JOIN: Connecting Within

```sql
-- Example of SELF JOIN
SELECT emp.ID, emp.FullName, manager.FullName AS Manager 
FROM Employee emp
INNER JOIN Employee manager ON emp.ManagerID = manager.ID;
```

Demonstrating the concept of SELF JOIN to connect records within the same table.

## CROSS JOIN: Expanding Horizons

```sql
-- Example of CROSS JOIN
SELECT *
FROM A
CROSS JOIN B;
```

Expanding horizons with CROSS JOIN to combine each row from one table with each row from another.

## UNION: Merging Similarities

```sql
-- Example of UNION
SELECT FromColumnTableA FROM A
UNION
SELECT FromColumnTableB FROM B;
```

Merging similarities with UNION to combine result-sets from two tables.

## UNION ALL: Embracing All

```sql
-- Example of UNION ALL
SELECT FromColumnTableA FROM A
UNION ALL
SELECT FromColumnTableB FROM B;
```

Embracing all with UNION ALL, including duplicates in the result set.

## Sub Queries and Advanced Operators

- Exploring the power of subqueries.
- Advanced operators: EXISTS, ALL, IN, ANY.

## What We Will Explore Today?

- Sub queries, advanced operators, rules of subqueries, and practical exercises.

## Subquery Basics

- A sub-query, or inner query, nested inside a larger query.
- Works independently within the outer query.
- Execution sequence: Inner query executes first, results stored, and outer query runs on stored results.
- Exception: Correlated subqueries reference outer query columns.

## Example 1: Subquery for Average

```sql
-- Example of Subquery
USE LECTURE4_FUNCTION
SELECT LastName, Physic, (SELECT AVG(Physic * 1.0) FROM Student) AS 'AVG OF Physic'
FROM Student;
```

## Example 2: Subquery in WHERE Clause

```sql
-- Example of Subquery in WHERE
USE LECTURE5_JOIN_DEMO
SELECT CustomerID, FullName
FROM Customer
WHERE CustomerID IN (SELECT CustomerID FROM CustomerOrder);
```

## Types of Subqueries

- Single-row subquery.
- Multiple-row subquery.
- Multiple-column subquery.
- Correlated subquery.
- Nested subquery.

## Single-Row Subquery

```sql
-- Example of Single-Row Subquery
USE LECTURE5_JOIN_DEMO;
SELECT CustomerID, FullName
FROM Customer
WHERE CustomerID = (SELECT CustomerID
FROM CustomerOrder
WHERE FoodName = 'Heo Quay');
```

## Exercise: Single-Row Subquery

Query CustomerID, OrderID, FoodName from CustomerOrder with Delivery FullAddress = 'TP. HCM' using a single-row subquery.

## Multiple-Row Subquery

```sql
-- Example of Multiple-Row Subquery
USE LECTURE5_JOIN_DEMO
SELECT CustomerID, FullName
FROM Customer
WHERE CustomerID IN (SELECT CustomerID FROM CustomerOrder);
```

## Exercise: Multiple-Row Subquery

Query CustomerID, OrderID, FoodName from CustomerOrder with Delivery FullAddress = 'TP. HCM' or 'TP. HA NOI' using a multiple-row subquery.

## Multiple-Column Subquery

```sql
-- Example of Multiple-Column Subquery
USE LECTURE5_JOIN_DEMO;
SELECT CustomerID, FullName
FROM Customer 
WHERE EXISTS
(SELECT CustomerID, OrderID, FoodName
FROM CustomerOrder
WHERE CustomerOrder.CustomerID = Customer.CustomerID);
```

## Exercise: Multiple-Column Subquery

Create a database, perform a self-join on the Employee table, and query managers with at least 1 employee.

## Correlated Subquery

- Normal subquery executes first and provides a value to the outer query.
- Correlated subquery references a column in the outer query and executes the subquery once for each row in the outer query.

```sql
-- Example of Correlated Subquery
USE LECTURE5_JOIN_DEMO;
SELECT CustomerID, FullName
FROM Customer 
WHERE EXISTS
(SELECT CustomerID, OrderID, FoodName
FROM CustomerOrder
WHERE CustomerOrder.CustomerID = Customer.CustomerID);
```

## Exercise: Correlated Subquery

Create a database, perform a self-join on the Employee table, and query managers with at least 1 employee.

## Nested Subquery

```sql
-- Example of Nested Subquery
USE LECTURE5_JOIN_DEMO;
SELECT CustomerID, FullName
FROM Customer
WHERE CustomerID IN (SELECT CustomerID 
FROM CustomerOrder
WHERE DeliveryAddressID = (SELECT ID
FROM DeliveryAddress
WHERE FullAddress = 'TP. HA NOI'));
```

## Rules of Subqueries

- Enclose a subquery in parentheses.
- Must include a SELECT clause and a FROM clause.
- Subqueries that return more than one row can only be used with multiple-value operators.
- Can include WHERE, GROUP BY, and HAVING clauses.
- Can include an ORDER BY clause only with a TOP clause.
- Can nest subqueries up to 32 levels.

## Advanced Operators: EXISTS

- Used to test for the existence of any record in a subquery.

```sql
-- Example of EXISTS
USE LECTURE5_JOIN_DEMO;
SELECT CustomerID, FullName
FROM Customer 
WHERE EXISTS
(SELECT CustomerID, OrderID, FoodName
FROM CustomerOrder
WHERE CustomerOrder.CustomerID = Customer.CustomerID);
```

## Advanced Operators: ALL

- Returns TRUE if ALL of the subquery values meet the condition.

```sql
-- Example of ALL
USE LECTURE5_JOIN_DEMO;
SELECT CustomerID, FullName
FROM Customer
WHERE CustomerID = ALL (SELECT CustomerID FROM CustomerOrder);
```

## Advanced Operators: IN

- Allows specifying multiple values in a WHERE clause.

```sql
-- Example of IN
USE LECTURE5_JOIN_DEMO;
SELECT CustomerID, FullName
FROM Customer
WHERE CustomerID IN (SELECT CustomerID FROM CustomerOrder);
```

## Advanced Operators: ANY

- Allows performing a comparison between a single column value and a range of other values.

```sql
-- Example of ANY
USE LECTURE5_JOIN_DEMO;
SELECT CustomerID, FullName
FROM Customer
WHERE CustomerID = ANY (SELECT CustomerID FROM CustomerOrder);
```
