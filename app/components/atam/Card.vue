<script setup lang="ts">
import type { CardPassThroughOptions, CardProps } from 'primevue/card'
import { gsap } from 'gsap'
import Card from 'primevue/card'
import { computed, defineProps, onMounted } from 'vue'
import { ptViewMerge } from './utils'

// Props tambahan untuk kontrol style
interface AtamCardProps extends /* @vue-ignore */ CardProps {
  hover?: boolean
  shadow?: boolean
  outline?: boolean
  severity?: string // Fleksibel untuk menerima format seperti "red-100", "blue-300", dll
}

const props = withDefaults(defineProps<AtamCardProps>(), {
  hover: false,
  shadow: false,
  outline: false,
  severity: 'blue-300',
})

// Fungsi untuk mendapatkan kelas warna berdasarkan severity
function getSeverityClasses(severity: string): string {
  // Jika severity sudah dalam format yang benar (contoh: "red-100", "blue-300")
  if (severity.includes('-')) {
    return `bg-${severity}`
  }

  // Fallback untuk nama warna sederhana
  const colorMap: Record<string, string> = {
    'primary': 'bg-[var(--lilac-200)]',
    'primary-green': 'bg-green-300',
    'primary-red': 'bg-red-300',
    'blue': 'bg-blue-300',
    'green': 'bg-green-300',
    'red': 'bg-red-300',
    'yellow': 'bg-yellow-300',
    'purple': 'bg-purple-300',
    'orange': 'bg-orange-300',
    'gray': 'bg-gray-300',
  }

  return colorMap[severity] || `bg-${severity}-300`
}

// Hitung kelas root berdasarkan props
const rootClasses = computed(() => {
  const classes: string[] = [
    'flex',
    'flex-col',
    'text-black',
    'rounded-2xl',
  ]

  // Tambahkan warna background berdasarkan severity
  if (props.severity) {
    classes.push(getSeverityClasses(props.severity))
  }
  else {
    classes.push('bg-[#fbfbfb]', 'dark:bg-lime-300')
  }

  // Border: agar hanya tampil jika outline
  if (props.outline) {
    classes.push('border-[3.7px]', 'border-black')
  }

  // Shadow statis
  if (props.shadow) {
    classes.push('sahdow-atam')
  }

  // Hover-shadow
  if (props.hover) {
    classes.push('hover:shadow-[5px_5px_0_#000]', 'transition-shadow', 'duration-200')
  }

  return classes.join(' ')
})

// Passthrough theme dinamis
const theme = computed<CardPassThroughOptions>(() => ({
  root: { class: rootClasses.value },
  header: { class: 'relative flex items-center justify-center px-5 pt-4 text-[1.5rem]' },
  body: { class: 'p-5 flex flex-col gap-2' },
  caption: { class: 'flex flex-col gap-2' },
  title: { class: 'font-medium text-xl' },
  subtitle: { class: 'text-gray-500' },
  content: { class: '' },
  footer: { class: '' },
}))

onMounted(() => {
  gsap.from('.card-header-line', {
    scaleX: 0,
    duration: 0.5,
    ease: 'power2.out',
    transformOrigin: 'center',
    stagger: 0.1,
  })
})
</script>

<template>
  <Card unstyled :pt="theme" :pt-options="{ mergeProps: ptViewMerge }">
    <template v-for="(_, slotName) in $slots" #[slotName]="slotProps">
      <template v-if="slotName === 'header'">
        <div class="absolute left-0 top-12 h-[3px] w-13 bg-black rounded-sm card-header-line rounded-bl-none rounded-tl-none" />
        <div class="absolute left-0 top-14 h-[3px] w-6 bg-black rounded-sm rounded-bl-none rounded-tl-none card-header-line" />
        <div class="absolute right-0 top-12 h-[3px] w-18 bg-black rounded-br-none rounded-tr-none rounded-sm card-header-line" />
        <div class="absolute right-0 top-14 h-[3px] w-5 bg-black rounded-br-none rounded-tr-none rounded-sm card-header-line" />
      </template>
      <slot :name="slotName" v-bind="slotProps ?? {}" />
    </template>
  </Card>
</template>
