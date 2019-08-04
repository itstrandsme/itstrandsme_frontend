<template>
  <v-container v-resize="onResize" fluid rain>
  <div style="position: absolute; top: 0px">
    <div class="image-preload" style="display:none">
      <img src="img/drop-color.png" alt="">
      <img src="img/drop-alpha.png" alt="">
      <img src="img/weather/texture-rain-fg.png" />
      <img src="img/weather/texture-rain-bg.png" />
    </div>
    <div>
      <div class="slideshow">
        <canvas width="1" height="1" id="container" style="position:absolute"></canvas>
        <!-- Heavy Rain -->
        <div class="slide" id="slide-1" data-weather="rain"></div>
      </div>
      <p class="nosupport">Sorry, but your browser does not support WebGL!</p>
    </div>
  </div>
  </v-container>
</template>

<script>
import "core-js";
import RainRenderer from "@/rain/rain-renderer";
import Raindrops from "@/rain/raindrops";
import loadImages from "@/rain/image-loader";
import createCanvas from "@/rain/create-canvas";
import TweenLite from 'gsap';
import times from '@/rain/times';
import {random,chance} from '@/rain/random';

export default {
  name: "Rain",

  data () {
    return {
      textureRainFg: null,
      textureRainBg: null,
      textureStormLightningFg: null,
      textureStormLightningBg: null,
      textureFalloutFg: null,
      textureFalloutBg: null,
      textureSunFg: null,
      textureSunBg: null,
      textureDrizzleFg: null,
      textureDrizzleBg: null,
      dropColor: null,
      dropAlpha: null,

      textureFg: null,
      textureFgCtx: null,
      textureBg: null,
      textureBgCtx: null,

      textureBgSize: {
        width:384,
        height:256
      },
      textureFgSize: {
        width:96,
        height:64
      },

      raindrops: null,
      renderer: null,
      canvas: null,

      parallax: {x: 0, y: 0},

      weatherData: null,
      curWeatherData: null,
      blend: {v: 0},

      dpi: 0,
    }
  },

  methods: {
    loadTextures() {
      loadImages([
          {name: "dropAlpha", src: "img/drop-alpha.png"},
          {name: "dropColor", src: "img/drop-color.png"},

          {name:"textureRainFg",src:"img/weather/texture-rain-fg.png"},
          {name:"textureRainBg",src:"img/weather/texture-rain-bg.png"},
        ]).then(images => {
          this.textureRainFg = images.textureRainFg.img;
          this.textureRainBg = images.textureRainBg.img;

          this.dropColor = images.dropColor.img;
          this.dropAlpha = images.dropAlpha.img;

          this.init();
        });
    },

    init() {
      this.canvas = document.querySelector('#container');

      this.dpi = window.devicePixelRatio;
      var displayWidth  = Math.floor(window.innerWidth  * this.dpi);
      var displayHeight = Math.floor(window.innerHeight * this.dpi);

      // Make the canvas the same size
      this.canvas.width  = displayWidth;
      this.canvas.height = displayHeight;

      this.canvas.style.width = displayWidth + "px";
      this.canvas.style.height = displayHeight + "px";

      this.raindrops = new Raindrops(
        this.canvas.width,
        this.canvas.height,
        this.dpi,
        this.dropAlpha,
        this.dropColor,{
          trailRate:1,
          trailScaleRange:[0.2,0.45],
          collisionRadius : 0.45,
          dropletsCleaningRadiusMultiplier : 0.28,
        }
      );

      this.textureFg = createCanvas(this.textureFgSize.width, this.textureFgSize.height);
      this.textureFgCtx = this.textureFg.getContext('2d');
      this.textureBg = createCanvas(this.textureBgSize.width, this.textureBgSize.height);
      this.textureBgCtx = this.textureBg.getContext('2d');

      this.generateTextures(this.textureRainFg,this.textureRainBg);

      this.renderer = new RainRenderer(
      	this.canvas,
      	this.raindrops.canvas,
      	this.textureFg,
      	this.textureBg,
      	null,
      	{
          brightness:1.04,
          alphaMultiply:6,
          alphaSubtract:3,
          /* minRefraction:256,
           maxRefraction:512 */
        }
       );

      this.setupEvents();
    },

    setupEvents() {
      //this.setupParallax();
      this.setupWeather();
      //this.setupFlash();
    },

    setupParallax() {
      document.addEventListener('mousemove', event => {
        let x = event.pageX;
        let y = event.pageY;

        TweenLite.to(this.parallax,1,{
          x:((x / this.canvas.width) * 2) - 1,
          y:((y / this.canvas.height) * 2) - 1,
          ease:Quint.easeOut,
          onUpdate:() => {
            this.renderer.parallaxX = this.parallax.x;
            this.renderer.parallaxY = this.parallax.y;
          }
        })
      });
    },

    setupFlash(){
      setInterval(() => {
        if(chance(this.curWeatherData.flashChance)) {
          flash(
          	this.curWeatherData.bg,
          	this.curWeatherData.fg,
          	this.curWeatherData.flashBg,
          	this.curWeatherData.flashFg
          );
        }
      }, 500)
    },

    setupWeather(){
      this.setupWeatherData();
      window.addEventListener("hashchange", event => {
        this.updateWeather();
      });
      this.updateWeather();
    },

    setupWeatherData() {
      let defaultWeather = {
        raining: true,
        minR: 20,
        maxR: 50,
        rainChance: 0.35,
        rainLimit: 6,
        dropletsRate: 30,
        dropletsSize: [3, 5.5],
        trailRate: 1,
        trailScaleRange: [0.25, 0.35],
        fg: this.textureRainFg,
        bg: this.textureRainBg,
        flashFg: null,
        flashBg: null,
        flashChance: 0,
        collisionRadiusIncrease: 0.0002
      };

      function weather(data) {
        return Object.assign({}, defaultWeather, data);
      }

      this.weatherData = {
        rain:weather({
          rainChance:0.35,
          dropletsRate:30,
          raining:true,
          // trailRate:2.5,
          fg:this.textureRainFg,
          bg:this.textureRainBg
        })
      };
    },

    updateWeather() {
      let hash = window.location.hash;
      let currentSlide = null;
      let currentNav = null;

      if (hash != ""){
        currentSlide = document.querySelector(hash);
      }

      if(currentSlide == null){
        currentSlide = document.querySelector(".slide");
        hash="#"+currentSlide.getAttribute("id");
      }

      currentNav = document.querySelector("[href='"+hash+"']");
      let data = this.weatherData[currentSlide.getAttribute('data-weather')];
      this.curWeatherData=data;

      this.raindrops.options = Object.assign(this.raindrops.options,data)

      this.raindrops.clearDrops();

      TweenLite.fromTo(this.blend, 1, {
        v:0
      },{
        v:1,
        onUpdate: () => {
          this.generateTextures(data.fg, data.bg, this.blend.v);
          this.renderer.updateTextures();
        }
      })
    },

    flash(baseBg, baseFg, flashBg, flashFg) {
      let flashValue={v:0};
      function transitionFlash(to,t = 0.025) {
        return new Promise((resolve, reject) => {
          TweenLite.to(flashValue, t , {
            v:to,
            ease:Quint.easeOut,
            onUpdate: () => {
              this.generateTextures(baseFg, baseBg);
              this.generateTextures(flashFg, flashBg, flashValue.v);
              this.renderer.updateTextures();
            },
            onComplete:() => {
              resolve();
            }
          });
        });
      }

      let lastFlash=transitionFlash(1);
      times(random(2, 7),(i) => {
        lastFlash=lastFlash.then(() => {
          return transitionFlash(random(0.1, 1))
        })
      })
      lastFlash=lastFlash.then(() => {
        return transitionFlash(1, 0.1);
      }).then(() => {
        transitionFlash(0, 0.25);
      });
    },

    generateTextures(fg, bg, alpha = 1) {
      this.textureFgCtx.globalAlpha = alpha;
      this.textureFgCtx.drawImage(fg, 0, 0, this.textureFgSize.width, this.textureFgSize.height);

      this.textureBgCtx.globalAlpha = alpha;
      this.textureBgCtx.drawImage(bg, 0, 0, this.textureBgSize.width, this.textureBgSize.height);
    },

    onResize() {
      this.resizeCanvas(null);
    },

    resizeCanvas(event) {
      
      if (!this.canvas || !this.renderer)
        return;

      var displayWidth  = Math.floor(window.innerWidth  * this.dpi);
      var displayHeight = Math.floor(window.innerHeight * this.dpi);

      if (this.canvas.width  !== displayWidth ||
          this.canvas.height !== displayHeight) {

        this.canvas.width  = displayWidth;
        this.canvas.height = displayHeight;

        this.canvas.style.width = displayWidth + "px";
        this.canvas.style.height = displayHeight + "px";

		this.renderer.resize();
		//this.updateWeather();
      }
    }
  },

  created: function () {
      this.loadTextures();
      //window.addEventListener("resize", this.resizeCanvas);

      if ('ondeviceorientationabsolute' in window) {
        window.addEventListener("ondeviceorientationabsolute", this.resizeCanvas, false);
      } else if ('ondeviceorientation' in window) {
        window.addEventListener("deviceorientation", this.resizeCanvas, false);
      }
  }
};
</script>
