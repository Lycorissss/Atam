<script setup lang="ts">
import AuthLoginForm from '../../components/AuthLoginForm.vue'
import AuthRegisterForm from '../../components/AuthRegisterForm.vue'
import type { AtamCard } from '#components'
import gsap from 'gsap'
import {
  computed,
  defineAsyncComponent,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from 'vue'

definePageMeta({
  layout: 'auth',
  middleware: ['guest-client'],
})

// --- State & Refs ---
const isMobile = ref(false)
const showLogin = ref(true)
const formRef = ref<InstanceType<typeof AtamCard> | null>(null)
const panelsContainer = ref<HTMLElement | null>(null)
const welcomePanel = ref<HTMLElement | null>(null)
const formPanel = ref<HTMLElement | null>(null)
const isAnimating = ref(false)
// Responsive handler
function handleResize() {
  isMobile.value = window.innerWidth < 768
}



onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

watch(showLogin, async (login) => {
  if (isAnimating.value || !panelsContainer.value || !welcomePanel.value || !formPanel.value)
    return

  isAnimating.value = true

  await nextTick()

  const containerWidth = panelsContainer.value.clientWidth
  const slideDistance = containerWidth / 2

  const tl = gsap.timeline({
    onComplete: () => {
      const parent = panelsContainer.value!
      if (login) {
        parent.appendChild(welcomePanel.value!)
        parent.appendChild(formPanel.value!)
      }
      else {
        parent.appendChild(formPanel.value!)
        parent.appendChild(welcomePanel.value!)
      }

      gsap.set([welcomePanel.value, formPanel.value], {
        x: 0,
        clearProps: 'transform',
      })

      isAnimating.value = false
    },
  })

  if (login) {
    tl.to(welcomePanel.value, {
      x: -slideDistance,
      duration: 0.4,
      ease: 'power2.inOut',
    }, 0)
      .to(formPanel.value, {
        x: slideDistance,
        duration: 0.4,
        ease: 'power2.inOut',
      }, 0)
  }
  else {
    // Welcome panel moves to right, Form panel moves to left
    tl.to(welcomePanel.value, {
      x: slideDistance,
      duration: 0.4,
      ease: 'power2.inOut',
    }, 0)
      .to(formPanel.value, {
        x: -slideDistance,
        duration: 0.4,
        ease: 'power2.inOut',
      }, 0)
  }
})

const panelClasses = computed(() => ({
  'transition-all duration-300 ease-in-out': !isAnimating.value,
}))

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)

  if (welcomePanel.value && formPanel.value) {
    gsap.set([welcomePanel.value, formPanel.value], { x: 0 });
  }

})
</script>

<template>
  <AtamBgSimetris class="fixed -z-10" />

  <section v-if="isMobile" class="max-w-md mx-auto py-20 z-10">
    <AtamCard>
      <template #header>
        <h1 class="uppercase text-[3rem] font-bold text-center mb-8 transition-all duration-500">
          {{ showLogin ? 'LOGIN' : 'REGISTER' }}
        </h1>
      </template>
      <template #content>
        <div class="transition-all duration-300 ease-in-out">
          <component :is="showLogin ? AuthLoginForm : AuthRegisterForm" />
        </div>
      </template>
      <template v-if="showLogin" #footer>
        <p class="text-center mt-4 text-sm text-gray-500">
          <NuxtLink to="/auth/forgot-password" class="text-primary-600 hover:underline transition-colors duration-200">
            Lupa password?
          </NuxtLink>
        </p>
      </template>
    </AtamCard>
  </section>

  <section v-else class="max-w-4xl mx-auto py-20 z-10">
    <AtamCard ref="formRef">
      <template #header>
        <h1 class="atam-heading text-center">
          ATAM-LINK
        </h1>
      </template>

      <template #content>
        <div ref="panelsContainer" class="flex overflow-hidden relative" style="height: auto; will-change: transform">
          <div ref="welcomePanel"
            class="w-1/2 bg-primary-400 text-black flex flex-col items-center justify-center p-12 relative z-10"
            :class="panelClasses" style="will-change: transform">
            <div class="text-center">
              <h2 class="text-2xl font-extrabold mb-3 transition-all duration-300">
                Hello, Welcome!
              </h2>
              <p class="text-base mb-6 transition-all duration-300">
                {{ showLogin
                  ? "Don't have an account?"
                  : "Already have an account?" }}
                <br>
                <NuxtLink to="/auth/forgot-password"
                  class="text-sm text-gray-500 hover:underline transition-colors duration-200">
                  Lupa password?
                </NuxtLink>
              </p>
            </div>
            <AtamButton :hover="true" severity="primary-green"
              class="px-6 py-2 font-bold mb-4 transition-transform duration-200 hover:scale-105" :disabled="isAnimating"
              @click="showLogin = !showLogin">
              {{ showLogin ? 'Register' : 'Login' }}
            </AtamButton>
          </div>

          <div ref="formPanel" class="w-1/2 flex items-center justify-center p-8 bg-white relative z-10"
            :class="panelClasses" style="will-change: transform">
            <div class="w-full max-w-sm transition-all duration-300">
              <AuthLoginForm v-show="showLogin" />
              <AuthRegisterForm v-show="!showLogin" />
            </div>
          </div>
        </div>
      </template>
    </AtamCard>
  </section>
</template>
