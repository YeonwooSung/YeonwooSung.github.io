---
layout: post
title: CGI, FastCGI, WSGI, and ASGI
author: Yeonwoo Sung
date: 2023-07-18 10:10:00 +0900
categories: [DevOps, Backend, System Architecture]
tags: [devops, backend, system-architecture]
pin: false
math: true
mermaid: true
toc: true
# image:
#     img_path: /assets/img/system_architecture/message_queue/
# image:
#   path: /commons/devices-mockup.png
#   lqip: data:image/webp;base64,UklGRpoAAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA
#   alt: Responsive rendering of Chirpy theme on multiple devices.
---

CGI, FastCGI, WSGI, and ASGI are all protocols or interfaces that define how web servers communicate with web applications.
Here are the differences between them.

## 1. CGI (Common Gateway Interface)

tl;dr: CGI simply starts a WAS process per user request, which makes the entire server process extremely slow.

CGI is the oldest and simplest protocol.
Each HTTP request creates a new process or thread to handle the request.
It is slow and resource-intensive due to the overhead of process/thread creation for each request.
It is language-agnostic and can be used with any programming language.

## 2. FastCGI (Fast Common Gateway Interface)

FastCGI is an improvement over CGI, designed to address its performance limitations.
It uses a persistent process or thread pool to handle multiple requests.
The web server communicates with the FastCGI process using a binary protocol.
It reduces the overhead of process/thread creation, resulting in better performance.
It supports multiple programming languages and is widely used.

Instead of creating a new process for each request, FastCGI uses persistent processes to handle such requests.
Multiple processes can configured, increasing stability and scalability.
Each individual FastCGI process can handle many requests over its lifetime, thereby avoiding the overhead of per-request process creation and termination.

## 3. WSGI (Web Server Gateway Interface)

WSGI is a Python-specific protocol for web applications.
It defines a standard interface between web servers and Python web frameworks or applications.
It allows web servers to communicate with Python applications using a common API.
WSGI servers can handle multiple requests concurrently, improving performance.
It is widely used in the Python web development ecosystem.

## 4. ASGI (Asynchronous Server Gateway Interface)

ASGI is an evolution of WSGI designed to support asynchronous web applications.
It allows web servers to communicate with asynchronous Python frameworks or applications.
ASGI servers can handle multiple requests concurrently and efficiently.
It supports both synchronous and asynchronous programming models.
It is used in modern Python frameworks like FastAPI.

## Summary

Each of these protocols/interfaces has its own advantages and use cases.
The choice depends on the specific requirements of your web application and the programming language/framework you are using.

## References

* [What's the difference between scgi and wsgi?](https://stackoverflow.com/questions/257481/whats-the-difference-between-scgi-and-wsgi)
* [Is there a speed difference between WSGI and FCGI?](https://stackoverflow.com/questions/1747266/is-there-a-speed-difference-between-wsgi-and-fcgi)
* [How Python web frameworks, WSGI and CGI fit together](https://stackoverflow.com/questions/219110/how-python-web-frameworks-wsgi-and-cgi-fit-together)
* [HOWTO Use Python in the web](https://docs.python.org/2/howto/webservers.html)
