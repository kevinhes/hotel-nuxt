<script setup>
</script>
<template>
  <header class="position-fixed w-20 bg-warning top-0 start-0 vh-100 p-3">
    <nav class="d-flex flex-column h-100 justify-content-between">
      <div class="d-flex flex-column">
        <nuxt-link to="/dashboard">回到首頁</nuxt-link>
        <nuxt-link to="/dashboard/newsadmin">最新消息</nuxt-link>
        <nuxt-link to="/dashboard/roomsadmin">房型管理</nuxt-link>
        <nuxt-link to="/dashboard/culinaryadmin">佳餚管理</nuxt-link>
        <nuxt-link to="/dashboard/ordersadmin">訂單管理</nuxt-link>
      </div>
      <div>
        <nuxt-link to="/">回到前台</nuxt-link>
      </div>
    </nav>
  </header>
  <main class="ms-auto w-80 p-3">
    <slot/>
  </main>
  
</template>
<style scoped lang="scss">
  a {
    text-decoration: none;
    font-size: 20px;
    &:hover {
      color: red;
    }
  }
</style>