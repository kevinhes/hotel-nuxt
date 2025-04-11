<script setup>
import { Icon } from "@iconify/vue";
const props = defineProps({
  modules: Array,
  apiUrl: String,
  formatToThousand: Function,
});
const store = useRoomsStore();
const { roomsList } = storeToRefs(store);
const { setRoomsList } = store;
const { data, error } = await useAsyncData(`rooms-list`, async () => {
  const response = await $fetch(`api/v1/rooms/`, {
    baseURL: props.apiUrl,
  });
  setRoomsList(response.result);

  return response;
});

if (error.value) {
  alert("發生錯誤 ! ");
  router.push("/room");
}
</script>
<template>
  <section class="py-10 py-md-30 bg-primary-10">
    <div class="container mb-md-12">
      <h4 class="mb-2 mb-md-4 fs-8 fs-md-6 fw-bold text-neutral-80">
        房型選擇
      </h4>
      <h2 class="mb-10 mb-md-20 fs-1 fw-bold text-primary-100">
        各種房型，任您挑選
      </h2>
      <ul class="d-flex flex-column gap-6 gap-md-12 list-unstyled">
        <li
          v-for="room in roomsList"
          :key="room._id"
          class="card flex-lg-row border-0 rounded-5 overflow-hidden"
        >
          <div class="row">
            <div class="col-12 col-lg-7">
              <client-only>
                <swiper
                  :modules="modules"
                  :slides-per-view="1"
                  navigation
                  :pagination="{ clickable: true }"
                  :autoplay="{
                    delay: 2500,
                    disableOnInteraction: false,
                  }"
                >
                  <swiper-slide
                    v-for="roomImage in room.imageUrlList"
                    :key="roomImage"
                  >
                    <picture>
                      <source :srcset="roomImage" media="(min-width: 768px)" />
                      <img
                        class="w-100 object-fit-cover"
                        :src="roomImage"
                        loading="lazy"
                        :alt="`room-${room.description}`"
                      />
                    </picture>
                  </swiper-slide>
                </swiper>
              </client-only>
            </div>
            <div class="col-12 col-lg-5">
              <div class="card-body pe-md-10 py-md-10">
                <h3 class="card-title fs-2 fw-bold text-neutral-100">
                  {{ room.name }}
                </h3>
                <p
                  class="card-text mb-6 mb-md-10 fs-8 fs-md-7 fw-medium text-neutral-80"
                >
                  {{ room.description }}
                </p>
                <ul class="d-flex gap-4 mb-6 mb-md-10 list-unstyled">
                  <li
                    class="card-info px-4 py-5 border border-primary-40 rounded-3"
                  >
                    <Icon
                      class="mb-2 fs-5 text-primary-100"
                      icon="fluent:slide-size-24-filled"
                    />
                    <p class="mb-0 fw-bold text-neutral-80 text-nowrap">
                      {{ room.areaInfo }}
                    </p>
                  </li>
                  <li
                    class="card-info px-4 py-5 border border-primary-40 rounded-3"
                  >
                    <Icon
                      class="mb-2 fs-5 text-primary-100"
                      icon="material-symbols:king-bed"
                    />
                    <p class="mb-0 fw-bold text-neutral-80 text-nowrap">
                      {{ room.bedInfo }}
                    </p>
                  </li>
                  <li
                    class="card-info px-4 py-5 border border-primary-40 rounded-3"
                  >
                    <Icon
                      class="mb-2 fs-5 text-primary-100"
                      icon="ic:baseline-person"
                    />
                    <p class="mb-0 fw-bold text-neutral-80 text-nowrap">
                      2-{{ room.maxPeople }} 人
                    </p>
                  </li>
                </ul>
                <div class="deco-line w-100 mb-6 mb-md-10" />
                <div
                  class="d-flex justify-content-between align-items-center fs-7 fs-md-5 text-primary-100"
                >
                  <p class="mb-0 fw-bold">
                    NT$ {{ formatToThousand(room.price) }}
                  </p>
                  <NuxtLink
                    :to="`/rooms/${room._id}`"
                    class="icon-link icon-link-hover text-primary-100"
                  >
                    <Icon class="bi fs-5" icon="mdi:arrow-right" />
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>
<style lang="scss" scoped>
@import "bootstrap/scss/mixins/breakpoints";

$grid-breakpoints: (
  xs: 0,
  sm: 576px,
  md: 768px,
  lg: 992px,
  xl: 1200px,
  xxl: 1400px,
  xxxl: 1537px,
);

.deco-line {
  width: 33vw;
  height: 2px;
  background-image: linear-gradient(to right, #be9c7c, #ffffff);
}

.card-info {
  width: 97px;
  height: 97px;
}

.swiper {
  display: grid;
}
.swiper :deep(.swiper-wrapper) {
  min-width: 0;
}

.swiper :deep(.swiper-button-prev),
.swiper :deep(.swiper-button-next) {
  width: 56px;
  height: 56px;
  background-color: #ffffff;
  color: #4b4b4b;
  border-radius: 100px;

  @include media-breakpoint-down(md) {
    display: none;
  }
}

.swiper :deep(.swiper-button-prev::after),
.swiper :deep(.swiper-button-next::after) {
  font-size: 40px;
}

.swiper :deep(.swiper-button-prev::after) {
  display: inline-block;
  width: 1em;
  height: 1em;
  --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='m14 18l-6-6l6-6l1.4 1.4l-4.6 4.6l4.6 4.6z'/%3E%3C/svg%3E");
  background-color: currentColor;
  -webkit-mask-image: var(--svg);
  mask-image: var(--svg);
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
}

.swiper :deep(.swiper-button-next::after) {
  display: inline-block;
  width: 1em;
  height: 1em;
  --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M12.6 12L8 7.4L9.4 6l6 6l-6 6L8 16.6z'/%3E%3C/svg%3E");
  background-color: currentColor;
  -webkit-mask-image: var(--svg);
  mask-image: var(--svg);
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
}

.swiper :deep(.swiper-pagination) {
  bottom: 24px;
}

.swiper :deep(.swiper-pagination-bullet) {
  width: 32px;
  height: 4px;
  background-color: #f1eae4;
  border-radius: 100px;
  opacity: 1;
}

.swiper :deep(.swiper-pagination-bullet-active) {
  width: 60px;
  background-color: #bf9d7d;
}
</style>
