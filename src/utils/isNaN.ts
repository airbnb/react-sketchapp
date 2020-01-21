export default function isNaN(num: number): boolean {
  // If the value is obj-c NaN, the only way to check for it is by comparing
  // width to itself (because NaN !== NaN)
  // eslint-disable-next-line no-self-compare
  return Number.isNaN(num) || num !== num;
}
