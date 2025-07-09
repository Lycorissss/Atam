<script setup lang="ts">
import { ref } from 'vue'

type ButtonVariant = {
  label: string
  propsObj: Record<string, boolean>
  rawCode: string
}

const copiedIndex = ref<string | null>(null)

const variants = ['primary-blue', 'primary-green', 'primary-red']

const buttons: ButtonVariant[] = [
  {
    label: 'normal',
    propsObj: { shadow: false, outline: false },
    rawCode: `<AtamButton severity="__SEVERITY__">Button</AtamButton>`,
  },
  {
    label: 'shadow',
    propsObj: { shadow: true, outline: false },
    rawCode: `<AtamButton severity="__SEVERITY__" :shadow="true" >Button</AtamButton>`,
  },
  {
    label: 'hover',
    propsObj: { hover: true, shadow: false, outline: false },
    rawCode: `<AtamButton severity="__SEVERITY__" :hover="true">Button</AtamButton>`,
  },
  {
    label: 'outline',
    propsObj: { shadow: false, outline: true },
    rawCode: `<AtamButton severity="__SEVERITY__"outline="true">Button</AtamButton>`,
  },
  {
    label: 'shadow-outline',
    propsObj: { hover: true, shadow: true, outline: true },
    rawCode: `<AtamButton severity="__SEVERITY__" :shadow="true" :outline="true">Button</AtamButton>`,
  },
  {
    label: 'hover-outline',
    propsObj: { hover: true, shadow: false, outline: true },
    rawCode: `<AtamButton severity="__SEVERITY__" :hover="true" :outline="true">Button</AtamButton>`,
  },
]

function fallbackCopyTextToClipboard(text: string, id: string) {
  const textArea = document.createElement('textarea')
  textArea.value = text
  
  // Buat elemen tidak terlihat
  textArea.style.position = 'fixed'
  textArea.style.top = '0'
  textArea.style.left = '0'
  textArea.style.width = '2em'
  textArea.style.height = '2em'
  textArea.style.padding = '0'
  textArea.style.border = 'none'
  textArea.style.outline = 'none'
  textArea.style.boxShadow = 'none'
  textArea.style.background = 'transparent'
  
  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()
  
  try {
    const successful = document.execCommand('copy')
    if (successful) {
      copiedIndex.value = id
      setTimeout(() => (copiedIndex.value = null), 1000)
    } else {
      console.error('Fallback copy gagal')
    }
  } catch (err) {
    console.error('Fallback copy error:', err)
  }
  
  document.body.removeChild(textArea)
}


function copyToClipboard(code: string, id: string) {
  // Coba menggunakan modern clipboard API
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(code)
      .then(() => {
        copiedIndex.value = id
        setTimeout(() => (copiedIndex.value = null), 1000)
      })
      .catch((err) => {
        console.error('Clipboard API gagal:', err)
        // Fallback ke metode lama
        fallbackCopyTextToClipboard(code, id)
      })
  } else {
    // Fallback untuk browser yang tidak mendukung clipboard API
    fallbackCopyTextToClipboard(code, id)
  }
}
</script>

<template>
  <div class="p-6 max-w-7xl mx-auto">
    <h1 class="text-3xl font-bold text-center mb-8">ATAM Button Documentation</h1>

    <div>
      <div v-for="variant in variants" :key="variant" class="mb-10 border-b pb-6">
        <h2 class="text-xl font-semibold mb-4 capitalize text-gray-700">
          Variant: {{ variant.replace('primary-', '') }}
        </h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div
            v-for="btn in buttons"
            :key="btn.label + variant"
            class="w-full border rounded-xl bg-white shadow-sm space-y-3 p-4 relative"
          >
            <!-- Preview -->
            <div class="flex flex-col items-center space-y-1">
              <label class="text-sm text-gray-600">{{ btn.label }}</label>
              <AtamButton :severity="variant as 'primary-blue' | 'primary-green' | 'primary-red'" v-bind="btn.propsObj">
                Button
              </AtamButton>
            </div>

            <!-- Code -->
            <div class="relative dark:bg-gray-800 dark:text-black bg-gray-100 rounded-lg p-3 text-sm font-mono whitespace-pre-wrap text-left">
              <button
                class="absolute top-2 right-2 text-xs bg-white border px-2 py-1 rounded hover:bg-gray-200"
                @click="copyToClipboard(btn.rawCode.replace('__SEVERITY__', variant), btn.label + variant)"
              >
                {{ copiedIndex === btn.label + variant ? 'Copied!' : 'Copy' }}
              </button>
              <code>{{ btn.rawCode.replace('__SEVERITY__', variant) }}</code>
            </div>
          </div>
        </div>
      </div>

      <!-- Penjelasan -->
      <div class="p-4 bg-white border rounded-xl shadow-sm">
        <h2 class="text-xl font-semibold mb-4">Penjelasan Properti</h2>
        <ul class="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-100">
          <li><code>severity</code>: Warna/tema utama tombol (primary-blue, green, red).</li>
          <li><code>shadow</code>: Aktifkan efek bayangan pada tombol.</li>
          <li><code>outline</code>: Aktifkan gaya outline.</li>
          <li><code>hover</code>: Aktifkan gaya saat tombol di-hover (jika disediakan).</li>
        </ul>
        <p class="mt-4 text-sm text-gray-600 dark:text-gray-100">
          Klik tombol <strong>Copy</strong> untuk menyalin langsung kode implementasi tombol sesuai kebutuhanmu.
        </p>
      </div>
    </div>
  </div>
</template>
