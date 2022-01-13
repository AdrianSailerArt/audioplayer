<template>
  <v-timeline>
    <v-timeline-item v-for="n in list" :key="n" large>
      <template v-slot:icon>
        <v-avatar>
          {{ n.position }}
        </v-avatar>
      </template>

      <v-card class="elevation-2">
        <v-card-title class="text-h5"> {{ n.title }}</v-card-title>
        <v-card-text> {{ n.artist }}</v-card-text>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>


<script>
export default {
  props: ["trigger"],
  data: () => ({
    list: null,
  }),
  watch: {
    // a computed getter
    trigger() {
      this.list = this.trigger;
    },
    list() {
      // `this` points to the vm instance

      this.list.sort((a, b) => (a.position > b.position ? 1 : -1));
      console.log(this.list);
    },
  },
  created() {
    this.list = this.trigger;
  },
};
</script>