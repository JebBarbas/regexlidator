import * as rawRegexList from '../rawRegexList'
import { toRegExp } from '../utils'

/** Checks if the given text has a word that matches a regex. 
 * (used to check if some string contains an email, password, color, etc...) 
*/
export function has(text:string, ...rawRegexps:string[]):boolean{
    return rawRegexps.some(rawRegExp => {
        let matches = text.match(toRegExp(rawRegExp, 'contains'))
        matches ??= []

        return matches.length > 0
    })
}

/** Checks if a given text has a valid email */
export function email(text:string){
    const { rawEmailRegex } = rawRegexList
    return has(text, rawEmailRegex)
}

/** Checks if a given text has a valid secure password, a secure password must have at least:
 * - 8 characters
 * - 1 uppercase letter
 * - 1 lowercase letter
 * - 1 number
 */
export function securePassword(text:string){
    const { rawSecurePasswordRegex } = rawRegexList
    return has(text, rawSecurePasswordRegex)
}

/** Checks if a given text has a valid hexadecimal color with 3 or 6 digits (plus the "#" or "0x") */
export function color(text:string){
    const { rawColor3Regex, rawColor6Regex } = rawRegexList
    return has(text, rawColor3Regex, rawColor6Regex)
}

/** Checks if a given text has a valid slug (for URLs, usernames, file names, etc...) */
export function slug(text:string){
    const { rawSlugRegex } = rawRegexList
    return has(text, rawSlugRegex)
}

/** Checks if the given text has a valid number (can be hexadecimal with prefix "0x", octal with prefix "0o", binary with prefix "0b" or decimal without prefix) */
export function number(text:string){
    const {
        rawDecimalNumberRegex, 
        rawHexadecimalNumberRegex,  
        rawBinaryNumberRegex,
        rawOctalNumberRegex
    } = rawRegexList
    return has(text, rawDecimalNumberRegex, rawHexadecimalNumberRegex, rawBinaryNumberRegex, rawOctalNumberRegex)
}