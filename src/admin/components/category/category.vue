<template>
  <card>
    <edit-line
      class="edit-line"
      slot="title"
      :value="title"
      @input="$emit('input', $event)"
      :editModeByDefault="empty"
      @remove="$emit('remove-category')"
      @reset="resetHandler"
      @approve="$emit('approve', $event)"
    />
    <template slot="content">
      <ul class="skills" v-if="empty == false">
        <li class="item" v-for="skill in skills" :key="skill.id">
          <skill
            :skill="skill"
            @remove="$emit('remove-skill', $event)"
            @approve="$emit('edit-skill', $event)"
          />
        </li>
      </ul>
      <div class="bottom-line">
        <skill-add-line :blocked="empty" @approve="$emit('create-skill', $event)" />
      </div>
    </template>
  </card>
</template>

<script>
import card from "../card/card";
import editLine from "../editLine/editLine";
import skill from "../skill/skill";
import skillAddLine from "../skillAddLine/skillAddLine";

export default {
  components: {
    card,
    editLine,
    skill,
    skillAddLine,
  },
  props: {
    empty: Boolean,
    title: {
      type: String,
      default: "",
    },
    skills: {
      type: Array,
      default: () => [],
    },
  },

  methods: {
    resetHandler() {
      this.$emit("reset");
    },
  },

  data() {
    return {
      categoryTitle: this.title,
    };
  },
};
</script>

<style lang="postcss" src="./category.pcss" scoped></style>
