declare module 'normalize-css-color' {
  export default function normalize(color: string): number | null;
  export function rgba(color: number): { r: number; g: number; b: number; a: number };
}
