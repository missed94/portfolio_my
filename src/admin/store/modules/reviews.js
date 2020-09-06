export default {
  namespaced: true,
  state: {
    data: [],
  },

  mutations: {
    ADD_REV(state, newReview) {
      state.data.push(newReview);
    },

    SET_REVS(state, reviews) {
      state.data = reviews;
    },

    REMOVE_REVS(state, removeReview) {
      state.data = state.data.filter((review) => {
        return review.id !== removeReview;
      });
    },

    UPDATE_REVS(state, updateReview) {
      state.data = state.data.map((review) => {

        if (review.id === updateReview.review.id) {
          return updateReview.review
        } else {
          return review
        }
      });
    },
  },

  actions: {
    async add({ commit }, newReview) {
      const formData = new FormData();

      Object.keys(newReview).forEach((item) => {
        formData.append(item, newReview[item]);
      });
      try {
        const { data } = await this.$axios.post("/reviews", formData);
        commit("ADD_REV", data);
      } catch (error) {
        console.log("error");
      }

      return true;
    },

    async fetch({ commit }) {
      try {
        const { data } = await this.$axios.get("/reviews/367");
        commit("SET_REVS", data);
      } catch (error) {
        console.log("error");
      }

      return true;
    },

    async remove({ commit }, removeReview) {
      try {
        const { data } = await this.$axios.delete(`/reviews/${removeReview}`);
        commit("REMOVE_REVS", removeReview);
      } catch (error) {
        console.log("error");
      }

      return true;
    },

    async update({ commit }, updateReview) {
      const UpdateFormData = new FormData();

      Object.keys(updateReview).forEach((item) => {
        UpdateFormData.append(item, updateReview[item]);
      });
      try {
        const { data } = await this.$axios.post(`/reviews/${updateReview.id}`, UpdateFormData);
        commit("UPDATE_REVS", data);
      } catch (error) {
        console.log("error");
      }
      return true;
    },
  },
};
