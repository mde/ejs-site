---
title: Layouts
description: Build page layouts by composing header and footer partials with includes.
---

EJS does not have a dedicated layout or block-inheritance system. Instead, you
compose pages from partials using [includes](/docs/guide/includes/) — which is
flexible enough to cover the common header/content/footer pattern.

## Header and footer

Wrap each page's content between a shared header and footer:

```ejs
<%# page.ejs %>
<%- include('header'); -%>

<h1><%= title %></h1>
<p>This is the page body.</p>

<%- include('footer'); -%>
```

```ejs
<%# header.ejs %>
<!DOCTYPE html>
<html>
  <head>
    <title><%= title %></title>
  </head>
  <body>
```

```ejs
<%# footer.ejs %>
  </body>
</html>
```

Because the header and footer share the same data scope as the page, `title`
is available in all three templates.

## Passing data into partials

Need a partial that takes its own arguments? Pass them as the second argument
to `include()`:

```ejs
<%- include('nav', { current: 'home' }); -%>
```

## A note on trimming

Use the newline-trimming close tag `-%>` after an `include()` (as above) to
keep your generated HTML from accumulating blank lines. See
[Tags](/docs/guide/tags/) for the full set of whitespace controls.
