<script setup>
import { defineRule, configure } from "vee-validate";
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { Icon } from "@iconify/vue";
const authStore = useAuthStore();
const { signup } = authStore;

const isEmailAndPasswordValid = ref(false);

// 生日
const signupFormatDate = computed(() => {
  const combinedDate = `${userInfoFormRef.value?.values?.出生年}/${userInfoFormRef.value?.values?.出生月}/${userInfoFormRef.value?.values?.出生日}`;
  return combinedDate;
});

const userSignupInfo = computed(() => {
  return {
    name: userInfoFormRef.value?.values.name,
    email: emailFormRef.value?.values?.email,
    password: emailFormRef.value?.values?.password,
    phone: userInfoFormRef.value?.values?.phone,
    birthday: signupFormatDate.value,
    address: {
      zipcode: 802,
      detail: userInfoFormRef.value?.values?.address,
    },
  };
});

// 表單 DOM
const emailFormRef = ref(null);
const userInfoFormRef = ref(null);

// 下一步
const moveToNext = () => {
  if (emailFormRef.value?.meta?.valid) {
    isEmailAndPasswordValid.value = true;
  }
};
</script>

<template>
  <div class="p-5 px-md-0 py-md-30">
    <div class="mb-10">
      <p class="mb-2 text-primary-100 fs-8 fs-md-7 fw-bold">
        享樂酒店，誠摯歡迎
      </p>
      <h1 class="mb-4 text-neutral-0 fw-bold">立即註冊</h1>

      <div class="d-flex align-items-center py-4 gap-2">
        <div class="d-flex flex-column align-items-center gap-1 text-neutral-0">
          <span
            :class="{ 'd-none': isEmailAndPasswordValid }"
            class="step p-2 bg-primary-100 rounded-circle"
            >1</span
          >
          <Icon
            :class="{ 'd-none': !isEmailAndPasswordValid }"
            class="p-2 fs-3 bg-primary-100 rounded-circle"
            icon="material-symbols:check"
          />
          <p class="mb-0 fs-8 fs-md-7 fw-bold">輸入信箱及密碼</p>
        </div>

        <hr class="flex-grow-1 my-0 border border-neutral-60 opacity-100" />

        <div
          :class="{
            'text-neutral-0': isEmailAndPasswordValid,
            'text-neutral-60': !isEmailAndPasswordValid,
          }"
          class="d-flex flex-column align-items-center gap-1"
        >
          <span
            :class="{
              'bg-primary-100': isEmailAndPasswordValid,
              'bg-transparent border border-neutral-60':
                !isEmailAndPasswordValid,
            }"
            class="step p-2 rounded-circle"
            >2</span
          >
          <p class="mb-0 fs-8 fs-md-7 fw-bold">填寫基本資料</p>
        </div>
      </div>
    </div>

    <div class="mb-4">
      <VForm
        :class="{ 'd-none': isEmailAndPasswordValid }"
        class="mb-4"
        ref="emailFormRef"
      >
        <div class="mb-4 fs-8 fs-md-7">
          <label class="mb-2 text-neutral-0 fw-bold" for="email">
            電子信箱
          </label>
          <VField
            id="email"
            name="email"
            rules="required|email"
            class="form-control p-4 text-neutral-100 fw-medium border-neutral-40"
            placeholder="hello@exsample.com"
            type="email"
          />
          <VErrorMessage name="email" class="text-danger"></VErrorMessage>
        </div>
        <div class="mb-4 fs-8 fs-md-7">
          <label class="mb-2 text-neutral-0 fw-bold" for="password">
            密碼
          </label>
          <VField
            id="password"
            class="form-control p-4 text-neutral-100 fw-medium border-neutral-40"
            placeholder="請輸入密碼"
            type="password"
            name="password"
            rules="required|min:8"
          />
          <VErrorMessage name="password" class="text-danger"></VErrorMessage>
        </div>
        <div class="mb-10 fs-8 fs-md-7">
          <label class="mb-2 text-neutral-0 fw-bold" for="confirmPassword">
            確認密碼
          </label>
          <VField
            id="confirmPassword"
            class="form-control p-4 text-neutral-100 fw-medium border-neutral-40"
            placeholder="請再輸入一次密碼"
            type="password"
            name="confirmpassword"
            rules="required|confirmPassword"
          />
          <VErrorMessage
            name="confirmpassword"
            class="text-danger"
          ></VErrorMessage>
        </div>
        <button
          class="btn btn-neutral-40 w-100 py-4 text-neutral-60 fw-bold"
          type="button"
          @click="moveToNext"
        >
          下一步
        </button>
      </VForm>
      <VForm
        :class="{ 'd-none': !isEmailAndPasswordValid }"
        class="mb-4"
        ref="userInfoFormRef"
        @submit="signup(userSignupInfo)"
      >
        <div class="mb-4 fs-8 fs-md-7">
          <label class="mb-2 text-neutral-0 fw-bold" for="name"> 姓名 </label>
          <VField
            id="name"
            class="form-control p-4 text-neutral-100 fw-medium border-neutral-40 rounded-3"
            placeholder="請輸入姓名"
            type="text"
            name="name"
            rules="required|min:3"
          />
          <VErrorMessage class="text-danger" name="name" />
        </div>
        <div class="mb-4 fs-8 fs-md-7">
          <label class="mb-2 text-neutral-0 fw-bold" for="phone">
            手機號碼
          </label>
          <VField
            id="phone"
            class="form-control p-4 text-neutral-100 fw-medium border-neutral-40 rounded-3"
            placeholder="請輸入手機號碼"
            type="tel"
            name="phone"
            rules="required|isPhone"
          />
          <VErrorMessage class="text-danger" name="phone" />
        </div>
        <div class="mb-4 fs-8 fs-md-7">
          <label class="mb-2 text-neutral-0 fw-bold" for="birth"> 生日 </label>
          <div class="d-flex gap-2">
            <VField
              as="select"
              id="birth"
              class="form-select p-4 text-neutral-80 fw-medium rounded-3"
              name="出生年"
              rules="required"
            >
              <option v-for="year in 65" :key="year" :value="`${year + 1958}`">
                {{ year + 1958 }} 年
              </option>
            </VField>
            <VField
              as="select"
              class="form-select p-4 text-neutral-80 fw-medium rounded-3"
              name="出生月"
              rules="required"
            >
              <option v-for="month in 12" :key="month" :value="month">
                {{ month }} 月
              </option>
            </VField>
            <VField
              as="select"
              class="form-select p-4 text-neutral-80 fw-medium rounded-3"
              name="出生日"
              rules="required"
            >
              <option v-for="day in 30" :key="day" :value="day">
                {{ day }} 日
              </option>
            </VField>
          </div>
          <p>
            <VErrorMessage class="text-danger" name="出生年" />／
            <VErrorMessage class="text-danger" name="出生月" />／
            <VErrorMessage class="text-danger" name="出生日" />
          </p>
        </div>
        <div class="mb-4 fs-8 fs-md-7">
          <label class="form-label text-neutral-0 fw-bold" for="address">
            地址
          </label>
          <div>
            <div class="d-flex gap-2 mb-2">
              <VField
                class="form-select p-4 text-neutral-80 fw-medium rounded-3"
                as="select"
                name="city"
                rules="required"
              >
                <option value="臺北市">臺北市</option>
                <option value="臺中市">臺中市</option>
                <option selected value="高雄市">高雄市</option>
              </VField>
              <VField
                class="form-select p-4 text-neutral-80 fw-medium rounded-3"
                as="select"
                rules="required"
                name="region"
              >
                <option value="前金區">前金區</option>
                <option value="鹽埕區">鹽埕區</option>
                <option selected value="新興區">新興區</option>
              </VField>
            </div>
            <p>
              <VErrorMessage class="text-danger" name="city" />
              <VErrorMessage class="text-danger" name="region" />
            </p>
            <VField
              id="address"
              type="text"
              class="form-control p-4 rounded-3"
              placeholder="請輸入詳細地址"
              name="address"
            />
            <VErrorMessage class="text-danger" name="address" />
          </div>
        </div>

        <div
          class="form-check d-flex align-items-end gap-2 mb-10 text-neutral-0"
        >
          <VField
            id="agreementCheck"
            class="form-check-input"
            type="checkbox"
            name="agree"
            rules="required"
            :value="0"
          />
          <label class="form-check-label fw-bold" for="agreementCheck">
            我已閱讀並同意本網站個資使用規範
          </label>
        </div>
        <p>
          <VErrorMessage class="text-danger" name="agree"></VErrorMessage>
        </p>
        <button
          class="btn btn-primary-100 w-100 py-4 text-neutral-0 fw-bold"
          type="submit"
        >
          完成註冊
        </button>
      </VForm>
    </div>

    <p class="mb-0 fs-8 fs-md-7">
      <span class="me-2 text-neutral-0 fw-medium">已經有會員了嗎？</span>
      <RouterLink
        to="login"
        class="text-primary-100 fw-bold text-decoration-underline bg-transparent border-0"
      >
        <span>立即登入</span>
      </RouterLink>
    </p>
  </div>
</template>

<style lang="scss" scoped>
@import "bootstrap/scss/mixins/breakpoints";

$grid-breakpoints: (
  xs: 0,
  sm: 576px,
  md: 768px,
  lg: 992px,
  xl: 1200px,
  xxl: 1400px,
  xxxl: 1537px,
);

input[type="password"] {
  font: small-caption;
  font-size: 1.5rem;
}

input::placeholder {
  color: #909090;
  font-size: 1rem;
  font-weight: 500;

  @include media-breakpoint-down(md) {
    font-size: 14px;
  }
}

.form-check-input {
  width: 1.5rem;
  height: 1.5rem;
}

.form-check-input:checked {
  background-color: #bf9d7d;
  border-color: #bf9d7d;
}

.step {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
}
</style>
