# Frequently Asked Questions

#### Why?!??!

`react-sketchapp` evolved out of our need to generate **high-quality, consistent Sketch assets** for our design system at Airbnb. Wrapping Sketch’s imperative API is a pragmatic solution for a great developer experience and predictable rendering.

#### How do I `console.log`?

You have multiple options to view the logs:

- Using the [sketch-dev-tools](https://github.com/skpm/sketch-dev-tools)
- `Console.app -> ~/Library/Logs -> com.bohemiancoding.sketch -> Plugin Output.log`
- in the terminal

  ```bash
  skpm log -f
  ```

- in the terminal

  ```bash
  tail -F ~/Library/Logs/com.bohemiancoding.sketch3/Plugin\ Output.log
  ```

  Occasionally this file disappears — in that case, run this and then try `tail`ing again.

  ```bash
  touch ~/Library/Logs/com.bohemiancoding.sketch3/Plugin\ Output.log
  ```

For more information, check out the [Sketch developer documentation](https://developer.sketch.com/plugins/debugging).

#### I'm running a project as a plugin & Sketch isn't showing my changes

Sketch has a [developer mode](https://developer.sketch.com/plugins/debugging#reload-scripts) which refreshes plugins before running. If you're using `skpm` this should be set up automatically, but just in case try running

```bash
defaults write com.bohemiancoding.sketch3.plist AlwaysReloadScript -bool YES
```

#### `<View>` & `<Text>`? Where are the shapes? Talk to me about your API decisions!

Early versions of `react-sketchapp` mirrored Sketch's layers — `<Rect>`, `<Oval>`, `<Star>` etc. This was adequate for rendering simplistic designs such as grids of color palettes, but our focus is on production design systems.

At some point, we had to translate from our component codebase's primitives to Sketch's shapes. We tried translating trees of React Native elements into `<Rect>`s etc, but it felt clumsy. Not every Sketch property has an analog in react-native, but **most react-native properties are translatable to Sketch**.

By aligning with react-native's API we:

- think in the same primitives as we actually use in production
- use the same layout algorithm in design & code
- [render real components](http://airbnb.io/react-sketchapp/docs/guides/universal-rendering.html) into Sketch with `react-primitives` (a platform independent set of primitives)

Where it makes sense we're open to creating Sketch-specific components —there's no analog for `<Artboard>` on web or mobile—but the goal of `react-sketchapp` is to bring design & engineering closer together.

#### So I can't draw arbitrary shapes?

You can use the [SVG API](/docs/API.md#svg) to draw arbitrary shapes.

#### Any plans to support Sketch's constraints for layout?

Not currently. FlexBox is the closest we have to a predictable, cross-platform layout specification — by using it, we can use the same styles on every platform we build for.

We currently use [`yoga`](https://github.com/facebook/yoga).

#### Is there two-way binding? Can I generate React components from Sketch? 🔁

Nope.

Isomorphisms are compelling but our focus is on tools that we can use day-to-day to improve the productivity of designers and engineers working on large-scale production applications.

Getting production-ready semantics out of Sketch is more difficult than generating production-ready Sketch templates from React components 💀

Our solution is to keep our [our design system](http://airbnb.design/building-a-visual-language/)’s source of truth in code, and use `react-sketchapp` to compose & consume it.

To _edit_ our design system, we are free to leverage any technology that can create React components, or be compiled to JSX, such as:

- [React-centric IDEs](https://www.decosoftware.com/)
- in-house design tools that are tailored to our workflow (whilst being backed by data, version control & semantic versioning) 🔜 👀
- writing React components in text editors with our fingers

#### Does this tie your workflow to Sketch? What about other design tools?

Treating Sketch primarily as a _rendering target_ for cross-platform components pushes you to store components & style in code — you're then free to build translation layers for any other design tool that exposes an API.

Given equivalent API support it would be possible to simultaneously render to `react-sketchapp`, `react-figma`, `react-xd` & `react-quark`.

Rather than tying us into one design tools, reasoning about design in cross-platform primitives _frees us_ to use the tooling we want.

#### Can I use [TypeScript](https://www.typescriptlang.org/)?

Of course!

TypeScript definitions are published with the npm package.
