export function mergeStyles(...styles: (string | undefined | false | null)[]) {
  return styles.filter((style) => Boolean(style)).join(" ");
}
