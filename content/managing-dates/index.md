---
title: Publication and modification dates
date: 2020-01-03
author: dferber
description: "Attach dates to your articles"
---

_This tutorial will show you how to manage publication dates and last modified-dates. At the end, you will know how to add work with dates. The next section then shows how to customize your help center. And the final step shows how to deploy the help center to the internet, so that anyone can access it._

### Prerequisites

This article assumes that you've got the help center running locally and you're familiar with how to create articles.

### Publication dates

Every article in your help center can have a publication date. When an article was modified since it was published, you can further specify the date it was last modified. These dates help signal users how up-to-date your articles are.

The dates are written as [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date strings. This means that the dates look roughly like this `2020-01-03`, where the format is `YYYY-MM-DD` (year-month-date).

The date looks like this

```yaml
---
title: Publication and modification dates
date: 2020-01-03
author: dferber
description: "Attach dates to your articles"
---

```

The date will be shown as "Published on 1/3/2020". The formatting on the date depends on the language of your help center is set to.

### Modification dates

In case you made changes to an article since publishing it originally, you can signal this by setting `modifiedDate`.

```yaml
---
title: Publication and modification dates
date: 2020-01-03
modifiedDate: 2020-01-04
author: dferber
description: "Attach dates to your articles"
---

```

In that case, the date will be shown as "Last edited 1/4/2020".
You'll have to remember to manually update this timestamp when you make (significant) changes to the article.

### Specifying date and time

If you want to attach a time to your dates, you can do so by using strings like `2020-01-03T14:04:25.066Z`. The `Z` in the end means that this date is to be interpreted in the UTC time zone. You can use an offset to the UTC time zone with `2020-01-03T14:04:25.066+00:00`. Users can see the explicit time when they hover their cursor over the date.

### Customize your help center

Now that you know about dates, you can continue to learn how to customize your help center in any of these articles:

- [Adding your own logo](/articles/customizing-brand-logo)
- [Changing the language](/articles/customizing-locale)
- [Working with icons](/articles/customizing-icons)
- [Changing the theme](/articles/customizing-theme)

Or you can go straight to [Deploying the Help Center](/articles/deploy).
