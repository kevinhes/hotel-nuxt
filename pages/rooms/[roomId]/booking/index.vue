<script setup>
import { Icon } from "@iconify/vue";
definePageMeta({
  middleware: async (to, from) => {
    const bookingStore = useBookingStore();
    const { bookingDate } = bookingStore;
    const roomId = to.params.roomId;
    if (bookingDate.date.start === null || bookingDate.date.end === null) {
      return navigateTo(`/rooms/${roomId}`);
    }
  },
});

import dayjs from "dayjs";
import "dayjs/locale/zh-tw";
dayjs.locale("zh-tw");

// 驗證資訊
const runtimeConfig = useRuntimeConfig();
const apiUrl = runtimeConfig.public.apiBase;
const authCookie = useCookie("auth");
console.log(apiUrl);

// 千分位
const { formatToThousand } = useThousand();

// 日期
const formatDate = (date) => {
  const newDate = dayjs(date).format("M 月 D 日 dddd"); // 使用 dddd 表示星期
  return newDate;
};

const router = useRouter();
const route = useRoute();
const roomId = route.params.roomId;

// 預定資訊
const bookingStore = useBookingStore();
const { bookingPeople } = storeToRefs(bookingStore);
const { bookingDate, totalDate, setBookingId } = bookingStore;

// 房間細節
const roomsStore = useRoomsStore();
const { roomDetail } = storeToRefs(roomsStore);
const { getRoomDetail } = roomsStore;
const { data, error } = await useAsyncData(`rooms-detail`, () =>
  getRoomDetail(roomId)
);

if (error.value) {
  alert("發生錯誤 ! ");
  router.push("/");
}

// userinfo
const authStore = useAuthStore();
const { userProfile } = storeToRefs(authStore);

// 上一頁
const goBack = () => {
  router.back();
};
const isLoading = ref(false);

// 訂單相關
const submitButtonRef = ref(null);

// 處理表單提交
const formRef = ref(null);
const confirmReservation = () => {
  submitButtonRef.value.click();
};

const onSubmit = async (value = {}, { resetForm }) => {
  isLoading.value = true;
  const bookingInfo = {
    roomId: roomId,
    checkInDate: bookingDate.date.start,
    checkOutDate: bookingDate.date.end,
    peopleNum: bookingPeople.value,
    userInfo: {
      address: {
        zipcode: 802,
        detail: value["地址"],
      },
      name: value["姓名"],
      phone: value["手機號碼"],
      email: value["電子信箱"],
    },
  };
  try {
    const res = await $fetch("api/v1/orders/", {
      method: "POST",
      baseURL: apiUrl,
      headers: {
        authorization: authCookie.value,
      },
      body: bookingInfo,
    });
    if (res.status === true) {
      isLoading.value = false;
      setBookingId(res.result._id);
      router.push(`/rooms/${roomId}/booking/${res.result._id}`);
    }
  } catch (error) {
    console.log(error);
  } finally {
    console.log(bookingInfo);
  }
  // console.log("送出的值:", value);
  // alert("送出訂房!");
  resetForm();
};

// 與會員資料相同
const { setValues } = useForm();

const applyUserInfo = () => {
  formRef.value.setValues({
    姓名: userProfile.value.name,
    手機號碼: userProfile.value.phone,
    電子信箱: userProfile.value.email,
    地址: userProfile.value.address.detail,
  });
};
</script>

