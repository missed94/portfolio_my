import Vue from "vue";

const skillsItem = {
  props: ["skill"],
  template: "#skills-item",
  methods: {
    drawingPrecentCircle() {
      const circle = this.$refs["colored-circle"];
      const dashArray = parseInt(
        getComputedStyle(circle).getPropertyValue("stroke-dasharray")
      );
      const precent = (dashArray / 100) * (100 - this.skill.precent);
      circle.style.strokeDashoffset = precent;
    },
  },
  mounted() {
    this.drawingPrecentCircle();
  },
};

const skillsRow = {
  props: ["category"],
  template: "#skills-row",
  components: {
    skillsItem,
  },
};

new Vue({
  el: "#skills-component",
  template: "#skills-list",
  components: {
    skillsRow,
  },

  data() {
    return {
      skills: [],
    };
  },

  created() {
    this.skills = require("../data/skills.json");
  },
});
