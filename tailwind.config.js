/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}", // Bao gồm tất cả các file trong thư mục src
    "./<custom-folder>/**/*.{js,jsx,ts,tsx}", // Thay <custom-folder> bằng tên thư mục của bạn
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
