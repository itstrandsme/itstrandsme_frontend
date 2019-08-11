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
      <v-layout row wrap>
        <v-flex
          max-width="380"
          xs12 sm12 md6 lg6
          v-for="(item, i) in countdowns"
          :key="i"
        >
          <v-card
            class="mx-auto"
            color="blue-grey darken-2"
          >
            <v-card-text>
              <div :class="item.class">
                <a :href="item.url" target="_blank" class="white--text">
                  {{ item.title }}
                </a>
              </div>
              <span>{{ item.subtitle }}</span>
              <countdown :time="item.time" :interval="100">
                <template slot-scope="props">
                  <ul class="vuejs-countdown">
                    <li>
                      <p class="digit">{{ props.days }}</p>
                      <p class="text">days</p>
                    </li>
                    <li>
                      <p class="digit">{{ props.hours }}</p>
                      <p class="text">hours</p>
                    </li>
                    <li>
                      <p class="digit">{{ props.minutes }}</p>
                      <p class="text">min</p>
                    </li>
                    <li>
                      <p class="digit">{{ props.seconds }}.{{ Math.floor(props.milliseconds / 100) }}</p>
                      <p class="text">Sec</p>
                    </li>
                  </ul>
                </template>
              </countdown>
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
              >
                <template v-slot:header>
                  <div>KOJIMA PRODUCTIONS Videos</div>
                </template>
                <iframe
                  width="100%"
                  height="315"
                  src="https://www.youtube.com/embed/+lastest?list=PL4np0lscUMnvSVQYCiGwCWELdmfV2zdlS"
                  frameborder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </v-expansion-panel-content>
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

import VueCountdown from '@chenfengyuan/vue-countdown';

export default {
  name: "MainView",
  data() {
    var now = new Date();
    var releaseDate = new Date(2019, 10, 8) - now;
    var panelDate = new Date(2019, 7, 19, 16) - now;

    return {
      counting: false,
      panel: [true, true, false],
      countdowns: [
        {
          title: "Death Stranding",
          subtitle: "releases in:", 
          class: "headline ds",
          url: "http://www.kojimaproductions.jp/",
          time: releaseDate
        },
        {
          title: "gamescom: ONL",
          subtitle: "goes on air in:", 
          class: "headline",
          url: "https://www.gamescom.global/events-and-congresses/for-all/opening-night-live/page-home-260.php",
          time: panelDate
        },
      ],
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
    },
    startCountdown: function () {
      this.counting = true;
    },
    handleCountdownEnd: function () {
      this.counting = false;
    }
  },

  components: {
    'countdown': VueCountdown
  }
};
</script>
