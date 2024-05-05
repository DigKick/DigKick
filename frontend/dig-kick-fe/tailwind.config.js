const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { default: daisyui } = require('daisyui');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  daisyui: {
    themes: [
      {
        dark: {
        "primary": "#9700ff",
        "primary-content": "#e8d9ff",
        "secondary": "#006e00",
        "secondary-content": "#d0e2ce",
        "accent": "#00bbff",
        "accent-content": "#000d16",
        "neutral": "#14323c",
        "neutral-content": "#ccd2d5",
        "base-100": "#20242e", 
        "base-200": "#1a1e27", 
        "base-300": "#15181f",
        "base-content": "#cdced1",
        "info": "#00daff",
        "info-content": "#001116", 
        "success": "#00deac",
        "success-content": "#00120b",
        "warning": "#c53e00",
        "warning-content": "#f8dad1",
        "error": "#cc0021",
        "error-content": "#fcd6d2",
        },
        light: {
          "primary": "#009dda",
          "primary-content": "#000911",
          "secondary": "#00974c",
          "secondary-content": "#000802",
          "accent": "#ff0000",
          "accent-content": "#160000",
          "neutral": "#212126",
          "neutral-content": "#cdcdcf",
          "base-100": "#fffff8", 
          "base-200": "#deded8",
          "base-300": "#bebeb8", 
          "base-content": "#161615",
          "info": "#00d1f0",
          "info-content": "#001014",
          "success": "#00cf75",
          "success-content": "#001005",
          "warning": "#ff8200",
          "warning-content": "#160600", 
          "error": "#ff003b",
          "error-content": "#160001",
        },
      },
    ]
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
