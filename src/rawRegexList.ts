export const rawEmailRegex = "([a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*)@((?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)"

export const rawSecurePasswordRegex = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"

export const rawColor3Regex = "(?:#|0x)([a-f0-9A-F])([a-f0-9A-F])([a-f0-9A-F])\\b" 
export const rawColor6Regex = "(?:#|0x)([a-f0-9A-F]{2})([a-f0-9A-F]{2})([a-f0-9A-F]{2})\\b"

export const rawSlugRegex = "[a-z0-9]+(?:[-_][a-z0-9]+)*"

export const rawBinaryNumberRegex = "(0b)(?:([01]*)(?:\\.([01]+))|([01]+))"
export const rawOctalNumberRegex = "(0o)(?:([0-7]*)(?:\\.([0-7]+))|([0-7]+))"
export const rawDecimalNumberRegex = "()(?:([0-9]*)(?:\\.([0-9]+))|([0-9]+))"
export const rawHexadecimalNumberRegex = "(0x)(?:([0-9a-fA-F]*)(?:\\.([0-9a-fA-F]+))|([0-9a-fA-F]+))"