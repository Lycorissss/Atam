<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits(['close'])

const themeStore = useThemeStore()

const primaryColors = [
  { name: 'blue', label: 'Blue' },
  { name: 'emerald', label: 'Emerald' },
  { name: 'purple', label: 'Purple' },
  { name: 'indigo', label: 'Indigo' },
  { name: 'pink', label: 'Pink' },
  { name: 'teal', label: 'Teal' },
  { name: 'orange', label: 'Orange' },
  { name: 'red', label: 'Red' },
  { name: 'yellow', label: 'Yellow' },
]

function getColorClasses(colorName: string): string {
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-500 hover:bg-blue-600',
    emerald: 'bg-emerald-500 hover:bg-emerald-600',
    purple: 'bg-purple-500 hover:bg-purple-600',
    indigo: 'bg-indigo-500 hover:bg-indigo-600',
    pink: 'bg-pink-500 hover:bg-pink-600',
    teal: 'bg-teal-500 hover:bg-teal-600',
    orange: 'bg-orange-500 hover:bg-orange-600',
    red: 'bg-red-500 hover:bg-red-600',
    yellow: 'bg-yellow-500 hover:bg-yellow-600',
  }

  return colorMap[colorName] || 'bg-gray-500 hover:bg-gray-600'
}

function resetTheme(): void {
  themeStore.setTheme('light')
  themeStore.setPrimaryColor('blue')
  themeStore.toggleHighContrast(false)
}
</script>

<template>
  <div
    class="fixed inset-y-0 right-0 z-40 w-64 bg-white dark:bg-surface-900 shadow-lg transform transition-transform duration-300 ease-in-out" :class="[
      isOpen ? 'translate-x-0' : 'translate-x-full',
    ]"
  >
    <div class="p-6">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-xl font-semibold text-gray-800 dark:text-white">
          Theme Configurator
        </h3>
        <button
          class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200"
          @click="$emit('close')"
        >
          <i class="i-mdi-times text-lg" />
        </button>
      </div>

      <div class="mb-6">
        <h4 class="text-lg font-medium text-gray-700 dark:text-gray-200 mb-3">
          Theme Mode
        </h4>
        <div class="flex space-x-4">
          <button
            class="px-4 py-2 rounded-md font-medium transition-colors duration-200" :class="[
              !themeStore.isDark
                ? 'bg-primary-500 text-white hover:bg-primary-600 ring-2 ring-offset-2 ring-blue-500 scale-105'
                : 'bg-primary-200 text-gray-700 hover:bg-primary-300 dark:bg-primary-700 dark:text-gray-300 dark:hover:bg-primary-600',
            ]"
            @click="themeStore.setTheme('light')"
          >
            Light
          </button>
          <button
            class="px-4 py-2 rounded-md font-medium transition-colors duration-200" :class="[
              themeStore.isDark
                ? 'bg-primary-500 text-white hover:bg-primary-600 ring-2 ring-offset-2 ring-blue-500 scale-105'
                : 'bg-primary-200 text-gray-700 hover:bg-primary-300 dark:bg-primary-700 dark:text-gray-300 dark:hover:bg-primary-600',
            ]"
            @click="themeStore.setTheme('dark')"
          >
            Dark
          </button>
        </div>
      </div>

      <div class="mb-6">
        <h4 class="text-lg font-medium text-gray-700 dark:text-gray-200 mb-3">
          Primary Color
        </h4>
        <div class="grid grid-cols-3 gap-3">
          <button
            v-for="color in primaryColors"
            :key="color.name"
            class="w-full h-10 rounded-md flex items-center justify-center text-white text-sm font-semibold transition-all duration-200 transform hover:scale-105" :class="[
              getColorClasses(color.name),
              { 'ring-2 ring-offset-2 ring-blue-500 scale-105': themeStore.primaryColor === color.name },
            ]"
            :title="color.label"
            @click="themeStore.setPrimaryColor(color.name)"
          >
            <i
              v-if="themeStore.primaryColor === color.name"
              class="i-mdi-check text-xl"
            >✓</i>
          </button>
        </div>
      </div>

      <div class="mb-6">
        <h4 class="text-lg font-medium text-gray-700 dark:text-gray-200 mb-3">
          High Contrast
        </h4>
        <div class="flex items-center space-x-2">
          <Checkbox
            v-model="themeStore.isHighContrast"
            class="bg-primary-500 text-white hover:bg-primary-600 dark:bg-primary-700 dark:text-gray-300 dark:hover:bg-primary-600"
            @change="themeStore.toggleHighContrast()"
          />
          <label for="highContrastToggle" class="text-gray-700 dark:text-gray-200 cursor-pointer">
            Enable High Contrast
          </label>
        </div>
      </div>

      <div>
        <button
          class="w-full px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 font-medium"
          @click="resetTheme"
        >
          Reset to Defaults
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom checkbox styling */
input[type='checkbox'] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  display: inline-block;
  vertical-align: middle;
  height: 1.25rem;
  width: 1.25rem;
  border-radius: 0.25rem;
  cursor: pointer;
  border: 2px solid #d1d5db;
  background-color: white;
  transition: all 0.2s;
}

input[type='checkbox']:checked {
  background-color: #3b82f6;
  border-color: #3b82f6;
}

input[type='checkbox']:checked::before {
  content: '✓';
  display: block;
  text-align: center;
  color: white;
  line-height: 1.25rem;
  font-size: 0.875rem;
  font-weight: bold;
}

.dark input[type='checkbox'] {
  border-color: #4b5563;
  background-color: #374151;
}

.dark input[type='checkbox']:checked {
  background-color: #3b82f6;
  border-color: #3b82f6;
}
</style>
