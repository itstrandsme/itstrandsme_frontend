import GL from "./gl-obj";
import createCanvas from "./create-canvas";
import RainShaders from "./shaders";

const shaders = new RainShaders();
const glsl = require("glslify");

const vertShader = glsl(shaders.getVertexCode());
const fragShader = glsl(shaders.getFragmentCode());

const defaultOptions = {
  renderShadow: false,
  minRefraction: 256,
  maxRefraction: 512,
  brightness: 1,
  alphaMultiply: 20,
  alphaSubtract: 5,
  parallaxBg: 5,
  parallaxFg: 20
};

function RainRenderer(
  canvas,
  canvasLiquid,
  imageFg,
  imageBg,
  imageShine = null,
  options = {}
) {
  this.canvas = canvas;
  this.canvasLiquid = canvasLiquid;
  this.imageShine = imageShine;
  this.imageFg = imageFg;
  this.imageBg = imageBg;
  this.options = Object.assign({}, defaultOptions, options);
  this.init();
}

RainRenderer.prototype = {
  canvas: null,
  gl: null,
  canvasLiquid: null,
  width: 0,
  height: 0,
  imageShine: "",
  imageFg: "",
  imageBg: "",
  textures: null,
  programWater: null,
  programBlurX: null,
  programBlurY: null,
  parallaxX: 0,
  parallaxY: 0,
  renderShadow: false,
  options: null,
  init() {
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.gl = new GL(this.canvas, { alpha: false }, vertShader, fragShader);
    let gl = this.gl;
    this.programWater = gl.program;

    gl.createUniform("2f", "resolution", this.width, this.height);
    gl.createUniform(
      "1f",
      "textureRatio",
      this.imageBg.width / this.imageBg.height
    );
    gl.createUniform(
      "1i",
      "renderShine",
      this.imageShine == null ? false : true
    );
    gl.createUniform("1i", "renderShadow", this.options.renderShadow);
    gl.createUniform("1f", "minRefraction", this.options.minRefraction);
    gl.createUniform(
      "1f",
      "refractionDelta",
      this.options.maxRefraction - this.options.minRefraction
    );
    gl.createUniform("1f", "brightness", this.options.brightness);
    gl.createUniform("1f", "alphaMultiply", this.options.alphaMultiply);
    gl.createUniform("1f", "alphaSubtract", this.options.alphaSubtract);
    gl.createUniform("1f", "parallaxBg", this.options.parallaxBg);
    gl.createUniform("1f", "parallaxFg", this.options.parallaxFg);

    gl.createTexture(null, 0);

    this.textures = [
      {
        name: "textureShine",
        img: this.imageShine == null ? createCanvas(2, 2) : this.imageShine
      },
      { name: "textureFg", img: this.imageFg },
      { name: "textureBg", img: this.imageBg }
    ];

    this.textures.forEach((texture, i) => {
      gl.createTexture(texture.img, i + 1);
      gl.createUniform("1i", texture.name, i + 1);
    });

    this.render();
  },
  render() {
    this.gl.viewport(this.gl.canvas.width, this.gl.canvas.height);
    this.gl.useProgram(this.programWater);
    this.gl.createUniform("2f", "resolution", this.width, this.height);
    this.gl.createUniform("2f", "parallax", this.parallaxX, this.parallaxY);
    this.updateTexture();
    this.gl.draw();

    requestAnimationFrame(this.render.bind(this));
  },
  updateTextures() {
    this.textures.forEach((texture, i) => {
      this.gl.activeTexture(i + 1);
      this.gl.updateTexture(texture.img);
    });
  },
  updateTexture() {
    this.gl.activeTexture(0);
    this.gl.updateTexture(this.canvasLiquid);
  },
  resize() {
    var width = this.canvas.clientWidth;
    var height = this.canvas.clientHeight;
    if (this.canvas.width != width ||
        this.canvas.height != height) {

      this.width = width;
      this.height = height;

      this.canvas.width = width;
      this.canvas.height = height;

      // in this case just render when the window is resized.
      //this.render();
    }
  },
  get overlayTexture() {
    return null;
  },
  set overlayTexture(v) {}
};

export default RainRenderer;
