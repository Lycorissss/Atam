<script setup lang="ts">
import { ref } from 'vue'

const copied = ref<string | null>(null)
const selectedSeverity = ref<string>('blue')

const rawSeverity = [
  'primary',
  'blue',
  'green',
  'red',
  'yellow',
  'purple',
  'orange',
  'gray',
]

const severityOptions = ref(
  rawSeverity.map(opt => ({
    label: // kapitalisasi kata pertama (Primary, Blue, …)
      opt.charAt(0).toUpperCase() + opt.slice(1),
    value: opt
  }))
)

const examples = {
  basic: `<AtamCard>
  <template #content>
    Lorem ipsum dolor sit amet consectetur adipisicing elit.
  </template>
</AtamCard>`,

  outline: `<AtamCard outline>
  <template #content>
    Card dengan border tebal, tanpa shadow.
  </template>
</AtamCard>`,

  shadow: `<AtamCard shadow>
  <template #content>
    Card dengan bayangan statis.
  </template>
</AtamCard>`,

  hover: `<AtamCard :hover="true">
  <template #content>
    Card dengan efek shadow hanya saat hover.
  </template>
</AtamCard>`,

  full: `<AtamCard outline shadow :hover="true" severity="orange">
  <template #header>
    <div class="text-xl font-bold">🔥 Full Variant</div>
  </template>
  <template #content>
    Ini contoh mengombinasikan <code>outline</code>, <code>shadow</code>, <code>hover</code>, dan <code>severity</code>.
  </template>
  <template #footer>
    <AtamButton :hover="true">Action</AtamButton>
  </template>
</AtamCard>`,
}

function getSeverityExample(severity: string) {
  return `<AtamCard severity="${severity}">
  <template #content>
    Card dengan varian warna <code>${severity}</code>.
  </template>
</AtamCard>`
}

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
      copied.value = id
      setTimeout(() => (copied.value = null), 1000)
    }
    else {
      console.error('Fallback copy gagal')
    }
  }
  catch (err) {
    console.error('Fallback copy error:', err)
  }

  document.body.removeChild(textArea)
}

function copyToClipboard(code: string, id: string) {
  // Coba menggunakan modern clipboard API
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(code)
      .then(() => {
        copied.value = id
        setTimeout(() => (copied.value = null), 1000)
      })
      .catch((err) => {
        console.error('Clipboard API gagal:', err)
        // Fallback ke metode lama
        fallbackCopyTextToClipboard(code, id)
      })
  }
  else {
    // Fallback untuk browser yang tidak mendukung clipboard API
    fallbackCopyTextToClipboard(code, id)
  }
}
</script>

