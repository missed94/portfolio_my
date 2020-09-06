<template>
  <div class="card-reviews-component">
    <card>
      <div class="reviewer-avatar" slot="title">
        <avatar size="2.7" :src="avatar" />
        <div class="reviewer-wrapper">
          <div class="reviewer-name">{{review.author}}</div>
          <div class="reviewer-occ"> {{review.occ}}</div>
        </div>
      </div>
      <div class="content-wrapper" slot="content">
        <div class="review">
          <p class="review-text">{{review.text}}</p>
        </div>
        <div class="card-reviews-btns">
          <icon symbol="pencil" title="Править" @click="handleUpdate"/>
          <icon symbol="cross" title="Удалить" @click="handleRemove"/>
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

  methods: {
    handleRemove() {
      console.log("click");
      this.$emit("remove-review");
    },

    handleUpdate() {
      this.$emit("update-review", this.review);
    }
  },
computed: {
    avatar() {
      return `https://webdev-api.loftschool.com/${this.review.photo}`;
    },
}
  
};
</script>

<style lang="postcss" scoped src="./cardReviews.pcss"></style>
