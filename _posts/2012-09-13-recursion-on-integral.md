---
title: Recursion on Integral
tags:
  - Factorial
  - Recursion
  - Functional
  - Mathematics
  - English Post
date: 2012-09-13 14:24:00 +0700
---

[Factorial][factorial] is a simple straightforward function. It's the multiplication of integers from $1$ to $n$.

``` haskell
factorial n = product [1..n]
```

That is, by observation, it can be written as a [recursion][].

``` haskell
factorial 1 = 1
factorial n = n * factorial (n - 1)
```

We may add another rule: $0! = 1$, for convenient when writing binomial expansion. Since we do that a lot in probability.

But it still leaves a problem. That is everything we consider is [discrete math][]. So it is impossible for $0.5!$ to be calculated.

Well, if we take a look at usage (mostly related to probability), it might not seems to be a problem at all. But for someone study pure math, there should be something that can answer this question.

---

Luckily (?) that we have a number $e$, with a strange property

$$
e^x = \frac{d}{dx} e^x.
$$

It just like [the fixed-point combinator that I'm talk in previous posts][self y comb]. Just this time we change function call into diff-integral. With the terminate point at

$$
\begin{align}
\int_0^\infty \frac{1}{e^x} \;dx
&= - \frac{1}{e^\infty} + \frac{1}{e^0} \\
&= 1.
\end{align}
$$

That's allow us to write the recursion using integral, like this

$$
\Gamma(n) = \int_0^\infty \frac{1}{e^t} t^{n-1} \;dt.
$$

We may inspect its property by taking integral

$$
\begin{align}
\Gamma(n)
&= \int_0^\infty \frac{1}{e^t} t^{n-1} \;dt \\
&= \int_0^\infty u \;dv
   & (\; \text{let}\; u = \frac{1}{e^t}, dv = t^{n-1} \;dt \;) \\
&= \left[ uv \right]_0^\infty - \int_0^\infty v \;du \\
&= \frac{1}{n} \left( \lim_{t \to \infty} \frac{1}{e^t} t^n - \frac{1}{e^0} 0^n \right) - \int_0^\infty v \;du \\
&= 0 - \int_0^\infty v du \\
&= \frac{1}{n} \int_0^\infty \frac{1}{e^t} t^n \;dt \\
&= \frac{\Gamma(n+1)}{n}.
\end{align}
$$

Thus we see

$$
\begin{align}
\Gamma(1) &= 1 \\
\Gamma(n) &= (n-1) \Gamma(n-1) \\
          &= (n-1)(n-2) \Gamma(n-2) \\
          &= \cdots
\end{align}
$$

Therefore

$$
n! = \Gamma(n+1).
$$

---

Now we equipped with the knowledge for $0.5!$ calculation. That is

$$
\begin{align}
\Gamma(1.5) &= \frac{1}{2} \Gamma\left(\frac{1}{2}\right), \\
\Gamma(0.5) &= \int_0^\infty \frac{1}{e^t} \frac{1}{\sqrt t} \;dt \\
            &= 2 \int_0^\infty \frac{1}{ e^{u^2} } \;du
               & (\; \text{let}\; du = \frac{1}{\sqrt t} \;) \\
            &= \int_{-\infty}^\infty \frac{1}{ e^{u^2} } \;du \\
            &= \sqrt\pi, \\
\Gamma(1.5) &= \frac{\sqrt\pi}{2}.
\end{align}
$$

When we try to find $\Gamma(0.5)$, we need double integral and the change of coordinate. Anyone who's interest can find the detail in the following video.

<iframe width="853" height="480" src="https://www.youtube.com/embed/fWOGfzC3IeY" frameborder="0" allowfullscreen></iframe>

The good thing that we describe it in term of integral is that, if we find it's too hard to analyse, we may use [Riemann integral][] to approximate the result instead.



[self y comb]: /2012/08/22/what-is-y-combinator.html

[factorial]: //en.wikipedia.org/wiki/Factorial
[recursion]: //en.wikipedia.org/wiki/Recursion
[discrete math]: //en.wikipedia.org/wiki/Discrete_mathematics
[Riemann integral]: //en.wikipedia.org/wiki/Riemann_integral
