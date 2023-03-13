/**!
 * @file Fibonacci Rainbow Spirals v3
 * @version 3.0.0  
 * @copyright Iuri Guilherme 2023  
 * @license GNU AGPLv3  
 * @author Iuri Guilherme <https://iuri.neocities.org/>  
 * @description This is Fibonacci Rainbow Spirals made with p5js for 
 *      fxhash.xyz genarative tokens. Source code available at Github: 
 *      https://github.com/iuriguilherme/fxhash1  
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

const seed = fxrand() * 1e8;

import p5 from "p5";
import { create, all } from "mathjs";
const math = create(all, {"randomSeed": seed})

const version = "3.0.0";
const sleep = ms => new Promise(r => setTimeout(r, ms));
// https://github.com/fxhash/fxhash-webpack-boilerplate/issues/20
const properAlphabet = 
    "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
const variantFactor = 3.904e-87; // This number is magic
const pi = math.pi;
const half_pi = math.pi / 2;
const phi = math.phi;
const sqrt5 = math.sqrt(5);
const fxhashDecimal = base58toDecimal(fxhashTrunc);
const lastVariant = 18;
//~ const featureVariant = fxHashToVariant(fxhashDecimal, lastVariant);
//~ const featureVariant = math.max(2, fxHashToVariant(fxhashDecimal, limit));
//~ const featureVariant = -1;
const featureVariant = 9;
const BUFF_SIZE = 1080;
const BUFF_WID_MOD = 1;
const BUFF_HEI_MOD = 1;
const BUFF_WID = BUFF_SIZE * BUFF_WID_MOD;
const BUFF_HEI = BUFF_SIZE * BUFF_HEI_MOD;
const CANVAS_PIXEL_DENSITY = 1;
const BUFF_PIXEL_DENSITY = 4;
const delayLimit = 6000;
let p = {
    "x": "0",
    "y": "0",
    "w": "c",
    "h": "c",
    "start": "0",
    "stop": "e",
    "rotate": "e",
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
    "size": "z"
};
let scope = {
    "a": 0,
    "b": 0,
    "c": 0,
    "d": 0,
    "e": half_pi,
    "f": phi,
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
let variant = featureVariant;
let width = window.innerWidth;
let height = window.innerHeight;
let x, y, size, scale, ratio, reWidth, reHeight, reRatio, canvas, xWeigths,
  yWeigths, buffer, scaleFactor, sizeX, sizeY, reSize, reScale, 
  reReWidth, reReHeight, featureHue, featureLuminance, featureSaturation,
  drawInnerFunction, drawFunction, ratioFunction, resizeFunction, setupFunction;

let sketch = function(p5) {
  drawInnerFunction = drawInnerFunction1;
  drawFunction = drawFunction1;
  ratioFunction = checkRatio1;
  resizeFunction = windowResize1;
  setupFunction = setupFunction1;
  reWidth = window.innerWidth;
  reHeight = window.innerHeight;
  featureHue = fxHashToVariant(fxhashDecimal, me(p.maxHue) - me(p.minHue)) + 
    me(p.minHue);
  scope.h = featureHue;
  featureSaturation = fxHashToVariant(fxhashDecimal, me(p.maxSat) - 
    me(p.minSat)) + me(p.minSat);
  scope.s = featureSaturation;
  featureLuminance = fxHashToVariant(fxhashDecimal, me(p.maxLum) - 
    me(p.minLum)) + me(p.minLum);
  scope.l = featureLuminance;
  
  p5.setup = function() {
    p5.randomSeed(seed);
    p5.noiseSeed(seed);
    p5.colorMode(p5.HSL);
    
    configureVariant(variant);
    featureHue = fxHashToVariant(fxhashDecimal, me(p.maxHue) - me(p.minHue)) + 
      me(p.minHue);
    scope.h = featureHue;
    featureSaturation = fxHashToVariant(fxhashDecimal, me(p.maxSat) - 
      me(p.minSat)) + me(p.minSat);
    scope.s = featureSaturation;
    featureLuminance = fxHashToVariant(fxhashDecimal, me(p.maxLum) - 
      me(p.minLum)) + me(p.minLum);
    scope.l = featureLuminance;
    
    setupFunction();
    
    p5.frameRate(60);
    p5.noLoop();
  }
  p5.draw = async function() {
    console.log(`
fx(hash): ${fxhashTrunc}
fx(hash) base 10: ${fxhashDecimal}
Feature: ${featureVariant}
Current variant: ${variant}
Hue: ${featureHue}
Saturation: ${featureSaturation}
Luminance: ${featureLuminance}
drawInnerFunction: ${drawInnerFunction.name}
ratioFunction: ${ratioFunction.name}
resizeFunction: ${resizeFunction.name}
`)
    for (let k in p) {
      console.log("params[" + k + "]: " + p[k]);
    }
    for (let k in scope) {
      console.log("scope[" + k + "]: " + scope[k]);
    }
    await drawFunction();
    fxpreview();
  }
  p5.windowResized = function() {
    resizeFunction();
  }
  p5.keyTyped = function() {
    switch (p5.key) {
      case 'r':
        console.log("redrawing canvas...");
        p5.redraw();
        break;
      case 'f':
        console.log("resizing window...");
        resizeFunction();
        break;
      case 's':
        let file = 
          `fibonacci_rainbow_spirals_v${version}_${featureVariant}.png`;
        console.log(`saving canvas to ${file}...`);
        p5.saveCanvas(canvas, file);
        break;
      case 'a':
        variant = math.max(0, variant - 1);
        configureVariant(variant);
        featureHue = fxHashToVariant(fxhashDecimal,
          me(p.maxHue) - me(p.minHue)) + me(p.minHue);
        scope.h = featureHue;
        featureSaturation = fxHashToVariant(fxhashDecimal,
          me(p.maxSat) - me(p.minSat)) + me(p.minSat);
        scope.s = featureSaturation;
        featureLuminance = fxHashToVariant(fxhashDecimal,
          me(p.maxLum) - me(p.minLum)) + me(p.minLum);
        scope.l = featureLuminance;
        console.log(`variant changed to ${variant}`);
        p5.redraw();
        break;
      case 'd':
        variant = math.min(lastVariant, variant + 1);
        configureVariant(variant);
        featureHue = fxHashToVariant(fxhashDecimal,
          me(p.maxHue) - me(p.minHue)) + me(p.minHue);
        scope.h = featureHue;
        featureSaturation = fxHashToVariant(fxhashDecimal,
          me(p.maxSat) - me(p.minSat)) + me(p.minSat);
        scope.s = featureSaturation;
        featureLuminance = fxHashToVariant(fxhashDecimal,
          me(p.maxLum) - me(p.minLum)) + me(p.minLum);
        scope.l = featureLuminance;
        console.log(`variant changed to ${variant}`);
        p5.redraw();
        break;
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
        console.log(`key ${p5.key} was pressed, which doesn't do anything`);
    }
  }
  function setupFunction1() {
    reRatio = reWidth / reHeight;
    ratioFunction();
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
    reScale = p5.width / reWidth;
    p5.scale(reScale);
    p5.pixelDensity(CANVAS_PIXEL_DENSITY);
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
    reRatio = p5.windowWidth / p5.windowHeight;
    if (reRatio > ratio) {
      scale = p5.windowHeight / p5.height;
      reWidth = (p5.windowHeight / p5.height) * p5.width;
      reHeight = p5.windowHeight;
    } else {
      scale = p5.windowWidth / p5.width;
      reWidth = p5.windowWidth;
      reHeight = (p5.windowWidth / p5.width) * p5.height;
    }
  }
  function windowResize1() {
    ratioFunction();
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
  async function drawFunction1() {
    p5.noFill();
    p5.scale(reScale);
    reSize = p5.min(reReWidth, reReHeight);
    scope.z = reSize;
    p5.translate(me(p.transOffsetX), me(p.transOffsetY));
    p5.background(me(p.bgHue), me(p.bgSat),
      me(p.bgLum));
    for (let i = 0; i < me(p.maxIter); i++) {
      p5.translate(me(p.transIterX), me(p.transIterY));
      let iFib = getFibonacci(i);
      for (let j = 0; j <= me(p.maxSpir); j++) {
        let jFib = getFibonacci(j);
        scope.a = i;
        scope.b = j;
        scope.c = iFib;
        scope.d = jFib;
        await drawInnerFunction();
      }
      p5.rotate(me(p.rotate));
    }
  }
  async function drawInnerFunction1() {
    scope.h = scope.b;
    scope.s = math.abs(100 - scope.a * (100 / me(p.maxIter)));
    await drawCanvas();
  }
  async function drawInnerFunction2() {
    scope.h = scope.b;
    scope.s = scope.a;
    await drawCanvas();
  }
  async function drawInnerFunction3() {
    scope.h = math.abs(360 - scope.b * (360 / me(p.maxSpir)));
    scope.s = math.abs(100 - scope.a * (100 / me(p.maxIter)));
    await drawCanvas();
  }
  async function drawInnerFunction4() {
    p5.translate(
      me(p.transSpirX),
      me(p.transSpirY),
    );
    await drawInnerFunction1();
  }
  async function drawInnerFunction5() {
    scope.h = scope.b;
    scope.s = math.abs(100 - scope.a);
    await drawCanvas();
  }
  async function drawCanvas() {
    p5.strokeWeight(me(p.weight));
    p5.stroke(me(p.hue), me(p.sat), me(p.lum));
    p5.arc(me(p.x), me(p.y), me(p.w), me(p.h), me(p.start), me(p.stop));
    if (me(p.anim)) {
      await sleep(me(p.delay));
    }
  }
  /**
   * @param {int} variant: output from 
   *      fxHashToVariant(base58toDecimal(fxhashTrunc))
   */
  function configureVariant(variant = featureVariant) {
    let params = {};
    switch (variant) {
      case -1:
        drawFunction = drawFunction1;
        drawInnerFunction = drawInnerFunction2;
        ratioFunction = checkRatio1;
        resizeFunction = windowResize1;
        setupFunction = setupFunction1;
        params = {
          "x": "b",
          "y": "b",
          "w": "pow(c, b)",
          "h": "pow(c, b)",
          "start": "a",
          "stop": "b * f",
          "rotate": "f",
          //~ "maxIter": "300",
          //~ "maxSpir": "720",
          //~ "maxHue": "210",
          //~ "minHue": "90",
          //~ "maxSat": "75",
          //~ "minSat": "60",
          //~ "maxLum": "60",
          //~ "minLum": "45",
          //~ "anim": "0",
        };
        break;
      case 0:
        // https://www.fxhash.xyz/generative/24631
        drawFunction = drawFunction1;
        drawInnerFunction = drawInnerFunction1;
        ratioFunction = checkRatio1;
        resizeFunction = windowResize1;
        setupFunction = setupFunction1;
        params = {
          "x": "b",
          "y": "a * b",
          "w": "a * c",
          "h": "b * c",
          "start": "c"
        };
        break;
      case 1:
        // https://www.fxhash.xyz/generative/24810
        drawFunction = drawFunction1;
        drawInnerFunction = drawInnerFunction1;
        ratioFunction = checkRatio1;
        resizeFunction = windowResize1;
        setupFunction = setupFunction1;
        params = {
          "x": "b",
          "y": "a * b",
          "w": "a * c",
          "h": "b * c",
          "start": "b"
        };
        break;
      case 2:
        // https://www.fxhash.xyz/generative/24849
        drawFunction = drawFunction1;
        drawInnerFunction = drawInnerFunction1;
        ratioFunction = checkRatio1;
        resizeFunction = windowResize1;
        setupFunction = setupFunction1;
        params = {
          "x": "b",
          "y": "pow(c, a)",
          "w": "b",
          "h": "b * c",
          "start": "b"
        };
        break;
      case 3:
        // https://www.fxhash.xyz/generative/24912
        drawFunction = drawFunction1;
        drawInnerFunction = drawInnerFunction1;
        ratioFunction = checkRatio1;
        resizeFunction = windowResize1;
        setupFunction = setupFunction1;
        params = {
          "x": "a + c",
          "y": "a * c",
          "w": "b + c",
          "h": "b * c",
          "start": "c"
        };
        break;
      case 4:
        // https://www.fxhash.xyz/generative/24979
        drawFunction = drawFunction1;
        drawInnerFunction = drawInnerFunction1;
        ratioFunction = checkRatio1;
        resizeFunction = windowResize1;
        setupFunction = setupFunction1;
        params = {
          "x": "c + (a * b)",
          "y": "c + pow(a, b)",
          "w": "a * c",
          "h": "b * c",
          "start": "b"
        };
        break;
      case 5:
        // https://www.fxhash.xyz/generative/25018
        drawFunction = drawFunction1;
        drawInnerFunction = drawInnerFunction2;
        ratioFunction = checkRatio1;
        resizeFunction = windowResize1;
        setupFunction = setupFunction1;
        params = {
          "x": "b",
          "y": "c * a",
          "w": "a",
          "h": "b * c",
          "start": "b",
          "minLum": "30",
          "maxLum": "45",
          "weight": "a / 100"
        };
        break;
      case 6:
        // https://www.fxhash.xyz/generative/25309
        drawFunction = drawFunction1;
        drawInnerFunction = drawInnerFunction1;
        ratioFunction = checkRatio1;
        resizeFunction = windowResize1;
        setupFunction = setupFunction1;
        params = {
          "x": "a * b",
          "y": "b * c",
          "w": "pow(b, a)",
          "h": "pow(c, b)",
          "start": "b * c"
        };
        break;
      case 7:
        // https://www.fxhash.xyz/generative/25381
        drawFunction = drawFunction1;
        drawInnerFunction = drawInnerFunction4;
        ratioFunction = checkRatio1;
        resizeFunction = windowResize1;
        setupFunction = setupFunction1;
        params = {
          "x": "b",
          "y": "a * b",
          "w": "a * c",
          "h": "b * c",
          "start": "b"
        };
        break;
      case 8:
        // https://www.fxhash.xyz/generative/25561
        drawFunction = drawFunction1;
        drawInnerFunction = drawInnerFunction3;
        ratioFunction = checkRatio1;
        resizeFunction = windowResize1;
        setupFunction = setupFunction1;
        params = {
          "x": "a + b",
          "y": "b + c",
          "w": "a * b",
          "h": "b * c",
          "start": "c",
          "rotate": "f"
        };
        break;
      case 9:
        drawFunction = drawFunction1;
        drawInnerFunction = drawInnerFunction1;
        ratioFunction = checkRatio1;
        resizeFunction = windowResize1;
        setupFunction = setupFunction1;
        params = {
          "x": "b",
          "y": "a * b",
          "w": "d",
          "h": "d",
          "start": "c",
          "stop": "b * f",
          //~ "maxHue": "180",
          //~ "minHue": "90",
          //~ "maxSat": "75",
          //~ "minSat": "60",
          //~ "maxLum": "51",
          //~ "minLum": "36"
        };
        break;
      case 10:
        drawFunction = drawFunction1;
        drawInnerFunction = drawInnerFunction2;
        ratioFunction = checkRatio1;
        resizeFunction = windowResize1;
        setupFunction = setupFunction1;
        params = {
          "x": "a",
          "y": "b",
          "w": "a",
          "h": "a",
          "start": "c",
          "stop": "g / a"
        };
        break;
      case 11:
        drawFunction = drawFunction1;
        drawInnerFunction = drawInnerFunction1;
        ratioFunction = checkRatio1;
        resizeFunction = windowResize1;
        setupFunction = setupFunction1;
        params = {
          "x": "a",
          "y": "b",
          "w": "c",
          "h": "c",
          "start": "b",
          "stop": "g / b"
        };
        break;
      case 12:
        drawFunction = drawFunction1;
        drawInnerFunction = drawInnerFunction2;
        ratioFunction = checkRatio1;
        resizeFunction = windowResize1;
        setupFunction = setupFunction1;
        params = {
          "x": "a * 2",
          "y": "a * 3",
          "w": "a * 3",
          "h": "b",
          "start": "c",
          "stop": "b * f"
        };
        break;
      case 13:
        // This one is my personal favorite
        drawFunction = drawFunction1;
        drawInnerFunction = drawInnerFunction2;
        ratioFunction = checkRatio1;
        resizeFunction = windowResize1;
        setupFunction = setupFunction1;
        params = {
          "x": "a",
          "y": "a",
          "w": "b",
          "h": "c",
          "start": "c",
          "stop": "b * f"
        };
        break;
      case 14:
        drawFunction = drawFunction1;
        drawInnerFunction = drawInnerFunction2;
        ratioFunction = checkRatio1;
        resizeFunction = windowResize1;
        setupFunction = setupFunction1;
        params = {
          "x": "b",
          "y": "a * b",
          "w": "b",
          "h": "d",
          "start": "b",
          "stop": "b * f"
        };
        break;
      case 15:
        drawFunction = drawFunction1;
        drawInnerFunction = drawInnerFunction1;
        ratioFunction = checkRatio1;
        resizeFunction = windowResize1;
        setupFunction = setupFunction1;
        params = {
          "x": "b",
          "y": "a * c",
          "w": "c",
          "h": "b * c",
          "start": "b",
          "stop": "f",
          "rotate": "f"
        };
        break;
      case 16:
        drawFunction = drawFunction1;
        drawInnerFunction = drawInnerFunction5;
        ratioFunction = checkRatio1;
        resizeFunction = windowResize1;
        setupFunction = setupFunction1;
        params = {
          "x": "b",
          "y": "b",
          "w": "d",
          "h": "b * c",
          "start": "c",
          "stop": "f",
          "rotate": "f",
          "maxIter": "12",
          "maxHue": "180",
          "minHue": "90",
          "maxSat": "75",
          "minSat": "60",
          "maxLum": "51",
          "minLum": "36"
        };
        break;
      case 17:
        drawFunction = drawFunction1;
        drawInnerFunction = drawInnerFunction3;
        ratioFunction = checkRatio1;
        resizeFunction = windowResize1;
        setupFunction = setupFunction1;
        params = {
          "x": "b",
          "y": "b",
          "w": "pow(d, a)",
          "h": "pow(d, a)",
          "start": "a",
          "stop": "f",
          "rotate": "d",
          "maxHue": "210",
          "maxSat": "75",
          "minSat": "60",
          "maxLum": "60",
          "minLum": "45"
        };
        break;
      case 18:
        drawFunction = drawFunction1;
        drawInnerFunction = drawInnerFunction2;
        ratioFunction = checkRatio1;
        resizeFunction = windowResize1;
        setupFunction = setupFunction1;
        params = {
          "x": "b",
          "y": "b",
          "w": "b",
          "h": "c",
          "start": "c",
          "stop": "b * f",
          "rotate": "b",
          "maxSat": "75",
          "minSat": "60"
        };
        break;
      default:
        console.log("Variant " + variant + " out of bonds");
    }
    for (let k in params) {
      p[k] = params[k];
    }
  }
}

let myp5 = new p5(sketch, window.document.body);

function me(expression) {
  return math.evaluate(expression, scope);
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
 * @param {int} maxVariants: the inclusive n from the desired range 
 *      of (0, n) for the return value
 * @param {boolean} inverse: transforms range into (n, 0)
 * @returns {int} one random integer defined by fxhash and a threshold
 *      defined by maxVariants * variantFactor
 */
function fxHashToVariant(decimalHash, maxVariants, inverse = false) {
  let variant = math.round(decimalHash * maxVariants * variantFactor);
  if (inverse) {
    return math.abs(maxVariants - variant);
  }
  return variant;
}

window.$fxhashFeatures = {
  //~ "fx(variant)": featureVariant,
  "fx(hue)": featureHue,
  "fx(saturation)": featureSaturation,
  "fx(luminance)": featureLuminance
}
