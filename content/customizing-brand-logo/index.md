---
title: Adding your own logo
date: 2020-01-02
author: dferber
modifiedDate: null
description: "Use your project's logo"
---

The help center comes with a logo out of the box. You'll likely want to use your own logo instead.

### Changing the SVG file

Edit `src/components/logo.js` and place your SVG logo in there. You'll need to convert it to a React component. You can use [svg2jsx.com](https://svg2jsx.com/) to convert an SVG to a React component. Use the current logo as an example.

Note that the SVG logo needs to accept `props.size` and use that value as its `width` and `height`. The colors need to be set to `props.color`. These things are done so that your logo can appear in the header and the footer and look slightly different in both.

### Changing the favicon

You can change the favicon by replacing `assets/favicon.png` (and `static/favicon.ico`). If you want to use another format, you can change the file name in `gatsby-config.js` (look for `assets/favicon.png` there).

### Customize

Now that you know about icons, you can continue to learn how to customize your help center in any of these articles:

- [Working with icons](/articles/customizing-icons)
- [Changing the language](/articles/customizing-locale)
- [Changing the theme](/articles/customizing-theme)

Or you can go straight to [Deploying the Help Center](/articles/deploy).
