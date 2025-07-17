<script setup lang="ts">
import type { ToggleSwitchPassThroughOptions, ToggleSwitchProps } from 'primevue/toggleswitch'
import ToggleSwitch from 'primevue/toggleswitch'
import { ref } from 'vue'
import { ptViewMerge } from './utils'

interface Props extends /* @vue-ignore */ ToggleSwitchProps {}
defineProps<Props>()

const theme = ref<ToggleSwitchPassThroughOptions>({
  root: `
    inline-block w-10 h-6
    border-4 border-black
    bg-neutral-200
    shadow-[5px_5px_0_#000]
  `,
  input: `
    peer absolute inset-0 w-full h-full
    opacity-0 z-10 cursor-pointer
  `,
  slider: `
    block w-full h-full
    bg-neutral-100
    border-4 border-black
    rounded-none
    shadow-[3px_3px_0_#000]
    transition-colors duration-200
    peer-checked:bg-neutral-100
  `,
  handle: `
    absolute top-1/2 start-1
    w-4 h-4
    bg-black
    border-4 border-black
    rounded-none
    shadow-[2px_2px_0_#000]
    transform -translate-y-1/2
    transition-all duration-200
    peer-checked:start-[calc(100%-1rem)]
  `,
})
</script>

<template>
  <ToggleSwitch
    unstyled
    :pt="theme"
    :pt-options="{
      mergeProps: ptViewMerge,
    }"
  >
    <template v-for="(_, slotName) in $slots" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps ?? {}" />
    </template>
  </ToggleSwitch>
</template>
