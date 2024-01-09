---
layout:     post
title:      "Setup up webapi project by c#"
subtitle:   "WebAPI"
date:       2023-12-29 12:00:00
author:     "Truong Nhon"
hidden: false
published: true
multilingual: false
catalog:      true
lang: en
tags:
- net
- webapi
---



# Setup webapi project 

## Installation

- Net SDK
- Visual studio 2022/code
- Database(mongo/sqlserver/postgresql)
- docker

## Dependencies

### Install dotnet ef

```bash
dotnet tool install --global dotnet-ef
```

- `Microsoft.AspNetCore.Identity.EntityFrameworkCore`
- `Microsoft.EntityFrameworkCore.Design`
- `Microsoft.EntityFrameworkCore.SqlServer`

### Migration

- `dotnet ef migrations add <name>`

- `dotnet ef database update`

### Set up JWT