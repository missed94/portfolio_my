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
        <ul class="skills" v-if="true">
          <li class="item" v-if="emptyCatIsShown">
            <category @reset="emptyCatIsShown = false" @approve="createCategory" empty />
          </li>
          <li class="item" v-for="category in categories" :key="category.id">
            <category
              :title="category.category"
              :skills="category.skills"
              @create-skill="createSkill($event, category.id)"
              @edit-skill="editSkill"
              @remove-skill="removeSkillAction"
              @remove-category="removeCategory(category.id)"
              @approve="updateCategory($event, category.id)"
            />
          </li>
        </ul>
         <div class="container" v-else>loading...</div>
      </div>
     
    </div>
  </div>
</template>

<script>
import "../../../styles/main.pcss";
import iconedBtn from "./../../components/button/types/iconedBtn/iconedBtn";
import category from "./../../components/category/category";
import { mapActions, mapState } from "vuex";

export default {
  components: {
    iconedBtn,
    category,
  },

  data() {
    return {
      emptyCatIsShown: false,
    };
  },

  computed: {
    ...mapState("categories", {
      categories: (state) => state.data,
    }),
  },

  methods: {
    ...mapActions({
      createCategoryAction: "categories/create",
      fetchCategoryAction: "categories/fetch",
      updateCategoryAction: "categories/update",
      removeCategoryAction: "categories/delete",
      addSkillAction: "skills/add",
      editSkillAction: "skills/edit",
      removeSkillAction: "skills/remove",
    }),

    async createSkill(skill, categoryId) {
      const newSkill = {
        ...skill,
        category: categoryId
      }
      await this.addSkillAction(newSkill);

      skill.title = "";
      skill.percent = "";
    },

    async editSkill(skill) {
      await this.editSkillAction(skill);
      skill.editmode = false;
    },

    async createCategory(categoryTitle) {
      try {
        await this.createCategoryAction(categoryTitle);
        
      } catch (error) {
        console.log(error.message);
      }
      this.emptyCatIsShown = false
    },
    async updateCategory(categoryTitle, categoryId) {
     await this.updateCategoryAction({
        title:categoryTitle,
        id: categoryId
      })
    },

    async removeCategory(categoryId) {
     await this.removeCategoryAction(categoryId);
    }
  },

  created() {
    this.fetchCategoryAction();
  },
};
</script>

<style lang="postcss" scoped src="./about.pcss"></style>
