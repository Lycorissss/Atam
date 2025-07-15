<script setup lang="ts">
const { data, isLoading, isError } = useBusinessList()

const deleteMutation = useDeleteBusiness()

// ✅ Mutation untuk hapus business
const showDialog = ref(false)

function onDelete(id: number) {
  console.log(id)
  deleteMutation.mutate(id)
  showDialog.value = false
}
</script>

<template>
  <section class="p-4 space-y-6">
    <h1 class="text-xl font-bold">
      Daftar Business
    </h1>

    <div v-if="isLoading">
      🔄 Memuat data...
    </div>
    <div v-else-if="isError">
      ❌ Gagal memuat data.
    </div>

    <!-- Grid 3 kolom -->
    <div v-else class="grid grid-cols-3 gap-4">
      <!-- Card Tambah -->
      <NuxtLink
        to="/business/create"
        class="border border-dashed border-gray-300 rounded-xl flex items-center justify-center h-40 hover:border-primary hover:bg-gray-50 transition"
      >
        <div class="flex flex-col items-center text-gray-500">
          <div class="text-4xl">
            <i class="i-mdi-plus-circle-outline" />
          </div>
          <div class="mt-2 text-sm font-medium">
            Tambah Business
          </div>
        </div>
      </NuxtLink>

      <!-- Card Business -->
      <AtamCard
        v-for="b in data"
        :key="b.id"
      >
        <template #header>
          <div class="text-xl font-bold">
            {{ b.name }}
          </div>
        </template>

        <template #content>
          <p>
            {{ b.slug }}
          </p>
          <p class="text-sm text-gray-500">
            Tipe: {{ b.type }}
          </p>
        </template>

        <template #footer>
          <div class="flex items-center justify-between text-sm text-gray-600">
            <!-- Status -->
            <span :class="b.is_active ? 'text-green-600' : 'text-red-600'">
              {{ b.is_active ? 'Aktif' : 'Nonaktif' }}
            </span>

            <!-- Tombol Edit dan Delete -->
            <div class="flex gap-2">
              <AtamButton
                severity="primary-blue"
                :hover="true"
                :outline="true"
                @click="navigateTo(`/business/${b.id}/edit`)"
              >
                Edit
              </AtamButton>

              <AtamButton
                severity="primary-red"
                :hover="true"
                :outline="true"
                @click="showDialog = true"
              >
                Delete
              </AtamButton>

              <AtamConfirmDialog
                :visible="showDialog"
                title="Are you sure?"
                @cancel="showDialog = false"
                @confirm="onDelete(b.id)"
              >
                This action cannot be undone. Do you really want to delete this item?
              </AtamConfirmDialog>
            </div>
          </div>
        </template>
      </AtamCard>
    </div>
  </section>
</template>
