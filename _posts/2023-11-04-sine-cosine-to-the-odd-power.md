---
title: Sine/cosine to the odd powers
tags:
  - Trigonometry
  - Induction
  - Pascal's Triangle
  - Complex Number
  - Mathematics
  - English Post
date: 2023-11-04 11:19:34 +0700
---

It's almost a coincidence that

$$
\sin^3 \theta = \frac{3\sin \theta - \sin 3\theta}4.
$$

This equation alone clearly begging us to explore more. *Why* it possess such a simple form (to the point that *is* it really correct), can it be *generalize*, etc.

The first question is practically trivial, just apply our favorite identities

$$
\begin{align}
\sin(\alpha\pm\beta) &= \sin\alpha\cos\beta\pm\sin\beta\cos\alpha, \\
\cos(\alpha\pm\beta) &= \cos\alpha\cos\beta\mp\sin\alpha\sin\beta,
\end{align}
$$

alongside with the $1 = \sin^2\theta + \cos^2\theta$. The result should sprung out in no time!

In fact, some textbook does include these identities for $\sin k\theta$ for some small $k\in\mathbb{N}$. If we try to enumerate further, we'll see that

$$
\begin{align}
\sin 2\theta &= 2\sin\theta\cos\theta, \\
\sin 3\theta &= 3\sin\theta - 4\sin^3\theta, \\
\sin 4\theta &= 4\sin\theta\cos^3\theta - 4\sin^3\theta\cos\theta, \\
\sin 5\theta &= 5\sin\theta\cos^4\theta - 10\sin^3\theta\cos^2\theta + \sin^5\theta,
\end{align}
$$

which quite get us nowhere. As $\sin3\theta$ is the only line which broke the pattern by having only sine function. Also other line seems to have no pattern at all.

It turns out that we shouldn't rush applying the Pythagorean identity, $\sin3\theta$ should be express as just

$$
\sin 3\theta = 3\sin\theta\cos^2\theta - \sin^3\theta.
$$

Working with sine function alone feels *incomplete*. We should not forget its twin function, cosine, which possess a more regulated structure

$$
\begin{align}
\cos 2\theta &= \cos^2\theta - \sin^2\theta, \\
\cos 3\theta &= \cos^3\theta - 3\cos\theta\sin^2\theta, \\
\cos 4\theta &= \cos^4\theta - 6\cos^2\theta\sin^2\theta + \sin^4\theta, \\
\cos 5\theta &= \cos^5\theta - 10\cos^3\theta\sin^2\theta + 5\cos\theta\sin^4\theta.
\end{align}
$$

Actually, if we combine them together, it obvious that we'll have some kind of binomial expansion. Only that the sign of each term seems wrong (two positive then two negative). We also have to partition alternate term for cosine and sine. Thus makes a cycle of of length four. This task suite perfectly for the imaginary number because $i^2=-1$. That is

$$
\begin{align}
{\color{blue}\cos n\theta} + {\color{red}i\sin n\theta}
&= {\color{blue}\cos^n\theta}
 + {\color{red}i\binom{n}{1}\cos^{n-1}\theta\sin\theta}
 - {\color{blue}\binom{n}{2}\cos^{n-2}\theta\sin^2\theta}
 - \cdots
\pm \sin^n\theta \\
&= \sum_{k=0}^n i^k\binom{n}{k}\cos^{n-k}\theta\sin^k\theta \\
&= \left( {\color{blue}\cos \theta} + {\color{red}i\sin \theta} \right)^n.
\end{align}
$$

