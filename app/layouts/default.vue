<script setup lang="ts">
// Added lang="ts"
import { onMounted, onUnmounted, ref } from 'vue'
import { useThemeStore } from '@/stores/theme'

// Meta
useHead({
  title: 'Dashboard - Volt Theme',
  meta: [
    { name: 'description', content: 'Modern dashboard with Nuxt 3 and PrimeVue Volt' },
  ],
})

// Stores
const themeStore = useThemeStore()

// State
const sidebarOpen = ref(false)
const configuratorOpen = ref(false)
const isMobile = ref(false)

// Methods
function toggleSidebar() {
  console.log('toggleSidebar called') // ← tambahkan sementara untuk debug
  sidebarOpen.value = !sidebarOpen.value
}

function closeSidebar(): void {
  sidebarOpen.value = false
}

function toggleConfigurator(): void {
  configuratorOpen.value = !configuratorOpen.value
}

function checkMobile(): void {
  isMobile.value = window.innerWidth < 1024
  if (!isMobile.value) {
    sidebarOpen.value = false
  }
}

// Lifecycle
onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)

  // Initialize theme from localStorage and apply classes
  themeStore.initializeTheme()
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})

// Removed the watchers here as the store now directly manipulates document.documentElement classes
// This simplifies the app.vue component and centralizes class application in the store.
</script>

<template>
  <div
    class="min-h-screen transition-colors duration-300"
  >
    <div class="flex h-screen overflow-hidden">
      <DashboardSidebar
        :is-open="sidebarOpen" @toggle="toggleSidebar"
      />

      <div class="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader
          @toggle-sidebar="toggleSidebar"
        />
        <!-- @toggle-configurator="toggleConfigurator" -->

        <main class="flex-1 overflow-auto">
          <NuxtPage />
        </main>

        <DashboardFooter />
      </div>
    </div>

    <DashboardConfigurator
      :is-open="configuratorOpen"
      @close="toggleConfigurator"
    />

    <ClientOnly>
      <VueQueryDevtools :initial-is-open="true" />
    </ClientOnly>
    <CoreConfirmDialog />
    <CoreToast />

    <div
      v-if="sidebarOpen && isMobile"
      class="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
      @click="closeSidebar"
    />
  </div>
</template>

<style>
/* Global styles are handled in main.css */
/* No changes needed here, as classes are applied to document.documentElement */
</style>
