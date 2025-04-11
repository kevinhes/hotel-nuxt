<script setup>
import { Autoplay, Navigation, Pagination } from "swiper/modules";

const modules = ref([Autoplay, Navigation, Pagination]);

// 千分位
const { formatToThousand } = useThousand();

// 取得遠端資料
const runtimeConfig = useRuntimeConfig();
const apiUrl = runtimeConfig.public.apiBase;
</script>

<template>
  <main>
    <!-- banner -->
    <roomsIndexBanner :modules="modules" />
    <!-- rooms list -->
    <roomsIndexRoomsList
      :modules="modules"
      :apiUrl="apiUrl"
      :formatToThousand="formatToThousand"
    />
  </main>
</template>
