import {  useAuthStore } from '@/stores/auth'

export default defineNuxtRouteMiddleware((to, from) => {
  const authCookie = useCookie('auth')
  const authStore = useAuthStore()
  const { checkIsLogin } = authStore
  const { isLogin } = storeToRefs( authStore )

  if( isLogin.value === false ) {
    checkIsLogin()
  };
  
  
  
  checkIsLogin()
})
