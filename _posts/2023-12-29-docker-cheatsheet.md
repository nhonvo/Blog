---
layout:     post
title:      "docker command"
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
- docker
- cheatsheat
---
## Images

```bash
docker images                   # List all images
docker pull <image_name>         # Pull an image from Docker Hub
docker build -t <image_name> .   # Build an image from the current directory
docker rmi <image_id>            # Remove an image
```

## Containers

```bash
docker ps                       # List running containers
docker ps -a                    # List all containers
docker run <image_name>         # Create and start a container
docker exec -it <container_id> bash   # Access a running container's shell
docker stop <container_id>      # Stop a running container
docker rm <container_id>        # Remove a container
```

## Volumes

```bash
docker volume ls                # List all volumes
docker volume create <volume_name>  # Create a volume
docker run -v <volume_name>:/path/in/container <image_name>   # Mount a volume to a container
```

## Networks

```bash
docker network ls               # List all networks
docker network create <network_name>  # Create a network
docker run --network=<network_name> <image_name>   # Connect a container to a network
```

## Compose

```bash
docker-compose up               # Start services defined in a docker-compose.yml
docker-compose down             # Stop and remove services defined in a docker-compose.yml
```

## Registry

```bash
docker login                    # Log in to a Docker registry
docker push <image_name>         # Push an image to a registry
docker pull <registry>/<image_name>  # Pull an image from a registry
```

## System

```bash
docker info                     # Display system-wide information
docker version                  # Show the Docker version
docker system prune             # Remove all stopped containers, unused networks, and dangling images
```

## Dockerize Applications

```bash
docker build -t <image_name> .         # Build a Docker image
docker run -p <host_port>:<container_port> <image_name>   # Run a Docker container
```
