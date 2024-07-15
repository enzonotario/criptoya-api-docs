---
aside: false
outline: false
title: vitepress-theme-openapi
---

<script setup lang="ts">
import { useRoute, useData } from 'vitepress'
import { useOpenapi } from 'vitepress-theme-openapi'
import { useCodeSamples } from '@/theme/composables/useCodeSamples'

const route = useRoute()

const { isDark } = useData()

const operationId = route.data.params.operationId

const codeSamples = useCodeSamples().getCodeSamples(operationId)

</script>

<OAOperation :operationId="operationId" :isDark="isDark">

<template #try-it="tryIt">

<TryWithVariables :operation-id="tryIt.operationId" :method="tryIt.method" :path="tryIt.path" :baseUrl="tryIt.baseUrl" :isDark="isDark"/>

## {{ $t('Samples') }}

::: code-group

```bash-vue [cURL]
{{ codeSamples.curl.source }}
```

```js-vue [JavaScript]
{{ codeSamples.javascriptFetch.source }}
```

```php-vue [PHP]
{{ codeSamples.php.source }}
```

```python-vue [Python]
{{ codeSamples.python.source }}
```

:::

</template>

</OAOperation>
