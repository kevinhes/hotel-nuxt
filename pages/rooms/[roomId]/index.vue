<script setup>
const route = useRoute();
const router = useRouter();
const roomId = route.params.roomId;
import { Icon } from "@iconify/vue";

// 千分位
const { formatToThousand } = useThousand();

// 訂房資訊
const bookingStore = useBookingStore();
const { bookingPeople } = storeToRefs(bookingStore);
const { bookingDate, pushToBooking } = bookingStore;
const MAX_BOOKING_PEOPLE = 10;
const daysCount = ref(0);

// modal
const datePickerModal = ref(null);
const openModal = () => {
  datePickerModal.value.openModal();
};

// 日期格式
// 手機版日期格式
const daysFormatOnMobile = (date) => date?.split("-").slice(1, 3).join(" / ");

const handleDateChange = (bookingInfo) => {
  const { start, end } = bookingInfo.date;
  bookingDate.date.start = start;
  bookingDate.date.end = end;

  bookingPeople.value = bookingInfo?.people || 1;
  daysCount.value = bookingInfo.daysCount;
};

// 房間細節
const roomsStore = useRoomsStore();
const { roomDetail } = storeToRefs(roomsStore);
const { getRoomDetail } = roomsStore;
const { data, error } = await useAsyncData(`rooms-detail`, () => {
  return getRoomDetail(roomId);
});

if (error.value) {
  alert("發生錯誤 ! ");
  router.push("/");
}
</script>

<template>
  <main class="mt-18 mt-md-30 bg-neutral-100">
    <!-- banner -->
    <roomidBanner :roomDetail="roomDetail" />
    <!-- room detail -->
    <section class="py-10 py-md-30 bg-primary-10">
      <div class="container">
        <div class="row">
          <roomidRoomDetail :roomDetail="roomDetail" />
          <div class="d-none d-md-block col-md-5">
            <div
              class="rounded-5 position-sticky d-flex flex-column gap-10 p-10 ms-auto bg-neutral-0"
              style="top: 160px; max-width: 478px"
            >
              <h5
                class="pb-4 mb-0 text-neutral-100 fw-bold border-bottom border-neutral-40"
              >
                預訂房型
              </h5>

              <div class="text-neutral-80">
                <h2 class="fw-bold">
                  {{ roomDetail.name }}
                </h2>
                <p class="mb-0 fw-medium">
                  {{ roomDetail.description }}
                </p>
              </div>

              <div>
                <div class="d-flex flex-wrap gap-2 mb-4">
                  <div class="form-floating flex-grow-1 flex-shrink-1">
                    <input
                      id="checkinInput"
                      readonly
                      type="date"
                      :value="bookingDate.date.start"
                      class="form-control p-4 pt-9 text-neutral-100 fw-medium border-neutral-100 rounded-3"
                      style="min-height: 74px"
                      placeholder="yyyy-mm-dd"
                      @click="openModal"
                    />
                    <label
                      class="text-neutral-80 fw-medium"
                      style="top: 8px; left: 8px"
                      for="checkinInput"
                      >入住
                    </label>
                  </div>

                  <div class="form-floating flex-grow-1 flex-shrink-1">
                    <input
                      id="checkoutInput"
                      readonly
                      type="date"
                      :value="bookingDate.date.end"
                      class="form-control p-4 pt-9 text-neutral-100 fw-medium border-neutral-100 rounded-3"
                      style="min-height: 74px"
                      placeholder="yyyy-mm-dd"
                      @click="openModal"
                    />
                    <label
                      class="text-neutral-80 fw-medium"
                      style="top: 8px; left: 8px"
                      for="checkoutInput"
                      >退房
                    </label>
                  </div>
                </div>

                <div
                  class="d-flex justify-content-between align-items-center text-neutral-100"
                >
                  <p class="mb-0">人數</p>
                  <div class="d-flex align-items-center gap-4">
                    <button
                      :class="{ 'disabled bg-neutral-40': bookingPeople === 1 }"
                      class="btn btn-neutral-0 p-4 border border-neutral-40 rounded-circle"
                      type="button"
                      @click="bookingPeople--"
                    >
                      <Icon
                        class="fs-5 text-neutral-100"
                        icon="ic:baseline-minus"
                      />
                    </button>

                    <h6
                      id="people"
                      class="d-flex justify-content-center align-items-center fw-bold text-neutral-100"
                      style="width: 24px"
                      name="people"
                    >
                      {{ bookingPeople }}
                    </h6>

                    <button
                      :class="{
                        'disabled bg-neutral-40':
                          bookingPeople === MAX_BOOKING_PEOPLE,
                      }"
                      class="btn btn-neutral-0 p-4 border border-neutral-40 rounded-circle"
                      type="button"
                      @click="bookingPeople++"
                    >
                      <Icon
                        class="fs-5 text-neutral-100"
                        icon="ic:baseline-plus"
                      />
                    </button>
                  </div>
                </div>
              </div>

              <h5 class="mb-0 text-primary-100 fw-bold">
                NT$ {{ formatToThousand(roomDetail.price) }}
              </h5>
              <button
                type="button"
                class="btn btn-primary-100 py-4 text-neutral-0 fw-bold rounded-3"
                @click="pushToBooking(roomId)"
              >
                立即預訂
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        class="d-flex d-md-none justify-content-between align-items-center position-fixed bottom-0 w-100 p-3 bg-neutral-0"
      >
        <template v-if="bookingDate.date.end === null">
          <small class="text-neutral-80 fw-medium"
            >ＮＴ$ {{ formatToThousand(roomDetail.price) }} / 晚</small
          >
          <button
            class="btn btn-primary-100 px-12 py-4 text-neutral-0 fw-bold rounded-3"
            type="button"
            @click="openModal"
          >
            查看可訂日期
          </button>
        </template>

        <template v-else>
          <div class="d-flex flex-column gap-1">
            <small class="text-neutral-80 fw-medium"
              >ＮＴ$ {{ formatToThousand(roomDetail.price) }} /
              {{ daysCount }} 晚 / {{ bookingPeople }} 人</small
            >
            <span class="text-neutral fs-9 fw-medium text-decoration-underline"
              >{{ daysFormatOnMobile(bookingDate.date?.start) }} -
              {{ daysFormatOnMobile(bookingDate.date?.end) }}</span
            >
          </div>
          <NuxtLink
            :to="`/rooms/${roomId}/booking`"
            class="btn btn-primary-100 px-12 py-4 text-neutral-0 fw-bold rounded-3"
          >
            立即預訂
          </NuxtLink>
        </template>
      </div>
    </section>
    <client-only>
      <roomidDatePickerModal
        ref="datePickerModal"
        :date-time="bookingDate"
        @handle-date-change="handleDateChange"
      />
    </client-only>
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

.card-info {
  width: 97px;
  height: 97px;
}

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

.flex-item {
  flex: 1 1 15%;

  @include media-breakpoint-down(md) {
    flex-basis: 40%;
  }
}

input[type="date"] {
  cursor: pointer;
}
</style>
