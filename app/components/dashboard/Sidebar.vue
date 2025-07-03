<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
// import { useAuthState } from '~/composables/modules/useAuth'

// Props
defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
})

// Emits
defineEmits(['toggle'])

const { user } = useAuthState()

// Route
const route = useRoute()

// State
const openSubmenus = ref<string[]>([])
const openNestedSubmenus = ref<string[]>([])
const userRole = ref<'ADMIN' | 'MARKETING' | 'USER'>('MARKETING') // This should come from your auth store

// Define all routes grouped by access role
const allRoutes = {
  ADMIN: [
    {
      title: 'Home',
      url: '/admin/home',
      icon: 'i-mdi-home',
    },
  ],
  MARKETING: [
    {
      title: 'Home',
      url: '/admin/home',
      icon: 'i-mdi-home',
    },
    {
      title: 'Voucher Request',
      url: '/admin/voucher/all',
      icon: 'i-mdi-history',
      subfolderitems: [
        {
          page: 'All',
          url: '/admin/voucher/all',
          icon: 'i-mdi-format-list-bulleted',
        },
        {
          page: 'In Progress',
          url: '/admin/voucher/in-progress',
          icon: 'i-mdi-progress-clock',
        },
        {
          page: 'Approval',
          url: '/admin/voucher/approval',
          icon: 'i-mdi-check-circle-outline',
        },
        {
          page: 'Payment',
          url: '/admin/voucher/payment',
          icon: 'i-mdi-credit-card-outline',
        },
        {
          page: 'Validation',
          url: '/admin/voucher/validation',
          icon: 'i-mdi-clipboard-check-outline',
        },
        {
          page: 'Received',
          url: '/admin/voucher/received',
          icon: 'i-mdi-inbox-arrow-down',
        },
        {
          page: 'Completed',
          url: '/admin/voucher/completed',
          icon: 'i-mdi-check-all',
        },
        {
          page: 'Canceled',
          url: '/admin/voucher/canceled',
          icon: 'i-mdi-cancel',
        },
        {
          page: 'Receipt',
          url: '/admin/voucher/receipt',
          icon: 'i-mdi-receipt',
        },
      ],
    },
    {
      title: 'Master',
      url: '/admin/master/registration',
      icon: 'i-mdi-database',
      subfolderitems: [
        {
          page: 'User Registration',
          url: '/admin/master/registration',
          icon: 'i-mdi-account-plus-outline',
        },
        {
          page: 'Denom',
          url: '/admin/master/denom',
          icon: 'i-mdi-cash-multiple',
          subfolderitems2: [
            {
              page: 'All Denoms',
              url: '/admin/master/denom',
              icon: 'i-mdi-format-list-bulleted',
            },
            {
              page: 'Create Denom',
              url: '/admin/master/denom/create',
              icon: 'i-mdi-plus',
            },
          ],
        },
        {
          page: 'Branch',
          url: '/admin/master/branch',
          icon: 'i-mdi-source-branch',
        },
        {
          page: 'Announcement',
          url: '/admin/master/announcement',
          icon: 'i-mdi-bullhorn-outline',
        },
      ],
    },
    {
      title: 'Report',
      url: '/admin/report/marketing',
      icon: 'i-mdi-chart-bar',
      subfolderitems: [
        {
          page: 'Marketing Report',
          url: '/admin/report/marketing',
          icon: 'i-mdi-chart-line',
        },
      ],
    },
  ],
  USER: [
    {
      title: 'Home',
      url: '/admin/home',
      icon: 'i-mdi-home',
    },
  ],
}

// Computed
const userRoutes = computed(() => {
  return allRoutes[userRole.value] || []
})

// Methods
function toggleSubmenu(title: string) {
  const index = openSubmenus.value.indexOf(title)
  if (index > -1) {
    openSubmenus.value.splice(index, 1)
  }
  else {
    openSubmenus.value.push(title)
  }
}

function toggleNestedSubmenu(page: string) {
  const index = openNestedSubmenus.value.indexOf(page)
  if (index > -1) {
    openNestedSubmenus.value.splice(index, 1)
  }
  else {
    openNestedSubmenus.value.push(page)
  }
}

function isSubmenuActive(item: any) {
  if (!item.subfolderitems)
    return false
  return item.subfolderitems.some((subItem: any) => {
    if (subItem.subfolderitems2) {
      return subItem.subfolderitems2.some((nestedItem: any) => route.path === nestedItem.url)
    }
    return route.path === subItem.url
  })
}

function isNestedSubmenuActive(subItem: any) {
  if (!subItem.subfolderitems2)
    return false
  return subItem.subfolderitems2.some((nestedItem: any) => route.path === nestedItem.url)
}

function handleLinkClick() {
  // Close sidebar on mobile when link is clicked
  if (window.innerWidth < 1024) {
    $emit('toggle')
  }
}

// Auto-expand active menus on mount
onMounted(() => {
  userRoutes.value.forEach((item) => {
    if (item.subfolderitems) {
      // Check if any submenu item is active
      const hasActiveSubItem = item.subfolderitems.some((subItem: any) => {
        if (subItem.subfolderitems2) {
          const hasActiveNestedItem = subItem.subfolderitems2.some((nestedItem: any) => route.path === nestedItem.url)
          if (hasActiveNestedItem) {
            openNestedSubmenus.value.push(subItem.page)
          }
          return hasActiveNestedItem
        }
        return route.path === subItem.url
      })

      if (hasActiveSubItem) {
        openSubmenus.value.push(item.title)
      }
    }
  })
})
</script>

