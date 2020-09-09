<template>
  <div class="app-container">
    <router-view name="header"/>
    <!-- <transition name="page" mode="out-in"> -->
      <router-view />
    <!-- </transition> -->
    <div :class="['notify-container', {active: isTooltipShown}]">
      <div class="notification">
        <notification 
          :text="tooltipText"
          :type="tooltipType"
          @click="hideTooltip"
        />
      </div>
    </div>
  </div>
</template>



<script>
import notification from "./components/notification/notification"
import {mapState, mapActions} from "vuex";
export default {
  components : {notification},
  methods: {
    ...mapActions({
      hideTooltip: "tooltips/hide"
    })
  },
  computed: {
    ...mapState("tooltips", {
      isTooltipShown: state => state.isShown,
      tooltipText: state => state.text,
      tooltipType: state => state.type,

    })
  }
}
</script>




<style lang="postcss" scoped src="./app.pcss"></style>
