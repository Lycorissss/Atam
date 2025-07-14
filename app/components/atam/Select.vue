<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { gsap } from 'gsap'
import FieldWrapper from './FieldWrapper.vue'

const props = defineProps<{
  modelValue: string | number
  options: { label: string; value: string | number }[]
  label?: string
  placeholder?: string
  error?: string
  required?: boolean
  hint?: string
}>()

const emit = defineEmits(['update:modelValue'])

const selectRef = ref<HTMLSelectElement | null>(null)
const arrowRef = ref<SVGSVGElement | null>(null)
const isOpen = ref(false)

function handleChange(event: Event) {
  emit('update:modelValue', (event.target as HTMLSelectElement)?.value)
  // Tutup arrow saat memilih
  isOpen.value = false
}

onMounted(() => {
  const el = selectRef.value
  if (!el) return

  el.addEventListener('mousedown', () => {
    isOpen.value = true
  })

  el.addEventListener('blur', () => {
    isOpen.value = false
  })

  el.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      isOpen.value = false
    }
  })
})

// GSAP animasi panah
watch(isOpen, (val) => {
  gsap.to(arrowRef.value, {
    rotate: val ? 180 : 0,
    duration: 0.25,
    ease: 'power2.out',
  })
})
</script>

<template>
  <FieldWrapper :label="label" :error="error" :hint="hint" :required="required">
    <div class="relative w-full">
      <select
        ref="selectRef"
        class="appearance-none w-full px-3 py-2 border-2 border-black dark:border-white dark:bg-black dark:text-white bg-white text-black font-semibold rounded-full shadow-[5px_5px_0_0_#000] dark:shadow-[5px_5px_0_0_#fff] focus:outline-none focus:ring-2 focus:ring-primary-500"
        :value="modelValue"
        @change="handleChange"
      >
        <option disabled value="">{{ placeholder || 'Pilih salah satu' }}</option>
        <option v-for="opt in options" :key="opt.value" :value="opt.value">
          {{ opt.label }}
        </option>
      </select>

      <!-- Animated arrow -->
      <div class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-black dark:text-white">
        <svg
          ref="arrowRef"
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 transform"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  </FieldWrapper>
</template>
