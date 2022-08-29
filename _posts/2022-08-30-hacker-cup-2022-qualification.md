---
title: Hacker Cup 2022 Qualification
tags:
  - Competitive Programming
  - Facebook Hacker Cup
  - Python
  - Rant
  - English Post
date: 2022-08-30 02:24:02 +0700
---

I'm done. This is the last year I'll participate in the competitive programming event hosted by ~~Facebook~~ Meta. It's not that I'm moving on to other things in life. I still love coding. But I've complain every single year that the problem statement in this competition is poorly written. For those who are into competitive programming, the unpoetic writing might not be a big deal (they'll practice w/ thousands of problems, training to look right into the constraint anyway). But for me, as a puzzle-solving hobbyist, I want to have *fun* solving these problems too! I think it is so rude for the judge to state the programming problem mostly in a technical manner, ignoring that the reader aren't even on the same page when explaining.

However, the most severe issue here is that it's clearly Meta's engineer is degrading to the point of making *trash*. Are you high on *your* metaverse? So you forget how the real world really operated. Like, giving a huge puzzle table to competitors. Then ask us to send back the solved table to your server. The correct answer alone has file size over 10Mb already. How about you receiving files from twenty thousands competitors? Your server will be malfunction, without doubt. Yes, you have circumvent the incident by, given us a second chance, accepting file via other channels... But the mood and tone of the *competition* is blown off already!

### Second Hands

``` python
from collections import Counter

def displayable(xs, k):
    kmin = kmax = k
    for c in Counter(xs).values():
        if c > 2:
            return False
        if c == 2:
            kmin -= 1
            kmax -= 1
        elif c == 1:
            kmax -= 1
            kmin, kmax = sorted([kmin, kmax])
    return all(v >= 0 for v in [kmin, kmax])

for t in range(int(input())):
    n, k = [int(x) for x in input().split()]
    xs = [int(x) for x in input().split()]
    answer = ['NO','YES'][displayable(xs, k)]
    print(f'Case #{t+1}: {answer}')
```

### Second Friend

``` python
DIRS = [(0, +1), (+1, 0), (0, -1), (-1, 0)]

def pairs(r, c):
    return ((i, j) for i in range(r) for j in range(c))

def get_happy(r, c, grid):
    def vaild_cell(i, j):
        return 0 <= i < r and 0 <= j < c and grid[i][j] != '#'
    def neighbors(i, j):
        return ((i+dy, j+dx) for dy, dx in DIRS if vaild_cell(i+dy, j+dx))
    def count(i, j):
        return sum(fill[y][x] == '^' for y, x in neighbors(i, j))
    fill = [['^#'[cell == '#'] for cell in row] for row in grid]
    bans = {(i, j) for i, j in pairs(r, c) if count(i, j) < 2}
    while bans:
        i, j = bans.pop()
        if grid[i][j] == '#':
            continue
        fill[i][j] = '.'
        for y, x in neighbors(i, j):
            if fill[y][x] == '^' and count(y, x) < 2:
                bans.add((y, x))
    if not all(fill[i][j] == '^' for i, j in pairs(r, c) if grid[i][j] == '^'):
        return []
    return fill

for t in range(int(input())):
    r, c = [int(v) for v in input().split()]
    grid = get_happy(r, c, [list(input().strip()) for _ in range(r)])
    answer = ['Impossible','Possible'][bool(grid)]
    print(f'Case #{t+1}: {answer}')
    for line in grid:
        print(''.join(line))
```

### Second Meaning

``` python
def binary_to_dashed_dotted(number):
    return ''.join('.-'[int(c)] for c in f'{number:08b}')

def eight_dashed_dotted():
    return [binary_to_dashed_dotted(i) for i in range(2**8)]

def valid_remaining_alphabets(word):
    return [w for w in eight_dashed_dotted() if not w.startswith(word[:8])]

for t in range(int(input())):
    n = int(input())
    answer = valid_remaining_alphabets(input().strip())
    print(f'Case #{t+1}:')
    for alphabet in answer[:n-1]:
        print(alphabet)
```

