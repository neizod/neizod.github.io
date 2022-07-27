---
title: "Cutting Cone with Cone: An Alternative Way to Understand Conic Section"
tags:
  - Conic Section
  - Geometry
  - GeoGebra
  - Mathematics
  - English Post
date: 2020-08-08 10:56:23 +0700
---

A conic section is already a great tool that helps us understand a [quadratic equation][] visually.  However, one might wonder: *why* bother cutting a [double cone][] (a cone with two nappes) with a plane in the first place?  Well, maybe we have to ask mathematicians from two thousand years ago.  Nevertheless, let us explore an alternative method for constructing those curves that might help us understand them not only visually, but also intuitively.

{: .oversized .figure}
> ![](/images/math/cutting-cone/cutting-cone-hyperbola-ellipse.png)
>
> Cutting a blue cone with a grey plane is as same as cutting it with another cone in orange

An alternative proposed method is to replace the cutting plane with another identical double cone.  Yes, we're gonna cut a cone with a cone!  The rules are that we can translate both cones in any direction in 3D space.  On the other hand, rotation is prohibited.  We might have a hard time imagining the resulted cut at first, but we are in the computer age now; so plotting them shouldn't be too hard ([try it interactively!][demo geogebra]).  Also, we can observed that the cut lies on a (tilted) 2D plane, which is the same as the original cutting plane method (see proofs in the appendix).

This way, those cones will resembled a [light cone][] that Stephen Hawking often talked about, which is great when using them to explain real-world applications.  From now on, we will refer to a 3D space as $X$, $Y$, and $T$ axes (see the $T$-axis as a time axis), where each axis of a cone is paralleled to the $T$-axis.


## A Perpendicular Line Emerged

We start our first explanation with the simplest situation.  Imagine a sport with two players competing in a field trying to seize a ball.  Suppose that both players can move at the same speed.  Given them their starting positions, then let a referee throw the ball into the field.  Can we determine who can get to the ball first?  Furthermore, can we determine a confident region for each player that guarantee which one of them will always gets the ball first?

This question simply asks for a [Voronoi diagram][] with 2 seeds.  We can see that if we grow a circle from each player at the same speed and stop growing parts of the border when they touched, the final border between them will become a straight *perpendicular* line that bisect a segment joining both players' starting positions, which separates the result regions that tell us who wins.

{: .figure}
> ![](/images/math/cutting-cone/explain-line.png)
>
> Winning regions for a 2-player game, obtained by placing both apexes on the same height

To draw it in the proposed cutting cone method; we started by placing two cones with both their apexes on the same height (or at the same time on the $T$-axis).  Cutting them will yield two disjoint curves on a 3D space; but if we [projected][projection] the cut onto the $XY$-plane, then we will get a straight line.  Moreover, if we project their apexes, they will become seeds for the Voronoi diagram (or foci for that perpendicular line) too.


## Hyperbola Follows Naturally

Now consider a game with the same rules as in the previous perpendicular line case.  This time, however, let one player have a handicap and can start running towards the ball before another player (but they both still run at the same speed). What are the resulting regions?

 {: .figure}
> ![](/images/math/cutting-cone/explain-hyperbola.png)
>
> Winning regions where a blue player can move after a red player move pass that red circle

This is the most intriguing case that arises from using the cutting cone method.  To visualize it, we placed their apexes on a different height (time).  Also, make sure that the apex doesn't get contained by another cone.  We can see that the resulting cut lies on a tilted plane that cut both nappes, which means it must be a hyperbola!  Projecting this cut onto the $XY$-plane only scaled its shape, so it is still a hyperbola.  In addition, their projected apexes will become foci for the projected hyperbola.

Note that the hyperbola cut has two disjointed curves, but in real-world situations, we are often interested in only one branch of the curve.


## Ellipse Needs a Difference Narration

The hyperbola case said that when constructing cones, their apexes can't be contained in another cone.  But what if it is contained? Well, we get an ellipse from this cut!

However, it is hard to wrap our head around the situation when one cone pointing towards the future and another cone towards the past.  The 2-player game's explanation won't make sense anymore. Hence, we need a brand new explanation for this case.

{: .figure}
> ![](/images/math/cutting-cone/explain-ellipse.png)
>
> A winning region for a red player that can run straight furthest to a red circle

Imagine a sport with only one player, to win this game they have to retrieve a ball first, then run to a goal within a time limit.  Notice that the time limit can be view as a circle from their starting position with a radius equals to the furthest distance they can go.  We know a starting position of the player, a position of the goal, and how much time they have.  What is the winning region that the player can fetch the ball and score a goal in time?

