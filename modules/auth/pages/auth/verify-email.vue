<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  middleware: ['guest-client'],
})

const route = useRoute()
const token = route.query.token as string

const { data, error, pending } = useFetch('/api/auth/verify-email', {
  method: 'POST',
  body: { token },
  immediate: Boolean(token),
})

const isUsed = computed(() => {
  const detail = error.value?.data?.detail
  const msg = error.value?.data?.message
  return detail === 'Token has already been used' || msg === 'Token has already been used'
})

const success = computed(() => data.value?.success && !error.value)
</script>

<template>
  <section class="max-w-md mx-auto py-20 text-center">
    <h1 class="text-2xl font-bold mb-6">
      Verifikasi Email
    </h1>

    <div v-if="pending">
      Memverifikasi token...
    </div>

    <div v-else-if="success">
      <p class="text-green-600 font-semibold">
        ✅ Email berhasil diverifikasi!
      </p>
      <p class="mt-2">
        Silakan login untuk melanjutkan.
      </p>
      <NuxtLink to="/auth/login" class="text-blue-500 underline mt-4 inline-block">
        Login
      </NuxtLink>
    </div>

    <div v-else-if="isUsed">
      <p class="text-yellow-500 font-semibold">
        ⚠️ Token sudah pernah digunakan.
      </p>
      <p class="mt-2 text-sm">
        Kemungkinan akun Anda sudah aktif.
      </p>
      <NuxtLink to="/auth/login" class="text-blue-500 underline mt-4 inline-block">
        Login
      </NuxtLink>
    </div>

    <div v-else>
      <p class="text-red-600 font-semibold">
        ❌ Verifikasi gagal.
      </p>
      <p class="mt-2 text-sm">
        Token tidak valid atau sudah kedaluwarsa.
      </p>
    </div>
  </section>
</template>
