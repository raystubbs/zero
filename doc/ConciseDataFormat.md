# Concise Data Format (CDF)
CDF is a very basic data serialization format implemented in a few
hundred lines. It was designed with the following goals in mind:

1. Concise, readable, dev friendly
2. Small code footprint (doesn’t bloat client builds)
3. Suitable for embedding in HTML attributes

The result is a format somewhat akin to EDN… but also quite different.

The ‘top level’ of a CDF string is treated specially.  If it’s empty,
it's parsed as an empty string.  If it starts with a digit or `+/-`
then it’s parsed as a number. If it matches one of the following
exactly, then it’s parsed accordingly:

- `_` — parsed a `nil`
- `true` — parsed as `true`
- `false` — parsed as `false`

If it begins with one of the following, then it’s parsed accordingly:

- `:` — parsed as keyword
- `[` — parsed as vector
- `{` — parsed as map
- `(` — parsed as operation
- <code>`</code> — parsed as a string, any number of sequential ticks can be used

Otherwise, the full top-level string is ‘parsed’ as itself… a string.  Note that
empty strings can't be written as <code>``</code>, since that would just open a
string that must be closed with two ticks.  There's no need for any 'syntax' for
empty strings at the top level... just use an empty string.

At an inner level (nested in a map, vector, or operation) the syntax is more formal.
Numbers, keywords, maps, and vectors look as you’d expect.  Strings are nested in
between back-ticks.  Operations look like `(operator ...args)` (these are customizable).

Some special values exist:

- `E` — empty string
- `Inf+` — positive infinity
- `Inf-` — negative infinity
- `NaN`  — not a number
- `T` — true
- `F` — false
- `_` — nil

That’s it.  That's the format.

Use `zero.extras.cdf/read-str` to parse a CDF string.  An `:operators` option can be
passed to specify custom operators.  By default the reader supports operators matching
the `act`, `bnd`, and `<<` functions from `zero.core`, as well as a `set` for sets and
`inst` for dates.

Use `zero.extras.cdf/write-str` to serialize to a CDF string.  If a `:mapper` option
is given, the provided function will be called on each value before it’s serialized;
allowing for custom conversions.  Lists with a symbol as the first value will be
serialized as operations.  The default mapper handles actions, bindings, injections,
sets, and dates.

> [!TIP]
> CDF was designed as a good format for HTML attributes.  But it's a generic format
> for structured data, and has a small footprint.  So if smaller bundle size is more
> important than super fast read/write times, then I'd say go ahead and use CDF for
> your APIs, config, etc.
