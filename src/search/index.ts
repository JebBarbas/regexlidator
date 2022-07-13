import * as regexList from '../rawRegexList'
import { fail, toRegExp } from '../utils'
import { 
    GetEmailResult,
    GetSecurePasswordResult,
    GetSlugResult,
    GetColorResult,
    GetNumberResult
} from '../get'
import { get } from '../'

/** Internal function to convert an array of matches to a SearchResult 
 * if the array has no elements then throws an error
*/
function __arrayToSearchResult<T>(gets:T[], matches:string[]){
    return {
        matches,
        gets,
        first: gets[0]
    }
}

/** Makes the thing that the description of search does, but this is an internal function used to
 * add codes to the errors
 * Please dont use this function unless you're adding new gets, use search() instead.
 */
export function __rawSearch<T>(
    codeName: string, 
    failDescription: string, 
    text: string, 
    getFunc: (text: string) => T,
    ...rawRegExps: string[]
){
    const matches:string[] = []

    rawRegExps.forEach(rawRegExp => {
        const results = text.match(toRegExp(rawRegExp, 'search'))
        if(results) matches.push(...results)
    })

    if(matches.length > 0){
        const gets = matches.map(getFunc)
        return __arrayToSearchResult(gets, matches)
    }

    // Replace empty string with get
    codeName = `regexlidator/invalid-${codeName || 'search'}`
    
    const message = codeName ? `The given text hasn't any ${codeName}` : `The given text doesn't has a match of any given regex`
    
    failDescription ||= 'Try with another text.'

    fail(codeName, message, failDescription)
}

/** Search matches of a given string, and returns an array with all the matches and the first match */
export function search<T>(
    text: string, 
    getFunc: (text: string) => T,
    ...rawRegExps: string[]
){
    return __rawSearch<T>('', '', text, getFunc, ...rawRegExps)
}

/** Results of a search function */
export type SearchResult<T> = {
    /** All matches */
    matches: string[]

    /** Results of executing the get function in every match */
    gets: T[]

    /** The first match in the text */
    first: T
}

/** Search matches of emails in the given text (if the text doesn't contain an email then throws an error) */
export function email(text:string):SearchResult<GetEmailResult>{
    const { rawEmailRegex } = regexList
    return __rawSearch(
        'email', 
        'You must introduce a valid email.', 
        text, 
        get.email, 
        rawEmailRegex
    )
}

/** Search matches of secure password in the given text (if the text doesn't contain a secure password then throws an error) */
export function securePassword(text:string):SearchResult<GetSecurePasswordResult>{
    const { rawSecurePasswordRegex } = regexList
    return __rawSearch(
        'password', 
        'A secure password must have at least:\n- 8 characters.\n- 1 uppercase letter.\n- 1 lowercase letter.\n- 1 number.', 
        text, 
        get.securePassword, 
        rawSecurePasswordRegex
    )
}

/** Search matches of slugs in the given text (if the text doesn't contain a slug then throws an error) */
export function slug(text:string):SearchResult<GetSlugResult>{
    const { rawSlugRegex } = regexList
    return __rawSearch(
        'slug', 
        'A valid slug can only contain characters [0-9a-fA-F] and can have (but not end in) "-" or "_"', 
        text, 
        get.slug, 
        rawSlugRegex
    )
}

/** Search matches of colors in the given text (if the text doesn't contain a color then throws an error) */
export function color(text:string):SearchResult<GetColorResult>{
    const { rawColor3Regex, rawColor6Regex} = regexList
    return __rawSearch(
        'color',
        'A valid color must have 3 or 6 hexadecimal values [0-9a-fA-F] and start with "#" or "0x"',
        text,
        get.color,
        rawColor3Regex, rawColor6Regex
    )
}

/** Search matches of numbers in the given text (if the text doesn't contain a number then throws an error) */
export function number(text:string):SearchResult<GetNumberResult>{
    const { 
        rawOctalNumberRegex, 
        rawBinaryNumberRegex, 
        rawDecimalNumberRegex, 
        rawHexadecimalNumberRegex
    } = regexList
    return __rawSearch(
        'number',
        'A valid number must be a decimal (without prefix), hexadecimal ("0x" prefix), binary ("0b" prefix) or octal ("0o" prefix) number.', 
        text,
        get.number,
        rawDecimalNumberRegex, rawHexadecimalNumberRegex, rawBinaryNumberRegex, rawOctalNumberRegex
    )
}