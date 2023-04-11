/**!
 * @file Fibonacci Rainbow Spirals  
 * @version 4.1.2  
 * @copyright Iuri Guilherme 2023  
 * @license GNU AGPLv3  
 * @author Iuri Guilherme <https://iuri.neocities.org/>  
 * @description This is Fibonacci Rainbow Spirals made with p5js for 
 *  fxhash.xyz genarative tokens. Source code available at Github: 
 *  https://github.com/iuriguilherme/fibonacci-rainbow-spirals  
 * 
 * This program is free software: you can redistribute it and/or modify it 
 * under the terms of the GNU Affero General Public License as published by the 
 * Free Software Foundation, either version 3 of the License, or (at your 
 * option) any later version.  
 * 
 * This program is distributed in the hope that it will be useful, but WITHOUT 
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or 
 * FITNESS FOR A PARTICULAR PURPOSE.  
 * See the GNU Affero General Public License for more details.  
 * 
 * You should have received a copy of the GNU Affero General Public License 
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.  
 * 
 */

const name = "fibonacci-rainbow-spirals";
const version = "4.1.2";

const seed = fxrand() * 1e8;

import p5 from "p5";
import { create, all } from "mathjs";
const math = create(all, {"randomSeed": seed});

import { fibonacci_index } from "./fibonacci.js";
import { configureVariation } from "./params.js";

const sleep = ms => new Promise(r => setTimeout(r, ms));
// https://github.com/fxhash/fxhash-boilerplate/issues/20
const properAlphabet = 
  "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
const variationFactor = 3.904e-87; // This number is magic
const pi = math.pi;
const half_pi = math.pi / 2;
const phi = math.phi;
const sqrt5 = math.sqrt(5);
const fxhashDecimal = base58toDecimal(fxhashTrunc);
const lastVariation = 50;
//~ const featureVariation = fxHashToVariation(fxhashDecimal, lastVariation, 1);
//~ const featureVariation = 0;
const featureVariation = 14;
const BUFF_SIZE = 1080;
const BUFF_WID_MOD = 1;
const BUFF_HEI_MOD = 1;
const BUFF_WID = BUFF_SIZE * BUFF_WID_MOD;
const BUFF_HEI = BUFF_SIZE * BUFF_HEI_MOD;
const CANVAS_PIXEL_DENSITY = 1;
const BUFF_PIXEL_DENSITY = 4;
const delayLimit = 6000;
let scope = {
  "a": 0,
  "af": 0,
  "b": 0,
  "c": 0,
  "d": 0,
  "e": half_pi,
  "f": phi,
  "fd": fxhashDecimal,
  "ft": getRandFxHash(),
  "g": pi,
  "h": 360,
  "hx": 300,
  "hn": 60,
  "i": 100,
  "j": 360,
  "n": 1,
  "r": 1,
  "s": 100,
  "sx": 100,
  "sn": 75,
  "l": 100,
  "lx": 60,
  "ln": 30,
  "u": 1,
  "w": window.innerWidth / window.innerHeight,
  "x": window.innerWidth,
  "y": window.innerHeight,
  "z": math.min(window.innerWidth, window.innerHeight)
};
let variation = featureVariation;
let width = window.innerWidth;
let height = window.innerHeight;
let dS = 1000;
let 
  buffer,
  canvas,
  dM,
  dW,
  //~ drawFunction,
  //~ drawInnerFunction,
  featureHue,
  featureLuminance,
  featureSaturation,
  functionMap,
  //~ p,
  ratio,
  //~ ratioFunction,
  reHeight,
  reRatio,
  reReHeight,
  reReWidth,
  reScale,
  reSize,
  //~ resizeFunction,
  reWidth,
  scale,
  scaleFactor,
  //~ setupFunction,
  size,
  sizeX,
  sizeY
;
var p;

