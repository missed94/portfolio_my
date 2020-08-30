<template>
  <div class="works-page-component">
    <div class="page-content">
      <div class="container">
        <div class="page-content-header">
          <div class="title">Блок "Работы"</div>
        </div>
        <div class="content">
          <form action class="form">
            <card title="Редактирование работы">
              <div slot="content" class="form-content">
                <div class="add-photo">
                  <div class="add-photo-container">
                    <div class="add-photo-display">
                      <div class="add-photo-desc">Перетащите или загрузите для загрузки изображения</div>
                      <div class="add-photo-btn">
                        <appButton
                          class="add-button"
                          title="Загрузить"
                          typeAttr="file"
                          @change="onChange"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="add-info">
                  <app-input class="name-input" title="Название" />
                  <app-input class="link-input" title="Ссылка" />
                  <app-input  title="Описание" fieldType="textarea" />
                  <tag-adder class="tag-adder" v-model="tags"/>
                  <div class="add-info-btns">
                    <appButton plain @click="onClick" title="Отмена"/>
                    <appButton typeAttr="submit" title="СОХРАНИТЬ"/>
                  </div>
                </div>
              </div>
            </card>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import "../../../styles/main.pcss";
import card from "./../../components/card/card";
import button from "./../../components/button/button";
import input from "./../../components/input/input";
import tagAdder from "./../../components/tagAdder/tagAdder";

import { mapActions, mapState } from "vuex";

export default {
  components: {
    card,
    appButton: button,
    appInput: input,
    tagAdder,
  },
};
</script>




<style lang="postcss" scoped src="./works.pcss"></style>