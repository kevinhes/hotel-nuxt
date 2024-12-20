import { defineStore } from "pinia";
import { useCookie, useRuntimeConfig, useRouter } from "#app";
import { useLoading } from "vue-loading-overlay";

export const useAuthStore = defineStore("authStore", () => {
  // global setting
  const { $Swal } = useNuxtApp();
  const $loading = useLoading({});
  const runtimeConfig = useRuntimeConfig();
  const apiUrl = runtimeConfig.public.apiBase;
  const router = useRouter();
  const route = useRoute();
  const authCookie = useCookie("auth");

  const isLogin = ref(false);
  const userProfile = ref({});
  // signup
  async function signup(userSignupInfo) {
    const loader = $loading.show({});
    try {
      const res = await $fetch(`${apiUrl}api/v1/user/signup`, {
        method: "POST",
        body: {
          ...userSignupInfo,
        },
      });
      if (res.status === true) {
        loader.hide();
        await $Swal.fire({
          icon: "success",
          title: "註冊成功",
        });
        isLogin.value = true;
        authCookie.value = res.token;
        router.push(`/user/${res.result.name}/profile`);
      }
    } catch (error) {
      loader.hide();
      $Swal.fire({
        icon: "warning",
        title: error.data.message,
      });
      router.push(`/account/signup`);
    }
  }

  // login
  const isRemeberAccousnt = ref(false);
  const accountCookie = useCookie("userAccount");

  async function login(value) {
    const loader = $loading.show({});
    if (isRemeberAccousnt.value === true) {
      accountCookie.value = value.email;
    }

    try {
      const res = await $fetch(`${apiUrl}api/v1/user/login`, {
        method: "POST",
        body: {
          ...value,
        },
      });
      if (res.status === true) {
        loader.hide();
        await $Swal.fire({
          icon: "success",
          title: "登入成功",
          timer: 1500,
          showConfirmButton: false,
        });
        authCookie.value = res.token;
        router.push(`/user/${res.result.name}/profile`);
      }
    } catch (error) {
      $Swal.fire({
        icon: "warning",
        title: "登入失敗",
        text: error.data.message,
      });
    } finally {
      loader.hide();
    }
  }
  // logout
  const logout = async () => {
    isLogin.value = false;
    authCookie.value = "";
    userProfile.value = "";
    await $Swal.fire({
      icon: "success",
      title: "登出成功",
      timer: 1500,
      showConfirmButton: false,
    });
    router.push("/");
  };

  // check login
  async function checkIsLogin() {
    try {
      const res = await $fetch(`${apiUrl}api/v1/user/check`, {
        method: "GET",
        headers: {
          authorization: authCookie.value,
        },
      });
      if (res.status === true) {
        isLogin.value = true;
        // getUserProfile()
      }
    } catch (error) {
      console.log(error.data);
      navigateTo("/account/login");
    }
  }
  // get user profile
  const getUserProfile = async () => {
    try {
      const res = await $fetch(`${apiUrl}api/v1/user/`, {
        method: "GET",
        headers: {
          authorization: authCookie.value,
        },
      });
      isLogin.value = true;
      userProfile.value = res.result;
    } catch (error) {
      if (error.data.message !== "請重新登入") {
        console.log(error.data);
      }
    }
  };

  // update user
  async function updateUserProfile(userUpdateProfile) {
    try {
      const res = await $fetch(`${apiUrl}api/v1/user/`, {
        method: "PUT",
        headers: {
          authorization: authCookie.value,
        },
        body: {
          ...userUpdateProfile,
        },
      });
      if (res.status === true) {
        getUserProfile();
      }
    } catch (error) {
      console.log(error.data);
    }
  }

  return {
    isRemeberAccousnt,
    login,
    isLogin,
    checkIsLogin,
    userProfile,
    updateUserProfile,
    signup,
    getUserProfile,
    logout,
    accountCookie,
  };
});
