<template>
  <div>
    <h1>Event Listing</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event"/>

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

export default {
  name: "EventList",
  components: {
    EventCard,
  },
  created() {
    this.perPage = 3

    this.$store.dispatch('fetchEvents', {
      eventsPerPage: this.perPage,
      currentPage: this.page })
  },
  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1
    },
    hasNextPage() {
      return this.totalEvents > this.page * this.perPage
    },
    ...mapState(['events', 'totalEvents'])
  }
}
</script>

<style scoped>

</style>