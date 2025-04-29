<script setup>
const runtimeConfig = useRuntimeConfig();
const apiUrl = runtimeConfig.public.apiBase;
const authCookie = useCookie("auth");

import { useLoading } from "vue-loading-overlay";
const $loading = useLoading({});

const culinaryList = ref([]);

async function getCulinaryList() {
  const loader = $loading.show({});
  try {
    const response = await $fetch("api/v1/admin/culinary", {
      baseURL: apiUrl,
      headers: {
        authorization: authCookie.value,
      },
    });

    if (response.status === true) {
      culinaryList.value = response.result;
    }
  } catch (error) {
    console.log(error.data);
  } finally {
    loader.hide();
  }
}

async function deleteCulinary(id) {
  try {
    const response = await $fetch(`api/v1/admin/culinary/${id}`, {
      method: "DELETE",
      baseURL: apiUrl,
      headers: {
        authorization: authCookie.value,
      },
    });
    getCulinaryList();
  } catch (error) {
    console.log(error.data);
  }
}

async function editCulinary(id, title, description, diningTime, image) {
  try {
    const response = await $fetch(`api/v1/admin/culinary/${id}`, {
      method: "PUT",
      baseURL: apiUrl,
      headers: {
        authorization: authCookie.value,
      },
      body: {
        title,
        description,
        diningTime,
        image,
      },
    });

    getCulinaryList();
  } catch (error) {
    console.log(error.data);
  }
}

onMounted(() => {
  getCulinaryList();
});
</script>
<template>
  <section class="d-flex justify-content-between">
    <h1>管理佳餚</h1>
    <nuxt-link class="btn btn-primary" to="culinaryadmin/addcuilnary"
      >新增佳餚</nuxt-link
    >
  </section>
  <section v-if="culinaryList">
    <table class="table">
      <thead>
        <tr>
          <th>標題</th>
          <th>描述</th>
          <th>用餐時間</th>
          <th>圖片網址</th>
          <th>動作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="culinary in culinaryList" :key="culinary.id">
          <td>
            <input class="form-control" type="text" v-model="culinary.title" />
          </td>
          <td>
            <textarea
              class="form-control"
              v-model="culinary.description"
            ></textarea>
          </td>
          <td>
            <input
              class="form-control"
              type="text"
              v-model="culinary.diningTime"
            />
          </td>
          <td>
            <input type="text" v-model="culinary.image" class="form-control" />
          </td>
          <td>
            <button
              type="button"
              class="btn btn-primary"
              @click="
                editCulinary(
                  culinary._id,
                  culinary.title,
                  culinary.description,
                  culinary.diningTime,
                  culinary.image
                )
              "
            >
              更新
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="deleteCulinary(culinary._id)"
            >
              刪除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
  <section v-else>沒有資料</section>
</template>
<style scoped></style>
