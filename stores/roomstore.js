import { defineStore } from "pinia";

export const useRoomsStore = defineStore('roomStore', () => {
  const roomsList = ref([])

  const setRoomsList = ( newRoomsList ) => {
    roomsList.value = newRoomsList
  }

  return {
    roomsList,
    setRoomsList
  }
})