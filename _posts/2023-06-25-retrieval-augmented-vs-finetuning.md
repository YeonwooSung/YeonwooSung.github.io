---
layout: mypost
title: Retrieval-Augmented vs Fine-tuning for LLMs
author: Yeonwoo Sung
date: 2023-06-25 20:30:00 +0900
categories: [ML/DL, MLOps, LLM]
tags: [mlops, devops, llm]
pin: false
math: true
mermaid: true
# image:
#   path: /commons/devices-mockup.png
#   lqip: data:image/webp;base64,UklGRpoAAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA
#   alt: Responsive rendering of Chirpy theme on multiple devices.
---

To make the LLM-based system work as you wish, there are 2 common approaches: retrieval-augmented and fine-tuning.

## Fine-tuning

Usually, you want to avoid pre-training an LLM as the cost can be upwards of hundreds of thousands and even millions of dollars.
A base LLM is pre-trained using a gigantic corpus of text corpus, frequently in the billions or even trillions of tokens.

While the number of parameters of an LLM is vital, it is not the only parameter you should consider when selecting a base LLM.
Besides the license, you should also consider the bias and toxicity of the pre-training dataset and the base LLM.

After you have selected the base LLM, you can start the next step of fine-tuning it.
The fine-tuning step is relatively cheap regarding computation cost due to available techniques like the LoRa and QLoRA.

However, constructing a training dataset is more complex and can get expensive.
If you can not afford a dedicated team of annotators, it seems that the trend is to use an LLM to construct a training dataset to fine-tune your desired LLM (this is really meta).

For example, Stanford’s Alpaca training dataset was created using OpenAI’s LLMs.
The cost to produce 52 thousand training instructions was about 500 dollars, which is relatively cheap.

There is also a relatively fresh project by H2O called WizardLM, which is designed to turn documents into question-answer pairs that can be used to fine-tune an LLM.

However, the fine-tuning approach has many drawbacks.
For example, what if there could be multiple answers to a question?
Or if the foundation knowledge of the service could be changed as time goes on?
Also, the fine-tuned LLM model cannot generate different responses depending on the user making the questions.

## Retrieval-Augmented Generation

Large language models perform remarkably well in natural language applications like:

    - Text summarization,
    - Extracting relevant information,
    - Disambiguation of entities
    - Translating from one language to another, or even
    - Converting natural language into database queries or scripting code

Moreover, previously NLP models were most often domain and task-specific, meaning that you would most likely need to train a custom natural language model depending on your use case and domain.
However, thanks to the generalization capabilities of LLMs, a single model can be applied to solve various collections of tasks.

We have observed quite a strong trend in using retrieval-augmented LLMs, where instead of using LLMs to access its internal knowledge, you use the LLM as a natural language interface to your company’s or private information.

The retrieval augmented approach uses the LLM to generate an answer based on the additionally provided relevant documents from your data source.
Therefore, you don’t rely on internal knowledge of the LLM to produce answers.
Instead, the LLM is used only for extracting relevant information from documents you passed in and summarizing it.

[LangChain](https://github.com/hwchase17/langchain), [LlamaIndex](https://github.com/jerryjliu/llama_index), or [ChatGPT Retrieval Plugins](https://github.com/openai/chatgpt-retrieval-plugin/tree/main) are good examples of this approach.

The retrieval-augmented approach has some clear advantages over the fine-tuning approach:

- The answer can cite its sources of information, which allows you to validate the information and potentially change or update the underlying information based on requirements
- Hallucinations are more unlikely to occur as you don’t rely on the internal knowledge of an LLM to answer the question and only use information that is provided in the relevant documents
- Changing, updating, and maintaining the underlying information the LLM uses is easier as you transform the problem from LLM maintenance to a database maintenance, querying and context construction problem
- Answers can be personalized based on the user context, or their access permission

On the other hand, you should consider the following limitations when using theretrieval-augmented approach:

- The answers are only as good as the smart search tool
- The application needs access to your specific knowledge base, either that be a database or other data stores
- Completely disregarding the internal knowledge of the language model limits the number of questions that can be answered
- Sometimes LLMs fail to follow instructions, so there is a risk that the context might be ignored or hallucinations occur if no relevant answer data is found in the context.

## References

- [Microsoft Developers: State of GPT | BRK216HFS](https://www.youtube.com/watch?v=bZQun8Y4L2A)
- [neo4j :: Knowledge Graphs & LLMs : Fine-tuning vs Retrieval Augmented Generation](https://medium.com/neo4j/knowledge-graphs-llms-fine-tuning-vs-retrieval-augmented-generation-30e875d63a35)
