import { defineStore } from "pinia";
import dayjs from 'dayjs';

export const useBookingStore = defineStore('bookingStore', () => {
  const bookingPeople = ref(1);

  const currentDate = new Date();
  const formatDate = (date) => {
    const offsetToUTC8 = date.getHours() + 8;
    date.setHours(offsetToUTC8);
    return date.toISOString().split('T')[0];
  };

  const bookingDate = reactive({
    date: {
      start: formatDate(currentDate),
      end: null,
    },
    minDate: new Date(),
    maxDate: new Date(currentDate.setFullYear(currentDate.getFullYear() + 1))
  });

  const totalDate = computed(() => {
    return dayjs(bookingDate.date.end).diff(dayjs(bookingDate.date.start), 'day');
  })

  return {
    bookingPeople,
    bookingDate,
    totalDate
  }
})