The answer is an ellipse that can be constructed as described above.  The projected ellipse on $XY$-plane also has foci at the projected positions of the player and the goal.  That means if the player started at the goal, the result will become a nicely rounded circle.


## Parabola Missing the Party

The weird thing about this case is that a parabola only has one focus (all the others have two foci).  So, it is *not* constructible with the proposed cutting cone method.  Unless we tweak this case to having two foci, where another focus is infinitely far away in both space and time.  So that infinite distant cone will become a plane that is parallel to some rays in the nappes of the main cone and makes a parabolic cut.

{: .figure}
> ![](/images/math/cutting-cone/explain-parabola.png)
>
> Winning regions where a red player can choose any starting position on a red line

Trying to explain them in real-world situations with an infinity value is weird.  Luckily, we can reuse the existing explanation, tweaked some rules, and it explained somewhat sensibly.  Look back at the 2-player game from the perpendicular line case, we let one player has a handicap so they can choose any starting position on a straight line.  Just this and now we have regions separated by a parabola.


## It's a Complement, Not a Replacement

We can see that this cutting cone method makes a lot more sense than the original cutting plane method.  Though in some cases we have to work around for explanations, we gotta admit that the hyperbola case shines brightly in this explanation, which is wonderful since we are often familiar with only a circle, an ellipse, and a parabola.

There is also another special case that's been left out.  It is when one apex lies exactly on another nappe.  The resulting cut will be an infinite line passing through their foci, which doesn't agree with the degenerated case for an ellipse explanation that gives a line segment joining their foci as a result.

Keep in mind that the method has many restrictions; such as we can't rotate cones and their slopes must be the same.  These settings fit the space-time explanation well, but what if we can rotate them, or allow their slopes to have different values?  It's easy to see that the cut will *not* lie on a plane anymore.  And also the projection will go haywire.  These might be fun to analyze, but will be harder by a magnitude too.


## Appendix

**Notation:** A sphere $S_i$ has a center (or a focus) at $f_i$ and a radius $r_i$.  A double cone $C_i$ has an apex at $a_i$, and a position on $T$-axis at $t_i$.  Since all cones share the same growing velocity, a symbol $v$ is used to denote the ratio between a change in $XY$-plane over a change in $T$-axis (we may view this value as an inverted slope of a cone).  A distance function $d$ is a Euclidean norm measuring the shortest distance between the two geometric objects.

---

**Lemma 1:** Given two distinct spheres $S_1$ and $S_2$, if the spheres intersected, then all of the intersection lies on a plane perpendicular to $\overleftrightarrow{f_1f_2}$.  Also, a distance from $f_1$ to the plane is equal to $\frac{\ell^2+r_1^2-r_2^2}{2\ell}$, where $\ell = d(f_1, f_2)$.

**Proof:** Let $p$ and $p'$ be two intersecting points that are on the opposite side of a line $\overleftrightarrow{f_1f_2}$.  Since $d(f_i, p) = d(f_i, p') = r_i$ for $i \in \lbrace1,2\rbrace$, we can say that $\square f_1pf_2p'$ is a [kite][], and therefore we have $\overleftrightarrow{f_1f_2} \perp \overleftrightarrow{pp'}$.  We know that a plane that contains $p$ and $p'$ must also contain $\overleftrightarrow{pp'}$.

Consider another distinct set of intersecting points $q$ and $q'$ in the same manner.  We can see that the desired plane must also contains $\overleftrightarrow{qq'}$.  Since $\overleftrightarrow{pp'} \ne \overleftrightarrow{qq'}$ and both $\overleftrightarrow{pp'}$ and $\overleftrightarrow{qq'}$ are perpendicular to $\overleftrightarrow{f_1f_2}$, then the plane must also be perpendicular to $\overleftrightarrow{f_1f_2}$ too.

{: .figure}
> ![](/images/math/cutting-cone/proof-distance.png)
>
> Figure&nbsp;1: A [cross-section][] of two intersected spheres with both foci

