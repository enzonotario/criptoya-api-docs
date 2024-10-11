import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { theme, useTheme } from 'vitepress-openapi'

import 'vitepress-openapi/dist/style.css'
import './style.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    const themeConfig = useTheme()
    themeConfig.setI18nConfig({
      locale: 'es',
    })
    themeConfig.setJsonViewerDeep(1)
    themeConfig.setSchemaViewerDeep(1)

    theme.enhanceApp({ app })
  }
} satisfies Theme

