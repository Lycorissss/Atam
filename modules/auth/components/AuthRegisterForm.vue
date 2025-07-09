<script setup lang="ts">
import type { RegisterInput } from '~/types/auth/register'
import { toTypedSchema } from '@vee-validate/zod'
import { RegisterSchema } from '~/types/auth/register'

const registerSchema = toTypedSchema(RegisterSchema)

const submitError = ref('')
const { mutateAsync, isPending } = useRegister()

async function onSubmit(values: RegisterInput) {
  try {
    await mutateAsync(values)
    submitError.value = ''
    navigateTo('/auth/verify-email-sent') // Redirect setelah register
  }
  catch (err: any) {
    const { messages } = useApiError(err)
    submitError.value = messages.join(', ') // atau tampilkan pertama saja
    console.warn('[Register Error]', messages)
  }
}
</script>

<template>
  <VeeForm
    :validation-schema="registerSchema"
    class="space-y-4 max-w-md mx-auto"
    @submit="onSubmit"
  >
    <div class="grid gap-4">
      <VeeField v-slot="{ field, errorMessage }" name="email">
        <CoreInputText v-bind="field" placeholder="Email" />
        <small class="text-red-500">{{ errorMessage }}</small>
      </VeeField>

      <VeeField v-slot="{ field, errorMessage }" name="username">
        <CoreInputText v-bind="field" placeholder="Username" />
        <small class="text-red-500">{{ errorMessage }}</small>
      </VeeField>

      <VeeField v-slot="{ field, errorMessage }" name="password">
        <CoreInputText type="password" v-bind="field" placeholder="Password" />
        <small class="text-red-500">{{ errorMessage }}</small>
      </VeeField>

      <VeeField v-slot="{ field, errorMessage }" name="confirm_password">
        <CoreInputText type="password" v-bind="field" placeholder="Confirm Password" />
        <small class="text-red-500">{{ errorMessage }}</small>
      </VeeField>

      <VeeField v-slot="{ field, errorMessage }" name="metadata.first_name">
        <CoreInputText v-bind="field" placeholder="First Name" />
        <small class="text-red-500">{{ errorMessage }}</small>
      </VeeField>

      <VeeField v-slot="{ field, errorMessage }" name="metadata.last_name">
        <CoreInputText v-bind="field" placeholder="Last Name" />
        <small class="text-red-500">{{ errorMessage }}</small>
      </VeeField>

      <CoreButton type="submit" :label="isPending ? 'Registering...' : 'Register'" />

      <small v-if="submitError" class="text-red-500">{{ submitError }}</small>
    </div>
  </VeeForm>
</template>
