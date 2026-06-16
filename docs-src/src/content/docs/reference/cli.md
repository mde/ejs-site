---
title: CLI Usage
description: Render EJS templates from the command line.
---

EJS ships with a command-line tool. Feed it a template file and some data,
specify an output file, and it renders the result.

## Install

Install globally to get the `ejs` command on your `PATH`:

```bash
npm install -g ejs
```

## Basic usage

```bash
ejs ./template.ejs -f data.json -o ./output.html
```

This renders `template.ejs` using the data in `data.json` and writes the
result to `output.html`. With no `-o`, output is written to stdout.

## Providing data

```bash
# From a JSON file
ejs ./template.ejs -f data.json

# Inline as a JSON string
ejs ./template.ejs -i '{"name":"world"}'
```

## Options

| Flag                          | Description |
| ----------------------------- | ----------- |
| `-o`, `--output-file FILE`    | Write output to `FILE` (default: stdout). |
| `-f`, `--data-file FILE`      | Load template data from a JSON `FILE`. |
| `-i`, `--data-input STRING`   | Provide template data as a JSON string. |
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

These flags mirror the [render options](/docs/reference/options/) of the
JavaScript API.
