<script setup>
import { Icon } from "@iconify/vue";

// state
const bookingStore = useBookingStore();
const { bookingPeople } = storeToRefs(bookingStore);
const { bookingDate, pushToBooking } = bookingStore;

const props = defineProps({
  roomDetail: Object,
  MAX_BOOKING_PEOPLE: Number,
  openModal: Function,
});
const { formatToThousand } = useThousand();
console.log("roomDetail", props.roomDetail);
</script>
<template>
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
              <Icon class="fs-5 text-neutral-100" icon="ic:baseline-minus" />
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
                'disabled bg-neutral-40': bookingPeople === MAX_BOOKING_PEOPLE,
              }"
              class="btn btn-neutral-0 p-4 border border-neutral-40 rounded-circle"
              type="button"
              @click="bookingPeople++"
            >
              <Icon class="fs-5 text-neutral-100" icon="ic:baseline-plus" />
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
        @click="pushToBooking(roomDetail._id)"
      >
        立即預訂
      </button>
    </div>
  </div>
</template>
<style scoped></style>
