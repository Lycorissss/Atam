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
    <input
      type="date"
      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
      :value="modelValue"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement)?.value)"
    />
  </FieldWrapper>
</template>