import Vue from "vue";
import VueRouter from "vue-router";
import CreateEvent from "../views/CreateEvent.vue";
import EventList from "../views/EventList.vue";
import NProgress from "nprogress"
import store from '@/store/store'
import NotFound from "@/views/NotFound";
import NetworkIssue from "@/views/NetworkIssue";
import Example from "@/views/Example";
// import EventShow from "../views/EventShow.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "event-list",
    component: EventList,
    props: true
  },
  {
    path: "/event/create",
    name: "event-create",
    component: CreateEvent
  },
  {
    path: "/event/:id",
    props: true,
    name: "event-show",
    alias: "/event-show-via-alias", // this is a redirecting rule via Alias
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/EventShow.vue"),

    beforeEnter(routeTo, routeFrom, next) {
      store.dispatch('eventStore/fetchEvent', routeTo.params.id).then(event => {
        routeTo.params.event = event
        next()
      }).catch(error => {
        if (error.response && error.response.status === 404) {
          next({ name: '404', params: { resource: 'event' } })
        } else {
          next({ name: 'network-issue' })
        }
      })
    }
  },
  {
    path: '/404',
    name: '404',
    component: NotFound,
    props: true
  },
  {
    path: '/network-issue',
    name: 'network-issue',
    component: NetworkIssue
  },
    // Catch all route. Will catch all navigation that does not match listed above it and redirect it to 404
  {
    path: '*',
    redirect: { name: '404', params: { resource: 'page' } }
  },
  {
    path: '/example',
    component: Example
  }

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

router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router;