let sketch = function(p5) {
  
  functionMap = {
    "draw": {
      "1": drawFunction1,
      "2": drawFunction2,
      "3": drawFunction3,
      "4": drawFunction4,
      "5": drawFunction5,
      "6": drawFunction6,
      "7": drawFunction7,
      "8": drawFunction8,
      "9": drawFunction9,
      "10": drawFunction10,
      "11": drawFunction11,
      "12": drawFunction12,
    },
    "drawInner": {
      "1": drawInnerFunction1,
      "2": drawInnerFunction2,
      "3": drawInnerFunction3,
      "4": drawInnerFunction4,
      "5": drawInnerFunction5,
      "6": drawInnerFunction6,
      "7": drawInnerFunction7,
      "8": drawInnerFunction8,
      "9": drawInnerFunction9,
      "10": drawInnerFunction10,
      "11": drawInnerFunction11,
      "12": drawInnerFunction12,
    },
    "ratio": {
      "1": checkRatio1,
      "2": checkRatio2,
    },
    "resize": {
      "1": windowResize1,
      "2": windowResize2,
      "3": windowResize3,
    },
    "setup": {
      "1": setupFunction1,
      "2": setupFunction2,
      "3": setupFunction3,
    },
  }
  p = {
    "x": "0",
    "y": "0",
    "w": "c",
    "h": "c",
    "start": "0",
    "stop": "e",
    "rotate": "e",
    "rotateStart": "fd",
    "weight": "u",
    "hue": "h",
    "sat": "s",
    "lum": "l",
    "transOffsetX": "z / 2",
    "transOffsetY": "z / 2",
    "transIterX": "a",
    "transIterY": "a",
    "transSpirX": "b",
    "transSpirY": "b",
    "bgHue": "h",
    "bgSat": "s",
    "bgLum": "l",
    "delay": "r",
    "maxHue": "hx",
    "minHue": "hn",
    "maxSat": "sx",
    "minSat": "sn",
    "maxLum": "lx",
    "minLum": "ln",
    "maxIter": "i",
    "maxSpir": "j",
    "anim": "n",
    "size": "z",
    "drawInnerFunction": "1",
    "drawFunction": "1",
    "ratioFunction": "1",
    "resizeFunction": "1",
    "setupFunction": "1",
  };
  reWidth = window.innerWidth;
  reHeight = window.innerHeight;
  featureHue = fxHashToVariation(fxhashDecimal, me(p.maxHue) - me(p.minHue)) + 
    me(p.minHue);
  scope.h = featureHue;
  featureSaturation = fxHashToVariation(fxhashDecimal, me(p.maxSat) - 
    me(p.minSat)) + me(p.minSat);
  scope.s = featureSaturation;
  featureLuminance = fxHashToVariation(fxhashDecimal, me(p.maxLum) - 
    me(p.minLum)) + me(p.minLum);
  scope.l = featureLuminance;
  
  p5.preload = function() {
    p5.randomSeed(seed);
    p5.noiseSeed(seed);
  }
  
  p5.setup = function() {
    p5.colorMode(p5.HSL);
    
    configureVariation(p, variation);
    featureHue = fxHashToVariation(fxhashDecimal, me(p.maxHue) - me(p.minHue)) 
      + me(p.minHue);
    scope.h = featureHue;
    featureSaturation = fxHashToVariation(fxhashDecimal, me(p.maxSat) - 
      me(p.minSat)) + me(p.minSat);
    scope.s = featureSaturation;
    featureLuminance = fxHashToVariation(fxhashDecimal, me(p.maxLum) - 
      me(p.minLum)) + me(p.minLum);
    scope.l = featureLuminance;
    
    $fx.features({
      //~ "fx(variation)": featureVariation,
      //~ "fx(draw)": p.drawFunction,
      "fx(hue)": featureHue,
      "fx(saturation)": featureSaturation,
      "fx(luminance)": featureLuminance,
    });
    
    functionMap["setup"][p["setupFunction"]]();
    
    p5.frameRate(60);
    p5.noLoop();
  }
  p5.draw = async function() {
    for (let k in p) {
      console.log("params[" + k + "]: " + p[k]);
    }
    for (let k in scope) {
      console.log("scope[" + k + "]: " + scope[k]);
    }
    console.log(`
[${name} v${version}]
fx(hash): ${fxhashTrunc}
fx(hash) base 10: ${fxhashDecimal}
fx(variation): ${featureVariation}
fx(hue): ${featureHue}
fx(saturation): ${featureSaturation}
fx(luminance): ${featureLuminance}
Current variation: ${variation}
drawFunction: ${functionMap["draw"][p["drawFunction"]].name}
drawInnerFunction: ${functionMap["drawInner"][p["drawInnerFunction"]].name}
ratioFunction: ${functionMap["ratio"][p["ratioFunction"]].name}
resizeFunction: ${functionMap["resize"][p["resizeFunction"]].name}
setupFunction: ${functionMap["setup"][p["setupFunction"]].name}
`)
    await functionMap["draw"][p["drawFunction"]]();
    $fx.preview();
    console.log(`[${name} v${version}]: finished drawing`);
  }
  p5.windowResized = function() {
    functionMap["resize"][p["resizeFunction"]]();
  }
  p5.keyTyped = function() {
    switch (p5.key.toLowerCase()) {
      //~ case 'r':
        //~ console.log("redrawing canvas...");
        //~ p5.redraw();
        //~ break;
      //~ case 'f':
        //~ console.log("resizing window...");
        //~ functionMap["resize"][p["resizeFunction"]]();
        //~ break;
      case 's':
        let file = `${name}_v${version}_variation-${variation}.png`;
        console.log(`saving canvas to ${file}...`);
        p5.saveCanvas(canvas, file);
        break;
      //~ case 'a':
        //~ variation = math.max(0, variation - 1);
        //~ configureVariation(p, variation);
        //~ console.log(`variation changed to ${variation}`);
        //~ p5.redraw();
        //~ break;
      //~ case 'd':
        //~ variation = math.min(lastVariation, variation + 1);
        //~ configureVariation(p, variation);
        //~ console.log(`variation changed to ${variation}`);
        //~ p5.redraw();
        //~ break;
      case 'z':
        scope.r = math.max(0, scope.r - 100);
        scope.n = 1;
        console.log(`animation delay decreased to ${me(p.delay)}ms`);
        break;
      case 'x':
        if (scope.n == 0) {
          scope.n = 1;
          console.log(`animation delay activated`);
        } else {
          scope.n = 0;
          console.log(`animation delay deactivated
(screen will only refresh when drawing is done)`);
        }
        break;
      case 'c':
        scope.r = math.min(delayLimit, scope.r + 100);
        console.log(`animation delay increased to ${me(p.delay)}ms`);
        break;
      default:
        console.log(
          `key ${p5.key} was pressed, which doesn't do anything.`,
          "\nz: Decrease animation delay in 100ms (down to 0ms);",
          "\nc: Increase animation delay in 100ms (up to 6s);",
          "\nx: Remove animation delay (the screen will freeze until the",
          "drawing is finished;",
          "\ns: Saves current canvas to .png",
        );
    }
  }
  function setupFunction1() {
    reRatio = reWidth / reHeight;
    functionMap["ratio"][p["ratioFunction"]]();
    reSize = p5.min(reReWidth, reReHeight);
    scope.z = reSize;
    canvas = p5.createCanvas(me(p.size), me(p.size));
    reScale = width / reWidth;
    p5.scale(reScale);
  }
  function setupFunction2() {
    size = p5.min(p5.windowWidth, p5.windowHeight);
    sizeX = size * BUFF_WID_MOD;
    sizeY = size * BUFF_HEI_MOD;
    canvas = p5.createCanvas(sizeX, sizeY);
    scale = p5.width / width;
    p5.scale(scale);
    p5.pixelDensity(CANVAS_PIXEL_DENSITY);
  }
  function setupFunction3() {
    dW = p5.min(p5.windowWidth, p5.windowHeight);
    dM = dW / dS;
    canvas = p5.createCanvas(dW, dW);
  }
  /**
   * @description Resize screen helper function
   */
  function checkRatio1(){
    let reReRatio = window.innerWidth / window.innerHeight;
    if (reReRatio > reRatio) {
      reScale = window.innerHeight / reHeight;
      reReWidth = (window.innerHeight / reHeight) * reWidth;
      reReHeight = window.innerHeigth;
    } else {
      reScale = window.innerWidth / reWidth;
      reReWidth = window.innerWidth;
      reReHeight = (window.innerWidth / reWidth) * reHeight;
    }
  }
  /**
   * @description Resize screen helper function v2
   */
  function checkRatio2() {
    let reRatio = p5.windowWidth / p5.windowHeight;
    if (reRatio > ratio) {
      scale = p5.windowHeight / p5.height;
      width = (p5.windowHeight / p5.height) * p5.width;
      height = p5.windowHeight;
    } else {
      scale = p5.windowWidth / p5.width;
      width = p5.windowWidth;
      height = (p5.windowWidth / p5.width) * p5.height;
    }
  }
  function windowResize1() {
    functionMap["ratio"][p["ratioFunction"]]();
    reSize = p5.min(reReWidth, reReHeight);
    p5.resizeCanvas(reSize, reSize);
  }
  function windowResize2() {
    size = p5.min(p5.windowWidth, p5.windowHeight);
    sizeX = size * BUFF_WID_MOD;
    sizeY = size * BUFF_HEI_MOD;
    p5.scaleFactor = BUFF_SIZE / size;
    p5.resizeCanvas(sizeX, sizeY);
    //~ p5.image(buffer, 0, 0, sizeX, sizeY);
  }
  function windowResize3() {
    dW = p5.min(p5.windowWidth, p5.windowHeight);
    dM = dW / dS;
    p5.resizeCanvas(dW, dW);
  }
  async function drawFunction1() {
    p5.noFill();
    p5.scale(reScale);
    reSize = p5.min(reReWidth, reReHeight);
    scope.z = reSize;
    p5.translate(me(p.transOffsetX), me(p.transOffsetY));
    p5.background(me(p.bgHue), me(p.bgSat), me(p.bgLum));
    for (let i = 0; i < me(p.maxIter); i++) {
      p5.translate(me(p.transIterX), me(p.transIterY));
      let iFib = getFibonacci(i);
      for (let j = 0; j <= me(p.maxSpir); j++) {
        let jFib = getFibonacci(j);
        scope.a = i;
        scope.b = j;
        scope.c = iFib;
        scope.d = jFib;
        await functionMap["drawInner"][p["drawInnerFunction"]]();
      }
      p5.rotate(me(p.rotate));
    }
  }
  /**
   * Uses alternative ratio function
   */
  async function drawFunction2() {
    p5.noFill();
    functionMap["ratio"][p["ratioFunction"]]();
    p5.scale(scale);
    size = p5.min(width, height);
    scope.z = size;
    p5.translate(me(p.transOffsetX), me(p.transOffsetY));
    p5.background(me(p.bgHue), me(p.bgSat), me(p.bgLum));
    for (let i = 0; i < me(p.maxIter); i++) {
      p5.translate(me(p.transIterX), me(p.transIterY));
      let iFib = getFibonacci(i);
      for (let j = 0; j <= me(p.maxSpir); j++) {
        let jFib = getFibonacci(j);
        scope.a = i;
        scope.b = j;
        scope.c = iFib;
        scope.d = jFib;
        await functionMap["drawInner"][p["drawInnerFunction"]]();
      }
      p5.rotate(me(p.rotate));
    }
  }
  /**
   * Uses fxhash to get arc(x)
   */
  async function drawFunction3() {
    p5.noFill();
    p5.scale(reScale);
    reSize = p5.min(reReWidth, reReHeight);
    scope.z = reSize;
    p5.translate(me(p.transOffsetX), me(p.transOffsetY));
    p5.background(me(p.bgHue), me(p.bgSat), me(p.bgLum));
    for (let i = 0; i < fxhashTrunc.length; i++) {
      let fi = properAlphabet.indexOf(fxhashTrunc[i]);
      let iFib = getFibonacci(fi);
      p5.translate(me(p.transIterX), me(p.transIterY));
      scope.af = i;
      scope.a = fi;
      scope.c = iFib;
      for (let j = 0; j <= me(p.maxSpir); j++) {
        let jFib = getFibonacci(j);
        scope.b = j;
        scope.d = jFib;
        await functionMap["drawInner"][p["drawInnerFunction"]]();
      }
      p5.rotate(me(p.rotate));
    }
  }
  /**
   * Uses fxhash to get arc(x) and rotates with fxHashDecimal at start
   */
  async function drawFunction4() {
    p5.noFill();
    p5.scale(reScale);
    reSize = p5.min(reReWidth, reReHeight);
    scope.z = reSize;
    p5.translate(me(p.transOffsetX), me(p.transOffsetY));
    p5.background(me(p.bgHue), me(p.bgSat), me(p.bgLum));
    p5.rotate(me(p.rotateStart));
    for (let i = 0; i < fxhashTrunc.length; i++) {
      let fi = properAlphabet.indexOf(fxhashTrunc[i]);
      let iFib = getFibonacci(fi);
      p5.translate(me(p.transIterX), me(p.transIterY));
      scope.af = i;
      scope.a = fi;
      scope.c = iFib;
      for (let j = 0; j <= me(p.maxSpir); j++) {
        let jFib = getFibonacci(j);
        scope.b = j;
        scope.d = jFib;
        await functionMap["drawInner"][p["drawInnerFunction"]]();
      }
      p5.rotate(me(p.rotate));
    }
  }
  /**
   * Rotates with fxHashDecimal at start
   */
  async function drawFunction5() {
    p5.noFill();
    p5.scale(reScale);
    reSize = p5.min(reReWidth, reReHeight);
    scope.z = reSize;
    p5.translate(me(p.transOffsetX), me(p.transOffsetY));
    p5.background(me(p.bgHue), me(p.bgSat), me(p.bgLum));
    p5.rotate(me(p.rotateStart));
    for (let i = 0; i < me(p.maxIter); i++) {
      p5.translate(me(p.transIterX), me(p.transIterY));
      let iFib = getFibonacci(i);
      for (let j = 0; j <= me(p.maxSpir); j++) {
        //~ console.log({"i": i, "j": j});
        let jFib = getFibonacci(j);
        scope.a = i;
        scope.b = j;
        scope.c = iFib;
        scope.d = jFib;
        await functionMap["drawInner"][p["drawInnerFunction"]]();
      }
      p5.rotate(me(p.rotate));
    }
  }
  /**
   * Uses a PRNG to decide arc(x)
   */
  async function drawFunction6() {
    p5.noFill();
    p5.scale(reScale);
    reSize = p5.min(reReWidth, reReHeight);
    scope.z = reSize;
    p5.translate(me(p.transOffsetX), me(p.transOffsetY));
    p5.background(me(p.bgHue), me(p.bgSat), me(p.bgLum));
    for (let i = 0; i < me(p.maxIter); i++) {
      scope.a = i;
      scope.af = i;
      let fi = getRandFxHash();
      let iFib = getFibonacci(fi);
      scope.c = iFib;
      p5.translate(me(p.transIterX), me(p.transIterY));
      for (let j = 0; j <= me(p.maxSpir); j++) {
        //~ console.log({"i": i, "j": j});
        scope.b = j;
        let jFib = getFibonacci(j);
        scope.d = jFib;
        await functionMap["drawInner"][p["drawInnerFunction"]]();
      }
      p5.rotate(me(p.rotate));
    }
  }
  /**
   * Uses a PRNG to decide arc(x), and rotates by fxHashDecimal at start
   */
  async function drawFunction7() {
    p5.noFill();
    p5.scale(reScale);
    reSize = p5.min(reReWidth, reReHeight);
    scope.z = reSize;
    p5.translate(me(p.transOffsetX), me(p.transOffsetY));
    p5.background(me(p.bgHue), me(p.bgSat), me(p.bgLum));
    p5.rotate(me(p.rotateStart));
    for (let i = 0; i < me(p.maxIter); i++) {
      scope.a = i;
      scope.af = i;
      let fi = getRandFxHash();
      let iFib = getFibonacci(fi);
      scope.c = iFib;
      p5.translate(me(p.transIterX), me(p.transIterY));
      for (let j = 0; j <= me(p.maxSpir); j++) {
        //~ console.log({"i": i, "j": j});
        scope.b = j;
        let jFib = getFibonacci(j);
        scope.d = jFib;
        await functionMap["drawInner"][p["drawInnerFunction"]]();
      }
      p5.rotate(me(p.rotate));
    }
  }
  /**
   * Uses a PRNG to decide arc(x), and rotates by fxHashDecimal at start
   * Alternative version 1
   */
  async function drawFunction8() {
    p5.noFill();
    p5.scale(reScale);
    reSize = p5.min(reReWidth, reReHeight);
    scope.z = reSize;
    p5.translate(me(p.transOffsetX), me(p.transOffsetY));
    p5.background(me(p.bgHue), me(p.bgSat), me(p.bgLum));
    p5.rotate(me(p.rotateStart));
    for (let i = 0; i < me(p.maxIter); i++) {
      scope.af = i;
      let fi = getRandFxHash();
      scope.a = fi;
      let iFib = getFibonacci(fi);
      scope.c = iFib;
      p5.translate(me(p.transIterX), me(p.transIterY));
      for (let j = 0; j <= me(p.maxSpir); j++) {
        //~ console.log({"i": i, "j": j});
        scope.b = j;
        let jFib = getFibonacci(j);
        scope.d = jFib;
        await functionMap["drawInner"][p["drawInnerFunction"]]();
      }
      p5.rotate(me(p.rotate));
    }
  }
  /**
   * Uses a PRNG to decide arc(x), and rotates by fxHashDecimal at start
   * Alternative version 2
   */
  async function drawFunction9() {
    p5.noFill();
    p5.scale(reScale);
    reSize = p5.min(reReWidth, reReHeight);
    scope.z = reSize;
    p5.translate(me(p.transOffsetX), me(p.transOffsetY));
    p5.background(me(p.bgHue), me(p.bgSat), me(p.bgLum));
    p5.rotate(me(p.rotateStart));
    for (let i = 0; i < me(p.maxIter); i++) {
      scope.af = i;
      p5.translate(me(p.transIterX), me(p.transIterY));
      for (let j = 0; j <= me(p.maxSpir); j++) {
        //~ console.log({"i": i, "j": j});
        let fi = getRandFxHash();
        scope.a = fi;
        scope.b = j;
        let iFib = getFibonacci(fi);
        scope.c = iFib;
        let jFib = getFibonacci(j);
        scope.d = jFib;
        await functionMap["drawInner"][p["drawInnerFunction"]]();
      }
      p5.rotate(me(p.rotate));
    }
  }
  /**
   * Uses a PRNG to decide arc(x)
   * Alternative version 1
   */
  async function drawFunction10() {
    p5.noFill();
    p5.scale(reScale);
    reSize = p5.min(reReWidth, reReHeight);
    scope.z = reSize;
    p5.translate(me(p.transOffsetX), me(p.transOffsetY));
    p5.background(me(p.bgHue), me(p.bgSat), me(p.bgLum));
    for (let i = 0; i < me(p.maxIter); i++) {
      scope.af = i;
      let fi = getRandFxHash();
      scope.a = fi;
      let iFib = getFibonacci(fi);
      scope.c = iFib;
      p5.translate(me(p.transIterX), me(p.transIterY));
      for (let j = 0; j <= me(p.maxSpir); j++) {
        //~ console.log({"i": i, "j": j});
        scope.b = j;
        let jFib = getFibonacci(j);
        scope.d = jFib;
        await functionMap["drawInner"][p["drawInnerFunction"]]();
      }
      p5.rotate(me(p.rotate));
    }
  }
  /**
   * Uses a PRNG to decide arc(x)
   * Alternative version 2
   */
  async function drawFunction11() {
    p5.noFill();
    p5.scale(reScale);
    reSize = p5.min(reReWidth, reReHeight);
    scope.z = reSize;
    p5.translate(me(p.transOffsetX), me(p.transOffsetY));
    p5.background(me(p.bgHue), me(p.bgSat), me(p.bgLum));
    for (let i = 0; i < me(p.maxIter); i++) {
      scope.af = i;
      p5.translate(me(p.transIterX), me(p.transIterY));
      for (let j = 0; j <= me(p.maxSpir); j++) {
        //~ console.log({"i": i, "j": j});
        let fi = getRandFxHash();
        scope.a = fi;
        scope.b = j;
        let iFib = getFibonacci(fi);
        scope.c = iFib;
        let jFib = getFibonacci(j);
        scope.d = jFib;
        await functionMap["drawInner"][p["drawInnerFunction"]]();
      }
      p5.rotate(me(p.rotate));
    }
  }
  /**
   * Uses a PRNG to decide arc(x), and rotates by fxHashDecimal at start
   * Uses alternative ratio function
   */
  async function drawFunction12() {
    p5.noFill();
    functionMap["ratio"][p["ratioFunction"]]();
    p5.scale(scale);
    size = p5.min(width, height);
    scope.z = size;
    p5.translate(me(p.transOffsetX), me(p.transOffsetY));
    p5.background(me(p.bgHue), me(p.bgSat), me(p.bgLum));
    p5.rotate(me(p.rotateStart));
    for (let i = 0; i < me(p.maxIter); i++) {
      scope.a = i;
      scope.af = i;
      let fi = getRandFxHash();
      let iFib = getFibonacci(fi);
      scope.c = iFib;
      p5.translate(me(p.transIterX), me(p.transIterY));
      for (let j = 0; j <= me(p.maxSpir); j++) {
        //~ console.log({"i": i, "j": j});
        scope.b = j;
        let jFib = getFibonacci(j);
        scope.d = jFib;
        await functionMap["drawInner"][p["drawInnerFunction"]]();
      }
      p5.rotate(me(p.rotate));
    }
  }
  /**
   * Hue goes from 0 to 360
   * Saturation goes from 100 to 0
   * Luminance is featureLuminance
   */
  async function drawInnerFunction1() {
    scope.h = math.floor(scope.b * (360 / me(p.maxSpir)));
    scope.s = math.abs(100 - math.floor(scope.a * (100 / me(p.maxIter))));
    await drawSpiral1();
  }
  /**
   * Hue goes from 0 to 360
   * Saturation goes from 0 to 100
   * Luminance is featureLuminance
   */
  async function drawInnerFunction2() {
    scope.h = math.floor(scope.b * (360 / me(p.maxSpir)));
    scope.s = math.floor(scope.a * (100 / me(p.maxIter)));
    await drawSpiral1();
  }
  /**
   * Hue goes from 360 to 0
   * Saturation goes from 100 to 0
   * Luminance is featureLuminance
   */
  async function drawInnerFunction3() {
    scope.h = math.abs(360 - math.floor(scope.b * (360 / me(p.maxSpir))));
    scope.s = math.abs(100 - math.floor(scope.a * (100 / me(p.maxIter))));
    await drawSpiral1();
  }
  async function drawInnerFunction4() {
    p5.translate(
      me(p.transSpirX),
      me(p.transSpirY),
    );
    await drawInnerFunction1();
  }
  /**
   * Hue goes from 0 to 360
   * Saturation goes from 100 to (100 - p.maxIter)
   * Luminance is featureLuminance
   */
  async function drawInnerFunction5() {
    scope.h = math.floor(scope.b * (360 / me(p.maxSpir)));
    scope.s = math.abs(100 - scope.a);
    await drawSpiral1();
  }
  /**
   * Hue goes from 0 to 360
   * Saturation goes from 100 to 0 relative to 0..57 range
   * Luminance is featureLuminance
   */
  async function drawInnerFunction6() {
    scope.h = math.floor(scope.b * (360 / me(p.maxSpir)));
    scope.s = math.floor(scope.af * (100 / fxhashTrunc.length));
    await drawSpiral1();
  }
  /**
   * Hue goes from 360 to 0
   * Saturation goes from 0 to 100 relative to 0..57 range
   * Luminance is featureLuminance
   */
  async function drawInnerFunction7() {
    scope.h = math.abs(360 - math.floor(scope.b * (360 / me(p.maxSpir))));
    scope.s = math.floor(scope.af * (100 / fxhashTrunc.length));
    await drawSpiral1();
  }
  /**
   * Hue goes from 0 to 360
   * Saturation goes from 1000 to 0 relative to 0..57 range
   * Luminance is featureLuminance
   */
  async function drawInnerFunction8() {
    scope.h = math.floor(scope.b * (360 / me(p.maxSpir)));
    scope.s = math.abs(100 - math.floor(scope.af * (100 / fxhashTrunc.length)));
    await drawSpiral1();
  }
  /**
   * Hue goes from 0 to p.maxSpir
   * Saturation goes from 0 to p.maxIter
   * Luminance is featureLuminance
   */
  async function drawInnerFunction9() {
    scope.h = scope.b;
    scope.s = scope.a;
    await drawSpiral1();
  }
  async function drawInnerFunction10() {
    p5.translate(
      me(p.transSpirX),
      me(p.transSpirY),
    );
    await drawInnerFunction8();
  }
  /**
   * Hue goes from 360 to 0
   * Saturation goes from 100 to 0 relative to 0..57 range
   * Luminance is featureLuminance
   */
  async function drawInnerFunction11() {
    scope.h = math.abs(360 - math.floor(scope.b * (360 / me(p.maxSpir))));
    scope.s = math.abs(100 - math.floor(scope.af * (100 / fxhashTrunc.length)));
    await drawSpiral1();
  }
  /**
   * Hue goes from 0 to 360
   * Saturation goes from 100 to 0 relative to 0..57 range
   * Luminance is featureLuminance
   * Uses alternative ratio function
   */
  async function drawInnerFunction12() {
    scope.h = math.floor(scope.b * (360 / me(p.maxSpir)));
    scope.s = math.floor(scope.af * (100 / fxhashTrunc.length));
    await drawSpiral2();
  }
  async function drawSpiral1() {
    p5.strokeWeight(me(p.weight));
    p5.stroke(me(p.hue), me(p.sat), me(p.lum));
    p5.arc(me(p.x), me(p.y), me(p.w), me(p.h), me(p.start), me(p.stop));
    if (me(p.anim)) {
      await sleep(me(p.delay));
    }
  }
  async function drawSpiral2() {
    p5.strokeWeight(me(p.weight));
    p5.stroke(me(p.hue), me(p.sat), me(p.lum));
    p5.arc(
      me(p.x) * dM,
      me(p.y) * dM,
      me(p.w) * dM,
      me(p.h) * dM,
      me(p.start) * dM,
      me(p.stop) * dM,
    );
    if (me(p.anim)) {
      await sleep(me(p.delay));
    }
  }
}

