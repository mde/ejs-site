---
title: Documentation
description: Install EJS, learn every tag and feature, and look up the full options and CLI reference — all on one page.
---

EJS is a simple templating language that lets you generate HTML markup with
plain JavaScript. It runs on the server (Node.js) and in the browser, ships
with a CLI, and has zero dependencies.

## Getting Started

### Install

Add EJS to your project with npm:

```bash
npm install ejs
```

### Import it

Pick the module system that fits your project.

```js
// ESM
import ejs from 'ejs';
```

```js
// CommonJS
const ejs = require('ejs');
```

### Render a string

Pass EJS a template string and some data. You get back HTML.

```js
import ejs from 'ejs';

const people = ['geddy', 'neil', 'alex'];
const html = ejs.render('<%= people.join(", "); %>', { people });
// => "geddy, neil, alex"
```

### Render a file

`renderFile` reads a template from disk. The third argument is an options
object; the callback receives the rendered string.

```js
import ejs from 'ejs';

ejs.renderFile('./template.ejs', { people }, (err, html) => {
  if (err) throw err;
  console.log(html);
});
```

You can also `await` it when you omit the callback:

```js
const html = await ejs.renderFile('./template.ejs', { people });
```

### Use it with Express

EJS complies with the Express view system, so it works out of the box — just
set the view engine.

```js
import express from 'express';

const app = express();
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', { title: 'Home', people });
});
```

:::caution[A note on security]
EJS is effectively a JavaScript runtime. If you give end-users unfettered
access to the render method without validating inputs yourself, you are using
EJS in an inherently insecure way. Never do this:

```js
// ⚠️ don't pass untrusted input directly
app.get('/', (req, res) => {
  res.render('index', req.query);
});
```

