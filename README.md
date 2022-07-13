# Regexlidator 

Validate or get the parts of some patterns using regular expressions

I made this package to validate strings using regular expressions, the package contains 4 main 
objects: `is`, `get`, `has` and `search`; and every object has this functions:
- `email()`.
- `number()`.
- `securePassword()`.
- `color()`.
- `slug()`.

## Instalation

```
npm i regexlidator
```

## Status

This package is published, but I've never used it in a big project and, besides I tested it
with some examples, I don't know the limits in the package, soo... It works fine, but if you
detect some bug, please let me know so I can fix it.

## Is

The `is` object validates if a given string IS something (checks the whole string), for instance: "#FFF" is
a color, but "Fav: #FFF" isn't besides it contains a color in it, "somemail@npm.com    " is an email (besides 
it has white spaces at the end), but "mail.com" (because it doesn't has the @) and "myemail @gmail.com" isn't
an email neither, because there is a space in the middle.

The objective of `is` to validate a small string, if your objective is validate if a bigger text has
(contains) something, maybe you're looking for `has`.

```js
is.color('#FFF') // true
is.color('Fav: #FFF') // false

is.email('somemail@npm.com    ') // true
is.email('mail.com') // false
is.email('myemail @gmail.com') // false

// Other functions
is.number('12')
is.slug('chocolate-cake')
is.securePassword('Passw0rd')
```

## Has

The `has` object validates if a text has (contains) something, for instance, besides the sentence
"The code of my favorite color is #FF69Bf and I hate 0x111" is obviously not a color, it HAS colors
in it.

```js
has.email('Email: someone@example.com') // true
has.color('My favorite color is: #Fc0') // true
has.number('I love the number ten') // false, "ten", is not a valid number
has.slug('regexlidator') // true
has.securePassword('password') // false 
```

## Get

The `get` object is helpful when you want to get some components of a string, it first checks if the string
IS something, then returns the match and components of the thing.

```js
get.color('#FF00CC      ').red.asNumber // 255. Matches #FF00CC and can return the red, blue or green components
get.email('   someone@example.com   ').domain // 'example.com'. Matches someone@example.com and can return the predomain (someone) and domain (example.com)
get.number('123.4').value // 124.4. Matches 123.4 and can return the total value, the integer part or the rest.

// get.slug() and get.securePassword() only can return an object with a property "match" (the other functions also returns a match property) that is basically, the input given once trimed. Or throws an error if the parameter isn't a slug or securePassword
```

## Search

The `search` object search matches across all the text, and returns an object, where the property
`matches` is an array with all the matches found in the text, the property `gets` is and array of results
of execute the get correspondient function (for example, if you use search.color(), then search.color().gets 
is an array of the results of using get.color(), so you can get, for example, the red value of the second 
color like this: `search.color().gets[1].red.asNumber`); and the property `first` that is the same as the
first element of the gets array (For example if you want to get the value of the first number, use
search.number().first.value).

```js
const colors = "#FF0000 #CC0 0x87FFcC"
const gotColors = search.color(colors).gets 

const redValues = gotColors.map(gotColor => gotColor.red.asNumber) // [255, 204, 135]
const averageRed = reds.reduce((prev, current) => prev + current, 0) / reds.length // 198
```