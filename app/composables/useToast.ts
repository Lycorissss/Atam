// composables/useToast.ts
import { ref } from 'vue'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

interface ToastMessage {
  id: number
  message: string
  type: ToastType
  timeout?: number
}

// 🟢 GLOBAL: ini harus DI LUAR fungsi
const toasts = ref<ToastMessage[]>([])
let idCounter = 0

export function useToast() {
  function showToast(message: string, type: ToastType = 'info', timeout = 3000) {
    const id = ++idCounter
    toasts.value.push({ id, message, type, timeout })
    setTimeout(() => {
      toasts.value = toasts.value.filter(t => t.id !== id)
    }, timeout)
  }

  return { toasts, showToast }
}
