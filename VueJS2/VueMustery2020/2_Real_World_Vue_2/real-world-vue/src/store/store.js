import Vue from "vue";
import Vuex from "vuex";
import EventService from "@/services/EventService";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      id: 'abs123',
      name: 'Vlad B.'
    },
    categories: ['sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community'],
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false },
      { id: 3, text: '...', done: true }
    ],
    events: [],
    totalEvents: 0,
    event: {}
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    SET_EVENTS(state, events) {
      state.events = events
    },
    SET_TOTAL_EVENTS(state, totalEvents) {
      state.totalEvents = totalEvents
    },
    SET_EVENT(state, event) {
      state.event = event
    }
  },
  actions: {
    createEvent({ commit }, event) {
      return EventService.postEvent(event)
          .then(() => {
            commit("ADD_EVENT", event)
      }).catch(error => {
        console.log('There was a problem saving your event to DB.', error.response)
      })
    },
    fetchEvents({ commit }, { eventsPerPage, currentPage }) {
      EventService.getEvents(eventsPerPage, currentPage)
          .then(response => {
            console.log('Total events are ' + response.headers['x-total-count'])
            commit("SET_TOTAL_EVENTS", parseInt(response.headers['x-total-count']))
            commit("SET_EVENTS", response.data)
          })
          .catch(error => {
            console.log('There was an error:', error.response)
          })
    },
    fetchEvent({ commit, getters }, id) {
      if (getters.getEventByID(id)) {
        commit('SET_EVENT', getters.getEventByID(id))
      } else {
        EventService.getEvent(id)
            .then(response => {
              commit('SET_EVENT', response.data)
            })
            .catch(error => {
              console.log('Error fetching event:', error.response)
            })
      }
    }
  },
  getters: {
    catLength: state => {
      return state.categories.length
    },
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    },
    activeTodos: (state, getters) => {
      return state.todos.length - getters.doneTodos.length
    },
    getEventByID: state => id => {
      return state.events.find(event => event.id === id)
    }
  },
  modules: {}
});
