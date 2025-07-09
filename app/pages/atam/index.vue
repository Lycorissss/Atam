<script setup lang="ts">
import { ref } from 'vue'
type ButtonVariant = {
  label: string
  propsObj: Record<string, boolean>
  rawCode: string
}

const copiedIndex = ref<string | null>(null)

const variants = ['primary-blue', 'primary-green', 'primary-red'] as const

const buttons: ButtonVariant[] = [
  { label: 'normal',         propsObj: { shadow: false, outline: false, hover: false }, rawCode: `<AtamButton severity="__SEVERITY__">Button</AtamButton>` },
  { label: 'shadow',         propsObj: { shadow: true,  outline: false, hover: false }, rawCode: `<AtamButton severity="__SEVERITY__" :shadow="true">Button</AtamButton>` },
  { label: 'hover',          propsObj: { hover: true,   shadow: false, outline: false }, rawCode: `<AtamButton severity="__SEVERITY__" :hover="true">Button</AtamButton>` },
  { label: 'outline',        propsObj: { outline: true, shadow: false, hover: false }, rawCode: `<AtamButton severity="__SEVERITY__" :outline="true">Button</AtamButton>` },
  { label: 'shadow-outline', propsObj: { outline: true, shadow: true,  hover: false }, rawCode: `<AtamButton severity="__SEVERITY__" :shadow="true" :outline="true">Button</AtamButton>` },
  { label: 'hover-outline',  propsObj: { outline: true, hover: true,   shadow: false }, rawCode: `<AtamButton severity="__SEVERITY__" :hover="true" :outline="true">Button</AtamButton>` },
  { label: 'hover-shadow',   propsObj: { hover: true, outline: false }, rawCode: `<AtamButton severity="__SEVERITY__" :hover="true">Button</AtamButton>` },
  { label: 'all-props',      propsObj: { hover: true,   shadow: true,  outline: true }, rawCode: `<AtamButton severity="__SEVERITY__" :hover="true" :shadow="true" :outline="true">Button</AtamButton>` },
]

function getCode(raw: string, severity: string): string {
  return raw.replace('__SEVERITY__', severity)
}

function copyToClipboard(code: string, id: string) {
  navigator.clipboard.writeText(code).then(() => {
    copiedIndex.value = id
    setTimeout(() => copiedIndex.value = null, 1000)
  })
}
</script>
<template>
  <div class="p-6 max-w-7xl mx-auto">
    <h1 class="text-3xl font-bold text-center mb-8">ATAM Button Documentation</h1>

    <div v-for="variant in variants" :key="variant" class="mb-10 border-b pb-6">
      <h2 class="text-xl font-semibold mb-4 capitalize">Variant: {{ variant.replace('primary-', '') }}</h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div
          v-for="btn in buttons"
          :key="btn.label + variant"
          class="w-full border rounded-xl dark:bg-gray-800 bg-white shadow-sm space-y-3 p-4 relative"
        >
          <!-- ✅ Tombol Asli -->
          <div class="flex flex-col items-center space-y-3">
            <label class="text-sm font-medium">{{ btn.label }}</label>
            <AtamButton
              :severity="variant"
              v-bind="btn.propsObj"
            >
              Button
            </AtamButton>
          </div>

          <!-- 📋 Code Viewer -->
          <div class="relative bg-gray-100  dark:bg-gray-900 rounded-lg p-3 text-sm font-mono text-left">
            <button
              class="absolute top-2 right-2 dark:text-white text-xs dark:bg-gray-700 bg-white border px-2 py-1 rounded hover:bg-gray-200"
              @click="copyToClipboard(getCode(btn.rawCode, variant), btn.label + variant)"
            >
              {{ copiedIndex === btn.label + variant ? 'Copied!' : 'Copy' }}
            </button>
            <code class="text-gray-800 block dark:text-white pr-12 whitespace-pre-wrap break-all">
              {{ getCode(btn.rawCode, variant) }}
            </code>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
