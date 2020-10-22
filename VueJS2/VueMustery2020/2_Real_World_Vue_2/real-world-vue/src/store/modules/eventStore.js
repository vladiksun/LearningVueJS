import EventService from "@/services/EventService";

export const namespaced = true

export const state = {
    events: [],
    totalEvents: 0,
    event: {}
}

export const mutations = {
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
}

export const actions = {
    // eslint-disable-next-line no-unused-vars
    createEvent({commit, dispatch, rootState}, event) {
        console.log('Creating event for user: ' + rootState.userStore.user.name)

        // Example how to call an action from another module (namespace),
        // null = payload,
        // root=true indicates to also look for an action at the root of our store
        dispatch('moduleName/actionToCall', null, { root: true })

        return EventService.postEvent(event)
            .then(() => {
                commit("ADD_EVENT", event)
            }).catch(error => {
                console.log('There was a problem saving your event to DB.', error.response)
            })
    },
    fetchEvents({commit}, {eventsPerPage, currentPage}) {
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
    fetchEvent({commit, getters}, id) {
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
}

export const getters = {
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
}

