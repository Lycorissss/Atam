<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { gsap } from 'gsap'

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
  if (v) openDialog()
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
      ease: 'power2.out'
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
    }
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
      v-if="show"
      ref="overlayRef"
      class="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm"
    >
      <div
        ref="dialogRef"
        class="w-full max-w-xs sm:max-w-sm rounded-2xl bg-lime-100 dark:bg-lime-300 text-black dark:text-white 
               border border-black/10 shadow-[0_4px_0_0_rgba(0,0,0,0.6)] px-4 py-5 space-y-3"
      >
        <h2 v-if="title" class="text-base font-bold">
          {{ title }}
        </h2>

        <div class="text-sm text-black/80 dark:text-white">
          <slot />
        </div>

        <div class="flex justify-end gap-3 pt-3 text-sm">
          <AtamButton
            @click="handleCancel"
            label="Cancel"
            severity="primary-blue"
            :outline="true"
          />
          <AtamButton
            @click="handleConfirm"
            label="Confirm"
            severity="primary-green"
          />
        </div>
      </div>
    </div>
  </teleport>
</template>
