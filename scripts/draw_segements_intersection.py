#!/usr/bin/env python3

from collections import namedtuple

import matplotlib.pyplot as plt


Point = namedtuple('Point', 'x y')

Segment = namedtuple('Segment', 'p q')
Segment.from_floats = lambda x0, y0, x1, y1: Segment.from_points(Point(x0, y0), Point(x1, y1))
Segment.from_points = lambda p, q: Segment(*sorted([p, q]))


def main():
    from random import random as r
    segments = [ Segment.from_floats(i+r(), j+r(), i+r(), j+r())
                     for i in range(3) for j in range(3) for _ in range(100) ]
    plt.plot(*(pair for a, b in segments for pair in [(a.x, b.x), (a.y, b.y)]))
    plt.savefig('half-dense-half-sparse-example.png')


if __name__ == '__main__':
    main()
