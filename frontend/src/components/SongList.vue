<template>
  <v-simple-table dense>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Artist</th>
          <th class="text-left">Title</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in songs" :key="item.id">
          <td>{{ item.artist }}</td>
          <td>{{ item.title }}</td>
          <td>
            <v-btn icon @click="playSong(item)">
              <v-icon>mdi-play</v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>
<script>
import axios from "axios";
export default {
  props: ["songs"],
  methods: {
    playSong(song) {
      axios.post("http://localhost:8000/play", song).then((response) => {
        console.log(response);

        this.$emit("playerDisplay", response.data);
      });
    },
  },
};
</script>