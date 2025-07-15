<script setup lang="ts">
import { gsap } from 'gsap'
import { nextTick, onMounted, ref } from 'vue'

const rows = ref(12)
const cols = ref(10)

onMounted(() => {
  nextTick(() => {
    gsap.from('.brute-box', {
      opacity: 0,
      scale: 0.6,
      duration: 1,
      ease: 'expo.out',
      stagger: {
        amount: 1.5,
        grid: [rows.value, cols.value],
        from: 'center',
      },
    })
  })
})
</script>

<template>
  <div class=" inset-0 pointer-events-none select-none">
    <div
      class="grid w-full h-full"
      :style="{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      }"
    >
      <div
        v-for="i in rows * cols"
        :key="i"
        class="brute-box w-full h-full border-1 border-black dark:border-white"
        :class="i % 2 === 0 ? 'bg-yellow-300/40 dark:bg-yellow-500/20' : 'bg-purple-300/40 dark:bg-purple-500/20'"
      />
    </div>
  </div>
</template>
