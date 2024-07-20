---
aside: false
outline: false
title: vitepress-theme-openapi
---

<script setup lang="ts">
import { useRoute, useData } from 'vitepress'
import { useOpenapi } from 'vitepress-theme-openapi'
import spec from '../../public/mexico/openapi.json'

const route = useRoute()

const { isDark } = useData()

const openapi = useOpenapi()
openapi.setSpec(spec)

const operationId = route.data.params.operationId
</script>

<OAOperation :operationId="operationId" :isDark="isDark"></OAOperation>
