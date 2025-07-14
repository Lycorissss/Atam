<!-- components/atam/card.vue -->
<script setup lang="ts">
import type { CardPassThroughOptions, CardProps } from 'primevue/card'
import Card from 'primevue/card'
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ptViewMerge } from './utils'

interface Props extends /* @vue-ignore */ CardProps { }
defineProps<Props>()

const theme = ref<CardPassThroughOptions>({
  root: `flex flex-col bg-[#fbfbfb] border-[3.7px] border-black text-black rounded-2xl sahdow-atam dark:text-white dark:bg-lime-300`,
  header: `relative flex items-center justify-center px-5 pt-4 text-[1.5rem]`,
  body: `p-5 flex flex-col gap-2`,
  caption: `flex flex-col gap-2`,
  title: `font-medium text-xl`,
  subtitle: `text-gray-500`,
  content: ``,
  footer: ``,
})

onMounted(() => {
  gsap.from('.card-header-line', {
    scaleX: 0,
    duration: 0.5,
    ease: 'power2.out',
    transformOrigin: 'center',
    stagger: 0.1,
  })
})
</script>

<template>
  <Card unstyled :pt="theme" :pt-options="{ mergeProps: ptViewMerge }">
    <template v-for="(_, slotName) in $slots" #[slotName]="slotProps">
      <template v-if="slotName === 'header'">
        <div class="absolute left-0 top-12 h-[3px] w-13 bg-black rounded-sm card-header-line rounded-bl-none rounded-tl-none" />
        <div class="absolute left-0 top-14 h-[3px] w-6 bg-black rounded-sm rounded-bl-none rounded-tl-none card-header-line" />
        <div class="absolute right-0 top-12 h-[3px] w-18 bg-black rounded-br-none rounded-tr-none rounded-sm card-header-line" />
        <div class="absolute right-0 top-14 h-[3px] w-5 bg-black rounded-br-none rounded-tr-none rounded-sm card-header-line" />
      </template>
      <slot :name="slotName" v-bind="slotProps ?? {}" />
    </template>
  </Card>
</template>
