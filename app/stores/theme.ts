// stores/theme.ts
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  // --- State ---
  const currentTheme = ref<'light' | 'dark'>('light')
  const currentPrimaryColor = ref<string>('blue') // Default primary color
  const highContrastMode = ref<boolean>(false)
  const sidebarOpenMode = ref<boolean>(true)

  // --- Getters (computed properties) ---
  const isDark = computed(() => currentTheme.value === 'dark')
  const isOpen = computed(() => sidebarOpenMode.value)
  const primaryColor = computed(() => currentPrimaryColor.value)
  const isHighContrast = computed(() => highContrastMode.value)

  // --- Actions ---
  const setTheme = (theme: 'light' | 'dark') => {
    currentTheme.value = theme
    
    if (import.meta.client) {
      document.documentElement.classList.remove('theme-light', 'theme-dark', 'p-light', 'p-dark')
      document.documentElement.classList.add(`theme-${theme}`, `p-${theme}`)
      localStorage.setItem('theme', theme)
    }
  }

  const toggleTheme = () => {
    setTheme(currentTheme.value === 'light' ? 'dark' : 'light')
  }

  const setPrimaryColor = (color: string) => {
    currentPrimaryColor.value = color
    
    if (import.meta.client) {
      document.documentElement.className = document.documentElement.className
        .replace(/color-\w+/g, '')
      document.documentElement.classList.add(`color-${color}`)
      localStorage.setItem('primaryColor', color)
    }
  }

  const toggleHighContrast = (value?: boolean) => {
    const newValue = typeof value === 'boolean' ? value : !highContrastMode.value
    highContrastMode.value = newValue
    
    if (import.meta.client) {
      document.documentElement.classList.toggle('high-contrast', newValue)
      localStorage.setItem('highContrastMode', String(newValue))
    }
  }

  // Fixed the sidebar toggle function
  const toggleSidebarOpen = (value?: boolean) => {
    const newValue = typeof value === 'boolean' ? value : !sidebarOpenMode.value
    sidebarOpenMode.value = newValue
    
    if (import.meta.client) {
      // Removed incorrect high-contrast class toggle
      localStorage.setItem('sidebarOpenMode', String(newValue))
    }
  }

  const initializeTheme = () => {
    if (import.meta.client) {
      // Theme initialization
      const savedTheme = localStorage.getItem('theme') as 'light' | 'dark'
      if (savedTheme && ['light', 'dark'].includes(savedTheme)) {
        currentTheme.value = savedTheme
      } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        currentTheme.value = 'dark'
      }
      document.documentElement.classList.add(`theme-${currentTheme.value}`, `p-${currentTheme.value}`)

      // Primary color initialization
      const savedPrimaryColor = localStorage.getItem('primaryColor')
      if (savedPrimaryColor) {
        currentPrimaryColor.value = savedPrimaryColor
      }
      document.documentElement.classList.add(`color-${currentPrimaryColor.value}`)

      // High contrast initialization
      const savedHighContrast = localStorage.getItem('highContrastMode')
      if (savedHighContrast !== null) {
        highContrastMode.value = savedHighContrast === 'true'
      }
      document.documentElement.classList.toggle('high-contrast', highContrastMode.value)

      // Sidebar state initialization - ADDED THIS SECTION
      const savedSidebarState = localStorage.getItem('sidebarOpenMode')
      if (savedSidebarState !== null) {
        sidebarOpenMode.value = savedSidebarState === 'true'
      }
    }
  }

  return {
    currentTheme,
    currentPrimaryColor,
    highContrastMode,
    sidebarOpenMode,

    isDark,
    isOpen,
    primaryColor,
    isHighContrast,

    setTheme,
    toggleTheme,
    setPrimaryColor,
    toggleHighContrast,
    toggleSidebarOpen,
    initializeTheme,
  }
})