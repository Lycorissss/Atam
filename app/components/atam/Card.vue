<!-- components/atam/card.vue -->
<script setup lang="ts">
import type { CardPassThroughOptions, CardProps } from 'primevue/card'
import Card from 'primevue/card'
import { ref } from 'vue'
import { ptViewMerge } from './utils' 

interface Props extends /* @vue-ignore */ CardProps {}
defineProps<Props>()

const theme = ref<CardPassThroughOptions>({
  root: `flex flex-col bg-lime-100 text-black rounded-2xl border border-black/10 
         sahdow-atam dark:text-white dark:bg-lime-300`,
  header: `px-5 pt-2`,
  body: `p-5 flex flex-col gap-2`,
  caption: `flex flex-col gap-2`,
  title: `font-medium text-xl`,
  subtitle: `text-gray-500`,
  content: ``,
  footer: ``,
})
</script>

<template>
  <Card
    unstyled
    :pt="theme"
    :pt-options="{ mergeProps: ptViewMerge }"
  >
    <template v-for="(_, slotName) in $slots" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps ?? {}" />
    </template>
  </Card>
</template>
