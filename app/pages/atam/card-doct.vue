<script setup lang="ts">
import { ref } from 'vue'

const copied = ref<string | null>(null)

const basicCode = `<AtamCard>
  <template #content>
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat veniam vitae quod reiciendis
    libero commodi architecto dicta quo quos iure cum mollitia necessitatibus, deserunt officiis hic
    repudiandae culpa explicabo aliquid.
  </template>
</AtamCard>`

const fullSlotCode = `<AtamCard>
  <template #header>
    <div class="text-xl font-bold">🚀 Epoch 9 Report</div>
  </template>
  <template #content>
    <p>
      You’ve earned 182 points this epoch. Go to the <u>Rewards tab</u> to redeem them!
    </p>
  </template>
  <template #footer>
    <div class="flex justify-between text-sm text-gray-600">
      <span>Last synced: 2 mins ago</span>
      <AtamButton severity="primary-green" :hover="true">Button</AtamButton>
    </div>
  </template>
</AtamCard>`

function copy(codeId: string, code: string) {
  navigator.clipboard.writeText(code).then(() => {
    copied.value = codeId
    setTimeout(() => (copied.value = null), 1000)
  })
}
</script>

<template>
  <div class="p-6 max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold text-center mb-8">
      ATAM Card Documentation
    </h1>

    <!-- Basic Card Example -->
    <div class="space-y-6">
      <AtamCard>
        <template #content>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat veniam vitae quod reiciendis
          libero commodi architecto dicta quo quos iure cum mollitia necessitatibus, deserunt officiis hic
          repudiandae culpa explicabo aliquid.
        </template>
      </AtamCard>

      <div class="relative bg-gray-100 p-4 rounded-md font-mono text-sm">
        <button
          class="absolute top-2 right-2 text-xs bg-white border px-2 py-1 rounded hover:bg-gray-200"
          @click="copy('basic', basicCode)"
        >
          {{ copied === 'basic' ? 'Copied!' : 'Copy' }}
        </button>
        <code class="whitespace-pre-wrap block text-gray-800">{{ basicCode }}</code>
      </div>
    </div>

    <!-- Card with header & footer -->
    <div class="space-y-6 mt-8">
      <AtamCard>
        <template #header>
          <div class="text-xl font-bold">
            🚀 Epoch 9 Report
          </div>
        </template>
        <template #content>
          <p>
            You’ve earned 182 points this epoch. Go to the <u>Rewards tab</u> to redeem them!
          </p>
        </template>
        <template #footer>
          <div class="flex justify-between text-sm text-gray-600">
            <span>Last synced: 2 mins ago</span>
            <AtamButton severity="primary-green" :hover="true">
              Button
            </AtamButton>
          </div>
        </template>
      </AtamCard>

      <div class="relative bg-gray-100 p-4 rounded-md font-mono text-sm">
        <button
          class="absolute top-2 right-2 text-xs bg-white border px-2 py-1 rounded hover:bg-gray-200"
          @click="copy('full', fullSlotCode)"
        >
          {{ copied === 'full' ? 'Copied!' : 'Copy' }}
        </button>
        <code class="whitespace-pre-wrap block text-gray-800">{{ fullSlotCode }}</code>
      </div>
    </div>
  </div>
</template>
