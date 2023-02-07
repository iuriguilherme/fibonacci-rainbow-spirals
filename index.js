/**!
 * @file Fibonacci Rainbow Spirals v2
 * @version 2.0.0  
 * @copyright Iuri Guilherme 2023  
 * @license GNU AGPLv3  
 * @author Iuri Guilherme <https://iuri.neocities.org/>  
 * @description This is Fibonacci Rainbow Spirals made with p5js for 
 *      fxhash.xyz GT. Source code available at Github: 
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
const variants = {
    0: 1e-87,
    1: 2e-87,
    2: 6e-87,
    3: 1e-86,
    4: 1.5e-86,
    5: 2e-86,
    6: 2.2e-86,
    7: 2.6e-86,
    8: 3e-86,
    25: 9.6e-86,
    30: 1.16e-85,
    60: 2.33e-85,
    100: 3.9e-85,
    255: 9.95e-85,
    360: 1.406e-84
}
const fxhashDecimal = base58toDecimal(fxhashTrunc);
const featureVariant = fxHashToVariant(fxhashDecimal, 8);
//~ const featureVariant = 0;
const featureHue = fxHashToVariant(fxhashDecimal, 360);
const featureSaturation = fxHashToVariant(fxhashDecimal, 25) + 75;
const featureLuminance = fxHashToVariant(fxhashDecimal, 30) + 30;
const sqrt5 = math.sqrt(5);
const spin = math.pi / 2;
const maxIterations = 100;
const maxSpirals = 360;
const lastFibonacci = getFibonacci(maxIterations);
let size;

setup = function() {
    randomSeed(fxrand() * 1e8);
    size = min(window.innerWidth, window.innerHeight);
    createCanvas(size, size);
    colorMode(HSL);
    frameRate(60);
    noLoop();
}

draw = async function() {
    console.log({
        'variant': featureVariant,
        'hue': featureHue,
        'saturation': featureSaturation,
        'luminance': featureLuminance
    });
    background(featureHue, featureSaturation, featureLuminance);
    noFill();
    strokeWeight(1);
    size = min(window.innerWidth, window.innerHeight);
    translate(size / 2, size / 2);
    for (var iteration = 0; iteration < maxIterations; iteration++) {
        translate(iteration, iteration);
        var fibonacci = getFibonacci(iteration);
        for (var spiral = 0; spiral <= maxSpirals; spiral++) {
            await drawFeature(
                iteration,
                spiral,
                fibonacci,
                featureLuminance,
                spin,
                featureVariant,
                true
            );
        }
        rotate(spin);
    }
    fxpreview();
}

windowResized = function() {
    size = min(window.innerWidth, window.innerHeight);
    resizeCanvas(size, size);
}

async function drawFeature(
    iteration = 0,
    spiral = 0,
    fibonacci = 0,
    luminance = 100,
    spin = 1,
    variant = 0,
    animation = true
) {
    var hue = spiral * (360 / maxSpirals);
    var saturation = math.abs(100 - iteration * (100 / maxIterations));
    stroke(hue, saturation, luminance);
    //~ animation = false;
    //~ variant = 0;
    switch (variant) {
        case 0:
            // https://www.fxhash.xyz/generative/24631
            arc(
                spiral,
                iteration * spiral,
                fibonacci * iteration,
                fibonacci * spiral,
                fibonacci,
                spin
            );
            break;
        case 1:
            arc(
                spiral,
                iteration * spiral,
                fibonacci * iteration,
                fibonacci * spiral,
                spiral,
                spin
            );
            break;
        case 2:
            arc(
                fibonacci + iteration,
                fibonacci * iteration,
                fibonacci + spiral,
                fibonacci * spiral,
                fibonacci,
                spin
            );
            break;
        case 3:
            arc(
                spiral,
                fibonacci ** iteration,
                spiral,
                fibonacci * spiral,
                spiral,
                spin
            );
            break;
        case 4:
            arc(
                fibonacci + (iteration * spiral),
                fibonacci + (iteration ** spiral),
                fibonacci * iteration,
                fibonacci * spiral,
                spiral,
                spin
            );
            break;
        case 5:
            arc(
                spiral,
                fibonacci * iteration,
                iteration,
                fibonacci * spiral,
                spiral,
                spin
            );
            break;
        case 6:
            arc(
                spiral * iteration,
                fibonacci * spiral,
                spiral ** iteration,
                fibonacci ** spiral,
                fibonacci * spiral,
                spin
            );
            break;
        case 7:
            translate(spiral, spiral);
            arc(
                spiral,
                iteration * spiral,
                fibonacci * iteration,
                fibonacci * spiral,
                spiral,
                spin
            );
            break;
        case 8:
            arc(
                iteration + spiral,
                fibonacci + spiral,
                iteration * spiral,
                fibonacci * spiral,
                fibonacci,
                spin
            );
            break;
        default:
            arc(0, 0, fibonacci, fibonacci, 0, spin);
    }
    if (animation) {
        await new Promise(r => setTimeout(r, 1));
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
            (Math.pow(58, iterArray.length - 1));
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
 *      defined by variants[maxVariants]
 */
function fxHashToVariant(decimalHash, maxVariants, inverse = false) {
    var variant = math.round(decimalHash * 
        variants[maxVariants.toString()]);
    if (inverse) {
        return math.abs(maxVariants - variant);
    }
    return math.abs(variant);
}
/**
 * @param {float} decimalHash: output from base58toDecimal(fxhash)
 * @param {int} maxVariants: the inclusive n from the desired range 
 *      of (0, n) for the return value
 * @returns {int} one random integer defined by fxhash and a threshold
 *      defined by variants[maxVariants]
 * @description Doesn't always work
 */
function fxHashToVariantSimple(decimalHash, maxVariants) {
    return decimalHash % maxVariants;
}

/**
 * @param {float} maxTries: maximum random strings to generate
 * @param {int} maxVariants: passed to fun()
 * @param {function} fun: function to test against
 * @returns {Array} result of rarity probabilty given maxTries amount
 *      of mints for fun()
 */
function getRarity(maxTries = 1e3, maxVariants, fun = fxHashToVariant) {
    let maxFeature = 0;
    let minFeature = 1e306;
    let currentFeature = 0;
    for (let i = 0; i < maxTries; i++) {
        var fakehash = Array(49).fill(0).map(_ => alphabet[(
            Math.random() * alphabet.length) | 0]).join('')
        currentFeature = fun(base58toDecimal(fakehash), maxVariants);
        if (currentFeature > maxFeature) {
            maxFeature = currentFeature;
        }
        if (currentFeature < minFeature) {
            minFeature = currentFeature;
        }
    }
    let med = {};
    for (let j = 0; j <= maxVariants; j++) {
        var pos = math.round((properAlphabet.length - 1) 
            * j / maxVariants).toString();
        var key = fun(
            base58toDecimal(properAlphabet[pos].toString().repeat(49)),
            maxVariants
        )
        med[key] = properAlphabet[pos];
    }
    return {
        "sample": maxTries,
        "sampleMin": minFeature,
        "sampleMax": maxFeature,
        "min": fun(base58toDecimal('1'.repeat(49)), maxVariants),
        "max": fun(base58toDecimal('z'.repeat(49)), maxVariants),
        "med": med
    };
}

window.$fxhashFeatures = {
    "Variant": featureVariant,
    "fx(hue)": featureHue,
    "fx(saturation)": featureSaturation,
    "fx(luminance)": featureLuminance
}

//~ console.log(getRarity(1e1, 30, fxHashToVariant));
