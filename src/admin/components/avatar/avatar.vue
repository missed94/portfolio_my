<template>
  <div class="avatar-component" :style="measures">
    <div class="image-wrapper">
      <img class="image" v-bind="$attrs" alt="user picture" />
    </div>
    <div class="username">
      {{title}}
      <div class="btns">
        <button type="button" class="btn">Выйти</button>
      </div>
    </div>
  </div>
</template>



<script>
export default {
  props: {
    title: String,
    /* size: {
      type: String,
      default: "3"
    } */
  },
  computed: {
    measures() {
      const size = Number(this.size);
      return {
        width: `${size}rem`,
        height: `${size}rem`,
      };
    },
  },
};
</script>

<style lang="postcss" scoped src="./avatar.pcss"></style>
