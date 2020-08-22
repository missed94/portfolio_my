<template>
  <div class="maincontent">
    <headline title="Панель администрирования">
      <user />
    </headline>
    <navigation></navigation>
    <div class="page-content">
      <div class="container">
        <div class="page-content__header">
          <div class="title">Блок "Обо мне"</div>
          <iconed-btn 
          type="iconed" 
          title="Добавить группу" 
          v-if="emptyCatIsShown == false"
          @click="emptyCatIsShown = true"/>
        </div>
        <ul class="skills">
          <li class="item" v-if="emptyCatIsShown"> 
            <category 
              @remove="emptyCatIsShown = false"
              empty
            />
          </li>
          <li class="item" v-for="category in categories" 
          :key="category.id"> 
            <category 
              :title="category.category"
              :skills="category.skills"
            />
          </li>
        
        </ul>
      </div>
    </div>
  </div>
</template>


<script>
import "../styles/main.pcss";
import headline from "./components/headline/headline";
import user from "./components/user/user";
import navigation from "./components/navigation/navigation";
import iconedBtn from "./components/button/types/iconedBtn/iconedBtn";
import category from "./components/category/category";

export default {
  components: {
    headline,
    user,
    navigation,
    iconedBtn,
    category
  },

  data() {
    return {
      categories: [],
      emptyCatIsShown: false
    }
  },

  created() {
    this.categories = require("./../data/categories.json")
  }
};
</script>

<style lang="postcss" scoped src="./app.pcss">
</style>