<template>
  <div>
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
