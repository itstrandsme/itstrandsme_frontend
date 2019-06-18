<template>
	<v-app>
	  <v-content>
	    <v-container fluid rain>
			<Rain />
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
  components: {
    MainView, Rain
  }
};
</script>
