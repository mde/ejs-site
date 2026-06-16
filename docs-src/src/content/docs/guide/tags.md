---
title: Tags
description: Every EJS delimiter and what it does — scriptlets, output, comments, and whitespace control.
---

EJS templates are HTML with JavaScript embedded inside delimiter tags. By
default the tags open with `<%` and close with `%>`. Each variant controls
whether code runs, whether its result is printed, and how it is escaped.

## Tag reference

| Tag    | Name                  | What it does |
| ------ | --------------------- | ------------ |
| `<%`   | Scriptlet             | Runs control-flow JavaScript; produces no output. |
| `<%_`  | Whitespace-slurping scriptlet | Like `<%`, but strips all whitespace *before* it. |
| `<%=`  | Escaped output        | Prints the value into the template, HTML-escaped. |
| `<%-`  | Unescaped output      | Prints the raw value into the template (no escaping). |
| `<%#`  | Comment               | Does nothing and prints nothing. |
| `<%%`  | Literal               | Outputs a literal `<%`. |
| `%>`   | Closing tag           | Plain close. |
| `-%>`  | Newline-trimming close | Trims the newline immediately after the tag. |
| `_%>`  | Whitespace-slurping close | Strips all whitespace *after* the tag. |

## Scriptlets and output

Use a scriptlet (`<%`) for logic and an output tag (`<%=`) to print a value:

```ejs
<% if (user) { %>
  <h2><%= user.name %></h2>
<% } %>

<ul>
  <% items.forEach(item => { %>
    <li><%= item %></li>
  <% }); %>
</ul>
```

## Escaped vs. unescaped output

`<%=` escapes HTML so user-supplied values can't inject markup. Use `<%-` only
when you intend to emit raw HTML (for example, the result of an
[include](/docs/guide/includes/)):

```ejs
<%# value is "<b>hi</b>" %>
<%= value %>   <%# renders: &lt;b&gt;hi&lt;/b&gt; %>
<%- value %>   <%# renders: <b>hi</b> %>
```

:::tip
Always use `<%-` with `include()` to avoid double-escaping the included HTML.
:::

## Comments

`<%# ... %>` lets you annotate templates. The contents are never executed and
never appear in the output.

```ejs
<%# This block explains the markup below — it won't render %>
<p>Visible to the reader.</p>
```

## Controlling whitespace

The slurping tags help you keep generated HTML tidy. `-%>` removes the single
newline that follows a tag, while `<%_` and `_%>` strip *all* surrounding
whitespace:

```ejs
<ul>
<% items.forEach(item => { -%>
  <li><%= item %></li>
<% }); -%>
</ul>
```

For broader cleanup across the whole template, see the
[`rmWhitespace`](/docs/reference/options/) option.
