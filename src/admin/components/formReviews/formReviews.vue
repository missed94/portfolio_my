<template lang="pug">
.form-reviews-component
  form#form(@submit.prevent="handleSubmit")
    card(title="Новый отзыв")
      .form-content(slot="content")
        .photo-adder-component
          .photo-adder-content 
            .error-message(:class="{ error: validation.hasError('preview') }") {{ validation.firstError('preview') }}
            label(@drop="handleChange")
              .photo-wrapper
                div(:class="['photo', { active: preview }]", :style="thePhoto")
              .btn-wrapper
                appButton(
                  plain,
                  typeAttr="file",
                  title="Добавить фото",
                  @change="handleChange"
                ) 
        .reviewer-info 
          .reviewer-desc
            app-input.name-input(
              title="Имя автора",
              v-model="newReview.author",
              :errorMessage="validation.firstError('newReview.author')"
            ) 
            app-input.link-input(
              title="Титул автора",
              v-model="newReview.occ",
              :errorMessage="validation.firstError('newReview.occ')"
            ) 
          .review
            app-input(
              title="Отзыв",
              fieldType="textarea",
              v-model="newReview.text",
              :errorMessage="validation.firstError('newReview.text')"
            ) 
          .add-info-btns
            appButton(plain, title="Отмена", @click="$emit('close')")
            appButton(typeAttr="submit", title="СОХРАНИТЬ")
</template>

<script>
import input from "./../../components/input/input";
import card from "./../card/card";
import button from "./../../components/button/button";

import { mapActions, mapState } from "vuex";
import { Validator } from "simple-vue-validator";

export default {
  mixins: [require("simple-vue-validator").mixin],
  validators: {
    "newReview.author"(value) {
      return Validator.value(value).required("Заполните");
    },

    "newReview.occ"(value) {
      return Validator.value(value).required("Заполните");
    },

    "newReview.text"(value) {
      return Validator.value(value).required("Заполните");
    },
    "preview"(value) {
      return Validator.value(value).required("Загрузите фотографию");
    },
  },
  components: {
    card,
    appButton: button,
    appInput: input,
  },

  props: {
    review: {
      type: Object || null,
      default: null,
    },
    shownForm: {
      type: Boolean,
    },
  },

  created() {
    if (this.review) {
      this.newReview = { ...this.review };
      this.preview = `https://webdev-api.loftschool.com/${this.review.photo}`;
    }
  },

  methods: {
    ...mapActions({
      addNewReview: "reviews/add",
      updateReview: "reviews/update",
    }),

    async handleSubmit() {
      if ((await this.$validate()) === true) {
        if (this.newReview.id) {
          await this.updateReview(this.newReview);
        } else {
          await this.addNewReview(this.newReview);
        }
        this.$emit("submit");
      }
    },

    handleChange(event) {
      event.preventDefault();

      const file = event.dataTransfer
        ? event.dataTransfer.files[0]
        : event.target.files[0];

      this.newReview.photo = file;
      this.renderPhoto(file);
    },

    renderPhoto(file) {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onloadend = () => {
        this.preview = reader.result;
      };

      /* reader.onerror = () => {

      }

      reader.onabort = () => {

      } */
    },
  },

  computed: {
    thePhoto() {
      const image = this.preview;
      return `background-image: url(${image})`;
    },

    
  },

  data() {
    return {
      preview: "",
      newReview: {
        author: "",
        occ: "",
        text: "",
        photo: {},
      },
    };
  },
};
</script>

<style lang="postcss" src="./formReviews.pcss" scoped></style>
