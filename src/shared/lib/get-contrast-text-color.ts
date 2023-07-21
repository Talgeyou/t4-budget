import { convertHexToRgb } from './convert-hex-to-rgb';

const COLORS = {
  WHITE: '#000000',
  BLACK: '#ffffff',
};

export function getContrastTextColor(hexColor: string) {
  const rgbColor = convertHexToRgb(hexColor);

  if (!rgbColor) {
    return COLORS.BLACK;
  }

  const brightness = Math.round(
    (rgbColor.r * 299 + rgbColor.g * 587 + rgbColor.b * 114) / 1000,
  );
  const textColor = brightness > 125 ? COLORS.BLACK : COLORS.WHITE;

  return textColor;
}
