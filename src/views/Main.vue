<template>
  <div
    id="e3"
    style="max-width: 400px; margin: auto;"
    class="grey lighten-3"
  >
    <v-card>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card color="blue-grey darken-2" class="white--text">
            <v-card-text class="text-xs-center">
              <div>
                <div class="headline ds">
                  Death Stranding
                </div>
                <span>releases in:</span>
                <Countdown end="November 8, 2019"></Countdown>
              </div>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-card>
  </div>
</template>

<script>
import Countdown from "vuejs-countdown";

export default {
  name: "MainView",

  components: { Countdown }
};
</script>
