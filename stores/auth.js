import { defineStore } from "pinia";
import { useCookie, useRuntimeConfig, useRouter } from "#app";

export const useAuthStore = defineStore( 'authStore', () => {
  // global setting
  const runtimeConfig = useRuntimeConfig()
  const apiUrl = runtimeConfig.public.apiBase
  const router = useRouter()
  const authCookie = useCookie('auth')

  const isLogin = ref(false);
  const userProfile = ref({})
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
      isLogin.value = true
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
    try {
      const res = await $fetch(`${apiUrl}api/v1/user/login`, {
        method: 'POST',
        body: {
          ...userInfo.value
        }
      })
      
      authCookie.value = (res.token)
      console.log(authCookie.value);
      router.push(`/user/${res.result.name}/profile`)
    } catch(error) {
      alert(error.data.message)
    }
  }

  // check login
  async function checkIsLogin() {
    console.log(authCookie.value);  
    try {
      const res = await $fetch(`${apiUrl}api/v1/user/check`, {
        method: 'GET',
        headers: {
          authorization:authCookie.value
        }
      })
      if( res.status === true ) {
        isLogin.value = true
        // getUserProfile()
      }
    } catch (error) {
      console.log(error.data);
      navigateTo('/account/login')
    }
  }
  // get user profile
  const getUserProfile = async () => {
    try {
      const res = await $fetch(`${apiUrl}api/v1/user/`, {
        method: 'GET',
        headers: {
          authorization:authCookie.value
        }
      })
      isLogin.value = true
      userProfile.value = res.result

    } catch(error) {
      console.log(error.data);
    }
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
    signup,
    getUserProfile
  }
} )