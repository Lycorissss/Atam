<script setup lang="ts">
import gsap from 'gsap'
import { onMounted, ref, watch } from 'vue'

const props = defineProps<{
  modelValue: boolean
  label?: string
}>()

const emit = defineEmits(['update:modelValue'])

const checkboxRef = ref<HTMLInputElement | null>(null)
const boxWrapperRef = ref<HTMLDivElement | null>(null)

watch(
  () => props.modelValue,
  (val) => {
    gsap.to(boxWrapperRef.value, {
      scale: val ? 1.05 : 1,
      // backgroundColor: val ? '#000' : '#fff',
      duration: 0.2,
      ease: 'power2.out',
    })
  },
)

onMounted(() => {
  if (props.modelValue && boxWrapperRef.value) {
    gsap.set(boxWrapperRef.value, {
      backgroundColor: '#000',
      scale: 1.05,
    })
  }
})
</script>

<template>
  <label class="flex items-center space-x-3 cursor-pointer select-none">
    <div
      ref="boxWrapperRef"
      class="w-6 h-6 border-2 rounded-[5px] dark:bg-black border-black dark:border-white bg-white flex items-center justify-center transition-all duration-200"
    >
      <input
        ref="checkboxRef" type="checkbox" class="sr-only dark:bg-black" :checked="modelValue"
        @change="emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
      >
      <div
        v-if="modelValue"
        class="w-full h-full rounded-[5px] bg-yellow-300 shadow-[5px_3px_0_0_#000] dark:shadow-[5px_3px_0_0_#fff] flex items-center justify-center"
      >
        <svg
          class="w-4 h-4 text-black dark:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          stroke-width="3" stroke-linecap="square" stroke-linejoin="miter"
        >
          <polyline points="4 12 10 18 20 6" />
        </svg>
      </div>
    </div>

    <span class="font-bold text-black text-sm tracking-wide uppercase">
      {{ label }}
    </span>
  </label>
</template>