<template>
  <aside
    class="fixed lg:relative top-0 left-0 h-full dark:bg-surface-900 border-r border-gray-200 dark:border-gray-700 transition-transform duration-300 z-30 w-64 lg:w-64" :class="[
      isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
    ]"
  >
    <div class="flex flex-col h-full">
      <!-- Logo -->
      <div class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
            <svg class="w-16 h-16" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:#ef4444;stop-opacity:1" />
                  <stop offset="100%" style="stop-color:#eab308;stop-opacity:1" />
                </linearGradient>
                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000000" flood-opacity="0.25" />
                </filter>
              </defs>

              <!-- Background Circle -->
              <circle cx="32" cy="32" r="28" fill="url(#logoGradient)" filter="url(#shadow)" />

              <!-- Inner Circle -->
              <circle cx="32" cy="32" r="24" fill="none" stroke="white" stroke-width="2" opacity="0.3" />

              <!-- Logo Elements -->
              <g fill="white">
                <!-- Track/Path Symbol -->
                <path d="M20 28 Q32 20 44 28 Q32 36 20 28" fill="white" opacity="0.9" />
                <path d="M20 36 Q32 28 44 36 Q32 44 20 36" fill="white" opacity="0.7" />

                <!-- Talent Star -->
                <polygon points="32,16 34,22 40,22 35,26 37,32 32,28 27,32 29,26 24,22 30,22" fill="white" />

                <!-- Connecting Lines -->
                <line x1="16" y1="32" x2="20" y2="32" stroke="white" stroke-width="2" opacity="0.6" />
                <line x1="44" y1="32" x2="48" y2="32" stroke="white" stroke-width="2" opacity="0.6" />
              </g>
            </svg>
            <!-- <img src="https://storage.googleapis.com/gli-development.appspot.com/talent-track/logo.png" /> -->
          </div>
          <span class="text-xl font-bold text-gray-900 dark:text-white">A - Voucher</span>
        </div>
        <Button
          v-if="isOpen"
          icon="i-mdi-times"
          class="p-button-text p-button-sm lg:hidden"
          @click="$emit('toggle')"
        />
      </div>

      <!-- Navigation -->
      <nav class="flex-1 overflow-y-auto p-4">
        <ul class="space-y-2">
          <li v-for="item in userRoutes" :key="item.title">
            <!-- Menu item without subfolders -->
            <div v-if="!item.subfolderitems">
              <NuxtLink
                :to="item.url"
                class="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors duration-200" :class="[
                  $route.path === item.url
                    ? 'bg-primary-500 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700',
                ]"
                @click="handleLinkClick"
              >
                <i :class="item.icon" />
                <span>{{ item.title }}</span>
              </NuxtLink>
            </div>

            <!-- Menu item with subfolders -->
            <div v-else>
              <button
                class="flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm transition-colors duration-200" :class="[
                  isSubmenuActive(item)
                    ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700',
                ]"
                @click="toggleSubmenu(item.title)"
              >
                <div class="flex items-center space-x-3">
                  <i :class="item.icon" />
                  <span>{{ item.title }}</span>
                </div>
                <i
                  class="i-mdi-chevron-down transition-transform duration-200" :class="[
                    openSubmenus.includes(item.title) ? 'rotate-180' : '',
                  ]"
                />
              </button>

              <!-- Submenu -->
              <div
                v-if="openSubmenus.includes(item.title)"
                class="mt-1 ml-4 space-y-1"
              >
                <div v-for="subItem in item.subfolderitems" :key="subItem.page">
                  <!-- Sub-item without subfolderitems2 -->
                  <div v-if="!subItem.subfolderitems2">
                    <NuxtLink
                      :to="subItem.url"
                      class="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors duration-200" :class="[
                        $route.path === subItem.url
                          ? 'bg-primary-500 text-white'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700',
                      ]"
                      @click="handleLinkClick"
                    >
                      <i :class="subItem.icon" />
                      <span>{{ subItem.page }}</span>
                    </NuxtLink>
                  </div>

                  <!-- Sub-item with subfolderitems2 (nested submenu) -->
                  <div v-else>
                    <button
                      class="flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm transition-colors duration-200" :class="[
                        isNestedSubmenuActive(subItem)
                          ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700',
                      ]"
                      @click="toggleNestedSubmenu(subItem.page)"
                    >
                      <div class="flex items-center space-x-3">
                        <i :class="subItem.icon" />
                        <span>{{ subItem.page }}</span>
                      </div>
                      <i
                        class="i-mdi-chevron-down transition-transform duration-200" :class="[
                          openNestedSubmenus.includes(subItem.page) ? 'rotate-180' : '',
                        ]"
                      />
                    </button>

                    <!-- Nested submenu -->
                    <div
                      v-if="openNestedSubmenus.includes(subItem.page)"
                      class="mt-1 ml-4 space-y-1"
                    >
                      <NuxtLink
                        v-for="nestedItem in subItem.subfolderitems2"
                        :key="nestedItem.page"
                        :to="nestedItem.url"
                        class="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors duration-200" :class="[
                          $route.path === nestedItem.url
                            ? 'bg-primary-500 text-white'
                            : 'text-gray-500 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700',
                        ]"
                        @click="handleLinkClick"
                      >
                        <i :class="nestedItem.icon" />
                        <span>{{ nestedItem.page }}</span>
                      </NuxtLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </nav>

      <!-- User Profile -->
      <div class="p-4 border-t border-gray-200 dark:border-gray-700">
        <div class="flex items-center space-x-3">
          <Avatar
            :src="user?.avu_user_image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.avu_username || 'User')}`"
            :alt="user?.avu_username || 'User Avatar'"
            shape="circle"
            size="normal"
          />
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 dark:text-white truncate">
              {{ user?.avu_username || 'User' }}
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400 truncate">
              {{ user?.avu_email }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>
