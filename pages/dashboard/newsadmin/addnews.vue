<script setup>
  const runtimeConfig = useRuntimeConfig();
  const apiUrl = runtimeConfig.public.apiBase;
  const authCookie = useCookie('auth')
  const router = useRouter()
  const newsInfo = ref({
    "title": "",
    "description": "",
    "image": ""
  })

  async function addNews(newsInfo) {
    try {
      const response = await $fetch('api/v1/admin/news/', {
        method: 'POST',
        baseURL:apiUrl,
        headers: {
          authorization:authCookie.value
        },
        body: {
          ...newsInfo
        }
      })
      console.log(response);
      if ( response.status === true ) {
        router.push('/dashboard/newsadmin')
      }
    } catch (error) {
      console.log(error);
    }
  }
</script>
<template>
  <h1>新增</h1>
  <div>
    <label for="">title</label>
    <input class="form-control" type="text" v-model="newsInfo.title">
  </div>
  <div>
    <label for="">description</label>
    <textarea class="form-control" name="" id="" v-model="newsInfo.description"></textarea>
  </div>
  <div>
    <label for="">image url</label>
    <input class="form-control" type="text" v-model="newsInfo.image">
  </div>
  <div>
    <button type="button" class="btn btn-primary" @click="addNews(newsInfo)">
      新增
    </button>
  </div>
</template>
<style scoped></style>