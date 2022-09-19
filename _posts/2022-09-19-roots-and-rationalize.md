---
title: Roots and Rationalize
tags:
  - Algebra
  - Geometry
  - Conic Section
  - Mathematics
  - Math Animation
  - SVG
  - English Post
date: 2022-09-19 23:28:06 +0700
thumbnail: /images/math/quadratic/roots-and-rationalize.png
---

It is a truth universally acknowledged, that a quadratic equation in possession of good coefficients, must be in want of roots.

Such equation, nowadays standardized as $ax^2 + bx + c = 0$, has the memorable [formula][quadratic formula] for finding the unknown:

$$
x = \frac{-b \pm \sqrt{b^2-4ac}}{2a}.
\label{eq:quadratic}
\tag{0}
$$

Unfortunately, for many people, the formula often misremembered. Forget to negate the first term, divide by only a constant, swap terms inside the square root, the list goes on and on as wild as mankind's imagination.

It also takes us out of the realm of *beauty*, and just doing everything in a robotic manner. Sadden the matter even more.


## So what is it, really?

Well, one way to interpret the equation is to lift the restriction that it must equal to zero. Turn the empty side of the equation into another variable, a function if you may, i.e.

$$
f(x) = ax^2 + bx + c.
\label{eq:polynomial}
\tag{1}
$$

It follows that $f$ must be a parabola. And roots to the original equation, found by fixing $f(x)=0$, are the intersections of the parabola to the $x$-axis.

{: .figure}
> ![](/images/math/quadratic/base-parabola.svg)
>
> A parabola from the interpretation of $\eqref{eq:polynomial}$
>

That is nice and all. But it does not simplify the problem. Since we have to *somehow* find the roots first, before we can actually draw the curve precisely.

Thus we may look at the function $\eqref{eq:polynomial}$ another way. That is by *decomposing* it into two functions, $f(x) = f_2(x) - f_1(x)$, where $f_n$ is a polynomial of degree at most $n$. Which, by fixing $f(x)=0$, we may rearrange it into $f_1(x)=f_2(x)$. In other words, we interest in values of $x$ that make $f_2$ and $f_1$ intersected.

Let $f^\star_n$ denoted such decomposition where it is the most *trivial*, precisely

$$
\begin{align}
f^\star_2(x) &= ax^2, \\
-f^\star_1(x) &= bx + c.
\end{align}
\label{eq:parabola-line}
\tag{2}
$$

These functions are more manageable than $\eqref{eq:polynomial}$ since they are much simpler. That is

- $f^\star_2$ is a parabola with the axis of symmetry as $y$-axis, and the focus at $1/4a$;
- $f^\star_1$ is a line of slope $-b$ that intercept $y$-axis at $-c$.

{: .figure}
> ![](/images/math/quadratic/decompose-parabola.svg)
>
> A decomposed pair of parabola-line $\eqref{eq:parabola-line}$
>


## Family of functions

The choice of choosing a pair of $f_n$ is not unique. It is just that $\eqref{eq:parabola-line}$ is the most trivial and already useful. Nevertheless, let us take a leisurely detour by considering a family of possible $f_n$ such that the projected roots are identical.

Realized that $\eqref{eq:polynomial}$ itself is already a part of $f_n$ family. That is $f^\dagger_2(x) = f(x)$ and $f^\dagger_1 = 0$. Thus, the line $f^\dagger_1$ and the line $f^\star_1$ share an intersect point $(-c/b,0)$. We will use it as a pivot for all of $f_1$ lines in the family, that is

$$
f^m_1(x) = m(x + c/b).
$$

Where $m$ denoted a slope of $f^m_1$. Observe that $f^0_1 = f^\dagger_1$ and $f^b_1 = f^\star_1$ as we engineered.

So now it boils down to finding $f^m_2$, which should be a walk in a park

$$
\begin{align}
f^m_2(x) &= f(x) - f^m_1(x) \\
         &= ax^2 + (b{-}m)x + c(1{-}m/b).
\end{align}
$$

However, actually dealing with all of $f^m_2$ parabolas can be quite challenging. We will reduce a parabola to a point. A good candidate we choose here is a vertex of a parabola, i.e. the point at the *peak*. Let $V^m$ denoted such vertex of the corresponding $f^m_2$, we have

$$
V^m = \left( \frac{m{-}b}{2a}, f^m_2\! \left( \frac{m{-}b}{2a} \right) \right).
$$

Finding $y$ position by expanding it with the function, then carefully grouping them back into the term of $(m{-}b)/2a$ yield

$$
\begin{align}
f^m_2\! \left( \frac{m{-}b}{2a} \right)
&= a\left( \frac{m{-}b}{2a} \right)^2 + (b{-}m)\left( \frac{m{-}b}{2a} \right) + c\left( 1 - \frac{m}{b} \right)\\
&= -a \left( \frac{m{-}b}{2a} \right)^2 - \frac{2ac}{b}\left( \frac{m{-}b}{2a} \right).
\end{align}
$$

