# Lexical Structure

This chapter shows the lexical structure of Veryl.
At the first, we'll discuss about the general parts in it.

## Encoding

The encoding of Veryl source code should be UTF-8.

## White Space

` `(white space), `\t` and `\n` are treated as white space.
All of them are skipped by Veryl's parser.

## Comment

Single line comment and multi line comment can be used.
Almost all comment will be outputted at the transpiled code.

```veryl,playground
// single line comment

/*
multi

line

comment
*/

```

### Documentation comment

Signle line comment starts with `///` is treated as documentation comment.
Documentation comment is used for document generation.

```veryl,playground
/// documentation comment

```

## Identifier

Identifier is composed with ASCII alphabet and number and `_`.
Leading number is not allowed.
The following regular expression shows the definition.

```
[a-zA-Z_][a-zA-Z0-9_]*
```

## Raw Identifier

Some keywords of Veryl can be used as identifier in SystemVerilog.
To access these identifiers, raw identifier can be used.
For example, `clock` which is a keyword of Veryl can be used as identifier like `r#clock`.
The `r#clock` will be transpiled to `clock` in SystemVerilog.

## String

String is surrounded by `"`.
Escape by `\` can be used like `\"`, `\n` and so on.

```
"Hello, World!"
```
