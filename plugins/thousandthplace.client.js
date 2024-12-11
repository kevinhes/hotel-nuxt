export default defineNuxtPlugin((nuxtApp) => {
  function formatNumber(el, value) {
    if (typeof value === 'number') {
      el.textContent = value.toLocaleString(); // 使用瀏覽器內建方法格式化千分位
    } else {
      el.textContent = value;
    }
  }

  nuxtApp.vueApp.directive('thousandth', {
    mounted(el, binding) {
      formatNumber(el, binding.value);
    },
    updated(el, binding) {
      formatNumber(el, binding.value);
    }
  })
})
