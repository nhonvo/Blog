---
layout: post
title: "command-cheatsheat."
subtitle: ""
date: 2024-4-19 00:00:00
author: "Truong Nhon"
published: false
hidden: true
catalog: true
tags:
  - command
  - window
---

## terminal/window .bat

```bash
@echo off
start cmd /k "command_1 && command 2"
start cmd /k "command_3"
```

## docker config with database

- **postgresql**

- connect string

```bash
Host=localhost;Port=5432;Database=Reactivities;Username=truongnhon;Password=123;
```

- docker config

```yaml
postgres:
  image: postgres
  ports:
    - 5432:5432
  restart: always
  environment:
    - POSTGRES_USER=postgres
    - POSTGRES_PASSWORD=123
    - POSTGRES_DB=VietConnect
  volumes:
    - ./pgdata:/var/lib/postgresql/data
```

- **sqlserver**

- connect string

```bash
Server=sqlserver;Database=cleanarchitecture;User ID=SA;Password=MyPass@word;TrustServerCertificate=True
```

- docker config

```yaml
sqlserver:
  image: mcr.microsoft.com/mssql/server:2019-latest
  ports:
    - "1433:1433"
  environment:
    MSSQL_SA_PASSWORD: "MyPass@word"
    ACCEPT_EULA: "Y"
    MSSQL_USER: "sa"
```

- Linux most use command - publish new webapi in linux basic comma

```bash

chmod 400 "nhonvtt-key.pem"


ssh -i "nhonvtt-key.pem" ec2-user@ec2-3-85-185-59.compute-1.amazonaws.com



# Update your package lists
sudo yum update -y

# change to root user
sudo -i

sudo yum install <package_name>
# popular package: vim, dotnet-sdk-8.0, postgresql, nodejs, npm, nginx, docker-ce, git

dotnet publish -c Release

# list all the installed packages
yum list installed

```

- docker push image to docker hub e-form

```yaml
name: Publish Docker image

on:
  push:
    tags:
      - "v*"

jobs:
  push_to_registry:
    name: Push Docker image to Docker Hub
    runs-on: ubuntu-latest
    steps:
      - name: Get tag name
        run: ( echo "TAG_NAME=${GITHUB_REF#refs/*/v}"; echo "DOCKER_REPO=${{secrets.DOCKER_REPO}}") >> $GITHUB_ENV

      - name: Check out the repo
        uses: actions/checkout@v3

      - name: Log in to Docker Hub
        run: docker login -u "${{ secrets.DOCKER_USERNAME }}" -p "${{ secrets.DOCKER_ACCESS_TOKEN }}"
      
      - name: Build docker image
        run: docker build . -t $DOCKER_REPO:latest -t $DOCKER_REPO:$TAG_NAME
      
      - name: Push Docker image
        run: docker push $DOCKER_REPO:latest && docker push $DOCKER_REPO:$TAG_NAME
```

- flow ci-cd:
  - add new code -> push new image to hub -> app web pull new image -> run -> access new website
