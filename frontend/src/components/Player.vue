<template>
  <div class="text-center">
    <v-card tile>
      <v-list>
        <v-list-item v-if="selectedSong">
          <v-list-item-content>
            <v-list-item-title>{{ selectedSong.title }}</v-list-item-title>
            <v-list-item-subtitle>{{
              selectedSong.artist[0]
            }}</v-list-item-subtitle>
          </v-list-item-content>

          <v-spacer></v-spacer>

          <v-list-item-icon :class="{ 'mx-5': $vuetify.breakpoint.mdAndUp }">
            <v-btn icon>
              <v-icon @click="stopSong">mdi-stop</v-icon>
            </v-btn>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>
<script>
import axios from "axios";
export default {
  props: ["selectedSong"],

  methods: {
    stopSong() {
      axios.get("http://localhost:8000/stop").then((response) => {
        console.log("STOPP", response);
      });
    },
  },
};
</script>