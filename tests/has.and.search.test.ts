import { search, has } from '../src'
import { data2 } from './utils'

const ECHO = {
    email: true,
    color: true,
    number: true,
    password: true,
    slug: true
}

test('Has Email', () => {
    data2['Has Email'].forEach(test => {
        const hasEmail = has.email(test.text)
        ECHO.email && hasEmail && console.table(search.email(test.text).matches)
        expect(hasEmail).toBe(test.expectedResult)
    })
})

test('Has Color', () => {
    data2['Has Color'].forEach(test => {
        const hasColor = has.color(test.text)
        ECHO.color && hasColor && console.table(search.color(test.text).matches)
        expect(hasColor).toBe(test.expectedResult)
    })
})

test('Has Number', () => {
    data2['Has Number'].forEach(test => {
        const hasNumber = has.number(test.text)
        ECHO.number && hasNumber && console.table(search.number(test.text).matches)
        expect(hasNumber).toBe(test.expectedResult)
    })
})

test('Has Secure Password', () => {
    data2['Has Secure Password'].forEach(test => {
        const hasSPassword = has.securePassword(test.text)
        ECHO.password && hasSPassword && console.table(search.securePassword(test.text).matches)
        expect(hasSPassword).toBe(test.expectedResult)
    })
})

test('Has Slug', () => {
    data2['Has Slug'].forEach(test => {
        const hasSlug = has.slug(test.text)
        ECHO.slug && hasSlug && console.table(search.slug(test.text).matches)
        expect(hasSlug).toBe(test.expectedResult)
    })
})