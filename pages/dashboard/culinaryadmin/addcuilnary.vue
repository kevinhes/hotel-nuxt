<script setup>
  import { useRouter } from 'vue-router';
  import { useCookie, useRuntimeConfig } from '#app';
  import {useLoading} from 'vue-loading-overlay'
  const $loading = useLoading({});

  const runtimeConfig = useRuntimeConfig();
  const apiUrl = runtimeConfig.public.apiBase;
  const authCookie = useCookie('auth');
  const router = useRouter();

  const addCuilnary = async (values) => {
  const loader = $loading.show()
  try {
    const response = await $fetch('api/v1/admin/culinary', {
      method: 'POST',
      baseURL: apiUrl,
      headers: {
        authorization: authCookie.value,
      },
      body: {
        ...values,
      },
    });

    if (response.status === true) {
      router.push('/dashboard/culinaryadmin');
    }
  } catch (error) {
    console.error(error.data);
  } finally {
    loader.hide()
  }
};
</script>
<template>
  <h1>新增</h1>
  <VForm @submit="addCuilnary">
    <div>
      <label for="title">Title</label>
      <VField
        id="title"
        name="title"
        rules="required"
        class="form-control"
      />
      <VErrorMessage name="title" class="text-danger" />
    </div>
    <div>
      <label for="description">Description</label>
      <VField
        id="description"
        name="description"
        rules="required"
        as="textarea"
        class="form-control"
      />
      <VErrorMessage name="description" class="text-danger" />
    </div>
    <div>
      <label for="diningTime">diningtime</label>
      <VField
        id="diningTime"
        name="diningTime"
        rules="required"
        as="textarea"
        class="form-control"
      />
      <VErrorMessage name="diningTime" class="text-danger" />
    </div>
    <div>
      <label for="image">Image URL</label>
      <VField
        id="image"
        name="image"
        rules="required"
        class="form-control"
      />
      <VErrorMessage name="image" class="text-danger" />
    </div>
    <div>
      <button type="submit" class="btn btn-primary">
        新增
      </button>
    </div>
  </VForm>
</template>
<style scoped></style>