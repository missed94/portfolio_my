<template>
  <div class="card-work-component">
    <div class="card-work-preview">
      <img class="card-work-img" :src="cover" />
      <div class="card-work-tags">
        <ul class="card-work-tags__list">
          <li
            class="card-work-tags__item"
            v-if="tag.trim()"
            v-for="(tag, index) in tags"
            :key="`${tag}${index}`"
          >
            <tag :title="tag" />
          </li>
        </ul>
      </div>
    </div>
    <div class="card-work-desc">
      <div class="card-work-desc-content">
        <h4 class="card-work-title">{{work.title}}</h4>
        <p class="card-work-text">{{work.desc}}</p>
        <a :href="work.link" class="work-link">{{work.link}}</a>
        <div class="card-work-btns">
          <icon symbol="pencil" title="Править" @click="handleUpdate"/>
          <icon symbol="cross" title="Удалить" @click="handleRemove" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../../../styles/main.pcss";
import icon from "./../../components/icon/icon";
import tag from "../tag";

export default {
  components: {
    icon,
    tag,
  },

  props: {
    work: {
      type: Object,
    },
  },

  methods: {
    handleRemove() {
      console.log("click");
      this.$emit("remove-work");
    },

    handleUpdate() {
      this.$emit("update-work", this.work);
    }
  },

  computed: {
    cover() {
      return `https://webdev-api.loftschool.com/${this.work.photo}`;
    },

    tags() {
      return this.work.techs.trim().split(",");
    },
  },
};
</script>

<style lang="postcss" scoped src="./cardWork.pcss"></style>
