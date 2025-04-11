<script setup>
import { Icon } from "@iconify/vue";
const props = defineProps({
  roomDetail: Object,
});
</script>
<template>
  <div class="col-12 col-md-7 d-flex flex-column gap-6 gap-md-20">
    <div>
      <h1 class="mb-4 text-neutral-100 fw-bold">
        {{ roomDetail.name }}
      </h1>
      <p class="mb-0 text-neutral-80 fs-8 fs-md-7 fw-medium">
        {{ roomDetail.description }}
      </p>
    </div>

    <section>
      <h3 class="title-deco mb-4 mb-md-6 text-neutral-100 fs-7 fs-md-5 fw-bold">
        房型基本資訊
      </h3>
      <ul class="d-flex gap-4 list-unstyled">
        <li
          class="card-info px-4 py-5 bg-neutral-0 border border-primary-40 rounded-3"
        >
          <Icon
            class="mb-2 fs-5 text-primary-100"
            icon="fluent:slide-size-24-filled"
          />
          <p class="mb-0 fw-bold text-neutral-80 text-nowrap">
            {{ roomDetail.areaInfo }}
          </p>
        </li>
        <li
          class="card-info px-4 py-5 bg-neutral-0 border border-primary-40 rounded-3"
        >
          <Icon
            class="mb-2 fs-5 text-primary-100"
            icon="material-symbols:king-bed"
          />
          <p class="mb-0 fw-bold text-neutral-80 text-nowrap">
            {{ roomDetail.bedInfo }}
          </p>
        </li>
        <li
          class="card-info px-4 py-5 bg-neutral-0 border border-primary-40 rounded-3"
        >
          <Icon class="mb-2 fs-5 text-primary-100" icon="ic:baseline-person" />
          <p class="mb-0 fw-bold text-neutral-80 text-nowrap">
            2-{{ roomDetail.maxPeople }} 人
          </p>
        </li>
      </ul>
    </section>

    <section>
      <h3 class="title-deco mb-4 mb-md-6 text-neutral-100 fs-7 fs-md-5 fw-bold">
        房間格局
      </h3>
      <ul
        class="d-flex flex-wrap gap-6 gap-md-10 p-6 bg-neutral-0 fs-8 fs-md-7 rounded-3 list-unstyled"
      >
        <li class="d-flex gap-2" v-for="layout in roomDetail.layoutInfo">
          <Icon class="fs-5 text-primary-100" icon="material-symbols:check" />
          <p class="mb-0 text-neutral-80 fw-bold">
            {{ layout.title }}
          </p>
        </li>
      </ul>
    </section>

    <section>
      <h3 class="title-deco mb-4 mb-md-6 text-neutral-100 fs-7 fs-md-5 fw-bold">
        房內設備
      </h3>
      <ul
        class="d-flex flex-wrap row-gap-2 p-6 mb-0 bg-neutral-0 fs-8 fs-md-7 rounded-3 list-unstyled"
      >
        <li
          class="flex-item d-flex gap-2"
          v-for="facility in roomDetail.facilityInfo"
        >
          <Icon class="fs-5 text-primary-100" icon="material-symbols:check" />
          <p class="mb-0 text-neutral-80 fw-bold">
            {{ facility.title }}
          </p>
        </li>
      </ul>
    </section>

    <section>
      <h3 class="title-deco mb-4 mb-md-6 text-neutral-100 fs-7 fs-md-5 fw-bold">
        備品提供
      </h3>
      <ul
        class="d-flex flex-wrap row-gap-2 p-6 mb-0 bg-neutral-0 fs-8 fs-md-7 rounded-3 list-unstyled"
      >
        <li
          class="flex-item d-flex gap-2"
          v-for="amenity in roomDetail.amenityInfo"
          :key="amenity.title"
        >
          <Icon class="fs-5 text-primary-100" icon="material-symbols:check" />
          <p class="mb-0 text-neutral-80 fw-bold">
            {{ amenity.title }}
          </p>
        </li>
      </ul>
    </section>

    <section>
      <h3 class="title-deco mb-4 mb-md-6 text-neutral-100 fs-7 fs-md-5 fw-bold">
        訂房須知
      </h3>
      <ol class="text-neutral-80 fs-8 fs-md-7 fw-medium">
        <li>入住時間為下午3點，退房時間為上午12點。</li>
        <li>
          如需延遲退房，請提前與櫃檯人員聯繫，視當日房況可能會產生額外費用。
        </li>
        <li>
          請勿在房間內抽煙，若有抽煙需求，可以使用設在酒店各樓層的專用吸煙區。
        </li>
        <li>若發現房間內的設施有損壞或遺失，將會按照價值收取賠償金。</li>
        <li>請愛惜我們的房間與公共空間，並保持整潔。</li>
        <li>如需額外的毛巾、盥洗用品或其他物品，請聯繫櫃檯。</li>
        <li>我們提供免費的Wi-Fi，密碼可以在櫃檯或是房間內的資訊卡上找到。</li>
        <li>請勿帶走酒店房內的物品，如有需要購買，請與我們的櫃檯人員聯繫。</li>
        <li>我們提供24小時櫃檯服務，若有任何需求或疑問，歡迎隨時詢問。</li>
        <li>
          為了確保所有客人的安全，請勿在走廊或公共區域大聲喧嘩，並遵守酒店的其他規定。
        </li>
      </ol>
    </section>
  </div>
</template>
<style scoped></style>
