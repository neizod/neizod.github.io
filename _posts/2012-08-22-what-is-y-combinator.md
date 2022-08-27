---
title: What is Y Combinator?
tags:
  - Programming
  - Functional
  - Philosophy
  - Python
  - Recursion
  - Computer Science
  - English Post
date: 2012-08-22 13:34:00 +0700
---

Now we can do a [recursion][] on [lambda][] function. (If not, read [the previous entry][self lambda recursion].)

Looking back, we'll see that we have to pass its own function name as an argument to one of its own parameter. (Whoa, what a mouthful to speak!)

``` python
lambda f, x: 1 if x == 0 else x * f(f, x-1)
```

Can we *not* doing that, and just write `f(x-1)` like other normal functions?

Take one step back and re-write the factorial function in a sanity manner.

``` python
f = lambda x: 1 if x == 0 else x * f(x-1)
```

This function works. Since we already reserve the name `f` for it (although not what we want). That is the name `f` must exists in this [scope][] in order for this function to works properly. And there's another way to make `f` exists without allocating the name in the global scope.

``` python
lambda f: lambda x: 1 if x == 0 else x * f(x-1)
```

However, this function will not work right away. To make it works, we have to feed the function as an argument repeatedly. For example, to find $5!$, we have to unroll everything:

``` python
(lambda f: lambda x: 1 if x == 0 else x * f(x-1))(
  (lambda f: lambda x: 1 if x == 0 else x * f(x-1))(
    (lambda f: lambda x: 1 if x == 0 else x * f(x-1))(
      (lambda f: lambda x: 1 if x == 0 else x * f(x-1))(
        (lambda f: lambda x: 1 if x == 0 else x * f(x-1))(
          (lambda f: lambda x: 1 if x == 0 else x * f(x-1))(
            (lambda whatever: 42)
          )
        )
      )
    )
  )
)(5) # i know, its a sin writing lisp-sy code with c style indentation
```

That is we have to write `lambda f: ...` again and again by ourselves. In the case of $5!$, we need to write the function at least five (plus one) times. If the factorial is larger, then we need to write the function repeatedly as many times.

So we need something that can *passing* the definition of this recursive function infinitely many times. This is the core concept of [fixed-point combinator][]. Which we have one of the most famous, the Y combinator, which can be code as this.

``` python
Y = lambda f: (lambda x: f(lambda v: x(x)(v)))(lambda x: f(lambda v: x(x)(v)))
```

Or with the mathematical definition $Y = \lambda f.(\lambda x.f(x\;x))(\lambda x.f(x\;x))$ so we can ditch $v$.

Try applying a function $g$, we'll see that

$$
\begin{align}
Y\;g &= \Big( {\color{blue}\lambda f}.\big(\lambda x.{\color{blue}f}(x\;x)\big) \; \big(\lambda x.{\color{blue}f}(x\;x)\big) \Big) \; {\color{red}g}  \\
     &= \big(\lambda x.{\color{green}g}(x\;x)\big) \; \big(\lambda x.{\color{green}g}(x\;x)\big) \\
     &= \big({\color{blue}\lambda x}.g({\color{blue}x}\;{\color{blue}x})\big) \; {\color{red}\big(\lambda x.g(x\;x)\big)} \\
     &= g\Big( {\color{green}\big(\lambda x.g(x\;x)\big)}\;{\color{green}\big(\lambda x.g(x\;x)\big)} \Big) \\
     &= g\Big( \big(\lambda x.{\color{green}g}(x\;x)\big)\;\big(\lambda x.{\color{green}g}(x\;x)\big) \Big) \\
     &= g\Big( \Big( {\color{blue}\lambda f}. \big(\lambda x.{\color{blue}f}(x\;x)\big)\;\big(\lambda x.{\color{blue}f}(x\;x)\big) \Big) \; {\color{red}g} \Big) \\
     &= g \big( Y\;g \big) \\
     &= g \big( g \big( Y\;g \big) \big) = g \big( g \big( g \big( Y\;g \big) \big) \big) = g \big( g \big( g \big( g \big( \cdots \big) \big) \big) \big).
\end{align}
$$

To apply it in programming, just write:

``` python
(lambda f: (lambda x: f(lambda v: x(x)(v)))(lambda x: f(lambda v: x(x)(v))))( # Y
  lambda factorial:                                  # function name
    lambda n: 1 if n == 0 else n * factorial(n-1)    # function definition
  )(5)                                               # applying argument
```

What about a Fibonacci number...

``` python
(lambda f: (lambda x: f(lambda v: x(x)(v)))(lambda x: f(lambda v: x(x)(v))))(
  lambda fib:
    lambda n: n if n <= 1 else fib(n-1) + fib(n-2)
  )(5)
```

Isn't it easy?



[self lambda recursion]: /2012/08/21/recursion-on-lambda.html

[recursion]: //en.wikipedia.org/wiki/Recursion
[lambda]: //en.wikipedia.org/wiki/Anonymous_function
[scope]: //en.wikipedia.org/wiki/Scope_(computer_science)
[fixed-point combinator]: //en.wikipedia.org/wiki/Fixed-point_combinator
