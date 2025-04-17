<script setup>
const route = useRoute();
const router = useRouter();
const roomId = route.params.roomId;

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
          <!-- bookingDate openmodal bookingPeople maxbookingpeople pushToBooking -->
          <roomidRoomBooking
            :roomDetail="roomDetail"
            :MAX_BOOKING_PEOPLE="MAX_BOOKING_PEOPLE"
            :openModal="openModal"
          />
        </div>
      </div>
    </section>
    <roomidMobileRoomBooking
      :roomDetail="roomDetail"
      :MAX_BOOKING_PEOPLE="MAX_BOOKING_PEOPLE"
      :openModal="openModal"
    />
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
