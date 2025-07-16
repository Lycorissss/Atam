<script setup lang="ts">
import type { InputTextPassThroughOptions } from 'primevue/inputtext'
import { ref } from 'vue'

const props = defineProps<{
  modelValue: string
  type?: string
  placeholder?: string
  name?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean

  // tambahan kompatibilitas VeeField
  onInput?: (e: Event) => void
  onChange?: (e: Event) => void
  onBlur?: (e: FocusEvent) => void
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const theme = ref<InputTextPassThroughOptions>({
  root: `
    appearance-none rounded-sm outline-hidden
    bg-white dark:bg-black
    text-black dark:text-white
    placeholder:text-gray-500 dark:placeholder:text-gray-400
    border-3 border-black dark:border-white
    px-3 py-2
    font-semibold
    shadow-[5px_5px_0_0_#000] dark:shadow-[5px_5px_0_0_#fff]
    focus:outline-none focus:ring-2 focus:ring-primary-500
    transition-colors duration-200 w-full
  `,
})
</script>

<template>
  <input
    :type="props.type || 'text'"
    :name="props.name"
    :placeholder="props.placeholder"
    :disabled="props.disabled"
    :readonly="props.readonly"
    :required="props.required"
    :value="props.modelValue"
    :class="theme.root"
    @input="(e) => {
      const val = (e.target as HTMLInputElement).value
      emit('update:modelValue', val)
      props.onInput?.(e)
    }"
    @change="props.onChange"
    @blur="props.onBlur"
  >
</template>
