---
title: Fast Fibonacci with Matrix
tags:
  - Algorithm
  - Fibonacci
  - Linear Algebra
  - Optimization
  - Time Complexity
  - Computer Science
  - English Post
date: 2017-11-10 13:49:30 +0700
---

1, 1, 2, 3, 5, 8, 13, 21, 34, 55, ... Even though most of us aren't good at math and calculation, but we might familiar with this sequence that people consider it the most beautiful sequence in the nature. The instruction to find the sequence is actually not that complicate: to find the next number is to find a sum of the two previous numbers, where the very first two numbers are defined as 1.

In other equations,

$$
F_n = F_{n-1} + F_{n-2}.
$$

When $F_n$ is a number in the Fibonacci sequence at index $n$. Where $F_1=1$ and $F_2=1$.

Students in computer-science should recognize that the above equation *is* a [recursion][]. However, if we implement it as-is, we'll run out of time even though we compute only around half-a-hundred $n$. That's because this equation compute most of the intermediate numbers again and again, resulting in $O(2^n)$ time complexity. We can overcome the problem easily with [dynamic programming][] technique. That is we'll store every calculated number of the sequence somewhere. When we want to find a number in the sequence again, we just look it up instead of re-computing it. This technique speed up the algorithm to $O(n)$.

Can we find the Fibonacci number faster?

If we want the whole sequence (from the first index to our interesting index), the above dynamic programming is already satisfactory fast.

However, if we just want a Fibonacci number at index $n$, ignoring other numbers in between. We still can speed this up with the help of a matrix. And there are so many way to approach this. Here, let me show an approach using matrix-vector multiplication (can be easily adapt to other sequence in the same manner). We starts by writing down some Fibonacci number in the vector form

$$
\mathbf{M}
\begin{bmatrix}
F_{n-1} \\
F_{n-2}
\end{bmatrix}
=
\begin{bmatrix}
F_{n} \\
F_{n-1}
\end{bmatrix}.
$$

Where $\mathbf{M}$ is a matrix of dimension $2\times2$ that we want to find in order to make this equation hold. It is trivial to see that

$$
\mathbf{M} =
\begin{bmatrix}
1 & 1 \\
1 & 0
\end{bmatrix}.
$$

However, the core idea of this equation is the position of Fibonacci vectors. It enable us to *chain* the sequence of computation, like this

$$
\mathbf{M}^2
\begin{bmatrix}
F_{n-1} \\
F_{n-2}
\end{bmatrix}
=
\mathbf{M}
\begin{bmatrix}
F_{n} \\
F_{n-1}
\end{bmatrix}
=
\begin{bmatrix}
F_{n+1} \\
F_{n}
\end{bmatrix}.
$$

Generally, we say that for every $k\in\mathbb{N}$, we have

$$
\mathbf{M}^k
\begin{bmatrix}
F_{n-1} \\
F_{n-2}
\end{bmatrix}
=
\begin{bmatrix}
F_{n-1+k} \\
F_{n-2+k}
\end{bmatrix}.
$$

The formula is already pretty. But we can use it more efficiently, that is we will eliminate a variable $n$ by evaluating $n=3$,

$$
\mathbf{M}^k
\begin{bmatrix}
F_2 \\
F_1
\end{bmatrix}
=
\mathbf{M}^k
\begin{bmatrix}
1 \\
1
\end{bmatrix}
=
\begin{bmatrix}
1 & 1\\
1 & 0
\end{bmatrix}^k
\begin{bmatrix}
1 \\
1
\end{bmatrix}
=
\begin{bmatrix}
F_{k+2} \\
F_{k+1}
\end{bmatrix}.
$$

Rename $k$ back to $n$ for maximized aesthetics. Thus we arrived at the equation

$$
\begin{bmatrix}
F_{n+1} \\
F_n
\end{bmatrix}
=
\begin{bmatrix}
1 & 1\\
1 & 0
\end{bmatrix}^{n-1}
\begin{bmatrix}
1 \\
1
\end{bmatrix}.
$$

Observe that the exponentiation takes the most time in the computation. Which we'll employ an [exponentiation by squaring][] -- divide the exponent a half recursively so we can cache the same terms. Hence the time is reduced to $O(\log n)$ eventually.

P.S. *feel* that result is not beauty enough? Then use this equivalent formula instead (the proof is left as an exercise to the reader)

$$
\begin{bmatrix}
F_{n+1} & F_n \\
F_n & F_{n-1}
\end{bmatrix}
=
\begin{bmatrix}
1 & 1\\
1 & 0
\end{bmatrix}^n.
$$



[recursion]: //en.wikipedia.org/wiki/Recursion
[dynamic programming]: //en.wikipedia.org/wiki/Dynamic_programming
[exponentiation by squaring]: //en.m.wikipedia.org/wiki/Exponentiation_by_squaring
