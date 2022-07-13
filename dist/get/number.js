"use strict";
// THIS CODE BELLONG ORIGINALLY IN INDEX.TS, BUT IT BECAME TOO LARGE, THAT IT WAS BETTER TO
// MOVE IT TO IT'S OWN FILE
Object.defineProperty(exports, "__esModule", { value: true });
exports.number = void 0;
var rawRegexList_1 = require("../rawRegexList");
var _1 = require("./");
/** Internal function to get the number type name and radix based in prefix */
function __toType(prefix) {
    if (prefix === '0x')
        return ['hexadecimal', 16];
    if (prefix === '0b')
        return ['binary', 2];
    if (prefix === '0o')
        return ['octal', 8];
    return ['decimal', 10];
}
/** Internal function to convert the number to its value */
function __toValue(int, rest, radix) {
    return parseInt(int, radix) + __toDecimalFraction(rest, radix);
}
/** Internal function that converts the a number after decimal point to a fraction
 * @example
 * in (0.1) "1" -> 1/10 -> 0.1 (in decimal returns the same)
 * in (0.12) "12" -> 12/100 (10^2) (stays the same)
 * in (0x0.A) "A" -> 11/16 -> 0.6875
 * in (0x0.FFE) -> 4094/4096 (16^3) -> 0.9995
 */
function __toDecimalFraction(rest, radix) {
    var numerator = parseInt(rest, radix);
    var denominator = Math.pow(radix, (rest.length));
    return numerator / denominator;
}
/** Internal function to get the results based on the successful regex */
function __getNumberResult(results) {
    var match = results[0], prefix = results[1], integerPart = results[2], restPart = results[3], onlyIntegerPart = results[4];
    var _a = __toType(prefix), name = _a[0], radix = _a[1];
    var int = onlyIntegerPart || integerPart || '0';
    var rest = restPart || '0';
    return {
        match: match,
        type: name,
        value: __toValue(int, rest, radix),
        integerValue: parseInt(int, radix),
        rest: __toDecimalFraction(rest, radix)
    };
}
/** Gets the components of a given number (if the text doesn't contain a number or this number has inconsistencies then throws an error) */
function number(text) {
    return (0, _1.__rawGet)('number', 'A valid number must be a decimal (without prefix), hexadecimal ("0x" prefix), binary ("0b" prefix) or octal ("0o" prefix) number.', text, __getNumberResult, rawRegexList_1.rawDecimalNumberRegex, rawRegexList_1.rawHexadecimalNumberRegex, rawRegexList_1.rawBinaryNumberRegex, rawRegexList_1.rawOctalNumberRegex);
}
exports.number = number;
