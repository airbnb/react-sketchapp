class Context {
  constructor(styles = {}) {
    this.styles = styles;
    this.staged = [];
  }

  addInheritableStyles(styles) {
    this.staged.push(styles);
  }

  forChildren() {
    if (this.staged.length === 0) {
      return new Context(this.styles);
    }
    const styles = Object.assign({}, this.styles, ...this.staged);
    return new Context(styles);
  }

  getInheritedStyles() {
    return this.styles;
  }
}

export default Context;
