# React Tailwind Example

## Install react app

```sh
pnpm create vite@latest my-project -- --template react
cd my-project
```

## Install tailwind CSS

```sh
pnpm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## Add tailwind config

```js
// tailwind.config.cjs

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## Update CSS file

```sh
// index.css

@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Run app

```sh
pnpm dev
```

