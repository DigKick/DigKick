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
    themes: ["night", "retro"],
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};