let myp5 = new p5(sketch, window.document.body);

function me(expression) {
  return math.evaluate(expression, scope);
}

function getRandFxHash() {
  return math.max(
    3,
    math.floor(
      math.abs(
        (
          properAlphabet.length - properAlphabet.indexOf(
            fxhashTrunc[
              math.floor(
                ($fx.rand() * fxhashTrunc.length)
              )
            ]
          )
        ) * (100 / properAlphabet.length)
      )
    )
  );
}

/**
 * @param {int} n: nth fibonacci number in the fibonacci sequence
 * @returns {float} a very good approximation of the nth fibonacci 
 *  number
*/
function getFibonacci(n = 0) {
  try {
    return fibonacci_index[n];
  }
  catch {
    fibonacci_index[n] = math.pow(math.phi, n) / sqrt5;
    return fibonacci_index[n];
  }
}

/**
 * @param {String} hash: unique fxhash string (or xtz transaction hash)
 * @returns {float} decimal representation of the number in base58 
 */
function base58toDecimal(hash = fxhashTrunc) {
  let decimal = 0;
  let iterArray = Array.from(hash).reverse();
  while (iterArray.length > 0) {
    decimal += properAlphabet.indexOf(iterArray.slice(-1)) * (math.pow(58,
      iterArray.length - 1));
    iterArray = iterArray.slice(0, -1);
  }
  return decimal;
}

/**
 * @param {float} decimalHash: output from base58toDecimal(fxhash)
 * @param {int} maxVariations: the inclusive n from the desired range 
 *      of (0, n) for the return value
 * @param {int} step: Adds this number to the result
 * @param {boolean} inverse: transforms range into (n, 0)
 * @returns {int} one random integer defined by fxhash and a threshold
 *      defined by maxVariations * variationFactor
 */
function fxHashToVariation(
  decimalHash,
  maxVariations,
  step = 0,
  inverse = false,
) {
  let variation = math.round(decimalHash * maxVariations * variationFactor);
  if (inverse) {
    return math.abs(maxVariations - variation);
  }
  return variation + step;
}
