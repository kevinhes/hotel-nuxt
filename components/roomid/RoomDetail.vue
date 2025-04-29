<script setup>
import { Icon } from "@iconify/vue";
const props = defineProps({
  roomDetail: Object,
});
</script>
<template>
  <div class="col-12 col-md-7 d-flex flex-column gap-6 gap-md-20">
    <div>
      <h1 class="mb-4 text-neutral-100 fw-bold">
        {{ roomDetail.name }}
      </h1>
      <p class="mb-0 text-neutral-80 fs-8 fs-md-7 fw-medium">
        {{ roomDetail.description }}
      </p>
    </div>
    <roomidRoomDetailList :roomDetail="roomDetail" />
  </div>
</template>
<style scoped></style>
