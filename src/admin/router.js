import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import header from "./components/header/";
import about from "./pages/about/";
import login from "./pages/login/";
import works from "./pages/works/";
import reviews from "./pages/reviews/";

const routes = [
  {
    path: "/",
    components: {
      default: about,
      header: header
    },
     
  },
  {
    path: "/works",
    components: {
      default: works,
      header: header
    },
  }, 
  {
    path: "/reviews",
    components: {
      default: reviews,
      header: header
    },
  },
  {
    path: "/login",
    component: login,
  }
]

export default new VueRouter({routes});