import { defineStore } from "pinia";
import dayjs from "dayjs";

export const useBookingStore = defineStore("bookingStore", () => {
  // 驗證資訊
  const runtimeConfig = useRuntimeConfig();
  const apiUrl = runtimeConfig.public.apiBase;
  const authCookie = useCookie("auth");
  const bookingPeople = ref(1);
  const bookingId = ref("");
  const router = useRouter();
  const { $Swal } = useNuxtApp();

  const setBookingId = (newBookingId) => {
    bookingId.value = newBookingId;
  };

  const currentDate = new Date();
  const formatDate = (date) => {
    const offsetToUTC8 = date.getHours() + 8;
    date.setHours(offsetToUTC8);
    return date.toISOString().split("T")[0];
  };

  const bookingDate = reactive({
    date: {
      start: formatDate(currentDate),
      end: null,
    },
    minDate: new Date(),
    maxDate: new Date(currentDate.setFullYear(currentDate.getFullYear() + 1)),
  });

  const totalDate = computed(() => {
    return dayjs(bookingDate.date.end).diff(
      dayjs(bookingDate.date.start),
      "day"
    );
  });

  const pushToBooking = (roomId) => {
    if (bookingDate.date.start === null || bookingDate.date.end === null) {
      $Swal.fire({
        icon: "warning",
        title: "請選擇日期",
      });
    } else {
      router.push(`/rooms/${roomId}/booking`);
    }
  };

  // 取得訂單資訊
  const getOrderDetail = async (bookingId) => {
    try {
      const response = await $fetch(`api/v1/orders/${bookingId}`, {
        method: "GET",
        baseURL: apiUrl,
        headers: {
          authorization: authCookie.value,
        },
      });
      return response.result;
    } catch (error) {
      $Swal.fire({
        icon: "warning",
        title: error.data.maessage,
      });
    }
  };
  return {
    bookingPeople,
    bookingDate,
    bookingId,
    totalDate,
    setBookingId,
    pushToBooking,
    getOrderDetail,
  };
});
