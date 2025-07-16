<script setup lang="ts">
import type { BreadcrumbPassThroughOptions, BreadcrumbProps } from 'primevue/breadcrumb'
import Breadcrumb from 'primevue/breadcrumb'
import { ref } from 'vue'
import { ptViewMerge } from './utils'

interface Props extends /* @vue-ignore */ BreadcrumbProps { }
defineProps<Props>()

const theme = ref<BreadcrumbPassThroughOptions>({
  root: `bg-lilac-100 dark:bg-lilac-900 px-5 py-2 border-4 border-black rounded-md shadow-[4px_4px_0px_#000]`,
  list: `m-0 p-0 list-none flex items-center flex-nowrap gap-3`,

  item: `text-black text-sm font-bold`,
  itemLink: `no-underline flex items-center gap-2 px-3 py-1 border-2 border-black rounded hover:bg-lilac-300 hover:shadow-[2px_2px_0px_#000]
    transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black`,

  itemIcon: `text-black`,
  itemLabel: `text-black`,
  separator: `text-black text-lg font-extrabold`,
  separatorIcon: `text-black`,
})
</script>

<template>
  <Breadcrumb
    unstyled :pt="theme" :pt-options="{
      mergeProps: ptViewMerge,
    }"
  >
    <template v-for="(_, slotName) in $slots" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps ?? {}" />
    </template>
  </Breadcrumb>
</template>