Refers to fig.&nbsp;1, let $x = \overleftrightarrow{f_1f_2} \cap \overleftrightarrow{pp'}$, then let $\ell_1 = d(f_1, x)$, and $h = d(p, x)$.  Using the [Pythagorean theorem][], we can see that:

$$
h^2 = r_1^2 - \ell_1^2 = r_2^2 - (\ell - \ell_1)^2.
$$

Ignore $h^2$ and solve the remaining equation yield

$$
\ell_1 = \frac{\ell^2 + r_1^2 - r_2^2}{2 \ell}.
\tag*{$\blacksquare$}
$$

---

**Lemma 2:** Given two distinct spheres $S_1$ and $S_2$ that are intersected.  If their radii both grow by the same length such that the modified spheres are still intersected, then the intersecting plane will move along $\overleftrightarrow{f_1f_2}$ with a constant proportion to that length.

**Proof:** Let $S_1'$ and $S_2'$ be modified spheres such that $r_1' = r_1 + t$ and $r_2' = r_2 + t$, also let $\ell_1'$ be a distance from $f_1$ to a plane that contains $S_1' \cap S_2'$.  From lemma&nbsp;1 we can see that

$$
\ell_1' = \frac{\ell^2 + (r_1 + t)^2 - (r_2 + t)^2}{2\ell}
        = \ell_1 + \frac{r_1-r_2}{\ell}t.
\tag*{$\blacksquare$}
$$

---

**Lemma 3:** Given two distinct spheres $S_1$ and $S_2$ that are intersected.  If one radius grows and another radius shrinks by the same length such that the modified spheres are still intersected, then the intersecting plane will move along $\overleftrightarrow{f_1f_2}$ with a constant proportion to that length.

**Proof:** In the same manner of lemma&nbsp;2, but change $r_2' = r_2 - t$.  Thus we have

$$
\ell_1' = \frac{\ell^2 + (r_1 + t)^2 - (r_2 - t)^2}{2\ell}
        = \ell_1 + \frac{r_1+r_2}{\ell}t.
\tag*{$\blacksquare$}
$$

---

**Theorem 4:** Given two distinct cones $C_1$ and $C_2$. Their intersection lies on a plane.

**Proof:** Split into 2 cases

{: .figure}
> ![](/images/math/cutting-cone/proof-plane.png)
>
> Figure&nbsp;2: A cross-section that contains both apexes and parallel to $T$-axis

The first case, refers to fig.&nbsp;2a, is when one cone does not contain another apex.  Let $p$ be the upper point when they start intersecting upward at time $t_u$, and $p'$ be the lower point when they start intersecting downward at time $t_d$.

To find other intersect point of these cones at time $t$ such that $t \le t_d$ or $t_u \le t$, is to find an intersection between a plane $\mathcal{P^\parallel}$ that is parallel to $XY$-plane at time $t$, and a plane $\mathcal{P}^\perp$ that is perpendicular to $\overleftrightarrow{a_1a_2}$ such that it is constructed by intersecting two spheres with $f_i = a_i$ and $r_i = (t-t_i)\sqrt{v^2+1}$ for $i \in \lbrace1, 2\rbrace$.

If $\mathcal{P}^\parallel$ moves in $T$-axis by some length, from lemma&nbsp;2, $\mathcal{P}^\perp$ will move by a constant proportion of that length.  So an intersection $\mathcal{P}^\parallel \cap \mathcal{P}^\perp$ will also move by some other constant proportion of that length.  This concludes that the intersection lies on a straight line, which implies that a plane perpendicular to this cross-section contains this cut.  Thus, the case holds.

Another case as shown in fig.&nbsp;2b, is when one cone contains another apex.  Let $p$ be the upper point when they start intersecting downward at time $t_u$, and $p'$ be the lower point when they start intersecting upward at time $t_d$.

Other intersect point at time $t$ such that $t_d \le t \le t_u$ can be found with the same method as the first case.  Notice that when $\mathcal{P}^\parallel$ move by some length, use lemma&nbsp;3 instead to find that $\mathcal{P}^\perp$ will still move by a proportion of that length.  Hence the case also holds. Q.E.D.


[demo geogebra]: //www.geogebra.org/m/hx96prac

[quadratic equation]: //en.wikipedia.org/wiki/Quadratic_equation
[double cone]: //en.wikipedia.org/wiki/Cone
[light cone]: //en.wikipedia.org/wiki/Light_cone
[Voronoi diagram]: //en.wikipedia.org/wiki/Voronoi_diagram
[projection]: //en.wikipedia.org/wiki/Parallel_projection
[Pythagorean theorem]: //en.wikipedia.org/wiki/Pythagorean_theorem
[kite]: //en.wikipedia.org/wiki/Kite_(geometry)
[cross-section]: //en.wikipedia.org/wiki/Cross_section_(geometry)
