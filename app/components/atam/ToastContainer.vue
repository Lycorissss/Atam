<script setup lang="ts">
import { useAtamToast } from '../../composables/useAtamToast'

const { toasts } = useAtamToast()
</script>

<template>
  <div class="fixed top-5 right-5 z-[99] space-y-2">
    <div v-for="toast in toasts" :key="toast.id" :class="[
      'px-4 py-2 rounded shadow text-sm transition-all',
      toast.type === 'success' && 'bg-green-600 shadow-[5px_5px_0_#000000] border-black border-2 shadow-atam text-black',
      toast.type === 'error' && 'bg-red-500 text-white',
      toast.type === 'info' && 'bg-blue-500 text-white',
      toast.type === 'warning' && 'bg-yellow-400 text-black'
    ]">
      {{ toast.message }}
    </div>
  </div>
</template>
