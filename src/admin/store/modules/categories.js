
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
    REMOVE_CATEGORY: (state, category) => state.data.delete(category),

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

    
  },
};
