<template>

  <div :class="['tag', {interactive: interactive}]" >
    <span>{{title}}</span>
    <button
    v-on="$listeners" 
    class="remove" 
    type="button"
    v-if="interactive"
    >x</button>
    </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    interactive: Boolean,
  }
}
</script>

<style lang="postcss" scoped src="./tag.pcss"></style>