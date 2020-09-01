<template>
  <div class="img-adder-component">
    <div class="add-photo">
      <div class="add-photo-container">
        <div class="add-photo-display">
          <div class="add-photo-desc">Перетащите или загрузите для загрузки изображения</div>
          <div class="add-photo-btn">
            <appButton class="add-button" title="Загрузить" typeAttr="file" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import button from "./../../components/button/button";

export default {
  components: {
    appButton: button,
  },
};
</script>



<style lang="postcss" src="./imgAdder.pcss" scoped></>