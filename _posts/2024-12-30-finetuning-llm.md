---
layout: post
title: Helpful resources for finetuning LLM
author: Yeonwoo Sung
date: 2024-11-30 20:10:00 +0900
categories: [ML/DL, LLM]
tags: [ai, llm]
pin: false
math: true
mermaid: true
# image:
#   path: /commons/devices-mockup.png
#   lqip: data:image/webp;base64,UklGRpoAAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA
#   alt: Responsive rendering of Chirpy theme on multiple devices.
---

Sebastian Raschka's article, ["Practical Tips for Finetuning LLMs Using LoRA (Low-Rank Adaptation)"](https://magazine.sebastianraschka.com/p/practical-tips-for-finetuning-llms), provides practical advice for efficiently fine-tuning large language models (LLMs) using the LoRA technique. Key takeaways from the article include:

```plaintext
1. Consistency Across Runs: Despite the inherent randomness in LLM training, the results tend to be surprisingly consistent across multiple runs.

2. QLoRA Trade-offs: When GPU memory is limited, QLoRA can save up to 33% of memory at the cost of a 39% increase in runtime, offering a trade-off for resource-constrained scenarios.

3. Optimizer Choice Has Minimal Impact: The choice of optimization algorithm has little impact on fine-tuning performance. Various algorithms, including AdamW and SGD with schedulers, yield comparable results.

4. Memory Impact of Adam Optimizer: While Adam introduces two additional parameters for each model parameter, its effect on peak memory usage during fine-tuning is minimal.

5. Challenges with Multi-Epoch Training: Training on static datasets for multiple epochs may lead to overfitting, reducing the model's performance.

6. Applying LoRA Broadly: To maximize performance, LoRA should be applied not just to the Key and Value matrices but across all layers of the model.

7. Setting LoRA Rank and Alpha: Properly configuring the LoRA rank and alpha is crucial. A good rule of thumb is setting the alpha to twice the rank value.

8. Efficient Fine-Tuning on a Single GPU: Fine-tuning a 7-billion-parameter model can be done efficiently in just a few hours using a single GPU with 14GB of RAM.
```

Additionally, Raschka answers 10 common questions about LoRA, covering topics such as the importance of datasets, LoRA's effectiveness in domain adaptation, optimal rank selection, and strategies to prevent overfitting.

This article serves as a valuable resource for researchers and practitioners interested in fine-tuning LLMs with LoRA, offering practical insights and guidance.
