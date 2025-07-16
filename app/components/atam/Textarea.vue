<script setup lang="ts">
import FieldWrapper from './FieldWrapper.vue'

const props = defineProps<{
  modelValue: string
  label?: string
  placeholder?: string
  error?: string
  required?: boolean
  hint?: string
}>()

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <FieldWrapper :label="label" :error="error" :hint="hint" :required="required">
    <textarea
      class="w-full px-3 py-2 border-2 border-black dark:border-white dark:bg-black dark:shadow-[5px_5px_0_0_#fff] dark:text-white bg-white text-black font-semibold rounded-sm shadow-[5px_5px_0_0_#000] focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder-gray-500"
      :placeholder="placeholder"
      :value="modelValue"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement)?.value)"
    />
  </FieldWrapper>
</template>
