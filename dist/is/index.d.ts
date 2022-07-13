/** Checks if the given string matchs a given regex, it trims the value and checks if the
 * whole string matches; if you want to check if the string contains something, use has() instead.
 * (used to check if some string is for instance, an email, password, color, etc...)
 * @example
 * is.email('myEmail@something.com ') // will be true
 * is.email('myEmail: myEmail@something.com') // will be false, because the whole string ISNT an email
 * is.number('   10') // will be true, 10 is a number
 * is.number('10p0') // will be false, 10 matches a number, but the whole string ('10p0') ISNT a number
 * */
export declare function is(text: string, ...rawRegexps: string[]): boolean;
/** Checks if a given text is a valid email */
export declare function email(text: string): boolean;
/** Checks if a given text is a valid secure password, a secure password must have at least:
 * - 8 characters
 * - 1 uppercase letter
 * - 1 lowercase letter
 * - 1 number
 */
export declare function securePassword(text: string): boolean;
/** Checks if a given text is a valid hexadecimal color with 3 or 6 digits (plus the "#" or "0x") */
export declare function color(text: string): boolean;
/** Checks if a given text is a valid slug (for URLs, usernames, file names, etc...) */
export declare function slug(text: string): boolean;
/** Checks if the given text is a valid number (can be hexadecimal with prefix "0x", octal with prefix "0o", binary with prefix "0b" or decimal without prefix) */
export declare function number(text: string): boolean;
