<template>
  <div class="user-component">
    <avatar size="2.7" :src="userPic" />
    <div class="username-wrapper">
      <div class="username">Иван Филатов</div>
      <div class="btns">
        <button type="button" class="btn">Выйти</button>
      </div>
    </div>
  </div>
</template>

<script>
import avatar from "../avatar";

export default {
  components: {
    avatar,
  },

  computed: {
    userPic() {
      return require("../../../images/content/me.jpg").default;
    },
  },
};
</script>

<style lang="postcss" scoped src="./user.pcss"></style>