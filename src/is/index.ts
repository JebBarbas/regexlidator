import * as rawRegexList from '../rawRegexList'
import { toRegExp } from '../utils'

/** Checks if the given string matchs a given regex, it trims the value and checks if the
 * whole string matches; if you want to check if the string contains something, use has() instead.
 * (used to check if some string is for instance, an email, password, color, etc...) 
 * @example
 * is.email('myEmail@something.com ') // will be true
 * is.email('myEmail: myEmail@something.com') // will be false, because the whole string ISNT an email
 * is.number('   10') // will be true, 10 is a number
 * is.number('10p0') // will be false, 10 matches a number, but the whole string ('10p0') ISNT a number
 * */
export function is(text:string, ...rawRegexps:string[]):boolean{
    const cleanText = text.trim()
    return rawRegexps.some(rawRegExp => toRegExp(rawRegExp, 'is').test(cleanText))
}

/** Checks if a given text is a valid email */
export function email(text:string){
    const { rawEmailRegex } = rawRegexList
    return is(text, rawEmailRegex)
}

/** Checks if a given text is a valid secure password, a secure password must have at least:
 * - 8 characters
 * - 1 uppercase letter
 * - 1 lowercase letter
 * - 1 number
 */
export function securePassword(text:string){
    const { rawSecurePasswordRegex } = rawRegexList
    return is(text, rawSecurePasswordRegex)
}

/** Checks if a given text is a valid hexadecimal color with 3 or 6 digits (plus the "#" or "0x") */
export function color(text:string){
    const { rawColor3Regex, rawColor6Regex } = rawRegexList
    return is(text, rawColor3Regex, rawColor6Regex)
}

/** Checks if a given text is a valid slug (for URLs, usernames, file names, etc...) */
export function slug(text:string){
    const { rawSlugRegex } = rawRegexList
    return is(text, rawSlugRegex)
}

/** Checks if the given text is a valid number (can be hexadecimal with prefix "0x", octal with prefix "0o", binary with prefix "0b" or decimal without prefix) */
export function number(text:string){
    const {
        rawDecimalNumberRegex, 
        rawHexadecimalNumberRegex,  
        rawBinaryNumberRegex,
        rawOctalNumberRegex
    } = rawRegexList
    return is(text, rawDecimalNumberRegex, rawHexadecimalNumberRegex, rawBinaryNumberRegex, rawOctalNumberRegex)
}