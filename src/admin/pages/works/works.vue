<template>
  <div class="works-page-component">
    <div class="page-content">
      <div class="container">
        <div class="page-content-header">
          <div class="title">Блок "Работы"</div>
        </div>
        <div class="content">
          <div class="form-content">
            <form-works />
          </div>

          <div class="works-content">
            <ul class="works-list">
              <li class="works-item" v-for="work in works" :key="work.id">
                <card-work :work="work" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import "../../../styles/main.pcss";
import formWorks from "./../../components/formWorks/formWorks";
import cardWork from "./../../components/cardWork/cardWork";

import { mapActions, mapState } from "vuex";

export default {
  components: {
    formWorks,
    cardWork,
  },

  data() {
    return {
      works: [],
    };
  },

  methods: {
    requireImagesToArray(data) {
      return data.map((item) => {
        const requiredImage = require(`../../../images/content/${item.photo}`)
          .default; 
        item.photo = requiredImage; 
        return item;
      });
    },
  },

  created() {
    const data = require("../../../data/works-admin.json");
    this.works = this.requireImagesToArray(data);
  },
};
</script>




<style lang="postcss" scoped src="./works.pcss"></style>