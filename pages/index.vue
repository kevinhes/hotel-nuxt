<script setup>
import { Icon } from "@iconify/vue";
const { $Swal } = useNuxtApp();

// swiper
import { Autoplay, Navigation, Pagination } from "swiper/modules";
const modules = [Autoplay, Navigation, Pagination];

const runtimeConfig = useRuntimeConfig();
const apiUrl = runtimeConfig.public.apiBase;
// 千分位
const { formatToThousand } = useThousand();

// 新聞列表
const { data: newsList, error: newsListError } = await useAsyncData(
  `news-list`,
  async () => {
    const response = await $fetch(`api/v1/home/news`, {
      baseURL: apiUrl,
    });
    // console.log(response.value);
    return response.result;
  }
);

// 美味佳餚
const { data: culinaryList, error: culinaryListError } = await useAsyncData(
  `culinary-list`,
  async () => {
    const response = await $fetch(`api/v1/home/culinary/`, {
      baseURL: apiUrl,
    });
    return response.result;
  }
);

// }
</script>

<template>
  <main class="overflow-hidden">
    <!-- banner -->
    <homePageHomeBanner :modules="modules" />
    <!-- news list -->
    <homePageHomeNewsList :newsList="newsList" />

    <!-- about -->
    <homePageHomeAbout />
    <!-- room inftro -->
    <HomePageHomeRoomIntro
      :formatToThousand="formatToThousand"
      :apiUrl="apiUrl"
      :modules="modules"
    />
    <!-- delicacy -->
    <section class="delicacy position-relative py-20 py-md-30 bg-primary-10">
      <div class="container">
        <div class="d-flex align-items-center gap-10 mb-10 mb-md-20">
          <h2 class="mb-0 fs-1 fw-bold text-primary-100">佳餚<br />美饌</h2>
          <div class="deco-line" />
        </div>
        <div class="row flex-nowrap overflow-x-auto">
          <div
            v-for="culinary in culinaryList"
            :key="culinary._id"
            class="col-10 col-md-6 col-xl-4"
          >
            <div class="card position-relative border-0 rounded-3">
              <picture>
                <source :srcset="culinary.image" media="(min-width: 576px)" />
                <img
                  class="w-100 rounded-3"
                  :src="culinary.image"
                  :alt="culinary.title"
                />
              </picture>
              <div
                class="card-body position-absolute bottom-0 p-4 p-md-6 rounded-bottom-3 text-neutral-0"
              >
                <div
                  class="d-flex justify-content-between align-items-center mb-4 mb-md-6"
                >
                  <h5 class="card-title mb-0 fw-bold">
                    {{ culinary.title }}
                  </h5>
                  <div
                    class="d-flex justify-content-between gap-4 text-neutral-40 fs-8 fs-md-7"
                  >
                    <span class="fw-bold">{{
                      culinary.diningTime.split(" ")[0]
                    }}</span>
                    <span class="fw-bold">{{
                      culinary.diningTime.split(" ")[1]
                    }}</span>
                  </div>
                </div>
                <p class="card-text fs-8 fs-md-7">
                  {{ culinary.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- transportation -->
    <section class="transportation bg-neutral-120">
      <div class="container pt-20 pb-10 pt-md-30 pb-md-20">
        <div class="d-flex align-items-center gap-10 mb-10 mb-md-20">
          <h2 class="mb-0 fs-1 fw-bold text-primary-100">交通<br />方式</h2>
          <div class="deco-line" />
        </div>
        <div class="row gap-6 gap-md-0">
          <div class="col-12 mb-md-10">
            <p class="text-neutral-40 fw-bold">台灣高雄市新興區六角路123號</p>
            <picture>
              <source
                srcset="/images/home-map.png"
                media="(min-width: 576px)"
              />
              <img
                class="w-100"
                src="/images/home-map-sm.png"
                alt="描述地圖中酒店所在的位置"
              />
            </picture>
          </div>
          <div class="col-12 col-md-4 text-neutral-0">
            <Icon
              class="mb-2 mb-md-4 display-1 text-primary-100"
              icon="ic:baseline-directions-car"
            />
            <h5 class="fs-7 fs-md-5 fw-bold">自行開車</h5>
            <p class="mb-0 fs-8 fs-md-7">
              如果您選擇自行開車，可以透過國道一號下高雄交流道，往市區方向行駛，並依路標指示即可抵達「享樂酒店」。飯店內設有停車場，讓您停車方便。
            </p>
          </div>
          <div class="col-12 col-md-4 text-neutral-0">
            <Icon
              class="mb-2 mb-md-4 display-1 text-primary-100"
              icon="ic:baseline-train"
            />
            <h5 class="fs-7 fs-md-5 fw-bold">高鐵/火車</h5>
            <p class="mb-0 fs-8 fs-md-7">
              如果您是搭乘高鐵或火車，可於左營站下車，外頭有計程車站，搭乘計程車約20分鐘即可抵達。或者您也可以轉乘捷運紅線至中央公園站下車，步行約10分鐘便可抵達。
            </p>
          </div>
          <div class="col-12 col-md-4 text-neutral-0">
            <Icon
              class="mb-2 mb-md-4 display-1 text-primary-100"
              icon="mdi:car-side"
            />
            <h5 class="fs-7 fs-md-5 fw-bold">禮賓車服務</h5>
            <p class="mb-0 fs-8 fs-md-7">
              承億酒店提供禮賓專車接送服務，但因目的地遠近會有不同的收費，請撥打電話將由專人為您服務洽詢專線：(07)123-4567
            </p>
          </div>
        </div>
      </div>
      <picture>
        <source
          srcset="/images/deco-line-group-horizontal-full.svg"
          media="(min-width:576px)"
        />
        <img
          class="w-100"
          src="/images/deco-line-group-horizontal-sm.svg"
          alt="deco-line-group"
        />
      </picture>
    </section>
  </main>
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

.delicacy::before {
  @include media-breakpoint-up(lg) {
    position: absolute;
    top: -40px;
    right: 80px;
    content: "";
    width: 200px;
    height: 200px;
    background-image: url("/images/deco-dot-group.svg");
  }
}

.delicacy::after {
  @include media-breakpoint-up(xxxl) {
    position: absolute;
    top: 55px;
    left: 40px;
    content: "";
    width: 187px;
    height: 1068px;
    background-image: url("/images/deco-line-group-vertical.svg");
  }
}

.delicacy .deco-line {
  width: 200px;

  @include media-breakpoint-up(md) {
    width: 167px;
  }
}

.delicacy .card-body {
  background-image: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #140f0a 77.6%);
  backdrop-filter: blur(10px);
}

.transportation .deco-line {
  width: 161px;

  @include media-breakpoint-down(md) {
    width: 194px;
  }
}
</style>
