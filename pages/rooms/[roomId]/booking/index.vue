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

// 驗證資訊
const runtimeConfig = useRuntimeConfig();
const apiUrl = runtimeConfig.public.apiBase;
const authCookie = useCookie("auth");

const router = useRouter();
const route = useRoute();
const roomId = route.params.roomId;

// 預定資訊
const bookingStore = useBookingStore();
const { bookingPeople } = storeToRefs(bookingStore);
const { bookingDate, setBookingId } = bookingStore;

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
            <!-- 訂房資訊 -->
            <bookingpageBookingInfo :roomDetail="roomDetail" />

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
                <roomidRoomDetailList :roomDetail="roomDetail" />
              </div>
            </section>
          </div>
          <bookingpageBookingConfirmation
            :roomDetail="roomDetail"
            @submit-form="confirmReservation"
          />
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
