<script setup lang="ts">
import gsap from 'gsap'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useThemeStore } from '~/stores/theme'

const props = defineProps({
  isOpen: { type: Boolean, default: false },
})
const theme = useThemeStore()
const user = {
  avu_username: 'Raja Iblis Tyo',
  avu_email: 'raja@neraka.id',
  avu_user_image: '',
}

const route = useRoute()
const openSubmenus = ref<string[]>([])
const userRole = ref<'ADMIN' | 'MARKETING' | 'USER'>('MARKETING')

const allRoutes = {
  ADMIN: [{ title: 'Home', url: '/atam', icon: 'i-mdi-home' }],
  MARKETING: [
    { title: 'Home', url: '/atam', icon: 'i-mdi-home' },
    {
      title: 'Documentation',
      icon: 'i-mdi-book',
      subfolderitems: [
        { page: 'Button', url: '/atam/button-doct', icon: 'i-mdi-gesture-tap' },
        { page: 'Card', url: '/atam/card-doct', icon: 'i-mdi-credit-card' },
        { page: 'Dialog', url: '/atam/confirm-dialog-doct', icon: 'i-mdi-message-alert' },
        { page: 'input', url: '/atam/input-doct', icon: 'i-mdi-input' },
      ],
    },
  ],
  USER: [{ title: 'Home', url: '/atam', icon: 'i-mdi-home' }],
}

const userRoutes = computed(() => allRoutes[userRole.value] || [])

function toggleSubmenu(title: string) {
  const index = openSubmenus.value.indexOf(title)
  index > -1 ? openSubmenus.value.splice(index, 1) : openSubmenus.value.push(title)
}

function handleLinkClick() {
  if (window.innerWidth < 1024)
    theme.toggleSidebarOpen(false)
}

onMounted(() => {
  gsap.from('.sidebar', { x: -300, opacity: 0, duration: 0.5, ease: 'expo.out' })
  userRoutes.value.forEach((item) => {
    if (item.subfolderitems?.some((s: any) => route.path === s.url)) {
      openSubmenus.value.push(item.title)
    }
  })
})
</script>

<template>
  <aside
    class="sidebar fixed lg:relative top-0 left-0 h-full z-40 bg-white dark:bg-black border-r-[4px] border-black transition-all duration-500 flex flex-col"
    :class="theme.isOpen ? 'w-64' : 'w-16 items-center justify-between py-4'"
  >
    <div v-if="theme.isOpen" class="flex items-center justify-between px-4 py-4 border-b-[4px] border-black">
      <div class="flex items-center gap-7">
        <AtamButton
          icon="i-mdi-menu"
          class="!bg-white dark:!bg-black !border-[3px] border-black px-[11px] py-[11px] shadow-[5px_5px_0_#000] text-black dark:text-white font-semibold rounded-md transition-all duration-150 hover:bg-lilac-100 dark:hover:bg-black active:translate-x-[1px] active:translate-y-[1px]"
          @click="theme.toggleSidebarOpen()"
        />
        <span class="font-black text-lg tracking-widest">A - TAMS</span>
      </div>
    </div>

    <div v-else class="flex flex-col items-center gap-4">
      <div class="justify-between px-2 pb-4 border-b-[4px]">
        <AtamButton
          icon="i-mdi-close"
          class="!bg-white dark:!bg-black !border-[3px] border-black px-[11px] py-[11px] shadow-[5px_5px_0_#000] text-black dark:text-white font-semibold rounded-md transition-all duration-150 hover:bg-lilac-100 dark:hover:bg-black active:translate-x-[1px] active:translate-y-[1px]"
          @click="theme.toggleSidebarOpen()"
        />
      </div>

      <div class="flex flex-col items-center gap-3">
        <button
          v-for="item in userRoutes" :key="item.title" class="w-11 h-11 flex items-center justify-center border-[3px] border-black bg-white dark:bg-black shadow-[4px_4px_0_#000] text-black dark:text-white rounded-md hover:bg-lilac-100 dark:hover:bg-black"
          @click="theme.toggleSidebarOpen(true)"
        >
          <i :class="item.icon" class="text-xl" />
        </button>
      </div>
    </div>

    <nav v-if="theme.isOpen" class="flex-1 overflow-y-auto px-3 py-4">
      <template v-for="item in userRoutes" :key="item.title">
        <NuxtLink
          v-if="!item.subfolderitems" :to="item.url"
          class="flex items-center gap-3 px-4 py-2 rounded-[10px] border-[3px] border-black transition-all font-semibold mb-2 shadow-[4px_4px_0_#000]"
          :class="route.path === item.url ? 'bg-purple-400 text-black' : 'bg-white dark:bg-black hover:bg-lilac-100 dark:hover:bg-lilac-900 text-black dark:text-white'"
          @click="handleLinkClick"
        >
          <i :class="item.icon" />
          <span>{{ item.title }}</span>
        </NuxtLink>

        <div v-else>
          <button
            class="w-full flex justify-between items-center px-4 py-2 mb-2 rounded-[10px] border-[3px] border-black bg-white dark:bg-black text-black dark:text-white font-semibold shadow-[4px_4px_0_#000] hover:bg-lilac-100 dark:hover:bg-lilac-800"
            @click="toggleSubmenu(item.title)"
          >
            <div class="flex items-center gap-3">
              <i :class="item.icon" />
              <span>{{ item.title }}</span>
            </div>
            <i
              class="i-mdi-chevron-down transition-transform"
              :class="openSubmenus.includes(item.title) ? 'rotate-180' : ''"
            />
          </button>

          <transition name="fade">
            <div v-if="openSubmenus.includes(item.title)" class="pl-8 space-y-1 text-sm">
              <NuxtLink
                v-for="sub in item.subfolderitems" :key="sub.page" :to="sub.url"
                class="flex items-center gap-3 px-3 py-2 rounded-[8px] border-[2px] border-black shadow-[3px_3px_0_#000] hover:bg-purple-100 dark:hover:bg-purple-900 transition-all"
                :class="route.path === sub.url ? 'bg-purple-300 text-black' : 'bg-white dark:bg-black text-black dark:text-white'"
                @click="handleLinkClick"
              >
                <i :class="sub.icon" />
                <span>{{ sub.page }}</span>
              </NuxtLink>
            </div>
          </transition>
        </div>
      </template>
    </nav>

    <div v-if="theme.isOpen" class="mt-auto px-4 py-3 border-t-[4px] border-black">
      <div class="flex items-center gap-3">
        <Avatar
          :src="user.avu_user_image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.avu_username)}`"
          :alt="user.avu_username" shape="circle" size="normal"
        />
        <div class="truncate">
          <p class="font-bold text-sm">
            {{ user.avu_username }}
          </p>
          <p class="text-xs text-gray-500 dark:text-gray-400">
            {{ user.avu_email }}
          </p>
        </div>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
