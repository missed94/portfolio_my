<template>
  <div class="about-page-component">
    <div class="page-content">
      <div class="container">
        <div class="page-content__header">
          <div class="title">Блок "Обо мне"</div>
          <iconed-btn
            type="iconed"
            title="Добавить группу"
            v-if="emptyCatIsShown == false"
            @click="emptyCatIsShown = true"
          />
        </div>
        <ul class="skills">
          <li class="item" v-if="emptyCatIsShown">
            <category @remove="emptyCatIsShown = false" empty />
          </li>
          <li class="item" v-for="category in categories" :key="category.id">
            <category :title="category.category" :skills="category.skills" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
yarn 
<script>
import "../../../styles/main.pcss";
import iconedBtn from "./../../components/button/types/iconedBtn/iconedBtn";
import category from "./../../components/category/category";

export default {
  components: {
    iconedBtn,
    category,
  },

  data() {
    return {
      categories: [],
      emptyCatIsShown: false,
    };
  },

  created() {
    this.categories = require("./../../../data/categories.json");
  },
};
</script>

<style lang="postcss" scoped src="./about.pcss"></style>
