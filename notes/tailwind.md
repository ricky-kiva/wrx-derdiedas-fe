# Note for Tailwind CSS

### Activating disabled pseudo-class in Tailwind

Tailwind disables some pseudo-classes (like `:hover`, `:active`) by default. To enable them, update `tailwind.config.js` under `variants.extend`:

```js
// tailwind.config.js
module.exports = {
  variants: {
    extend: {
      backgroundColor: ['active'],
      fontSize: ['hover'],
    },
  },
};
```

### Create Custom Classes with `@apply`

Use `@apply` to group Tailwind classes into your own custom class.
Wrap it inside `@layer components {}` to avoid being overridden by Tailwind’s defaults:

```
/* styles.css */
@layer components {
  .btn {
    @apply bg-indigo-500 text-white uppercase;
  }
}
```

### Extending Tailwind class

Update `tailwind.config.js` under `theme.extend`

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          light: "#3FBAEB",
          dark: "#0C88B8"
          DEFAULT: "#0FA9E6",
        }
      },
      fontFamily: {
        headline: "Poppins, sans-serif"
      }
    },
  },
};
```

### Optimizing CSS bundles with purging

Tailwind generates thousands of utility classes. Purging removes unused ones to reduce file size. Purge will only work on production environment

```js
// tailwind.config.js
module.exports = {
  purge: ["./src/**/*.jsx", "./index.html"]
};
```

### PurgeCSS cannot be used using dynamic CSS class values

PurgeCSS scans files as plain text — it can't detect dynamic classes like `className={`h-${size} w-${size}`};`. Store full class names in variables instead

```
const size = {
  height: "h-32",
  width: "w-32"
}

<img className={`${size.height} ${size.width}`}>
```

### Extending purge options

PurgeCSS options can be customized. Look at docs for it's properties

```js
module.exports = {
  purge: {
    enabled: true
    content: ["./src/**/*.jsx", "./index.html"]
    options: {}
  }
}
```