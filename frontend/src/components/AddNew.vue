<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Add New Position
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">New Positon</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Positon: Meter"
                  type="number"
                  v-model="position"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6">
                <v-autocomplete
                  :items="songs"
                  label="Song"
                  item-text="title"
                  required
                  return-object
                  @change="selectItem"
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        {{ selectedSong }}
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="insertPosition">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from "axios";
export default {
  props: ["songs"],
  data: () => ({
    dialog: false,
    selectedSong: null,
    position: null,
  }),
  methods: {
    selectItem(event) {
      this.selectedSong = event;
    },
    insertPosition() {
      if (!this.position || !this.selectedSong) return;
      const position = { position: this.position };

      const obj = { ...position, ...this.selectedSong };
      console.log(obj);
      axios.post("http://localhost:8000/addTrigger", obj).then((response) => {
        this.$emit("updateTrigger", response.data.trigger);
      });
      this.dialog = false;
      this.selectedSong = null;
      this.position = null;
    },
  },
};
</script>