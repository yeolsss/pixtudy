import { Tables } from '@/types/supabase.types'
import { create } from 'zustand'
import createSelectors from '@/zustand/config/createSelector'

interface AuthState {
  isLogin: boolean
  user: Tables<'users'>
  isSaveLoginInfo: boolean
  login: (user: Tables<'users'>) => void
  logout: () => void
  setSaveLoginInfo: (isRememberLoginInfo: boolean) => void
}

const initialUser = {
  created_at: '',
  display_name: '',
  email: '',
  id: ''
}

const authStore = create<AuthState>()((set) => ({
  isLogin: false,
  user: initialUser,
  isSaveLoginInfo: false,
  login: (user: Tables<'users'>) => set(() => ({ isLogin: true, user })),
  logout: () =>
    set(() => ({
      isLogin: false,
      user: { ...initialUser }
    })),
  setSaveLoginInfo: (isRememberLoginInfo: boolean) =>
    set(() => ({ isSaveLoginInfo: isRememberLoginInfo }))
}))

const useAuthStore = createSelectors(authStore)
export default useAuthStore
