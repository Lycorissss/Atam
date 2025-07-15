<script setup>
import { computed } from 'vue'

const currentYear = computed(() => {
  return new Date().getFullYear()
})
</script>

<template>
  <footer class="border-t dark:bg-surface-900 border-gray-200 dark:border-gray-700 px-4 py-3">
    <div class="flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500 dark:text-gray-400">
      <div class="flex items-center space-x-4">
        <span>&copy; {{ currentYear }} ATAMS Dashboard. All rights reserved.</span>
      </div>

      <div class="flex items-center space-x-4 mt-2 sm:mt-0">
        <a
          href="#"
          class="hover:text-primary-500 transition-colors duration-200"
        >
          Privacy Policy
        </a>
        <span class="text-gray-300 dark:text-gray-600">|</span>
        <a
          href="#"
          class="hover:text-primary-500 transition-colors duration-200"
        >
          Terms of Service
        </a>
        <span class="text-gray-300 dark:text-gray-600">|</span>
        <a
          href="#"
          class="hover:text-primary-500 transition-colors duration-200"
        >
          Support
        </a>
      </div>
    </div>
  </footer>
</template>
