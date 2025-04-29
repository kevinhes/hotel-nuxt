<script setup>
// 千分位
const { formatToThousand } = useThousand();
const props = defineProps({
  roomDetail: Object,
});

const emit = defineEmits(["submit-form"]);

// 預定資訊
const bookingStore = useBookingStore();
const { totalDate } = bookingStore;

const confirmReservation = () => {
  emit("submit-form");
};
</script>
<template>
  <div class="col-12 col-md-5">
    <div
      class="confirm-form rounded-5 d-flex flex-column gap-10 p-6 p-md-10 mx-auto ms-md-auto me-md-0 bg-neutral-0"
    >
      <img
        class="img-fluid rounded-3"
        :src="roomDetail.imageUrl"
        alt="room-a"
      />

      <div>
        <h2 className="mb-6 text-neutral-100 fs-6 fs-md-4 fw-bold">價格詳情</h2>
        <div class="d-flex justify-content-between align-items-center mb-3">
          <div class="d-flex align-items-center text-neutral-100 fw-medium">
            <span>NT$ {{ formatToThousand(roomDetail.price) }}</span>
            <Icon
              class="ms-2 me-1 text-neutral-80"
              icon="material-symbols:close"
            />
            <span class="text-neutral-80">{{ totalDate }} 晚</span>
          </div>
          <span class="fw-medium">
            NT$
            {{ formatToThousand(parseInt(roomDetail.price) * totalDate) }}
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
              formatToThousand(parseInt(roomDetail.price) * totalDate - 1000)
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
</template>
<style scoped></style>
