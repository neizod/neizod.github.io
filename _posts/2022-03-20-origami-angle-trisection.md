---
title: Angle Trisection with Paper Folding
tags:
  - Origami
  - Geometry
  - Mathematics
  - Math Animation
  - SVG
  - English Post
date: 2022-03-20 21:42:55 +0700
thumbnail: /images/math/origami/trisection.png
---

The problem of trisecting an angle is a geometric puzzle that can't be done using only [straightedge and compass][se&c]. That's because those tools are only good at *simulating* quadratic equations. To split an angle into three equal part, however, require the power to solve cubic equations instead. But if we're not restricted ourselves to the classical tools, we'll see that origami (the art of paper folding) offer more powerful way which can solve cubic equations, in other words, it can trisect an angle!

And this is the folding method suggested by Hisashi Abe that can trisect any arbitrary angle.

{: .figure}
> ![](/images/math/origami/angle-trisection.svg)
>
> Folding animation for fiding an angle $\theta/3$

The intriguing property of origami technique emerged from, given a piece of paper with a point and a straight line, folding the paper such that the point lies on the line. With no other constraints, we may fold that in infinitly different ways. When we traces all the creases from every possible folds, we get a [parabola][] (the same technique as finding [envelope][]), such that the point is a focus and the line is a directrix!

{: .figure}
> ![](/images/math/origami/envelope-parabola.svg)
>
> Parabola from paper folding

However, the part that makes this technique more *powerful* than the standard SE&C, is that when we interest in a pair of parabolas (each described via focus-directrix), we can easily find the tangent to both. By only folding two foci onto its directrixes at the same time.

{: .figure}
> ![](/images/math/origami/proof-trisector.svg)
>
> Proof that the three angles are equal

Recalled that the act of folding is nothing more than geometric reflection, where the crease is the reflex axis, it's not hard to see why this method actually trisect the angle. 😊


## Referrence

- Hull, Thomas C. *Origametry: Mathematical Methods in Paper Folding*. Cambridge University Press, 2020.



[se&c]: //en.wikipedia.org/wiki/Straightedge_and_compass_construction
[envelope]: //en.wikipedia.org/wiki/Envelope_(mathematics)
[parabola]: //en.wikipedia.org/wiki/Parabola
