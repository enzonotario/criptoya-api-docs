import { URL, fileURLToPath } from 'node:url'
import { defineConfig } from 'vitepress'
import { useSidebar } from 'vitepress-openapi'
import { collect } from 'collect.js'
import regions from './regions.json' assert { type: 'json' }
import spec from '../public/argentina/openapi.json' assert { type: 'json' }

const sidebar = useSidebar({ spec })

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

  head: [
    // Google Fonts
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    [
      'link',
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    ],
    [
      'link',
      {
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap',
        rel: 'stylesheet',
      },
    ],

    // Google Analytics
    [
      'script',
      { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=GTM-WN9BTWR' }
    ],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'GTM-WN9BTWR');`
    ],
  ],

  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./', import.meta.url)),
      },
    },
  },
})
