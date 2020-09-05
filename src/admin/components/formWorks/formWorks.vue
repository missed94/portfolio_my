<template>
  <div class="form-works-component">
    <form  class="form" @submit.prevent="handleSubmit">
      <card title="Редактирование работы">
        <div slot="content" class="form-content">
          <div class="add-photo">
            <div class="add-photo-container">
              <label
                :class="['add-photo-display', {active: newWork.preview}, {hovered: hovered}]"
                :style="{backgroundImage: `url(${newWork.preview})`}"
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
            </div>
          </div>
          <div class="add-info">
            <app-input v-model="newWork.title" class="name-input" title="Название" />
            <app-input v-model="newWork.link" class="link-input" title="Ссылка" />
            <app-input v-model="newWork.description" title="Описание" fieldType="textarea" />
            <tag-adder v-model="newWork.techs" class="tag-adder" />
            <div class="add-info-btns">
              <appButton plain title="Отмена"/>
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
import imgAdder from "./../../components/imgAdder/imgAdder";

import { mapActions, mapState } from "vuex";

export default {

  
  components: {
    card,
    appButton: button,
    appInput: input,
    tagAdder,
    imgAdder,
  },
  props: {
    shownForm: {
      type: Boolean
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

  methods: {
    ...mapActions({
      addNewWork: "works/add",
      updateWork: "works/update",
    }),

    async handleSubmit() {
      await this.addNewWork(this.newWork);
    },

    handleChange(event) {

      event.preventDefault();
      console.log(event);


      const file = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0];

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
      e.preventDefault() 
      this.hovered = true;

    }
  },
};
</script>

<style lang="postcss" src="./formWorks.pcss" scoped></style>