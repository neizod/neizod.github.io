#!/usr/bin/env python3

from math import factorial
from operator import mul
from functools import reduce
from itertools import combinations

import matplotlib.pyplot as plt


SQRT12 = (1/2)**.5
SQRT32 = (3/2)**.5

def multinomial(*xs):
    return factorial(sum(xs)) // reduce(mul, map(factorial, xs))

def endpoint(a, b, c):
    x, y, z = 0, 0, 0
    for _ in range(a):
        x += SQRT12
        z -= 1
    for _ in range(b):
        x -= SQRT12/2
        y += SQRT32/2
        z -= 1
    for _ in range(c):
        x -= SQRT12/2
        y -= SQRT32/2
        z -= 1
    return x, y, z, multinomial(a, b, c)

def tetrahedron(a, b, c):
    *t, _ = endpoint(a, b, c)
    *u, _ = endpoint(a+1, b, c)
    *v, _ = endpoint(a, b+1, c)
    *w, _ = endpoint(a, b, c+1)
    return [(t,u), (t,v), (t,w), (u,v), (u,w), (v,w)]

# ============================================================================


N = 6
points = []
for n in range(N):
    for i in range(1+n):
        for j in range(1+n-i):
            k = n - i - j
            points += [endpoint(i, j, k)]

xs = [x for x, _, _, _ in points]
ys = [y for _, y, _, _ in points]
zs = [z for _, _, z, _ in points]

edges = []
for n in range(N-1):
    for i in range(1+n):
        for j in range(1+n-i):
            k = n - i - j
            edges += tetrahedron(k, j, i)
edges = edges[::-1]


fig = plt.figure(figsize=(12,12))
ax = fig.add_subplot(projection='3d')
ax.set_axis_off()
ax.set_proj_type('ortho')
ax.azim = 22
ax.elev = 10
ax.dist = 7.75
ax.scatter(xs, ys, zs, color='#666')
for i, (p1, p2) in enumerate(edges):
    i %= 6
    color = ['#ccc','#55b'][i < 3]
    #color = ['#ccc','#c53'][i % 2 == 1]
    ax.plot(*zip(p1, p2), color=color)
for x, y, z, v in points:
    ax.text(x, y, z, v, size=16)
