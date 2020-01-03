---
title: Authors
date: 2020-01-03
author: dferber
modifiedDate: null
description: "Add yourself and your team as authors."
---

_This tutorial will show you how to manage authors. At the end, you will know how to add new authors, and how to edit existing ones. The next section then shows how to work with dates. And the final step shows how to deploy the help center to the internet, so that anyone can access it._

### Prerequisites

This article assumes that you've got the help center running locally and you're familiar with how to create articles and how to manage collections.

### Managing authors

Every article in your help center can have an author associated with it. The author will show up at the top of the artilce (as you can see in the "written by" section on this page).

Of course you'll want to add yourself as an author, so let's do that now.

### Opening the authors.yml file

First, open the `data/authors.yml` file. You should see a list of authors like

```yaml
- id: dferber
  name: Dominik
  avatar: ./avatars/dferber.png
- id: amanda
  name: Amanda
  avatar: ./avatars/amanda.jpg
- id: bert
  name: Bert
  avatar: ./avatars/bert.jpg
```

Add yourself to the bottom of this list and place your profile picture inside `data/avatars`. Make sure the name of your profile picture image file has no special characters, as that keeps things simple.

After you placed your profile picture inside the `data/avatars` folder (let's say it was called `handsome-harry.jpg`) and after you've added yourself to the list, it should look something like this:

```yaml
- id: dferber
  name: Dominik
  avatar: ./avatars/dferber.png
- id: amanda
  name: Amanda
  avatar: ./avatars/amanda.jpg
- id: bert
  name: Bert
  avatar: ./avatars/bert.jpg
- id: harry
  name: Harry
  avatar: ./avatars/handsome-harry.jpg
```

You can even delete the previous authors (and their avatars), and only keep yourself:

```yaml
- id: harry
  name: Harry
  avatar: ./avatars/handsome-harry.jpg
```

### Making yourself the author of an article

Now that you're defined as an author, you can set yourself as the author of an article. You can open any article you want (for example the very article you're reading `content/managing-authors/index.md`) and make yourself the author of it. To do so, edit the author in the front matter (the part where it says `author`). You'll need to replace `dferber` with the id you just gave yourself (in our case `harry`).

Before:

```yaml
---
title: Authors
date: 2020-01-03
author: dferber
modifiedDate: null
description: "Add yourself and your team as authors."
---

```

After:

```yaml
---
title: Authors
date: 2020-01-03
author: harry
modifiedDate: null
description: "Add yourself and your team as authors."
---

```

Great, that's all there is to it. Next, you can learn [how to manage publication and modification dates](/articles/managing-dates).
