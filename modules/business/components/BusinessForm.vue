<script setup lang="ts">
import type { BusinessFormInput } from '~/schemas/business.schema'
import { toTypedSchema } from '@vee-validate/zod'
import { businessSchema } from '~/schemas/business.schema'

defineProps<{
  initialValues?: BusinessFormInput
}>()

const emit = defineEmits<{
  submit: [payload: BusinessFormInput]
}>()
</script>

<template>
  <div class="flex justify-center">
    <VeeForm
      :initial-values="initialValues"
      :validation-schema="toTypedSchema(businessSchema)"
      class="space-y-4 w-full max-w-xl"
      @submit="(values) => emit('submit', values)"
    >
      <!-- Input: Nama -->
      <div>
        <label class="font-medium mb-1 block">Nama Business</label>
        <VeeField v-slot="{ field }" name="name">
          <AtamInput v-bind="field" name="name" />
        </VeeField>
        <VeeErrorMessage name="name" class="text-sm text-red-500 mt-1" />
      </div>

      <!-- Input: Slug -->
      <div>
        <label class="font-medium mb-1 block">Slug</label>
        <VeeField v-slot="{ field }" name="slug">
          <AtamInput v-bind="field" name="slug" />
        </VeeField>
        <VeeErrorMessage name="slug" class="text-sm text-red-500 mt-1" />
      </div>

      <!-- Input: Tipe -->
      <div>
        <label class="font-medium mb-1 block">Tipe</label>
        <VeeField v-slot="{ value, handleChange }" name="type">
          <AtamSelect
            :model-value="value"
            name="type"
            option-label="label"
            option-value="value"
            placeholder="Pilih Tipe"
            :options="[
              { label: 'Retail', value: 'retail' },
              { label: 'Service', value: 'service' },
              { label: 'Manufacturing', value: 'manufacturing' },
              { label: 'Technology', value: 'technology' },
              { label: 'Hospitality', value: 'hospitality' },
              { label: 'Healthcare', value: 'healthcare' },
              { label: 'Education', value: 'education' },
              { label: 'Other', value: 'other' },
            ]"
            @update:model-value="handleChange"
          />
        </VeeField>
        <VeeErrorMessage name="type" class="text-sm text-red-500 mt-1" />
      </div>

      <!-- Tombol Simpan -->
      <AtamButton
        type="submit"
        severity="primary-blue"
        label="Simpan" class="w-full" :hover="true" :outline="true"
      />
    </VeeForm>
  </div>
</template>
