<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="290">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Test Socket
        </v-btn>
      </template>
      <v-card>
        <v-text-field
          label="Positon: Meter"
          type="number"
          v-model="positon"
          required
        ></v-text-field>
        <v-btn @click="startSocketTest">Socket Verbindung Testen</v-btn>
        <v-card-actions>
          <v-btn color="green darken-1" text @click="dialog = false">
            Schließen
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>


<script>
import { io } from "socket.io-client";
const socket = io("http://localhost:8000", {
  reconnectionDelayMax: 10000,
});
export default {
  data() {
    return {
      dialog: false,
      positon: null,
    };
  },
  methods: {
    startSocketTest() {
      if (!this.positon) return;
      socket.emit("playSong", this.positon);
    },
    connectSocket() {
      socket.on("connection", (socket) => {
        // console.log(socket);
        alert(socket.id);
        //  socket.emit("chat", "hello");
      });

      socket.on("playSong", (message) => {
        console.log("MESSAGE", message);
      });
    },
  },
  created() {
    this.connectSocket();
  },
};
</script>