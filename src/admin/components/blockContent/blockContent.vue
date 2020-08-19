<template>
  <div class="blockContent-component">
    <div class="container">
      <div class="section">
        <div class="title">
          <h4 class="title-text">Блок "Обо мне"</h4>
          <slot name="button"></slot>
        </div>
        <div class="content">
          <slot name="content"></slot>
        </div>

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

<style lang="postcss" scoped src="./blockContent.pcss"></style>