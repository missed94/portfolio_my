<template>
  <div class="login-component">
    <div class="content">
      <transition
      appear
        name="login"
        mode="out-in"
        tag="form"
      >
        <form class="form" @submit.prevent="handleSubmit">
          <div class="form-title">Авторизация</div>
          <div class="row">
            <app-input
              icon="user"
              v-model="user.name"
              title="Логин"
              :errorMessage="validation.firstError('user.name')"
            />
          </div>
          <div class="row">
            <app-input
              type="password"
              icon="key"
              v-model="user.password"
              title="Пароль"
              :errorMessage="validation.firstError('user.password')"
            />
          </div>
          <div class="btn">
            <appButton :disabled="isSubmitDisabled" title="Войти" typeAttr="submit" />
          </div>
        </form>
      </transition>
    </div>
  </div>
</template>

<script>
import "../../../styles/main.pcss";
import appInput from "../../components/input";
import appButton from "../../components/button";
import { Validator, mixin as ValidatorMixin } from "simple-vue-validator";
import $axios from "../../requests";
import { mapActions } from "vuex";

export default {
  mixins: [ValidatorMixin],
  validators: {
    "user.name": (value) => {
      return Validator.value(value).required("Введите имя пользователя");
    },
    "user.password": (value) => {
      return Validator.value(value).required("Введите пароль");
    },
  },
  data: () => ({
    user: {
      name: "",
      password: "",
    },
    isSubmitDisabled: false,
  }),
  components: {
    appInput,
    appButton,
  },

  methods: {
    ...mapActions({
      showTooltip: "tooltips/show",
      login: "user/login",
    }),

    /* async leave(el) {
      el.classList.add("slider-reverse");
    },
    beforeEnter(el) {
      el.classList.add("slide-out");
    },
    afterEnter(el) {
      el.classList.remove("slide-out");
    },

    afterLeave(el) {
      console.log(el);
      el.classList.remove("slider-reverse");
    }, */

    async handleSubmit() {
      if ((await this.$validate()) == false) return;

      this.isSubmitDisabled = true;

      try {
        const response = await $axios.post("/login", this.user);

        const token = response.data.token;
        localStorage.setItem("token", token);
        $axios.defaults.headers["Authorization"] = `Bearer ${token}`;

        const userResponse = await $axios.get("/user");
        this.login(userResponse.data.user);
        this.$router.replace("/");
      } catch (error) {
        this.showTooltip({
          text: error.response.data.error,
          type: "error",
        });
      } finally {
        this.isSubmitDisabled = false;
      }
    },
  },
};
</script>

<style lang="postcss" scoped src="./login.pcss"></style>
