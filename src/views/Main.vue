<template>
  <div class="countdown">
  	<h1 style="font-family: 'Sackers_Gothic_Std_Light', sans-serif">Death Stranding</h1>
  	<h2>releases in:</h2>
    <Countdown end="November 8, 2019"></Countdown>
  </div>
</template>

<script>
import Countdown from 'vuejs-countdown'

export default {
  name: "MainView",

  components: { Countdown  }
};
</script>
