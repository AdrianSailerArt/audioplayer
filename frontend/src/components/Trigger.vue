<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="trigger"
      :items-per-page="5"
      class="elevation-1"
    ></v-data-table>
  </div>
</template>
<script>
export default {
  props: ["trigger"],
  data() {
    return {
      headers: [
        {
          text: "Title",
          align: "start",
          sortable: false,
          value: "title",
        },
        { text: "Artist", value: "artist" },
        { text: "Album", value: "album" },
        { text: "Position", value: "position" },
      ],
    };
  },
};
</script>