---
title: Longest Increasing Subsequence
tags:
  - Dynamic Programming
  - Graph Theory
  - Time Complexity
  - Python
  - SVG
  - Math Animation
  - English Post
date: 2021-09-13 15:37:08 +0700
thumbnail: /images/algorithm/lis/graph.png
---

A simple problem in [dynamic programming][]. Given an array of integers of length $n$ as an input. Find a subsequence (skippable, original order) that is longest such that it is [strictly increasing][]. We can solve this efficiently in $O(n \log n)$ time. And this very simple code finds the length of the longest increasing subsequence.

``` python
from bisect import bisect_left

def lis_size(xs):
    tops = []
    for x in xs:
        i = bisect_left(tops, x)
        tops[i:i+1] = [x]
    return len(tops)
```

However, this code might deceive us. Especially when we not only want to find the length, but also the whole subsequence itself. That is because the array `tops` in this code **does not** keep elements of the global longest subsequence. Instead, `tops[k-1]` only keep the last elements of a local longest subsequence of length `k`. Thus, reconstructing a subsequence of other length may or may not include the element `tops[k-1]`... Also, if we go see [the animation on WikiPedia][lis animation], we might confuse that we have to do dynamic programming on 2D array! Which is wrong since we only need a plain simple 1D array to solve this *reconstructing* problem.

Furthermore, there should be a better way to explain this algorithm vividly. Like using a [rooted tree][] to help explaining instead of just array! That is we will build a tree by appending nodes from the input array in the order. Where each new node try to append itself into the shallowest level that not smaller that the existing node of that level. The catch is, when considering each level, the new node can see only the smallest node.

{: .figure}
> ![](/images/algorithm/lis/construct.svg)
>
> Example explanation for a longest increasing subsequence using rooted tree

Which require us to code a little bit longer.

``` python
from math import inf
from bisect import bisect_left
from collections import namedtuple

Node = namedtuple('Node', 'value prevent_eq parent', defaults=(-inf, -inf, None))
Node.ancestors = lambda s: ( [] if s.parent is None else
                             s.parent.ancestors() + [s.value] )

def lis(xs):
    tops = [Node()]
    for key, x in enumerate(xs):
        i = bisect_left(tops, Node(x))
        tops[i:i+1] = [Node(x, -key, tops[i-1])]
    return tops[-1].ancestors()
```

Observe that this is not the only possible answer. Take a look back at the event of appending a new node that point back to its `parent`. Actually, it can point back to multiple parents of the previous level that is smaller than itself. In other words, we may explain it using a graph instead of a tree!

{: .figure}
> ![](/images/algorithm/lis/distinct.svg)
>
> A graph that shows 4 distinct answers of the longest increasing subsequence

Since we can point to multiple parents. The number of distinct answers might explode [exponentially][exponential growth]. To list all the possible answers is impossible to go faster than the total size. However, we can still count the number of distinct answers efficiently. That is it can be done in $O(n \log n)$ with this code.

``` python
PreCell = namedtuple('PreCell', 'inv_value acc parent_index')
Cell = namedtuple('Cell', 'acc value parent_index')

def lis_signature(xs):
    tops = [-inf]
    layers = [[PreCell(-inf, 0, 0), PreCell(inf, 1, 0)]]
    for x in xs:
        i = bisect_left(tops, x)
        tops[i:i+1] = [x]
        if i == len(layers):
            layers += [[PreCell(-inf, 0, 0)]]
        j = bisect_left(layers[i-1], PreCell(-x, inf, inf))
        c = layers[i-1][-1].acc - layers[i-1][j-1].acc + layers[i][-1].acc
        layers[i] += [PreCell(-x, c, j)]
    return [[Cell(c, -x, j) for x, c, j in layer] for layer in layers]

def lis_count(xs):
    return lis_signature(xs)[-1][-1].acc
```

Although there are exponentially large number of distinct answers. But one angle to tackle this kind of problem is to write an exact answer at the given index of some sort order (typically the lexicography order). Which should be done as fast as $O(n)$ per one answer, after preprocessing a signature graph. The next code shows the concept of retriving one answer of a given index, mind that the index order is reversed!

``` python
def lis_index(xs, index=0):
    assert 0 <= index < lis_count(xs)
    signature = lis_signature(xs)
    parent_index = 0
    ys = []
    for layer in reversed(signature[1:]):
        index += layer[parent_index].acc
        locate_index = bisect_left(layer, Cell(index, inf, inf))
        index -= layer[locate_index-1].acc
        parent_index = layer[locate_index].parent_index - 1
        ys += [layer[locate_index].value]
    return ys[::-1]
```

P.S. thanks [@lewcpe][] for suggesting the `bisect` module in Python, the day of suffering writing [binary search][] by own is no more 😂


[@lewcpe]: //twitter.com/public_lewcpe

[dynamic programming]: //en.wikipedia.org/wiki/Dynamic_programming
[strictly increasing]: //en.wikipedia.org/wiki/Monotonic_function#Monotonicity_in_calculus_and_analysis
[lis animation]: //en.wikipedia.org/wiki/File:LISDemo.gif
[rooted tree]: //en.wikipedia.org/wiki/Tree_(graph_theory)#Rooted_tree
[exponential growth]: //en.wikipedia.org/wiki/Exponential_growth
[binary search]: //en.wikipedia.org/wiki/Binary_search_algorithm
