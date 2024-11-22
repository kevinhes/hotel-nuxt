import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

// 引入 Swiper 样式
import 'swiper/css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('Swiper',Swiper)
  nuxtApp.vueApp.component('SwiperSlide',SwiperSlide)
})
