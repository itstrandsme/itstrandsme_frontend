<template>
  <div></div>
</template>

<script>
import 'core-js';
import RainRenderer from "@/rain/rain-renderer";
import Raindrops from "@/rain/raindrops";
import loadImages from "@/rain/image-loader";
import createCanvas from "@/rain/create-canvas";
import TweenLite from 'gsap';
import times from '@/rain/times';
import {random,chance} from '@/rain/random';

export default {
  name: "Rain"
};
</script>
