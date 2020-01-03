---
title: Collections and their sections
date: 2020-01-03
author: dferber
modifiedDate: null
description: "Learn how to edit your Help Center's content."
---

_This tutorial will show you how to manage the collections, sections and their articles in your own help center. At the end, you will know how to organize your collectoins. The next section then shows how to authors available in your help center. And the final step shows how to deploy the help center to the internet, so that anyone can access it._

### Prerequisites

This article assumes that you've got the help center running locally and you're familiar with how to create articles.

### Opening the collections file

All collections, sections and articles are organized inside `data/collections.yml`. Open it to see the examples. This help center uses the concept of collections. The articles are grouped into collections.

Collections can be divided into sections to give articles further grouping. When articles aren't assigned to a section, they'll simply appear at the top of a collection.

### The basics

A minimal `collections.yml` file with a single collection, a single article and no sections would look like this:

```yaml
- id: introduction
  title: Introduction
  description: Brief overview of the free help center
  icon: "FaRegHandPeace"
  articles:
    - file: ../content/welcome/index.md
```

This file defines a collection called "Introduction". The collection's id will be used as its slug, so the collection will be available in `yourwebsite.com/collections/introduction`. The id of each collection must be unique.

For each collection, you can further define a `description`, an `icon` and the articles of that collection.

_You can check out [this article](/articles/customizing-icons/) to learn more about the available icons, and how to customize them. We'll focus on managing the collections, sections and articles for now. We'll get into the icons later on._

### Adding sections

The "Introduction" collection does not use any sections at the moment. Let's see how we could change that.

We can add a `sections` key to our collection. The section needs an `id`, a `title` and a list of `articles` which will be grouped into that section.

```yaml
- id: introduction
  title: Introduction
  description: Brief overview of the free help center
  icon: "FaRegHandPeace"
  articles:
    - file: ../content/welcome/index.md
  sections:
    - id: installing
      title: Installing
      articles:
        - file: ../content/setup/index.md
```

Each `section`s `id` must be unique inside that collection. The id will be used as the anchor when linking directly to a section. In the case below, it would be `yourwebsite.com/collections/introduction#installing` (note the `#installing` at the end).

### Examples

_The articles of these collections are made up, so the examples will not actually work in case you save them to your `collections.yml`._

Below is an example of a collection with multiple sections.

```yaml
- id: introduction
  title: Introduction
  description: Brief overview of the free help center
  icon: "FaRegHandPeace"
  articles:
    - file: ../content/welcome/index.md
  sections:
    - id: installing
      title: Installing
      articles:
        - file: ../content/installing-on-windows/index.md
        - file: ../content/installing-on-linux/index.md
        - file: ../content/installing-on-macos/index.md
    - id: uninstalling
      title: Uninstalling
      articles:
        - file: ../content/uninstalling/index.md
```

Collections don't need to have pinned articles. They can consist of articles grouped into sections only:

```yaml
- id: introduction
  title: Introduction
  description: Brief overview of the free help center
  icon: "FaRegHandPeace"
  sections:
    - id: installing
      title: Installing
      articles:
        - file: ../content/installing-on-windows/index.md
        - file: ../content/installing-on-linux/index.md
        - file: ../content/installing-on-macos/index.md
    - id: uninstalling
      title: Uninstalling
      articles:
        - file: ../content/uninstalling/index.md
```

And finally, an example showing multiple collections:

```yaml
- id: introduction
  title: Introduction
  description: Brief overview of the free help center
  icon: "FaRegHandPeace"
  articles:
    - file: ../content/welcome/index.md
  sections:
    - id: installing
      title: Installing
      articles:
        - file: ../content/installing-on-windows/index.md
    - id: uninstalling
      title: Uninstalling
      articles:
        - file: ../content/uninstalling/index.md

- id: giving-back
  title: Giving back
  description: 'Options in case you want to say "thank you"'
  icon: "FaPeopleCarry"
  articles:
    - file: ../content/giving-back/index.md
```

### Next up: Managing authors

Continue with [Managing authors](/articles/managing-authors) to learn how to add yourself and your team members as authors.
