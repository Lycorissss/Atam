// composables/useAuth.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

export interface User {
  avu_id_partner: string
  avu_username: string
  avu_partner_name: string
  avu_pic: string
  avu_notelp: string
  avu_email: string
  avu_alamat: string
  avu_member_id: string
  avu_pks_flag: string
  avu_category: number
  avu_start_date: string
  avu_end_date: string
  avu_is_active: number
  avu_access_role: string
  avu_remarks?: string
  avu_last_login: string
  avu_id: number
  avu_user_type?: string
  avu_transfer_doc?: string
  avu_amount_pks: number
  avu_user_image: string
  avu_kd_branch: string
  avu_month: number
  avu_approve_request: number
  avu_create_request: number
  avu_voucher_pic: number
  avu_email_notification: number
  avu_sending_voucher: number
  avu_fo_start_date?: string
  avu_fo_end_date?: string
  avu_bc_start_date?: string
  avu_bc_end_date?: string
  flag_fo: string
  flag_bc: string
  avu_req_hs: number
}

export interface LoginCredentials {
  username: string
  password: string
}

export interface LoginResponse {
  status: number
  message: string
  id: string
  token: string
  data: User[]
}

// Query keys for better cache management
export const authKeys = {
  all: ['auth'] as const,
  user: () => [...authKeys.all, 'user'] as const,
  status: () => [...authKeys.all, 'status'] as const,
}

// Get current user from stored data
export function useCurrentUser() {
  return useQuery({
    queryKey: authKeys.user(),
    queryFn: async () => {
      // Try to get user from server session/cookie
      try {
        const response = await $fetch<LoginResponse>('/api/auth/me')
        return response.data?.[0] || null
      }
      catch (error) {
        return null
      }
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
    retry: false, // Don't retry if user is not authenticated
  })
}

// Check auth status
export function useAuthStatus() {
  return useQuery({
    queryKey: authKeys.status(),
    queryFn: async () => {
      try {
        const response = await $fetch<{ isAuthenticated: boolean }>('/api/auth/status')
        return response
      }
      catch (error) {
        return { isAuthenticated: false }
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false,
  })
}

// Login mutation
export function useLogin() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await $fetch<LoginResponse>('/api/auth/login', {
        method: 'POST',
        body: credentials,
      })

      console.log('Login response1:', response)
      console.log('Login response1:', response.status)

      if (response.status !== 200) {
        console.log('Login failed 2:', response.message)
        throw new Error(response.message || 'Login failed')
      }

      return response
    },
    onSuccess: (response) => {
      const user = response.data?.[0]

      if (user) {
        // Store user data in cache
        queryClient.setQueryData(authKeys.user(), user)

        // Update auth status
        queryClient.setQueryData(authKeys.status(), { isAuthenticated: true })

        // console.log('Login successful:', response.message)

        // Invalidate all queries to refresh with authenticated state
        queryClient.invalidateQueries()
      }
    },
    onError: (error: any) => {
      console.error('Login failed 111:', error)

      // Clear any stale auth data
      queryClient.setQueryData(authKeys.user(), null)
      queryClient.setQueryData(authKeys.status(), { isAuthenticated: false })
    },
  })
}

// Logout mutation
export function useLogout() {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: async () => {
      try {
        await $fetch('/api/auth/logout', {
          method: 'POST',
        })
      }
      catch (error) {
        console.warn('Server logout failed, but continuing with local logout')
      }
    },
    onSettled: () => {
      // Clear auth cache
      queryClient.removeQueries({ queryKey: authKeys.all })
      queryClient.clear()

      // Force recheck status
      queryClient.setQueryData(authKeys.status(), { isAuthenticated: false })

      // ✅ Redirect to homepage/login after logout
      router.push('/')
    },
  })
}

// Auth state helper
export function useAuthState() {
  const { data: user, isLoading: isLoadingUser } = useCurrentUser()
  const { data: status, isLoading: isLoadingStatus } = useAuthStatus()

  return {
    user: computed(() => user.value),
    isAuthenticated: computed(() => status.value?.isAuthenticated ?? false),
    isLoading: computed(() => isLoadingUser.value || isLoadingStatus.value),
    // Helper computed properties for easier access to user data
    username: computed(() => user.value?.avu_username),
    user_id: computed(() => user.value?.avu_id_partner),
    partnerName: computed(() => user.value?.avu_partner_name),
    email: computed(() => user.value?.avu_email),
    role: computed(() => user.value?.avu_access_role),
    isActive: computed(() => user.value?.avu_is_active === 1),
  }
}

// Optimistic auth updates helper
export function useOptimisticAuth() {
  const queryClient = useQueryClient()

  const setOptimisticUser = (user: User) => {
    queryClient.setQueryData(authKeys.user(), user)
    queryClient.setQueryData(authKeys.status(), { isAuthenticated: true })
  }

  const clearOptimisticAuth = () => {
    queryClient.setQueryData(authKeys.user(), null)
    queryClient.setQueryData(authKeys.status(), { isAuthenticated: false })
  }

  return {
    setOptimisticUser,
    clearOptimisticAuth,
  }
}
