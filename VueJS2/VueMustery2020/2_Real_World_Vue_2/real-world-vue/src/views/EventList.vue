<template>
  <div>
    <h1>Events for {{ userStore.user.name }}</h1>
    <EventCard v-for="event in eventStore.events" :key="event.id" :event="event"/>

<!--    Only show Prev link if not on first page-->
    <template v-if="page !== 1">
      <router-link :to="{ name: 'event-list', query: { page: page - 1 } }" rel="prev">Previous</router-link>
      <template v-if="hasNextPage"> | </template>
    </template>

    <router-link v-if="hasNextPage" :to="{ name: 'event-list', query: { page: page + 1 } }" rel="next">Next</router-link>
  </div>
</template>

<script>
import EventCard from "@/components/EventCard.vue"
import { mapState } from 'vuex'
import store from '@/store/store'

function getPageEvents(routeTo, next) {
  const currentPage = parseInt(routeTo.query.page) || 1
  store.dispatch('eventStore/fetchEvents', { currentPage: currentPage })
      .then(() => {
        routeTo.params.page = currentPage
        next()
      })
}

export default {
  name: "EventList",
  props: {
    page: {
      type: Number,
      required: true
    }
  },
  components: {
    EventCard,
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    getPageEvents(routeTo, next)
  },
  beforeRouteUpdate(routeTo, routeFrom, next) {
    getPageEvents(routeTo, next)
  },
  computed: {
    hasNextPage() {
      return this.eventStore.totalEvents > this.page * this.eventStore.perPage
    },
    ...mapState(['userStore', 'eventStore'])
  }
}
</script>

<style scoped>

</style>