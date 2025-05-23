<script setup>
// import { RouterLink } from 'vue-router';
import { Icon } from "@iconify/vue";
const runtimeConfig = useRuntimeConfig();
const apiUrl = runtimeConfig.public.apiBase;
const authCookie = useCookie("auth");
const router = useRouter();
import dayjs from "dayjs";
import "dayjs/locale/zh-tw";
dayjs.locale("zh-tw");

// 千分位
const { formatToThousand } = useThousand();

// 日期
const formatDate = (date) => {
  const newDate = dayjs(date).format("M 月 D 日 dddd"); // 使用 dddd 表示星期
  return newDate;
};

// 天數
const totalDate = (endDate, startDate) => {
  return dayjs(endDate).diff(dayjs(startDate), "day");
};

// 取得訂單資訊
const {
  data: ordersList,
  error,
  refresh,
} = await useAsyncData("order-detail", async () => {
  const response = await $fetch(`api/v1/orders`, {
    method: "GET",
    baseURL: apiUrl,
    headers: {
      authorization: authCookie.value,
    },
  });
  return response.result;
});

if (error.value) {
  console.log(error.value);
}

const presentOrderList = computed(
  () => ordersList.value?.filter((order) => order.status === 0) || []
);
const historyOrderListDisdayNum = ref(3);
const historyOrderList = computed(
  () =>
    ordersList.value
      ?.filter((order) => order.status === -1)
      .slice(0, historyOrderListDisdayNum.value) || []
);
// 展示更多歷史訂單
const setHistoryOrderListDisdayNum = () => {
  historyOrderListDisdayNum.value = historyOrderListDisdayNum.value + 3;
};

// 取消預訂
const deletedOrderId = ref("");
const setDeleteOrderId = (orderId) => {
  deletedOrderId.value = orderId;
};
const deleteOrder = async () => {
  try {
    const response = await $fetch(`api/v1/orders/${deletedOrderId.value}`, {
      method: "DELETE",
      baseURL: apiUrl,
      headers: {
        authorization: authCookie.value,
      },
    });

    console.log(response);
    deletedOrderId.value = "";
    refresh();
  } catch (error) {
    console.error(error.data);
  }
};
</script>

