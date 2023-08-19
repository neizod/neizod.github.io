---
title: Solve system of linear equation with determinant
tags:
  - Linear Algebra
  - Mathematics
  - English Post
date: 2023-06-30 21:21:21 +0700
---

Consider a system of linear equations with $n$ variables. We can express this system as a matrix equation, $A\vec{x} = \vec{y}$, which is

$$
\begin{bmatrix}
a_{11} & a_{12} & \cdots & a_{1n} \\
a_{21} & a_{22} &        & a_{2n} \\
\vdots &        & \ddots & \vdots \\
a_{n1} & a_{n2} & \cdots & a_{nn}
\end{bmatrix}
\begin{bmatrix}
x_1 \\ x_2 \\ \vdots \\ x_n
\end{bmatrix}
=
\begin{bmatrix}
y_1 \\ y_2 \\ \vdots \\ y_n
\end{bmatrix}.
\tag{1}\label{eq:system-equations}
$$

In practice (where we work with $a_{ij}$ numerically), we just perform [Gauss-Jordan elimination][] on the matrix. This involves constructing an [augmented matrix][] $[A \mid \vec{y}]$, and then applying row operations until the submatrix on left became the [identity matrix][]. As a result, the column vector on the right became the solution of the system,

$$
\left[
\begin{array}{cccc:c}
a_{11} & a_{12} & \cdots & a_{1n} & y_1 \\
a_{21} & a_{22} &        & a_{2n} & y_2 \\
\vdots &        & \ddots & \vdots & \vdots \\
a_{n1} & a_{n2} & \cdots & a_{nn} & y_n
\end{array}
\right]
\quad\xrightarrow{\text{row ops}}\quad
\left[
\begin{array}{cccc:c}
1      & 0 & \cdots & 0      & x_1 \\
0      & 1 &        & 0      & x_2 \\
\vdots &   & \ddots & \vdots & \vdots \\
0      & 0 & \cdots & 1      & x_n
\end{array}
\right].
$$

In theory, when we treat $a_{ij}$ as variables, we can still solve the matrix equation for a solution. However, the solution will involve a large number of variables. Specifically, each $x_i$ will have the variables $a_{ij}$ appears $O(n!)$ times.

Nevertheless, this theoretical solution is not overly complicated. Since it can be summarized down for the sake of ~~memorization~~ clarity. To achieve thai, we'll introduce the concept of overwriting a matrix with a vector. Overwriting matrix $M$ with vector $\vec{v}$ at column $k$ is denoted as

$$
M(k:\vec{v}) = \begin{bmatrix}
m_{1,1} & \cdots & m_{1,k-1} & {\color{red}v_1}    & m_{1,k+1} & \cdots & m_{1,n} \\
\vdots  & \ddots & \vdots    & {\color{red}\vdots} & \vdots    & \ddots & \vdots \\
m_{n,1} & \cdots & m_{n,k-1} & {\color{red}v_n}    & m_{n,k+1} & \cdots & m_{n,n}
\end{bmatrix}.
$$

Thus, a summarized formula for the solution can be expressed using the [determinant][] as

$$
x_k = \frac{\det A(k:\vec{y})}{\det A}.
\tag{2}\label{eq:cramer}
$$

For example, when $A$ is $2{\times}2$ matrix, we get

$$
\begin{align}
x_1 &= \det\begin{bmatrix} {\color{red}y_1} & a_{12} \\ {\color{red}y_2} & a_{22} \end{bmatrix}
     / \det\begin{bmatrix} a_{11} & a_{12} \\ a_{21} & a_{22}\end{bmatrix}
     = \frac{y_1a_{22} - y_2a_{12}}{a_{11}a_{22}-a_{21}a_{12}}
     , \\
x_2 &= \det\begin{bmatrix} a_{11} & {\color{red}y_1} \\ a_{21} & {\color{red}y_2} \end{bmatrix}
     / \det\begin{bmatrix} a_{11} & a_{12} \\ a_{21} & a_{22}\end{bmatrix}
     = \frac{a_{11}y_2 - a_{21}y_1}{a_{11}a_{22}-a_{21}a_{12}}.
