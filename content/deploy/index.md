---
title: Deploying your own help center
date: 2020-01-02
author: dferber
modifiedDate: null
description: "Shows how to publish your help center to the internet for free."
---

_Great, you've made it to the last step! There are many ways to deploy your finished help center._

### Buliding your help center

To build your help center locally, you can run `npm run build`. This will compile your website into a folder called `public`. You can host that folder on any static hosting service you want.

If you want to try it out locally, you can run `npm run serve` after `npm run build` completed. This will serve the `public` folder like a static hosting service would.

### Deploying with Netlify

If you want to have a really cool setup for your help center, you can connect Netlify and Github. You can set up a `git` repository for your help center. You can use a free private repository from [GitHub](https://github.com/) for it. Then you can connect Netlify to automatically build and publish your Gatsby site whenever you push changes to your git repository on GitHub.

Since this is something which is is not specific to `gatsby-starter-help-center` at all, I'll simply refer you to a Netlify tutorial from 2016 down below. You can roughly start at the "Prepping for Build" section of it. Note that:

- You'll need to [Create a GitHub repository](https://help.github.com/en/github/getting-started-with-github/create-a-repo) before starting with the Netlify tutorial
- The Netlify tutorial is calling their folder `gatsbynetlify`. Yours will be called `help-center` instead.
- You'll already have a local git repository set up as it comes with the gatsby-starter, so you won't need to run `git init` as they do in the tutorial. However, you will need to add the remote with `git remote add origin ...` as they do in the tutorial.

See: [Netlify tutorial from 2016](https://www.netlify.com/blog/2016/02/24/a-step-by-step-guide-gatsby-on-netlify/)

_Feel free to [open an issue](https://github.com/dferber90/gatsby-starter-help-center/issues) in case you need help._

### Thanks

Thank you for using this free help center. If this was useful to you, I'd be glad if you could [star the repository](https://github.com/dferber90/gatsby-starter-help-center). In case you deployed the help center and you're using it for one of your products, I'd love to hear about it. Please [open an issue](https://github.com/dferber90/gatsby-starter-help-center/issues) and post a link to the deployed help center. You can add some details or just leave a link there. Thanks!
