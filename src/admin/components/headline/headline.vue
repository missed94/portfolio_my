<template>
  <div class="headline-component">
    <div class="container">
      <div class="title">
        <slot />
        <h5 class="title-text">{{title}} </h5>
        
      </div>
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
  },
};
</script>  

<style lang="postcss" scoped src="./headline.pcss"></style>