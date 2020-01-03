---
title: Changing the language
date: 2020-01-03
author: dferber
description: "Ditch english for something else?"
---

The help center is made to be used in any (left-to-right) language.

_At the moment only one language can be used at a time. It's not yet supported to supply different languages at the same time_

### How to change the language

First, you'll need to open `gatsby-config.js`. There you'll find a `siteMetadata` section. In there, edit `language` and set it to the two-letter [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) language code of your desired language.

This will set the language for SEO purposes (it will apply that language to `<html lang="your-language">`)

### Translating strings

Next, you'll need to translate the default strings inside `siteMetadata.texts` in the same `gatsby-config.js` file.

### Customize your help center

Now that you know about locale, you can continue to learn how to customize your help center in any of these articles:

- [Adding your own logo](/articles/customizing-brand-logo)
- [Working with icons](/articles/customizing-icons)
- [Changing the theme](/articles/customizing-theme)

Or you can go straight to [Deploying the Help Center](/articles/deploy).
