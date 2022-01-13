<template>
  <div>
    {{ x }} {{ y }} {{ z }}
    <Scene>
      <SpotLight></SpotLight>
      <HemisphericLight diffuse="#FF0000"></HemisphericLight>
      <PointLight specular="#00FF00"></PointLight>
      <Entity v-model="myEntity" :position="[0, 0, 5]">
        <!-- this box will be rotated relative to the parent entity during the animation -->
        <Box></Box>
      </Entity>
      <Entity :position="[x, y, z]">
        <Animation
          v-if="startAnimation"
          property="position.x"
          :start="1"
          :end="10"
          :duration="15"
        >
        </Animation>
        <Asset src="airboat.obj">
          <Material diffuse="#34495E" specular="#34495E"></Material
        ></Asset>
      </Entity>
    </Scene>

    <v-app>
      <v-btn @click="startAnimation = !startAnimation">Start</v-btn>
      <v-btn @click="++x">Add X</v-btn> <v-btn @click="++y">Add Y</v-btn>
      <v-btn @click="++z">Add Y</v-btn>
      <Player v-if="selectedSong" :selectedSong="selectedSong" />
      <h1>SongList</h1>
      <SongList v-if="songs" :songs="songs" @playerDisplay="updateSong" />
      <h1>Uppload to List</h1>
      <input type="file" name="avatar" @change="selectFile" />
      <v-btn @click="uploadFile">Upload</v-btn>
      <h1>TriggerList</h1>
      <Trigger :trigger="trigger" v-if="trigger" />
      <AddNew :songs="songs" v-if="songs" @updateTrigger="updateTriggerList" />
      <PlayPosition />
      <!--  <Timeline :trigger="trigger" v-if="trigger" /> -->
    </v-app>
  </div>
</template>
<script>
import axios from "axios";
import SongList from "./components/SongList.vue";

import Player from "./components/Player.vue";
import Trigger from "./components/Trigger.vue";
import AddNew from "./components/AddNew.vue";
import PlayPosition from "./components/playPosition.vue";
//import Timeline from "./components/Timeline.vue";
export default {
  components: {
    SongList,
    Player,
    Trigger,
    AddNew,
    PlayPosition,
    //Timeline
  },
  data: () => ({
    startAnimation: false,
    x: 0,
    y: 0,
    z: 15,
    songs: null,
    selectedSong: null,
    selectedFile: null,
    trigger: null,
    myMaterial:
      "https://models.babylonjs.com/Demos/weaponsDemo/meshes/moltenDagger.glb",
  }),

  methods: {
    updateTriggerList(event) {
      this.trigger = event;
    },
    updateSong(event) {
      console.log("UPDATE", event);
      this.selectedSong = event;
    },
    uploadFile() {
      const fd = new FormData();
      fd.append("song", this.selectedFile, this.selectedFile.name);
      axios
        .post("http://localhost:8000/upload", fd)
        .then((response) => (this.songs = response.data.songs));
    },
    selectFile(event) {
      console.log(event);
      this.selectedFile = event.target.files[0];
    },
  },
  created() {
    axios.get("http://localhost:8000/getSongs").then((response) => {
      this.songs = response.data.songs;
    });
    axios.get("http://localhost:8000/getTrigger").then((response) => {
      this.trigger = response.data.trigger;
    });
  },
};
</script>