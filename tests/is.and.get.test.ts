import { get, is } from '../src'
import { data } from './utils'

const ECHO = {
    email: false,
    color: false,
    number: false,
    password: false,
    slug: false
}

test('Is Email', () => {
    data['Is Email'].forEach(test => {
        const isEmail = is.email(test.text)
        ECHO.email && isEmail && console.table(get.email(test.text))
        expect(isEmail).toBe(test.expectedResult)
    })
})

test('Is Color', () => {
    data['Is Color'].forEach(test => {
        const isColor = is.color(test.text)
        ECHO.color && isColor && console.table(get.color(test.text))
        expect(isColor).toBe(test.expectedResult)
    })
})

test('Is Number', () => {
    data['Is Number'].forEach(test => {
        const isNumber = is.number(test.text)
        ECHO.number && isNumber && console.table(get.number(test.text))
        expect(isNumber).toBe(test.expectedResult)
    })
})

test('Is Secure Password', () => {
    data['Is Secure Password'].forEach(test => {
        const isSPassword = is.securePassword(test.text)
        ECHO.password && isSPassword && console.table(get.securePassword(test.text))
        expect(isSPassword).toBe(test.expectedResult)
    })
})

test('Is Slug', () => {
    data['Is Slug'].forEach(test => {
        const isSlug = is.slug(test.text)
        ECHO.slug && isSlug && console.table(get.slug(test.text))
        expect(isSlug).toBe(test.expectedResult)
    })
})