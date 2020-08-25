<template>
<div 
:class="['skillAddLine-component', {blocked:blocked}]"
>
  <div class="new-title">
    <!-- <div>{{validation.firstError('newSkill')}}</div> -->
     <app-input 
     placeholder="Новый навык"
     v-model="newSkill" 
      :errorMessage="validation.firstError('newSkill')"
      />
  </div>
  <div class="new-percent">
    <app-input
      type="number"
      min="0"
      max="100"
      maxlength="3"
      v-model="percent"
      :errorMessage="validation.firstError('percent')"
      
    />
  </div>
  <div class="add-button-wrap">
    <round-btn 
      type="round" 
      title="" 
      @click.prevent="submit"

    />
  </div>
  
</div>
</template>





<script>
import input from "../input/input";
//import button from "../button";
import roundBtn from "../button/types/roundBtn/roundBtn";

import {Validator} from 'simple-vue-validator';


export default {
  mixins: [require('simple-vue-validator').mixin],
  validators: {
    'newSkill'(value) {
      return Validator.value(value).required('Заполните').maxLength(20)
    },

    'percent'(value) {
      return Validator.value(value).required('Заполните').maxLength(3).lessThan(101)
    }
  },

  props: {
    blocked:Boolean,
  },

  data() {
    return {
      percent:"",
      newSkill:"",
      maxLength: 10,
    }
  },

  components: {
    appInput: input,
    roundBtn,
  },

  methods: {
      submit: function () {
        this.$validate()
          .then(function(success) {
            if (success) {
              alert('Validation succeeded!');
            }
          });
      }
    }
};
</script> 
  


<style lang="pcss" scoped src="./skillAddLine.pcss">

</style>