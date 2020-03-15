import EventService from '../../services/EventService'

export const namespaced = true

export const state = {
  events: [],
  event: {}
}
export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event)
  },
  SET_EVENTS(state, events) {
    state.events = events
  },
  SET_EVENT(state, event) {
    state.event = event
  }
}
export const actions = {
  createEvent({ commit }, event) {
    EventService.postEvent(event).then(() => {
      commit('ADD_EVENT', event)
    })
  },
  fetchEvents({ commit }, { perPage, page }) {
    EventService.getEvents(perPage, page)
      .then(response => commit('SET_EVENTS', response.data))
      .catch(error => console.log(error))
  },
  fetchEvent({ commit, getters }, eventId) {
    const event = getters.getEventById(eventId)
    if (event) {
      return commit('SET_EVENT', event)
    }
    return EventService.getEvent(eventId)
      .then(response => commit('SET_EVENT', response.data))
      .catch(error => console.log(error))
  }
}
export const getters = {
  getEventById: state => id => {
    return state.events.find(event => event.id === id)
  }
}
