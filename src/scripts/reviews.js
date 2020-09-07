import Vue from "vue";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
// If you use Swiper 6.0.0 or higher
import "swiper/swiper-bundle.css";

import axios from "axios";
import config from "../../env.paths.json";

axios.defaults.baseURL = config.BASE_URL;

new Vue({
  el: "#slider-component",
  template: "#slider-container",
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      reviews: [],
      isBeginning: true,
      isEnd: false,
      sliderOptions: {
        slidesPerView: 1,
        breakpoints: {
          // when window width is >= 320px
          769: {
            slidesPerView: 2,
          },
          // when window width is >= 480px
        },
      },
    };
  },
  methods: {
    checkPosition(slider) {
      this.isEnd = slider.isEnd;
      this.isBeginning = slider.isBeginning;
    },
    /* requireImagesToArray(data) {
      return data.map((item) => {
        const requiredImage = require(`../images/content/${item.pic}`).default;
        item.pic = requiredImage;
        return item;
      });
    }, */

    slide(direction) {
      const slider = this.$refs["slider"].$swiper;
      switch (direction) {
        case "next":
          slider.slideNext();
          this.checkPosition(slider);
          break;
        case "prev":
          slider.slidePrev();
          this.checkPosition(slider);
          break;
      }
    },
  },

  async created() {
    const {data} = await axios.get("/reviews/367")
    this.reviews = data; 
  },
});
