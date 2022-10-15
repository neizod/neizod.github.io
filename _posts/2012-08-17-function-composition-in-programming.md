---
title: Function Composition and Programming
tags:
  - Programming
  - Functional
  - Mathematics
  - Haskell
  - Computer Science
  - English Post
date: 2012-08-17 15:42:00 +0700
---

In high school math, we might have seen functions that are written in the form of $g \circ f$. Which is just

$$
(g \circ f) (x) = g(f(x)).
$$

(a full definition is, if $f: X \to Y$ and $g: Y \to Z$, then $g \circ f: X \to Z$ -- so that we may exclude $x$ from the description)

In programming (especially functional), we often passing values over functions continuously. That is we take an output from one function to feed in as an input to other function in the chain.

In other words, with this code.

``` python
first_input = x
first_output = f(first_input)
second_input = first_output
second_output = g(second_input)
y = second_output
```

Or reducing everything to save variables/functions naming.

``` python
y = g(f(x))
```

The question is, if we want to declared this chain of functions *without* applying the argument right away. How can we do that?

One way to do that, by using lambda.

``` python
h = lambda x: g(f(x))
```

So now we may call this later.

``` python
y = h(x)
```

Simple thought, but why use `lambda` anyway?

In imperative languages, there might be no other choices. But for functional languages like Haskell, we can just write this.

``` haskell
let h = g . f
```

It is just $g \circ f$ that we've seen before! And just call it with this.

``` haskell
h x
```

We might also abandon $h$ completely when we want to run it right away.

``` haskell
(g . f) x
```

Wow... This is mathematics!!
