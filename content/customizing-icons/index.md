---
title: Icons
date: 2020-01-02
author: dferber
modifiedDate: null
description: "See which icons are available"
---

The starter is using a subset of the [react-icons](https://react-icons.netlify.com/#/). By default there is a limited selection of icons. You can see the names of available icons in the `src/utils/icons.js` file.

### Why are the icons limited?

The way the icons are used means that every icon listed in `src/utils/icons.js` needs to be loaded on every page. Since `react-icons` comes with a massive amount of icons, this would lead to very poor performance on page loads.

The `gatsby-starter-help-center` therefore only exposes a limited selection of icons.

### How can I add more icons?

You can check out the available icons in [react-icons](https://react-icons.netlify.com/#/). When you found icons you like, simply add another block and export the icons you want to be available for your sections.

For example

```js
export { FaRegHandPeace } from "react-icons/fa"
export { AiFillBulb, AiFillCheckSquare } from "react-icons/ai"
```

_Note that `react-icons` is using imports from specific folders like `react-icons/fa` for Font Awesome icons, or `react-icons/ai` for Ant Design icons._

### Customize your help center

Now that you know about icons, you can continue to learn how to customize your help center in any of these articles:

- [Adding your own logo](/articles/customizing-brand-logo)
- [Changing the language](/articles/customizing-locale)
- [Changing the theme](/articles/customizing-theme)

Or you can go straight to [Deploying the Help Center](/articles/deploy).
