---
layout: post
title: Pydanctic vs Dataclasses
author: Yeonwoo Sung
date: 2023-06-21 22:10:00 +0900
categories: [Python]
tags: [python, pydantic, dataclasses]
pin: false
math: true
mermaid: true
# image:
#   path: /commons/devices-mockup.png
#   lqip: data:image/webp;base64,UklGRpoAAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA
#   alt: Responsive rendering of Chirpy theme on multiple devices.
---

Python dataclasses are fantastic. Pydantic is fantastic.
It is a tough choice if indeed we are confronted with choosing one or the other.
I would say that comparing these two great modules is like comparing pears with apples, albeit similar in some regards, different overall.

Pydantic’s arena is data parsing and sanitization, while dataclasses a is a fast and memory-efficient (especially using slots, Python 3.10+) general-purpose data container.

However, sometimes, it seems some code dependency is trying to make us choose.
A great example is when using FastAPI; it is built on pydantic.
If our app is simple, we may just as well do all the data models in pydantic and avoid any compatibility issues.
Another example is when we inherit a codebase that is already using dataclasses.
Why should we miss on dataclasses performance when using FastAPI?
How can we convert our dataclasses schema to pydantic when we need to implement a web API using FastAPI.
By the way, FastAPI is fantastic too.

## dataclass (no defaults) to pydantic

The problem:

```python
from dataclasses import dataclass

import pydantic


@dataclass(slots=True)
class Person:
    name: str
    age: int


# convert into

class PydanticPerson(pydantic.BaseModel):
    name: str
    age: int
```

To solve this, we use pydantic’s utility to create models dynamically, pydantic.create_model.
We need to supply this function with a name for our dynamically created model.
We also need to provide kwargs (each keyword argument is the attribute’s name in the dynamically created model) with a tuple of attribute type and default value (if there is no default value, then use … instead).

To get the information we need for the pydantic model, we use the fields utility in the dataclasses module; using fields, we can access the attributes’ properties.

```python
from dataclasses import fields

import pydantic

# get attribute names and types from dataclass into pydantic format
field_kwargs = {_field.name: (_field.type, ...) for _field in fields(Person)}

# create pydantic model dynamically
DynamicPydanticPerson = pydantic.create_model(
    "DynamicPydanticPerson", **field_kwargs
)
```

Now we can create an instance of our dynamically generated pydantic model:

```python
# instance dynamic pydantic
dynamic_pydantic_person = DynamicPydanticPerson(name="Diego", age=33)
```

printing the model and its type:

```
name=’Diego’ age=33
<class ‘pydantic.main.DynamicPydanticPerson’>
```

So we are golden here.

## pydantic (no defaults) into dataclass

The problem:

```python
from dataclasses import dataclass

import pydantic


class PydanticPerson(pydantic.BaseModel):
    name: str
    age: int


# convert into


@dataclass(slots=True)
class Person:
    name: str
    age: int
```

We now use dataclasses utility to create classes dynamically (dataclasses.make_dataclass), which requires the name of the dynamically created class and a list with tuples for each attribute; Each tuple should contain the attribute’s name and type.

```python
from dataclasses import make_dataclass

# get attribute names and types from pydantic into dataclass format
dataclass_fields = [
    (_field.name, _field.type_)
    for _field in PydanticPerson.__fields__.values()
]

# create dataclass dynamically
DynamicPerson = make_dataclass("DynamicPerson", dataclass_fields, slots=True)
```

We can check if the class is, in fact, a dataclass with is_dataclass from the dataclasses module. So we do that and instantiate the class:

```python

from dataclasses import is_dataclass

print(is_dataclass(DynamicPerson))

dynamic_person  = DynamicPerson(name="Diego", age=33)
```

prints:

```
True
DynamicPerson(name=’Diego’, age=33)
```

That is the output we expected.

## dataclass with defaults to pydantic

Now we turn to the case where our dataclass has default values, and we want to convert it to pydantic.

The problem:

