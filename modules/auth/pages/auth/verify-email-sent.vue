<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  middleware: ['guest-client'],
})
</script>

<template>
  <section class="max-w-md mx-auto py-20 text-center">
    <h1 class="text-2xl font-bold mb-4 text-green-600">
      Verifikasi Email Terkirim
    </h1>
    <p class="text-gray-700">
      Kami telah mengirimkan tautan verifikasi ke alamat email kamu.<br>
      Silakan cek kotak masuk dan ikuti instruksi di email untuk mengaktifkan akunmu.
    </p>

    <div class="mt-6">
      <NuxtLink
        to="/auth/login"
        class="text-blue-500 hover:underline font-medium"
      >
        ← Kembali ke halaman login
      </NuxtLink>
    </div>
  </section>
</template>
