---
home: true
layout: home
aside: false
outline: false
---

<script setup>
import regions from './public/regions.json'
</script>

<div class="flex flex-wrap justify-center gap-4 py-8">
  <a v-for="region in regions" :key="region.id" :href="`/${region.slug}`" class="w-full max-w-xs p-4 bg-gray-100/70 dark:bg-gray-800/30 !text-gray-800 dark:!text-white hover:bg-gray-200/90 dark:hover:bg-gray-700/50 rounded-lg text-center !no-underline">
    <div v-if="region.svg" v-html="region.svg" class="w-16 h-16 mx-auto mb-4"></div>
    <span>{{ region.name }}</span>
  </a>
</div>

<div class="mt-20 flex justify-center flex-col items-center gap-4">

Documentación hecha con ❤️ por [Enzo Notario](https://github.com/enzonotario)

::: info Contacto

Por consultas relacionadas con la API, por favor contactar a [contacto@criptoya.com](mailto:contacto@criptoya.com).

:::

Copyright © 2020-presente [CriptoYa](https://criptoya.com)

</div>
