/** Checks if the given text has a word that matches a regex.
 * (used to check if some string contains an email, password, color, etc...)
*/
export declare function has(text: string, ...rawRegexps: string[]): boolean;
/** Checks if a given text has a valid email */
export declare function email(text: string): boolean;
/** Checks if a given text has a valid secure password, a secure password must have at least:
 * - 8 characters
 * - 1 uppercase letter
 * - 1 lowercase letter
 * - 1 number
 */
export declare function securePassword(text: string): boolean;
/** Checks if a given text has a valid hexadecimal color with 3 or 6 digits (plus the "#" or "0x") */
export declare function color(text: string): boolean;
/** Checks if a given text has a valid slug (for URLs, usernames, file names, etc...) */
export declare function slug(text: string): boolean;
/** Checks if the given text has a valid number (can be hexadecimal with prefix "0x", octal with prefix "0o", binary with prefix "0b" or decimal without prefix) */
export declare function number(text: string): boolean;
