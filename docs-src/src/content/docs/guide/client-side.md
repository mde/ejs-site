---
title: Client-Side Support
description: Run EJS in the browser with a prebuilt script.
---

EJS runs in the browser as well as on the server. Because browsers have no
filesystem, a few file-oriented features behave differently — see the caveats
below.

## Add the script

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

## Caveats in the browser

- **`renderFile` is unavailable.** There is no filesystem to read from, so use
  `ejs.render()` (or `ejs.compile()`) with a template string instead.
- **File-based includes don't work by default.** Relative `include()` paths
  resolve against the filesystem. In the browser, supply your partials through
  the [`includer`](/docs/reference/options/) option or preload them as strings.

## Precompiling templates

For production you can compile templates ahead of time with the `client`
option and ship the resulting standalone function — no template parsing needed
at runtime:

```js
const fn = ejs.compile(templateString, { client: true });
const html = fn(data); // call the compiled function with your data
```
