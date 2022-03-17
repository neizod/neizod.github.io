---
title: Megagon and $1+x_1(1+x_2(\dots))$
tags:
  - WikiPedia
  - Dynamic Programming
  - Python
  - SVG
  - Experimental
date: 2021-05-27 20:17:29 +0700
---

Note: *This post is the English-translated version of [the original post](/2021/05/27/megagon-and-sum-of-product-upto-index.html).* (⚠️ work in progress)

You know it's a math joke when [@srakrn][] pointed out that the figure for [megagon][] (a regular polygon with a million sides) on WikiPedia is *actually* a circle.  He tried to fix this by uploading a correct SVG figure.  Unfortunately, the file is too large since his technique described all of a million vertices right within the source.  Some time later, [@ipats][] shed light by suggesting the concept of [`<use>`][svg use], which intrigued me a lot...  Next evening, I've come up with this result:

{: .figure}
> ![](/images/algorithm/misc/megagon.svg)
>
> Honesty, I'm a megagon. It's the resolution that won't let you see my pointy corners. 🥺

At first, I don't think there would be any *difficult* technical issues.  Just draw an initial side, copy over with a proper translation/rotation, rinse and repeat.  Voilà, a regular polygon.

However, when the polygon has lots of sides.  Copying only one side at a time is not only very slow but also doesn't help reduce the source.  It'd be better if we *grouped* multiple sides, then copy this group instead.  This way we may generate new sides at the rate of [exponential growth][], which means it reduces the source exponentially.

For example, if we want to generate a group with $1024$ sides.  We may start with one initial side.  Make two copies of it so now we have two sides.  Group the newly created sides and make two copies so now we have four.  Group them (again) and make two copies (again) so now we have eight... By repeating the process of grouping-copying, we eventually arrived at the desired final group with $1024$ sides.

The issue is that SVG does not *destroy* those intermediate groups[^1].  So the process of grouping-copying above is, indeed, results in a total of 

$$
1 + 2 + 4 + 8 + 16 + \cdots + 512 + 1024 = 2047 \text{ sides.}
$$

The calculation will become more perplexing when at each copying step, the number of copies varied.  Take a look at a scenario with $1$ initial side.  First, we make $4$ copies and group these newly created sides into the first group.  Next, make $2$ copies of the first group $2$ (and group them into the second group).  Finally, copy the second group $3$ times.  This process results in

$$
\underbrace{1}_\text{base}
+ \underbrace{1\cdot4}_\text{1st level}
+ \underbrace{1\cdot4\cdot2}_\text{2nd level}
+ \underbrace{1\cdot4\cdot2\cdot3}_\text{3rd level}
= 37 \text{ sides.}
$$

Generally speaking, let $n$ be the total number of sides that we will *have* after $k$ steps of grouping-copying.  Where at step $i$, we make $x_i$ copies of all sides created from the previous step.  We find that the formula for calculating $n$ is

$$
\begin{align}
n &= 1 + x_1 + x_1x_2 + x_1x_2x_3 + \cdots + x_1x_2x_3\dots x_k
   = 1 + \sum_{j=1}^k \left( \prod_{i=1}^j x_i \right) \\
  &= 1 + x_1(1 + x_2(1 + x_3(1 + \cdots (1+x_k)))).
\end{align}
$$

