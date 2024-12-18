import {  useAuthStore } from '@/stores/auth'

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()
  const { checkIsLogin } = authStore
  
  checkIsLogin()
  
})