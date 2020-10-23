import Vue from "vue";
import Vuex from "vuex";
import * as userStore from '@/store/modules/user'
import * as eventStore from '@/store/modules/eventStore'
import * as notificationStore from '@/store/modules/notificationStore'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    categories: ['sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community']
  },
  modules: {
    userStore,
    eventStore,
    notificationStore
  }
});
