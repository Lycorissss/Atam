<script setup lang="ts">
import { ref } from 'vue'

// State untuk preview
const name = ref('')
const email = ref('')
const password = ref('')
const age = ref<number | null>(null)
const gender = ref('')
const birthdate = ref('')
const description = ref('')
const agreed = ref(false)
const isChecked = ref<boolean>(false)

// Options untuk select
const genderOptions = [
  { label: 'Laki-laki', value: 'male' },
  { label: 'Perempuan', value: 'female' },
]

// Snippet kode
const inputCode = `<AtamInput
  v-model="name"
  label="Nama Lengkap"
  placeholder="Masukkan nama anda"
  hint="Gunakan nama asli"
  required
/>`

const emailCode = `<AtamInput
  v-model="email"
  label="Email"
  placeholder="contoh@email.com"
  type="email"
  required
/>`

const passwordCode = `<AtamInput
  v-model="password"
  label="Password"
  placeholder="••••••••"
  type="password"
  required
/>`

const numberCode = `<AtamInput
  v-model="age"
  label="Umur"
  type="number"
  placeholder="Masukkan umur"
/>`

const selectCode = `
<AtamSelect 
        v-model="gender"
        :options="genderOptions"
        optionLabel="label" 
        optionValue="value"
        placeholder="Pilih jenis kelamin"
        unstyled label="Jenis Kelamin"
        hint="Wajib diisi" 
        required />`

const dateCode = `<AtamDate
  v-model="birthdate"
  label="Tanggal Lahir"
  hint="Format: yyyy-mm-dd"
/>`

const textareaCode = `<AtamTextarea
  v-model="description"
  label="Tentang Anda"
  placeholder="Ceritakan sedikit tentang dirimu"
  hint="Opsional"
/>`

const checkboxCode = `<AtamCheckbox
  v-model="agreed"
  label="Saya menyetujui syarat dan ketentuan"
/>`
const swicthCode = `<AtamToggleSwitch
  v-model="isChecked" 
  :true-value="1" 
  :false-value="0" 
  input-id="darkMode" 
  name="darkMode"
  hint="Toggle untuk dark mode" 
  required>
</AtamToggleSwitch>`

// Copy helper
const copied = ref<string | null>(null)
function copy(id: string, text: string) {
  navigator.clipboard.writeText(text).then(() => {
    copied.value = id
    setTimeout(() => copied.value = null, 1200)
  })
}
</script>

