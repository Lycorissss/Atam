<script setup lang="ts">
import type { AtamCard } from '#components'
import gsap from 'gsap'
import { defineAsyncComponent, nextTick, onMounted, ref, watch } from 'vue'

definePageMeta({
  layout: 'auth',
  middleware: ['guest-client'],
})

const isMobile = ref(false)
const showLogin = ref(true)
const formRef = ref<InstanceType<typeof AtamCard> | null>(null)

// Dynamic component imports with error handling
const AuthLoginForm = defineAsyncComponent(() => import('../../components/AuthLoginForm.vue'))
const AuthRegisterForm = defineAsyncComponent(() => import('../../components/AuthRegisterForm.vue'))

// Computed property for dynamic component
const currentFormComponent = computed(() => {
  return showLogin.value ? AuthLoginForm : AuthRegisterForm
})

// Alternative: Direct string reference (if auto-imports are configured)
// const currentFormComponent = computed(() => {
//   return showLogin.value ? 'AuthLoginForm' : 'AuthRegisterForm'
// })

watch(showLogin, async () => {
  await nextTick()
  if (formRef.value) {
    const target = formRef.value.$el ?? formRef.value
    gsap.fromTo(
      target,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
    )
  }
})

onMounted(() => {
  isMobile.value = window.innerWidth < 768

  // Debug logging
  console.log('Window width:', window.innerWidth)
  console.log('Is mobile:', isMobile.value)
  console.log('Show login:', showLogin.value)

  // Handle window resize
  window.addEventListener('resize', () => {
    isMobile.value = window.innerWidth < 768
  })
})
</script>

<template>
  <AtamBgSimetris class="fixed -z-10" />

  <!-- MOBILE -->
  <section v-if="isMobile" class="max-w-md z-10 mx-auto py-20">
    <AtamCard>
      <template #header>
        <h1 class="uppercase !text-[3rem] font-bold text-center mb-8">
          {{ showLogin ? 'LOGIN' : 'REGISTER' }}
        </h1>
      </template>
      <template #content>
        <component :is="currentFormComponent" />
      </template>
      <template v-if="showLogin" #footer>
        <p class="text-center mt-4 text-sm text-gray-500">
          <NuxtLink to="/auth/forgot-password" class="text-primary-600 hover:underline">
            Lupa password?
          </NuxtLink>
        </p>
      </template>
    </AtamCard>
  </section>

  <section v-else class="max-w-md z-10 mx-auto py-20">
    <AtamCard>
      <template #header>
        <div class="text-center">
          <h1 class="atam-heading">
            ATAM-LINK
          </h1>
        </div>
      </template>
      <template #content>
        <div class="flex gap-atam-default">
          <div
            class="w-1/2 bg-primary-400 text-black flex flex-col justify-center items-center p-12 border-r-[3px] border-black"
          >
            <h2 class="text-center font-extrabold mb-3">
              Hello, Welcome!
            </h2>
            <p class=" text-base">
              {{ showLogin ? "Don't have an account?" : "Already have an account?" }}
            </p>
            <p class="mb-6 text-center text-sm text-gray-500">
              <NuxtLink to="/auth/forgot-password" class="text-primary-600 hover:underline">
                Lupa password?
              </NuxtLink>
            </p>
            <AtamButton
              :hover="true" severity="primary-green" class="px-6 py-2 font-bold"
              @click="showLogin = !showLogin"
            >
              {{ showLogin ? 'Register' : 'Login' }}
            </AtamButton>
          </div>

          <div class="w-1/2 flex items-center justify-center px-10">
            <component :is="currentFormComponent" />
          </div>
        </div>
      </template>
    </AtamCard>
  </section>
</template>
