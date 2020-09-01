<template>
  <div class="skill-component" v-if="currentSkill.editmode == false">
    <div class="title">{{skill.title}}</div>
    <div class="pre">{{skill.percent}}</div>
    <div class="button">
      <icon symbol="pencil" class="btn pencil" @click="currentSkill.editmode = true" grayscale />
      <icon symbol="trash" class="btn" @click="$emit('remove', currentSkill)" grayscale />
    </div>
  </div>
  <div class="skill-component" v-else>
    <div class="title">
      <app-input noSidePaddings v-model="currentSkill.title" 
      :errorMessage="validation.firstError('currentSkill.title')"/>
      
    </div>
    <div class="pre">
      <app-input v-model="currentSkill.percent" type="number" min="0" max="100" maxlength="3" 
      :errorMessage="validation.firstError('currentSkill.percent')"/>
    </div>
    <div class="button">
      <icon symbol="tick" class="btn tick" @click="handleClick"/>
      <icon symbol="cross" class="btn" @click="resetHandler"/>
    </div>
  </div>
</template>

<script>
import input from "../input/input";
import icon from "../icon";

import { Validator } from "simple-vue-validator";

export default {
  mixins: [require("simple-vue-validator").mixin],

  validators: {
    "currentSkill.title"(value) {
      return Validator.value(value).required("Заполните");
    },

    "currentSkill.percent"(value) {
      return Validator.value(value)
        .required("Заполните")
        .maxLength(3)
        .between(0, 100, "Некорректное значение")
        .integer("Должно быть числом");
    },
  },

  props: {
    skill: {
      type: Object,
      default: () => {},
      required: true,
    },
  },

  data() {
    return {
      editmode: false,
      currentSkill: {
        id: this.skill.id,
        title: this.skill.title,
        percent: this.skill.percent,
        category: this.skill.category,
        editmode: false,
      },
    };
  },
  components: {
    icon,
    appInput: input,
  },


  methods: {
  
    async handleClick() {
      if (await this.$validate() == false) return;
      this.$emit("approve", this.currentSkill);

    },

    resetHandler() {
      this.currentSkill.editmode = false
      this.currentSkill.title = this.skill.title
    },
  },
};
</script>  

<style lang="postcss" scoped src="./skill.pcss">
</style>