```python
from dataclasses import dataclass

import pydantic


@dataclass(slots=True)
class Person:
    age: int
    name: str = "Jane"


# convert into

class PydanticPerson(pydantic.BaseModel):
    age: int
    name: str = "Jane"
```

The idea is similar to the no defaults case; however, now we need to replace … for the default value.
Furthermore, to check if the default value in the field of the dataclass is missing (no default value), we check if the field default is an instance of the _MISSING_TYPE class from the dataclasses module (kind of a hack here, but we need to get things done).

```python
from dataclasses import fields, _MISSING_TYPE

import pydantic

# get attribute names and types from dataclass into pydantic format
pydantic_field_kwargs = dict()
for _field in fields(Person):
    # check is field has default value
    if isinstance(_field.default, _MISSING_TYPE):
        # no default
        default = ...
    else:
        default = _field.default

    pydantic_field_kwargs[_field.name] =  (_field.type, default)


# create pydantic model dynamically
DynamicPydanticPerson = pydantic.create_model(
    "DynamicPydanticPerson", **pydantic_field_kwargs
)
```

We continue to test our DynamicPydanticPerson:

```python
# instance dynamic pydantic default name
dynamic_pydantic_person = DynamicPydanticPerson(age=33)

# instance dynamic pydantic
dynamic_pydantic_person = DynamicPydanticPerson(age=33, name="Diego")
```

printing the dataclasses and their types:

using the default:

```
age=33 name=’Jane’
<class ‘pydantic.main.DynamicPydanticPerson’>
```

override the default:

```
age=33 name=’Diego’
<class ‘__main__.PydanticPerson’>
```

Exactly what we expected.

## pydantic with defaults into dataclass

The problem:

```python
from dataclasses import dataclass

import pydantic


class PydanticPerson(pydantic.BaseModel):
    age: int
    name: str = "John"


# convert into


@dataclass(slots=True)
class Person:
    age: int
    name: str = "John"
```

notice the default fields.

This case is very similar to the one where there are no defaults.
If an attribute has a default value, the tuple per attribute has three elements instead of two, the third element being the default value (_field.required means no default):

```python
from dataclasses import make_dataclass

# get attribute names and types from pydantic into dataclass format
dataclass_fields = []
for _field in PydanticPerson.__fields__.values():
    if _field.required:
        field_tuple = (_field.name, _field.type_)
    else:
        field_tuple = (_field.name, _field.type_, _field.default)
    
    dataclass_fields.append(field_tuple)

# create dataclass dynamically
DynamicPerson = make_dataclass("DynamicPerson", dataclass_fields, slots=True)
```

testing that, in fact, it is a dataclass and the instances for default and default override:

```python
from dataclasses import is_dataclass


print(is_dataclass(DynamicPerson))

dynamic_person_default  = DynamicPerson(age=33)

dynamic_person  = DynamicPerson(name="Diego", age=33)
```

prints:

```
True
DynamicPerson(age=33, name=’John’)
DynamicPerson(age=33, name=’Diego’)
```

We are good to go.

## Building the tools: dataclass to pydantic

Our code snippets for converting dataclasses to pydantic models were successful, with defaults and no defaults.
Now it is time to wrap them up in a more usable tool.
A function that does the conversion for us:

```python

from dataclasses import fields, _MISSING_TYPE
from typing import Any, Optional

import pydantic


def convert_flat_dataclass_to_pydantic(
    dcls: type, name: Optional[str] = None
) -> type[pydantic.BaseModel]:
    if name is None:
        name_ = f"Pydantic{dcls.__name__}"
    else:
        name_ = name
    return pydantic.create_model(  # type: ignore
        name_,
        **_get_pydantic_field_kwargs(dcls),
    )


def _get_pydantic_field_kwargs(dcls: type) -> dict[str, tuple[type, Any]]:
    # get attribute names and types from dataclass into pydantic format
    pydantic_field_kwargs = dict()
    for _field in fields(dcls):
        # check is field has default value
        if isinstance(_field.default, _MISSING_TYPE):
            # no default
            default = ...
        else:
            default = _field.default

        pydantic_field_kwargs[_field.name] = (_field.type, default)
    return pydantic_field_kwargs
```

