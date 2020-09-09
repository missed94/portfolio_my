<template>
  <transition name="works" tag="div" mode="out-in" appear>
    <div class="works-page-component">
      <div class="page-content">
        <div class="container">
          <div class="page-content-header">
            <div class="title">Блок "Работы"</div>
          </div>
          <div class="content">
            <div class="form-content">
              <form-works
                v-if="shownForm == true"
                @submit="submitForm"
                @close="handleUnShownForm"
                :work="work"
              />
            </div>

            <div class="works-content">
              <ul class="works-list">
                <li class="works-item">
                  <square-btn type="square" title="Добавить работу" @click="handleNewWork" />
                </li>
                <li class="works-item" v-for="work in works" :key="work.id">
                  <card-work
                    :work="work"
                    @remove-work="removeWorkNow(work.id)"
                    @update-work="updateWork"
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>



<script>
import "../../../styles/main.pcss";
import formWorks from "./../../components/formWorks/formWorks";
import cardWork from "./../../components/cardWork/cardWork";
import squareBtn from "./../../components/button/types/squareBtn/squareBtn";

import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      shownForm: false,
      work: null,
    };
  },
  components: {
    formWorks,
    cardWork,
    squareBtn,
  },

  computed: {
    ...mapState("works", {
      works: (state) => state.data,
    }),
  },

  watch: {
    shownForm() {
      if (!this.shownForm) {
        this.work = null;
      }
    },
  },

  methods: {
    ...mapActions({
      fetchWorks: "works/fetch",
      removeWorks: "works/remove",
      updateWorks: "works/update",
      showTooltip: "tooltips/show",
    }),

    async removeWorkNow(workToRemove) {
      await this.removeWorks(workToRemove);

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

    async updateWork(workToUpdate) {
      await this.handleUnShownForm();
      this.work = workToUpdate;
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

    async handleNewWork() {
      await this.handleUnShownForm();
      this.work = null;
      this.handleShownForm();
    },
  },

  mounted() {
    this.fetchWorks();
  },
};
</script>




<style lang="postcss" scoped src="./works.pcss"></style>