<template>
<div 
:class="['skillAddLine-component', {blocked:blocked}]"
>
  <div class="new-title">
     <app-input placeholder="Новый навык" />
  </div>
  <div class="new-percent">
    <app-input
      type="number"
      min="0"
      max="100"
      maxlength="3" 
    />
  </div>
  <div class="add-button-wrap">
    <round-btn type="round" title="" />
  </div>
  
</div>
</template>





<script>
import input from "../input";
//import button from "../button";
import button from "../button/";


export default {
  props: {
    blocked:Boolean,
  },

  components: {
    appInput: input,
    roundBtn:button
  }
};
</script> 
  


<style lang="pcss" scoped src="./skillAddLine.pcss">

</style>