Below are examples:

```python

from dataclasses import dataclass

@dataclass(slots=True)
class Person:
    age: int
    name: str = "Jane"

# create class
PydanticPerson = convert_flat_dataclass_to_pydantic(Person)

# instantiate
pydantic_person = PydanticPerson(age=33)


print(PydanticPerson.__name__)

print(pydantic_person)
```

## Building the tools: pydantic to dataclass

The function for converting dataclasses to pydantic:

```python
from dataclasses import make_dataclass, Field
from collections.abc import Iterable
from typing import Any, Optional

import pydantic



def convert_flat_pydantic_to_dataclass(
    pydantic_cls: type[pydantic.BaseModel],
    name: Optional[str] = None,
    slots: bool = True,
) -> type:
    if name is None:
        name_ = f"DataClass{pydantic_cls.__name__}"
    else:
        name_ = name
    return make_dataclass(
        name_,
        _get_dataclass_fields(pydantic_cls),
        slots=slots,
    )


def _get_dataclass_fields(
    pydantic_cls: type[pydantic.BaseModel],
) -> Iterable[str | tuple[str, type] | tuple[str, type, Field[Any]]]:
    # get attribute names and types from pydantic into dataclass format
    dataclass_fields = []
    for _field in pydantic_cls.__fields__.values():
        if _field.required:
            field_tuple = (_field.name, _field.type_)
        else:
            field_tuple = (  # type: ignore
                _field.name,
                _field.type_,
                _field.default,
            )

        dataclass_fields.append(field_tuple)
    return dataclass_fields
```

The following code is an example of using the function:

```python
import pydantic


class Person(pydantic.BaseModel):
    age: int
    name: str = "John"

#class
DataClassPerson = convert_flat_pydantic_to_dataclass(Person)

#instance
dataclass_person = DataClassPerson(age=33)


print(DataClassPerson.__name__)

print(dataclass_person)
```

## FastAPI example

At last, an example using FastAPI. This simple example shows how easy it is to use a dataclass with FastAPI.
To make this example work, save the code from the two previous sections into a file named “dataclass_to_pydantic.py” and place it in the same directory where you run the following example. The following example should be named “fast_api_example.py”, this is very important for the uvicorn server to run from within the script.

We create a dataclass FooQuery and then convert it to pydantic, which is passed as the type for the foo endpoint:

```python
"""fast_api_example.py"""

from dataclasses import dataclass

import uvicorn  # pip install uvicorn
from fastapi import FastAPI

from dataclass_to_pydantic import convert_flat_dataclass_to_pydantic

app = FastAPI()


@dataclass
class FooQuery:
    foo: str
    bar: str


PydanticFooQuery = convert_flat_dataclass_to_pydantic(FooQuery)


@app.get("/foo")
async def get_foo(query: PydanticFooQuery) -> PydanticFooQuery:
    return query


# ----------------------------------------------------------------
if __name__ == "__main__":
    uvicorn.run(
        "fast_api_example:app", host="localhost", port=8080, reload=True
    )
```

To test it, we execute the script and use the requests module to do a simple test of the foo endpoint:

```python
import requests

url = "http://localhost:8080/foo"

query = dict(foo="foo_query", bar="bar_query")
response = requests.get(url, json=query)
# print response.json(): {'foo': 'foo_query', 'bar': 'bar_query'}
```

Everything works as expected.

## Final Words

Now we know how to convert in a simple way flat pydantic to dataclasses and vice-versa.
Such conversions may be handy in several situations, including using dataclasses with FastAPI.

However, I would argue to first think carefully about the architecture of your app and try to avoid unnecessary conversions.
Both pydantic and dataclasses have a lot of features and customizations, most of which would get lost on translation.

Finally, regarding nested models, their conversion is tricky.
Using the tools in the code presented in the story is very straightforward to convert to an instance of the nested model.
But to convert into a type (the uninstantiated class), we must first declare all of the nested models’ conversions.
As I said, that part is tricky.
