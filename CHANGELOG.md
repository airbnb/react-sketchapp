# Change Log

This project adheres to [Semantic Versioning](http://semver.org/). Every release, along with the migration instructions, is documented on the Github [Releases](https://github.com/airbnb/react-sketchapp/releases) page.

## Version 3.0.0-beta.1

- Fix ShapeGroup on nodejs (#387)
- Handle specifying document in injectSymbols (#388)
- Fix support for paragraph spacing on sketch >= 49 (#390)

## Version 3.0.0-beta.0

- Add support for paragraph spacing (#382 - Thanks @lessthanzero!)
- `Image` and `Text` now support multiple shadows just like `View`
- add support for `TextShadow`
- Experimental support for `transform`
- Experimental support for running `react-sketchapp` on NodeJS

## Version 2.1.0

- Ensure `makeSymbol` does not change currentPage (#353 - Thanks @jaridmargolin!)
- Fix Text decoration underline style (#370 - Thanks @thecalvinchan!)
- Add possibility to add multiple shadows and shadow spread (#277 - Thanks @ludwigfrank and @thierryc!)
- Support rendering into wrapped object (hence support the new Sketch API) (#379)

## Version 2.0.0

- Now throws if the "Symbols" page is explicitly passed in as the `container` on the `render` method. Previously if you explicitly passed in the "Symbols" pages as a container, it would create a new page and render onto that. (#297 - Thanks @jaridmargolin!)
- Now throws an error if you attempt to render a Document component into a node intended to be a child of `Document`. (#297 - Thanks @jaridmargolin!)
- Adds support for rendering a `Page` component into a container passed through the `render` method. This allows for rendering multiple `Artboard`s onto an existing page. (#297 - Thanks @jaridmargolin!)
- More predictable rendering of `RedBox`. (#297 - Thanks @jaridmargolin!)
- Fix Symbols overrides for Sketch >= 46 (#198 - Thanks @ianhook!)
- Fix text overrides when the name of the Text layer is not explicitly defined (#292 - Thanks @jaridmargolin!)
- update `yoga-node` to 1.9 (#314)
- Add support for Sketch 50 (#290)
- Fix shared text style matching (#290)
- Remove n^2 rendering problem with large symbol sets (#235 - Thanks @ianhook!)
- `Page` without a name explicitly set will be auto-incremented ("Page 1", "Page 2", etc.) just like how Sketch is doing by default (#296 - Thanks @jaridmargolin!)