<template>
  <div class="row gap-6 gap-md-0">
    <div class="col-12 col-md-7">
      <div
        class="rounded-5 d-flex flex-column gap-6 gap-md-10 p-4 p-md-10 bg-neutral-0 mb-md-5"
        style="max-width: 730px"
        v-for="order in presentOrderList"
        :key="order._id"
      >
        <div>
          <p class="mb-2 text-neutral-80 fs-8 fs-md-7 fw-medium">
            預訂參考編號： {{ order._id }}
          </p>
          <h2 class="mb-0 text-neutral-100 fs-7 fs-md-5 fw-bold">
            即將來的行程
          </h2>
        </div>

        <img
          class="img-fluid rounded-3"
          :src="order.roomId.imageUrl"
          alt="room-a"
        />

        <section class="d-flex flex-column gap-6">
          <h3
            class="d-flex align-items-center mb-0 text-neutral-80 fs-8 fs-md-6 fw-bold"
          >
            <p class="mb-0">
              {{ order.roomId.name }}，{{
                totalDate(order.checkOutDate, order.checkInDate)
              }}
              晚
            </p>
            <span
              class="d-inline-block mx-4 bg-neutral-80"
              style="width: 1px; height: 18px"
            />
            <p class="mb-0">住宿人數：{{ order.pepleNum }} 位</p>
          </h3>

          <div class="text-neutral-80 fs-8 fs-md-7 fw-bold">
            <p class="title-deco mb-2">
              入住：{{ formatDate(order.checkInDate) }}，15:00 可入住
            </p>
            <p class="title-deco mb-0">
              退房：{{ formatDate(order.checkOutDate) }}，12:00 前退房
            </p>
          </div>

          <p class="mb-0 text-neutral-80 fs-8 fs-md-7 fw-bold">
            NT$
            {{
              formatToThousand(
                order.roomId.price *
                  totalDate(order.checkOutDate, order.checkInDate)
              )
            }}
          </p>
        </section>

        <hr class="my-0 opacity-100 text-neutral-40" />

        <section>
          <h3 class="title-deco mb-6 text-neutral-100 fs-8 fs-md-7 fw-bold">
            房內設備
          </h3>
          <ul
            class="d-flex flex-wrap row-gap-2 column-gap-10 p-6 mb-0 fs-8 fs-md-7 bg-neutral-0 border border-neutral-40 rounded-3 list-unstyled"
          >
            <li
              class="flex-item d-flex gap-2"
              v-for="facility in order.roomId.facilityInfo"
              :key="facility.title"
            >
              <Icon
                class="fs-5 text-primary-100"
                icon="material-symbols:check"
              />
              <p class="mb-0 text-neutral-80 fw-bold">
                {{ facility.title }}
              </p>
            </li>
          </ul>
        </section>

        <section>
          <h3 class="title-deco mb-6 text-neutral-100 fs-8 fs-md-7 fw-bold">
            備品提供
          </h3>
          <ul
            class="d-flex flex-wrap row-gap-2 column-gap-10 p-6 mb-0 fs-8 fs-md-7 bg-neutral-0 border border-neutral-40 rounded-3 list-unstyled"
          >
            <li
              class="flex-item d-flex gap-2"
              v-for="amenity in order.roomId.amenityInfo"
              :key="amenity.title"
            >
              <Icon
                class="fs-5 text-primary-100"
                icon="material-symbols:check"
              />
              <p class="mb-0 text-neutral-80 fw-bold">
                {{ amenity.title }}
              </p>
            </li>
          </ul>
        </section>

        <div class="d-flex gap-4">
          <button
            data-bs-toggle="modal"
            data-bs-target="#cancelModal"
            class="btn btn-outline-primary-100 w-50 py-4 fw-bold"
            style="--bs-btn-hover-color: #fff"
            type="button"
            @click="setDeleteOrderId(order._id)"
          >
            取消預訂
          </button>
          <NuxtLink
            :to="`/rooms/${order.roomId._id}`"
            class="btn btn-primary-100 text-neutral-0 w-50 py-4 fw-bold"
            type="button"
          >
            查看詳情
          </NuxtLink>
        </div>
      </div>
    </div>
    <div class="col-12 col-md-5">
      <div
        class="rounded-5 d-flex flex-column gap-6 gap-md-10 p-4 p-md-10 bg-neutral-0"
      >
        <h2 class="mb-0 text-neutral-100 fs-7 fs-md-5 fw-bold">歷史訂單</h2>
        <div
          v-for="(historyOrder, index) in historyOrderList"
          :key="historyOrder._id"
        >
          <div class="d-flex flex-column flex-lg-row gap-6 mb-6 mb-md-10">
            <img
              class="img-fluid object-fit-cover rounded-3"
              style="max-width: 120px; height: 80px"
              :src="historyOrder.roomId.imageUrl"
              alt="room-a"
            />
            <section class="d-flex flex-column gap-4">
              <p class="mb-0 text-neutral-80 fs-8 fs-md-7 fw-medium">
                預訂參考編號： {{ historyOrder._id }}
              </p>

              <h3
                class="d-flex align-items-center mb-0 text-neutral-80 fs-8 fs-md-6 fw-bold"
              >
                {{ historyOrder.roomId.name }}
              </h3>

              <div class="text-neutral-80 fw-medium">
                <p class="mb-2">
                  住宿天數：
                  {{
                    totalDate(
                      historyOrder.checkOutDate,
                      historyOrder.checkInDate
                    )
                  }}
                  晚
                </p>
                <p class="mb-0">住宿人數：{{ historyOrder.pepleNum }} 位</p>
              </div>

              <div class="text-neutral-80 fs-8 fs-md-7 fw-medium">
                <p class="title-deco mb-2">
                  入住：{{ formatDate(historyOrder.checkInDate) }}，15:00 可入住
                </p>
                <p class="title-deco mb-0">
                  退房：{{ formatDate(historyOrder.checkOutDate) }}，12:00
                  前退房
                </p>
              </div>
              <p class="mb-0 text-neutral-80 fs-8 fs-md-7 fw-bold">
                NT$
                {{
                  formatToThousand(
                    historyOrder.roomId.price *
                      totalDate(
                        historyOrder.checkOutDate,
                        historyOrder.checkInDate
                      )
                  )
                }}
              </p>
            </section>
          </div>

          <hr
            class="my-0 opacity-100 text-neutral-40"
            v-if="index + 1 !== historyOrderList.length"
          />
        </div>

        <button
          class="btn btn-outline-primary-100 py-4 fw-bold"
          style="--bs-btn-hover-color: #fff"
          type="button"
          @click="setHistoryOrderListDisdayNum"
        >
          查看更多
        </button>
      </div>
    </div>
  </div>

  <div id="cancelModal" class="modal fade" tabindex="-1">
    <div
      class="modal-dialog modal-dialog-centered align-items-end align-items-md-center m-0 mx-md-auto h-100"
    >
      <div class="modal-content">
        <div class="modal-header">
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div
          class="modal-body mx-auto my-10 my-md-15 text-neutral-80 fs-8 fs-md-6 fw-bold"
        >
          確定要取消此房型的預訂嗎？
        </div>
        <div class="modal-footer d-flex gap-4">
          <button
            type="button"
            class="btn btn-outline-primary-100 flex-grow-1 m-0 py-4 fw-bold"
            style="--bs-btn-hover-color: #fff"
            data-bs-dismiss="modal"
          >
            關閉視窗
          </button>
          <button
            type="button"
            class="btn btn-primary-100 flex-grow-1 m-0 py-4 text-white fw-bold"
            data-bs-dismiss="modal"
            @click="deleteOrder"
          >
            確定取消
          </button>
        </div>
      </div>
    </div>
  </div>
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

.title-deco {
  display: flex;
  align-items: center;
}

.title-deco::before {
  --color: #bf9d7d;
  content: "";
  display: inline-block;
  width: 4px;
  height: 24px;
  background-color: var(--color);
  border-radius: 10px;
  margin-right: 0.75rem;
}

.title-deco:nth-child(2)::before {
  --color: #909090;
}

.flex-item {
  max-width: 97px;
  width: 100%;
  white-space: nowrap;
}

.modal {
  backdrop-filter: blur(10px);

  @include media-breakpoint-down(md) {
    backdrop-filter: none;
  }
}

.modal-header {
  @include media-breakpoint-down(md) {
    border-bottom: 0 !important;
  }
}

.modal-content {
  @include media-breakpoint-down(md) {
    border-bottom-left-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
  }
}
</style>
