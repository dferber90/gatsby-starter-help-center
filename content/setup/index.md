---
title: Set up your own help center
date: 2020-01-02
author: dferber
modifiedDate: null
description: "Step-by-step tutorial for how to host your own Help Center."
---

_This tutorial will show you how to set up your own help center. At the end, you will have the help center running locally. The next section then shows how to edit the content. And the final step shows how to deploy the help center to the internet, so that anyone can access it._

### Preparation

Make sure you have [node.js](https://nodejs.org/en/) and `npm` installed.
You can test that by running `node --version` and `npm --version`.

### Install the gatsby-cli

Install the [`gatsby-cli`](https://www.npmjs.com/package/gatsby-cli) if you don't have it already.

```shell
npm install --global gatsby-cli
```

### Create a new Gatsby site

Create a new Gatsby site, using `gatsby-starter-help-center` as the template.

```shell
gatsby new help-center dferber90/gatsby-starter-help-center
```

This command will create a folder called `help-center` in the current directory and copy the contents of `gatsby-starter-help-center` into it. Then it will install the necessary dependencies for you.

And that's it! You now have a version of the help center ready to be run locally.
Read the next article to see [how to run the help center locally](/articles/run-locally).
