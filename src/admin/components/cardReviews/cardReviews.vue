<template>
  <div class="card-reviews-component">
    <card>
      <div class="reviewer-avatar" slot="title">
        <avatar size="2.7" :src="review.pic" />
        <div class="reviewer-wrapper">
          <div class="reviewer-name">{{review.name}}</div>
          <div class="reviewer-occ"> {{review.occ}}</div>
        </div>
      </div>
      <div class="content-wrapper" slot="content">
        <div class="review">
          <p class="review-text">{{review.text}}</p>
        </div>
        <div class="card-reviews-btns">
          <icon symbol="pencil" title="Править" />
          <icon symbol="cross" title="Удалить" />
        </div>
      </div>
    </card>
  </div>
</template>


<script>
import "../../../styles/main.pcss";
import icon from "./../../components/icon/icon";
import card from "./../card/card";
import avatar from "./../avatar/avatar";

export default {
  components: {
    icon,
    card,
    avatar,
  },

  props: {
    review: {
      type: Object,
    },
  },
};
</script>

<style lang="postcss" scoped src="./cardReviews.pcss"></style>
