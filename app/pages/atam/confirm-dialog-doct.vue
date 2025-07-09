<script setup lang="ts">
import { ref } from 'vue'
import { useToast } from '~/composables/useToast'

const showDialog = ref(false)
const copied = ref(false)
const { showToast } = useToast()

const rawCode = `<script setup lang="ts">
import { ref } from 'vue'
import AtamConfirmDialog from '~/components/atam/confirm-dialog.vue'
import { useToast } from '~/composables/useToast'

const showDialog = ref(false)
const { showToast } = useToast()

function onDelete() {
  showToast('Item deleted!', 'success')
  showDialog.value = false
}
<\/script>

<template>
  <button @click="showDialog = true" class="bg-red-600 text-white px-4 py-2 rounded">
    Delete
  </button>

  <AtamConfirmDialog
    :visible="showDialog"
    title="Are you sure?"
    @cancel="showDialog = false"
    @confirm="onDelete"
  >
    This action cannot be undone. Do you really want to delete this item?
  </AtamConfirmDialog>
<\/template>`

function copyToClipboard() {
  navigator.clipboard.writeText(rawCode).then(() => {
    copied.value = true
    setTimeout(() => (copied.value = false), 1000)
  })
}

function onDelete() {
  showToast('Item deleted cuki! ', 'success') // ✅ Ganti alert!
  showDialog.value = false
}
</script>

<template>
  <div class="p-6 max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold text-center mb-8">🧾 ATAM ConfirmDialog Documentation</h1>

    <!-- Demo Area -->
    <div class="mb-8 space-y-4">
      <button
        @click="showDialog = true"
        class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
      >
        Delete Item
      </button>

      <AtamConfirmDialog
        :visible="showDialog"
        title="Are you sure?"
        @cancel="showDialog = false"
        @confirm="onDelete"
      >
        This action cannot be undone. Do you really want to delete this item?
      </AtamConfirmDialog>
    </div>

    <!-- Copyable Code Area -->
    <div class="relative bg-gray-100 p-4 rounded-md font-mono text-sm">
      <button
        class="absolute top-2 right-2 text-xs bg-white border px-2 py-1 rounded hover:bg-gray-200"
        @click="copyToClipboard"
      >
        {{ copied ? 'Copied!' : 'Copy' }}
      </button>
      <code class="whitespace-pre-wrap block text-gray-800">{{ rawCode }}</code>
    </div>

    <!-- Explanation -->
    <div class="bg-white mt-8 p-4 rounded border text-sm space-y-3">
      <h2 class="font-semibold text-lg mb-2">Penjelasan Properti:</h2>
      <ul class="list-disc list-inside text-gray-700">
        <li><code>visible</code>: kontrol dialog tampil atau tidak (Boolean)</li>
        <li><code>title</code>: teks di atas dialog (opsional)</li>
        <li><code>@confirm</code>: emit saat klik tombol <strong>Confirm</strong></li>
        <li><code>@cancel</code>: emit saat klik <strong>Cancel</strong> atau close</li>
      </ul>
    </div>

    <!-- Tips -->
    <div class="mt-6 p-4 bg-lime-50 rounded-lg text-lime-900">
      <strong>💡 Tips:</strong> Dialog ini menggunakan animasi <code>GSAP</code> dan bisa kamu kustomisasi lebih lanjut. Misalnya: transisi bounce, scale, fade-in-out, dll.
    </div>
  </div>
</template>
