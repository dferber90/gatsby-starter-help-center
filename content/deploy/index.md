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

### Deploying

If you want to have a really cool setup for your help center, you can connect [Vercel](https://vercel.com/) and GitHub. You can set up a `git` repository for your help center. You can use a free private repository from [GitHub](https://github.com/) for it. Then you can connect Vercel to automatically build and publish your Gatsby site whenever you push changes to your git repository on GitHub.

Since this is something which is is not specific to `gatsby-starter-help-center` at all, I'll simply refer you to Vercel's [Create a Gatsby Website and Deploy It with Vercel](https://vercel.com/guides/deploying-gatsby-with-vercel) guide.

### Thanks

Thank you for using this free help center. If this was useful to you, I'd be glad if you could [star the repository](https://github.com/dferber90/gatsby-starter-help-center). In case you deployed the help center and you're using it for one of your products, I'd love to hear about it. Please [open an issue](https://github.com/dferber90/gatsby-starter-help-center/issues) and post a link to the deployed help center. You can add some details or just leave a link there. Thanks!
