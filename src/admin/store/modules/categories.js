
export default {
  namespaced: true,
  state: {
    data: [],
    loading: false,
    error: false,
  },

  mutations: {
    SET_CATEGORIES: (state, categories) => (state.data = categories),
    ADD_CATEGORY: (state, category) => state.data.unshift(category),
    UPDATE_CATEGORY(state, updCategory) {state.data.forEach((category) => {
      if(category.id === updCategory.category.id) {
        category.category = updCategory.category.category;
      }
    });
  },
    DELETE_CATEGORY(state, removeCategory) {
      state.data = state.categories.filter((category) => {
        return category.id !== removeCategory
      })
    },
      

    ADD_SKILL: (state, newSkill) => {
      state.data = state.data.map(category => {
        if (category.id == newSkill.category) {
          category.skills.push(newSkill);
        }

        return category;
      })
    },
    REMOVE_SKILL: (state, skillToRemove) => {
      state.data = state.data.map(category => {
        if (category.id == skillToRemove.category) {
          category.skills = category.skills.filter(skill => skill.id !== skillToRemove.id) 
        }
        return category;
      })
    },

    EDIT_SKILL: (state, skillToEdit) => {
      const editSkillInCategory = category => {
        category.skills = category.skills.map(skill => {
          return skill.id == skillToEdit.id ? skillToEdit : skill
        })
      }
      const findCategory = category => {
        if (category.id == skillToEdit.category) {
          editSkillInCategory(category);
        }
        return category;
      }
      state.data = state.data.map(findCategory);
    }
  },

  actions: {
    async create({ commit }, title) {
      try {
        const { data } = await this.$axios.post("/categories", { title });
        commit("ADD_CATEGORY", data);
        console.log(response);
      } catch (error) {
        throw new Error("ошибка");
      }
    },

    async fetch({ commit }) {
      try {
        const { data } = await this.$axios.get("/categories/367");
        commit("SET_CATEGORIES", data);
      } catch (error) {
        console.log(error);
      }
    },

    async update({ commit }, updCategory) {
      try {
        const { data } = await this.$axios.post(`/categories/${updCategory.id}`, {title: updCategory.title});
        commit("UPDATE_CATEGORY", data);
        console.log(response);
      } catch (error) {
        throw new Error("ошибка");
      }
    },

    async delete({ commit }, removeCategory) {
      try {
        const { data } = await this.$axios.delete(`/categories/${removeCategory}`);
        commit("DELETE_CATEGORY", removeCategory);
        console.log(response);
      } catch (error) {
        throw new Error("ошибка");
      }
    },


    
  },
};
