export { color, GetColorResult } from './color';
export { number, GetNumberResult } from './number';
/** Makes the thing that the description of get does, but this is an internal function used to
 * add codes to the errors
 * Please dont use this function unless you're adding new gets, use get() instead.
 */
export declare function __rawGet<T>(codeName: string, failDescription: string, text: string, getterFunc: (results: RegExpExecArray) => T, ...rawRegExps: string[]): T;
/** Gets the components of a given string, only if the given string IS that type
 * if you want to get the components of some string that contains that, use search() instead.
 * @example
 * get.email('myEmail@gmail.com').domain // will return 'gmail.com' because the whole string is an email
 * get.slug('$$$_creator').match // will throw an error, because, besides 'creator' is a valid slug, the whole string ('$$$_creator') ISNT
 * get.number('0a10').value // will return an error, because, besides '0' is a valid number, '0a10' ISNT.
*/
export declare function get<T>(text: string, getterFunc: (results: RegExpExecArray) => T, ...rawRegExps: string[]): T;
/** Results of the function email() */
export interface GetEmailResult {
    /** Detected email */
    match: string;
    /** All the text before the "@" */
    predomain: string;
    /** All the text after the "@" */
    domain: string;
}
/** Results of the function securePassword() */
export interface GetSecurePasswordResult {
    /** Detected password */
    match: string;
}
/** Results of the function slug() */
export interface GetSlugResult {
    /** Detected slug */
    match: string;
}
/** Gets the components of a given email (if the text doesn't contain an email then throws an error) */
export declare function email(text: string): GetEmailResult;
/** Gets the components of a given password (if the text doesn't contain a secure password then throws an error) */
export declare function securePassword(text: string): GetSecurePasswordResult;
/** Gets the components of a given slug (if the text doesn't contain a slug then throws an error) */
export declare function slug(text: string): GetSlugResult;
