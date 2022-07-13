import * as regexList from '../rawRegexList'
import { fail, toRegExp } from '../utils'

// EXPORTS FROM OTHER FILES
export { color, GetColorResult } from './color'
export { number, GetNumberResult } from './number'

/** Makes the thing that the description of get does, but this is an internal function used to
 * add codes to the errors
 * Please dont use this function unless you're adding new gets, use get() instead.
 */
export function __rawGet<T>(
    codeName: string, 
    failDescription: string, 
    text: string, 
    getterFunc: (results:RegExpExecArray)=>T,
    ...rawRegExps:string[]
){
    const cleanText = text.trim()

    let rawRegExp:string
    for(rawRegExp of rawRegExps){
        const results = toRegExp(rawRegExp, 'get').exec(cleanText)
        if(results) return getterFunc(results)
    }

    // Replace empty string with get
    codeName = `regexlidator/invalid-${codeName || 'get'}`
    
    const message = codeName ? `The given text isn't a valid ${codeName}` : `The given text doesn't match any given regex`
    
    failDescription ||= 'Maybe you are trying to find something in a larger string, try using search() instead.'

    fail(codeName, message, failDescription)
}

/** Gets the components of a given string, only if the given string IS that type
 * if you want to get the components of some string that contains that, use search() instead.
 * @example
 * get.email('myEmail@gmail.com').domain // will return 'gmail.com' because the whole string is an email
 * get.slug('$$$_creator').match // will throw an error, because, besides 'creator' is a valid slug, the whole string ('$$$_creator') ISNT
 * get.number('0a10').value // will return an error, because, besides '0' is a valid number, '0a10' ISNT. 
*/
export function get<T>(
    text: string, 
    getterFunc: (results:RegExpExecArray)=>T,
    ...rawRegExps: string[]
){
    return __rawGet<T>('', '', text, getterFunc, ...rawRegExps)
}

/** Results of the function email() */
export interface GetEmailResult {
    /** Detected email */
    match: string

    /** All the text before the "@" */
    predomain: string

    /** All the text after the "@" */
    domain: string
}

/** Results of the function securePassword() */
export interface GetSecurePasswordResult {
    /** Detected password */
    match: string
}

/** Results of the function slug() */
export interface GetSlugResult {
    /** Detected slug */
    match: string
}

/** Gets the components of a given email (if the text doesn't contain an email then throws an error) */
export function email(text:string):GetEmailResult{
    const { rawEmailRegex } = regexList
    return __rawGet(
        'email', 
        'You must introduce a valid email.', 
        text, 
        results => {
            const [match, predomain, domain] = results
            return { match, predomain, domain}
        }, 
        rawEmailRegex
    )
}

/** Gets the components of a given password (if the text doesn't contain a secure password then throws an error) */
export function securePassword(text:string):GetSecurePasswordResult{
    const { rawSecurePasswordRegex } = regexList
    return __rawGet(
        'password', 
        'A secure password must have at least:\n- 8 characters.\n- 1 uppercase letter.\n- 1 lowercase letter.\n- 1 number.', 
        text, 
        results => {
            const [ match ] = results
            return { match }
        }, 
        rawSecurePasswordRegex
    )
}

/** Gets the components of a given slug (if the text doesn't contain a slug then throws an error) */
export function slug(text:string):GetSlugResult{
    const { rawSlugRegex } = regexList
    return __rawGet(
        'slug', 
        'A valid slug can only contain characters [0-9a-fA-F] and can have (but not end in) "-" or "_"', 
        text, 
        results => {
            const [ match ] = results
            return { match }
        }, 
        rawSlugRegex
    )
}