// Hack to avoid bundling the node implementation/dependencies unless needed
export default function requireSvgModel() {
  return eval("require('@lona/svg-model')"); // eslint-disable-line
}