See [SECURITY.md](https://github.com/mde/ejs/blob/main/SECURITY.md) before
reporting any security issues.
:::

## Tags

EJS templates are HTML with JavaScript embedded inside delimiter tags. By
default the tags open with `<%` and close with `%>`. Each variant controls
whether code runs, whether its result is printed, and how it is escaped.

### Tag reference

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

### Scriptlets and output

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

### Escaped vs. unescaped output

`<%=` escapes HTML so user-supplied values can't inject markup. Use `<%-` only
when you intend to emit raw HTML (for example, the result of an
[include](#includes)):

```ejs
<%# value is "<b>hi</b>" %>
<%= value %>   <%# renders: &lt;b&gt;hi&lt;/b&gt; %>
<%- value %>   <%# renders: <b>hi</b> %>
```

:::tip
Always use `<%-` with `include()` to avoid double-escaping the included HTML.
:::

### Comments

`<%# ... %>` lets you annotate templates. The contents are never executed and
never appear in the output.

```ejs
<%# This block explains the markup below — it won't render %>
<p>Visible to the reader.</p>
```

### Controlling whitespace

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
[`rmWhitespace`](#options) option.

## Includes

Includes let you pull one template into another — headers, footers, list
items, anything reusable. Paths are resolved relative to the template that
calls `include()`.

### Basic usage

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

### Why `<%-` and not `<%=`

`include()` returns a string of already-rendered HTML. If you printed it with
the escaping tag `<%=`, every `<`, `>`, and `&` would be escaped and you'd see
the markup as text. The raw-output tag `<%-` emits it as-is.

### Path resolution and `filename`

Relative include paths need to know where the *calling* template lives, so EJS
requires the [`filename`](#options) option to be set. When you
use `ejs.renderFile()` or Express, `filename` is set automatically. If you call
`ejs.render()` on a raw string and use includes, set it yourself:

```js
const html = ejs.render(template, data, {
  filename: '/path/to/template.ejs',
});
```

To resolve includes from a set of base directories (or with absolute paths
like `/partials/header`), use the [`views`](#options) and
[`root`](#options) options.

### Preprocessor include (legacy)

Older EJS supported a literal `<% include user/show %>` form. It is deprecated
and has no caching benefits — prefer the `include()` function shown above.

## Custom Delimiters

The default delimiters are `<%` and `%>`. You can change the inner character,
the opening character, and the closing character — either per render or
globally.

### Per-template

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

### Globally

Set the defaults on the `ejs` object once, and every subsequent render uses
them:

```js
import ejs from 'ejs';

ejs.delimiter = '?';
ejs.openDelimiter = '[';
ejs.closeDelimiter = ']';
```

### On the command line

The [CLI](#cli-usage) exposes the same controls via `-m`, `-p`, and
`-c`:

```bash
ejs ./template.ejs -m '?' -o ./output.html
```

See the [Options reference](#options) for the full list of
delimiter-related settings.

## Layouts

EJS does not have a dedicated layout or block-inheritance system. Instead, you
compose pages from partials using [includes](#includes) — which is
flexible enough to cover the common header/content/footer pattern.

### Header and footer

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

### Passing data into partials

Need a partial that takes its own arguments? Pass them as the second argument
to `include()`:

```ejs
<%- include('nav', { current: 'home' }); -%>
```

### A note on trimming

Use the newline-trimming close tag `-%>` after an `include()` (as above) to
keep your generated HTML from accumulating blank lines. See
[Tags](#tags) for the full set of whitespace controls.

## Caching

EJS compiles each template into a JavaScript function. Caching stores that
compiled function so repeat renders of the same template skip the compile step.

### Enabling the cache

Set the `cache` option to `true`. Because cached functions are keyed by file
path, you must also provide a [`filename`](#options):

```js
import ejs from 'ejs';

const html = ejs.render(template, data, {
  cache: true,
  filename: '/path/to/template.ejs',
});
```

When you render through `ejs.renderFile()` or Express, `filename` is set for
you — just pass `cache: true`.

### Swapping in a custom cache

By default EJS caches into a plain object that grows without bound. For
long-running servers, assign your own cache (anything with `set`, `get`, and
`reset` methods) to `ejs.cache`. An LRU cache is a common choice:

```js
import ejs from 'ejs';
import { LRUCache } from 'lru-cache';

ejs.cache = new LRUCache({ max: 100 }); // keep the 100 most-recent templates
```

### Clearing the cache

Call `ejs.clearCache()` to empty the cache — useful in development when
templates change on disk:

```js
ejs.clearCache();
```

## Client-Side Support

EJS runs in the browser as well as on the server. Because browsers have no
filesystem, a few file-oriented features behave differently — see the caveats
below.

### Add the script

Download a prebuilt build from the
[EJS releases](https://github.com/mde/ejs/releases) (or `ejs.min.js` for the
minified version) and drop it in a script tag. EJS attaches itself to the
global `ejs` object:

```html
<script src="ejs.min.js"></script>
<script>
  const people = ['geddy', 'neil', 'alex'];
  const html = ejs.render('<%= people.join(", "); %>', { people });
  document.body.innerHTML = html;
</script>
```

### Caveats in the browser

- **`renderFile` is unavailable.** There is no filesystem to read from, so use
  `ejs.render()` (or `ejs.compile()`) with a template string instead.
- **File-based includes don't work by default.** Relative `include()` paths
  resolve against the filesystem. In the browser, supply your partials through
  the [`includer`](#options) option or preload them as strings.

### Precompiling templates

For production you can compile templates ahead of time with the `client`
option and ship the resulting standalone function — no template parsing needed
at runtime:

```js
const fn = ejs.compile(templateString, { client: true });
const html = fn(data); // call the compiled function with your data
```

## Options

All EJS rendering functions — `ejs.render()`, `ejs.renderFile()`, and
`ejs.compile()` — accept an options object as their final/optional argument.

### Common options

| Option           | Default     | Description |
| ---------------- | ----------- | ----------- |
| `cache`          | `false`     | Compiled functions are cached; requires `filename`. See [Caching](#caching). |
| `filename`       | —           | The template's path. Used as the cache key and to resolve relative [includes](#includes). |
| `root`           | —           | Project root for includes with an absolute path (e.g. `/file.ejs`). May be an array. |
| `views`          | —           | Array of paths searched when resolving relative includes. |
| `context`        | `null`      | Function execution context (`this`) inside the template. |
| `compileDebug`   | `true`      | When `false`, no debug instrumentation is compiled. |
| `client`         | `false`     | Returns a standalone compiled function (for [client-side](#client-side-support) use). |
| `escape`         | HTML escape | The escaping function applied to `<%=` output. |

### Delimiter options

| Option            | Default | Description |
| ----------------- | ------- | ----------- |
| `delimiter`       | `%`     | The inner delimiter character. |
| `openDelimiter`   | `<`     | The opening delimiter character. |
| `closeDelimiter`  | `>`     | The closing delimiter character. |

See [Custom Delimiters](#custom-delimiters) for examples.

### Output & scope options

| Option                | Default    | Description |
| --------------------- | ---------- | ----------- |
| `strict`              | `false`    | Generate the function in strict mode (disables `with`). |
| `_with`               | `true`     | Whether to use `with(){}` for the data scope. Disabling implies `strict`. |
| `localsName`          | `locals`   | Name of the object holding locals when `with` is disabled. |
| `destructuredLocals`  | `[]`       | Locals always destructured from the data object (available even in strict mode). |
| `outputFunctionName`  | —          | If set (e.g. `'echo'`), exposes a print function for use inside scriptlet tags. |
| `rmWhitespace`        | `false`    | Remove all safe-to-remove whitespace, including leading/trailing. |
| `async`              | `false`    | Use an async function for rendering, enabling `await` inside templates. |

### Advanced

| Option         | Default | Description |
| -------------- | ------- | ----------- |
| `debug`        | `false` | Output the generated function body for inspection. |
| `includer`     | —       | Custom function to resolve and load includes. |

:::tip
When rendering through Express, `filename` and `cache` are managed for you —
you typically only need to pass your own template data.
:::

## CLI Usage

EJS ships with a command-line tool. Feed it a template file and some data,
specify an output file, and it renders the result.

### Installing the CLI

Install globally to get the `ejs` command on your `PATH`:

```bash
npm install -g ejs
```

### Running a template

```bash
ejs ./template.ejs -f data.json -o ./output.html
```

This renders `template.ejs` using the data in `data.json` and writes the
result to `output.html`. With no `-o`, output is written to stdout.

### Providing data

```bash
# From a JSON file
ejs ./template.ejs -f data.json

# Inline as a URI-encoded JSON string
ejs ./template.ejs -i '%7B%22name%22%3A%22world%22%7D'
```

### Command-line flags

| Flag                          | Description |
| ----------------------------- | ----------- |
| `-o`, `--output-file FILE`    | Write output to `FILE` (default: stdout). |
| `-f`, `--data-file FILE`      | Load template data from a JSON `FILE`. |
| `-i`, `--data-input STRING`   | Must be JSON-formatted and URI-encoded. Use parsed input from STRING as data for rendering. |
| `-m`, `--delimiter CHAR`      | Inner delimiter character (default `%`). |
| `-p`, `--open-delimiter CHAR` | Opening delimiter character (default `<`). |
| `-c`, `--close-delimiter CHAR`| Closing delimiter character (default `>`). |
| `-s`, `--strict`              | Compile in strict mode. |
| `-n`, `--no-with`             | Don't use `with()`; reference data via `locals`. |
| `-l`, `--locals-name NAME`    | Name of the locals object when `--no-with` is set. |
| `-w`, `--rm-whitespace`       | Remove safe-to-remove whitespace. |
| `-d`, `--debug`               | Output the generated function body. |
| `-h`, `--help`                | Show usage. |
| `-V`, `--version`             | Print the EJS version. |

These flags mirror the [render options](#options) of the
JavaScript API.
