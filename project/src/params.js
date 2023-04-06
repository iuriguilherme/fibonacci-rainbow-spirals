/**
 * @file Fibonacci Rainbow Spirals
 * @copyright Iuri Guilherme 2023  
 * @license GNU AGPLv3  
 * @author Iuri Guilherme <https://iuri.neocities.org/>  
 * @description This is Fibonacci Rainbow Spirals made with p5js for 
 *      fxhash.xyz genarative tokens. Source code available at Github: 
 *      https://github.com/iuriguilherme/fibonacci-rainbow-spirals  
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

/**
 * @param {int} variation: output from 
 *      fxHashToVariation(base58toDecimal(fxhashTrunc))
 */
export function configureVariation(p, variation) {
  let params = {};
  switch (variation) {
    case 0:
      params = {
        //~ "x": "0",
        //~ "x": "b",
        //~ "x": "af * 2",
        //~ "x": "af + b",
        "x": "b",
        //~ "y": "0",
        //~ "y": "b",
        "y": "a * b",
        //~ "y": "af * 3",
        //~ "y": "b + c",
        //~ "w": "c",
        //~ "w": "pow(c, b)",
        "w": "a * c",
        //~ "w": "af * 3",
        //~ "w": "af * b",
        //~ "h": "c",
        //~ "h": "pow(c, b)",
        //~ "h": "b * c",
        "h": "b",
        //~ "start": "0",
        //~ "start": "a",
        "start": "c",
        //~ "stop": "e",
        //~ "stop": "b * f",
        //~ "rotate": "e",
        "rotate": "f",
        "rotateStart": "fd",
        //~ "rotateStart": "0",
        //~ "weight": "u",
        //~ "hue": "h",
        //~ "sat": "s",
        //~ "lum": "l",
        //~ "transOffsetX": "z / 2",
        //~ "transOffsetX": "z / 4",
        //~ "transOffsetY": "z / 2",
        //~ "transOffsetY": "z / 4",
        //~ "transIterX": "a",
        //~ "transIterX": "a",
        //~ "transIterY": "a",
        //~ "transIterY": "a",
        //~ "transSpirX": "b",
        //~ "transSpirX": "0",
        //~ "transSpirY": "b",
        //~ "transSpirY": "0",
        //~ "bgHue": "h",
        //~ "bgSat": "s",
        //~ "bgLum": "l",
        //~ "delay": "r",
        //~ "maxHue": "hx",
        //~ "maxHue": "210",
        //~ "minHue": "hn",
        //~ "minHue": "90",
        //~ "maxSat": "sx",
        //~ "maxSat": "75",
        //~ "minSat": "sn",
        //~ "minSat": "60",
        //~ "maxLum": "lx",
        //~ "maxLum": "60",
        //~ "minLum": "ln",
        //~ "minLum": "60",
        //~ "maxIter": "i",
        //~ "maxIter": "300",
        //~ "maxIter": "ft",
        //~ "maxSpir": "j",
        //~ "maxSpir": "720",
        //~ "anim": "n",
        //~ "anim": "0",
        //~ "size": "z",
        "drawFunction": "1",
        //~ "drawFunction": "4",
        //~ "drawFunction": "5",
        "drawInnerFunction": "1",
        //~ "drawInnerFunction": "7",
        "ratioFunction": "1",
        //~ "ratioFunction": "2",
        "resizeFunction": "1",
        //~ "resizeFunction": "2",
        "setupFunction": "1",
        //~ "setupFunction": "2",
      };
      break;
    case -2:
      // https://www.fxhash.xyz/generative/24631
      params = {
        "x": "b",
        "y": "a * b",
        "w": "a * c",
        "h": "b * c",
        "start": "c",
      };
      break;
    case -3:
      // https://www.fxhash.xyz/generative/24810
      params = {
        "x": "b",
        "y": "a * b",
        "w": "a * c",
        "h": "b * c",
        "start": "b",
      };
      break;
    case -4:
      // https://www.fxhash.xyz/generative/24849
      params = {
        "x": "b",
        "y": "pow(c, a)",
        "w": "b",
        "h": "b * c",
        "start": "b",
      };
      break;
    case -5:
      // https://www.fxhash.xyz/generative/24912
      params = {
        "x": "a + c",
        "y": "a * c",
        "w": "b + c",
        "h": "b * c",
        "start": "c",
      };
      break;
    case -6:
      // https://www.fxhash.xyz/generative/24979
      params = {
        "x": "c + (a * b)",
        "y": "c + pow(a, b)",
        "w": "a * c",
        "h": "b * c",
        "start": "b",
      };
      break;
    case -7:
      // https://www.fxhash.xyz/generative/25018
      params = {
        "x": "b",
        "y": "c * a",
        "w": "a",
        "h": "b * c",
        "start": "b",
        "minLum": "30",
        "maxLum": "45",
        "weight": "a / 100",
        "drawInnerFunction": "2",
      };
      break;
    case -8:
      // https://www.fxhash.xyz/generative/25309
      params = {
        "x": "a * b",
        "y": "b * c",
        "w": "pow(b, a)",
        "h": "pow(c, b)",
        "start": "b * c",
      };
      break;
    case -9:
      // https://www.fxhash.xyz/generative/25381
      params = {
        "x": "b",
        "y": "a * b",
        "w": "a * c",
        "h": "b * c",
        "start": "b",
        "drawInnerFunction": "4",
      };
      break;
    case -10:
      /*
       * This one is messed up, not suitable for fx(hash) and has been 
       * removed, the one person who minted has been refunded since. See 
       * README.md for further details.
       * https://www.fxhash.xyz/generative/25561
       */
      params = {
        "x": "a + b",
        "y": "b + c",
        "w": "a * b",
        "h": "b * c",
        "start": "c",
        "rotate": "f",
        "drawInnerFunction": "3",
      };
      break;
    case -11:
      // https://www.fxhash.xyz/generative/25935
      params = {
        "x": "b",
        "y": "a * b",
        "w": "d",
        "h": "d",
        "start": "c",
        "stop": "b * f",
        "maxHue": "180",
      };
      break;
    case -12:
      //  https://www.fxhash.xyz/generative/26105
      params = {
        "x": "a",
        "y": "b",
        "w": "a",
        "h": "a",
        "start": "c",
        "stop": "g / a",
        "maxHue": "300",
        "minHue": "180",
        "maxSat": "90",
        "minSat": "60",
        "minLum": "45",
        "maxIter": "180",
        "drawInnerFunction": "2",
      };
      break;
    case -13:
      // https://www.fxhash.xyz/generative/26432
      params = {
        "x": "a",
        "y": "b",
        "w": "c",
        "h": "c",
        "start": "b",
        "stop": "g / b",
      };
      break;
    case -14:
      params = {
        "x": "a * 2",
        "y": "a * 3",
        "w": "a * 3",
        "h": "b",
        "start": "c",
        "stop": "b * f",
        "drawInnerFunction": "2",
      };
      break;
    case -15:
      // This one is my personal favorite
      params = {
        "x": "a",
        "y": "a",
        "w": "b",
        "h": "c",
        "start": "c",
        "stop": "b * f",
        "drawInnerFunction": "2",
      };
      break;
    case -16:
      params = {
        "x": "b",
        "y": "a * b",
        "w": "b",
        "h": "d",
        "start": "b",
        "stop": "b * f",
        "drawInnerFunction": "2",
      };
      break;
    case -17:
      params = {
        "x": "b",
        "y": "a * c",
        "w": "c",
        "h": "b * c",
        "start": "b",
        "stop": "f",
        "rotate": "f",
      };
      break;
    case -18:
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
        "minLum": "36",
        "drawInnerFunction": "5",
      };
      break;
    case -19:
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
        "minLum": "45",
        "drawInnerFunction": "3",
      };
      break;
    case -20:
      params = {
        "x": "b",
        "y": "b",
        "w": "b",
        "h": "c",
        "start": "c",
        "stop": "b * f",
        "rotate": "b",
        "maxSat": "75",
        "minSat": "60",
        "drawInnerFunction": "2",
      };
      break;
    case 1:
      params = {
        "x": "b",
        "y": "a * b",
        "w": "a * c",
        "h": "b * c",
        "start": "c",
        "maxIter": "24",
        "drawFunction": "5",
      };
      break;
    case 2:
      params = {
        "x": "b",
        "y": "a * b",
        "w": "a * c",
        "h": "b * c",
        "start": "b",
        "maxIter": "22",
        "drawFunction": "5",
      };
      break;
    case 3:
      params = {
        "x": "b",
        "y": "pow(c, a)",
        "w": "b",
        "h": "b * c",
        "start": "b",
        "maxIter": "5",
        "drawFunction": "5",
      };
      break;
    case 4:
      params = {
        "x": "a + c",
        "y": "a * c",
        "w": "b + c",
        "h": "b * c",
        "start": "c",
        "maxIter": "11",
        "drawFunction": "5",
        "drawInnerFunction": "5",
      };
      break;
    case 5:
      params = {
        "x": "c + (a * b)",
        "y": "c + pow(a, b)",
        "w": "a * c",
        "h": "b * c",
        "start": "b",
        "maxIter": "22",
        "drawFunction": "5",
        "drawInnerFunction": "5",
      };
      break;
    case 6:
      params = {
        "x": "b",
        "y": "c * a",
        "w": "a",
        "h": "b * c",
        "start": "b",
        "minLum": "30",
        "maxLum": "45",
        "weight": "a / 100",
        "maxIter": "54",
        "drawFunction": "8",
        "drawInnerFunction": "6",
      };
      break;
    case 7:
      params = {
        "x": "a * b",
        "y": "b * c",
        "w": "pow(b, a)",
        "h": "pow(c, b)",
        "start": "b * c",
        "maxIter": "17",
        "drawFunction": "5",
        "drawInnerFunction": "5",
      };
      break;
    case 8:
      params = {
        "x": "b",
        "y": "a * b",
        "w": "a * c",
        "h": "b * c",
        "start": "b",
        "maxIter": "22",
        "drawFunction": "5",
        "drawInnerFunction": "4",
      };
      break;
    case 9:
      params = {
        "x": "a + b",
        "y": "b + c",
        "w": "a * b",
        "h": "b * c",
        "start": "c",
        "rotate": "f",
        "maxIter": "max(2, min(33, floor(ft / randomInt(2, 5))))",
        "drawFunction": "5",
        "drawInnerFunction": "3",
      };
      break;
    case 10:
      params = {
        "x": "b",
        "y": "a * b",
        "w": "d",
        "h": "d",
        "start": "c",
        "stop": "b * f",
        "maxHue": "180",
        "drawFunction": "11",
        "drawInnerFunction": "8",
      };
      break;
    case 11:
      params = {
        "x": "a",
        "y": "b",
        "w": "a",
        "h": "a",
        "start": "c",
        "stop": "g / a",
        "maxHue": "300",
        "minHue": "180",
        "maxSat": "90",
        "minSat": "60",
        "minLum": "45",
        "maxIter": "180",
        "drawFunction": "7",
        "drawInnerFunction": "6",
      };
      break;
    case 12:
      params = {
        "x": "a",
        "y": "b",
        "w": "c",
        "h": "c",
        "start": "b",
        "stop": "g / b",
        "maxIter": "33",
        "drawFunction": "5",
      };
      break;
    case 13:
      params = {
        "x": "a * 2",
        "y": "a * 3",
        "w": "a * 3",
        "h": "b",
        "start": "c",
        "stop": "b * f",
        "drawFunction": "7",
        "drawInnerFunction": "6",
      };
      break;
    case 14:
      // This one is my personal favorite
      params = {
        "x": "a",
        "y": "a",
        "w": "b",
        "h": "c",
        "start": "c",
        "stop": "b * f",
        "drawFunction": "6",
        "drawInnerFunction": "6",
      };
      break;
    case 15:
      params = {
        "x": "b",
        "y": "a * b",
        "w": "b",
        "h": "d",
        "start": "b",
        "stop": "b * f",
        "drawFunction": "7",
        "drawInnerFunction": "6",
      };
      break;
    case 16:
      params = {
        "x": "b",
        "y": "a * c",
        "w": "c",
        "h": "b * c",
        "start": "b",
        "stop": "f",
        "rotate": "f",
        "maxIter": "24",
        "drawFunction": "5",
      };
      break;
    case 17:
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
        "minLum": "36",
        "drawFunction": "5",
        "drawInnerFunction": "5",
      };
      break;
    case 18:
      // This is the lamest one
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
        "minLum": "45",
        "maxIter": "4",
        "drawFunction": "5",
        "drawInnerFunction": "3",
      };
      break;
    case 19:
      params = {
        "x": "b",
        "y": "b",
        "w": "b",
        "h": "c",
        "start": "c",
        "stop": "b * f",
        "rotate": "b",
        "maxSat": "75",
        "minSat": "60",
        "drawFunction": "7",
        "drawInnerFunction": "6",
      };
      break;
    case 20:
      // var1-1
      params = {
        "x": "b",
        "y": "a * b",
        "w": "a * c",
        "h": "b * c",
        "start": "c",
        "drawFunction": "6",
        "drawInnerFunction": "8",
      };
      break;
    case 21:
      // var1-2
      params = {
        "x": "b",
        "y": "a * b",
        "w": "a * c",
        "h": "b * c",
        "start": "c",
        "drawFunction": "6",
        "drawInnerFunction": "8",
      };
      break;
    case 22:
      // var1-3
      params = {
        "x": "b",
        "y": "a * b",
        "w": "a * c",
        "h": "b * c",
        "start": "c",
        "drawFunction": "6",
        "drawInnerFunction": "8",
      };
      break;
    case 23:
      // var2-1
      params = {
        "x": "b",
        "y": "a * b",
        "w": "a * c",
        "h": "b * c",
        "start": "b",
        "drawFunction": "6",
        "drawInnerFunction": "8",
      };
      break;
    case 24:
      // var2-2
      params = {
        "x": "b",
        "y": "a * b",
        "w": "a * c",
        "h": "b * c",
        "start": "b",
        "drawFunction": "10",
        "drawInnerFunction": "8",
      };
      break;
    case 25:
      // var2-3
      params = {
        "x": "b",
        "y": "a * b",
        "w": "a * c",
        "h": "b * c",
        "start": "b",
        "drawFunction": "11",
        "drawInnerFunction": "8",
      };
      break;
    case 26:
      // var3-1
      params = {
        "x": "b",
        "y": "pow(c, a)",
        "w": "b",
        "h": "b * c",
        "start": "b",
        "maxIter": "11",
        "drawFunction": "6",
        "drawInnerFunction": "8",
      };
      break;
    case 27:
      // var3-2
      params = {
        "x": "b",
        "y": "pow(c, a)",
        "w": "b",
        "h": "b * c",
        "start": "b",
        "drawFunction": "10",
        "drawInnerFunction": "8",
      };
      break;
    case 28:
      // var3-3
      params = {
        "x": "b",
        "y": "pow(c, a)",
        "w": "b",
        "h": "b * c",
        "start": "b",
        "drawFunction": "11",
        "drawInnerFunction": "8",
      };
      break;
    case 29:
      // var4-1
      params = {
        "x": "a + c",
        "y": "a * c",
        "w": "b + c",
        "h": "b * c",
        "start": "c",
        "drawFunction": "6",
        "drawInnerFunction": "8",
      };
      break;
    case 30:
      // var4-2
      params = {
        "x": "a + c",
        "y": "a * c",
        "w": "b + c",
        "h": "b * c",
        "start": "c",
        "drawFunction": "10",
        "drawInnerFunction": "5",
      };
      break;
    case 31:
      // var4-3
      params = {
        "x": "a + c",
        "y": "a * c",
        "w": "b + c",
        "h": "b * c",
        "start": "c",
        "drawFunction": "11",
        "drawInnerFunction": "5",
      };
      break;
    case 32:
      // var8-1
      params = {
        "x": "b",
        "y": "a * b",
        "w": "a * c",
        "h": "b * c",
        "start": "b",
        "drawFunction": "11",
        "drawInnerFunction": "10",
      };
      break;
    case 33:
      // var11-1
      params = {
        "x": "a",
        "y": "b",
        "w": "a",
        "h": "a",
        "start": "c",
        "stop": "g / a",
        "maxHue": "300",
        "minHue": "180",
        "maxSat": "90",
        "minSat": "60",
        "minLum": "45",
        "maxIter": "180",
        "drawFunction": "8",
        "drawInnerFunction": "6",
      };
      break;
    case 34:
      // var11-2
      params = {
        "x": "a",
        "y": "b",
        "w": "a",
        "h": "a",
        "start": "c",
        "stop": "g / a",
        "maxHue": "300",
        "minHue": "180",
        "maxSat": "90",
        "minSat": "60",
        "minLum": "45",
        "maxIter": "180",
        "drawFunction": "9",
        "drawInnerFunction": "6",
      };
      break;
    case 35:
      // var12-1
      params = {
        "x": "a",
        "y": "b",
        "w": "c",
        "h": "c",
        "start": "b",
        "stop": "g / b",
        "drawFunction": "6",
        "drawInnerFunction": "8",
      };
      break;
    case 36:
      // var12-2
      params = {
        "x": "a",
        "y": "b",
        "w": "c",
        "h": "c",
        "start": "b",
        "stop": "g / b",
        "drawFunction": "10",
        "drawInnerFunction": "8",
      };
      break;
    case 37:
      // var12-3
      params = {
        "x": "a",
        "y": "b",
        "w": "c",
        "h": "c",
        "start": "b",
        "stop": "g / b",
        "maxHue": "300",
        "maxSat": "90",
        "drawFunction": "11",
        "drawInnerFunction": "8",
      };
      break;
    case 38:
      // var13-1
      params = {
        "x": "a * 2",
        "y": "a * 3",
        "w": "a * 3",
        "h": "b",
        "start": "c",
        "stop": "b * f",
        "drawFunction": "8",
        "drawInnerFunction": "6",
      };
      break;
    case 39:
      // var13-2
      params = {
        "x": "a * 2",
        "y": "a * 3",
        "w": "a * 3",
        "h": "b",
        "start": "c",
        "stop": "b * f",
        "drawFunction": "9",
        "drawInnerFunction": "6",
      };
      break;
    case 40:
      // var14-1
      params = {
        "x": "a",
        "y": "a",
        "w": "b",
        "h": "c",
        "start": "c",
        "stop": "b * f",
        "drawFunction": "10",
        "drawInnerFunction": "6",
      };
      break;
    case 41:
      // var14-2
      params = {
        "x": "a",
        "y": "a",
        "w": "b",
        "h": "c",
        "start": "c",
        "stop": "b * f",
        "drawFunction": "11",
        "drawInnerFunction": "6",
      };
      break;
    case 42:
      // var14-3
      params = {
        "x": "a",
        "y": "a",
        "w": "b",
        "h": "c",
        "start": "c",
        "stop": "b * f",
        "drawFunction": "8",
        "drawInnerFunction": "6",
      };
      break;
    case 43:
      // var14-4
      params = {
        "x": "a",
        "y": "a",
        "w": "b",
        "h": "c",
        "start": "c",
        "stop": "b * f",
        "drawFunction": "9",
        "drawInnerFunction": "6",
      };
      break;
    case 44:
      // var15-1
      params = {
        "x": "b",
        "y": "a * b",
        "w": "b",
        "h": "d",
        "start": "b",
        "stop": "b * f",
        "drawFunction": "9",
        "drawInnerFunction": "6",
      };
      break;
    case 45:
      // var16-1
      params = {
        "x": "b",
        "y": "a * c",
        "w": "c",
        "h": "b * c",
        "start": "b",
        "stop": "f",
        "rotate": "f",
        "drawFunction": "11",
        "drawInnerFunction": "8",
      };
      break;
    case 46:
      // var19-1
      params = {
        "x": "b",
        "y": "b",
        "w": "b",
        "h": "c",
        "start": "c",
        "stop": "b * f",
        "rotate": "b",
        "maxSat": "75",
        "minSat": "60",
        "drawFunction": "8",
        "drawInnerFunction": "6",
      };
      break;
    case 47:
      // var19-2
      params = {
        "x": "b",
        "y": "b",
        "w": "b",
        "h": "c",
        "start": "c",
        "stop": "b * f",
        "rotate": "b",
        "maxSat": "75",
        "minSat": "60",
        "drawFunction": "9",
        "drawInnerFunction": "6",
      };
      break;
    case 48:
      // var19-3
      params = {
        "x": "b",
        "y": "b",
        "w": "b",
        "h": "c",
        "start": "c",
        "stop": "b * f",
        "rotate": "b",
        "maxSat": "75",
        "minSat": "60",
        "drawFunction": "6",
        "drawInnerFunction": "6",
      };
      break;
    case 49:
      // var19-4
      params = {
        "x": "b",
        "y": "b",
        "w": "b",
        "h": "c",
        "start": "c",
        "stop": "b * f",
        "rotate": "b",
        "maxSat": "75",
        "minSat": "60",
        "drawFunction": "10",
        "drawInnerFunction": "6",
      };
      break;
    case 50:
      // var19-5
      params = {
        "x": "b",
        "y": "b",
        "w": "b",
        "h": "c",
        "start": "c",
        "stop": "b * f",
        "rotate": "b",
        "maxSat": "75",
        "minSat": "60",
        "drawFunction": "11",
        "drawInnerFunction": "6",
      };
      break;
    default:
      console.log("Variation " + variation + " out of bonds");
  }
  for (let k in params) {
    p[k] = params[k];
  }
}
