<template>
  <div class="form-works-component">
      <form action class="form">
            <card title="Редактирование работы">
              <div slot="content" class="form-content">
                <img-adder />
                <div class="add-info">
                  <app-input class="name-input" title="Название" />
                  <app-input class="link-input" title="Ссылка" />
                  <app-input  title="Описание" fieldType="textarea" />
                  <tag-adder class="tag-adder" />
                  <div class="add-info-btns">
                    <appButton plain  title="Отмена"/>
                    <appButton typeAttr="submit" title="СОХРАНИТЬ"/>
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
    imgAdder
  },
};
</script>

<style lang="postcss" src="./formWorks.pcss" scoped></style>