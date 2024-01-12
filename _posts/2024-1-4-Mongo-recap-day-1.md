---
layout:     post
title:      "Mongo recap day 1"
subtitle:   "Journey to master mongo"
date:       2024-1-4 12:00:00
author:     "Truong Nhon"
hidden: false
published: true
catalog:      true
lang: en
tags:
  - mongo
---

# Mongo day 1 recap

Installation: compass, shell, database tool

atlas: username: mongo password: 123

connect to atlas

- compass: `mongodb+srv://mongo:<password>@mongo.kh3ovey.mongodb.net/`
- shell: `mongosh "mongodb+srv://mongo.kh3ovey.mongodb.net/" --apiVersion 1 --username mongo`

basic command

- `show dbs` : list down all database
- `use <database_name>` : switch database 
- `show collections`
- `db.<collection_name>.findOne()` : get first record

- `db.<collection_name>.find()` : find