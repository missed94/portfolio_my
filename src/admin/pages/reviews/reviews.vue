<template lang="pug">
transition(name="reviews" tag="div" mode="out-in" appear)
  .reviews-page-component
    .reviews-content
      .container
        .page-content-header
          .title Блок "Отзывы"
        .content
          .form-content
            form-reviews(
              v-if="shownForm == true",
              @submit="submitForm",
              @close="handleUnShownForm",
              :review="review"
            ) 
          .reviews-container
            ul.reviews-list
              li.reviews-item
                square-btn(
                  type="square",
                  title="Добавить работу",
                  @click="handleNewReview"
                )
              li.reviews-item(v-for="review in reviews", :key="review.id") 
                card-reviews(
                  :review="review",
                  @remove-review="removeReviewNow(review.id)",
                  @update-review="updateReview"
                ) 
</template>

<script>
import "../../../styles/main.pcss";
import formReviews from "./../../components/formReviews/formReviews";
import squareBtn from "./../../components/button/types/squareBtn/squareBtn";
import cardReviews from "./../../components/cardReviews/cardReviews";

import { mapActions, mapState } from "vuex";

export default {
  components: {
    formReviews,
    squareBtn,
    cardReviews,
  },

  data() {
    return {
      shownForm: false,
      review: null,
    };
  },

  computed: {
    ...mapState("reviews", {
      reviews: (state) => state.data,
    }),
  },

  watch: {
    shownForm() {
      if (!this.shownForm) {
        this.review = null;
      }
    },
  },

  methods: {
    ...mapActions({
      fetchReviews: "reviews/fetch",
      removeReviews: "reviews/remove",
      updateReviews: "reviews/update",
      showTooltip: "tooltips/show"
    }),

    async removeReviewNow(reviewToRemove) {
      await this.removeReviews(reviewToRemove);

      this.showTooltip({
        text: `Запись удалена`,
        type: "success",
      });
    },

    submitForm() {
      this.handleUnShownForm();
      this.showTooltip({
        text: `Запись сохранена`,
        type: "success",
      });
    },

    async updateReview(reviewToUpdate) {
      await this.handleUnShownForm();
      this.review = reviewToUpdate;
      this.handleShownForm();

      //this.$el.scrollIntoView({block: "start", behavior: "smooth"});
    },

    handleShownForm() {
      this.shownForm = true;
      this.$el.scrollIntoView({ block: "start", behavior: "smooth" });
    },

    handleUnShownForm() {
      this.shownForm = false;
    },

    async handleNewReview() {
      await this.handleUnShownForm();
      this.review = null;
      this.handleShownForm();
    },


  },

  mounted() {
    this.fetchReviews();
  },
};
</script>

<style lang="postcss" scoped src="./reviews.pcss"></style>