<template>
  <div class="p-6 max-w-4xl mx-auto space-y-12">
    <h1 class="text-3xl font-bold text-center">
      🃏 AtamCard Documentation
    </h1>

    <!-- 1. Default Card (basic, tanpa props) -->
    <section>
      <h2 class="text-2xl font-semibold mb-4">
        1. Default Card
      </h2>
      <p class="mb-2 text-gray-600">
        Jika <code>severity</code> tidak diberikan dan tanpa props lain, card akan menggunakan
        background netral <code>#fbfbfb</code> (atau <code>dark:bg-lime-300</code> di dark mode),
        tanpa border, tanpa shadow.
      </p>
      <AtamCard>
        <template #content>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </template>
      </AtamCard>

      <div class="mt-4 relative bg-gray-100 rounded-lg p-3 text-sm font-mono">
        <button class="absolute top-2 right-2 text-xs bg-white border px-2 py-1 rounded hover:bg-gray-200"
          @click="copyToClipboard(examples.basic, 'basic')">
          {{ copied === 'basic' ? 'Copied!' : 'Copy' }}
        </button>
        <code>{{ examples.basic }}</code>
      </div>
    </section>

    <!-- 2. Outline -->
    <section>
      <h2 class="text-2xl font-semibold mb-4">
        2. Outline
      </h2>
      <p class="mb-2 text-gray-600">
        Gunakan <code>outline</code> untuk menampilkan border hitam tebal di sekeliling card.
      </p>
      <AtamCard outline>
        <template #content>
          Card dengan outline, tanpa shadow.
        </template>
      </AtamCard>

      <div class="mt-4 relative bg-gray-100 rounded-lg p-3 text-sm font-mono">
        <button class="absolute top-2 right-2 text-xs bg-white border px-2 py-1 rounded hover:bg-gray-200"
          @click="copyToClipboard(examples.outline, 'outline')">
          {{ copied === 'outline' ? 'Copied!' : 'Copy' }}
        </button>
        <code>{{ examples.outline }}</code>
      </div>
    </section>

    <!-- 3. Static Shadow -->
    <section>
      <h2 class="text-2xl font-semibold mb-4">
        3. Static Shadow
      </h2>
      <p class="mb-2 text-gray-600">
        Gunakan <code>shadow</code> untuk menambahkan bayangan statis (<code>shadow-atam</code>).
      </p>
      <AtamCard shadow>
        <template #content>
          Card dengan bayangan statis.
        </template>
      </AtamCard>

      <div class="mt-4 relative bg-gray-100 rounded-lg p-3 text-sm font-mono">
        <button class="absolute top-2 right-2 text-xs bg-white border px-2 py-1 rounded hover:bg-gray-200"
          @click="copyToClipboard(examples.shadow, 'shadow')">
          {{ copied === 'shadow' ? 'Copied!' : 'Copy' }}
        </button>
        <code>{{ examples.shadow }}</code>
      </div>
    </section>

    <!-- 4. Hover Shadow -->
    <section>
      <h2 class="text-2xl font-semibold mb-4">
        4. Hover Shadow
      </h2>
      <p class="mb-2 text-gray-600">
        Gunakan <code>:hover="true"</code> untuk menampilkan bayangan hanya saat pointer hover.
      </p>
      <AtamCard :hover="true">
        <template #content>
          Card dengan efek shadow saat hover.
        </template>
      </AtamCard>

      <div class="mt-4 relative bg-gray-100 rounded-lg p-3 text-sm font-mono">
        <button class="absolute top-2 right-2 text-xs bg-white border px-2 py-1 rounded hover:bg-gray-200"
          @click="copyToClipboard(examples.hover, 'hover')">
          {{ copied === 'hover' ? 'Copied!' : 'Copy' }}
        </button>
        <code>{{ examples.hover }}</code>
      </div>
    </section>

    <!-- 5. Severity Variant -->
    <section>
      <h2 class="text-2xl font-semibold mb-4">
        5. Severity Variant
      </h2>
      <p class="mb-2 text-gray-600">
        Gunakan <code>severity="&lt;token&gt;"</code> untuk mengganti background card.
        Pilih salah satu dari opsi yang tersedia di bawah:
      </p>

      <!-- Dropdown untuk pilih severity -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-2">Pilih Severity:</label>
        <AtamSelect v-model="selectedSeverity" :options="severityOptions" optionLabel="label" optionValue="value"
          placeholder="Pilih severity" unstyled label="Severity" hint="Wajib diisi" required />
      </div>

      <AtamCard :severity="selectedSeverity">
        <template #content>
          Card dengan varian warna <code>{{ selectedSeverity }}</code>.
        </template>
      </AtamCard>

      <div class="mt-4 relative bg-gray-100 rounded-lg p-3 text-sm font-mono">
        <button class="absolute top-2 right-2 text-xs bg-white border px-2 py-1 rounded hover:bg-gray-200"
          @click="copyToClipboard(getSeverityExample(selectedSeverity), 'severity')">
          {{ copied === 'severity' ? 'Copied!' : 'Copy' }}
        </button>
        <code>{{ getSeverityExample(selectedSeverity) }}</code>
      </div>
    </section>

    <!-- 6. Full Example -->
    <section>
      <h2 class="text-2xl font-semibold mb-4">
        6. Full Combination
      </h2>
      <p class="mb-2 text-gray-600">
        Contoh mengombinasikan <code>outline</code>, <code>shadow</code>, <code>hover</code>,
        dan <code>severity</code> sekaligus.
      </p>
      <AtamCard outline shadow :hover="true" severity="orange-300">
        <template #header>
          <div class="text-xl font-bold">
            🔥 Full Variant
          </div>
        </template>
        <template #content>
          Ini contoh lengkap dengan semua props.
        </template>
        <template #footer>
          <AtamButton :hover="true">
            Action
          </AtamButton>
        </template>
      </AtamCard>

      <div class="mt-4 relative bg-gray-100 rounded-lg p-3 text-sm font-mono">
        <button class="absolute top-2 right-2 text-xs bg-white border px-2 py-1 rounded hover:bg-gray-200"
          @click="copyToClipboard(examples.full, 'full')">
          {{ copied === 'full' ? 'Copied!' : 'Copy' }}
        </button>
        <code>{{ examples.full }}</code>
      </div>
    </section>

    <!-- Penjelasan -->
    <div class="p-4 bg-white border rounded-xl shadow-sm">
      <h2 class="text-xl font-semibold mb-4">
        Penjelasan Properti
      </h2>
      <ul class="list-disc list-inside space-y-2 text-sm text-gray-700">
        <li><code>severity</code>: Warna/tema background card. Opsi tersedia: <code>primary-blue</code>,
          <code>primary-green</code>, <code>primary-red</code>, <code>blue</code>, <code>green</code>, <code>red</code>,
          <code>yellow</code>, <code>purple</code>, <code>orange</code>, <code>gray</code>.
        </li>
        <li><code>shadow</code>: Aktifkan efek bayangan statis pada card.</li>
        <li><code>outline</code>: Aktifkan border hitam tebal di sekeliling card.</li>
        <li><code>hover</code>: Aktifkan efek shadow hanya saat card di-hover.</li>
      </ul>
      <p class="mt-4 text-sm text-gray-600">
        Klik tombol <strong>Copy</strong> untuk menyalin langsung kode implementasi card sesuai kebutuhanmu.
      </p>
    </div>
  </div>
</template>
