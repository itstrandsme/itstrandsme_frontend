<template>
  <v-app dark>
    <v-content>
      <Rain />
      <v-container fluid v-scroll="handleScroll">
        <MainView />
      </v-container>
    </v-content>
    <v-fab-transition>    
      <v-btn
        v-show="!hidden"
        fab dark
        small fixed
        bottom right
        block @click="$vuetify.goTo(0)"
      >
        <v-icon>expand_less</v-icon>
      </v-btn>
    </v-fab-transition>    
  </v-app>
</template>

<script>
import MainView from "@/views/Main.vue";
import Rain from "@/views/Rain.vue";

export default {
  name: "app",
  data: function() {
    return {
      dark: true,
      hidden: true
    };
  },

  methods: {
    handleScroll (evt, el) {
      this.hidden = window.scrollY == 0;
      return !this.hidden;
    }
  },

  components: {
    MainView,
    Rain
  }
};
</script>