It is easy to compute $n$ given all known $x_i$.  The other way around, where we know $n$ and want to find all $x_i$, is not as equally simple.  It also has many feasible solutions.  The [trivial][] one is that we let all $x_i=1$ (and have $k=n{-}1$ steps).  Thus, we may want to find the *best* solution that minimized $\sum x_i$ (so we'll have the shortest SVG source for the megagon).  How should we tackle this problem?

Maybe starts with an easy (but not *too* easy) example.  Suppose we want $n=17$.  Knowing that we must have $1$ initial side, left us to generate $16$ more.  For the first step, try copying this base side two times ($x_1=2$); thus, we still need $14$ sides.  Entering the second step, observe that each copy now became two sides, which is okay since $2\mid14$ (two divides fourteen).  We may look at the remaining problem as we want to generate $14/2=7$ more groups.  Therefore, if we make $7$ copies at this step ($x_2=7$), we'll arrive at the desired $17$ sides in total.  With the cost of construction $\sum x_i = 9$.

Let's try to alter the process in the previous example.  At step one, what if we make $3$ copies of the base side instead?  Since it left us to generate $13$ more sides, it is clear that we faced a dead-end because $3\nmid13$.  By analysing in the same manner, we also find that these number of copies $\lbrace5,6,7,9,10,11,12,13,14,15\rbrace$ brings us to the dead-end.

Now, consider another viable decision by making $4$ copies in step one ($x_1=4$) instead.  That left us $12$ sides more (or $12/4=3$ groups) to generate.  When we make $3$ copies in step two ($x_2=3$), we'll have all sides needed with the cost of $\sum x_i = 7$; which is also the cheapest cost among all solutions of $n=17$.

With insights from the above example, we may write a recurrence relation for [dynamic programming][] as

$$
c(i) = \min_{d \in \mathbb{N},\; d | i}\left( d + c\left( {\frac{i}{d}-1} \right) \right).
$$

Where $c$ is the cost function that we want to minimized.

Plugged in the megagon ($n=10^6$), we find all $x_i$ that yields the cheapest cost:

$$
\begin{array}{c|cc}
i & 1 & 2 & 3 & 4 & 5 & 6 & 7 & 8 & 9 & 10 & 11 & 12 \\
\hline
x_i & 3 & 2 & 5 & 4 & 4 & 3 & 3 & 5 & 3 & 2 & 2 & 2
\end{array}
$$

Thus, left us mental workout on geometry to find the correct rotating angles after copying those groups.  The genuine megagon with the smallest file size should emerge in no time.  Our journey should come to an end.

...

No.  Not yet.  Although we have the shortest code that reduced file size by ten thousand times.  But SVG (or maybe my hardware) currently cannot handle a million [`<line>`][svg line] defined recursively.  Even if we wait for the web engine to respond, the resulting figure still looked ugly since some sides are too short to be drawn on the screen.

Luckily, there is the [`<polyline>`][svg polyline] that draws consecutive lines within a single stroke.  Thus, we use this to draw initial sides that would be too small to draw individually.  We also have to update the equation for computing $n$ a bit by including $x_0$, the number of initial sides, to

$$
n = x_0(1 + x_1(1 + x_2(1 + \cdots (1+x_k))))
  = \sum_{j=0}^k \left( \prod_{i=0}^j x_i \right).
$$

By experimental, we find that an acceptable value for the base polyline is $x_0=50$.  This value tries to balance both file size and rendering, as can be seen above in the first figure of this article.

{: .figure}
> ![](/images/algorithm/misc/megagon.svg#zoom-250x)
>
> Zooming 250x, see my pointy corners now? 😝

The second figure, here, is literally the first figure magnified 250 times.  So the area of 500x500 pixels in the second figure is the area of 2x2 in the first figure.  It shows the boundary of the megagon with exactly 1 pixel thick.  The initial sides, 50 sides, highlighted in purple, still have a width less than 0.1 pixels.  Also, in some browsers, we may observe gaps between polylines (floating point precision error?).

I'll conclude this post with the complete source code for generating any $n$-gon in SVG.

``` python
from types import SimpleNamespace as namespace
from math import sin, cos, tan, radians
from operator import mul
from functools import reduce
from itertools import product as cartesian_product
from collections import Counter

def translate(center, x, y):
    return x+center, y+center

def _rotate(angle, x, y):
    return x*cos(angle) - y*sin(angle), x*sin(angle) + y*cos(angle)

def rotate(x, y, angle, center):
    return translate(center, *_rotate(angle, *translate(-center, x, y)))

def iter_primes(memo=namespace(pi=0, ps=[2, 3])):
    k = 0
    while True:
        while len(memo.ps) <= k:
            head = memo.ps[memo.pi]**2 + 1
            memo.pi += 1
            tail = memo.ps[memo.pi]**2
            seive = list(range(head, tail))
            for p in memo.ps[:memo.pi]:
                size = 1 + (tail - head + (head%-p)) // p
                seive[-head%p::p] = [0] * size
            memo.ps += (p for p in seive if p)
        yield memo.ps[k]
        k += 1

def factors(n):
    if n == 1:
        return [1]
    fs = []
    for p in iter_primes():
        if p**2 > n:
            break
        while n % p == 0:
            fs += [p]
            n //= p
    if n > 1:
        fs += [n]
    return fs

def divisors(n):
    gfs = ({p**i for i in range(k+1)} for p, k in Counter(factors(n)).items())
    return sorted(reduce(mul, ts) for ts in cartesian_product(*gfs))

def calc_ngon(layers):
    r = 1
    for v in reversed(layers):
        r *= v
        r += 1
    return r - 1

def calc_layers(ngon, memo=[()]):
    while len(memo) < ngon+1:
        row = [(d, *memo[len(memo)//d-1]) for d in divisors(len(memo))]
        memo += [min(row, key=lambda r: (sum(r), len(r)))]
    return memo[ngon]

class Polygon(object):
    def __init__(self, data):
        if isinstance(data, int):
            self.ngon = data
            self.rel_pieces = calc_layers(data)
        elif isinstance(data, list) or isinstance(data, iter):
            self.rel_pieces = data
            self.ngon = calc_ngon(data)
        else:
            raise KeyError('initial data must be int or list of int.')
        if self.ngon < 3:
            raise KeyError('its absurd to draw a polygon with nos sides < 3.')
        self.angle = 360/self.ngon
        self.abs_pieces = [self.rel_pieces[0]]
        self.tot_pieces = [self.rel_pieces[0]]
        self._init_pieces_info()

    def _init_pieces_info(self):
        for i in range(1, len(self.rel_pieces)):
            self.abs_pieces += [self.abs_pieces[i-1] * self.rel_pieces[i]]
            self.tot_pieces += [self.tot_pieces[i-1] + self.abs_pieces[i]]

    def _base(self, radius, padding, precision):
        center = radius + padding
        x = center - (radius * tan(radians(self.angle/2)))
        y = padding
        spec = []
        for _ in range(self.rel_pieces[0]+1):
            spec += f'{round(x, precision)},{round(y, precision)}',
            x, y = rotate(x, y, radians(self.angle), center)
        color = 'stroke="#000" fill="none"'
        yield f'<g id="a0"><polyline {color} points="{" ".join(spec)}" /></g>'

    def _group(self, k, radius, padding, precision):
        if k == 0:
            yield from self._base(radius, padding, precision)
            return
        center = radius + padding
        theta = self.angle * self.abs_pieces[k-1]
        yield f'<g id="a{k}">'
        for i in range(1, 1+self.rel_pieces[k]):
            rot = round(theta*i, precision)
            transform = f'transform="rotate({rot} {center} {center})"'
            yield f'<use xlink:href="#a{k-1}" {transform} />'
        yield '</g>'

    def _svg(self, radius, padding, precision):
        size = 2 * (radius + padding)
        xmlns = 'xmlns="http://www.w3.org/2000/svg"'
        xlink = 'xmlns:xlink="http://www.w3.org/1999/xlink"'
        yield f'<svg {xmlns} {xlink} height="{size}" width="{size}">'
        for i, _ in enumerate(self.rel_pieces):
            yield from self._group(i, radius, padding, precision)
        yield '</svg>'

    def svg(self, radius, padding, precision):
        return '\n'.join(self._svg(radius, padding, precision))
```

P.S. [Tanapoom Laoaroon][] tells me that this dynamic programming technique is so similar to the problem Matrygons from the last week's Google Code Jam.  Only that their objective function seeks the largest $k$ instead (with some more constraints that $x_0\ge3$ and $x_i\ne1$).  So, their problem is a *corollary* of this one 😜.



[^1]: Turn out that there is [`<defs>`][svg defs] that let us draw something in the air and not on the canvas, yet.  Thus, we may *hide* those intermediate groups and freely use the simpler binary number technique.


[@srakrn]: //twitter.com/srakrn
[@ipats]: //twitter.com/ipats
[Tanapoom Laoaroon]: //facebook.com/TanapoomLaoaroon

[megagon]: //en.wikipedia.org/wiki/Megagon
[exponential growth]: //en.wikipedia.org/wiki/Exponential_growth
[trivial]: //en.wikipedia.org/wiki/Triviality_(mathematics)
[dynamic programming]: //en.wikipedia.org/wiki/Dynamic_programming

[svg use]: //developer.mozilla.org/en-US/docs/Web/SVG/Element/use
[svg line]: //developer.mozilla.org/en-US/docs/Web/SVG/Element/line
[svg polyline]: //developer.mozilla.org/en-US/docs/Web/SVG/Element/polyline
[svg defs]: //developer.mozilla.org/en-US/docs/Web/SVG/Element/defs
