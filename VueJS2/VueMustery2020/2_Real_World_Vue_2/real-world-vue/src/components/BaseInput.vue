<template>
    <div>
      <label v-if="label">{{ label }}</label>
      <input :value="value" @input="updateValue" v-bind="$attrs" v-on="listeners">
    </div>
</template>

<script>
import { formFieldMixin} from "@/mixins/formFieldMixin";

export default {
  mixins: [formFieldMixin],
  computed: {
    // resolve the conflict between @input="updateValue" AND v-on="$listeners" synthetic sugar
    // because o how JS object works the lower field takes precedence
    listeners() {
      return {
        ...this.$listeners,
        input: this.updateValue
      }
    }
  },
  name: "BaseInput"
}
</script>

<style scoped>

</style>