In other words, the vertex's position can be written as a function

$$
v(x) = -a \left( x^2 + (2c/b)x \right).
$$

Which is a congruent parabola to all of $f_2$, only upside down.

{: .figure}
> ![](/images/math/quadratic/parabola-family.svg)
>
> A family of such decomposition, note that the pivot is not a focus of the inverted parabola

Let us take a short break to appreciate the beauty of seamlessly transformation of the problem. And thus ends our sightseeing here.


## Geometric construction

Going back to $\eqref{eq:parabola-line}$, the trivial pair of parabola $f^\star_2$ and line $f^\star_1$. If we can draw a parabola easily, then the problem is nothing than a simple geometric construction.

And we have the trick just for that!

{: .figure}
> ![](/images/math/quadratic/pin-and-string-parabola.svg){: width="358" height="275"}
>
> Parabola construction with pin and string method -- [picture from Wikipedia][pin-and-string]

However, those tools are not the standard [Euclidean construction][]. Which we are allowed to use only straightedge and compass (SE&C). Actually drawing a parabola with just SE&C would require infinitely many steps.

{: .figure}
> ![](/images/math/origami/envelope-parabola.svg){: width="400" height="400"}
>
> An [envelope][] of a parabola constructed using origami, which is an adaptation of SE&C

Can we avoid the infinity? Consider the horrible formula $\eqref{eq:quadratic}$, one's hunch would says that it has something to do with the [Pythagorean theorem][]. That is we may draw a right triangle with these lengths:

- A base of length $\sqrt{(b/2a)^2-c/a}$
- A hypotenuse of length $b/2a$
- The remaining side, a height, of length $\sqrt{c/a}$

{: .figure}
> ![](/images/math/quadratic/right-triangle.svg)
>
> Roots via a pair of right triangles, note that triangle's apex no need to lands on the parabola
>

This specific triangle is useless. But again, there are infinitely many triangles in the same manner. That is if we *fix* the base but *vary* the height to a variable $h$. The length of the hypothenuse, now named $r$, will became

$$
r = \sqrt{\left(\frac{b}{2a}\right)^2 - \frac{c}{a} + h^2}.
$$

Let $A^h=(-b/2a,h)$ be the apex of the triangle of height $h$. Draw a circle of radius $r$ using $A^h$ as a focus. Observe how the circle interact with the world when we vary the height.

{: .figure}

> ![](/images/math/quadratic/triangle-circle.svg)
>
> A circle touching the focus of the parabola

One point of our interest occur when the circle touch the focus of the parabola $f^\star_2$. Applying the Pythagorean theorem, we now have

$$
\begin{align}
r^2 &= \left( h-\frac1{4a} \right)^2 + \left( -\frac{b}{2a} \right)^2, \\
  h &= 2c + \frac1{8a}.
\end{align}
$$

Such an elegant ratio! Thus suggested us a simple construction that bypass parabola drawing entirely. That is we find the point $A^\star$, the apex of such special case, where

$$
A^\star = \left( -\frac{b}{2a}, 2c+\frac1{8a} \right).
$$

Using a compass, jot the needle point at $A^\star$, and the pencil lead at the focus of the parabola $f^\star_2$. Rotate the compass to move the pencil around. Roots to the equation are where the pencil lands on $x$-axis.

{: .figure}

> ![](/images/math/quadratic/construction.svg)
>
> Geometric construction for solving quadratic
>

This method works best in the purely geometrical setting. That is $f^\star_n$ are not given as coefficients to the polynomial, but view directly as geometric objects. Specifically, the parabola $f^\star_2$ is defined via its focus and directrix. We do not know, and do not care, about it's algebraic interpretation (no need to *reverse-engineer* for $a,b,c$). Since we can view the focal length $1/4a$ as a [unit][unit of length] length and use it to measure the slope to get $-b/2a$ right away. In addition, we can also use the length from parabola's vertex to the intercept point on the axis of symmetry to construct $2c+1/8a$ straightforwardly.


## Lill's construction

What if we do not care about the *extreme* geometric interpretation and just focus (no pun intended) solely on the algebraic aspect, dealing with the coefficients $a,b,c$ directly?

Nevertheless, let us look closely at the geometric construction again. Consider only a root $x_1$. We now have two important points on the circle: the focus of the parabola at $(0,1/4a)$, and the root $(x_1,0)$. Finding another point is crucial since they will form an inscribed triangle, which unlock some nice properties that allows us to analyse the problem further.

