
[![Clojars Project](https://img.shields.io/clojars/v/me.raystubbs/zero.svg)](https://clojars.org/me.raystubbs/zero)

# Zero
A toolkit for building web components in ClojureScript.

## Highlights
- Depends only on ClojureScript core
- Small, with optional 'extras' modules for more features
- Hot reload friendly
- Focus preserving updates
- 'Good enough' performance

## Rationale
- Web components have many advantages over React and similar frameworks, including:
    - Easy to render server-side
    - Seamless interop with other frameworks and libraries
    - Encapsulation, no style bleed, often better performance
    - Native DevTools support
- Web components are cool, but the native API for building them isn't very convenient
    - Zero makes web components easy

## Warning
Depends on modern browser APIs, works on the latest versions of all
major browsers... but will break in some not-so-old versions.  In particular,
it depends on:
+ [CSSStyleSheet constructor](https://caniuse.com/mdn-api_cssstylesheet_cssstylesheet)
+ [ElementInternals](https://caniuse.com/mdn-api_elementinternals)

## Learning
Zero is in a highly experimental stage of development, as such, it's
difficult to keep any sort of extensive documentation up to date.  So
I've built a few demos, and will try to keep those up to date with
the latest Zero version.
- [TodoMVC](https://github.com/raystubbs/zero-todomvc)
- [SSR Demo (w. live updates)](https://github.com/raystubbs/zero-ssr-demo)

In addition, I'll do my best to keep the following up to date:
- [Configuration](doc/Configuration.md) - Full walkthrough of `zero.config`,
  which is used to configure all aspect of Zero, including registering
  components.
- [Markup](doc/Markup.md) - Detailed description of the markup
  notation used by Zero, which is akin to Hiccup, but not identical.
- [Extras](doc/Extras.md) - Goes through Zero's 'extra' modules,
  including derived streams and the built-in database implementation.

## Contact
- [zero@raystubbs.me](mailto:zero@raystubbs.me)
- Clojurians: [@Ray Stubbs](https://clojurians.slack.com/team/U062WV76S1W)

[wc]: https://developer.mozilla.org/en-US/docs/Web/API/Web_components
[hiccup]: https://github.com/weavejester/hiccup
[markup-doc]: doc/Markup.md
[delegates-focus]: https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/delegatesFocus