<template>
  <div>
    <h1>Create Event</h1>

    <H2>******** Examples *********</H2>
    <p>User name {{ user.name }}</p>
    <p>User ID = {{ user.id }}</p>
    <ul>
      <li v-for="category in categories" :key="category">{{ category }}</li>
    </ul>
    <H2>Examples</H2>
    <p>Local computed {{ localComputedCategoryQuantity }}</p>
    <p>Local computed via Vuex getter {{ localComputedCategoryQuantityViaVuexGetter }}</p>
    <p>Example of dynamic explicit getter call: {{ getEvent(1) }}</p>
    <p>Example of dynamic getter call via mapGetters: {{ getEventByID(1) }}</p>
    <H2>******** Examples *********</H2>
  </div>

</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Datepicker from 'vuejs-datepicker'

export default {
  name: "CreateEvent",
  components: {
    Datepicker
  },
  computed: {
    localComputedCategoryQuantity() {
      return this.$store.state.categories.length
    },
    localComputedCategoryQuantityViaVuexGetter() {
      return this.$store.getters.catLength
    },
    getEvent() {
      return this.$store.getters.getEventByID
    },
    ...mapGetters(['getEventByID']),
    ...mapState(['user', 'categories'])
    /*** Another example hoe to mp state va object ***/
    // computed: mapState({
    //   userObjectFromVuexState: 'user',
    //   userName: state => state.user.name,
    //   userId: state => state.user.id,
    //   categories: 'categories'
    // })
  }
}
</script>

<style scoped>

</style>