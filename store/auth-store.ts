import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { User } from "@/lib/validations/auth"

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  signOut: () => void
  clearError: () => void
  hasRole: (role: string) => boolean
  hasPermission: (permission: string) => boolean
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      setUser: (user) => {
        set({
          user,
          isAuthenticated: !!user,
          error: null,
        })

        // Set cookie for middleware when user is set
        if (typeof window !== "undefined" && user) {
          const token = `mock_token_${user.id}`
          document.cookie = `auth_token=${token}; path=/; max-age=${60 * 60 * 24 * 7}` // 7 days
        }
      },

      setLoading: (loading) => set({ isLoading: loading }),

      setError: (error) => set({ error }),

      signOut: () => {
        set({
          user: null,
          isAuthenticated: false,
          error: null,
        })

        // Remove cookie when signing out
        if (typeof window !== "undefined") {
          document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
        }
      },

      clearError: () => set({ error: null }),

      hasRole: (role) => {
        const { user } = get()
        return user?.role === role
      },

      hasPermission: (permission) => {
        const { user } = get()
        if (!user) return false

        // Basic permission system based on role
        const rolePermissions = {
          student: ["view_applications", "create_application", "view_profile"],
          university: [
            "view_applications",
            "manage_applications",
            "create_forms",
            "manage_users",
            "view_analytics",
            "manage_payments",
            "send_notifications",
          ],
          admin: ["*"], // All permissions
        }

        const userPermissions = rolePermissions[user.role as keyof typeof rolePermissions] || []
        return userPermissions.includes("*") || userPermissions.includes(permission)
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
)
