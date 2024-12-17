<script setup>
  const runtimeConfig = useRuntimeConfig();
  const apiUrl = runtimeConfig.public.apiBase;
  const authCookie = useCookie('auth');

  import {useLoading} from 'vue-loading-overlay'
  const $loading = useLoading({});
  

  const newsList = ref([])

  async function getNewsList() {
    const loader = $loading.show({})
    try {
      const response = await $fetch('api/v1/admin/news/', {
        baseURL:apiUrl,
        headers: {
          authorization:authCookie.value
        }
      })
      if ( response.status === true ) {
        newsList.value = response.result;
      }
      
    } catch (error) {
      console.log(error.data);
    } finally {
      loader.hide()
    }
  }

  async function deleteNews(id) {
    try {
      const response = await $fetch(`api/v1/admin/news/${id}`, {
        method:'DELETE',
        baseURL:apiUrl,
        headers: {
          authorization:authCookie.value
        }
      })
      getNewsList()
      
    } catch (error) {
      console.log(error.data);
    }
  }

  async function editNews(id, title, description, image) {
    try {
      const response = await $fetch(`api/v1/admin/news/${id}`, {
        method:'PUT',
        baseURL:apiUrl,
        headers: {
          authorization:authCookie.value
        },
        body: {
          title,
          description,
          image
        }
      })
      
      getNewsList()
      
    } catch (error) {
      console.log(error.data);
    }
  }

  onMounted(() => {
    getNewsList()
  })
</script>
<template>
  <section class="d-flex justify-content-between">
    <h1>
      管理新聞
    </h1>
    <nuxt-link class="btn btn-primary" to="newsadmin/addnews">新增新聞</nuxt-link>
  </section>
  <section v-if="newsList">
    <table class="table">
      <thead>
        <tr>
          <th>標題</th>
          <th>描述</th>
          <th>圖片網址</th>
          <th>動作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="news in newsList" :key="news.id">
          <td>
            <input class="form-control" type="text" v-model="news.title">
          </td>
          <td>
            <textarea class="form-control" v-model="news.description"></textarea>
          </td>
          <td>
            <input type="text" v-model="news.image" class="form-control">
          </td>
          <td>
            <button 
              type="button" class="btn btn-primary"
              @click="editNews(news._id, news.title, news.description, news.image)"
            >
              更新
            </button>
            <button 
              type="button" class="btn btn-danger"
              @click="deleteNews(news._id)"
            >
              刪除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
  <section v-else>
    沒有資料
  </section>
</template>
<style scoped></style>