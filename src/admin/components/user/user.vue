<template>
  <div class="user-component">
     <avatar size="2.7" :src="userPic" />
     <div class="username">Иван Филатов</div>
  </div>
</template>

<script>
  import avatar from "../avatar";

  export default {
    components: {
      avatar
    },

    computed: {
      userPic() {
        return `/dist/${require("../../../images/content/me.jpg").default}`;
      },
    },
  };
</script>

<style lang="postcss" scoped src="./user.pcss"></style>