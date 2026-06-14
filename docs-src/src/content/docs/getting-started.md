---
title: Getting Started
description: Install EJS, pick your module system, and render your first template.
---

EJS is a simple templating language that lets you generate HTML markup with
plain JavaScript. It runs on the server (Node.js) and in the browser, ships
with a CLI, and has zero dependencies.

## Install

Add EJS to your project with npm:

```bash
npm install ejs
```

## Import it

Pick the module system that fits your project.

```js
// ESM
import ejs from 'ejs';
```

```js
// CommonJS
const ejs = require('ejs');
```

## Render a string

Pass EJS a template string and some data. You get back HTML.

```js
import ejs from 'ejs';

const people = ['geddy', 'neil', 'alex'];
const html = ejs.render('<%= people.join(", "); %>', { people });
// => "geddy, neil, alex"
```

## Render a file

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

## Use it with Express

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

## What's next

- [Tags](/docs/guide/tags/) — every delimiter and what it does
- [Includes](/docs/guide/includes/) — compose templates from partials
- [Options](/docs/reference/options/) — the full configuration reference
- [CLI Usage](/docs/reference/cli/) — render templates from the command line
