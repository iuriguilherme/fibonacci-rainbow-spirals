/**!
 * @file Fibonacci Rainbow Spirals v2
 * @version 2.2.0  
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
//~ const featureVariant = fxHashToVariant(fxhashDecimal, 18);
const featureVariant = 5;
//~ const featureVariant = -1;
let drawFunction = drawFunction1;
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
let reSize, reScale, reRatio, reReWidth, reReHeight, featureHue, 
    featureSaturation, featureLuminance, lastIterationFibonacci,
    lastIterationSpiral;
let reWidth = window.innerWidth;
let reHeight = window.innerHeight;

setup = function() {
    randomSeed(fxrand() * 1e8);
    colorMode(HSL);
    reRatio = reWidth / reHeight;
    checkRatio();
    reSize = min(reReWidth, reReHeight);
    scope.z = reSize;
    createCanvas(math.evaluate(p.size, scope), math.evaluate(p.size, scope));
    reScale = width / reWidth;
    scale(reScale);
    configureVariant(featureVariant);
    featureHue = fxHashToVariant(fxhashDecimal, 
        math.evaluate(p.maxHue, scope) - math.evaluate(p.minHue, scope)) + 
        math.evaluate(p.minHue, scope);
    scope.h = featureHue;
    featureSaturation = fxHashToVariant(fxhashDecimal,
        math.evaluate(p.maxSat, scope) - math.evaluate(p.minSat, scope)) + 
        math.evaluate(p.minSat, scope);
    scope.s = featureSaturation;
    featureLuminance = fxHashToVariant(fxhashDecimal,
        math.evaluate(p.maxLum, scope) - math.evaluate(p.minLum, scope)) + 
        math.evaluate(p.minLum, scope);
    scope.l = featureLuminance;
    lastIterationFibonacci = getFibonacci(math.evaluate(p.maxIter, scope));
    lastSpiralFibonacci = getFibonacci(math.evaluate(p.maxSpir, scope));
    frameRate(60);
    noLoop();
}

draw = async function() {
    console.log({
        'variant': featureVariant,
        'hue': featureHue,
        'saturation': featureSaturation,
        'luminance': featureLuminance,
        'drawFunction': drawFunction.name,
        'p': p
    });
    noFill();
    scale(reScale);
    reSize = min(reReWidth, reReHeight);
    scope.z = reSize;
    translate(
        math.evaluate(p.transOffsetX, scope),
        math.evaluate(p.transOffsetY, scope)
    );
    background(math.evaluate(p.bgHue, scope), math.evaluate(p.bgSat, scope),
        math.evaluate(p.bgLum, scope));
    for (let i = 0; i < math.evaluate(p.maxIter, scope); i++) {
        translate(
            math.evaluate(p.transIterX, scope),
            math.evaluate(p.transIterY, scope)
        );
        let iFib = getFibonacci(i);
        for (let j = 0; j <= math.evaluate(p.maxSpir, scope); j++) {
            let jFib = getFibonacci(j);
            scope.a = i;
            scope.b = j;
            scope.c = iFib;
            scope.d = jFib;
            await drawFunction();
        }
        rotate(math.evaluate(p.rotate, scope));
    }
    fxpreview();
}

windowResized = function() {
    checkRatio();
    reSize = min(reReWidth, reReHeight);
    resizeCanvas(reSize, reSize);
}

function checkRatio(){
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

async function drawFunction1() {
    scope.h = scope.b;
    scope.s = math.abs(100 - scope.a * (100 / math.evaluate(p.maxIter, scope)));
    await drawCanvas();
}

async function drawFunction2() {
    scope.h = scope.b;
    scope.s = scope.a;
    await drawCanvas();
}

async function drawFunction3() {
    scope.h = math.abs(360 - scope.b * (360 / math.evaluate(p.maxSpir, scope)));
    scope.s = math.abs(100 - scope.a * (100 / math.evaluate(p.maxIter, scope)));
    await drawCanvas();
}

async function drawFunction4() {
    translate(
        math.evaluate(p.transSpirX, scope),
        math.evaluate(p.transSpirY, scope),
    );
    await drawFunction1();
}

async function drawFunction5() {
    scope.h = scope.b;
    scope.s = math.abs(100 - scope.a);
    await drawCanvas();
}

async function drawCanvas() {
    strokeWeight(math.evaluate(p.weight, scope));
    stroke(math.evaluate(p.hue, scope), math.evaluate(p.sat, scope),
        math.evaluate(p.lum, scope));
    arc(math.evaluate(p.x, scope), math.evaluate(p.y, scope),
        math.evaluate(p.w, scope), math.evaluate(p.h, scope),
        math.evaluate(p.start, scope), math.evaluate(p.stop, scope));
    if (math.evaluate(p.anim, scope)) {
        await sleep(math.evaluate(p.delay, scope));
    }
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

/**
 * @param {int} variant: output from 
 *      fxHashToVariant(base58toDecimal(fxhashTrunc))
 */
function configureVariant(variant = featureVariant) {
    let params = {};
    switch (variant) {
        case -1:
            drawFunction = drawFunction2;
            params = {
                "x": "b",
                "y": "b",
                "w": "b",
                "h": "c",
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
            params = {
                "x": "c + (a * b)",
                "y": "c + pow(a, b)",
                "w": "a * c",
                "h": "b * c",
                "start": "b"
            };
            break;
        case 5:
            drawFunction = drawFunction2;
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
            drawFunction = drawFunction1;
            params = {
                "x": "a * b",
                "y": "b * c",
                "w": "pow(b, a)",
                "h": "pow(c, b)",
                "start": "b * c"
            };
            break;
        case 7:
            drawFunction = drawFunction4;
            params = {
                "x": "b",
                "y": "a * b",
                "w": "a * c",
                "h": "b * c",
                "start": "b"
            };
            break;
        case 8:
            drawFunction = drawFunction3;
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
            params = {
                "x": "b",
                "y": "a * b",
                "w": "d",
                "h": "d",
                "start": "c",
                "stop": "b * f"
            };
            break;
        case 10:
            drawFunction = drawFunction2;
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
            drawFunction = drawFunction2;
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
            drawFunction = drawFunction2;
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
            drawFunction = drawFunction2;
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
            drawFunction = drawFunction5;
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
            drawFunction = drawFunction3;
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
            drawFunction = drawFunction2;
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

window.$fxhashFeatures = {
    //~ "fx(variant)": featureVariant,
    "fx(hue)": featureHue,
    "fx(saturation)": featureSaturation,
    "fx(luminance)": featureLuminance
}
