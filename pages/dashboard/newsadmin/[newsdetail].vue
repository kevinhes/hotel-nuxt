<script setup>
  const route = useRoute()
  const newsId = route.params.newsdetail;
  const runtimeConfig = useRuntimeConfig();
  const apiUrl = runtimeConfig.public.apiBase;
  const authCookie = useCookie('auth')
  const router = useRouter()

  const newsDetail = ref({})
  async function getNewsDetail() {
    try {
      const response = await $fetch(`api/v1/admin/news/${newsId}`, {
        baseURL:apiUrl,
        headers: {
          authorization:authCookie.value
        },
      })
      console.log(response);
      
      newsDetail.value = response.result
    } catch(error) {
      console.log(error.data);
      
    }
  }

  onMounted(()=> {
    getNewsDetail()
  })
  
</script>
<template>
  <div></div>
</template>
<style scoped></style>