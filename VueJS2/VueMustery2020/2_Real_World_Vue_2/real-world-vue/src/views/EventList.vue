<template>
  <div>
    <h1>Event Listing</h1>
    <EventCard></EventCard>
  </div>

</template>

<script>

import EventCard from "@/components/EventCard.vue"


export default {
  name: "EventList",
  components: {
    EventCard,
  }
}
</script>

<style scoped>

</style>