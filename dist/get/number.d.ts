/** Results of the function number() */
export interface GetNumberResult {
    /** Detected number */
    match: string;
    /** The number type of the number (binary, octal, hexadecimal, decimal) */
    type: string;
    /** The true value of the number as a decimal */
    value: number;
    /** Integer part of the value */
    integerValue: number;
    /** The value after the point, (if the value is 1.445) this will be 445 for example */
    rest: number;
}
/** Gets the components of a given number (if the text doesn't contain a number or this number has inconsistencies then throws an error) */
export declare function number(text: string): GetNumberResult;