\end{align}
$$

This identity can be proven in various ways. One approach that I particularly appreciate is [an answer by Rene Schipperus][math.sx why cramer], where we first transform the vector $\vec{x}$ in equation $\eqref{eq:system-equations}$ into an identity matrix overwritten by $\vec{x}$. It follows that we need to transform $\vec{y}$ as well, which is

$$
\begin{bmatrix}
a_{11} & a_{12} & \cdots & a_{1n} \\
a_{21} & a_{22} &        & a_{2n} \\
\vdots &        & \ddots & \vdots \\
a_{n1} & a_{n2} & \cdots & a_{nn}
\end{bmatrix}
\begin{bmatrix}
       &   & {\color{red}\vdots}  &   & \\
       & 1 & {\color{red}x_{k-1}} & 0 & \\
\cdots & 0 & {\color{red}x_k}     & 0 & \cdots \\
       & 0 & {\color{red}x_{k+1}} & 1 & \\
       &   & {\color{red}\vdots}  &   & \\
\end{bmatrix}
=
\begin{bmatrix}
       &             & {\color{red}\vdots}  &             & \\
       & a_{k-1,k-1} & {\color{red}y_{k-1}} & a_{k-1,k+1} & \\
\cdots & a_{k,k-1}   & {\color{red}y_k}     & a_{k,k+1} & \cdots \\
       & a_{k+1,k-1} & {\color{red}y_{k+1}} & a_{k+1,k+1} & \\
       &             & {\color{red}\vdots}  &             & \\
\end{bmatrix}.
$$

In other words, $AI(k:\vec{x}) = A(k:\vec{y})$.

The reason that we *choose* $\vec{x}$ to write over the identity matrix is

$$
\det I(k:\vec{x}) = x_k.
$$

Given that determinants are [multiplicative function][], this leads us to the equation $\eqref{eq:cramer}$.

The result $\eqref{eq:cramer}$ is known as [Cramer's rule][]. While it's simple and elegant (to the point that its simplification surprises me), [some observations][math.sx determinant origin] suggest that in the history of Western mathematics, determinant actually emerged as a byproduct of efforts to solve systems of equations in the first place.

Also, recalled that each $x_k$ can be expressed as a sum of $O(n!)$ terms. This stems from the fact that $\det A$ must enumerate all of permutations of variables in different rows/columns, i.e., $\prod_{k=1}^n a_{k,\ell_k}$ where $\ell_u=\ell_v$ iff $u=v$. This results in $n!$ distinct terms. (Reflected via [minor/cofactor expansion][minor matrix] on why we need to destroy column $i$ and row $j$.) Furthermore, the positive/negative signs for each term arise from the inclusion-exclusion principle.

This topic is something that I truly needed to engage with in order to fully comprehend. I really hate that some textbook just throw sanitized definitions and equations right at me, which does not addressing the underlying reasons on why it is the way it is... Actually, I'd like to dive into a more in-depth analysis; however, I guess it'd be better if I just leave those details as an exercise to the reader lol



[Gauss-Jordan elimination]: //en.wikipedia.org/wiki/Gaussian_elimination
[augmented matrix]: //en.wikipedia.org/wiki/Augmented_matrix
[identity matrix]: //en.wikipedia.org/wiki/Identity_matrix
[determinant]: //en.wikipedia.org/wiki/Determinant
[multiplicative function]: //en.wikipedia.org/wiki/Multiplicative_function
[Cramer's rule]: //en.wikipedia.org/wiki/Cramer%27s_rule
[minor matrix]: //en.wikipedia.org/wiki/Minor_(linear_algebra)
[math.sx why cramer]: //math.stackexchange.com/a/1941606/26082
[math.sx determinant origin]: //math.stackexchange.com/a/1977593/26082
