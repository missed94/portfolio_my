export default {
  namespaced: true,
  state: {
    data: [],
  },

  mutations: {
    ADD_WORK(state, newWork) {
      state.data.push(newWork);
    },

    SET_WORKS(state, works) {
      state.data = works;
    },

    REMOVE_WORKS(state, removeWork) {
      state.data = state.data.filter((work) => {
        return work.id !== removeWork;
      });
    },

    UPDATE_WORKS(state, updateWork) {
      state.data = state.data.map((work) => {

        if (work.id === updateWork.work.id) {
          return updateWork.work
        } else {
          return work
        }
      });
    },
  },

  actions: {
    async add({ commit }, newWork) {
      const formData = new FormData();

      Object.keys(newWork).forEach((item) => {
        formData.append(item, newWork[item]);
      });
      try {
        const { data } = await this.$axios.post("/works", formData);
        commit("ADD_WORK", data);
      } catch (error) {
        console.log("error");
      }

      return true;
    },

    async fetch({ commit }) {
      try {
        const { data } = await this.$axios.get("/works/367");
        commit("SET_WORKS", data);
      } catch (error) {
        console.log("error");
      }

      return true;
    },

    async remove({ commit }, removeWork) {
      try {
        const { data } = await this.$axios.delete(`/works/${removeWork}`);
        commit("REMOVE_WORKS", removeWork);
      } catch (error) {
        console.log("error");
      }

      return true;
    },

    async update({ commit }, updateWork) {
      const UpdateFormData = new FormData();

      Object.keys(updateWork).forEach((item) => {
        UpdateFormData.append(item, updateWork[item]);
      });
      try {
        const { data } = await this.$axios.post(`/works/${updateWork.id}`, UpdateFormData);
        commit("UPDATE_WORKS", data);
      } catch (error) {
        console.log("error");
      }
      return true;
    },
  },
};
