---
title: Options
description: The full list of options accepted by ejs.render, ejs.renderFile, and ejs.compile.
---

All EJS rendering functions — `ejs.render()`, `ejs.renderFile()`, and
`ejs.compile()` — accept an options object as their final/optional argument.

## Common options

| Option           | Default     | Description |
| ---------------- | ----------- | ----------- |
| `cache`          | `false`     | Compiled functions are cached; requires `filename`. See [Caching](/docs/guide/caching/). |
| `filename`       | —           | The template's path. Used as the cache key and to resolve relative [includes](/docs/guide/includes/). |
| `root`           | —           | Project root for includes with an absolute path (e.g. `/file.ejs`). May be an array. |
| `views`          | —           | Array of paths searched when resolving relative includes. |
| `context`        | `null`      | Function execution context (`this`) inside the template. |
| `compileDebug`   | `true`      | When `false`, no debug instrumentation is compiled. |
| `client`         | `false`     | Returns a standalone compiled function (for [client-side](/docs/guide/client-side/) use). |
| `escape`         | HTML escape | The escaping function applied to `<%=` output. |

## Delimiter options

| Option            | Default | Description |
| ----------------- | ------- | ----------- |
| `delimiter`       | `%`     | The inner delimiter character. |
| `openDelimiter`   | `<`     | The opening delimiter character. |
| `closeDelimiter`  | `>`     | The closing delimiter character. |

See [Custom Delimiters](/docs/guide/custom-delimiters/) for examples.

## Output & scope options

| Option                | Default    | Description |
| --------------------- | ---------- | ----------- |
| `strict`              | `false`    | Generate the function in strict mode (disables `with`). |
| `_with`               | `true`     | Whether to use `with(){}` for the data scope. Disabling implies `strict`. |
| `localsName`          | `locals`   | Name of the object holding locals when `with` is disabled. |
| `destructuredLocals`  | `[]`       | Locals always destructured from the data object (available even in strict mode). |
| `outputFunctionName`  | —          | If set (e.g. `'echo'`), exposes a print function for use inside scriptlet tags. |
| `rmWhitespace`        | `false`    | Remove all safe-to-remove whitespace, including leading/trailing. |
| `async`              | `false`    | Use an async function for rendering, enabling `await` inside templates. |

## Advanced

| Option         | Default | Description |
| -------------- | ------- | ----------- |
| `debug`        | `false` | Output the generated function body for inspection. |
| `includer`     | —       | Custom function to resolve and load includes. |

:::tip
When rendering through Express, `filename` and `cache` are managed for you —
you typically only need to pass your own template data.
:::
