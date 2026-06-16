---
title: Custom Delimiters
description: Swap the default <% %> delimiters for syntax that suits your project.
---

The default delimiters are `<%` and `%>`. You can change the inner character,
the opening character, and the closing character — either per render or
globally.

## Per-template

Pass `delimiter` (the inner character, default `%`) in the options object:

```js
import ejs from 'ejs';

const people = ['geddy', 'neil', 'alex'];
const html = ejs.render('<?= people.join(", "); ?>', { people }, {
  delimiter: '?',
});
// uses <? ... ?> instead of <% ... %>
```

You can also change the outer characters with `openDelimiter` and
`closeDelimiter`:

```js
const html = ejs.render('[?= people.join(", "); ?]', { people }, {
  delimiter: '?',
  openDelimiter: '[',
  closeDelimiter: ']',
});
```

## Globally

Set the defaults on the `ejs` object once, and every subsequent render uses
them:

```js
import ejs from 'ejs';

ejs.delimiter = '?';
ejs.openDelimiter = '[';
ejs.closeDelimiter = ']';
```

## On the command line

The [CLI](/docs/reference/cli/) exposes the same controls via `-m`, `-p`, and
`-c`:

```bash
ejs ./template.ejs -m '?' -o ./output.html
```

See the [Options reference](/docs/reference/options/) for the full list of
delimiter-related settings.
