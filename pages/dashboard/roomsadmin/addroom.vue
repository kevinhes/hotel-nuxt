<script setup>
  const runtimeConfig = useRuntimeConfig();
  const apiUrl = runtimeConfig.public.apiBase;
  const authCookie = useCookie('auth')
  const router = useRouter()
  import {useLoading} from 'vue-loading-overlay'
  const $loading = useLoading({});

  const roomInfo = ref({
    name: '',
    description: '',
    imageUrl:'',
    imageUrlList: ['', '', '', ''],
    areaInfo: "",
    bedInfo: "",
    maxPeople: 0,
    price: 0,
    status: false,
    "layoutInfo": [
      {
        "title": "市景",
        "isProvide": false
      },
      {
        "title": "獨立衛浴",
        "isProvide": false
      },
      {
        "title": "樓層電梯",
        "isProvide": false
      }
    ],
    "facilityInfo": [
      {
        "title": "平面電視",
        "isProvide": false
      },
      {
        "title": "吹風機",
        "isProvide": false
      },
      {
        "title": "冰箱",
        "isProvide": false
      },
      {
        "title": "熱水壺",
        "isProvide": false
      },
      {
        "title": "檯燈",
        "isProvide": false
      },
      {
        "title": "衣櫥",
        "isProvide": false
      },
      {
        "title": "書桌",
        "isProvide": false
      }
    ],
    "amenityInfo": [
      {
        "title": "衛生紙",
        "isProvide": false
      },
      {
        "title": "拖鞋",
        "isProvide": false
      },
      {
        "title": "沐浴用品",
        "isProvide": false
      },
      {
        "title": "刮鬍刀",
        "isProvide": false
      },
      {
        "title": "刷牙用品",
        "isProvide": false
      },
      {
        "title": "罐裝水",
        "isProvide": false
      },
      {
        "title": "梳子",
        "isProvide": false
      }
    ],
  })

  async function addRoom(roomInfo) {
    try {
      const response = await $fetch('api/v1/admin/rooms/', {
        method: 'POST',
        baseURL:apiUrl,
        headers: {
          authorization:authCookie.value
        },
        body: {
          ...roomInfo
        }
      })
      console.log(response);
      if ( response.status === true ) {
        router.push('/dashboard/roomsadmin')
      }
    } catch (error) {
      console.log(error.data);
    }
  }
  // addRoom(roomInfo.value)
</script>
<template>
  <div>
    <div class="mb-3">
      <label for="" class="mb-2">
        房型名稱
      </label>
      <input type="text" class="form-control" v-model="roomInfo.name">
    </div>
    <div class="mb-3">
      <label for="" class="mb-2">
        描述
      </label>
      <input type="text" class="form-control" v-model="roomInfo.description">
    </div>
    <div class="mb-3">
      <label for="" class="mb-2">
        主要圖片
      </label>
      <input type="text" class="form-control" v-model="roomInfo.imageUrl">
    </div>
    <div class="mb-3">
      <label for="" class="mb-2">
        圖片列表
      </label>
      <input
        type="text"
        class="form-control mb-2"
        v-for="( image, index ) in roomInfo.imageUrlList"
        v-model="roomInfo.imageUrlList[index]"  :key="index">
    </div>
    <div class="mb-3">
      <label for="" class="mb-2">
        坪數
      </label>
      <input type="text" class="form-control" v-model="roomInfo.areaInfo">
    </div>
    <div class="mb-3">
      <label for="" class="mb-2">
        床型
      </label>
      <input type="text" class="form-control" v-model="roomInfo.bedInfo">
    </div>
    <div class="mb-3">
      <label for="" class="mb-2">
        最多人數
      </label>
      <input type="number" class="form-control" v-model="roomInfo.maxPeople">
    </div>
    <div class="mb-3">
      <label for="" class="mb-2">
        價格
      </label>
      <input type="number" class="form-control" v-model="roomInfo.price">
    </div>
    <div class="mb-3">
      <label for="" class="mb-2">
        提供狀況：{{ roomInfo.status ? '提供' : '不提供' }}
      </label>
      <input type="checkbox" class="form-check" v-model="roomInfo.status">
    </div>
    <div class="mb-3">
      <p>
        配置資訊
      </p>
      <label
        :for="layout.title"
        v-for=" ( layout, index ) in roomInfo.layoutInfo "
        :key="layout.title"
      >
        <input
          type="checkbox"
          v-model="roomInfo.layoutInfo[index].isProvide"
          :id="layout.title"
        >
        {{ layout.title }}
      </label>
    </div>
    <div class="mb-3">
      <p>
        設備
      </p>
      <label
        :for="facility.title"
        v-for=" ( facility, index ) in roomInfo.facilityInfo "
        :key="facility.title"
      >
        <input
          type="checkbox"
          v-model="roomInfo.facilityInfo[index].isProvide"
          :id="facility.title"
        >
        {{ facility.title }}
      </label>
    </div>
    <div class="mb-3">
      <p>
        備品
      </p>
      <label
        :for="amenity.title"
        v-for=" ( amenity, index ) in roomInfo.amenityInfo "
        :key="amenity.title"
      >
        <input
          type="checkbox"
          v-model="roomInfo.amenityInfo[index].isProvide"
          :id="amenity.title"
        >
        {{ amenity.title }}
      </label>
    </div>
    <button type="button" class="btn btn-primary" @click="addRoom(roomInfo)">
      新增
    </button>
  </div>
</template>
<style scoped></style>