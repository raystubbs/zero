# Zero Extras
Zero's core is intentionally kept small and very basic.  The intent is that projects
can build their own 'framework' on top of Zero, with the tooling and utilities needed
for their particular project; without introducing a lot of unnecessary fluff.

But for many projects, our requirements aren't that complicated, and we don't need to
build everything custom.  It's sometimes nice to just have what we need to get started
on a project, without doing a lot of extra groundwork. So Zero also comes with a set of
optional extras in `zero.extras.*`, which may make building with Zero that much easier.

## `zero.extras.util`
This module provides a few useful utility functions.

- `(derived f & deps)`

  Creates a function that can serve as the handler for a derived data stream.  Takes
  a function `f` of the form `(fn [[& deps] & args])` which maps the values from
  its dependencies to the stream's output value, and the sequence of watchable dependencies
  `deps`.

  ```clojure
  (zc/reg-streams
    :derived
    (zu/derived
      (fn [[foo bar] & _args]
        (+ foo bar))
      (bnd :foo)
      (bnd :bar)))
  ```

- `(watch key f & deps)`
  
  Registers a function to do something when a set of dependency watchables changes.  Takes
  a `key` which can be used to `(unwatch key)`, a function `f` of the form `(fn [& deps])`,
  and a sequence of dependency watchables `deps`.


- `(unwatch key)`
  
  Removes a watcher registered with `watch`.

## `zero.extras.db`
Many modern UI frameworks are built around the concept of a single centralized in-memory DB on the front-end
housing all FE business state.  This makes it trivial to display the same data in multiple places and formats
without duplicating state (and complexity).  It works quite well.  So Zero provides an optional (and very basic)
implementation of this pattern in `zero.extras.db`.

This DB implementation is very basic, and you're encouraged to look elsewhere for more appropriate implementations
if it does not satisfy your projects requirements.  A few examples that may be more appropriate for more complex
requirements include:

- [datascript](https://github.com/tonsky/datascript)
- [relic](https://github.com/wotbrew/relic)

That said, this DB will probably work just fine for many basic projects.  The module exposes the following
functions and registrations for interacting with the main DB.

- `(get path)`

  Resolves some path against the DB.


- `(patch! patch)`
  
  Applies a `patch` to the DB.  The `patch` is a vector of changes, each change being a map of the form:
  `{:path path-to-change :<op> op-payload :fnil default-value}`.  The `:fnil` is optional, if given its
  value will be substituted for the current value at the given path when applying the change op, if said
  value is `nil`.  The `<op>` determines how the path's value is changed, and can be one of:
  
  - `:merge` - `merge` the current value with the `op-payload`.  Both values should be maps.
  - `:conj` - `conj` the given `op-payload` into the current path value.  The current value should be a collection.
  - `:into` - Put the values from the given `op-payload` `into` the current path value.  Both should be collections.
  - `:patch` - Treat `op-payload` as a sub-`patch`, to be applied at the `path`.
  - `:value` - Replace the current path value with `op-payload`.
  - `:fn`, `:args` - Apply `op-payload` (should be a function) to the current path value and any extra args given 
     in `:args`.

- `(<< ::db/path path)`

  Injects the value at `path` in the DB.

- `(bnd ::db/path path)`

  Tracks the current value at `path` in the DB.

- `(act [::db/patch patch])`

  Applies `patch` to the DB.  Equivalent to `(patch! patch)`.

In addition, the `(apply-patch m patch)` function, which implements the DB's patching functionality against
any map, is exposed to allow for implementing other DBs with the same patch notation.  This function returns
`[patched-m affected-paths]`.

## More to come
More utilities will likely be added to Zero extras in the future.
Open an issue if you'd like to make a request.