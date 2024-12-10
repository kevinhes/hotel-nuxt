import { defineStore } from "pinia";

export const useRoomsStore = defineStore('roomStore', () => {
  const roomsList = ref([])
  const roomDetail = ref({})

  const setRoomsList = ( newRoomsList ) => {
    roomsList.value = newRoomsList
  }

  const setRoomDetail = ( newRoomDetail ) => {
    roomDetail.value = newRoomDetail
  }

  return {
    roomsList,
    setRoomsList,
    roomDetail,
    setRoomDetail
  }
})