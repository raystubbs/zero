
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
Check out the [Zero User's Guide](doc/UsersGuide.md) for a (reasonably)
complete guide.  Also, there are a few demos:
- [TodoMVC](https://github.com/raystubbs/zero-todomvc)
- [SSR Demo (w. live updates)](https://github.com/raystubbs/zero-ssr-demo)

Feel free to DM me [@Ray Stubbs](https://clojurians.slack.com/team/U062WV76S1W) in
the Clojurians Slack for any questions.