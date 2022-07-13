"use strict";
// THIS CODE BELLONG ORIGINALLY IN INDEX.TS, BUT IT BECAME TOO LARGE, THAT IT WAS BETTER TO
// MOVE IT TO IT'S OWN FILE
Object.defineProperty(exports, "__esModule", { value: true });
exports.color = void 0;
var _1 = require("./");
var rawRegexList_1 = require("../rawRegexList");
/** Internal function, converts a color length from 1 to 2, and makes it uppercase.
 * For example: '1' -> '11' or 'a' -> 'AA'
 * If a color has a length of 2, remains the same: '22' -> '22' or 'Ac' -> 'AC'
 */
function __fixComponent(rgorb) {
    return rgorb.length === 1 ? (rgorb + rgorb).toUpperCase() : rgorb.toUpperCase();
}
/** Internal function, converts a color component to integer */
function __toInt(rgorb) {
    return parseInt(__fixComponent(rgorb), 16);
}
/** Internal function, returns a GetHexColorResult based on an RegExpExecArray */
function __getColorResult(results) {
    var match = results[0], red = results[1], green = results[2], blue = results[3];
    return {
        match: match,
        red: {
            asString: __fixComponent(red),
            asNumber: __toInt(red)
        },
        green: {
            asString: __fixComponent(green),
            asNumber: __toInt(green)
        },
        blue: {
            asString: __fixComponent(blue),
            asNumber: __toInt(blue)
        },
    };
}
/** Gets the components of a given hexadecimal color (if the text doesn't contain an hexadecimal color then throws an error) */
function color(text) {
    return (0, _1.__rawGet)('color', 'A valid color must have 3 or 6 hexadecimal values [0-9a-fA-F] and start with "#" or "0x"', text, __getColorResult, rawRegexList_1.rawColor3Regex, rawRegexList_1.rawColor6Regex);
}
exports.color = color;
