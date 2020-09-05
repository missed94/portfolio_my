<template>
  <div class="headline-component">
    <div class="container header-container">
      <slot />
      <div class="title">
        {{title}}
      </div>
      <div class="btns">
        <button type="button" @click="logout" class="btn">Выйти</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    title: String,
  },

  methods: {
    ...mapActions({
      logout: "user/logout",
    }),
  }
};
</script>  

<style lang="postcss" scoped src="./headline.pcss"></style>