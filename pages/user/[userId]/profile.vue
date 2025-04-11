<script setup>
definePageMeta({
  middleware: "auth",
});
import { ref } from "vue";
import dayjs from "dayjs";

const isEditPassword = ref(false);
const isEditProfile = ref(false);

const authStore = useAuthStore();
const { userProfile } = storeToRefs(authStore);
const { updateUserProfile, getUserProfile } = authStore;

onMounted(() => {
  getUserProfile();
});

const updateDate = ref({
  year: "",
  month: "",
  day: "",
});
const updateFormatDate = computed(() => {
  const combinedDate = `${updateDate.value.year}/${updateDate.value.month}/${updateDate.value.day}`;
  return combinedDate;
});

const updateAddress = ref("");
const passwordFormRef = ref(null);
const oldPassword = ref("");
const newPassword = ref("");

const userUpdateProfile = computed(() => {
  return {
    userId: userProfile.value._id,
    name: userProfile.value.name,
    phone: userProfile.value.phone,
    birthday: updateFormatDate.value,
    address: {
      zipcode: userProfile.value.address?.zipcode,
      detail: updateAddress.value,
    },
    oldPassword: passwordFormRef.value?.values?.oldPassword,
    newPassword: passwordFormRef.value?.values?.newPassword,
  };
});

const userBirthday = computed(() => {
  if (userProfile?.value.birthday) {
    return dayjs(userProfile.value.birthday).format("YYYY年M月D日");
  }
  return ""; // 或是返回其他預設值
});

const editUserProfile = () => {
  updateAddress.value = userProfile.value.address.detail;
  isEditPassword.value = true;
  isEditProfile.value = true;
};
</script>

