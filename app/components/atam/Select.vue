<script setup lang="ts">
import type { SelectPassThroughOptions, SelectProps } from 'primevue/select'
import ChevronDownIcon from '@primevue/icons/chevrondown'
import SearchIcon from '@primevue/icons/search'
import SpinnerIcon from '@primevue/icons/spinner'
import TimesIcon from '@primevue/icons/times'
import Select from 'primevue/select'
import { ref } from 'vue'
import { ptViewMerge } from './utils'

interface Props extends /* @vue-ignore */ SelectProps {}
defineProps<Props>()

const theme = ref<SelectPassThroughOptions>({
  root: `inline-flex cursor-pointer relative select-none rounded-md p-fluid:flex
        bg-white dark:bg-black
        border-[3px] border-black
        shadow-[5px_5px_0_#000]
        px-[11px] py-[10px]
        transition-all duration-150
        text-black dark:text-white`,

  label: `block whitespace-nowrap overflow-hidden flex-auto w-[1%]
        px-2 py-1 text-sm font-semibold bg-transparent border-none outline-none
        text-black dark:text-white`,

  dropdown: `flex items-center justify-center shrink-0 bg-transparent
        text-black dark:text-white w-10`,

  overlay: `absolute top-0 left-0 z-50 mt-2 rounded-md
        bg-white dark:bg-black
        border-[3px] border-black
        text-black dark:text-white
        shadow-[5px_5px_0_#000]`,

  header: `pt-2 pb-1 px-4 font-bold`,

  pcFilterContainer: {
    root: `relative`,
  },

  pcFilter: {
    root: `w-full appearance-none rounded-md outline-none
            bg-white dark:bg-black
            text-black dark:text-white
            placeholder:text-gray-500 dark:placeholder:text-gray-400
            border-[3px] border-black
            px-[12px] py-[10px]
            transition-all duration-150 shadow-[3px_3px_0_#000]`,
  },

  pcFilterIconContainer: {
    root: `absolute top-1/2 -mt-2 end-3 z-1`,
  },

  listContainer: `overflow-auto`,

  list: `m-0 p-1 list-none flex flex-col gap-[2px]`,

  optionGroup: `m-0 px-3 py-2 font-bold text-black dark:text-white`,

  option: `cursor-pointer font-bold whitespace-nowrap flex items-center
        px-3 py-2 rounded-sm
        text-black dark:text-white
        hover:bg-lilac-200 dark:hover:bg-lilac-800
        transition-all duration-150`,

  optionLabel: ``,

  optionCheckIcon: `me-2 text-black dark:text-white`,

  optionGroupLabel: ``,

  optionBlankIcon: ``,

  emptyMessage: `px-3 py-2 text-black dark:text-white`,

  virtualScroller: ``,

  transition: {
    enterFromClass: 'opacity-0 scale-y-90',
    enterActiveClass: 'transition duration-150 ease-out',
    leaveActiveClass: 'transition duration-100 ease-in',
    leaveToClass: 'opacity-0',
  },
})
</script>

<template>
  <Select
    unstyled
    :pt="theme"
    :pt-options="{
      mergeProps: ptViewMerge,
    }"
  >
    <template #dropdownicon>
      <ChevronDownIcon />
    </template>
    <template #loadingicon>
      <SpinnerIcon class="animate-spin" />
    </template>
    <template #filtericon>
      <SearchIcon class="text-surface-400" />
    </template>
    <template #clearicon="{ clearCallback }">
      <TimesIcon class="text-surface-400 absolute top-1/2 -mt-2 end-10" @click="clearCallback" />
    </template>
    <template v-for="(_, slotName) in $slots" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps ?? {}" />
    </template>
  </Select>
</template>
