export declare class RegExpError extends Error {
    code: string;
    description: string;
    constructor(code: string, message: string, description: string);
}
/** Thows an error */
export declare function fail(code: string, message: string, description: string): never;
/** Converts a raw regexp to a regexp, this is useful to save all the raw regexps in one file,
 * and, deppending in what do you need, add some flags or symbols
 */
export declare function toRegExp(rawRegExp: string, use: 'is' | 'contains' | 'get' | 'search' | 'replace'): RegExp;
