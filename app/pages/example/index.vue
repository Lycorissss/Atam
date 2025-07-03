<script setup lang="ts">
import Column from 'primevue/column'
import { computed, ref } from 'vue'

definePageMeta({
  title: 'Branch',
})

interface PIC {
  name: string
  phone: string
}

interface Branch {
  id: string
  branchCode: string
  branchName: string
  pic1: PIC
  financeManager: string
  telp?: string
  deliveryFee: number
  address: string
  status: 'Active' | 'Inactive'
}

const globalFilter = ref('')

// Sample branch data based on the image
const branches = ref<Branch[]>([
  {
    id: '1',
    branchCode: '1AZ1',
    branchName: 'DC PEKANBARU',
    pic1: {
      name: 'BAPAK MARYANO SITINDAON - MARKETING MANAGER',
      phone: '081294670092',
    },
    financeManager: 'Munir',
    telp: '-',
    deliveryFee: 0,
    address: 'jl. air hitam rt.002/09 kel. simpang baru kec. tampan, pekanbaru - riau',
    status: 'Inactive',
  },
  {
    id: '2',
    branchCode: '1DZ1',
    branchName: 'DC JAMBI',
    pic1: {
      name: 'GIGIH TAUFAN - MARKETING KOORDINATOR',
      phone: '081283257007',
    },
    financeManager: 'SANTOSO',
    telp: '-',
    deliveryFee: 0,
    address: 'jl. raya jambi - palembang km 13,8 desa pondok meja kec. maestong jambi',
    status: 'Inactive',
  },
  {
    id: '3',
    branchCode: '1JZ1',
    branchName: 'DC KARAWANG',
    pic1: {
      name: 'AGUS TRIYATNO - MARKETING KOORDINATOR',
      phone: '081294669188',
    },
    financeManager: 'DESI GUSMAN',
    telp: 'Telp. (0267) 8634156',
    deliveryFee: 0,
    address: 'jl. alternatif klari tanjung pura rt. 17 rw. 004 desa margasari kec. karawang timur kab. karawang',
    status: 'Active',
  },
  {
    id: '4',
    branchCode: '1PZ1',
    branchName: 'DC PONTIANAK',
    pic1: {
      name: 'BAPAK ROKAYADI - MARKETING MANAGER',
      phone: '081294669188',
    },
    financeManager: 'ALI FIKRI',
    telp: '-',
    deliveryFee: 0,
    address: 'jl. tritura kel. tanjung hilir kec. pontianak rt.009/001',
    status: 'Active',
  },
  {
    id: '5',
    branchCode: '1QZ1',
    branchName: 'DC MEDAN',
    pic1: {
      name: 'BAPAK HENDRI - MARKETING MANAGER',
      phone: '081234567890',
    },
    financeManager: 'SARI DEWI',
    telp: 'Telp. (061) 7654321',
    deliveryFee: 0,
    address: 'jl. gatot subroto km 7.5 medan, sumatera utara',
    status: 'Active',
  },
  {
    id: '6',
    branchCode: '1RZ1',
    branchName: 'DC PALEMBANG',
    pic1: {
      name: 'BAPAK RIZKI - MARKETING KOORDINATOR',
      phone: '081298765432',
    },
    financeManager: 'ANDI WIJAYA',
    telp: '-',
    deliveryFee: 0,
    address: 'jl. soekarno hatta km 12 palembang, sumatera selatan',
    status: 'Inactive',
  },
])

// Computed property to filter branches
const filteredBranches = computed(() => {
  let filtered = branches.value

  // Apply global filter
  if (globalFilter.value) {
    const filterValue = globalFilter.value.toLowerCase()
    filtered = filtered.filter(branch =>
      branch.branchCode.toLowerCase().includes(filterValue)
      || branch.branchName.toLowerCase().includes(filterValue)
      || branch.pic1.name.toLowerCase().includes(filterValue)
      || branch.pic1.phone.includes(filterValue)
      || branch.financeManager.toLowerCase().includes(filterValue)
      || (branch.telp && branch.telp.toLowerCase().includes(filterValue))
      || branch.address.toLowerCase().includes(filterValue)
      || branch.status.toLowerCase().includes(filterValue),
    )
  }

  return filtered
})

function editBranch(branch: Branch) {
  console.log('Edit branch:', branch)
  // Implement edit functionality
}

function deleteBranch(branch: Branch) {
  console.log('Delete branch:', branch)
  // Implement delete functionality
  if (confirm('Are you sure you want to delete this branch?')) {
    const index = branches.value.findIndex(b => b.id === branch.id)
    if (index > -1) {
      branches.value.splice(index, 1)
    }
  }
}
</script>

