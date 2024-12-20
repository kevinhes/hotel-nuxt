import { defineStore } from "pinia";

export const useRoomsStore = defineStore("roomsStore", () => {
  const runtimeConfig = useRuntimeConfig();
  const apiUrl = runtimeConfig.public.apiBase;
  const roomsList = ref([]);
  const roomDetail = ref({});

  const setRoomsList = (newRoomsList) => {
    roomsList.value = newRoomsList;
  };

  const setRoomDetail = (newRoomDetail) => {
    roomDetail.value = newRoomDetail;
  };

  const getRoomDetail = async (roomId) => {
    const response = await $fetch(`api/v1/rooms/${roomId}`, {
      baseURL: apiUrl,
    });
    setRoomDetail(response.result);
    return response;
  };

  return {
    roomsList,
    setRoomsList,
    roomDetail,
    setRoomDetail,
    getRoomDetail,
  };
});
