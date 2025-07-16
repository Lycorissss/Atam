<script setup lang="ts">
import { gsap } from 'gsap'
import { nextTick, ref, watch } from 'vue'

const props = defineProps<{
  visible: boolean
  title?: string
}>()

const emit = defineEmits<{
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()

const show = ref(false)
const dialogRef = ref<HTMLDivElement | null>(null)
const overlayRef = ref<HTMLDivElement | null>(null)

watch(() => props.visible, (v) => {
  if (v)
    openDialog()
  else closeDialog()
})

function openDialog() {
  show.value = true
  nextTick(() => {
    gsap.fromTo(overlayRef.value, { opacity: 0 }, { opacity: 1, duration: 0.2 })
    gsap.fromTo(dialogRef.value, { scale: 0.9, opacity: 0 }, {
      scale: 1,
      opacity: 1,
      duration: 0.25,
      ease: 'power2.out',
    })
  })
}

function closeDialog() {
  gsap.to(dialogRef.value, {
    scale: 0.95,
    opacity: 0,
    duration: 0.2,
    ease: 'power2.in',
    onComplete: () => {
      show.value = false
    },
  })
  gsap.to(overlayRef.value, { opacity: 0, duration: 0.2 })
}

function handleCancel() {
  emit('cancel')
}

function handleConfirm() {
  emit('confirm')
}
</script>

<template>
  <teleport to="body">
    <div
      v-if="show" ref="overlayRef"
      class="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-[1px]"
    >
      <div
        ref="dialogRef" class="w-full max-w-xs sm:max-w-sm
               rounded-md bg-white dark:bg-black
               border-[3px] border-black
               shadow-[8px_8px_0_#000]
               text-black dark:text-white px-5 py-6 space-y-4
               transition-all duration-300"
      >
        <h2 v-if="title" class="text-base font-extrabold uppercase tracking-wide">
          {{ title }}
        </h2>

        <div class="text-sm text-black dark:text-white">
          <slot />
        </div>

        <div class="flex justify-end gap-3 pt-4 text-sm">
          <AtamButton label="Cancel" severity="primary-red" :hover="true" @click="handleCancel" />
          <AtamButton label="Confirm" :hover="true" severity="primary-green" @click="handleConfirm" />
        </div>
      </div>
    </div>
  </teleport>
</template>
