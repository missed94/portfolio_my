<template>
  <div class="edit-line-component" :class="{'blocked' : blocked}">
    <div class="title" v-if="editmode === false">
      <div class="text">{{value}}</div>

      <div class="icons">
        <div class="icon">
          <icon symbol="pencil" grayscale @click="editmode = true"></icon>
        </div>
        <div class="icon">
          <icon symbol="trash" grayscale @click="$emit('remove')"></icon>
        </div>
      </div>
    </div>
    <div v-else class="title">
      <div class="input-wrapper">
        <app-input
          placeholder="Название новой группы"
          :errorText="errorText"
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
          <icon symbol="cross" @click="resetHandler"></icon>
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
      newCategory: this.value,
    };
  },
  methods: {
   async onApprove() {
     console.log(this.newCategory);
    if ((await this.$validate()) === true) {  
      if (this.title.trim() === this.newCategory.trim()) {
        this.editmode = false;
      } else {
        this.title = this.newCategory
        this.editmode = false
        this.$emit("approve", this.newCategory);
      }
      }
    },


    resetHandler() {
      this.editmode = false
      this.newCategory = this.value;
      this.$emit("reset"); 
    },

    onRemove() {
        this.editmode = false;
        this.$emit('remove');
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