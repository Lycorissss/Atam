<script setup lang="ts">
import type { BusinessFormInput } from '~/schemas/business.schema'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = Number(route.params.id)

const { data, isLoading, isError } = useBusinessDetail(id)
const update = useUpdateBusiness(id)
const remove = useDeleteBusiness(id)

function onSubmit(payload: BusinessFormInput) {
  update.mutate(payload)
}

function onDelete() {
  if (confirm('Yakin ingin menghapus business ini?')) {
    remove.mutate()
  }
}
</script>

<template>
  <section class="flex p-4 justify-center">
    <div class="w-full">
      <AtamCard>
        <template #header>
          <h1 class="text-xl font-bold text-center mb-6">
            Edit Business
          </h1>
        </template>

        <template #content>
          <div v-if="isLoading">
            🔄 Memuat data...
          </div>
          <div v-else-if="isError">
            ❌ Gagal memuat data.
          </div>

          <template v-else>
            <BusinessForm :initial-values="data" @submit="onSubmit" />

            <AtamButton
              label="Hapus Business"
              severity="primary-red"
              :outline="true"
              :hover="true"
              class="mt-6 w-full"
              @click="onDelete"
            />
          </template>
        </template>
      </AtamCard>
    </div>
  </section>
</template>
