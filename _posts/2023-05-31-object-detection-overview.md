---
layout: mypost
title: Overview of the Object Detection
author: Yeonwoo Sung
date: 2023-05-31 21:15:00 +0900
categories: [ML/DL, CV, CNN, Object Detection]
tags: [cnn, ml, dl, object-detection]
pin: false
math: true
mermaid: true
# image:
#   path: /commons/devices-mockup.png
#   lqip: data:image/webp;base64,UklGRpoAAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA
#   alt: Responsive rendering of Chirpy theme on multiple devices.
---

Object detection is the task of detecting instances of objects of a certain class within an image.

Basically, it is possible to say that:

    "Object Detection = Multi-labeled Classification + Bounding Box Regression"

## Table of Contents

1. [Sliding Window](#sliding-window)
2. [Selective Search](#selective-search)
3. [References](#references)

## Sliding Window

The Sliding window is a problem-solving technique for problems that involve arrays/lists. These problems are easy to solve using a brute force approach in O(n^2) or O(n^3). Using the 'sliding window' technique, we can reduce the time complexity to O(n).

In the context of computer vision (and as the name suggests), a sliding window is a rectangular region of fixed width and height that “slides” across an image. For each of these windows, we would normally take the window region and apply an image classifier to determine if the window has an object that interests us. Combined with [image pyramids [1]](https://ieeexplore.ieee.org/abstract/document/1641019/) we can create image classifiers that can recognize objects at varying scales and locations in the image.

These techniques, while simple, play an absolutely critical role in object detection and image classification. However, this approach (using Sliding Windows for Object Detection) is computationally very expensive as we need to search for object in thousands of windows even for small image size.

## Selective Search

The main idea of the Selective Search is using the bottom-up grouping of image regions to generate a hierarchy of small to large regions.

Basically, the Selective Search has 3 main steps:

    1) Generate initial sub-segmentation
    2) Recursively combine similar regions into larger ones
    3) Use the generated regions to produce candidate object locations.

By using this method, the object detection model could calculate the "Similarity Metrics", which could help the model to detect objects from the image.

### What do we mean by similarity

Two-pronged approach:

    1) Choose a color space that captures interesting things.
        a) Different color spaces have different invariants, and different responses to changes in color.
    2) Choose a similarity metric for that space that captures everything we’re interested: color, texture, size, and shape.

## References

[1] S. Lazebnik, C. Schmid, J. Ponce. [Beyond Bags of Features: Spatial Pyramid Matching for Recognizing Natural Scene Categories](https://ieeexplore.ieee.org/abstract/document/1641019/)

[2] J. R. R. Uijlings, K. E. A. van de Sande, T. Gevers, A. W. M. Smeulders. [Selective Search for Object Recognition](https://link.springer.com/article/10.1007%252Fs11263-013-0620-5)
