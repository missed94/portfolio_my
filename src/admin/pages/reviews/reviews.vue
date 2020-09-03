<template lang="pug">
.reviews-page-component
  .reviews-content
    .container
      .page-content-header
        .title Блок "Работы"
      .content
        .form-content
          form-reviews 
        .reviews-container
          ul.reviews-list
            li.reviews-item
              square-btn(type="square" title="Добавить работу")
            li.reviews-item(v-for="review in reviews" :key="review.id") 
              card-reviews(:review="review" ) 
            
</template>

<script>
import "../../../styles/main.pcss";
import formReviews from "./../../components/formReviews/formReviews";
import squareBtn from "./../../components/button/types/squareBtn/squareBtn";
import cardReviews from "./../../components/cardReviews/cardReviews";

export default {
  components: {
    formReviews,
    squareBtn,
    cardReviews
  },

  data() {
    return {
      reviews:[],
    }
  },

 

  created() {
    this.reviews = require("../../../data/reviews.json");
  },


   methods: {
    requirePhotos() {
      this.reviews = this.reviews.map(review => {
        review.pic = require(`../../../images/content/${review.pic}`).default;
        return review
      })
    }
  },

   mounted() {
    this.requirePhotos();
  },
};
</script>

<style lang="postcss" scoped src="./reviews.pcss"></style>