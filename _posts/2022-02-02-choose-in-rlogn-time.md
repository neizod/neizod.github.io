---
title: Write a Subset of $\binom{n}{r}$ in $O(r\log n)$ Time
tags:
  - Combinatorics
  - Algorithm
  - Mathematics
  - English Post
date: 2022-02-02 22:02:02 +0700
---

When dealing with combinatorics computation, like $n!$ or $\binom{n}{r}$, we often interest in the numerical outcome. For example, $\binom{8}{3} = 56$, which means given a set of $8$ elements, there are $56$ distinct ways to choose $3$ elements from it.

But for each way to choose those elements, what are the chosen elements? To enumerating in a nice-looking order, we may interest in the [lexicographic][] order. For example, let the set of those $8$ elements consist of the very first Latin alphabet, $ABCDEFGH$. The first way of choosing $3$ alphabets is $ABC$, follow by $ABD$, all the way to down to $FGH$. The next figure list all of such combinations.

$$
\begin{array}{c}
ABC \quad ABD \quad ABE \quad ABF \quad ABG \quad ABH \\
ACD \quad ACE \quad ACF \quad ACG \quad ACH \\
ADE \quad ADF \quad ADG \quad ADH \\
AEF \quad AEG \quad AEH \\
AFG \quad AFH \\
AGH \\
BCD \quad BCE \quad BCF \quad BCG \quad BCH \\
BDE \quad BDF \quad BDG \quad BDH \\
BEF \quad BEG \quad BEH \\
BFG \quad BFH \\
BGH \\
CDE \quad CDF \quad CDG \quad CDH \\
CEF \quad CEG \quad CEH \\
CFG \quad CFH \\
CGH \\
DEF \quad DEG \quad DEH \\
DFG \quad DFH \\
DGH \\
EFG \quad EFH \\
EGH \\
FGH
\end{array}
$$

Observe that there are $21$ distinct ways to starts with $A$. After that only $15$ distinct ways to starts with $B$. Down to the final $F$ that can be starts with only one way.

We may also view the above figure as the inverted pyramid such that each layer separated by a starting alphabet. When we look deep down (no pun intended) we'll se that the distinct ways that starts with $A$ is equal to $\binom{8}{3}{-}\binom{7}{3}$. That is the size of an interested layer can be found by substracting a larger pyramid with that layer at the top, with a smaller pyramid before that layer.

Furthermore, by realizing [Pascal's triangle][pascal triangle], we'll see that $\binom{8}{3}{-}\binom{7}{3} = \binom{7}{2}$. In other words, *force* choose $A$ so now we have $7$ alphabets left to choose $2$ more. Thus there are $\binom{7}{2}$ distinct ways that have $A$ as a starting alphabet.

We can generally applied this technique, e.g., starts with $B$ are $\binom{7}{3}{-}\binom{6}{3}=\binom{6}{2}$ distinct ways.

From this observation, we have a straightforward algorithm for enumerating such subset at an index $i$, according to the lex order.

``` python
from math import comb    # comb(n, r) = n!/(r!(n-r)!)

def choose(n, r, i, x=0):
    assert 0 <= i < comb(n, r)
    if r == 0:
        return []
    if i >= comb(n-1, r-1):
        j = i - comb(n-1, r-1)
        return choose(n-1, r, j, x+1)
    return [x] + choose(n-1, r-1, i, x+1)
```

Too bad that this algorithm runs in $O(n)$ time, since it might recurse down at most $n$ steps to find the final element... So, can we speed this up?

A searching problem on a sorted data! Yes, let's applying the [binary search][]. Notice that if we want to find the size of consecutive layers, we can substract the larger pyramid with a lot smaller pyramid. Thus we might throw away around half of the layer one at a time. Which is the core concept of binary search. Hence we arrived at this improved code.

``` python
def binsearch(n, r, i, lo, hi):
    if lo >= hi:
        return lo
    mid = (lo + hi) // 2
    if i < comb(n, r) - comb(mid, r):
        return binsearch(n, r, i, lo, mid)
    else:
        return binsearch(n, r, i, mid+1, hi)

def choose(n, r, i, x=0):
    if r == 0:
        return []
    k = binsearch(n, r, i, lo=0, hi=n)
    y = x + n - k
    j = i - (comb(n, r) - comb(k, r))
    return [y] + choose(k-1, r-1, j, y+1)
```

Too bad that this binary search gives us an element one at a time. That is we might speed up the search for a correct element in $O(\log n)$ time. But to find all of $r$ elements, the total time will grow to $O(r \log n)$ anyway.

Is $O(r \log n)$ better than $O(n)$ ? If $r \to n$, then it is worse. However, in the real world application, we often interest only the case where $r \ll n$. And when $r >n/2$, we can also apply a *flip* technique on the Pascal's triangle, that is:

``` python
set(range(n)) == set(choose(n, r, i) + choose(n, n-r, comb(n,r)-1-i))
```



[lexicographic]: //en.wikipedia.org/wiki/Lexicographic_order
[pascal triangle]: //en.wikipedia.org/wiki/Pascal%27s_triangle
[binary search]: //en.wikipedia.org/wiki/Binary_search_algorithm