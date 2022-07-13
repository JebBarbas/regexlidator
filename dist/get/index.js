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
exports.slug = exports.securePassword = exports.email = exports.get = exports.__rawGet = exports.number = exports.color = void 0;
var regexList = __importStar(require("../rawRegexList"));
var utils_1 = require("../utils");
// EXPORTS FROM OTHER FILES
var color_1 = require("./color");
Object.defineProperty(exports, "color", { enumerable: true, get: function () { return color_1.color; } });
var number_1 = require("./number");
Object.defineProperty(exports, "number", { enumerable: true, get: function () { return number_1.number; } });
/** Makes the thing that the description of get does, but this is an internal function used to
 * add codes to the errors
 * Please dont use this function unless you're adding new gets, use get() instead.
 */
function __rawGet(codeName, failDescription, text, getterFunc) {
    var rawRegExps = [];
    for (var _i = 4; _i < arguments.length; _i++) {
        rawRegExps[_i - 4] = arguments[_i];
    }
    var cleanText = text.trim();
    var rawRegExp;
    for (var _a = 0, rawRegExps_1 = rawRegExps; _a < rawRegExps_1.length; _a++) {
        rawRegExp = rawRegExps_1[_a];
        var results = (0, utils_1.toRegExp)(rawRegExp, 'get').exec(cleanText);
        if (results)
            return getterFunc(results);
    }
    // Replace empty string with get
    codeName = "regexlidator/invalid-".concat(codeName || 'get');
    var message = codeName ? "The given text isn't a valid ".concat(codeName) : "The given text doesn't match any given regex";
    failDescription || (failDescription = 'Maybe you are trying to find something in a larger string, try using search() instead.');
    (0, utils_1.fail)(codeName, message, failDescription);
}
exports.__rawGet = __rawGet;
/** Gets the components of a given string, only if the given string IS that type
 * if you want to get the components of some string that contains that, use search() instead.
 * @example
 * get.email('myEmail@gmail.com').domain // will return 'gmail.com' because the whole string is an email
 * get.slug('$$$_creator').match // will throw an error, because, besides 'creator' is a valid slug, the whole string ('$$$_creator') ISNT
 * get.number('0a10').value // will return an error, because, besides '0' is a valid number, '0a10' ISNT.
*/
function get(text, getterFunc) {
    var rawRegExps = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        rawRegExps[_i - 2] = arguments[_i];
    }
    return __rawGet.apply(void 0, __spreadArray(['', '', text, getterFunc], rawRegExps, false));
}
exports.get = get;
/** Gets the components of a given email (if the text doesn't contain an email then throws an error) */
function email(text) {
    var rawEmailRegex = regexList.rawEmailRegex;
    return __rawGet('email', 'You must introduce a valid email.', text, function (results) {
        var match = results[0], predomain = results[1], domain = results[2];
        return { match: match, predomain: predomain, domain: domain };
    }, rawEmailRegex);
}
exports.email = email;
/** Gets the components of a given password (if the text doesn't contain a secure password then throws an error) */
function securePassword(text) {
    var rawSecurePasswordRegex = regexList.rawSecurePasswordRegex;
    return __rawGet('password', 'A secure password must have at least:\n- 8 characters.\n- 1 uppercase letter.\n- 1 lowercase letter.\n- 1 number.', text, function (results) {
        var match = results[0];
        return { match: match };
    }, rawSecurePasswordRegex);
}
exports.securePassword = securePassword;
/** Gets the components of a given slug (if the text doesn't contain a slug then throws an error) */
function slug(text) {
    var rawSlugRegex = regexList.rawSlugRegex;
    return __rawGet('slug', 'A valid slug can only contain characters [0-9a-fA-F] and can have (but not end in) "-" or "_"', text, function (results) {
        var match = results[0];
        return { match: match };
    }, rawSlugRegex);
}
exports.slug = slug;
