<script setup>
const props = defineProps({
  roomDetail: Object,
});
const bookingStore = useBookingStore();
const { bookingPeople } = storeToRefs(bookingStore);
const { bookingDate } = bookingStore;

// 日期
const { formatDate } = useFormatDate();
</script>
<template>
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
</template>
<style scoped></style>
