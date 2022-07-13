"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.toRegExp = exports.fail = exports.RegExpError = void 0;
var RegExpError = /** @class */ (function (_super) {
    __extends(RegExpError, _super);
    function RegExpError(code, message, description) {
        var _this = _super.call(this, message) || this;
        _this.code = code;
        _this.name = "RegExpError";
        _this.description = description;
        return _this;
    }
    return RegExpError;
}(Error));
exports.RegExpError = RegExpError;
/** Thows an error */
function fail(code, message, description) {
    throw new RegExpError(code, message, description);
}
exports.fail = fail;
/** Converts a raw regexp to a regexp, this is useful to save all the raw regexps in one file,
 * and, deppending in what do you need, add some flags or symbols
 */
function toRegExp(rawRegExp, use) {
    if (use === 'is' || use === 'get')
        return new RegExp("^(?:".concat(rawRegExp, ")$"), 'g');
    if (use === 'replace' || use === 'search' || use === 'contains')
        return new RegExp(rawRegExp, 'gm');
    return new RegExp(rawRegExp);
}
exports.toRegExp = toRegExp;
