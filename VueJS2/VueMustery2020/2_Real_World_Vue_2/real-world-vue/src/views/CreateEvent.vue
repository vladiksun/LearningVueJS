<template>
  <div>
    <h1>Create an Event</h1>
    <form @submit.prevent="createEvent">

      <BaseSelect class="field"
                  label="Select a category"
                  v-model="event.category"
                  :options="categories"
                  :class="{ error: $v.event.category.$error}"
                  @blur="$v.event.category.$touch()"/>
      <template v-if="$v.event.category.$error">
        <p v-if="!$v.event.category.required" class="errorMessage">Category is required</p>
      </template>

      <h3>Name & describe your event</h3>
      <BaseInput class="field"
                 label="Title"
                 type="text"
                 placeholder="Add an event title"
                 v-model="event.title"
                 :class="{ error: $v.event.title.$error }"
                 @blur="$v.event.title.$touch()"/>
      <template v-if="$v.event.title.$error">
        <p v-if="!$v.event.title.required" class="errorMessage">Title is required</p>
      </template>


      <BaseInput class="field"
                 label="Description"
                 type="text"
                 placeholder="Add a description"
                 v-model="event.description"
                 :class="{ error: $v.event.description.$error }"
                 @blur="$v.event.description.$touch()"/>
      <template v-if="$v.event.description.$error">
        <p v-if="!$v.event.description.required" class="errorMessage">Description is required</p>
      </template>


      <h3>Where is your event?</h3>
      <BaseInput class="field"
                 label="Location"
                 type="text"
                 placeholder="Add a location"
                 v-model="event.location"
                 :class="{ error: $v.event.location.$error }"
                 @blur="$v.event.location.$touch()"/>
      <template v-if="$v.event.location.$error">
        <p v-if="!$v.event.location.required" class="errorMessage">Location is required</p>
      </template>


      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <datepicker v-model="event.date"
                    placeholder="Select a date"
                    :input-class="{ error: $v.event.date.$error }"
                    @opened="$v.event.date.$touch()"/>
      </div>
      <template v-if="$v.event.date.$error">
        <p v-if="!$v.event.date.required" class="errorMessage">Date is required</p>
      </template>


      <BaseSelect class="field"
                  label="Select a time"
                  v-model="event.time"
                  :class="{ error: $v.event.time.$error}"
                  :options="times"
                  @blur="$v.event.time.$touch()"/>
      <template v-if="$v.event.time.$error">
        <p v-if="!$v.event.time.required" class="errorMessage">Time is required</p>
      </template>

      <BaseButton type="submit"
                  buttonClass="-fill-gradient"
                  :disabled="$v.$anyError">
        Submit</BaseButton>
      <p v-if="$v.$anyError" class="errorMessage">Please fill out the required field(s).</p>

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
import { required, maxValue } from 'vuelidate/lib/validators'

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
  validations: {
      event: {
        category: { required },
        title: { required },
        description: { required },
        location: { required },
        date: { required },
        time: { required },
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
        date: null,
        time: '',
        attendees: []
      }
    },
    createEvent() {
      this.$v.$touch() // make sure every field in the form is dirty

      if (!this.$v.$invalid) {
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