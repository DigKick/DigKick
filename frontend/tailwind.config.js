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
        digkickLight: {
          primary: '#38bdf8',
          'primary-content': '#160009',
          secondary: '#0d9488',
          'secondary-content': '#160009',
          accent: '#44403c',
          'accent-content': '#e7e5e4',
          neutral: '#081307',
          'neutral-content': '#c6cac6',
          'base-100': '#f7f6f5',
          'base-200': '#cbdede',
          'base-300': '#aebebe',
          'base-content': '#131616',
          info: '#00acee',
          'info-content': '#000b14',
          success: '#2cd97a',
          'success-content': '#011105',
          warning: '#ffcd00',
          'warning-content': '#160f00',
          error: '#e32536',
          'error-content': '#120001',
        },
      },
      {
        digkickDark: {
          primary: '#38bdf8',
          'primary-content': '#160009',
          secondary: '#0d9488',
          'secondary-content': '#160009',
          accent: '#f5f5f4',
          'accent-content': '#1c1917',
          neutral: '#9ca3af',
          'neutral-content': '#f3f4f6',
          'base-100': '#100C0C',
          'base-200': '#1f2937',
          'base-300': '#111111',
          'base-content': '#e7e5e4',
          info: '#00acee',
          'info-content': '#000b14',
          success: '#2cd97a',
          'success-content': '#011105',
          warning: '#ffcd00',
          'warning-content': '#160f00',
          error: '#e32536',
          'error-content': '#120001',
        },
      },
    ],
  },
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
};
