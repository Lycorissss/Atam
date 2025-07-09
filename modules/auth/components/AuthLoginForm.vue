<script setup lang="ts">
import type { LoginInput } from '~/types/auth/login'
import { toTypedSchema } from '@vee-validate/zod'
import { LoginSchema } from '~/types/auth/login'

const schema = toTypedSchema(LoginSchema)
const submitError = ref('')
const { mutateAsync, isPending } = useLogin()

async function onSubmit(values: LoginInput) {
  try {
    const { data } = await mutateAsync(values)
    navigateTo('/example/test')
  }
  catch (err: any) {
    submitError.value = err.message ?? 'Login gagal'
  }
}
</script>

<template>
  <VeeForm :validation-schema="schema" class="space-y-4 flex flex-col" @submit="onSubmit">
    <VeeField v-slot="{ field, errorMessage }" name="email">
      <CoreInputText v-bind="field" placeholder="Email" />
      <small class="text-red-500">{{ errorMessage }}</small>
    </VeeField>
    <VeeField v-slot="{ field, errorMessage }" name="password">
      <CoreInputText type="password" v-bind="field" placeholder="Password" />
      <small class="text-red-500">{{ errorMessage }}</small>
    </VeeField>

    <!-- <CoreButton type="submit" :label="isPending ? 'Logging in...' : 'Login'" /> -->
    <AtamButton type="submit" :label="isPending ? 'Logging in...' : 'Login'" severity="primary-blue" :hover="true"/>
    <small v-if="submitError" class="text-red-500 block">{{ submitError }}</small>
  </VeeForm>
</template>
