<template lang="pug">
.form-reviews-component
  form
    card(title="Новый отзыв")
      .form-content(slot="content")
        photoAdder
        .reviewer-info 
          .reviewer-desc
            app-input.name-input(title="Имя автора") 
            app-input.link-input(title="Титул автора") 
          .review
            app-input(title="Отзыв" fieldType="textarea") 
          .add-info-btns
            appButton(plain title="Отмена")
            appButton(typeAttr="submit" title="СОХРАНИТЬ")
</template>

<script>
import input from "./../../components/input/input";
import card from "./../card/card";
import photoAdder from "./../photoAdder/photoAdder";
import button from "./../../components/button/button";

export default {
  components: {
    card,
    photoAdder,
    appButton: button,
    appInput: input,
  },
};
</script>

<style lang="postcss" src="./formReviews.pcss" scoped></style>
