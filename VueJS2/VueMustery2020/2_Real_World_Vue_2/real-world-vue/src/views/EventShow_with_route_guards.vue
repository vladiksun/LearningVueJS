<template>
  <div>
    <div class="event-header">

      <span v-if="!event.time">No time specifed</span>
      <span v-else class="eyebrow">@{{ event.time }} on {{ event.date | date }}</span>

      <h1 class="title">{{ event.title }}</h1>
      <h5>Organized by {{ event.organizer ? event.organizer : '' }}</h5>
      <h5>Category: {{ event.category }}</h5>
    </div>

    <BaseIcon name="map">
      <h2>Location</h2>
    </BaseIcon>

    <address>{{ event.location }}</address>

    <h2>Event details</h2>
    <p>{{ event.description }}</p>

    <h2>
      Attendees
      <span class="badge -fill-gradient">{{ event.attendees ? event.attendees.length : 0 }}</span>
    </h2>
    <ul class="list-group">
      <li v-for="(attendee, index) in event.attendees" :key="index" class="list-item">
        <b>{{ attendee.name }}</b>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import NProgress from 'nprogress'
import store from '@/store/store'

export default {
  props: ['id'],

  /*** Example of using in component guards used to apply a progress bar ***/
  beforeRouteEnter(routeTo, routeFrom, next) {
    NProgress.start()
    store.dispatch('eventStore/fetchEvent', routeTo.params.id)
        // then is called on the Promise so we retutn the promise from axios call
    .then(() => {
      NProgress.done()
      next()
    })
  },
  computed: mapState({
    event: state => state.eventStore.event
  }),
}
</script>

<style scoped>
.location {
  margin-bottom: 0;
}
.location > .icon {
  margin-left: 10px;
}
.event-header > .title {
  margin: 0;
}
.list-group {
  margin: 0;
  padding: 0;
  list-style: none;
}
.list-group > .list-item {
  padding: 1em 0;
  border-bottom: solid 1px #e5e5e5;
}
</style>