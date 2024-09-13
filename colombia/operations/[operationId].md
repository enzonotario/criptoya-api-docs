---
aside: false
outline: false
title: vitepress-theme-openapi
---

<script setup lang="ts">
import { useRoute, useData } from 'vitepress'
import spec from '../../public/colombia/openapi.json'

const route = useRoute()

const { isDark } = useData()

const operationId = route.data.params.operationId
</script>

<OAOperation :spec="spec" :operationId="operationId" :isDark="isDark"></OAOperation>