<template>
  <div class="p-4 md:p-6 bg-surface-100 dark:bg-surface-800 shadow-md rounded-lg">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
      <div class="flex items-center gap-2">
        <i class="i-mdi-home text-lg" />
        <h2 class="text-lg md:text-xl font-semibold">
          Master Branch
        </h2>
      </div>
      <div class="flex flex-wrap gap-2 w-full md:w-auto">
        <!-- Action Buttons -->
        <CoreButton label="Create" icon="i-mdi-plus" class="bg-primary-600 text-white" />
        <CoreButton label="Export" icon="i-mdi-download" class="bg-primary-600 text-white" />
        <CoreButton label="Print" icon="i-mdi-printer-outline" class="bg-primary-600 text-white" />
        <CoreButton label="Reload" icon="i-mdi-refresh" class="bg-primary-600 text-white" />
      </div>
    </div>

    <!-- Search -->
    <div class="mb-4 flex justify-end">
      <div class="flex items-center gap-2">
        <label class="text-sm font-medium">Search:</label>
        <CoreInputText
          v-model="globalFilter"
          placeholder=""
          class="w-64"
        />
      </div>
    </div>

    <!-- Data Table -->
    <CoreDataTable
      :value="filteredBranches"
      paginator
      :rows="10"
      :rows-per-page-options="[5, 10, 20]"
      paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
      current-page-report-template="Showing {first} to {last} of {totalRecords} entries"
      class="p-datatable-sm"
      sort-mode="multiple"
      :global-filter="globalFilter"
      :global-filter-fields="['branchCode', 'branchName', 'pic1', 'financeManager', 'telp', 'deliveryFee', 'address', 'status']"
    >
      <!-- Branch Code -->
      <Column field="branchCode" header="Branch Code" sortable style="width: 100px">
        <template #body="slotProps">
          <span class="font-medium">{{ slotProps.data.branchCode }}</span>
        </template>
      </Column>

      <!-- Branch Name -->
      <Column field="branchName" header="Branch Name" sortable style="width: 150px">
        <template #body="slotProps">
          <span>{{ slotProps.data.branchName }}</span>
        </template>
      </Column>

      <!-- PIC 1 -->
      <Column field="pic1" header="PIC 1" sortable style="width: 180px">
        <template #body="slotProps">
          <div class="text-sm">
            <div class="font-medium">
              {{ slotProps.data.pic1.name }}
            </div>
            <div class="text-gray-600">
              {{ slotProps.data.pic1.phone }}
            </div>
          </div>
        </template>
      </Column>

      <!-- Finance Manager -->
      <Column field="financeManager" header="Finance Manager" sortable style="width: 120px">
        <template #body="slotProps">
          <span>{{ slotProps.data.financeManager }}</span>
        </template>
      </Column>

      <!-- Telp -->
      <Column field="telp" header="Telp" sortable style="width: 120px">
        <template #body="slotProps">
          <span>{{ slotProps.data.telp || '-' }}</span>
        </template>
      </Column>

      <!-- Delivery Fee -->
      <Column field="deliveryFee" header="Delivery Fee" sortable style="width: 100px">
        <template #body="slotProps">
          <span>{{ slotProps.data.deliveryFee }}</span>
        </template>
      </Column>

      <!-- Address -->
      <Column field="address" header="Address" sortable style="width: 250px">
        <template #body="slotProps">
          <span class="text-sm">{{ slotProps.data.address }}</span>
        </template>
      </Column>

      <!-- Status -->
      <Column field="status" header="Status" sortable style="width: 100px">
        <template #body="slotProps">
          <span
            class="px-2 py-1 rounded-full text-xs font-medium" :class="[
              slotProps.data.status === 'Active'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800',
            ]"
          >
            {{ slotProps.data.status }}
          </span>
        </template>
      </Column>

      <!-- Actions -->
      <Column header="#" style="width: 80px">
        <template #body="slotProps">
          <div class="flex gap-1">
            <CoreButton
              icon="i-mdi-pencil"
              class="p-button-rounded p-button-text p-button-sm text-blue-500"
              title="Edit"
              @click="editBranch(slotProps.data)"
            />
            <CoreButton
              icon="i-mdi-trash"
              class="p-button-rounded p-button-text p-button-sm text-red-500"
              title="Delete"
              @click="deleteBranch(slotProps.data)"
            />
          </div>
        </template>
      </Column>
    </CoreDataTable>
  </div>
</template>

 <style scoped>
 /* Custom styles for the branch table */
.p-datatable .p-datatable-tbody > tr > td {
  padding: 0.75rem;
  vertical-align: middle;
}

.p-datatable .p-datatable-thead > tr > th {
  padding: 0.75rem;
  font-weight: 600;
  background-color: #f8f9fa;
  border-bottom: 2px solid #e9ecef;
}

.p-datatable .p-datatable-tbody > tr:hover {
  background-color: #f8f9fa;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .p-datatable .p-datatable-tbody > tr > td,
  .p-datatable .p-datatable-thead > tr > th {
    padding: 0.5rem;
    font-size: 0.875rem;
  }
}
</style>
