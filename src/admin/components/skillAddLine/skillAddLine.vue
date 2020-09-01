<template>
  <div :class="['skillAddLine-component', { blocked: blocked }]">
    <div class="new-title">
      <!-- <div>{{validation.firstError('newSkill')}}</div> -->
      <app-input
        placeholder="Новый навык"
        :errorMessage="validation.firstError('skill.title')"
        v-model="skill.title"
      />
    </div>
    <div class="new-percent">
      <app-input
        type="number"
        min="0"
        max="100"
        maxlength="3"
        v-model="skill.percent"
        :errorMessage="validation.firstError('skill.percent')"
        @keydown.native.enter="handleClick"
      />
    </div>
    <div class="add-button-wrap">
      <round-btn
        type="round"
        title=""
        @click.prevent="handleClick"
      />
    </div>
  </div>
</template>

<script>
import input from "../input/input";
//import button from "../button";
import roundBtn from "../button/types/roundBtn/roundBtn";

import { Validator } from "simple-vue-validator";

export default {
  mixins: [require("simple-vue-validator").mixin],
  validators: {
    "skill.title"(value) {
      return Validator.value(value)
        .required("Заполните")
        
    },

    "skill.percent"(value) {
      return Validator.value(value)
        .required("Заполните")
        .maxLength(3)
        .between(0, 100, "Некорректное значение")
        .integer("Должно быть числом")
    },
  },

  props: {
    blocked: Boolean,
  },

  data() {
    return {
      maxLength: 10,
      skill: {
        title: "",
        percent: "",
      },
    };
  },

  components: {
    appInput: input,
    roundBtn,
  },

  methods: {
  
    async handleClick() {
      if (await this.$validate() == false) return;
      this.$emit("approve", this.skill);
    },
  },
};
</script>

<style lang="pcss" scoped src="./skillAddLine.pcss"></style>
