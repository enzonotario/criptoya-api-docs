<script setup>
import DefaultTheme from 'vitepress/theme'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #layout-top>
      <div class="fixed h-px w-full">
        <div class="absolute top-0 z-[-2] h-screen w-screen
        bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]
        dark:bg-neutral-950 dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      </div>
    </template>
  </Layout>
</template>

<style scoped>
.hero-container {
  position: relative;
  height: 100vh;
  width: 100vw;
  background-color: white;
}

.hero-grid-mask {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  background-image:
    linear-gradient(to right, rgba(117, 170, 219, 0.08) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(117, 170, 219, 0.08) 1px, transparent 1px);
  background-size: 10px 20px;
  -webkit-mask-image: radial-gradient(ellipse 80% 50% at 50% 0%, #000 70%, transparent 110%);
  mask-image: radial-gradient(ellipse 80% 50% at 50% 0%, #000 70%, transparent 110%);
}

.hero-overlay {
  position: absolute;
  inset: 0;
  z-index: -1;
  background: linear-gradient(180deg,
  rgba(117, 170, 219, 0.12) 0%,
  rgba(255, 255, 255, 0.07) 33%,
  rgba(117, 170, 219, 0.12) 66%);
  -webkit-mask-image: radial-gradient(ellipse 80% 50% at 50% 0%, #000 70%, transparent 110%);
  mask-image: radial-gradient(ellipse 80% 50% at 50% 0%, #000 70%, transparent 110%);
  pointer-events: none;
}

.dark .hero-container {
  background-color: var(--vp-c-bg);
}

.dark .hero-grid-mask {
  background-image:
    linear-gradient(to right, rgba(117, 170, 219, 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(117, 170, 219, 0.05) 1px, transparent 1px);
}

.dark .hero-overlay {
  background: linear-gradient(180deg,
  rgba(117, 170, 219, 0.08) 0%,
  rgba(255, 255, 255, 0.04) 33%,
  rgba(117, 170, 219, 0.08) 66%);
}
</style>
