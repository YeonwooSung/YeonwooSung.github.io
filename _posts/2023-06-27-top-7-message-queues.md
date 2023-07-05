---
layout: post
title: Top 7 Message Queues
author: Yeonwoo Sung
date: 2023-06-27 20:10:00 +0900
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

Message queues can be used for asynchronous communication between services and for processing batched workloads.
As applications become decoupled, they often need mechanisms to share state, mutate data and handle events in different areas of the system.

There are various message queues in the real world, where each has its own pros and cons.

## 1. Amazon Simple Queue System (SQS)

[Amazon Simple Queue System or SQS](https://aws.amazon.com/ko/sqs/) is a fully managed message queue built for distributed and serverless platforms.
Out of the box, it allows you to send, store and receive any volume of messages between services. It has a free and paid tier.

![sqs-ex.png](/assets/img/system_architecture/message_queue/sqs_ex.png)
_Amazon Simple Queue System (SQS)_

### Pros of SQS

- Simple to set up and requires minimal maintenance over time as SQS is a managed service by Amazon.
- Automatically handles high availability and redundancy by storing messages across multiple availability zones in the region.
- Highly scalable in a way that’s automatically handled based on the number of messages being processed.

### Cons of SQS

- It may be difficult to estimate the cost of using SQS as you’re charged for each message based on its size and network bandwidth used.
- Latency is variable based on the number of messages being sent and received but is generally less than that of self-hosted solutions.
- The maximum message size is only 256KB.
- SQS doesn’t support real-time data streaming or parallel processing of messages.

## 2. Apache Kafka

[Apache Kafka](https://kafka.apache.org/) is an open-source, distributed event streaming platform with message communication and storage capabilities.
Although Kafka is not technically a message queue, it has the functionality of a message queue using a topic partition.

![kafka_ex.png](/assets/img/system_architecture/message_queue/kafka_ex.png)
_Apache Kafka_

### Pros of Kafka

- Easily scales horizontally and span multiple data center and cloud environments.
- Kafka is reliable, with high availability and fault tolerance through replication and partitioning.
- Kafka now has libraries for most languages, including Java, C++, Python, Go, .NET, Rub and NodeJS.

### Cons of Kafka

- Kafka has a steep learning curve due to its technical complexity, likely requiring in-house or external experts.
- Kafka doesn’t have an official interface for management and monitoring, and third-party tools may be required.

## 3. RabbitMQ

RabbitMQ is an open-source message broker for asynchronous messaging, queueing and delivery acknowledgement. It can be deployed in the cloud or on-premise with Kubernetes, Chef, Docker or Puppet.

![rabbitmq-ex.png](/assets/img/system_architecture/message_queue/rabbitmq-ex.png)
_RabbitMQ_

### Pros of RabbitMQ

- Supports a wide range of messaging patterns and easily scales horizontally by adding more nodes to the cluster.
- RabbitMQ has many official and unofficial client libraries and developer tools linked on its [website](https://www.rabbitmq.com/devtools.html).
- Provides durability for its message by storing backups on disk through other nodes in the cluster.

### Cons of RabbitMQ

- Can be slow at processing larger datasets, typically handling tens of thousands of events per second.
- Some integration services, such as intra-cluster compression and warm standby replication, are only available as part of their paid commercial offering.
- RabbitMQ is somewhat complex and will require technical expertise to set up and maintain over time.

## 4. Apache ActiveMQ

[Apache ActiveMQ](https://activemq.apache.org/) is an open-source Java-based message queue that can be accessed by clients written in Javascript, C, C++, Python and .NET. There are two versions of ActiveMQ, the existing “classic” version and the next generation “Artemis” version, which is currently being worked on.

![activemq_ex.png](/assets/img/system_architecture/message_queue/activemq-ex.png)
_Apache ActiveMQ_

### Pros of ActiveMQ

- Lots of flexibility for customizing options such as prefetch size, threading, notification to producers and failover.
- You can configure ActiveMQ to guarantee message delivery to ensure they are delivered at least once.

### Cons of ActiveMQ

- It requires manual installation, configuration and maintenance, meaning you’ll likely need someone technical to manage it.
- The ActiveMQ documentation is difficult to read, understand and find the information you’re looking for.

## 5. Google Pub/Sub

[Google Cloud Pub/Sub](https://cloud.google.com/pubsub?hl=ko) is a fully-managed, globally scalable and secure queue provided by Google Cloud for asynchronous processing messages.
Cloud Pub/Sub has many of the same advantages and disadvantages as SQS due to also being cloud hosted.
It has a free and paid tier.

![google-pubsub-ex.png](/assets/img/system_architecture/message_queue/google-pubsub-ex.png)
_Google Pub/Sub_

### Pros of Google Pub/Sub

- High scalability and availability that requires no setup and is managed for you automatically by Google.
- The maximum message payload size is 10MB, considerably higher than most other solutions.
- Supports push and pull delivery types.
- The easy-to-use interface on the Google Cloud console for managing and debugging topics and subscriptions.

### Cons of Google Pub/Sub

- It can be difficult to calculate how much you will be billed for Pub/Sub, as they charge for throughput, storage and egress as described on their length and complex pricing page.
- Low latency for message delivery is not guaranteed as Google prioritizes scalability over speed for Pub/Sub.

## 6. Microsoft Azure Service Bus

Microsoft [Azure Service Bus](https://azure.microsoft.com/en-us/products/service-bus) is a reliable, fully managed Cloud service for delivering messages via queues or topics. It has a free and paid tier.

![ms_azure_bus_ex.png](/assets/img/system_architecture/message_queue/ms_azure_bus_ex.png)
_Microsoft Azure Service Bus_

### Pros of Azure Service Bus

- High reliability and scalability are automatically provided as this service is fully managed by Microsoft Azure.
- Azure Service Bus integrates well with other products in the Azure ecosystem.

### Cons of Azure Service Bus

- The learning curve is high for new users getting started with Azure Service Bus as it can be complex to understand due to poor documentation.
- Azure Service Bus has a maximum message size of 256KB.

## 7. Redis

[Redis](https://redis.com/blog/database-trigger-features/?utm_source=google&utm_medium=cpc&utm_term=redis%20javascript&utm_campaign=redis360-tofu-audiences-emea-19745582853&utm_content=database-trigger-features&gclid=CjwKCAjwkeqkBhAnEiwA5U-uM9fdfV-4tGG4Qh4D7iQqk8BDwD3SZcqE1RYDeo1_DHcMJpNUAPdg3hoCWcUQAvD_BwE) is an open-source in-memory(a DBMS that uses main memory to put it bluntly) data store which can function both as a message broker, a database and cache. From the documentation itself, Redis is known to support different kinds of abstract data structures, such as strings, lists, maps, sets, sorted sets, hyperlogs, bitmaps and spatial indexes. Redis is fast and light weight and this makes it a personal preference of numerous developers across the globe.

![redis_ex.png](/assets/img/system_architecture/message_queue/redis_ex.png)
_Redis_

### Pros of Redis

- Since it has dealings with a system's main memory Redis is fast and also scalable.
- Extremely easy to set up, use and deploy.
- Provides in-memory and advanced key-value cache.

### Cons of Redis

- Redis was created with a different intentions and not for being a message broker. It does support basic operations as a message broker however for powerful message routing Redis is not the preferred option.
- High latency in dealing with large messages. Redis is better suited for small messages.

## References

- [Medium blog post: Top 6 Message Queues for Distributed Architectures](https://icepanel.medium.com/top-6-message-queues-for-distributed-architectures-a3cbabf08993)
- [AWS SQS](https://aws.amazon.com/ko/sqs/)
- [Apache Kafka](https://kafka.apache.org/)
- [RabbitMQ devtools](https://www.rabbitmq.com/devtools.html)
- [Apache ActiveMQ](https://activemq.apache.org/)
- [Google Cloud Pub/Sub](https://cloud.google.com/pubsub?hl=ko)
- [Microsoft Azure Service Bus](https://azure.microsoft.com/en-us/products/service-bus)
- [Redis](https://redis.com/blog/database-trigger-features/?utm_source=google&utm_medium=cpc&utm_term=redis%20javascript&utm_campaign=redis360-tofu-audiences-emea-19745582853&utm_content=database-trigger-features&gclid=CjwKCAjwkeqkBhAnEiwA5U-uM9fdfV-4tGG4Qh4D7iQqk8BDwD3SZcqE1RYDeo1_DHcMJpNUAPdg3hoCWcUQAvD_BwE)
- [Message Queue in Redis](https://dev.to/lazypro/message-queue-in-redis-38dm)
