<script setup lang="ts">
import gsap from 'gsap'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
})

// import { useAuthState } from '~/composables/modules/useAuth'

const emit = defineEmits(['toggle'])

const { user } = useAuthState()
const route = useRoute()
const openSubmenus = ref<string[]>([])
const userRole = ref<'ADMIN' | 'MARKETING' | 'USER'>('MARKETING')

const allRoutes = {
  ADMIN: [
    { title: 'Home', url: '/admin/home', icon: 'i-mdi-home' },
  ],
  MARKETING: [
    {
      title: 'Home',
      url: '/admin/home',
      icon: 'i-mdi-home',
    },
    {
      title: 'Documentation',
      url: '/admin/report/marketing',
      icon: 'i-mdi-book',
      subfolderitems: [
        { page: 'Button', url: '/atam/button-doct', icon: 'i-mdi-chart-line' },
        { page: 'Card', url: '/atam/card-doct', icon: 'i-mdi-chart-line' },
        { page: 'Dialog', url: '/atam/confirm-dialog-doct', icon: 'i-mdi-chart-line' },
      ],
    },
  ],
  USER: [
    { title: 'Home', url: '/admin/home', icon: 'i-mdi-home' },
  ],
}

const userRoutes = computed(() => allRoutes[userRole.value] || [])

function toggleSubmenu(title: string) {
  const index = openSubmenus.value.indexOf(title)
  index > -1 ? openSubmenus.value.splice(index, 1) : openSubmenus.value.push(title)
}

function isSubmenuActive(item: any) {
  return item.subfolderitems?.some((sub: any) => route.path === sub.url)
}

function handleLinkClick() {
  if (window.innerWidth < 1024)
    emit('toggle')
}

onMounted(() => {
  gsap.from('.sidebar', { x: -300, opacity: 0, duration: 0.6, ease: 'power2.out' })

  userRoutes.value.forEach((item) => {
    if (item.subfolderitems?.some((s: any) => route.path === s.url)) {
      openSubmenus.value.push(item.title)
    }
  })
})
</script>

<template>
  <aside
    v-if="isOpen"
    class="sidebar fixed lg:relative top-0 left-0 h-full w-64 z-30 transition-transform duration-300 border-[3px] border-black bg-gray-100 text-black rounded-r-[12px]"
  >
    <div class="flex flex-col h-full">
      <!-- Logo Header -->
      <div class="p-4 border-b-[3px] border-black flex items-center justify-between">
        <span class="font-bold text-xl">A - Tams</span>
        <button v-if="isOpen" class="lg:hidden text-xl text-black" @click="$emit('toggle')">
          ✕
        </button>
      </div>

      <!-- Nav Items -->
      <nav class="flex-1 overflow-y-auto p-4 space-y-2">
        <template v-for="item in userRoutes" :key="item.title">
          <NuxtLink
            v-if="!item.subfolderitems" :to="item.url"
            class="flex items-center gap-3 px-4 py-2 rounded-[10px] border-[2px] border-black shadow-[4px_4px_0_rgba(0,0,0,1)]"
            :class="route.path === item.url ? 'bg-purple-400 text-black' : 'bg-white hover:bg-purple-200'"
            @click="handleLinkClick"
          >
            <i :class="item.icon" />
            <span class="font-medium">{{ item.title }}</span>
          </NuxtLink>

          <div v-else>
            <button
              class="w-full flex justify-between items-center px-4 py-2 rounded-[10px] border-[2px] border-black bg-white shadow-[4px_4px_0_rgba(0,0,0,1)] hover:bg-purple-100"
              @click="toggleSubmenu(item.title)"
            >
              <div class="flex gap-3 items-center">
                <i :class="item.icon" />
                <span class="font-medium">{{ item.title }}</span>
              </div>
              <i class="i-mdi-chevron-down" :class="openSubmenus.includes(item.title) ? 'rotate-180' : ''" />
            </button>

            <div v-if="openSubmenus.includes(item.title)" class="pl-6 mt-2 space-y-1">
              <NuxtLink
                v-for="sub in item.subfolderitems" :key="sub.page" :to="sub.url"
                class="flex items-center gap-3 px-3 py-2 rounded-[10px] border-[2px] border-black shadow-[3px_3px_0_rgba(0,0,0,1)] text-sm"
                :class="route.path === sub.url ? 'bg-purple-300 text-black' : 'bg-white hover:bg-purple-100'"
                @click="handleLinkClick"
              >
                <i :class="sub.icon" />
                <span>{{ sub.page }}</span>
              </NuxtLink>
            </div>
          </div>
        </template>
      </nav>

      <!-- Footer -->
      <div class="mt-auto border-t-[3px] border-black p-4 text-sm">
        <div class="flex items-center space-x-3">
          <Avatar
            :src="user?.avu_user_image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.avu_username || 'User')}`"
            :alt="user?.avu_username || 'User Avatar'" shape="circle" size="normal"
          />
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 truncate">
              {{ user?.avu_username || 'User' }}
            </p>
            <p class="text-xs text-gray-500 truncate">
              {{ user?.avu_email }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </aside>
  <aside
    v-else
    class="fixed lg:relative top-0 left-0 h-full w-14 z-30 transition-transform duration-300 border-[3px] border-black bg-gray-100 text-black rounded-r-[12px] flex items-center justify-center"
  >
    Kontol
  </aside>
</template>
<!-- <template>
  <aside
    v-if="isOpen"
    class="sidebar fixed lg:relative top-0 left-0 h-full w-64 z-30 transition-transform duration-300 border-[3px] border-black bg-gray-100 text-black rounded-r-[12px]"
  >
    <div class="flex flex-col h-full">
      <div class="p-4 border-b-[3px] border-black flex items-center justify-between">
        <span class="font-bold text-xl">A - Tams</span>
        <button @click="$emit('toggle')" class="lg:hidden text-xl text-black">✕</button>
      </div>

      <slot name="main" />
    </div>
  </aside>

  <aside
    v-else
    class="fixed lg:relative top-0 left-0 h-full w-14 z-30 transition-transform duration-300 border-[3px] border-black bg-gray-100 text-black rounded-r-[12px] flex items-center justify-center"
  >
    <button
      @click="$emit('toggle')"
      class="text-2xl text-black hover:text-purple-600"
      title="Open Sidebar"
    >
      ☰
    </button>
  </aside>
</template> -->
