import Vue from "vue";



const thumbs = {
  props: ["works", "currentWork"],
  template: "#preview-thumbs",
};


const btns = {
  template: "#preview-btns",
};

const display = {
  props: ["currentWork", "works", "currentIndex"],
  template: "#preview-display",
  components: { thumbs, btns },
  computed: {
    Works() {
      const works = [...this.works];
      return works.slice(0, 5);
    },
  },
};

const tags = {
  props: ["tags"],
  template: "#preview-tags",
};

const info = {
  props: ["currentWork"],
  template: "#preview-info",
  components: { tags },
  computed: {
    tagsArray() {
      return this.currentWork.skills.split(",");
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
  },

  watch: {
    currentIndex(value) {
      this.makeInfiniteLoopNdx(value);
    },
  },

  methods: {
    //метод указывющий на путь к картинке из JSON
    makeInfiniteLoopNdx(index) {
      const worksNumber = this.works.length - 1;
      if (index < 0) this.currentIndex = worksNumber;
      if (index > worksNumber) this.currentIndex = 0;
    },
    requireImagesToArray(data) {
      // название метода с переданным аргументом data
      return data.map((item) => {
        // возвращает массив с измененными данными
        const requiredImage = require(`../images/content/${item.photo}`)
          .default; //  объявляем путь к картинке понятный webpack
        item.photo = requiredImage; //присваиваем новое значение айтему
        return item;
      });
    },

    slide(direction) {
      const lastItem = this.works[this.works.length - 1];
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

    changeThumb(e) {
      console.log("click");
    }
  },

  created() {
    // объявление переменно с данными из JSON
    const data = require("../data/works.json"); //путь к JSON
    this.works = this.requireImagesToArray(data); // присваивание пустому массиву данные массива из метода requireImagesToArray
  },
});
