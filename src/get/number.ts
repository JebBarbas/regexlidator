// THIS CODE BELLONG ORIGINALLY IN INDEX.TS, BUT IT BECAME TOO LARGE, THAT IT WAS BETTER TO
// MOVE IT TO IT'S OWN FILE

import { 
    rawBinaryNumberRegex, 
    rawOctalNumberRegex, 
    rawDecimalNumberRegex, 
    rawHexadecimalNumberRegex 
} from "../rawRegexList"
import { __rawGet } from './'

/** Results of the function number() */
export interface GetNumberResult{
    /** Detected number */
    match: string

    /** The number type of the number (binary, octal, hexadecimal, decimal) */
    type: string

    /** The true value of the number as a decimal */
    value: number

    /** Integer part of the value */
    integerValue: number

    /** The value after the point, (if the value is 1.445) this will be 445 for example */
    rest: number
}

/** Internal function to get the number type name and radix based in prefix */
function __toType(prefix:string):[string, number]{
    if(prefix === '0x') return ['hexadecimal', 16]
    if(prefix === '0b') return ['binary', 2]
    if(prefix === '0o') return ['octal', 8]
    return ['decimal', 10]
}

/** Internal function to convert the number to its value */
function __toValue(int:string, rest:string, radix:number){
    return parseInt(int, radix) + __toDecimalFraction(rest, radix)
}

/** Internal function that converts the a number after decimal point to a fraction
 * @example
 * in (0.1) "1" -> 1/10 -> 0.1 (in decimal returns the same)
 * in (0.12) "12" -> 12/100 (10^2) (stays the same)
 * in (0x0.A) "A" -> 11/16 -> 0.6875
 * in (0x0.FFE) -> 4094/4096 (16^3) -> 0.9995
 */
function __toDecimalFraction(rest:string, radix:number){
    const numerator = parseInt(rest, radix)
    const denominator = radix ** (rest.length)
    return numerator / denominator
}

/** Internal function to get the results based on the successful regex */
function __getNumberResult(results:RegExpExecArray):GetNumberResult{
    const [match, prefix, integerPart, restPart, onlyIntegerPart] = results
    const [name, radix] = __toType(prefix)

    const int = onlyIntegerPart || integerPart || '0'
    const rest = restPart || '0'

    return {
        match,
        type: name,
        value: __toValue(int, rest, radix),
        integerValue: parseInt(int, radix),
        rest: __toDecimalFraction(rest, radix)
    }
}

/** Gets the components of a given number (if the text doesn't contain a number or this number has inconsistencies then throws an error) */
export function number(text:string):GetNumberResult{
    return __rawGet(
        'number', 
        'A valid number must be a decimal (without prefix), hexadecimal ("0x" prefix), binary ("0b" prefix) or octal ("0o" prefix) number.', 
        text, 
        __getNumberResult, 
        rawDecimalNumberRegex, rawHexadecimalNumberRegex, rawBinaryNumberRegex, rawOctalNumberRegex
    )
}