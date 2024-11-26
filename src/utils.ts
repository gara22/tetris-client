export function ansiToHex(ansiCode: string): string | null {
  const colorCode = parseInt(ansiCode.match(/\d+/)?.[0] || '', 10) - 30;

  if (colorCode < 0 || colorCode > 7) return null;

  const rgb: [number, number, number] = [
    (colorCode & 1) * 255,
    ((colorCode >> 1) & 1) * 255,
    ((colorCode >> 2) & 1) * 255
  ];

  const hex = rgb.map(val => val.toString(16).padStart(2, '0')).join('');
  return `#${hex}`;
}