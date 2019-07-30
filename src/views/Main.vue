<template>
  <v-card
    max-width="400"
    style="margin: auto"
    class="blue-grey lighten-3 mx-auto"
  >
    <v-container
      class="pa-2"
      fluid
      grid-list-md
    >
      <v-layout column>
        <v-flex>
          <v-card
            class="mx-auto"
            color="blue-grey darken-2"
          >
            <v-card-text>
              <div class="headline ds">
                Death Stranding
              </div>
              <span>releases in:</span>
              <Countdown end="November 8, 2019"></Countdown>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex>
          <v-card
            class="mx-auto"
            color="blue-grey darken-2"
          >
            <v-card-text>
              <a class="twitter-timeline white--text" data-width="400" data-theme="dark" href="https://twitter.com/HIDEO_KOJIMA_EN?ref_src=twsrc%5Etfw">Tweets by HIDEO_KOJIMA_EN</a>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex>
          <v-card
            class="mx-auto"
            color="blue-grey darken-2"
          >
            <v-card-text>
              More content coming soon.
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>

import Countdown from "vuejs-countdown";

export default {
  name: "MainView",
  data() {
    return {
    }
  },

  mounted () {
  	this.$nextTick( () => window.twttr.widgets.load );
  },

  components: {
    Countdown
  }
};
</script>
