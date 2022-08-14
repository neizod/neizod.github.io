---
title: FizzBuzz and Composite Function in Haskell
tags:
  - Haskell
  - Functional
  - Programming
  - Mathematics
  - Computer Science
  - Programming Interview Question
  - English Post
date: 2018-10-21 03:29:38 +0700
---

FizzBuzz might be the most popular basic programming interview problem (knowing only [syntax][] but not advance algorithm). It ask only the output transformation of an integer. The rule is super simple: if the number is divided by three, answer "Fizz", divided by five, answer "Buzz", divided by both then "FizzBuzz", otherwise just return the number as-is.

{: .oversized}
> | **number** | 1 | 2 | 3    | 4 | 5    | 6    | 7 | ... | 14 | 15       | 16 | ... |
> | **answer** | 1 | 2 | Fizz | 4 | Buzz | Fizz | 7 | ... | 14 | FizzBuzz | 16 | ... |

We may code it in some form of the simple if-else, like this

``` haskell
fizzBuzz number
  | mod number 15 == 0 = "FizzBuzz"
  | mod number  3 == 0 = "Fizz"
  | mod number  5 == 0 = "Buzz"
  | otherwise          = show number
```

And that's it... However, why stop there? Recalled that Haskell have the concept of [composite function][], like in the real mathematics, that let us define function without parameter! What will FizzBuzz that employed that technique will looks like?

---

After some walk, I just realize that the composite function is just a passing intermediate results. That is we will lose the information of the first parameter `number`. To fix this, we have to duplicate `number` multiple times and passing it down the factory line (some get changed and some don't). And finally, we just combine all of the results...

Sound familiar? That is the old friend map-reduce! Except this time we swap map's arguments, so it acted on the single data with many different functions instead.

Thus, the code should be in the form of

``` haskell
fizzBuzz number = reduce f0 (map (`id` number) [f1, f2, f3, ...])
```

Since we also want the final function to be the composite function, we'll *nudge* the variable `number` to the rightmost position on the RHS. Which might be done via `flip`, like this

``` haskell
fizzBuzz number = reduce f0 (flip map [f1, f2, f3, ...] (`id` number))
```

It's the matter of dealing with parenthesis. That is we can use composite function to change its look and make the variable `number` *free*.

``` haskell
fizzBuzz number = reduce f0 . flip map [f1, f2, f3, ...] . flip id $ number
```

And voilà! Now we may remove `number` from both side of the equation

``` haskell
fizzBuzz = reduce f0 . flip map [f1, f2, f3, ...] . flip id
```

---

Cut-in spoiler: when we look in to the future, we'll see that the technique of *reversed mapping* is something that keep reoccurring. Thus it is not a bad idea to define this concept as a function too! That is we might substitute some parts of the above equation with

``` haskell
distribute fs = flip map fs . flip id
```

Or defined the function in the way that not require parameters

``` haskell
distribute = flip (.) (flip id) . flip map
```

---

So now it's time to design the reduce function (and corresponding functions). One of the possible design might looks like this

``` haskell
f1 :: Int -> String -- output Fizz, Buzz, or FizzBuzz; according to rules.
                    -- otherwise output empty string.
f2 :: Int -> String -- output the number in string (acted as default case).
f0 :: [String] -> String -- output first non-empty string, in other words:
                         -- output f1 if it has some value, otherwise f2.
fizzBuzz = reduce f0 . distribute [f1, f2]
```

The most complicate function for mapping must be `f1`. We'll start by considering only the case of divided by three (the Fizz). Which might be done via

``` haskell
f1 n = (["Fizz",""] !!) $ fromEnum $ not $ (== 0) $ (mod n 3)
```

We'll refrain from [ctrl-c ctrl-v][copy-paste engineering] the code to let it handle Buzz. Instead, we'll do

``` haskell
say word m n = ([word,""] !!) $ fromEnum $ not $ (== 0) $ (mod n m)
f1 = foldr1 (++) . distribute [say "Fizz" 3, say "Buzz" 5]
```

Observe that at the end of `say` it use `mod`, which is a function that takes two arguments. But to use composite function, all intermediate functions must have an interface of one parameter... Thus the `curry` save the day (then `uncurry` later).

``` haskell
index = fromEnum . not . (== 0)
say word = curry (([word,""] !!) . index . uncurry (flip mod))
```

To eliminate the variable `word`, we use `flip` technique like before

``` haskell
say = curry . flip (.) (index . uncurry (flip mod)) . (!!) . (:[""])
```

---

Congratulations reaching here! The rest is just a walk in the garden. Since, you may already guess that, `reduce f0` is just `head . dropWhile null`. And `f2` is the built-in `show`.

Thus the final code that are parameter free is

``` haskell
distribute :: [a -> b] -> a -> [b]
distribute = flip (.) (flip id) . flip map

index :: Int -> Int
index = fromEnum . not . (== 0)

say :: String -> Int -> Int -> String
say = curry . flip (.) (index . uncurry (flip mod)) . (!!) . (:[""])

rules :: Int -> String
rules = foldr1 (++) . distribute [say "Fizz" 3, say "Buzz" 5]

fizzBuzz :: Int -> String
fizzBuzz = head . dropWhile null . distribute [rules, show]
```

Um... why going the extra mile 😂

P.S. it just easy to append `rules` list, like by adding `say "Up" 7`, some answer became

{: .oversized}
> | **number** | 7  | 21     | 35     | 105        |
> | **answer** | Up | FizzUp | BuzzUp | FizzBuzzUp |


[composite function]: /2012/08/17/function-composition-in-programming.html

[syntax]: //en.wikipedia.org/wiki/Syntax
[copy-paste engineering]: //en.wikipedia.org/wiki/Copy_and_paste_programming
