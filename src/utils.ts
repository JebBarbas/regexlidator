export class RegExpError extends Error {
    code:string
    description:string
    
    constructor(code:string, message:string, description: string){
        super(message)
        this.code = code
        this.name = "RegExpError"
        this.description = description
    }
}

/** Thows an error */
export function fail(code:string, message:string, description: string):never{
    throw new RegExpError(code, message, description)
}

/** Converts a raw regexp to a regexp, this is useful to save all the raw regexps in one file,
 * and, deppending in what do you need, add some flags or symbols
 */
export function toRegExp(rawRegExp:string, use:'is'|'contains'|'get'|'search'|'replace'):RegExp{
    if(use === 'is' || use === 'get') return new RegExp(`^(?:${rawRegExp})$`, 'g')
    if(use === 'replace' || use === 'search' || use === 'contains') return new RegExp(rawRegExp, 'gm')
    return new RegExp(rawRegExp)
}