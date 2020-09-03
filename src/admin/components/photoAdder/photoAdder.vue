<template lang="pug">
.photo-adder-component
  .photo-adder-content 
    .photo-wrapper
      .photo
    .btn-wrapper
      appButton(plain, title="Добавить фото") 
</template>

<script>
import button from "./../../components/button/button";
export default {
  components: {
    appButton: button,
  },
};
</script>

<style lang="postcss" src="./photoAdder.pcss" scoped></style>