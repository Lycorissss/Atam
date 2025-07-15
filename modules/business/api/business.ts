import type { BusinessFormInput } from '~/schemas/business.schema'

export function useBusinessApi() {
  return {
    // 🔍 Ambil semua business
    getList: (params?: any) =>
      useAtamFetch('/business', {
        method: 'GET',
        params,
      }),

    // 🔎 Ambil detail business by ID
    getById: (id: number) =>
      useAtamFetch(`/business/${id}`, {
        method: 'GET',
      }),

    // 🆕 Buat business baru
    create: (payload: BusinessFormInput) =>
      useAtamFetch('/business', {
        method: 'POST',
        body: payload,
      }),

    // ✏️ Update business
    update: (id: number, payload: BusinessFormInput) =>
      useAtamFetch(`/business/${id}`, {
        method: 'PUT',
        body: payload,
      }),

    // 🗑️ Hapus business
    remove: (id: number) =>
      useAtamFetch(`/business/${id}`, {
        method: 'DELETE',
      }),
  }
}