<template>
  <div class="row gap-6 gap-md-0">
    <div class="col-12 col-md-5">
      <section
        class="rounded-5 d-flex flex-column gap-6 gap-md-10 p-6 p-md-10 bg-neutral-0"
      >
        <h2 class="fs-6 fs-md-5 fw-bold">修改密碼</h2>
        <VForm class="d-flex flex-column gap-4 gap-md-6" ref="passwordFormRef">
          <div class="fs-8 fs-md-7">
            <p class="mb-2 text-neutral-80 fw-medium">電子信箱</p>
            <span
              class="form-control pe-none p-0 text-neutral-100 fw-bold border-0"
            >
              {{ userProfile.email }}
            </span>
          </div>

          <div
            class="d-flex justify-content-between align-items-center"
            :class="{ 'd-none': isEditPassword || isEditProfile }"
          >
            <div>
              <label class="mb-0 text-neutral-80 fs-8 fs-md-7 fw-medium">
                密碼
              </label>
              <input
                class="form-control pe-none p-0 text-neutral-100 fs-5 fs-md-3 fw-bold border-0"
                type="password"
                value="**********"
              />
            </div>

            <button
              class="flex-shrink-0 text-primary-100 fs-8 fs-md-7 fw-bold text-decoration-underline border-0 bg-transparent"
              type="button"
              @click="editUserProfile"
            >
              重設
            </button>
          </div>

          <div
            class="d-flex flex-column gap-4 gap-md-6"
            :class="{ 'd-none': !isEditPassword && !isEditProfile }"
          >
            <div>
              <label for="oldPassword" class="form-label fs-8 fs-md-7 fw-bold"
                >舊密碼</label
              >
              <VField
                id="oldPassword"
                type="password"
                class="form-control p-4 fs-7 rounded-3"
                placeholder="請輸入舊密碼"
                name="oldPassword"
                rules="required|min:8"
              />
              <VErrorMessage class="text-danger" name="oldPassword" />
            </div>

            <div>
              <label for="newPassword" class="form-label fs-8 fs-md-7 fw-bold"
                >新密碼</label
              >
              <VField
                id="newPassword"
                type="password"
                class="form-control p-4 fs-7 rounded-3"
                placeholder="請輸入新密碼"
                name="newPassword"
                rules="required|min:8"
              />
              <VErrorMessage class="text-danger" name="newPassword" />
            </div>

            <div>
              <label
                for="confirmPassword"
                class="form-label fs-8 fs-md-7 fw-bold"
                >確認新密碼</label
              >
              <VField
                id="confirmPassword"
                type="password"
                class="form-control p-4 fs-7 rounded-3"
                placeholder="請再輸入一次新密碼"
                name="confirmNewPassword"
                rules="required|confirmNewPassword"
              />
              <VErrorMessage class="text-danger" name="confirmNewPassword" />
            </div>
          </div>

          <button
            :class="{ 'd-none': !isEditPassword && !isEditProfile }"
            class="btn btn-neutral-40 align-self-md-start px-8 py-4 text-neutral-60 rounded-3"
            type="button"
            @click="updateUserProfile(userUpdateProfile)"
          >
            儲存設定
          </button>
        </VForm>
      </section>
    </div>

    <div class="col-12 col-md-7">
      <section
        class="rounded-5 d-flex flex-column gap-6 gap-md-10 p-6 p-md-10 bg-neutral-0"
      >
        <h2 class="fs-6 fs-md-5 fw-bold">基本資料</h2>
        <div class="d-flex flex-column gap-4 gap-md-6">
          <div class="fs-8 fs-md-7">
            <label
              class="form-label"
              :class="{
                'fw-bold text-neutral-100': isEditProfile,
                'fw-medium text-neutral-80': !isEditProfile,
              }"
              for="name"
            >
              姓名
            </label>
            <input
              id="name"
              name="name"
              class="form-control text-neutral-100 fw-bold"
              :class="{
                'pe-none p-0 border-0': !isEditProfile,
                'p-4': isEditProfile,
              }"
              type="text"
              v-model="userProfile.name"
            />
          </div>

          <div class="fs-8 fs-md-7">
            <label
              class="form-label"
              :class="{
                'fw-bold text-neutral-100': isEditProfile,
                'fw-medium text-neutral-80': !isEditProfile,
              }"
              for="phone"
            >
              手機號碼
            </label>
            <input
              id="phone"
              name="phone"
              class="form-control text-neutral-100 fw-bold"
              :class="{
                'pe-none p-0 border-0': !isEditProfile,
                'p-4': isEditProfile,
              }"
              type="tel"
              v-model="userProfile.phone"
            />
          </div>

          <div class="fs-8 fs-md-7">
            <label
              class="form-label"
              :class="{
                'fw-bold text-neutral-100': isEditProfile,
                'fw-medium text-neutral-80': !isEditProfile,
              }"
              for="birth"
            >
              生日
            </label>
            <span
              class="form-control pe-none p-0 text-neutral-100 fw-bold border-0"
              :class="{ 'd-none': isEditProfile }"
              >{{ userBirthday }}</span
            >
            <div class="d-flex gap-2" :class="{ 'd-none': !isEditProfile }">
              <select
                id="birth"
                class="form-select p-4 text-neutral-80 fw-medium rounded-3"
                v-model="updateDate.year"
              >
                <option
                  v-for="year in 65"
                  :key="year"
                  :value="`${year + 1958}`"
                >
                  {{ year + 1958 }} 年
                </option>
              </select>
              <select
                class="form-select p-4 text-neutral-80 fw-medium rounded-3"
                v-model="updateDate.month"
              >
                <option v-for="month in 12" :key="month" :value="`${month}`">
                  {{ month }} 月
                </option>
              </select>
              <select
                class="form-select p-4 text-neutral-80 fw-medium rounded-3"
                v-model="updateDate.day"
              >
                <option v-for="day in 30" :key="day" :value="`${day}`">
                  {{ day }} 日
                </option>
              </select>
            </div>
          </div>

          <div class="fs-8 fs-md-7">
            <label
              class="form-label"
              :class="{
                'fw-bold text-neutral-100': isEditProfile,
                'fw-medium text-neutral-80': !isEditProfile,
              }"
              for="address"
            >
              地址
            </label>
            <span
              class="form-control pe-none p-0 text-neutral-100 fw-bold border-0"
              :class="{ 'd-none': isEditProfile }"
            >
              {{ userProfile.address?.detail }}
            </span>
            <div :class="{ 'd-none': !isEditProfile }">
              <div class="d-flex gap-2 mb-2">
                <select
                  class="form-select p-4 text-neutral-80 fw-medium rounded-3"
                >
                  <option value="臺北市">臺北市</option>
                  <option value="臺中市">臺中市</option>
                  <option selected value="高雄市">高雄市</option>
                </select>
                <select
                  class="form-select p-4 text-neutral-80 fw-medium rounded-3"
                >
                  <option value="前金區">前金區</option>
                  <option value="鹽埕區">鹽埕區</option>
                  <option selected value="新興區">新興區</option>
                </select>
              </div>
              <input
                id="address"
                type="text"
                class="form-control p-4 rounded-3"
                placeholder="請輸入詳細地址"
                v-model="updateAddress"
              />
            </div>
          </div>
        </div>
        <button
          :class="{ 'd-none': isEditProfile }"
          class="btn btn-outline-primary-100 align-self-start px-8 py-4 rounded-3"
          type="button"
          @click="editUserProfile"
        >
          編輯
        </button>

        <button
          :class="{ 'd-none': !isEditProfile }"
          class="btn btn-neutral-40 align-self-md-start px-8 py-4 text-neutral-60 rounded-3"
          type="button"
          @click="updateUserProfile(userUpdateProfile)"
        >
          儲存設定
        </button>
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped>
input[type="password"] {
  font: small-caption;
}

.form-control::placeholder {
  --neutral-60: #909090;
  color: var(--neutral-60);
  font-weight: 500;
}
</style>
