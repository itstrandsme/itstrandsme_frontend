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
              <countdown
                :time="item.time"
                :interval="100"
                @end="handleCountdownEnd(i)"
                v-if="item.counting == true"
              >
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
              <template
                v-if="item.counting == false"
              >
                <ul class="vuejs-countdown">
                  <li>
                    <p class="digit">{{ item.finishText }}</p>
                    <p class="text">
                      <a :href="item.url" target="_blank" class="white--text">
                        {{ item.finishSubText }}
                      </a>
                    </p>
                  </li>
                </ul>
              </template>
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
                v-for="(item, i) in youtube"
                :key="i"
              >
                <template v-slot:header>
                  <div>{{ item.title }}</div>
                </template>
                <iframe
                  width="100%"
                  height="315"
                  :src="item.src"
                  frameborder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </v-expansion-panel-content>
              <v-expansion-panel-content
                class="blue-grey darken-4"
                v-for="(item, i) in twitter"
                :key="i"
              >
                <template v-slot:header>
                  <div>{{ item.account }} Tweets</div>
                </template>
                <v-card color="blue-grey darken-3">
                  <a
                    class="twitter-timeline white--text" 
                    data-tweet-limit="20" 
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

    return {
      panel: [true, false, true, false],
      countdowns: [
        {
          title: "Death Stranding",
          subtitle: "releases in:",
          class: "headline ds",
          url: "https://store.playstation.com/en-us/product/UP9000-CUSA11260_00-DEATHSTRAND00001",
          time: releaseDate,
          finishText: "Today!",
          finishSubText: "Check it here",
          counting: true
        }
      ],
      youtube: [
        {
          title: "KOJIMA PRODUCTIONS Videos",
          src: "https://www.youtube.com/embed/+lastest?list=PL4np0lscUMnvSVQYCiGwCWELdmfV2zdlS"
        }
      ],
      twitter: [
        { account: "KojiPro2015_EN" },
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
    handleCountdownEnd: function (i) {
      this.countdowns[i].counting = false;
    }
  },

  components: {
    'countdown': VueCountdown
  }
};
</script>
