export interface Test {
    text: string
    expectedResult: boolean
}

export function newTest(text:string, expectedResult:boolean):Test{ return { text, expectedResult } }

export const data = {
    'Is Email': [
        newTest('testtest@gmail.com', true),
        newTest('test@com', false),
        newTest('testwithmore.25@university.edu.mx', true),
        newTest('thismustnotpass24.com', false)
    ],
    'Is Color': [
        newTest('#abc', true),
        newTest('0x45642a', true),
        newTest('0xAAA', true),
        newTest('#123456', true),
        newTest('345', false),
        newTest('FF69BF', false),
        newTest('RRGGBB', false),
        newTest('#XXYYZZ', false)
    ],
    'Is Number': [
        newTest('134', true),
        newTest('134.24', true),
        newTest('.24', true),

        newTest('0xAF', true),
        newTest('0xAF.C', true),
        newTest('0x.C', true),

        newTest('0o15', true),
        newTest('0o15.7', true),
        newTest('0o.7', true),

        newTest('0b1110111', true),
        newTest('0b1110111.110', true),
        newTest('0o.110', true),

        newTest('dari', false),
        newTest('diez', false),
        newTest('10e5', false)
    ],
    'Is Secure Password': [
        newTest('12345678', false),
        newTest('Pa$$w0rd', true),
        newTest('myOwnPassword1', true),
        newTest('facebook123', false),
        newTest('VerySecurePa$$word', false),
        newTest('Thi$isnotmyPASSW0RD', true)
    ],
    'Is Slug': [
        newTest('super-cool-sample', true),
        newTest('follow_me_2003', true),
        newTest('SUPER_pizza_2', false),
        newTest('sigma-', false),
        newTest('pa$$word-h4cker', false),
        newTest('', false)
    ]
}


export const data2 = {
    'Has Email': [
        newTest('testtest@gmail.com muchotexto algo@otro.com', true),
        newTest('test@com regexlidator@npmjs.com', true),
        newTest('My email is: regexlidator@university.npm.com, send me a message!!!', true),
        newTest('thismustnotpass24@ gmail.com', false)
    ],
    'Has Color': [
        newTest('My favorite color is #FF69BF, so send me my color', true),
        newTest('#ABC 0xcba', true),
        newTest('#FFFFFF and #000000', true),
        newTest('# FF FF FF', false),
    ],
    'Has Number': [
        newTest('Alexa, add 5.49 + 0xA.BC', true),
        newTest('123 321 01', true),
        newTest('0.24 minus .24', true),
    ],
    'Has Secure Password': [
        newTest('My password is: Pa$$w0rd (keep it a secret)', true),
        newTest('myOwnPassword1 Thi$isnotmyPASSW0RD', true),
        newTest('F acebook123', true),
    ],
    'Has Slug': [
        newTest('please add the site super-cool-sample', true),
        newTest('follow_me_2003 SUPER_pizza_2', true),
        newTest('sigma- b', true),
        newTest('pa$$word-h4cker', true),
    ]
}
