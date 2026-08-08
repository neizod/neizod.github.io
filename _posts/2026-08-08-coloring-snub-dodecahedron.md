---
title: Coloring the Snub Dodecahedron
tags:
  - Toy
  - Mathematics
  - Geometry
  - Graph Theory
  - Summer of Math Exposition
  - English Post
date: 2026-08-08 18:19:20 +0700
thumbnail: /images/math/coloring-dodecahedron/polydron-snub-dodecahedron.jpg
---

Last year, on a trip to Japan, I bought [ポリドロン][polydron], a geometric *toy*, and brought it home with me. But I was busy and never really got around to building anything with it. Then last week I went to a [Geometry Boot Camp][self geometry boot camp], hosted this year by Chiang Mai University, and finally had an excuse to dust the set off and play with it. At first I thought I'd just build something a little complicated but still pretty ... and somehow, before I knew it, I had wandered all the way into graph theory 🤣


## A toy from Japan

ポリドロン, or Polydron, is actually a toy that originated in the United Kingdom. It is designed as an educational toy for learning mathematics, especially geometry. As far as I can tell, the Japanese education market licensed the toy, translated it into Japanese, and developed some additional teaching materials of its own.

{: .figure}
> ![](/images/math/coloring-dodecahedron/polydron-booklet-and-basic-shapes.jpg)
>
> The Polydron booklet and a few basic shapes I had already built

The toy consists of many colorful pieces that snap together (a bit like LEGO, except the basic pieces are not tiny "bricks"). Each basic piece is a flat regular $n$-gon: all its sides have the same length, all the angles between adjacent sides have the same size, and, importantly, the angles are not so small that the sides overlap one another. These are the familiar basic shapes we all know: equilateral triangles, squares, regular pentagons, regular hexagons, and so on. (They actually sell extra sets with pieces whose sides and/or angles are not all equal too, but I personally did not pay extra for those versions.)

Flipping through the booklet that came with the set, I desperately wanted to build a [buckyball][buckyball] (12 pentagons and 20 hexagons). But after counting the pieces in the box, I discovered that they give you fewer than 20 hexagons ... so if I wanted to build one, I would have to buy more pieces LOL (...or I could use six triangles to fake one hexagon. I tried that, and personally I did not find the result quite *pretty* enough.)

