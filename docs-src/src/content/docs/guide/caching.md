---
title: Caching
description: Cache compiled templates for faster repeat renders.
---

EJS compiles each template into a JavaScript function. Caching stores that
compiled function so repeat renders of the same template skip the compile step.

## Enabling the cache

Set the `cache` option to `true`. Because cached functions are keyed by file
path, you must also provide a [`filename`](/docs/reference/options/):

```js
import ejs from 'ejs';

const html = ejs.render(template, data, {
  cache: true,
  filename: '/path/to/template.ejs',
});
```

When you render through `ejs.renderFile()` or Express, `filename` is set for
you — just pass `cache: true`.

## Swapping in a custom cache

By default EJS caches into a plain object that grows without bound. For
long-running servers, assign your own cache (anything with `set`, `get`, and
`reset` methods) to `ejs.cache`. An LRU cache is a common choice:

```js
import ejs from 'ejs';
import { LRUCache } from 'lru-cache';

ejs.cache = new LRUCache({ max: 100 }); // keep the 100 most-recent templates
```

## Clearing the cache

Call `ejs.clearCache()` to empty the cache — useful in development when
templates change on disk:

```js
ejs.clearCache();
```
