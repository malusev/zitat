import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/Home.vue";
import DetailsPage from "../components/DetailsPage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/details-page/:id",
    name: "DetailsPage",
    component: DetailsPage
  }
];

const router = new VueRouter({
  routes
});

export default router;
