<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute } from 'vue-router'
// import { useThemeStore } from '@/stores/theme'
// import { useAuthState, useLogout } from '~/composables/modules/useAuth'

const emit = defineEmits(['logout', 'toggle-configurator', 'toggle-sidebar'])

const { isAuthenticated, user } = useAuthState()
const logoutMutation = useLogout()

const userMenu = ref()
const themeStore = useThemeStore()
const route = useRoute()

const searchQuery = ref('')
const showNotifications = ref(false)
const showUserMenu = ref(false)

const notifications = ref([
  { id: 1, title: 'New Order', message: 'You have received a new order #12345', time: '2 minutes ago', unread: true },
  { id: 2, title: 'Payment Received', message: 'Payment of $250 has been received', time: '1 hour ago', unread: true },
  { id: 3, title: 'Server Maintenance', message: 'Scheduled maintenance tonight at 2 AM', time: '3 hours ago', unread: false },
])

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

const notificationCount = computed(() => notifications.value.filter(n => n.unread).length)

function toggleTheme() {
  themeStore.toggleTheme()
}

function toggleNotifications() {
  showNotifications.value = !showNotifications.value
  showUserMenu.value = false
}

function toggleUserMenu() {
  showUserMenu.value = !showUserMenu.value
  showNotifications.value = false
}

function markAllAsRead() {
  notifications.value.forEach(n => (n.unread = false))
}

function closeDropdowns(event: MouseEvent) {
  if (!event.target)
    return
  if (!(event.target instanceof Element) || !event.target.closest('.relative')) {
    showNotifications.value = false
    showUserMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeDropdowns)
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdowns)
})
</script>

<template>
  <header class="py-4 px-6">
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-4">
        <Button icon="i-mdi-menu" class="p-button-sm p-button-text lg:hidden" @click="$emit('toggle-sidebar')" />

        <CoreBreadcrumb :model="breadcrumbItems" class="hidden sm:block">
          <template #item="{ item }">
            <NuxtLink v-if="item.to" :to="item.to" class="text-primary-500 hover:underline">
              {{ item.label }}
            </NuxtLink>
            <span v-else class="text-gray-500">{{ item.label }}</span>
          </template>
        </CoreBreadcrumb>
      </div>

      <div class="flex items-center gap-3">
        <div class="hidden md:block relative">
          <AtamInput v-model="searchQuery" placeholder="Search..." class="pl-10 pr-4 py-2 w-64" />
          <i class="i-mdi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        <AtamButton
          :class="themeStore.isDark ? 'i-mdi-white-balance-sunny' : 'i-mdi-moon-waning-crescent'"
          severity="primary-blue" @click="toggleTheme"
        />

        <AtamButton class="i-mdi-cog-outline" severity="primary-blue" @click="$emit('toggle-configurator')" />

        <AtamButton
          v-if="!isAuthenticated" label="Sign In" icon="i-mdi-login" text class="hidden sm:flex"
          @click="$router.push('/')"
        />

        <div v-else class="relative">
          <button class="rounded-full overflow-hidden w-8 h-8 border border-black" @click="userMenu.toggle($event)">
            <img
              :src="user?.avu_user_image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.avu_username || 'User')}`"
              :alt="user?.avu_username || 'User Avatar'" class="w-full h-full object-cover"
            >
          </button>

          <Menu
            ref="userMenu" :model="[
              { label: 'Profile', icon: 'i-mdi-account' },
              { label: 'Settings', icon: 'i-mdi-cog' },
              { separator: true },
              { label: 'Logout', icon: 'i-mdi-logout', class: 'text-red-600', command: () => logoutMutation.mutate() },
            ]" :popup="true" class="w-56"
          >
            <template #start>
              <div class="p-3 border-b bg-white">
                <div class="font-semibold">
                  {{ user?.avu_username }}
                </div>
                <div class="text-xs text-gray-500 truncate">
                  {{ user?.avu_email }}
                </div>
              </div>
            </template>

            <template #item="{ item }">
              <div v-if="item.separator" class="border-t my-2" />
              <div
                v-else class="flex items-center p-3 text-sm cursor-pointer hover:bg-gray-100"
                @click="item.command && item.command()"
              >
                <i class="pi text-lg mr-3" :class="item.icon" />
                <span :class="item.class || 'text-sm'">{{ item.label }}</span>
              </div>
            </template>
          </Menu>
        </div>
      </div>
    </div>
  </header>
</template>
