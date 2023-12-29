---
layout:     post
title:      "dotnet command"
subtitle:   "cheatsheet"
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
- dotnet
- c#
- command

---

# NET Cheatsheet

# Create and Build Projects

dotnet new console -n MyConsoleApp    // Create a new console application
dotnet new webapi -n MyWebApi         // Create a new Web API project
dotnet build                          // Build the project

# Run Applications

dotnet run                            // Run the application
dotnet run --project <project_path>   // Run a specific project
dotnet watch run                      // Run with file watching

# Add Dependencies

dotnet add package <package_name>     // Add a NuGet package
dotnet restore                        // Restore dependencies

# Generate Code

dotnet new classlib -n MyLibrary      // Create a class library
dotnet add reference <project_path>   // Add a project reference
dotnet publish -c Release             // Publish the application

# Unit Testing

dotnet new xunit -n MyTests           // Create xUnit test project
dotnet test                           // Run tests

# Entity Framework Core

dotnet ef migrations add <migration_name>    // Add a migration
dotnet ef database update                  // Apply migrations

# Publish and Deploy

dotnet publish -c Release --self-contained // Publish a self-contained application

# Package Management

dotnet nuget push -k <api_key> -s <source> <package.nupkg>    // Publish a NuGet package

# Dockerize Applications

docker build -t <image_name> .         // Build a Docker image
docker run -p <host_port>:<container_port> <image_name>   // Run a Docker container

# ASP.NET Core Identity

dotnet new identity -n MyIdentityApp   // Create an ASP.NET Core Identity project

# Azure Functions

dotnet new func -n MyFunction          // Create an Azure Functions project

# Clean Up

dotnet clean                          // Clean the build output