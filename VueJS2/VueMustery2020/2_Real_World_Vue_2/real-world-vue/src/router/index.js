import Vue from "vue";
import VueRouter from "vue-router";
import CreateEvent from "../views/CreateEvent.vue";
import EventList from "../views/EventList.vue";
// import EventShow from "../views/EventShow.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "event-list",
    component: EventList
  },
  {
    path: "/event/:id",
    props: true,
    name: "event-show",
    alias: "/event-show-via-alias", // this is a redirecting rule via Alias
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/EventShow.vue")
  },
  {
    path: "/event/create",
    name: "event-create",
    component: CreateEvent
  },

  /*** This is a redirecting rule via redirecting  ***/
  // {
  //   path: "/about",
  //   redirect: { name: "about"}
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
