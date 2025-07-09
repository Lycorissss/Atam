import type { NuxtApp } from 'nuxt/schema' // ✅ tambahkan ini
import { defineNuxtPlugin } from '#app'
import { ErrorMessage, Field, Form } from 'vee-validate'

export default defineNuxtPlugin((nuxtApp: NuxtApp) => {
  nuxtApp.vueApp.component('VeeField', Field)
  nuxtApp.vueApp.component('VeeForm', Form)
  nuxtApp.vueApp.component('VeeErrorMessage', ErrorMessage)
})
