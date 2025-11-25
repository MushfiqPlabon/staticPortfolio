export class ThemeService {
  generateRedGradient(startRGB, endRGB, steps) {
    const colors = [];
    for (let i = 0; i < steps; i++) {
      const ratio = i / (steps - 1);
      const r = Math.round(startRGB[0] + (endRGB[0] - startRGB[0]) * ratio);
      const g = Math.round(startRGB[1] + (endRGB[1] - startRGB[1]) * ratio);
      const b = Math.round(startRGB[2] + (endRGB[2] - startRGB[2]) * ratio);
      colors.push(`rgb(${r}, ${g}, ${b})`);
    }
    return colors;
  }
}
