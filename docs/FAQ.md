# Frequently Asked Questions

#### Why?!??!
`react-sketchapp` evolved out of our need to generate **high-quality, consistent Sketch assets** for our design system at Airbnb. Wrapping Sketch’s imperative API is a pragmatic solution for a great developer experience and predictable rendering.

#### Is it stable? :horse:
Some data points:
* This project follows [semantic versioning](http://semver.org/)
* We haven't baked a 1.0 release yet; until then, APIs are liable to change as we make them comfortable & productive.
* There's a [changelog](https://github.com/jongold/react-sketchapp/releases)
* We're using it day-to-day at Airbnb.

#### `<View>` & `<Text>`? Where are the shapes at?

Early versions of `react-sketchapp` mirrored Sketch's primitives — `<Rect>`, `<Oval>` etc. This was adequate for rendering simplistic designs such as grids of color palettes, but **our focus is on production design systems.**

At some point, we had to translate from our engineering primitives to Sketch's primitives. We tried translating trees of React Native elements into `<Rect>`s etc ~==
```js
// designSystem/components/Widget.js
const Widget = props =>
  <View style={{
    backgroundColor: 'red',
    borderRadius: 10,
    flexDirection: 'row', // how do we handle flex?!
  }} />;

// DSToSketch.js
const switcherooElement = (el: NativeElement): SketchElement => {
  let type;
  let props = {};
  switch (el.type) {
    case 'View': {
      type = 'Rect';
      props.x = props.style.x;
      props.width = props.style.width;
      // etc, translating every property
      break;
    }
    // etc, for every single native element
  }
  return {
    type,
    props,
  }
}
const translate = tree = ({
  ...switcherooElement(tree),
  children: tree.children.map(translate),
})

// => <Rect radius={20} fill={{color: 'red'}} />
```

This was clumsy. Not every Sketch property has an analog in react-native, but **every react-native property is translatable to Sketch** (because our app is designed in Sketch and implemented in React).

By switching to react-native's primitives we:
* think in the same primitives as we actually use in production
* use the same layout algorithm in design & code
* [render real components](/docs/universal-rendering.md) into Sketch with `react-primitives` (a platform independent set of primitives)

Where it makes sense we're open to creating Sketch-specific components —there's no analog for `<Artboard>` on web or mobile—but the goal of `react-sketchapp` is to bring design & engineering closer together.

#### So I can't draw arbitrary shapes?
Not currently. When we find the right API we'll probably implement an SVG-style abstraction for inserting arbitrary paths & polygons etc.

#### Any plans to support Sketch's constraints for layout?
Not currently. Flexbox is the closest we have to a predictable, cross-platform layout specification — by using it, we can use the same styles on every platform we build for.

We currently use [`css-layout`](https://github.com/facebook/css-layout), but switching to [`yoga`](https://github.com/facebook/yoga) is on the roadmap. [#51](https://github.com/jongold/react-sketchapp/issues/51).

#### Is there two-way binding? Can I generate React components from Sketch? :repeat:
Nope.

Isomorphisms are compelling but our focus is on tools that we can use day-to-day to improve the productivity of designers and engineers working on large-scale production applications.

Getting production-ready semantics out of Sketch is more difficult than generating production-ready Sketch templates from React components :skull:

Our solution is to keep our [our design system](http://airbnb.design/building-a-visual-language/)’s source of truth in code, and use `react-sketchapp` to compose & consume it.

To _edit_ our design system, we are free to leverage any technology that can create React components, or be compiled to JSX, such as:
* [React-centric IDEs](https://www.decosoftware.com/)
* in-house design tools that are tailored to our workflow (whilst being backed by data, version control & semantic versioning) :soon: :eyes:
* writing React components in text editors with our fingers

#### Does this tie your workflow to Sketch? What about other design tools?
Treating Sketch primarily as a _rendering target_ for cross-platform components pushes you to store components & style in code — you're then free to build translation layers for any other design tool that exposes an API.

Given equivalent API support it would be possible to simultaneously render to `react-sketchapp`, `react-figma`, `react-xd` & `react-quark`.

Rather than tying us into one design tools, reasoning about design in cross-platform primitives _frees us_ to use the tooling we want.

#### Can I use [Flow](flowtype.org) or [TypeScript](https://www.typescriptlang.org/)?
Of course!

Flow definitions are published with the npm package in `lib/*.flow.js`.

#### Why is it called `react-sketchapp` rather than `react-sketch`?
`react-sketch` was taken on npm.