What is the last point should we find? If we want to utilize [Thales's theorem][], then we have to make a right triangle with one side as a diameter to the circle. The best point is a reflection of parabola's focus around $A^\star$, precisely a point at $(-b/a,4c)$.

{: .figure}
> ![](/images/math/quadratic/raw-rods.svg)
>
> Important lengths for the geometric construction

Let us draw three orthogonal line segments that join these important points together. To eliminate ambiguity, we will call them *rods*, which consists of

1. A rod of length $1/4a$ that join the origin to the focus of the parabola.
2. A rod of length $-b/a$ that join the origin to the $x$-projection of the reflexed focus.
3. A rod of length $4c$ that join the $x$-projection of the reflexed focus to the reflexed focus.

Fix those rods. What if we consider other right triangles such that one vertex of the triangle stayed at the focus. While the opposite vertex falls on the third rod, missing the reflexed focus. It is natural to ask how far it keep missing.

{: .figure}
> ![](/images/math/quadratic/miss-rods.svg)
>
> A "missing" distance when we choose a "wrong" answer $x$

Let $\ell(x)$ measure the distant between the vertex and the reflexed focus, when we choose to land the right angle at $(x,0)$. With some exercise in trigonometry, it is easy to see that

$$
\ell(x) = 4ax^2 + 4bx + 4c.
$$

In other words, $\ell(x) = 4f(x)$. Which is *why* the position of the right angle can be used to calculate the root to the original quadratic equation.

We can even make the construction simpler. Firstly, notice that the first rod is $1/4a$ and the last rod is $4c$. It hints us that we may fix the middle rod while alter the rest. So if we multiply the first rod by $\delta$ and the last rod by $1/\delta$, then the missing distance function will became

$$
\ell(x)=(4/\delta)f(x).
$$

It is sensible to choose $\delta=4$. Thus now we altered the length of the first rod to $1/a$, and the last rod to just $c$.

Lastly, fixing the last rod and also the function $\ell$. Observe that if we stretch the middle rod by $\gamma$ (which will also moves the position of the right angle accordingly), we must stretch the first rod by $\gamma^2$ to preserve the right angle.

{: .figure}
> ![](/images/math/quadratic/lill-method.svg)
>
> Lill's method for solving quadratic

Choose $\gamma=a$ and everything will resolved to the simplest form. All rods of length $a$, $-b$, and $c$. Only now the position of the right angle is relatively scaled up by $a$. Thus the correct absolute position of the root must be scaled down, i.e.

$$
x = \tan\theta.
$$

This interpretation gives us a lot of insight. Such as if the circle is not large enough to cross the (extension) of the middle rod, then the equation must have no solution (in real realm). And when we face a negative value $c$, we construct the last rod downward, which also tells us that the equation always have roots!

The ancient Greek, evidently [Eratosthenes][] (prime-sieve guy), known this method for quite a long time, despite limited to polynomial of degree three. It was not until 1867 that Eduard Lill finally [generalized the concept][Lill's method] to polynomial of any degree.

Arguably, these methods are still in the theme of *memorization*, like the formula $\eqref{eq:quadratic}$ have done for decades. And teaching these methods could be a lot worse should it falls into the wrong hands. Still, I find that it is simpler yet more elegant than the algebraic counterpart. Also the explanation can be made a lot easier, ditching the whole parabola thing and just go straightforward to Lill's method, because it uses only right-angle construction and a very simple trigonometry concept.

So why are we still teaching ordinary student with the overly complicated formula $\eqref{eq:quadratic}$ such that it drives away people to appreciate the beauty of mathematics. In daily life, we don't need infinite digits of $\sqrt2$ anyway, $1.4$ will do.


## References

- Hull, Thomas C. *Origametry: Mathematical Methods in Paper Folding*. Cambridge University Press, 2020.
- Mathologer: [Why don't they teach this simple visual solution? (Lill's method)](https://youtu.be/IUC-8P0zXe8)

---

P.S. During the [SoME2][] event, I ran into [this excellent video in Chinese][bilibili parabola]. Which also dealing with parabola in the setting of classical physics. Bet you'll also love it ❤️


[Eratosthenes]: //en.wikipedia.org/wiki/Eratosthenes
[Euclidean construction]: //en.wikipedia.org/wiki/Straightedge_and_compass_construction
[Pythagorean theorem]: //en.wikipedia.org/wiki/Pythagorean_theorem
[Thales's theorem]: //en.wikipedia.org/wiki/Thales%27s_theorem
[Lill's method]: //en.wikipedia.org/wiki/Lill%27s_method

[quadratic formula]: //en.wikipedia.org/wiki/Quadratic_formula
[envelope]: //en.wikipedia.org/wiki/Envelope_(mathematics)
[unit of length]: //en.wikipedia.org/wiki/Unit_of_length
[pin-and-string]: //en.wikipedia.org/wiki/File:Parabola-pin-string.svg
[SoME2]: //summerofmathexposition.substack.com/p/the-summer-of-math-exposition-is
[bilibili parabola]: //www.bilibili.com/video/BV19v4y1F7BC
