<template>
  <div>
    <h1>Create an Event</h1>
    <form @submit.prevent="createEvent">

      <BaseSelect class="field"
                  label="Select a category"
                  v-model="event.category"
                  :options="categories"/>

      <h3>Name & describe your event</h3>
      <BaseInput class="field"
                 label="Title"
                 type="text"
                 placeholder="Add an event title"
                 v-model="event.title"/>

      <BaseInput class="field"
                 label="Description"
                 type="text"
                 placeholder="Add a description"
                 v-model="event.description"/>

      <h3>Where is your event?</h3>
      <BaseInput class="field"
                 label="Location"
                 type="text"
                 placeholder="Add a location"
                 v-model="event.location"/>

      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <datepicker v-model="event.date" placeholder="Select a date"/>
      </div>

      <BaseSelect class="field"
                  label="Select a time"
                  v-model="event.time"
                  :options="times"/>

<!--      <input type="submit" class="button -fill-gradient" value="Submit"/>-->
      <BaseButton type="submit" buttonClass="-fill-gradient">Submit</BaseButton>
    </form>
  </div>

</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Datepicker from 'vuejs-datepicker'
import NProgress from "nprogress"
import BaseInput from "@/components/BaseInput";
import BaseSelect from "@/components/BaseSelect";
import BaseButton from "@/components/BaseButton";

export default {
  name: "CreateEvent",
  components: {
    BaseButton,
    BaseSelect,
    BaseInput,
    Datepicker
  },
  data() {
    const times = []

    for (let i = 1; i <= 24; i++) {
      times.push(i + ':00')
    }

    return {
      times,
      categories: this.$store.state.categories,
      event: this.createFreshEventObject()
    }
  },
  methods: {
    createFreshEventObject() {
      const user = this.$store.state.userStore.user
      const id = Math.floor(Math.random() * 1000000)
      return {
        id: id,
        user: user,
        category: '',
        organizer: user.name,
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        attendees: []
      }
    },
    createEvent() {
      NProgress.start()
      // namespaced call
      this.$store.dispatch('eventStore/createEvent', this.event)
          .then(() => {
            // navigate to just created event
            this.$router.push({
              name: 'event-show',
              params: { id: this.event.id }
            })
            this.event = this.createFreshEventObject()
          })
          // eslint-disable-next-line no-unused-vars
          .catch(error => {
            NProgress.done()
          })
    }
  },
  computed: {
    ...mapGetters(['getEventByID']),
    ...mapState(['userStore'])
  }
}
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>