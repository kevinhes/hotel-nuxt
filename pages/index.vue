<script setup>
const { $Swal } = useNuxtApp();

// swiper
import { Autoplay, Navigation, Pagination } from "swiper/modules";
const modules = [Autoplay, Navigation, Pagination];

const runtimeConfig = useRuntimeConfig();
const apiUrl = runtimeConfig.public.apiBase;
// 千分位
const { formatToThousand } = useThousand();

// }
</script>

<template>
  <main class="overflow-hidden">
    <!-- banner -->
    <homePageHomeBanner :modules="modules" />
    <!-- news list -->
    <homePageHomeNewsList :apiUrl="apiUrl" />

    <!-- about -->
    <homePageHomeAbout />
    <!-- room inftro -->
    <HomePageHomeRoomIntro
      :formatToThousand="formatToThousand"
      :apiUrl="apiUrl"
      :modules="modules"
    />
    <!-- delicacy -->
    <homePageHomeDelicacy :apiUrl="apiUrl" />
    <!-- transportation -->
    <homePageHomeTransportation />
  </main>
</template>
