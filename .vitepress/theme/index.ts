import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { theme, useOpenapi } from 'vitepress-theme-openapi'
import spec from '../../public/openapi.json' assert {type: 'json'}

import 'vitepress-theme-openapi/dist/style.css'
import './style.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    theme.enhanceApp({ app })

    const openapi = useOpenapi()
    openapi.setSpec(spec)
  }
} satisfies Theme

