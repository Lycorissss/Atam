// stores/theme.ts

import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  // --- State ---
  const currentTheme = ref<'light' | 'dark'>('light')
  const currentPrimaryColor = ref<string>('blue') // Default primary color
  const highContrastMode = ref<boolean>(false)

  // --- Getters (computed properties) ---
  const isDark = computed(() => currentTheme.value === 'dark')
  const primaryColor = computed(() => currentPrimaryColor.value)
  const isHighContrast = computed(() => highContrastMode.value)

  // --- Actions ---

  // Action to set the theme (light/dark) - NOW HANDLES DOCUMENT CLASSES
  const setTheme = (theme: 'light' | 'dark') => {
    if (process.client && ['light', 'dark'].includes(theme)) { // Ensure runs client-side
      currentTheme.value = theme

      // *** IMPORTANT: Manipulate document.documentElement classes here ***
      document.documentElement.classList.remove('theme-light', 'theme-dark', 'p-light', 'p-dark') // Clean up old classes
      document.documentElement.classList.add(`theme-${theme}`, `p-${theme}`) // Add new theme and PrimeVue classes

      localStorage.setItem('theme', theme)
    }
    else if (process.server) {
      // For SSR, set the currentTheme value, but don't touch DOM
      currentTheme.value = theme
    }
    else {
      console.warn(`Attempted to set invalid theme: ${theme} or not client-side.`)
    }
  }

  // Action to toggle the theme
  const toggleTheme = () => {
    setTheme(currentTheme.value === 'light' ? 'dark' : 'light')
  }

  // Action to set the primary color - NOW HANDLES DOCUMENT CLASSES
  const setPrimaryColor = (color: string) => {
    if (process.client) { // Ensure runs client-side
      currentPrimaryColor.value = color
      // Clean up existing color class
      document.documentElement.className = document.documentElement.className
        .replace(/color-\w+/g, '')
      // Add new color class
      document.documentElement.classList.add(`color-${color}`)
      localStorage.setItem('primaryColor', color) // Persist
    }
    else if (process.server) {
      currentPrimaryColor.value = color // For SSR, just update state
    }
  }

  // Action to toggle high contrast mode - NOW HANDLES DOCUMENT CLASSES
  const toggleHighContrast = (value?: boolean) => {
    if (process.client) { // Ensure runs client-side
      if (typeof value === 'boolean') {
        highContrastMode.value = value
      }
      else {
        highContrastMode.value = !highContrastMode.value
      }
      document.documentElement.classList.toggle('high-contrast', highContrastMode.value)
      localStorage.setItem('highContrastMode', String(highContrastMode.value)) // Persist boolean
    }
    else if (process.server) {
      if (typeof value === 'boolean') {
        highContrastMode.value = value
      }
      else {
        highContrastMode.value = !highContrastMode.value
      }
    }
  }

  // The initializeTheme action to load settings from localStorage and apply classes
  const initializeTheme = () => {
    if (process.client) { // Ensure this runs only on the client-side
      // Initialize theme (light/dark)
      const savedTheme = localStorage.getItem('theme') as 'light' | 'dark'
      if (savedTheme && ['light', 'dark'].includes(savedTheme)) {
        currentTheme.value = savedTheme
      }
      else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        currentTheme.value = 'dark'
      }
      else {
        currentTheme.value = 'light'
      }
      // Apply theme class immediately after determining it
      document.documentElement.classList.remove('theme-light', 'theme-dark', 'p-light', 'p-dark')
      document.documentElement.classList.add(`theme-${currentTheme.value}`, `p-${currentTheme.value}`)

      // Initialize primary color
      const savedPrimaryColor = localStorage.getItem('primaryColor')
      if (savedPrimaryColor) {
        currentPrimaryColor.value = savedPrimaryColor
      }
      else {
        currentPrimaryColor.value = 'blue' // Default if not saved
      }
      // Apply primary color class immediately after determining it
      document.documentElement.className = document.documentElement.className
        .replace(/color-\w+/g, '') // Clean up any previous
      document.documentElement.classList.add(`color-${currentPrimaryColor.value}`)

      // Initialize high contrast mode
      const savedHighContrast = localStorage.getItem('highContrastMode')
      highContrastMode.value = savedHighContrast === 'true' // Convert string "true"/"false" to boolean
      // Apply high contrast class immediately after determining it
      document.documentElement.classList.toggle('high-contrast', highContrastMode.value)
    }
  }

  // Return all state, getters, and actions that you want to expose
  return {
    currentTheme,
    currentPrimaryColor,
    highContrastMode,

    isDark,
    primaryColor,
    isHighContrast,

    setTheme,
    toggleTheme,
    setPrimaryColor,
    toggleHighContrast,
    initializeTheme,
  }
})
