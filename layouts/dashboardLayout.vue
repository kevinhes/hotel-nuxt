<script setup>
  definePageMeta({
    middleware:'auth'
  })
</script>
<template>
  <header class="position-fixed w-10 bg-success top-0 start-0 vh-100 p-3">
    <nav class="d-flex flex-column h-100 justify-content-between">
      <div class="d-flex flex-column">
        <nuxt-link to="/dashboard">回到首頁</nuxt-link>
        <nuxt-link to="/dashboard/newsadmin">最新消息</nuxt-link>
      </div>
      <div>
        <nuxt-link to="/">回到前台</nuxt-link>
      </div>
    </nav>
  </header>
  <main class="ms-auto w-90 p-3">
    <slot/>
  </main>
  
</template>
<style scoped></style>