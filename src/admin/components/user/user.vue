<template>
  <div class="user-component">
    <avatar size="2.7" :src="userPic" />
    <div class="username-wrapper">
      <div class="username">Иван Филатов</div>
      <div class="btns">
        <button type="button" @click="logout" class="btn">Выйти</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

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

   methods: {
    ...mapActions({
      logout: "user/logout",
    }),
   }
};
</script>

<style lang="postcss" scoped src="./user.pcss"></style>