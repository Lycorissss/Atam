<script setup lang="ts">
definePageMeta({
  title: 'Test',
  middleware: ['auth-client'],
  layout: 'auth',
})

const logout = useLogout()

function handleLogout() {
  logout.mutate()
}
</script>

<template>
  <div class="text-center py-20">
    <h1 class="text-3xl font-semibold mb-8">
      Example Page
    </h1>
    <p class="mb-6">
      This is an example page to demonstrate the structure of a Vue component.
    </p>

    <div class="space-x-4">
      <CoreButton
        label="Logout"
        icon="i-mdi-logout"
        severity="danger"
        @click="handleLogout"
      />
      <CoreButton
        label="Change Password"
        icon="i-mdi-lock-reset"
        severity="warning"
        @click="navigateTo('/auth/change-password')"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
</style>
