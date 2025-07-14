<script setup lang="ts">
import { ref } from 'vue'

const copied = ref<string | null>(null)
const name = ref('')
const gender = ref('')
const birthdate = ref('')
const description = ref('')
const agreed = ref(false)

const options = [
  { label: 'Laki-laki', value: 'male' },
  { label: 'Perempuan', value: 'female' },
]

function copy(codeId: string, code: string) {
  navigator.clipboard.writeText(code).then(() => {
    copied.value = codeId
    setTimeout(() => (copied.value = null), 1000)
  })
}

const code = {
  input: `<AtamInput
  v-model="name"
  label="Nama Lengkap"
  placeholder="Masukkan nama anda"
  hint="Gunakan nama asli"
  required
/>`,

  select: `<AtamSelect
  v-model="gender"
  :options="[
    { label: 'Laki-laki', value: 'male' },
    { label: 'Perempuan', value: 'female' }
  ]"
  label="Jenis Kelamin"
  placeholder="Pilih jenis kelamin"
  hint="Wajib diisi"
  required
/>`,

  date: `<AtamDate
  v-model="birthdate"
  label="Tanggal Lahir"
  hint="Format: yyyy-mm-dd"
/>`,

  textarea: `<AtamTextarea
  v-model="description"
  label="Tentang Anda"
  placeholder="Ceritakan sedikit tentang dirimu"
  hint="Opsional"
/>`,

  checkbox: `<AtamCheckbox
  v-model="agreed"
  label="Saya menyetujui syarat dan ketentuan"
/>`,
}
</script>

<template>
  <div class="p-6 max-w-4xl mx-auto space-y-12">
    <h1 class="text-3xl font-bold text-center mb-8">ATAM Input Components Documentation</h1>

    <!-- AtamInput -->
    <section class="space-y-3">
      <h2 class="text-xl font-semibold">AtamInput</h2>
      <AtamInput
        v-model="name"
        label="Nama Lengkap"
        placeholder="Masukkan nama anda"
        hint="Gunakan nama asli"
        required
      />
      <div class="relative bg-gray-100 p-4 rounded-md font-mono text-sm">
        <button
          class="absolute top-2 right-2 text-xs bg-white border px-2 py-1 rounded hover:bg-gray-200"
          @click="copy('input', code.input)"
        >
          {{ copied === 'input' ? 'Copied!' : 'Copy' }}
        </button>
        <code class="whitespace-pre-wrap block text-gray-800">{{ code.input }}</code>
      </div>
    </section>

    <!-- AtamSelect -->
    <section class="space-y-3">
      <h2 class="text-xl font-semibold">AtamSelect</h2>
      <AtamSelect
        v-model="gender"
        :options="options"
        label="Jenis Kelamin"
        placeholder="Pilih jenis kelamin"
        hint="Wajib diisi"
        required
      />
      <div class="relative bg-gray-100 p-4 rounded-md font-mono text-sm">
        <button
          class="absolute top-2 right-2 text-xs bg-white border px-2 py-1 rounded hover:bg-gray-200"
          @click="copy('select', code.select)"
        >
          {{ copied === 'select' ? 'Copied!' : 'Copy' }}
        </button>
        <code class="whitespace-pre-wrap block text-gray-800">{{ code.select }}</code>
      </div>
    </section>

    <!-- AtamDate -->
    <section class="space-y-3">
      <h2 class="text-xl font-semibold">AtamDate</h2>
      <AtamDate v-model="birthdate" label="Tanggal Lahir" hint="Format: yyyy-mm-dd" />
      <div class="relative bg-gray-100 p-4 rounded-md font-mono text-sm">
        <button
          class="absolute top-2 right-2 text-xs bg-white border px-2 py-1 rounded hover:bg-gray-200"
          @click="copy('date', code.date)"
        >
          {{ copied === 'date' ? 'Copied!' : 'Copy' }}
        </button>
        <code class="whitespace-pre-wrap block text-gray-800">{{ code.date }}</code>
      </div>
    </section>

    <!-- AtamTextarea -->
    <section class="space-y-3">
      <h2 class="text-xl font-semibold">AtamTextarea</h2>
      <AtamTextarea
        v-model="description"
        label="Tentang Anda"
        placeholder="Ceritakan sedikit tentang dirimu"
        hint="Opsional"
      />
      <div class="relative bg-gray-100 p-4 rounded-md font-mono text-sm">
        <button
          class="absolute top-2 right-2 text-xs bg-white border px-2 py-1 rounded hover:bg-gray-200"
          @click="copy('textarea', code.textarea)"
        >
          {{ copied === 'textarea' ? 'Copied!' : 'Copy' }}
        </button>
        <code class="whitespace-pre-wrap block text-gray-800">{{ code.textarea }}</code>
      </div>
    </section>

    <!-- AtamCheckbox -->
    <section class="space-y-3">
      <h2 class="text-xl font-semibold">AtamCheckbox</h2>
      <AtamCheckbox v-model="agreed" label="Saya menyetujui syarat dan ketentuan" />
      <div class="relative bg-gray-100 p-4 rounded-md font-mono text-sm">
        <button
          class="absolute top-2 right-2 text-xs bg-white border px-2 py-1 rounded hover:bg-gray-200"
          @click="copy('checkbox', code.checkbox)"
        >
          {{ copied === 'checkbox' ? 'Copied!' : 'Copy' }}
        </button>
        <code class="whitespace-pre-wrap block text-gray-800">{{ code.checkbox }}</code>
      </div>
    </section>
  </div>
</template>
