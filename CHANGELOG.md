# Change Log

This project adheres to [Semantic Versioning](http://semver.org/). Every release, along with the migration instructions, is documented on the Github [Releases](https://github.com/airbnb/react-sketchapp/releases) page.

## Version 3.2.6

- Fix the SVG component export

## Version 3.2.5

- Fix Skpm taking the wrong entry point when requiring react-sketchapp

## Version 3.2.4

- Fix the generated ES package

## Version 3.2.3

- Fix getting the font name (#510)

## Version 3.2.2

- Fix getting the default bridge on NodeJS

## Version 3.2.1

- `Platform.version` now reflects the Sketch version
- Fix a bug for a broken version of `@sketch-hq/sketch-file-format-ts`

## Version 3.2.0

- Add a new `useWindowDimensions` hook for Artboard viewport (#501)

## Version 3.1.3

- Add proptypes for Text
- Allow `fontWeigth` to be a number

## Version 3.1.2

- Handle passing a Sketch document more properly

## Version 3.1.1

- Fix for Sketch 64

## Version 3.1.0

- Fix acceptable text children (#474)
- Fix parsing of SVG arc shorthand parameters (#467)
- Change default font resolution, always falling back to the system font when the `fontFamily` is missing or not specified

## Version 3.0.5

- Fix missing dependency (#462)

## Version 3.0.4

- Fix rendering images (#458)

## Version 3.0.3

- Fix typo in Symbol (Thanks @antoni!)
- Fix messed up `js-sha` import (#456)

## Version 3.0.2

- Fix rotation direction (#433)
- Fix Svg renders when the shape doesn't fit the viewbox (#288)
- Add missing strokeAlignment prop (#276)

## Version 3.0.1

- Allow passing a style object when making a symbol
- Expose `getSymbolMasterByName`

## Version 3.0.0

- Export Svg components in the Svg/index.js file (Thanks @saschazar21!)
- Fix setting the overflow
- The symbol masters will try to maintain their overrides IDs so as not to reset instances that have overrides
- Improve error messages when trying to render a broken override
- Do not crash if there is no source for an Image, we will just show an placeholder for the image
- Handle specifying document in injectSymbols (#388)
- Add support for paragraph spacing (#382 - Thanks @lessthanzero!)
- `Image` and `Text` now support multiple shadows just like `View`
- Add support for `TextShadow`
- Add support for `transform`
- Add support for running `react-sketchapp` on NodeJS using `renderToJSON()`
- Port to TypeScript and publish TypeScript definitions
- `TextStyles.get(name)` now returns text styles that are part of the document (even if they haven't been defined with `react-sketchapp`) (#407)
- `getSymbolComponentByName` now returns Symbols that are part of the document (even if they haven't been defined with `react-sketchapp`) (#177)
- Switch the order of the `TextStyles.create` arguments to `TextStyles.create(styles, options)`

## Version 3.0.0-beta.9

- Fix setting the overflow
- The symbol masters will try to maintain their overrides IDs so as not to reset instances that have overrides
- Improve error messages when trying to render a broken override
- Export Svg components in the Svg/index.js file (Thanks @saschazar21!)

## Version 3.0.0-beta.8

- Flatten styles in exported Svg component (Thanks @dabbott!)

## Version 3.0.0-beta.7

- Add Node.js SVG renderer (Thanks @dabbott!)

## Version 3.0.0-beta.6

- Do not crash if there is no source for an Image, we will just show an placeholder for the image

## Version 3.0.0-beta.3 to 3.0.0-beta.5

- Fix setting overrides (#409)
- Fix images on NodeJS
- Fix Border-radius clipping incorrectly calculated (#279)

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
