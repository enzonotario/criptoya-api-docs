/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './.vitepress/theme/**/*.{js,vue,ts,json,md}',
    './.vitepress/config.js',
    './**/*.md',
    '!./node_modules/**',
    '!./.vitepress/cache/**',
    '!./.vitepress/dist/**',
  ],
  darkMode: 'class',
  plugins: [],
}
