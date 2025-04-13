import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { theme, useTheme } from 'vitepress-openapi/client'

import 'vitepress-openapi/dist/style.css'
import 'virtual:group-icons.css'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    useTheme({
      i18n: {
        locale: 'es',
      },
      jsonViewer: {
        deep: 1,
      },
      schemaViewer: {
        deep: 1,
      },
    })

    theme.enhanceApp({ app })
  }
} satisfies Theme

