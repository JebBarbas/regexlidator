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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.number = exports.color = exports.slug = exports.securePassword = exports.email = exports.search = exports.__rawSearch = void 0;
var regexList = __importStar(require("../rawRegexList"));
var utils_1 = require("../utils");
var __1 = require("../");
/** Internal function to convert an array of matches to a SearchResult
 * if the array has no elements then throws an error
*/
function __arrayToSearchResult(gets, matches) {
    return {
        matches: matches,
        gets: gets,
        first: gets[0]
    };
}
/** Makes the thing that the description of search does, but this is an internal function used to
 * add codes to the errors
 * Please dont use this function unless you're adding new gets, use search() instead.
 */
function __rawSearch(codeName, failDescription, text, getFunc) {
    var rawRegExps = [];
    for (var _i = 4; _i < arguments.length; _i++) {
        rawRegExps[_i - 4] = arguments[_i];
    }
    var matches = [];
    rawRegExps.forEach(function (rawRegExp) {
        var results = text.match((0, utils_1.toRegExp)(rawRegExp, 'search'));
        if (results)
            matches.push.apply(matches, results);
    });
    if (matches.length > 0) {
        var gets = matches.map(getFunc);
        return __arrayToSearchResult(gets, matches);
    }
    // Replace empty string with get
    codeName = "regexlidator/invalid-".concat(codeName || 'search');
    var message = codeName ? "The given text hasn't any ".concat(codeName) : "The given text doesn't has a match of any given regex";
    failDescription || (failDescription = 'Try with another text.');
    (0, utils_1.fail)(codeName, message, failDescription);
}
exports.__rawSearch = __rawSearch;
/** Search matches of a given string, and returns an array with all the matches and the first match */
function search(text, getFunc) {
    var rawRegExps = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        rawRegExps[_i - 2] = arguments[_i];
    }
    return __rawSearch.apply(void 0, __spreadArray(['', '', text, getFunc], rawRegExps, false));
}
exports.search = search;
/** Search matches of emails in the given text (if the text doesn't contain an email then throws an error) */
function email(text) {
    var rawEmailRegex = regexList.rawEmailRegex;
    return __rawSearch('email', 'You must introduce a valid email.', text, __1.get.email, rawEmailRegex);
}
exports.email = email;
/** Search matches of secure password in the given text (if the text doesn't contain a secure password then throws an error) */
function securePassword(text) {
    var rawSecurePasswordRegex = regexList.rawSecurePasswordRegex;
    return __rawSearch('password', 'A secure password must have at least:\n- 8 characters.\n- 1 uppercase letter.\n- 1 lowercase letter.\n- 1 number.', text, __1.get.securePassword, rawSecurePasswordRegex);
}
exports.securePassword = securePassword;
/** Search matches of slugs in the given text (if the text doesn't contain a slug then throws an error) */
function slug(text) {
    var rawSlugRegex = regexList.rawSlugRegex;
    return __rawSearch('slug', 'A valid slug can only contain characters [0-9a-fA-F] and can have (but not end in) "-" or "_"', text, __1.get.slug, rawSlugRegex);
}
exports.slug = slug;
/** Search matches of colors in the given text (if the text doesn't contain a color then throws an error) */
function color(text) {
    var rawColor3Regex = regexList.rawColor3Regex, rawColor6Regex = regexList.rawColor6Regex;
    return __rawSearch('color', 'A valid color must have 3 or 6 hexadecimal values [0-9a-fA-F] and start with "#" or "0x"', text, __1.get.color, rawColor3Regex, rawColor6Regex);
}
exports.color = color;
/** Search matches of numbers in the given text (if the text doesn't contain a number then throws an error) */
function number(text) {
    var rawOctalNumberRegex = regexList.rawOctalNumberRegex, rawBinaryNumberRegex = regexList.rawBinaryNumberRegex, rawDecimalNumberRegex = regexList.rawDecimalNumberRegex, rawHexadecimalNumberRegex = regexList.rawHexadecimalNumberRegex;
    return __rawSearch('number', 'A valid number must be a decimal (without prefix), hexadecimal ("0x" prefix), binary ("0b" prefix) or octal ("0o" prefix) number.', text, __1.get.number, rawDecimalNumberRegex, rawHexadecimalNumberRegex, rawBinaryNumberRegex, rawOctalNumberRegex);
}
exports.number = number;
