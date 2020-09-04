<template>
  <div class="card-work-component" >
    <div class="card-work-preview">
      <img class="card-work-img" :src="cover" />
      <div class="card-work-tags">
        <ul class="card-work-tags__list">
          <li class="card-work-tags__item" v-for="tech in work.techs">
            <tag :title="tech" />
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
          <icon symbol="pencil" title="Править" />
          <icon symbol="cross" title="Удалить" />
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


  computed: {
    cover() {
      return `https://webdev-api.loftschool.com/${this.work.photo}`
    },

    
  }
};
</script>

<style lang="postcss" scoped src="./cardWork.pcss"></style>
