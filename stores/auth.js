import { defineStore } from "pinia";
import { useCookie, useRuntimeConfig, useRouter } from "#app";

export const useAuthStore = defineStore( 'authStore', () => {
  // global setting
  const runtimeConfig = useRuntimeConfig()
  const apiUrl = runtimeConfig.public.apiBase
  const router = useRouter()
  const authCookie = useCookie('auth')
  // signup
  async function signup(userSignupInfo) {
    try {
      const res = await $fetch(`${apiUrl}api/v1/user/signup`, {
        method: 'POST',
        body: {
          ...userSignupInfo
        }
      })
      console.log(res);
      authCookie.value = res.token
      router.push(`/account/${res.result.name}/profile`)
    } catch(error) {
      console.log(error.data);
      
    }
  }

  // login
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
    router.push(`/user/${res.result.name}/profile`)
  }

  // check login
  const isLogin = ref(false);
  async function checkIsLogin() {
    if ( isLogin.value === false ) {
      try {
        const res = await $fetch(`${apiUrl}api/v1/user/check`, {
          method: 'GET',
          headers: {
            authorization:authCookie.value
          }
        })
        if( res.status === true ) {
          isLogin.value = true
          getUserProfile()
        }
      } catch (error) {
        console.log(error.data);
        navigateTo('/')
      }
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
    userProfile,
    updateUserProfile,
    signup
  }
} )