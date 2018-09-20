// @flow
/**
 * based on
 * https://github.com/react-native-community/react-native-svg/blob/28235ea137a75097c011f11fee92bec8a97b4afa/lib/Matrix2D.js
 */

/**
 * Represents an affine transformation matrix, and provides tools
 * for constructing and concatenating matrices.
 *
 * This matrix can be visualized as:
 *
 * [ a  c  tx
 *   b  d  ty
 *   0  0  1  ]
 *
 * Note the locations of b and c.
 * */
export default class Matrix2D {
  a: number;

  b: number;

  c: number;

  d: number;

  tx: number;

  ty: number;

  constructor(a?: number, b?: number, c?: number, d?: number, tx?: number, ty?: number) {
    this.setTransform(a, b, c, d, tx, ty);
  }

  /**
   * Set current matrix to new absolute matrix.
   */
  setTransform = (a?: number, b?: number, c?: number, d?: number, tx?: number, ty?: number) => {
    this.a = a === null || a === undefined ? 1 : a;
    this.b = b || 0;
    this.c = c || 0;
    this.d = d === null || d === undefined ? 1 : d;
    this.tx = tx || 0;
    this.ty = ty || 0;
    return this;
  };

  /**
   * Reset current matrix to an identity matrix.
   * */
  reset = () => {
    this.a = 1;
    this.d = 1;
    this.b = 0;
    this.c = 0;
    this.tx = 0;
    this.ty = 0;
    return this;
  };

  /**
   * Returns an array with current matrix values.
   * */
  toArray = () => [this.a, this.b, this.c, this.d, this.tx, this.ty];

  /**
   * Copies all properties from the specified matrix to this matrix.
   */
  copy = (matrix: Matrix2D) =>
    this.setTransform(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);

  /**
   * Clones current instance and returning a new matrix.
   * */
  clone = () => new Matrix2D(this.a, this.b, this.c, this.d, this.tx, this.ty);

  /**
   * Prepends the specified matrix properties to this matrix.
   * This is the equivalent of multiplying `(specified matrix) * (this matrix)`.
   * All parameters are required.
   * */
  prepend = (a: number, b: number, c: number, d: number, tx: number, ty: number) => {
    const a1 = this.a;
    const c1 = this.c;
    const tx1 = this.tx;

    this.a = a * a1 + c * this.b;
    this.b = b * a1 + d * this.b;
    this.c = a * c1 + c * this.d;
    this.d = b * c1 + d * this.d;
    this.tx = a * tx1 + c * this.ty + tx;
    this.ty = b * tx1 + d * this.ty + ty;
    return this;
  };

  /**
   * Appends the specified matrix properties to this matrix. All parameters are required.
   * This is the equivalent of multiplying `(this matrix) * (specified matrix)`.
   * */
  append = (a: number, b: number, c: number, d: number, tx: number, ty: number) => {
    const a1 = this.a;
    const b1 = this.b;
    const c1 = this.c;
    const d1 = this.d;
    if (a !== 1 || b !== 0 || c !== 0 || d !== 1) {
      this.a = a1 * a + c1 * b;
      this.b = b1 * a + d1 * b;
      this.c = a1 * c + c1 * d;
      this.d = b1 * c + d1 * d;
    }
    this.tx = a1 * tx + c1 * ty + this.tx;
    this.ty = b1 * tx + d1 * ty + this.ty;
    return this;
  };
}
