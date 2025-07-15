<script setup lang="ts">
import type { BusinessFormInput } from '~/schemas/business.schema'

definePageMeta({ layout: 'default' })

const create = useCreateBusiness()

function onSubmit(payload: BusinessFormInput) {
  create.mutate(payload)
}
</script>

<template>
  <section class="flex p-4 justify-center">
    <div class="w-full">
      <AtamCard>
        <template #header>
          <h1 class="text-xl font-bold mb-4 text-center">
            Buat Business Baru
          </h1>
        </template>

        <template #content>
          <BusinessForm @submit="onSubmit" />
        </template>
      </AtamCard>
    </div>
  </section>
</template>
