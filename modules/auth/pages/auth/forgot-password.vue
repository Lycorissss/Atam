<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  middleware: ['guest-client'],
  title: 'Lupa Password',
})

const email = ref('')
const isPending = ref(false)
const toast = useToast()

async function requestReset() {
  try {
    isPending.value = true
    await $fetch('/api/auth/request-password-reset', {
      method: 'POST',
      body: { email: email.value },
    })
    toast.add({
      type: 'success',
      title: 'Berhasil',
      description: 'Cek email Anda untuk link reset password.',
    })
    email.value = ''
  }
  catch (err: any) {
    toast.add({
      type: 'error',
      title: 'Gagal',
      description: err?.data?.message || 'Gagal mengirim email reset',
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
      Reset Password
    </h1>

    <div class="space-y-4">
      <CoreInputText v-model="email" placeholder="Masukkan email Anda" />

      <CoreButton
        :label="isPending ? 'Mengirim...' : 'Kirim Link Reset'"
        :disabled="!email"
        class="w-full"
        @click="requestReset"
      />
    </div>
  </section>
</template>
