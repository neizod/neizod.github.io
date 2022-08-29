---
title: Hacker Cup 2022 รอบคัดเลือก
tags:
  - Competitive Programming
  - Facebook Hacker Cup
  - Python
  - Rant
date: 2022-08-30 02:24:02 +0700
---

น่าจะเป็นปีสุดท้ายแล้วหล่ะมั้งที่จะเล่นเขียนโปรแกรมแก้โจทย์ของ ~~Facebook~~ Meta ไม่ใช่เพราะอิ่มตัวอะไรหรอก แต่คือบ่นการแข่งของเจ้านี้มาตลอดทุกปีว่าแม่งเขียนโจทย์อ่านไม่รู้เรื่อง ซึ่งถ้าเป็นสายแข่งประจำอยู่แล้วอาจจะมองข้ามๆ เรื่องเนื้อหาโจทย์ไปได้ แต่เราไม่ได้ว่างซ้อมว่างแข่งโดยเฉพาะไง นานๆ ทีแวะมาเล่นก็อยากจะสนุกป่ะ อย่างน้อยขอโจทย์ที่มันอ่านเป็นภาษาคนได้หน่อยเหอะ ไม่ใช่พ่นแต่อะไรเชิงเทคนิคแบบที่นึกว่าคนอ่านเค้า on the same page กับมึงเรียบร้อยแล้ว

แต่ที่จะไม่ให้อภัยอีกต่อไปคือวิศวกร Meta นี่ตกต่ำถึงขนาดนี้แล้วเหรอวะ พี่มัวแต่เมาจักรวาลนฤมิตหรือไง เลยแต่งโจทย์แบบไม่สนใจโลกความเป็นจริง โยนตารางแผนที่ขนาดใหญ่ยักษ์มาให้แก้ปัญหา พอคำนวณเสร็จแล้วก็บอกว่าให้ส่งไฟล์ตารางเต็มๆ ทั้งอันกลับไปที่เซิฟเวอร์ ซึ่งไอ้คำตอบที่ถูกต้องนั่นหนะแค่ขนาดไฟล์อย่างเดียวก็ปาไป 10Mb กว่าแล้ว สุดท้ายเป็นไง คนแข่งส่งไฟล์กันเป็นหมื่นจนเซิฟเวอร์รับไม่ไหว ต้องมาประกาศขอโทษขอโพยแล้วให้ส่งคำตอบใหม่ในช่องทางอื่น ... แม่งเอ้ย กร่อยชิบหาย

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

