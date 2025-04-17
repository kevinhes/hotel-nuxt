<script setup>
// state
const bookingStore = useBookingStore();
const { bookingPeople } = storeToRefs(bookingStore);
const { bookingDate, pushToBooking } = bookingStore;

const props = defineProps({
  roomDetail: Object,
  MAX_BOOKING_PEOPLE: Number,
  openModal: Function,
});

// 日期格式
// 手機版日期格式
const daysFormatOnMobile = (date) => date?.split("-").slice(1, 3).join(" / ");

const { formatToThousand } = useThousand();
</script>
<template>
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
          >ＮＴ$ {{ formatToThousand(roomDetail.price) }} / {{ daysCount }} 晚 /
          {{ bookingPeople }} 人</small
        >
        <span class="text-neutral fs-9 fw-medium text-decoration-underline"
          >{{ daysFormatOnMobile(bookingDate.date?.start) }} -
          {{ daysFormatOnMobile(bookingDate.date?.end) }}</span
        >
      </div>
      <button
        type="button"
        @click="pushToBooking(roomDetail._id)"
        class="btn btn-primary-100 px-12 py-4 text-neutral-0 fw-bold rounded-3"
      >
        立即預訂
      </button>
    </template>
  </div>
</template>
<style scoped></style>
