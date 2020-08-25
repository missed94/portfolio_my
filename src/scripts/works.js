import Vue from "vue";

const thumbs = {
  props: ["works", "currentWork", "currentIndex"],
  template: "#preview-thumbs",
  data() {
    return {
      viewThumb: 3,
      current: 0,
      theIndex: this.currentIndex,
    }
  },
  

  watch:  {
    currentIndex() {

      this.moveThumbList(this.currentIndex);

    }
  },

  mounted() {
    this.moveThumbList(this.currentIndex);
  },

  methods: {
    moveThumbList(currentIndex) {
      if (this.currentIndex > this.theIndex) {
        const stash = currentIndex + 1 - this.viewThumb;

        if (currentIndex +1 > this.viewThumb) {
          this.transformIt(stash);
        }
      } else {
        if (currentIndex + 1 > this.viewThumb) {
          this.current = currentIndex + 1 - 3;
        }

        if (this.current === currentIndex) {
          this.transformIt(this.current);
          this.current--
        } 
      }
      this.theIndex = this.currentIndex;
    },

    transformIt(index) {
      this.$refs["thumbs-container"].style.transform = `translateX(-${100 / 3 * index}%)`;
    }
  } 
};

const btns = {
  props: ["isBegin", "isEnd"],
  template: "#preview-btns",
};

const display = {
  props: ["currentWork", "works", "currentIndex","isBegin","isEnd"],
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

    isEnd() {
			return this.currentIndex === this.works.length - 1;
    },
    
		isBegin() {
			return this.currentIndex === 0;
		}
  },

 /*  watch: {
    currentIndex(value) {
      this.makeInfiniteLoopNdx(value);
    },
  }, */

  methods: {
    /* checkPosition(slider) {
      this.isEnd = slider.isEnd;
      this.isBeginning = slider.isBeginning;
    }, */

    /* makeInfiniteLoopNdx(index) {
      const worksNumber = this.works.length - 1;
      if (index < 0) this.currentIndex = worksNumber;
      if (index > worksNumber) this.currentIndex = 0;
    }, */

    //метод указывющий на путь к картинке из JSON
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

  created() {
    // объявление переменно с данными из JSON
    const data = require("../data/works.json"); //путь к JSON
    this.works = this.requireImagesToArray(data); // присваивание пустому массиву данные массива из метода requireImagesToArray
  },
});
