export type Theme = {
  name: string;
  bg: string;
  text: string;
  textMuted: string;
  gridColor: string;
  gridColorRgb: string;
  glowColor: string; // Shadow/glow color (can be darker than gridColor)
  glowIntensity: number; // Multiplier for glow (1 = normal, higher = stronger)
};

export const themes: Record<string, Theme> = {
  dark: {
    name: 'dark',
    bg: 'bg-black',
    text: 'text-white',
    textMuted: 'text-white/70',
    gridColor: '#ffffff',
    gridColorRgb: '255, 255, 255',
    glowColor: '#ffffff',
    glowIntensity: 1,
  },
  light: {
    name: 'light',
    bg: 'bg-white',
    text: 'text-[#3a3a3c]',
    textMuted: 'text-[#3a3a3c]/60',
    gridColor: '#3a3a3c',
    gridColorRgb: '58, 58, 60',
    glowColor: '#1a1a1c',
    glowIntensity: 1,
  },
  midnight: {
    name: 'midnight',
    bg: 'bg-[#0a0a1a]',
    text: 'text-[#a0a0ff]',
    textMuted: 'text-[#a0a0ff]/60',
    gridColor: '#6060ff',
    gridColorRgb: '96, 96, 255',
    glowColor: '#8080ff',
    glowIntensity: 1,
  },
  sunset: {
    name: 'sunset',
    bg: 'bg-[#1a0a0a]',
    text: 'text-[#ff9060]',
    textMuted: 'text-[#ff9060]/60',
    gridColor: '#ff6030',
    gridColorRgb: '255, 96, 48',
    glowColor: '#ff8050',
    glowIntensity: 1,
  },
};

// Current active theme - change this to switch themes
export const currentTheme: Theme = themes.light;
