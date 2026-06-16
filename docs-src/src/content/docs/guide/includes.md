---
title: Includes
description: Compose templates from reusable partials with the include() function.
---

Includes let you pull one template into another — headers, footers, list
items, anything reusable. Paths are resolved relative to the template that
calls `include()`.

## Basic usage

Call `include()` inside an **unescaped** output tag (`<%-`) so the partial's
HTML isn't double-escaped:

```ejs
<ul>
  <% users.forEach(user => { %>
    <%- include('user/show', { user: user }); %>
  <% }); %>
</ul>
```

`user/show.ejs` receives the data you pass as the second argument:

```ejs
<%# user/show.ejs %>
<li><%= user.name %></li>
```

## Why `<%-` and not `<%=`

`include()` returns a string of already-rendered HTML. If you printed it with
the escaping tag `<%=`, every `<`, `>`, and `&` would be escaped and you'd see
the markup as text. The raw-output tag `<%-` emits it as-is.

## Path resolution and `filename`

Relative include paths need to know where the *calling* template lives, so EJS
requires the [`filename`](/docs/reference/options/) option to be set. When you
use `ejs.renderFile()` or Express, `filename` is set automatically. If you call
`ejs.render()` on a raw string and use includes, set it yourself:

```js
const html = ejs.render(template, data, {
  filename: '/path/to/template.ejs',
});
```

To resolve includes from a set of base directories (or with absolute paths
like `/partials/header`), use the [`views`](/docs/reference/options/) and
[`root`](/docs/reference/options/) options.

## Preprocessor include (legacy)

Older EJS supported a literal `<% include user/show %>` form. It is deprecated
and has no caching benefits — prefer the `include()` function shown above.
