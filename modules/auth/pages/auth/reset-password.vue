<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  middleware: ['guest-client'],
  title: 'Reset Password',
})

const route = useRoute()
const token = route.query.token as string

const newPassword = ref('')
const confirmPassword = ref('')
const isPending = ref(false)
const toast = useToast()

async function resetPassword() {
  if (!token) {
    toast.add({
      type: 'error',
      title: 'Token tidak ditemukan',
      description: 'Silakan klik ulang link dari email Anda.',
    })
    return
  }

  if (newPassword.value !== confirmPassword.value) {
    toast.add({
      type: 'error',
      title: 'Password tidak cocok',
      description: 'Konfirmasi password harus sama.',
    })
    return
  }

  try {
    isPending.value = true
    await $fetch('/api/auth/reset-password', {
      method: 'POST',
      body: {
        token,
        new_password: newPassword.value,
        confirm_password: confirmPassword.value,
      },
    })

    toast.add({
      type: 'success',
      title: 'Berhasil',
      description: 'Password Anda berhasil direset.',
    })

    navigateTo('/auth/login')
  }
  catch (err: any) {
    toast.add({
      type: 'error',
      title: 'Gagal',
      description: err?.data?.message || 'Reset password gagal',
    })
  }
  finally {
    isPending.value = false
  }
}
</script>

<template>
  <section class="max-w-md mx-auto py-20">
    <h1 class="text-2xl font-bold text-center mb-6">
      Buat Password Baru
    </h1>

    <div class="space-y-4">
      <CoreInputText
        v-model="newPassword"
        type="password"
        placeholder="Password baru"
      />

      <CoreInputText
        v-model="confirmPassword"
        type="password"
        placeholder="Konfirmasi password"
      />

      <CoreButton
        :label="isPending ? 'Menyimpan...' : 'Simpan Password'"
        :disabled="!newPassword || !confirmPassword"
        class="w-full"
        @click="resetPassword"
      />
    </div>
  </section>
</template>