After spending a while browsing [Platonic solids][platonic solid] and [Archimedean solids][archimedean solid], I eventually landed on the [snub dodecahedron][snub dodecahedron] (from here on, I'll just call it the "snub-ball"). It consists of 12 pentagons and 80 triangles, and the box happened to contain exactly enough pieces to build one! ... Except those 80 triangles were not all the same color. After putting the whole thing together once with the colors more or less at random, I found the result less pretty than I had hoped.


## Coloring the ball

So I took the snub-ball apart and carefully counted the pieces. There were triangles in exactly four colors 🔴🟢🔵🟡, 20 of each (all 12 pentagons, meanwhile, were green 🟢)... Anyone who has read this far is probably having the same brilliant idea: can we build the snub-ball while arranging the four triangle colors in some orderly way? For example, perhaps we could try the following plan:

1. Start with one pentagon piece.
2. Put a bunch of triangles around that pentagon.
3. Keep going around the pentagon, placing triangles in the color order 🔴🟢🔵🟡.

Unfortunately, this plan cannot make the colors line up nicely. There are an odd number of triangles surrounding a pentagon (5 touching it along an edge, plus another 10 touching it only at a vertex), while the number of colors is even. In particular, there is no way to use all four colors equally often.

{: .oversized .figure}
> ![](/images/math/coloring-dodecahedron/three-pentagon-based-solids.png)
>
> From left to right: the snub-ball, the rhombi-ball, and the dodecahedron -- [image from WikiPedia][wiki polyhedra gallery]

Just as I was starting to lose hope, I remembered that the snub-ball we want can actually be obtained from a neighboring solid: the [rhombicosidodecahedron][rhombicosidodecahedron]. (That name is honestly rather *terrifying*, but the important part is that it has three kinds of faces: 12 pentagons, 20 triangles, and 30 squares. From here on, I'll just call it the "rhombi-ball".) To make our snub-ball, we can essentially take the rhombi-ball and "twist" its edges.

More precisely, starting from the rhombi-ball, split every square into two right triangles, then twist the entire ball while keeping the pentagons and equilateral triangles fixed in size. As we twist, the side lengths and angles of the triangles that came from the squares change. Once we have twisted the ball far enough that every triangular face has become equilateral, what we get is exactly the snub-ball. (And of course, the process can be reversed.)

So we can transform our snub-ball construction problem into a rhombi-ball construction problem instead:

- Use two triangles to imitate one *fake* square. We need 30 such fake squares in total, with 10 each in 🔴🔵🟡.
- For the 20 actual triangles that remain, use 🟢, the same color as the pentagons, since these triangles touch the pentagons only at vertices.

And there we go: we use exactly 20 triangles of each color!

Once the problem is transformed this way (20 triangles surrounded by 30 squares), a very natural extra requirement suggests itself: every triangular face should be surrounded by squares of all three different colors. Of course, the first question is whether this is even possible. A little quick trial and error gives a confident answer: yes! And the result is *beautiful*, too 🎉

{: .oversized .figure}
> ![](/images/math/coloring-dodecahedron/polydron-snub-dodecahedron.jpg)
>
> A Polydron snub-ball where every green triangle is adjacent to fake squares in all 3 colors


## Different colorings

Once I had one solution, the natural next question was: *how many ways* are there to build a snub-ball/rhombi-ball with this kind of nice color arrangement?

At first glance, it feels like there must be lots of them. For example, we can permute the *names of the colors* 🔴🔵🟡. That makes it look as if there are many different colorings, but if we look more closely, the underlying structure has not changed at all. So we will not count a mere renaming of the colors as a different solution.

Likewise, if rotating the ball or reflecting it in a mirror gives the same result, we will not count that as a different solution either. (This is already a little harder to test computationally than simply renaming the colors.)

In short, we want to count genuinely different coloring structures, treating rotations, reflections, and permutations of the colors as equivalent.

{: .figure}
> <div class="flex column align-center">
>   <canvas id="canvas-solid" width="600" height="600" aria-label="Interactive 3D snub dodecahedron" style="display: block; width: min(600px, 100%); height: auto; touch-action: none; background: center / contain no-repeat url('/images/math/coloring-dodecahedron/uncolored-rhombicosidodecahedron.png');"></canvas>
>   <div id="canvas-drawing-control" hidden style="width: min(480px, 80%); margin: 0 auto;">
>     <input id="model" type="range" min="0" max="100" value="50" list="model-snap-points" aria-label="Solid morph" style="display: block; width: 100%; margin: 0;">
>     <datalist id="model-snap-points">
>       <option value="0"></option>
>       <option value="50"></option>
>       <option value="100"></option>
>     </datalist>
>     <div aria-hidden="true" style="display: grid; grid-template-columns: repeat(3, 1fr);">
>       <span style="white-space: nowrap;">snub-ball</span>
>       <span style="white-space: nowrap; justify-self: center;">rhombi-ball</span>
>       <span style="white-space: nowrap; justify-self: end;">dodecahedron</span>
>     </div>
>   </div>
> </div>
> <script defer src="/scripts/coloring-dodecahedron.js"></script>
>
> Let's try coloring the ball! Click to color; drag to rotate. <a id="clear-colors" href="#">Click here to reset the colors</a>

Hmm ... so how can we *compute*, in some reasonably simple way, whether any two balls should count as different?

If we go back to the ball we actually built, there is one feature we can inspect on each triangular face: the direction in which the surrounding square colors wind around it. We will say a triangle is colored *counterclockwise* if the surrounding squares appear in the order 🔴🔵🟡 as we go counterclockwise, and *clockwise* if they appear in the opposite order.

If we count the two winding directions over all triangular faces, then whenever two balls have different counts, we can immediately conclude that the balls are different. (If the counts are the same, however, we still cannot conclude that they are identical, because the triangles might occupy different positions.) Also, because we allow mirror reflections, the clockwise and counterclockwise counts may swap. So from here on, we will focus on the case where the counterclockwise count is greater than or equal to the clockwise count.

Using this winding-direction feature, the ball we built can be summarized as having 16 counterclockwise faces and 4 clockwise faces... That is a surprisingly lopsided pair of numbers, and it raises a few questions. Can we make all 20 faces counterclockwise? Can we make the numbers of clockwise and counterclockwise faces exactly equal? Is there anything special about this 16:4 ratio?

The all-20-counterclockwise case is easy to rule out. We can simply try to build the ball while forcing every face to wind counterclockwise, and before long some of the colors are forced into conflict.

{: .figure}
> ![](/images/math/coloring-dodecahedron/ccw-conflict.png)
>
> A conflict caused by trying to color everything counterclockwise: triangle no. 5 cannot be colored counterclockwise

But the question of whether we can have equal numbers of counterclockwise and clockwise faces is much harder. For every triangular face, we have two choices for its winding direction, so the number of possibilities we would have to try grows exponentially unless we quickly prune away impossible choices.

So perhaps we should write a program to help solve the problem. And rather than asking it only about one particular clockwise-to-counterclockwise ratio, we may as well take the bigger view: generate every possible colored ball first, then throw away all duplicates under rotation/reflection/color permutation... Just thinking about implementing that is already tiring, though, because we would have to keep track of triangles, squares, and pentagons all glued together. Is there some way to make the problem simpler?


## Graph theory steps in

Go back to the rhombi-ball and imagine the following: every pentagon expands outward at the same rate. As the pentagons grow, the squares get squeezed thinner and thinner (turning into long, narrow quadrilaterals), while the triangles shrink too (but still uniformly in every direction). When the pentagons have expanded as far as they can and finally touch one another, the 30 squares collapse into the edges between pentagons, while the 20 triangles collapse into the vertices where the pentagons meet.

In other words, the rhombi-ball can be transformed into a [dodecahedron][dodecahedron]!

And for convenience, we can temporarily forget the geometric shape of the dodecahedron and look only at its graph. Since the graph of the dodecahedron can be drawn as a [planar graph][planar graph], we get a nice simple picture with no crossing edges to make our heads hurt.

More importantly, every vertex of this graph has degree 3, and every face of the three-dimensional solid becomes a face of length 5 in the graph. We no longer have to worry about several different kinds of shapes mixed together.

In graph-theory language, our original problem of assembling the pieces into a nice color arrangement becomes an [edge-coloring problem][edge coloring]: color the edges with 3 colors so that all 3 colors meet at every vertex.

At this point, writing the program is much easier. One straightforward approach is to choose a vertex, immediately give its three incident edges three different colors, and then keep extending the coloring from there until the entire ball is colored without conflicts. Whenever a conflict appears, just throw that branch away.

Once we have a complete edge coloring, we try every permutation of the color names (all $3!$ of them) and rotate/reflect the ball in every possible way (120 possibilities), giving us all [graph-isomorphic][graph isomorphism] versions of that ball. We keep only the simplest representative of each coloring ([code here][gist dodec python code]) ... and the program tells us that there is only *one* coloring, namely the one with 16 counterclockwise turns and 4 clockwise turns!!!

{: .oversized .figure}
> ![](/images/math/coloring-dodecahedron/dodecahedron-graph.png)
>
> Edge colorings found by the program. All the solutions it finds reduce to just one distinct coloring


## The beautiful 16:4 ratio

Why the ratio is 16:4? To answer this, let's look back at our attempt to make every vertex around one pentagonal face counterclockwise. We cannot go counterclockwise around all 5 vertices: by the time we reach the last one, its counterclockwise orientation conflicts with the first. (Three does not divide five.) We are therefore forced to have 4 counterclockwise vertices and 1 clockwise vertex in order for the winding to come back consistently to where it started. In other words,

$$
CCW - CW \equiv 0 \pmod{3}
$$

where

- $CCW$ is the number of counterclockwise turns on one pentagonal face,
- $CW$ is the number of clockwise turns on one pentagonal face,
- and we also have the constraint $CCW + CW = 5$.

This is the conclusion for a single pentagonal face. The congruence also shows that no other split works: for example, we cannot have 3 counterclockwise and 2 clockwise turns. The counterclockwise-to-clockwise ratio on one face can only be 4:1 or 1:4.

At this point, we can transform the problem one more time! Instead of edge colors, let us now color the *vertices* of the dodecahedron with two colors, under the rule that every pentagonal face must have its vertices colored in a 4:1 or 1:4 ratio. For this post, we will use

1. 🟠 for a counterclockwise turn,
2. 🟣 for a clockwise turn.

Start by coloring the 5 vertices around the first pentagon in a 🟠:🟣 ratio of 4:1. Now look at the other 2 pentagonal faces that already share the 🟣 vertex but whose remaining vertices are still uncolored. There are 3 cases to consider:

{: .oversized .figure}
> ![](/images/math/coloring-dodecahedron/ccw-coloring-cases.png)
>
> The 3 possible cases for coloring the vertices around the other 2 pentagonal faces

Namely:

1. If one of the two pentagons uses a 4:1 split and the other a 1:4 split, a vertex immediately gets contradictory color requirements.
2. If both use 1:4, there is no contradiction within these first 3 faces, but if we keep propagating the constraints around the "equator", we eventually get contradictions at both "poles".
3. If both use 4:1, something much more interesting happens: all vertices along the outer boundary of these 3 pentagons (including the first pentagon we colored) are 🟠, meaning they are all counterclockwise turns.

In other words, every pentagonal face is forced to use the 4:1 split.

Each pentagonal face therefore contains exactly one 🟣 vertex, and each 🟣 vertex is "hidden" inside a cluster of 3 pentagons. Since the dodecahedron has 12 pentagonal faces in total, the number of 🟣 vertices must be $12 / 3 = 4$.

{: .figure}
> ![](/images/math/coloring-dodecahedron/ccw-hidden-tetrahedron.png)
>
> Four groups of 3 pentagonal faces fit together to form the dodecahedron

And that is why the whole solid has a counterclockwise-to-clockwise ratio (🟠:🟣) of 16:4. Even better, if we connect the 4 clockwise (🟣) vertices, we get a [tetrahedron][tetrahedron] hidden inside the dodecahedron!

Not bad for some lighthearted geometric fun over the holiday 😊


[self geometry boot camp]: /2026/07/30/geometry-boot-camp-2026.html
[gist dodec python code]: //gist.github.com/neizod/b817ac0aa8d286a015c4b61e4df1a288
[wiki polyhedra gallery]: //commons.wikimedia.org/wiki/Polyhedra

[polydron]: //tokyo-shoseki.co.jp/polydron/
[platonic solid]: //en.wikipedia.org/wiki/Platonic_solid
[archimedean solid]: //en.wikipedia.org/wiki/Archimedean_solid
[dual polyhedron]: //en.wikipedia.org/wiki/Dual_polyhedron

[buckyball]: //en.wikipedia.org/wiki/Truncated_icosahedron
[snub dodecahedron]: //en.wikipedia.org/wiki/Snub_dodecahedron
[rhombicosidodecahedron]: //en.wikipedia.org/wiki/Rhombicosidodecahedron
[dodecahedron]: //en.wikipedia.org/wiki/Regular_dodecahedron
[tetrahedron]: //en.wikipedia.org/wiki/Tetrahedron

[planar graph]: //en.wikipedia.org/wiki/Planar_graph
[edge coloring]: //en.wikipedia.org/wiki/Edge_coloring
[graph isomorphism]: //en.wikipedia.org/wiki/Graph_isomorphism
