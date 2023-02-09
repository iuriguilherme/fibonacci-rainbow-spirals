/**!
 * @file Fibonacci Rainbow Spirals v2
 * @version 2.1.1  
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

// https://github.com/fxhash/fxhash-webpack-boilerplate/issues/20
const properAlphabet = 
    "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
const variantFactor = 3.904e-87; // This number is magic
const pi = math.pi;
const half_pi = math.pi / 2;
const phi = math.phi;
const sqrt5 = math.sqrt(5);
const maxIterations = 100;
const maxSpirals = 360;
const delay = 1;
const animate = true;
//~ const animate = false;
const sleep = ms => new Promise(r => setTimeout(r, ms));
const fxhashDecimal = base58toDecimal(fxhashTrunc);
const featureVariant = fxHashToVariant(fxhashDecimal, 14);
//~ const featureVariant = -1;
const featureHue = fxHashToVariant(fxhashDecimal, 240) + 60;
const featureSaturation = fxHashToVariant(fxhashDecimal, 25) + 75;
const featureLuminance = fxHashToVariant(fxhashDecimal, 30) + 30;
//~ const lastIterationFibonacci = getFibonacci(maxIterations);
const lastIterationFibonacci = fibonacci_index[maxIterations];
//~ const lastSpiralFibonacci = getFibonacci(maxSpirals);
const lastSpiralFibonacci = fibonacci_index[maxSpirals];
let drawFunction = drawFunction1;
let drawParams = {
    "x": "0",
    "y": "0",
    "w": "c",
    "h": "c",
    "start": "0",
    "stop": "e",
    "rotate": "e",
    "weight": "w",
    "tsx": "z / 2",
    "tsy": "z / 2",
    "tix": "a",
    "tiy": "a",
    "bh": "h",
    "bs": "s",
    "bl": "l"
};
let scope = {
    "a": 0,
    "b": 0,
    "c": 0,
    "d": 0,
    "e": half_pi,
    "f": phi,
    "g": pi,
    "h": featureHue,
    "s": featureSaturation,
    "l": featureLuminance,
    "w": 1,
    "x": window.innerWidth,
    "y": window.innerHeight,
    "z": math.min(window.innerWidth, window.innerHeight)
};

setup = function() {
    randomSeed(fxrand() * 1e8);
    colorMode(HSL);
    let size = min(window.innerWidth, window.innerHeight);
    createCanvas(size, size);
    configureVariant(featureVariant);
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
        'drawParams': drawParams
    });
    noFill();
    scope.z = min(window.innerWidth, window.innerHeight);
    translate(
        math.evaluate(drawParams.tsx, scope),
        math.evaluate(drawParams.tsy, scope)
    );
    background(
        math.evaluate(drawParams.bh, scope),
        math.evaluate(drawParams.bs, scope),
        math.evaluate(drawParams.bl, scope)
    );
    for (var i = 0; i < maxIterations; i++) {
        translate(
            math.evaluate(drawParams.tix, scope),
            math.evaluate(drawParams.tiy, scope)
        );
        var iFib = fibonacci_index[i.toString()];
        for (var j = 0; j <= maxSpirals; j++) {
            var jFib = fibonacci_index[j.toString()];
            scope.a = i;
            scope.b = j;
            scope.c = iFib;
            scope.d = jFib;
            await drawFunction(scope.h, scope.s, scope.l);
        }
        rotate(math.evaluate(drawParams.rotate, scope));
    }
    fxpreview();
}

windowResized = function() {
    let size = min(window.innerWidth, window.innerHeight);
    resizeCanvas(size, size);
}

async function drawFunction1() {
    scope.h = scope.b;
    scope.s = math.abs(100 - scope.a);
    await drawCanvas();
}

async function drawFunction2() {
    scope.h = scope.b;
    scope.s = scope.a;
    await drawCanvas();
}

async function drawFunction3() {
    translate(scope.b, scope.b);
    await drawFunction1();
}

async function drawFunction4() {
    scope.h = math.abs(360 - scope.b);
    scope.s = math.abs(100 - scope.a);
    await drawCanvas();
}

async function drawCanvas() {
    strokeWeight(scope.w);
    stroke(scope.h, scope.s, scope.l);
    let p = {};
    for (var k in drawParams) {
        p[k] = math.evaluate(drawParams[k], scope);
    }
    arc(p.x, p.y, p.w, p.h, p.start, p.stop);
    if (animate) {
        await sleep(delay);
    }
}

/**
 * @param {int} n: nth fibonacci number in the fibonacci sequence
 * @returns {float} a very good approximation of the nth fibonacci 
 *  number
*/
function getFibonacci(n = 0) {
    return math.pow(math.phi, n) / sqrt5;
}

/**
 * @param {String} hash: unique fxhash string (or xtz transaction hash)
 * @returns {float} decimal representation of the number in base58 
 */
function base58toDecimal(hash = fxhashTrunc) {
    var decimal = 0;
    var iterArray = Array.from(hash).reverse();
    while (iterArray.length > 0) {
        decimal += properAlphabet.indexOf(iterArray.slice(-1)) * 
            (math.pow(58, iterArray.length - 1));
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
                "y": "a * b",
                "w": "b",
                "h": "d",
                "start": "b",
                "stop": "b * f"
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
                "start": "b"
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
            drawFunction = drawFunction3;
            params = {
                "x": "b",
                "y": "a * b",
                "w": "a * c",
                "h": "b * c",
                "start": "b"
            };
            break;
        case 8:
            drawFunction = drawFunction4;
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
        default:
            console.log("Variant " + variant + " out of bonds");
    }
    for (let k in params) {
        drawParams[k] = params[k];
    }
}

window.$fxhashFeatures = {
    //~ "Variant": featureVariant,
    "fx(hue)": featureHue,
    "fx(saturation)": featureSaturation,
    "fx(luminance)": featureLuminance
}
