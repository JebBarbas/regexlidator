/** Results of the function color() */
export interface GetColorResult {
    /** Detected hexadecimal color */
    match: string;
    /** Red component of the color */
    red: {
        /** Red component as an hexadecimal string */
        asString: string;
        /** Red component as an integer [0-255] */
        asNumber: number;
    };
    /** Green component of the color */
    green: {
        /** Green component as an hexadecimal string */
        asString: string;
        /** Green component as an integer [0-255] */
        asNumber: number;
    };
    /** Blue component of the color */
    blue: {
        /** Blue component as an hexadecimal string */
        asString: string;
        /** Blue component as an integer [0-255] */
        asNumber: number;
    };
}
/** Gets the components of a given hexadecimal color (if the text doesn't contain an hexadecimal color then throws an error) */
export declare function color(text: string): GetColorResult;
