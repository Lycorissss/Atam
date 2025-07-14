<script setup lang="ts">
defineProps<{
  label?: string
  error?: string
  hint?: string
  required?: boolean
}>()
</script>

<template>
  <div class="space-y-1">
    <label v-if="label" class="block text-sm font-medium text-gray-700">
      {{ label }}<span v-if="required" class="text-red-500">*</span>
    </label>
    <slot class="border border-red-500" />
    <p v-if="hint && !error" class="text-xs text-gray-500">{{ hint }}</p>
    <p v-if="error" class="text-xs text-red-500">{{ error }}</p>
  </div>
</template>
