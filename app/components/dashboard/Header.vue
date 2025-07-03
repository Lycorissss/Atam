<script setup lang="ts">
// Added lang="ts" for TypeScript support
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useThemeStore } from '@/stores/theme'
// import { useAuthState, useLogout } from '~/composables/modules/useAuth'

// Emits
defineEmits(['toggle-sidebar', 'toggle-configurator'])
const { isAuthenticated, user } = useAuthState()
const logoutMutation = useLogout()

const userMenu = ref() // ← Missing before!

// Notification menu items
const userMenuItems = ref([
  { label: 'Profile', icon: 'i-mdi-user', command: () => console.log('Go to profile') },
  { label: 'Settings', icon: 'i-mdi-cog', command: () => console.log('Go to settings') },
  { separator: true },
  {
    label: 'Logout',
    icon: 'i-mdi-sign-out',
    class: 'text-red-500 font-semibold',
    command: () => {
      logoutMutation.mutate() // ✅ calls real logout
    },
  },
])

// Stores
const themeStore = useThemeStore()
const route = useRoute()

// State
const searchQuery = ref('')
const showNotifications = ref(false)
const showUserMenu = ref(false)
const notifications = ref([
  {
    id: 1,
    title: 'New Order',
    message: 'You have received a new order #12345',
    time: '2 minutes ago',
    unread: true,
  },
  {
    id: 2,
    title: 'Payment Received',
    message: 'Payment of $250 has been received',
    time: '1 hour ago',
    unread: true,
  },
  {
    id: 3,
    title: 'Server Maintenance',
    message: 'Scheduled maintenance tonight at 2 AM',
    time: '3 hours ago',
    unread: false,
  },
])

// Computed
const breadcrumbItems = computed(() => {
  const items = [{ label: 'Home', to: '/' }]

  if (route.path !== '/') {
    const pathSegments = route.path.split('/').filter(Boolean)
    pathSegments.forEach((segment, index) => {
      const path = `/${pathSegments.slice(0, index + 1).join('/')}`
      items.push({
        label: segment.charAt(0).toUpperCase() + segment.slice(1),
        to: index === pathSegments.length - 1 ? null : path,
      })
    })
  }

  return items
})

const notificationCount = computed(() => {
  return notifications.value.filter(n => n.unread).length
})

// Methods
function toggleTheme(): void { // Added type annotation for clarity
  themeStore.toggleTheme()
}

function toggleNotifications(): void { // Added type annotation
  showNotifications.value = !showNotifications.value
  showUserMenu.value = false
}

function toggleUserMenu(): void { // Added type annotation
  showUserMenu.value = !showUserMenu.value
  showNotifications.value = false
}

function markAllAsRead(): void { // Added type annotation
  notifications.value.forEach(n => n.unread = false)
}

function closeDropdowns(event: MouseEvent): void { // Added type annotation
  if (!event.target)
    return // Add null check for event.target
  if (!(event.target instanceof Element) || !event.target.closest('.relative')) {
    showNotifications.value = false
    showUserMenu.value = false
  }
}

// Lifecycle
onMounted(() => {
  document.addEventListener('click', closeDropdowns)
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdowns)
})
</script>

<template>
  <header class="border-b dark:bg-surface-800 border-gray-200 dark:border-gray-700 px-4 py-3 h-16 align-middle content-center">
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-4">
        <Button
          icon="i-mdi-menu"
          class="p-button-text p-button-sm lg:hidden"
          @click="$emit('toggle-sidebar')"
        />

        <VoltBreadcrumb :model="breadcrumbItems" class="hidden sm:block">
          <template #item="{ item }">
            <NuxtLink
              v-if="item.to"
              :to="item.to"
              class="text-primary-500 hover:text-primary-600"
            >
              {{ item.label }}
            </NuxtLink>
            <span v-else class="text-gray-500">{{ item.label }}</span>
          </template>
        </VoltBreadcrumb>
      </div>

      <div class="flex items-center space-x-3">
        <div class="hidden md:block relative">
          <VoltInputText
            v-model="searchQuery"
            placeholder="Search..."
            class="pl-10 pr-4 py-2 w-64"
          />
          <i class="i-mdi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <VoltButton
          :class="themeStore.isDark ? 'i-mdi-white-balance-sunny' : 'i-mdi-moon-and-stars'"
          @click="toggleTheme"
        />

        <VoltButton
          class="i-mdi-cog-outline"
          @click="$emit('toggle-configurator')"
        />

        <!-- Sign In Button -->
        <VoltButton
          v-if="!isAuthenticated"
          label="Sign In"
          icon="i-mdi-user"
          text
          severity="secondary"
          class="hidden sm:flex"
          @click="$router.push('/')"
        />

        <!-- Show Avatar + Menu if logged in -->
        <div v-else class="relative">
          <button
            class="rounded-full overflow-hidden w-8 h-8 border border-gray-300 dark:border-gray-600"
            @click="userMenu.toggle($event)"
          >
            <img
              :src="user?.avu_user_image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.avu_username || 'User')}`"
              :alt="user?.avu_username || 'User Avatar'"
              class="w-full h-full object-cover"
            >
          </button>

          <Menu
            ref="userMenu"
            :model="userMenuItems"
            :popup="true"
            class="w-56"
          >
            <template #start>
              <div class="p-3 border-b text-sm text-gray-800 dark:text-gray-200 dark:bg-surface-800 bg-white">
                <div class="font-semibold">
                  {{ user?.avu_username }}
                </div>
                <div class="text-xs truncate opacity-70">
                  {{ user?.avu_email }}
                </div>
              </div>
            </template>

            <template #item="{ item }">
              <div
                v-if="item.separator"
                class="border-t my-2 dark:bg-surface-800 bg-white"
              />
              <div
                v-else
                class="flex items-center p-3 cursor-pointer dark:bg-surface-800 bg-white text-gray-700 dark:text-gray-300"
                @click="item.command && item.command()"
              >
                <i class="pi text-lg mr-3" :class="[item.icon]" />
                <span :class="item.class || 'text-sm'">
                  {{ item.label }}
                </span>
              </div>
            </template>
          </Menu>
        </div>
      </div>
    </div>
  </header>
</template>
