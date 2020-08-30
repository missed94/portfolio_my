<template>
  <div class="edit-line-component" :class="{'blocked' : blocked}">
    <div class="title" v-if="editmode === false">
      <div class="text">{{value}}</div>

      <div class="icons">
        <div class="icon">
          <icon symbol="pencil" grayscale @click="editmode = true"></icon>
        </div>
        <div class="icon">
          <icon symbol="trash" grayscale></icon>
        </div>
      </div>
    </div>
    <div v-else class="title">
      <div class="input-wrapper">
        <app-input
          placeholder="Название новой группы"
          :value="value"
          :errorText="errorText"
          @input="$emit('input', $event)"
          @keydown.native.enter="onApprove"
          autofocus="autofocus"
          no-side-paddings="no-side-paddings"
          v-model="newCategory"
          :errorMessage="validation.firstError('newCategory')"
        ></app-input>
      </div>
      <div class="buttons">
        <div class="button-icon">
          <icon symbol="tick" @click="onApprove"></icon>
        </div>
        <div class="button-icon">
          <icon symbol="cross" @click="$emit('remove')"></icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


import {Validator} from 'simple-vue-validator';




export default {
  mixins: [require('simple-vue-validator').mixin],

validators: {
    'newCategory'(value) {
      return Validator.value(value).required('Заполните').maxLength(20)
    },

    
  },

  props: {
    value: {
      type: String,
      default: ""
    },
    errorText: {
      type: String,
      default: ""
    },

    editModeByDefault: Boolean,
    blocked: Boolean
  },
  data() {
    return {
      editmode: this.editModeByDefault,
      title: this.value,
      newCategory: "",
    };
  },
  methods: {
    onApprove() {
      if (this.value.trim() === "") return false;
      if (this.title.trim() === this.value.trim()) {
        this.editmode = false;
      } else {
        this.$emit("approve", this.value);
      }
    },

    submit: function () {
        this.$validate()
          .then(function(success) {
            if (success) {
              alert('Validation succeeded!');
            }
          });
      }
  },

  components: {
    icon: () => import("components/icon"),
    appInput: () => import("components/input")
  }
};
</script>

<style lang="postcss" scoped src="./editLine.pcss"></style>