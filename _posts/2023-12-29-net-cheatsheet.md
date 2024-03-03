---
layout:     post
title:      "dotnet command cheatsheat"
subtitle:   ""
date:       2023-12-29 12:00:00
author:     "Truong Nhon"
hidden: false
# header-img: "img/post-bg-apple-event-2015.jpg"
# header-style: text
# header-img-credit: "@WebdesignerDepot"
# header-img-credit-href: "medium.com/@WebdesignerDepot/poll-should-css-become-more-like-a-programming-language-c74eb26a4270"
published: true
# header-mask: 0.4
multilingual: false
catalog:      true
lang: en
tags:
- c#
- cheatsheat

---

1. c# basic(datatype, exception, ...) -> *important*
2. Algorithm (bubble sort, selected sort, ...) -> *quick view*
3. OOP (4 ) **-> *important***
4. SOLID (5)  -> *quick view*
5. C# advance (delegate, generic, async ) -> *optional*
6. SQL(join(8), understand func vs store procedure) **-> *important***
7. Linq  -> *quick view*
8. ef core  -> *quick view*
9. webapi -> *optional*

## Create and Build Projects

```bash
dotnet new console -n MyConsoleApp    // Create a new console application
dotnet new webapi -n MyWebApi         // Create a new Web API project
dotnet build                          // Build the project
```

## Run Applications

```bash
dotnet run                            // Run the application
dotnet run --project <project_path>   // Run a specific project
dotnet watch run                      // Run with file watching
```

## Add Dependencies

```bash
dotnet add package <package_name>     // Add a NuGet package
dotnet restore                        // Restore dependencies
```

## Generate Code

```bash
dotnet new classlib -n MyLibrary      // Create a class library
dotnet add reference <project_path>   // Add a project reference
dotnet publish -c Release             // Publish the application
```

## Unit Testing

```bash
dotnet new xunit -n MyTests           // Create xUnit test project
dotnet test                           // Run tests
```

## Entity Framework Core

```bash
dotnet ef migrations add <migration_name>    // Add a migration
dotnet ef database update                  // Apply migrations
```

## Publish and Deploy

```bash
dotnet publish -c Release --self-contained // Publish a self-contained application
```

## Package Management

```bash
dotnet nuget push -k <api_key> -s <source> <package.nupkg>    // Publish a NuGet package
```

## ASP.NET Core Identity

```bash
dotnet new identity -n MyIdentityApp   // Create an ASP.NET Core Identity project

```

## Azure Functions

```bash
dotnet new func -n MyFunction          // Create an Azure Functions project
```

## Clean Up

```bash
dotnet clean                          // Clean the build output
```
