import { URL, fileURLToPath } from 'node:url'
import { defineConfig } from 'vitepress'
import { useSidebar, useOpenapi } from 'vitepress-theme-openapi'
import spec from '../public/openapi.json' assert { type: 'json' }

const openapi = useOpenapi()
openapi.setSpec(spec)
const sidebar = useSidebar()

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "CriptoYa API Docs",
  description: "Documentación de la API de CriptoYa.com",
  themeConfig: {
    logo: '/logo.svg',
    sidebar: [
      ...sidebar.generateSidebarGroups(),
    ],
    nav: [
      {
        text: 'CriptoYa.com',
        link: 'https://criptoya.com',
      }
    ],
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/enzonotario/criptoya-api-docs',
      }
    ]
  },
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./', import.meta.url)),
      },
    },
  },
})
