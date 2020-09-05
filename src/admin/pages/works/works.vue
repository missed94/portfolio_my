<template>
  <div class="works-page-component">
    <div class="page-content">
      <div class="container">
        <div class="page-content-header">
          <div class="title">Блок "Работы"</div>
        </div>
        <div class="content">
          <div class="form-content">
            <form-works v-if="shownForm == true"/>
          </div>

          <div class="works-content">
            <ul class="works-list">
              <li class="works-item">
                <square-btn type="square" title="Добавить работу" @click="shownForm = true"/>
              </li>
              <li class="works-item" v-for="work in works" :key="work.id">
                <card-work 
                  :work="work"
                  @remove-work="removeWorkNow(work.id)" 
                />
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
import squareBtn from "./../../components/button/types/squareBtn/squareBtn";

import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      shownForm: false,
    }
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

  methods: {
    ...mapActions({
      fetchWorks: "works/fetch",
      removeWorks: "works/remove",
      updateWorks: "works/update",
      showTooltip: "tooltips/show",
    }),

    async removeWorkNow(workToRemove) {
      console.log("click");
      await this.removeWorks(workToRemove);

      this.showTooltip({
        text: `Запись удалена`,
        type: "success",
      });
    },

    /* async updateWorkNow(workId, workTitle, workLink, workDesc, workTechs, workPhoto, workPreview) {
      await this.updateWorks({
        id: categoryId,
        title: categoryTitle,
        link:workLink,
        description:workDesc,
        techs:workTechs,
        photo:workPhoto,
        preview:workPreview  
      });

      this.showTooltip({
        text: `Запись успешно изменена`,
        type: "success",
      });
    } */
  },

  mounted() {
    this.fetchWorks();
  },
};
</script>




<style lang="postcss" scoped src="./works.pcss"></style>