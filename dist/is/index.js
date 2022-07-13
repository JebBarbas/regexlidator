"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.number = exports.slug = exports.color = exports.securePassword = exports.email = exports.is = void 0;
var rawRegexList = __importStar(require("../rawRegexList"));
var utils_1 = require("../utils");
/** Checks if the given string matchs a given regex, it trims the value and checks if the
 * whole string matches; if you want to check if the string contains something, use has() instead.
 * (used to check if some string is for instance, an email, password, color, etc...)
 * @example
 * is.email('myEmail@something.com ') // will be true
 * is.email('myEmail: myEmail@something.com') // will be false, because the whole string ISNT an email
 * is.number('   10') // will be true, 10 is a number
 * is.number('10p0') // will be false, 10 matches a number, but the whole string ('10p0') ISNT a number
 * */
function is(text) {
    var rawRegexps = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        rawRegexps[_i - 1] = arguments[_i];
    }
    var cleanText = text.trim();
    return rawRegexps.some(function (rawRegExp) { return (0, utils_1.toRegExp)(rawRegExp, 'is').test(cleanText); });
}
exports.is = is;
/** Checks if a given text is a valid email */
function email(text) {
    var rawEmailRegex = rawRegexList.rawEmailRegex;
    return is(text, rawEmailRegex);
}
exports.email = email;
/** Checks if a given text is a valid secure password, a secure password must have at least:
 * - 8 characters
 * - 1 uppercase letter
 * - 1 lowercase letter
 * - 1 number
 */
function securePassword(text) {
    var rawSecurePasswordRegex = rawRegexList.rawSecurePasswordRegex;
    return is(text, rawSecurePasswordRegex);
}
exports.securePassword = securePassword;
/** Checks if a given text is a valid hexadecimal color with 3 or 6 digits (plus the "#" or "0x") */
function color(text) {
    var rawColor3Regex = rawRegexList.rawColor3Regex, rawColor6Regex = rawRegexList.rawColor6Regex;
    return is(text, rawColor3Regex, rawColor6Regex);
}
exports.color = color;
/** Checks if a given text is a valid slug (for URLs, usernames, file names, etc...) */
function slug(text) {
    var rawSlugRegex = rawRegexList.rawSlugRegex;
    return is(text, rawSlugRegex);
}
exports.slug = slug;
/** Checks if the given text is a valid number (can be hexadecimal with prefix "0x", octal with prefix "0o", binary with prefix "0b" or decimal without prefix) */
function number(text) {
    var rawDecimalNumberRegex = rawRegexList.rawDecimalNumberRegex, rawHexadecimalNumberRegex = rawRegexList.rawHexadecimalNumberRegex, rawBinaryNumberRegex = rawRegexList.rawBinaryNumberRegex, rawOctalNumberRegex = rawRegexList.rawOctalNumberRegex;
    return is(text, rawDecimalNumberRegex, rawHexadecimalNumberRegex, rawBinaryNumberRegex, rawOctalNumberRegex);
}
exports.number = number;