Which is, exactly, [de Moivre's formula][].

---

The generalization on angle multiplication is nice and all (and, in term of practical usage, calculation for exponentiation is a lot easier than messing around angles of multiple sizes).

Nonetheless, generalization on exponentiation should not be overlooked, since they may reveal some beautiful structure. By computing some sample, we have these cosine to the power of odd

$$
\begin{align}
4\cos^3\theta &= \cos3\theta + 3\cos\theta, \\
16\cos^5\theta &= \cos5\theta + 5\cos3\theta + 10\cos\theta, \\
64\cos^7\theta &= \cos7\theta + 7\cos5\theta + 21\cos3\theta + 35\cos\theta, \\
256\cos^9\theta &= \cos9\theta + 9\cos7\theta + 36\cos5\theta + 84\cos3\theta + 126\cos\theta, \\
1024\cos^{11}\theta &= \cos11\theta + 11\cos9\theta + 55\cos7\theta + 165\cos5\theta + 330\cos3\theta + 462\cos\theta.
\end{align}
$$

Of course, sine also possess this pattern, albeit more complicated due to alternating sign

$$
\begin{align}
4\sin^3\theta &= 3\sin\theta - \sin3\theta, \\
16\sin^5\theta &= 10\sin\theta - 5\sin3\theta + \sin5\theta, \\
64\sin^7\theta &= 35\sin\theta - 21\sin3\theta + 7\sin5\theta - \sin7\theta, \\
256\sin^9\theta &= 126\sin\theta - 84\sin3\theta + 36\sin5\theta - 9\sin7\theta + \sin9\theta, \\
1024\sin^{11}\theta &= 462\sin\theta - 330\sin3\theta + 165\sin5\theta - 55\sin7\theta + 11\sin9\theta - \sin11\theta.
\end{align}
$$

Thus, we claim

$$
2^{2n}\cos^{2n+1}\theta = \sum_{k=0}^{n}\binom{2n+1}{k}\cos\,(2n{+}1{-}2k)\theta,
$$

and

$$
2^{2n}\sin^{2n+1}\theta = \sum_{k=0}^{n}(-1)^k\binom{2n+1}{n-k}\sin\,(1{+}2k)\theta.
$$

Proof can be very *complex* (well, pun intended), yet very simple in term of intuition. It is also one of the most intriguing proof which unify many area of knowledge in math. Since I'm not gonna do anything *too* crazy (and I hate summation symbol when conveying intuition), I'll drop the rigorous aspect and just show an example instead.

The overall structure of the proof will be induction over odd powers. Which will be super obvious why this won't work on even powers.

Consider the case of cosine to the 5th-power,

$$
2^4\cos^5\theta = \binom50\cos5\theta + \binom51\cos3\theta + \binom52\cos\theta.
$$

Although this equation resemble *half* of the nice [Pascal's triangle][]. It is hard to work with, since RHS is expressed in $\cos n\theta$, which is not a nice manipulatable polynomial. Thus, we'll consider *another* equation with a similar structure instead. That is, we consider $x^n$ in place of $\cos n\theta$ (for now). Our plan is, in the end, we will find some way to convert this synthetic equation back to the hypothesis.

Also bearing in mind that the original equation contains only half of the terms from the binomial. Why don't we try to fill them up, like this

$$
y^5 = \binom50x^5 + \binom51x^3 + \binom52x^1 + \binom53x^{-1} + \binom54x^{-3} + \binom55x^{-5}.
\tag{1}\label{eq:hypothesis}
$$

We also hope that, on the LHS, we can convert $y^5$ back to somewhat resemble of $\cos^5\theta$. But for now, we know that

$$
y = (x^1+x^{-1}).
$$

If we multiply $y$ twice on both sides, we shall get

$$
y^7 = \binom70x^7 + \binom71x^5 + \binom72x^3 + \binom73x^1 + \binom74x^{-1} + \binom75x^{-3} + \binom76x^{-5} + \binom77x^{-7}.
$$

RHS can simplified further, by taking advantage of symmetry of the binomial expansion

$$
y^7 = \binom70(x^7{+}x^{-7}) + \binom71(x^5{+}x^{-5}) + \binom72(x^3{+}x^{-3}) + \binom73(x^1{+}x^{-1}).
\tag{2}\label{eq:step}
$$

(This *fold-in-half* technique also works with $\eqref{eq:hypothesis}$ as well.)

So, what should $x$ be? Recalled our best friend, $\cos\theta+i\sin\theta$, whose comes with an amazing additional trigonometry property

$$
\begin{align}
(\cos\theta+i\sin\theta)^n + (\cos\theta+i\sin\theta)^{-n}
&= \cos n\theta + i\sin n\theta + \cos (-n\theta) + i\sin(-n\theta) \\
&= \cos n\theta + i\sin n\theta + \cos n\theta - i\sin n\theta \\
&= 2\cos n\theta.
\end{align}
$$

Thus we make an educated guess and plug-in

$$
x = \cos\theta + i\sin\theta.
$$

Hence, $\eqref{eq:hypothesis}$ is, exactly, the hypothesis, which resolved into $\eqref{eq:step}$,

$$
2^6\cos^7\theta = \binom70\cos7\theta + \binom71\cos5\theta + \binom72\cos3\theta + \binom73\cos\theta.
\tag*{$\blacksquare$}
$$

The proof also works with sine as well, just switch to $y=(x^1-x^{-1})$ instead.

(In fact, we can use this proof to find the even power too! Sadly(?), it shows us that sine to the even power are written out in terms of cosine...)


## References

- Spiegel, Murray R. *Mathematical handbook of formulas and tables*. 1990.



[de Moivre's formula]: //en.wikipedia.org/wiki/De_Moivre%27s_formula
[Pascal's Triangle]: //en.wikipedia.org/wiki/Pascal%27s_triangle