<template>
  <main class="pt-18 pt-md-30 bg-neutral-120">
    <section class="py-10 py-md-30 bg-primary-10">
      <div class="container">
        <button
          class="d-flex align-items-baseline gap-2 mb-10 bg-transparent border-0"
          type="button"
          @click="goBack"
        >
          <Icon class="fs-5 text-neutral-100" icon="mdi:keyboard-arrow-left" />
          <h1 class="mb-0 text-neutral-100 fs-3 fw-bold">確認訂房資訊</h1>
        </button>

        <div class="row gap-10 gap-md-0">
          <div class="col-12 col-md-7">
            <section>
              <h2 class="mb-8 mb-md-10 text-neutral-100 fs-6 fs-md-4 fw-bold">
                訂房資訊
              </h2>
              <div class="d-flex flex-column gap-6">
                <div
                  class="d-flex justify-content-between align-items-center text-neutral-100"
                >
                  <div>
                    <h3 class="title-deco mb-2 fs-7 fw-bold">選擇房型</h3>
                    <p class="mb-0 fw-medium">
                      {{ roomDetail.name }}
                    </p>
                  </div>
                  <button
                    class="bg-transparent border-0 fw-bold text-decoration-underline"
                    type="button"
                  >
                    編輯
                  </button>
                </div>
                <div
                  class="d-flex justify-content-between align-items-center text-neutral-100"
                >
                  <div>
                    <h3 class="title-deco mb-2 fs-7 fw-bold">訂房日期</h3>
                    <p class="mb-2 fw-medium">
                      入住：{{ formatDate(bookingDate.date.start) }}
                    </p>
                    <p class="mb-0 fw-medium">
                      退房：{{ formatDate(bookingDate.date.end) }}
                    </p>
                  </div>
                  <button
                    class="bg-transparent border-0 fw-bold text-decoration-underline"
                    type="button"
                  >
                    編輯
                  </button>
                </div>
                <div
                  class="d-flex justify-content-between align-items-center text-neutral-100"
                >
                  <div>
                    <h3 class="title-deco mb-2 fs-7 fw-bold">房客人數</h3>
                    <p class="mb-0 fw-medium">{{ bookingPeople }} 人</p>
                  </div>
                  <button
                    class="bg-transparent border-0 fw-bold text-decoration-underline"
                    type="button"
                  >
                    編輯
                  </button>
                </div>
              </div>
            </section>

            <hr class="my-10 my-md-12 opacity-100 text-neutral-60" />

            <!-- 訂房者資訊 -->
            <section>
              <div
                class="d-flex justify-content-between align-items-center mb-10"
              >
                <h2 class="mb-0 text-neutral-100 fs-6 fs-md-4 fw-bold">
                  訂房人資訊
                </h2>
                <button
                  class="text-primary-100 bg-transparent border-0 fw-bold text-decoration-underline"
                  type="button"
                  @click="applyUserInfo"
                >
                  套用會員資料
                </button>
              </div>

              <VForm
                class="d-flex flex-column gap-6"
                ref="formRef"
                @submit="onSubmit"
                v-slot="{ errors }"
              >
                <div class="text-neutral-100">
                  <label for="name" class="form-label fw-bold">姓名</label>
                  <VField
                    id="name"
                    name="姓名"
                    rules="required|min:2"
                    type="text"
                    class="form-control p-3 rounded-3"
                    :class="{ 'is-invalid': errors['姓名'] }"
                    placeholder="請輸入姓名"
                  />
                  <VErrorMessage name="姓名" class="invalid-feedback" />
                </div>

                <div class="text-neutral-100">
                  <label for="phone" class="form-label fw-bold">手機號碼</label>
                  <VField
                    id="phone"
                    name="手機號碼"
                    rules="required|isPhone"
                    type="tel"
                    class="form-control p-3 rounded-3"
                    :class="{ 'is-invalid': errors['手機號碼'] }"
                    placeholder="請輸入手機號碼"
                  />
                  <VErrorMessage name="手機號碼" class="invalid-feedback" />
                </div>

                <div class="text-neutral-100">
                  <label for="email" class="form-label fw-bold">電子信箱</label>
                  <VField
                    id="email"
                    name="電子信箱"
                    rules="required|email"
                    type="email"
                    class="form-control p-3 rounded-3"
                    :class="{ 'is-invalid': errors['電子信箱'] }"
                    placeholder="請輸入電子信箱"
                  />
                  <VErrorMessage name="電子信箱" class="invalid-feedback" />
                </div>

                <div class="text-neutral-100">
                  <label for="address" class="form-label fs-8 fs-md-7 fw-bold"
                    >地址</label
                  >
                  <div className="d-flex gap-2 mb-4">
                    <VField
                      as="select"
                      v-slot="value"
                      name="縣市"
                      rules="required"
                      class="form-select w-50 p-3 fw-medium rounded-3"
                      :class="{ 'is-invalid': errors['縣市'] }"
                    >
                      <option selected disabled value="">請選擇縣市</option>
                      <option value="高雄市">高雄市</option>
                    </VField>
                    <VField
                      as="select"
                      name="行政區"
                      rules="required"
                      class="form-select w-50 p-3 fw-medium rounded-3"
                      :class="{ 'is-invalid': errors['行政區'] }"
                    >
                      <option selected disabled value="">請選擇行政區</option>
                      <option value="前金區">前金區</option>
                      <option value="鹽埕區">鹽埕區</option>
                      <option value="新興區">新興區</option>
                    </VField>
                  </div>
                  <VField
                    id="road"
                    name="地址"
                    rules="required"
                    type="text"
                    class="form-control p-3 rounded-3"
                    :class="{ 'is-invalid': errors['地址'] }"
                    placeholder="請輸入詳細地址"
                  />
                  <VErrorMessage name="地址" class="invalid-feedback" />
                </div>
                <button
                  ref="submitButtonRef"
                  type="submit"
                  class="d-none"
                ></button>
              </VForm>
            </section>

            <hr class="my-10 my-md-12 opacity-100 text-neutral-60" />

            <section>
              <h2 class="mb-8 mb-md-10 text-neutral-100 fs-6 fs-md-4 fw-bold">
                房間資訊
              </h2>
              <div class="d-flex flex-column gap-6">
                <section>
                  <h3 class="title-deco mb-4 mb-md-6 fs-7 fs-md-5 fw-bold">
                    房型基本資訊
                  </h3>
                  <ul class="d-flex gap-4 list-unstyled">
                    <li
                      class="card-info px-4 py-5 bg-neutral-0 border border-primary-40 rounded-3"
                    >
                      <Icon
                        class="mb-2 fs-5 text-primary-100"
                        icon="fluent:slide-size-24-filled"
                      />
                      <p class="mb-0 fw-bold text-neutral-80 text-nowrap">
                        {{ roomDetail.areaInfo }}
                      </p>
                    </li>
                    <li
                      class="card-info px-4 py-5 bg-neutral-0 border border-primary-40 rounded-3"
                    >
                      <Icon
                        class="mb-2 fs-5 text-primary-100"
                        icon="material-symbols:king-bed"
                      />
                      <p class="mb-0 fw-bold text-neutral-80 text-nowrap">
                        {{ roomDetail.bedInfo }}
                      </p>
                    </li>
                    <li
                      class="card-info px-4 py-5 bg-neutral-0 border border-primary-40 rounded-3"
                    >
                      <Icon
                        class="mb-2 fs-5 text-primary-100"
                        icon="ic:baseline-person"
                      />
                      <p class="mb-0 fw-bold text-neutral-80 text-nowrap">
                        2-{{ roomDetail.maxPeople }} 人
                      </p>
                    </li>
                  </ul>
                </section>

                <section>
                  <h3
                    class="title-deco mb-4 mb-md-6 text-neutral-100 fs-7 fs-md-5 fw-bold"
                  >
                    房間格局
                  </h3>
                  <ul
                    class="d-flex flex-wrap gap-6 gap-md-10 p-6 fs-8 fs-md-7 bg-neutral-0 rounded-3 list-unstyled"
                  >
                    <li
                      class="d-flex gap-2"
                      v-for="layout in roomDetail.layoutInfo"
                      :key="layout.title"
                    >
                      <Icon
                        class="fs-5 text-primary-100"
                        icon="material-symbols:check"
                      />
                      <p class="mb-0 text-neutral-80 fw-bold">
                        {{ layout.title }}
                      </p>
                    </li>
                  </ul>
                </section>

                <section>
                  <h3
                    class="title-deco mb-4 mb-md-6 text-neutral-100 fs-7 fs-md-5 fw-bold"
                  >
                    房內設備
                  </h3>
                  <ul
                    class="d-flex flex-wrap row-gap-2 p-6 mb-0 fs-8 fs-md-7 bg-neutral-0 rounded-3 list-unstyled"
                  >
                    <li
                      class="flex-item d-flex gap-2"
                      v-for="facility in roomDetail.facilityInfo"
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
                  <h3
                    class="title-deco mb-4 mb-md-6 text-neutral-100 fs-7 fs-md-5 fw-bold"
                  >
                    備品提供
                  </h3>
                  <ul
                    class="d-flex flex-wrap row-gap-2 p-6 mb-0 fs-8 fs-md-7 bg-neutral-0 rounded-3 list-unstyled"
                  >
                    <li
                      class="flex-item d-flex gap-2"
                      v-for="amenity in roomDetail.amenityInfo"
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
              </div>
            </section>
          </div>

          <div class="col-12 col-md-5">
            <div
              class="confirm-form rounded-3xl d-flex flex-column gap-10 p-6 p-md-10 mx-auto ms-md-auto me-md-0 bg-neutral-0"
            >
              <img
                class="img-fluid rounded-3"
                :src="roomDetail.imageUrl"
                alt="room-a"
              />

              <div>
                <h2 className="mb-6 text-neutral-100 fs-6 fs-md-4 fw-bold">
                  價格詳情
                </h2>
                <div
                  class="d-flex justify-content-between align-items-center mb-3"
                >
                  <div
                    class="d-flex align-items-center text-neutral-100 fw-medium"
                  >
                    <span>NT$ {{ formatToThousand(roomDetail.price) }}</span>
                    <Icon
                      class="ms-2 me-1 text-neutral-80"
                      icon="material-symbols:close"
                    />
                    <span class="text-neutral-80">{{ totalDate }} 晚</span>
                  </div>
                  <span class="fw-medium">
                    NT$
                    {{
                      formatToThousand(parseInt(roomDetail.price) * totalDate)
                    }}
                  </span>
                </div>
                <div
                  class="d-flex justify-content-between align-items-center fw-medium"
                >
                  <p class="d-flex align-items-center mb-0 text-neutral-100">
                    住宿折扣
                  </p>
                  <span class="text-primary-100"> -NT$ 1,000 </span>
                </div>
                <hr class="my-6 opacity-100 text-neutral-40" />
                <div
                  class="d-flex justify-content-between align-items-center text-neutral-100 fw-bold"
                >
                  <p class="d-flex align-items-center mb-0">總價</p>
                  <span>
                    NT$
                    {{
                      formatToThousand(
                        parseInt(roomDetail.price) * totalDate - 1000
                      )
                    }}
                  </span>
                </div>
              </div>

              <button
                class="btn btn-primary-100 py-4 text-neutral-0 fw-bold rounded-3"
                type="button"
                @click="confirmReservation"
              >
                確認訂房
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <roomsBookingLoading v-if="isLoading" />
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

.title-deco {
  display: flex;
  align-items: center;
}

.title-deco::before {
  content: "";
  display: inline-block;
  width: 4px;
  height: 24px;
  background-color: #bf9d7d;
  border-radius: 10px;
  margin-right: 0.75rem;
}

.form-control::placeholder {
  --neutral-60: #909090;
  color: var(--neutral-60);
  font-weight: 500;
}

.card-info {
  width: 97px;
  height: 97px;
}

.flex-item {
  flex: 1 1 15%;

  @include media-breakpoint-down(md) {
    flex-basis: 40%;
  }
}

.rounded-3xl {
  border-radius: 1.25rem;
}

.confirm-form {
  position: sticky;
  top: 160px;
  max-width: 478px;

  @include media-breakpoint-down(md) {
    position: static;
    top: 0;
    max-width: auto;
  }
}
</style>
