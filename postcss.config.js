import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

// vitepress-openapi >= 0.2 ships precompiled Tailwind v4 CSS (with `@layer`
// directives). Running Tailwind v3 on it breaks the build, so skip it for that
// package instead of processing it.
const openApiStyles = /vitepress-openapi/
const tailwind = tailwindcss()

function conditionalTailwind() {
  return {
    postcssPlugin: 'conditional-tailwind',
    Once(root, { result }) {
      if (openApiStyles.test(result.opts.from ?? ''))
        return

      return Promise.all(tailwind.plugins.map(plugin => plugin(root, result)))
    },
  }
}

export default {
  plugins: [
    conditionalTailwind(),
    autoprefixer(),
  ],
}
