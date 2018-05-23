// @flow
type Styles = Object;

class Context {
  styles: Styles;
  staged: Array<Styles>;

  constructor(styles: Styles = {}) {
    this.styles = styles;
    this.staged = [];
  }

  addInheritableStyles(styles: Styles) {
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
