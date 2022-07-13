import { GetEmailResult, GetSecurePasswordResult, GetSlugResult, GetColorResult, GetNumberResult } from '../get';
/** Makes the thing that the description of search does, but this is an internal function used to
 * add codes to the errors
 * Please dont use this function unless you're adding new gets, use search() instead.
 */
export declare function __rawSearch<T>(codeName: string, failDescription: string, text: string, getFunc: (text: string) => T, ...rawRegExps: string[]): {
    matches: string[];
    gets: T[];
    first: T;
};
/** Search matches of a given string, and returns an array with all the matches and the first match */
export declare function search<T>(text: string, getFunc: (text: string) => T, ...rawRegExps: string[]): {
    matches: string[];
    gets: T[];
    first: T;
};
/** Results of a search function */
export declare type SearchResult<T> = {
    /** All matches */
    matches: string[];
    /** Results of executing the get function in every match */
    gets: T[];
    /** The first match in the text */
    first: T;
};
/** Search matches of emails in the given text (if the text doesn't contain an email then throws an error) */
export declare function email(text: string): SearchResult<GetEmailResult>;
/** Search matches of secure password in the given text (if the text doesn't contain a secure password then throws an error) */
export declare function securePassword(text: string): SearchResult<GetSecurePasswordResult>;
/** Search matches of slugs in the given text (if the text doesn't contain a slug then throws an error) */
export declare function slug(text: string): SearchResult<GetSlugResult>;
/** Search matches of colors in the given text (if the text doesn't contain a color then throws an error) */
export declare function color(text: string): SearchResult<GetColorResult>;
/** Search matches of numbers in the given text (if the text doesn't contain a number then throws an error) */
export declare function number(text: string): SearchResult<GetNumberResult>;
