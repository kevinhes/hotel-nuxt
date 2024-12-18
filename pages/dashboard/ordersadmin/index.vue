<script setup>
  const runtimeConfig = useRuntimeConfig();
  const apiUrl = runtimeConfig.public.apiBase;
  const authCookie = useCookie('auth');

  import {useLoading} from 'vue-loading-overlay'
  const $loading = useLoading({});

  import dayjs from 'dayjs';
  

  const ordersList = ref([])

  async function getOrdersList() {
    const loader = $loading.show({})
    try {
      const response = await $fetch('api/v1/admin/orders/', {
        baseURL:apiUrl,
        headers: {
          authorization:authCookie.value
        }
      })
      
      if ( response.status === true ) {
        ordersList.value = response.result;
      }
      
    } catch (error) {
      console.log(error.data);
    } finally {
      loader.hide()
    }
  }

  async function deleteOrder(id) {
    try {
      const response = await $fetch(`api/v1/admin/orders/${id}`, {
        method:'DELETE',
        baseURL:apiUrl,
        headers: {
          authorization:authCookie.value
        }
      })
      console.log(response);
      
      getOrdersList()
      
    } catch (error) {
      console.log(error);
    }
  }

  async function editOrder(id, title, description, image) {
    try {
      const response = await $fetch(`api/v1/admin/orders/${id}`, {
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
      
      getOrdersList()
      
    } catch (error) {
      console.log(error.data);
    }
  }

  onMounted(() => {
    getOrdersList()
  })
</script>
<template>
    <section class="d-flex justify-content-between">
    <h1>
      管理訂單
    </h1>
  </section>
  <section v-if="ordersList">
    <table class="table">
      <thead>
        <tr>
          <th>編號</th>
          <th>訂單姓名</th>
          <th>訂單房間</th>
          <th>入住日期</th>
          <th>退房日期</th>
          <th>動作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(order, index) in ordersList" :key="order.id">
          <td>
            {{ index + 1 }}
          </td>
          <td>
            {{ order.userInfo.name }}
          </td>
          <td>
            {{ order.roomId.name }}
          </td>
          <td>
            {{ dayjs(order.checkInDate) }}
          </td>
          <td>
            {{ dayjs(order.checkOutDate) }}
          </td>
          <td>
            <!-- <button 
              type="button" class="btn btn-primary"
              @click="editNews(news._id, news.title, news.description, news.image)"
            >
              更新
            </button> -->
            <button 
              type="button" class="btn btn-danger"
              @click="deleteOrder(order._id)"
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