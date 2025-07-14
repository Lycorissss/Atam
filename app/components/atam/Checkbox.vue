<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean
  label?: string
}>()

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <label class="inline-flex items-center space-x-2">
    <input
      type="checkbox"
      class="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
      :checked="modelValue"
      @change="emit('update:modelValue', ($event.target as HTMLInputElement)?.value)"
    />
    <span class="text-sm text-gray-700">{{ label }}</span>
  </label>
</template>
