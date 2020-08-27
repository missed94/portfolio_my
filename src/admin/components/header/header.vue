<template>
  <div class="header-component">
    <headline title="Панель администрирования">
      <user />
    </headline>
    <navigation></navigation>
  </div>
</template>

<script>

import headline from "./../headline/headline";
import user from "./../user/user";
import navigation from "./../navigation/navigation";

export default {
  components: {
    headline, user, navigation
  }
};



</script>

<style lang="postcss" scoped src="./header.pcss"></style>
