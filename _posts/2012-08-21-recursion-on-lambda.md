---
title: Recursion on Lambda Function
tags:
  - Programming
  - Functional
  - Philosophy
  - Python
  - Recursion
  - Computer Science
  - English Post
date: 2012-08-21 00:04:00 +0700
---

Dig deep down into the [functional programming][], one might ask

{: .quote}
> "Can we do a [recursion][] on a [lambda][] function?"

At first glance it seems impossible. Since functions defined via lambda are anonymous. But to recurse we need them to have name. Ditch the recursion aspect for now. Take a look at this very simple function take a number and return a it's square.

``` python
(lambda x: x**2)(5)
```

It is the simplest form. Now, how about adding an *unused* parameter to the function.

``` python
(lambda w, x: x**2)(999, 5)
```

In this case, we just simply ignore the number `999` that stored as an argument of `w`... And it is the end of the road if we aren't notice that `w` can be anything, not only a number (as a data point). That is we can feed another lambda function in to it.[^1]

``` python
(lambda w, x: x**2)(lambda u: 42, 5)
```

So, lambda function need not to be anonymous. Yes, it might be anonymous in some [scope][]. But for the larger scope than itself, we can give it a name! Here, lets consider a slightly different version with altered parameter name such that we feed in the square function as the first argument.

``` python
(lambda g, y: y**2)(lambda x: x**2, 5)
```

We'll see that the number `5` is stored at `y`. We then find `y**2` from the outer function, failing to utilize `lambda x: x**2` yet. To use `lambda x: x**2`, observe that it is now called `g`, so we can apply `5` to the `lambda x: x**2`, like this.

``` python
(lambda g, y: g(y))(lambda x: x**2, 5)
```

Yes. We did it. We can use `lambda x: x**2` in the larger scope now. However, it is still not useful in the aspect of recursion. Since recursion required a function to call itself in *the same* scope. One way to do it is to pass `lambda x: x**2` on and on, keeping it alive.

``` python
(lambda g, y: g(g, y))(lambda f, x: x**2, 5)
```

Just this and the scope of `lambda f, x: x**2` is populate with the name of itself (name `f`). Now we can try writing a recursive function. Maybe a simple factorial function.

``` python
(lambda g, y: g(g, y))(lambda f, x: 1 if x == 0 else x * f(f, x-1), 5)
```

Observe that to write a recursion with this lambda technique, we have to pass its name as an argument to its own parameter.


[^1]: In functional programming, a function is [first-class][], that is we can pass the function around anywhere anytime. Unlike the antique C that we cannot directly feed a function as an argument to other function.



[functional programming]: //en.wikipedia.org/wiki/Functional_programming
[recursion]: //en.wikipedia.org/wiki/Recursion
[lambda]: //en.wikipedia.org/wiki/Anonymous_function
[scope]: //en.wikipedia.org/wiki/Scope_(computer_science)
[first-class]: //en.wikipedia.org/wiki/First-class_function

