<script setup>
import { Icon } from "@iconify/vue";
const { $Swal } = useNuxtApp();

// props
const props = defineProps({
  formatToThousand: Function,
  apiUrl: String,
  modules: Array,
});
// 房間細節
const roomsStore = useRoomsStore();
const { roomDetail } = storeToRefs(roomsStore);
const { setRoomDetail } = roomsStore;
const { data, error } = await useAsyncData(`rooms-list`, async () => {
  const response = await $fetch(`api/v1/rooms`, {
    baseURL: props.apiUrl,
  });
  setRoomDetail(response.result[0]);
  return response;
});

if (error.value) {
  $Swal.fire({
    icon: "error",
    title: "Oops...",
    text: error.value.message,
  });
  // Handle the error as needed
}
// swiper
const roomSwiper = ref(null);
const slidePrev = () => {
  roomSwiper.value.$el.swiper.slidePrev();
};

const slideNext = () => {
  roomSwiper.value.$el.swiper.slideNext();
};
</script>
<template>
  <section
    class="room-intro position-relative px-3 py-20 px-md-0 py-md-30 bg-neutral-120"
  >
    <div
      class="d-flex flex-column flex-md-row justify-content-center align-items-center justify-content-md-start align-items-md-end gap-6 gap-md-20"
    >
      <client-only>
        <Swiper
          ref="roomSwiper"
          :modules="modules"
          :slides-per-view="1"
          :pagination="true"
          :autoplay="{
            delay: 5000,
            disableOnInteraction: false,
          }"
          :loop="true"
        >
          <swiper-slide
            v-for="imageUrl in roomDetail.imageUrlList"
            :key="imageUrl"
          >
            <picture>
              <source :srcset="imageUrl" media="(min-width:768px)" />
              <img class="w-100" :src="imageUrl" alt="room-a" />
            </picture>
          </swiper-slide>
        </Swiper>
      </client-only>

      <div class="room-intro-content text-neutral-0">
        <h2 class="mb-2 mb-md-4 fw-bold">
          {{ roomDetail.name }}
        </h2>
        <p class="mb-6 mb-md-10 fs-8 fs-md-7">
          {{ roomDetail.description }}
        </p>
        <div class="mb-6 mb-md-10 fs-3 fw-bold">
          NT$ {{ formatToThousand(roomDetail.price) }}
        </div>
        <NuxtLink
          :to="`/rooms/${roomDetail._id}`"
          class="btn btn-neutral-0 d-flex justify-content-end align-items-center gap-3 w-100 p-5 p-md-10 mb-6 mb-md-10 text-end text-neutral-100 fs-7 fs-md-5 fw-bold border-0"
        >
          查看更多
          <div class="cta-deco" />
        </NuxtLink>
        <div class="d-flex justify-content-end">
          <button
            class="bg-transparent text-primary-100 icon-link icon-link-hover border-0"
            type="button"
            @click="slidePrev"
          >
            <Icon
              icon="mdi:arrow-left"
              class="bi m-4"
              style="
                font-size: 1.5rem;
                --bs-icon-link-transform: translateX(-0.25em);
              "
            />
          </button>
          <button
            class="bg-transparent text-primary-100 icon-link icon-link-hover border-0"
            type="button"
            @click="slideNext"
          >
            <Icon
              icon="mdi:arrow-right"
              class="bi m-4"
              style="font-size: 1.5rem"
            />
          </button>
        </div>
      </div>
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

.room-intro::after {
  position: absolute;
  z-index: -1;
  bottom: 265px;
  right: 0;
  content: "";
  width: 375px;
  height: 132px;
  background-image: url("/images/deco-wave-bg-sm.svg");
  background-repeat: no-repeat;

  @include media-breakpoint-up(md) {
    background-image: url("/images/deco-wave-bg.svg");
    width: 1920px;
    height: 86%;
    bottom: 0;
    left: -280px;
    right: auto;
  }

  @include media-breakpoint-up(lg) {
    height: 80%;
  }

  @include media-breakpoint-up(xl) {
    height: 62.5%;
    left: -100px;
  }

  @include media-breakpoint-up(xxxl) {
    height: 677px;
    bottom: 0;
    left: 0;
  }
}

.room-intro .swiper {
  --origin-width: 900;
  --container-width: 1920;
  --percent-width: calc(var(--origin-width) / var(--container-width) * 100vw);
  max-width: var(--percent-width);
  margin: 0;

  @include media-breakpoint-down(md) {
    max-width: 100%;
  }
}

.room-intro-content {
  max-width: 628px;

  @include media-breakpoint-up(xxxl) {
    flex-grow: 1;
  }
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
