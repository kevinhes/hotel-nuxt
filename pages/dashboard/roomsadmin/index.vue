<script setup>
  const runtimeConfig = useRuntimeConfig();
  const apiUrl = runtimeConfig.public.apiBase;
  const authCookie = useCookie('auth')
  const roomsList = ref([]);

  async function getRoomsList() {
    try {
      const response = await $fetch('api/v1/admin/rooms/', {
        baseURL:apiUrl,
        headers: {
          authorization:authCookie.value
        }
      })
      console.log(response);
      roomsList.value = response.result
      
    } catch (error) {
      console.log(error.data);
    }
  }

  async function deleteRooms(id) {
    try {
      const response = await $fetch(`api/v1/admin/rooms/${id}`, {
        method:'DELETE',
        baseURL:apiUrl,
        headers: {
          authorization:authCookie.value
        }
      })
      getRoomsList()
      
    } catch (error) {
      console.log(error.data);
    }
  }

  onMounted(() => {
    getRoomsList()
  })
</script>
<template>
    <section class="d-flex justify-content-between">
    <h1>
      管理房型
    </h1>
    <nuxt-link class="btn btn-primary" to="roomsadmin/addroom">新增房型</nuxt-link>
  </section>
  <section v-if="roomsList">
    <table class="table">
      <thead>
        <tr>
          <th>標題</th>
          <th>描述</th>
          <th>動作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="room in roomsList" :key="room.id">
          <td>
            {{ room.name }}
          </td>
          <td>
            {{room.description}}
          </td>
          <td>
            <button 
              type="button" class="btn btn-danger"
              @click="deleteRooms(room._id)"
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