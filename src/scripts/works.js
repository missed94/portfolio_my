import Vue from "vue";
import axios from "axios";
import config from "../../env.paths.json";
import animate from "animate.css"
axios.defaults.baseURL = config.BASE_URL;

const thumbs = {
  props: ["works", "currentWork", "currentIndex"],
  template: "#preview-thumbs",
  data() {
    return {
      viewThumb: 3,
      current: 0,
      theIndex: this.currentIndex,
    };
  },

  watch: {
    currentIndex() {
      this.moveThumbList(this.currentIndex);
    },
  },

  mounted() {
    this.moveThumbList(this.currentIndex);
  },

  methods: {
    moveThumbList(currentIndex) {
      if (this.currentIndex > this.theIndex) {
        const stash = currentIndex + 1 - this.viewThumb;

        if (currentIndex + 1 > this.viewThumb) {
          this.current = currentIndex + 1 - 3;
        }

        if (currentIndex + 1 > this.viewThumb) {
          this.transformIt(stash);
        }
      } else {
        if (this.current === currentIndex) {
          this.transformIt(this.current);
          this.current--;
        }
      }
      this.theIndex = this.currentIndex;
    },

    transformIt(index) {
      this.$refs["thumbs-container"].style.transform = `translateX(-${
        (100 / 3) * index
      }%)`;
    },
  },
};

const btns = {
  props: ["isBegin", "isEnd"],
  template: "#preview-btns",
};

const display = {
  props: {
    currentWork: {
      type: Object,
      default: () => ({}),
    },
    works: Array,
    currentIndex: Number,
    isBegin: Boolean,
    isEnd: Boolean,
  },
  template: "#preview-display",
  components: { thumbs, btns },
  computed: {
    Works() {
      const works = [...this.works];
      return works.slice(0, 10);
    },
  },
  methods: {
    leave(el) {
      console.log(el);
      el.classList.add("slider-reverse");
    },
    beforeEnter(el) {
      el.classList.add("slide-out");
    },
    afterEnter(el) {
      el.classList.remove("slide-out");
    },

    afterLeave(el) {
      console.log(el);
      el.classList.remove("slider-reverse");
    },
  },
};

const tags = {
  props: ["tags"],
  template: "#preview-tags",
};

const info = {
  props: {
    currentWork: {
      type: Object,
      default: () => ({}),
    },
  },
  template: "#preview-info",
  components: { tags },
  computed: {
    tagsArray() {
      if (Object.keys(this.currentWork).length) {
        return this.currentWork.techs.split(",");
      }
    },
  },

};

new Vue({
  el: "#preview-component",
  template: "#preview-container",
  components: { display, info },

  data() {
    return {
      works: [],
      currentIndex: 0,
    };
  },

  computed: {
    currentWork() {
      return this.works[this.currentIndex];
    },

    isEnd() {
      return this.currentIndex === this.works.length - 1;
    },

    isBegin() {
      return this.currentIndex === 0;
    },
  },

  /*  watch: {
    currentIndex(value) {
      this.makeInfiniteLoopNdx(value);
    },
  }, */

  methods: {
    /* //метод указывющий на путь к картинке из JSON
    requireImagesToArray(data) {
      // название метода с переданным аргументом data
      return data.map((item) => {
        // возвращает массив с измененными данными
        const requiredImage = require(`../images/content/${item.photo}`)
          .default; //  объявляем путь к картинке понятный webpack
        item.photo = requiredImage; //присваиваем новое значение айтему
        return item;
      });
    }, */

    slide(direction) {
      switch (direction) {
        case "next":
          this.currentIndex++;
          break;
        case "prev":
          this.currentIndex--;
          break;

        default:
          this.currentIndex = direction;
          break;
      }
    },
  },

  async created() {
    const { data } = await axios.get("/works/367");
    this.works = data.map((work) => {
      work.photo = `https://webdev-api.loftschool.com/${work.photo}`;
      return work;
    });
  },
});
