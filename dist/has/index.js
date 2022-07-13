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
exports.number = exports.slug = exports.color = exports.securePassword = exports.email = exports.has = void 0;
var rawRegexList = __importStar(require("../rawRegexList"));
var utils_1 = require("../utils");
/** Checks if the given text has a word that matches a regex.
 * (used to check if some string contains an email, password, color, etc...)
*/
function has(text) {
    var rawRegexps = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        rawRegexps[_i - 1] = arguments[_i];
    }
    return rawRegexps.some(function (rawRegExp) {
        var matches = text.match((0, utils_1.toRegExp)(rawRegExp, 'contains'));
        matches !== null && matches !== void 0 ? matches : (matches = []);
        return matches.length > 0;
    });
}
exports.has = has;
/** Checks if a given text has a valid email */
function email(text) {
    var rawEmailRegex = rawRegexList.rawEmailRegex;
    return has(text, rawEmailRegex);
}
exports.email = email;
/** Checks if a given text has a valid secure password, a secure password must have at least:
 * - 8 characters
 * - 1 uppercase letter
 * - 1 lowercase letter
 * - 1 number
 */
function securePassword(text) {
    var rawSecurePasswordRegex = rawRegexList.rawSecurePasswordRegex;
    return has(text, rawSecurePasswordRegex);
}
exports.securePassword = securePassword;
/** Checks if a given text has a valid hexadecimal color with 3 or 6 digits (plus the "#" or "0x") */
function color(text) {
    var rawColor3Regex = rawRegexList.rawColor3Regex, rawColor6Regex = rawRegexList.rawColor6Regex;
    return has(text, rawColor3Regex, rawColor6Regex);
}
exports.color = color;
/** Checks if a given text has a valid slug (for URLs, usernames, file names, etc...) */
function slug(text) {
    var rawSlugRegex = rawRegexList.rawSlugRegex;
    return has(text, rawSlugRegex);
}
exports.slug = slug;
/** Checks if the given text has a valid number (can be hexadecimal with prefix "0x", octal with prefix "0o", binary with prefix "0b" or decimal without prefix) */
function number(text) {
    var rawDecimalNumberRegex = rawRegexList.rawDecimalNumberRegex, rawHexadecimalNumberRegex = rawRegexList.rawHexadecimalNumberRegex, rawBinaryNumberRegex = rawRegexList.rawBinaryNumberRegex, rawOctalNumberRegex = rawRegexList.rawOctalNumberRegex;
    return has(text, rawDecimalNumberRegex, rawHexadecimalNumberRegex, rawBinaryNumberRegex, rawOctalNumberRegex);
}
exports.number = number;
