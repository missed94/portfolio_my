<template>
  <div class="form-works-component">
    <a name="form"></a>
    <form class="form" @submit.prevent="handleSubmit">
      <card title="Редактирование работы">
        <div slot="content" class="form-content">
          <div class="add-photo">
            <div class="add-photo-container">
              <label
                :class="['add-photo-display', {active: newWork.preview}, {hovered: hovered},]"
                :style="theImage"
                @dragover="handleDragOver"
                @dragleave="hovered = false"
                @drop="handleChange"
              >
                <div class="add-photo-content">
                  <div class="add-photo-desc">
                    <div
                      class="add-photo-desc-text"
                    >Перетащите или загрузите для загрузки изображения</div>
                  </div>
                  <div class="add-photo-btn">
                    <appButton
                      class="add-button"
                      title="Загрузить"
                      typeAttr="file"
                      @change="handleChange"
                    />
                  </div>
                </div>
              </label>
              <div
                class="error-message"
                :class="{error: validation.hasError('newWork.preview')}"
              >{{validation.firstError('newWork.preview')}}</div>
            </div>
          </div>
          <div class="add-info">
            <app-input
              v-model="newWork.title"
              class="name-input"
              title="Название"
              :errorMessage="validation.firstError('newWork.title')"
            />
            <app-input
              v-model="newWork.link"
              class="link-input"
              title="Ссылка"
              :errorMessage="validation.firstError('newWork.link')"
            />
            <app-input
              v-model="newWork.description"
              title="Описание"
              fieldType="textarea"
              :errorMessage="validation.firstError('newWork.description')"
            />
            <tag-adder
              v-model="newWork.techs"
              :errorMessage="validation.firstError('newWork.techs')"
              class="tag-adder"
            />
            <div class="add-info-btns">
              <appButton plain title="Отмена" @click="$emit('close')" />
              <appButton typeAttr="submit" title="СОХРАНИТЬ" />
            </div>
          </div>
        </div>
      </card>
    </form>
  </div>
</template>

<script>
import "../../../styles/main.pcss";
import card from "./../../components/card/card";
import button from "./../../components/button/button";
import input from "./../../components/input/input";
import tagAdder from "./../../components/tagAdder/tagAdder";

import { Validator } from "simple-vue-validator";
import { mapActions, mapState } from "vuex";

export default {
  mixins: [require("simple-vue-validator").mixin],
  validators: {
    "newWork.title"(value) {
      return Validator.value(value).required("Заполните");
    },

    "newWork.link"(value) {
      return Validator.value(value).required("Заполните");
    },

    "newWork.description"(value) {
      return Validator.value(value).required("Заполните");
    },

    "newWork.techs"(value) {
      return Validator.value(value).required("Заполните");
    },
    "newWork.preview"(value) {
      return Validator.value(value).required("Загрузите превью");
    },
  },

  components: {
    card,
    appButton: button,
    appInput: input,
    tagAdder,
  },
  props: {
    work: {
      type: Object || null,
      default: null,
    },
    shownForm: {
      type: Boolean,
    },
  },

  created() {
    if (this.work) {
      this.newWork = { ...this.work };
      this.newWork.preview = `https://webdev-api.loftschool.com/${this.work.photo}`;
    }
  },

  data() {
    return {
      hovered: false,
      newWork: {
        title: "",
        link: "",
        description: "",
        techs: "",
        photo: {},
        preview: "",
      },
    };
  },

  computed: {
    theImage() {
      const image = this.newWork.preview;
      return `background-image: url(${image})`;
    },
  },

  methods: {
    ...mapActions({
      addNewWork: "works/add",
      updateWork: "works/update",
    }),

    async handleSubmit() {
      if ((await this.$validate()) === true) {
        if (this.newWork.id) {
          await this.updateWork(this.newWork);
        } else {
          await this.addNewWork(this.newWork);
        }
        this.$emit("submit");
      }
    },

    handleChange(event) {
      event.preventDefault();

      const file = event.dataTransfer
        ? event.dataTransfer.files[0]
        : event.target.files[0];

      this.newWork.photo = file;
      this.renderPhoto(file);
      this.hovered = false;
    },

    renderPhoto(file) {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onloadend = () => {
        this.newWork.preview = reader.result;
      };

      /* reader.onerror = () => {

      }

      reader.onabort = () => {

      } */
    },

    handleDragOver(e) {
      e.preventDefault();
      this.hovered = true;
    },
  },
};
</script>

<style lang="postcss" src="./formWorks.pcss" scoped></style>