<template>
  <v-card
    max-width="760"
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
              <Countdown
                end="November 8, 2019"
              ></Countdown>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex>
          <v-card
            class="mx-auto"
            color="blue-grey darken-2"
          >
            <v-expansion-panel
              v-model="panel"
              expand
            >
              <v-expansion-panel-content
				class="blue-grey darken-4"
                v-for="(item, i) in twitters"
                :key="i"
              >
                <template v-slot:header>
                  <div>{{ item.account }} Tweets</div>
                </template>
                <v-card color="blue-grey darken-3">
                  <a
                    class="twitter-timeline white--text" 
                    data-tweet-limit="10" 
                    data-width="760" 
                    data-theme="dark" 
                    data-link-color="#F5F8FA"
                    data-chrome="noheader nofooter noscrollbar transparent"
                    :href="getTwitterAccountUrl( item.account )"
                  >
                    <v-card-text>
                      Tweets by {{ item.account }}
                    </v-card-text>
                  </a>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
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
      panel: [true, false],
      twitters: [
        { account: "HIDEO_KOJIMA_EN" },
        { account: "Kojima_Hideo" }
      ]
    }
  },

  mounted () {
  	this.$nextTick(() => {
  		setTimeout(() => {
  			if ( typeof window.twttr.widgets !== "undefined" )
  				window.twttr.widgets.load()
  		}, 2000);
	});
  },

  methods: {
    getTwitterAccountUrl( account ) {
      return "https://twitter.com/" + account + "?ref_src=twsrc%5Etfw";
    }
  },

  components: {
    Countdown
  }
};
</script>
