# Troubleshooting

#### How do I `console.log`?
Sketch's JavaScript runtime exposes a global `log` function. Use it wherever you'd usually use `console.log` in a React app.

```javascript
const Document = ({ content }) => (
  <Text children={content} />
)

const onRun = (context) => {
  log(context);
  log('should designers learn to code?');
  log(<Document content='Hello world' />);
  // etc
}
```

You can view the logs using `Console.app`, or in the terminal.
```bash
tail -f ~/Library/Logs/com.bohemiancoding.sketch3/Plugin\ Output.log
```

#### My changes don’t show up when rerunning my plugin
Make sure Sketch is configured to automatically reload plugins!
```bash
defaults write ~/Library/Preferences/com.bohemiancoding.sketch3.plist AlwaysReloadScript -bool YES
```
