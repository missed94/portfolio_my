<template>
  <transition tag="div" name="about" mode="out-in" appear>
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
                @remove-skill="removeSkill($event, category.id)"
                @remove-category="removeCategory(category.id)"
                @approve="updateCategory($event, category.id)"
              />
            </li>
          </ul>
          <div class="container" v-else>loading...</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import "../../../styles/main.pcss";
import iconedBtn from "./../../components/button/types/iconedBtn/iconedBtn";
/* import category from "./../../components/category/category"; */
import { mapActions, mapState } from "vuex";

export default {
  components: {
    iconedBtn,
    category: () => import("./../../components/category/category"),
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
      showTooltip: "tooltips/show",
    }),

    async createSkill(skill, categoryId) {
      const newSkill = {
        ...skill,
        category: categoryId,
      };
      await this.addSkillAction(newSkill, newSkill.title);

      skill.title = "";
      skill.percent = "";

      this.showTooltip({
        text: `Навык ${newSkill.title} добавлен`,
        type: "success",
      });
    },

    async removeSkill(skillToRemove) {
      await this.removeSkillAction(skillToRemove);
      this.showTooltip({
        text: `Запись удалена`,
        type: "success",
      });
    },

    async editSkill(skill) {
      await this.editSkillAction(skill);
      skill.editmode = false;

      this.showTooltip({
        text: `Запись успешно изменена`,
        type: "success",
      });
    },

    async createCategory(categoryTitle) {
      try {
        await this.createCategoryAction(categoryTitle);

        this.showTooltip({
          text: `Категория ${categoryTitle} добавлена`,
          type: "success",
        });
      } catch (error) {
        this.showTooltip({
          text: error.message,
          type: "error",
        });
        console.log(error.message);
      }
      this.emptyCatIsShown = false;
    },
    async updateCategory(categoryTitle, categoryId) {
      await this.updateCategoryAction({
        title: categoryTitle,
        id: categoryId,
      });

      this.showTooltip({
        text: `Запись успешно изменена`,
        type: "success",
      });
    },

    async removeCategory(categoryId) {
      await this.removeCategoryAction(categoryId);
      this.showTooltip({
        text: `Запись удалена`,
        type: "success",
      });
    },
  },

  created() {
    this.fetchCategoryAction();
  },
};
</script>

<style lang="postcss" scoped src="./about.pcss"></style>
