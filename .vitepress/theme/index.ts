import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { theme, useTheme } from 'vitepress-theme-openapi'

import 'vitepress-theme-openapi/dist/style.css'
import './style.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    const themeConfig = useTheme()
    themeConfig.setLocale('es')
    themeConfig.setJsonViewerDeep(1)
    themeConfig.setSchemaViewerDeep(1)

    theme.enhanceApp({ app })
  }
} satisfies Theme

