<script setup lang="ts">
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { useChangePassword } from '~/composables/useChangePassword'

definePageMeta({
  layout: 'auth',
  middleware: ['auth-client'],
  title: 'Change Password',
})

const formSchema = toTypedSchema(
  z.object({
    current_password: z.string().min(1, 'Password lama wajib diisi'),
    new_password: z.string().min(8, 'Minimal 8 karakter'),
    confirm_new_password: z.string().min(8),
  }).refine(data => data.new_password === data.confirm_new_password, {
    message: 'Konfirmasi password tidak sama',
    path: ['confirm_new_password'],
  }),
)

const toast = useToast() // CoreToast composable
const { mutateAsync, isPending } = useChangePassword()
const submitError = ref('')

async function onSubmit(values: any) {
  try {
    await mutateAsync(values)
    toast.add({
      type: 'success',
      title: 'Password berhasil diganti',
      description: 'Silakan login ulang jika diminta',
    })
    submitError.value = ''
    navigateTo('/example/test')
  } catch (err: any) {
    const msg = err?.data?.message || 'Gagal ganti password'
    toast.add({
      type: 'error',
      title: 'Gagal mengganti password',
      description: msg,
    })
    submitError.value = msg
  }
}
</script>

<template>
  <div class="max-w-md mx-auto py-12">
    <h2 class="text-xl font-semibold mb-4 text-center">Ganti Password</h2>

    <VeeForm :validation-schema="formSchema" @submit="onSubmit" class="space-y-4">
      <VeeField name="current_password" v-slot="{ field, errorMessage }">
        <CoreInputText v-bind="field" type="password" placeholder="Password Lama" />
        <small class="text-red-500">{{ errorMessage }}</small>
      </VeeField>

      <VeeField name="new_password" v-slot="{ field, errorMessage }">
        <CoreInputText v-bind="field" type="password" placeholder="Password Baru" />
        <small class="text-red-500">{{ errorMessage }}</small>
      </VeeField>

      <VeeField name="confirm_new_password" v-slot="{ field, errorMessage }">
        <CoreInputText v-bind="field" type="password" placeholder="Konfirmasi Password Baru" />
        <small class="text-red-500">{{ errorMessage }}</small>
      </VeeField>

      <CoreButton type="submit" :label="isPending ? 'Menyimpan...' : 'Ganti Password'" />
    </VeeForm>
  </div>
</template>
