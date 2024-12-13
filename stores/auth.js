import { defineStore } from "pinia";
import { useCookie, useRuntimeConfig } from "#app";

export const useAuthStore = defineStore( 'authStore', () => {
  // global setting
  const runtimeConfig = useRuntimeConfig()
  const apiUrl = runtimeConfig.public.apiBase

  // login
  const authCookie = useCookie('auth')
  const userInfo = ref({
    email:'',
    password: ''
  })

  async function login() {
    const res = await $fetch(`${apiUrl}api/v1/user/login`, {
      method: 'POST',
      body: {
        ...userInfo.value
      }
    })
    authCookie.value = (res.token)
  }

  // check login
  const isLogin = ref(false);
  const setIsLogin = ( boolean ) => {
    isLogin.value = boolean
  }
  async function checkIsLogin() {
    const res = await $fetch(`${apiUrl}api/v1/user/check`, {
      method: 'GET',
      headers: {
        authorization:authCookie.value
      }
    })
    if( res.status === true ) {
      isLogin.value = true
      getUserProfile()
    } else {
      navigateTo('/account/login')
    }
    
  }
  // get user profile
  const userProfile = ref({})
  async function getUserProfile() {
    const res = await $fetch(`${apiUrl}api/v1/user/`, {
      method: 'GET',
      headers: {
        authorization:authCookie.value
      }
    })
    userProfile.value = res.result
  }

  // update user
  async function updateUserProfile(userUpdateProfile) {
    try {
      const res = await $fetch(`${apiUrl}api/v1/user/`, {
        method: 'PUT',
        headers: {
          authorization:authCookie.value
        },
        body: {
          ...userUpdateProfile
        }
      })
      console.log(res);
      if(res.status === true) {
        getUserProfile()
      }
    } catch(error) {
      console.log(error.data);
    }
  }

  return {
    userInfo,
    login,
    isLogin,
    checkIsLogin,
    setIsLogin,
    userProfile,
    updateUserProfile
  }
} )