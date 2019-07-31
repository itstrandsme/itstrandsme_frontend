<template>
  <v-app dark>
    <v-content>
      <Rain />
        <v-container fluid>
          <MainView />
        </v-container>
    </v-content>
  </v-app>
</template>

<script>
import MainView from "@/views/Main.vue";
import Rain from "@/views/Rain.vue";

export default {
  name: "app",
  data: function() {
    return {
      dark: true
    };
  },
  components: {
    MainView,
    Rain
  }
};
</script>
