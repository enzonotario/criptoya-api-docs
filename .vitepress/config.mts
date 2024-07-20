import { URL, fileURLToPath } from 'node:url'
import { defineConfig } from 'vitepress'
import { useSidebar, useOpenapi } from 'vitepress-theme-openapi'
import { collect } from 'collect.js'
import regions from './regions.json' assert { type: 'json' }
import spec from '../public/argentina/openapi.json' assert { type: 'json' }

const openapi = useOpenapi()
openapi.setSpec(spec)

const sidebar = useSidebar()

function addRegionPrefixToSidebarItems(prefix, items) {
  return {
    items: items.items.map((item) => {
      if (item.link)
        item.link = `${prefix}${item.link}`

      if (item.items)
        item.items = addRegionPrefixToSidebarItems(item.items)

      return item
    }),
  }
}

const operationsOnlyArgentina = [
  "get-dolar",
  "get-cer",
  "get-uva",
  "get-bancostodos",
]

const sidebarItems = collect(regions)
    .mapWithKeys(region => [
      `/${region.slug}/`,
      sidebar
        .generateSidebarGroups()
        .map(group => {
          return {
            ...group,
            ...addRegionPrefixToSidebarItems(`/${region.slug}`, group),
          }
        })
        .map(group => {
          return {
            ...group,
            items: group.items.filter(item => {
              if (region.slug === 'argentina') {
                return true
              }

              return !operationsOnlyArgentina.some(path => item.link.includes(path))
            }),
          }
        })
    ])
    .all()

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "CriptoYa API Docs",
  description: "Documentación de la API de CriptoYa.com",
  themeConfig: {
    logo: '/logo.svg',
    sidebar: sidebarItems as any,
    nav: [
      {
        text: 'CriptoYa.com',
        link: 'https://criptoya.com',
      },
      {
        text: 'Región',
        items: regions.map(region => ({
          text: region.name,
          link: `/${region.slug}/`,
        })),
      },
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
