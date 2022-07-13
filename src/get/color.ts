// THIS CODE BELLONG ORIGINALLY IN INDEX.TS, BUT IT BECAME TOO LARGE, THAT IT WAS BETTER TO
// MOVE IT TO IT'S OWN FILE

import { __rawGet } from "./"
import { rawColor3Regex, rawColor6Regex } from "../rawRegexList"

/** Results of the function color() */
export interface GetColorResult {
    /** Detected hexadecimal color */
    match: string

    /** Red component of the color */
    red: {
        /** Red component as an hexadecimal string */
        asString: string

        /** Red component as an integer [0-255] */
        asNumber: number
    } 

    /** Green component of the color */
    green: {
        /** Green component as an hexadecimal string */
        asString: string

        /** Green component as an integer [0-255] */
        asNumber: number
    } 

    /** Blue component of the color */
    blue: {
        /** Blue component as an hexadecimal string */
        asString: string

        /** Blue component as an integer [0-255] */
        asNumber: number
    } 
}

/** Internal function, converts a color length from 1 to 2, and makes it uppercase. 
 * For example: '1' -> '11' or 'a' -> 'AA'
 * If a color has a length of 2, remains the same: '22' -> '22' or 'Ac' -> 'AC'
 */
function __fixComponent(rgorb:string):string{
    return rgorb.length === 1 ? (rgorb + rgorb).toUpperCase() : rgorb.toUpperCase()
}

/** Internal function, converts a color component to integer */
function __toInt(rgorb:string):number{
    return parseInt(__fixComponent(rgorb), 16)
}

/** Internal function, returns a GetHexColorResult based on an RegExpExecArray */
function __getColorResult(results:RegExpExecArray):GetColorResult {
    const [match, red, green, blue] = results

    return {
        match,
        red: {
            asString: __fixComponent(red),
            asNumber: __toInt(red)
        },
        green: {
            asString: __fixComponent(green),
            asNumber: __toInt(green)
        },
        blue: {
            asString: __fixComponent(blue),
            asNumber: __toInt(blue)
        },
    }
}

/** Gets the components of a given hexadecimal color (if the text doesn't contain an hexadecimal color then throws an error) */
export function color(text:string):GetColorResult{
    return __rawGet(
        'color', 
        'A valid color must have 3 or 6 hexadecimal values [0-9a-fA-F] and start with "#" or "0x"', 
        text, 
        __getColorResult, 
        rawColor3Regex, 
        rawColor6Regex
    )
}