<template>
  <div class="p-6 max-w-3xl mx-auto space-y-12">
    <h1 class="text-3xl font-bold text-center mb-6">
      ATAM Input Components Documentation
    </h1>

    <!-- Text Input -->
    <section class="space-y-2">
      <h2 class="text-2xl font-semibold">
        Text Input
      </h2>
      <AtamInput
        v-model="name" label="Nama Lengkap" placeholder="Masukkan nama anda" hint="Gunakan nama asli"
        required
      />
      <div class="relative bg-gray-100 dark:bg-gray-800 p-4 rounded-md font-mono text-sm">
        <button
          class="absolute top-2 right-2 text-xs bg-white dark:bg-black border px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          @click="copy('input', inputCode)"
        >
          {{ copied === 'input' ? 'Copied!' : 'Copy' }}
        </button>
        <pre class="overflow-x-auto"><code class="text-gray-800 dark:text-gray-100">{{ inputCode }}</code></pre>
      </div>
    </section>

    <!-- Email Input -->
    <section class="space-y-2">
      <h2 class="text-2xl font-semibold">
        Email Input
      </h2>
      <AtamInput v-model="email" label="Email" placeholder="contoh@email.com" type="email" required />
      <div class="relative bg-gray-100 dark:bg-gray-800 p-4 rounded-md font-mono text-sm">
        <button
          class="absolute top-2 right-2 text-xs bg-white dark:bg-black border px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          @click="copy('email', emailCode)"
        >
          {{ copied === 'email' ? 'Copied!' : 'Copy' }}
        </button>
        <pre class="overflow-x-auto"><code class="text-gray-800 dark:text-gray-100">{{ emailCode }}</code></pre>
      </div>
    </section>

    <!-- Password Input -->
    <section class="space-y-2">
      <h2 class="text-2xl font-semibold">
        Password Input
      </h2>
      <AtamInput v-model="password" label="Password" placeholder="••••••••" type="password" required />
      <div class="relative bg-gray-100 dark:bg-gray-800 p-4 rounded-md font-mono text-sm">
        <button
          class="absolute top-2 right-2 text-xs bg-white dark:bg-black border px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          @click="copy('password', passwordCode)"
        >
          {{ copied === 'password' ? 'Copied!' : 'Copy' }}
        </button>
        <pre class="overflow-x-auto"><code class="text-gray-800 dark:text-gray-100">{{ passwordCode }}</code></pre>
      </div>
    </section>

    <!-- Number Input -->
    <section class="space-y-2">
      <h2 class="text-2xl font-semibold">
        Number Input
      </h2>
      <AtamInput v-model="age" label="Umur" type="number" placeholder="Masukkan umur" />
      <div class="relative bg-gray-100 dark:bg-gray-800 p-4 rounded-md font-mono text-sm">
        <button
          class="absolute top-2 right-2 text-xs bg-white dark:bg-black border px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          @click="copy('number', numberCode)"
        >
          {{ copied === 'number' ? 'Copied!' : 'Copy' }}
        </button>
        <pre class="overflow-x-auto"><code class="text-gray-800 dark:text-gray-100">{{ numberCode }}</code></pre>
      </div>
    </section>

    <!-- Select Input -->
    <section class="space-y-2">
      <h2 class="text-2xl font-semibold">
        Select Input
      </h2>
      <p>
        in script : <br>
        const genderOptions = [ <br>
        { label: 'Laki-laki', value: 'male' }, <br>
        { label: 'Perempuan', value: 'female' }, <br>
        ]
      </p>
      <AtamSelect
        v-model="gender" :options="genderOptions" option-label="label" option-value="value"
        placeholder="Pilih jenis kelamin" unstyled label="Jenis Kelamin" hint="Wajib diisi" required
      />
      <div class="relative bg-gray-100 dark:bg-gray-800 p-4 rounded-md font-mono text-sm">
        <button
          class="absolute top-2 right-2 text-xs bg-white dark:bg-black border px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          @click="copy('select', selectCode)"
        >
          {{ copied === 'select' ? 'Copied!' : 'Copy' }}
        </button>
        <pre class="overflow-x-auto"><code class="text-gray-800 dark:text-gray-100">{{ selectCode }}</code></pre>
      </div>
    </section>

    <!-- Date Input -->
    <section class="space-y-2">
      <h2 class="text-2xl font-semibold">
        Date Input
      </h2>
      <AtamDate v-model="birthdate" label="Tanggal Lahir" hint="Format: yyyy-mm-dd" placeholder="Date of birth" />
      <div class="relative bg-gray-100 dark:bg-gray-800 p-4 rounded-md font-mono text-sm">
        <button
          class="absolute top-2 right-2 text-xs bg-white dark:bg-black border px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          @click="copy('date', dateCode)"
        >
          {{ copied === 'date' ? 'Copied!' : 'Copy' }}
        </button>
        <pre class="overflow-x-auto"><code class="text-gray-800 dark:text-gray-100">{{ dateCode }}</code></pre>
      </div>
    </section>

    <!-- Textarea Input -->
    <section class="space-y-2">
      <h2 class="text-2xl font-semibold">
        Textarea Input
      </h2>
      <AtamTextarea
        v-model="description" label="Tentang Anda" placeholder="Ceritakan sedikit tentang dirimu"
        hint="Opsional"
      />
      <div class="relative bg-gray-100 dark:bg-gray-800 p-4 rounded-md font-mono text-sm">
        <button
          class="absolute top-2 right-2 text-xs bg-white dark:bg-black border px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          @click="copy('textarea', textareaCode)"
        >
          {{ copied === 'textarea' ? 'Copied!' : 'Copy' }}
        </button>
        <pre class="overflow-x-auto"><code class="text-gray-800 dark:text-gray-100">{{ textareaCode }}</code></pre>
      </div>
    </section>

    <!-- Checkbox Input -->
    <section class="space-y-2">
      <h2 class="text-2xl font-semibold">
        Checkbox Input
      </h2>
      <AtamCheckbox v-model="agreed" label="Saya menyetujui syarat dan ketentuan" />
      <div class="relative bg-gray-100 dark:bg-gray-800 p-4 rounded-md font-mono text-sm">
        <button
          class="absolute top-2 right-2 text-xs bg-white dark:bg-black border px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          @click="copy('checkbox', checkboxCode)"
        >
          {{ copied === 'checkbox' ? 'Copied!' : 'Copy' }}
        </button>
        <pre class="overflow-x-auto"><code class="text-gray-800 dark:text-gray-100">{{ checkboxCode }}</code></pre>
      </div>
    </section>

    <section class="space-y-2">
      <h2 class="text-2xl font-semibold">
        Toggle Swich
      </h2>

      <AtamToggleSwitch
        v-model="isChecked" :true-value="1" :false-value="0" input-id="darkMode" name="darkMode"
        hint="Toggle untuk dark mode" required
      />
      <div class="relative bg-gray-100 dark:bg-gray-800 p-4 rounded-md font-mono text-sm">
        <button
          class="absolute top-2 right-2 text-xs bg-white dark:bg-black border px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          @click="copy('swicth', swicthCode)"
        >
          {{ copied === 'swicth' ? 'Copied!' : 'Copy' }}
        </button>
        <pre class="overflow-x-auto"><code class="text-gray-800 dark:text-gray-100">{{ swicthCode }}</code></pre>
      </div>
      <label for="darkMode" class="ml-2">Dark Mode: {{ isChecked }}</label>
    </section>
  </div>
</template>
