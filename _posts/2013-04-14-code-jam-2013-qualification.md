---
title: Code Jam 2013 รอบคัดเลือก
tags:
  - Programming
  - Google Code Jam
  - Python
  - Haskell
date: 2013-04-14 17:39:00 +0700
---

เนื่องจากไม่อยากให้เกิดเหตุการณ์แบบรอบ 1 ของปีที่แล้ว ปีนี้เลยนอนเอาแรงไม่บ้าพลังถ่างตาทำตั้งแต่เช้ามืด ทำให้กว่าจะได้เริ่มอ่านโจทย์ก็บ่าย 2 เข้าไปแล้ว

ปีนี้ความตั้งใจแรกคือจะพยายามเขียนส่งให้ได้หลายๆ ภาษา คือฝึก ML, Lisp, Bash อะไรพวกนี้จนคิดว่าน่าจะคล่องพอเอามาใช้แก้โจทย์ปัญหาจริงๆ ได้แล้ว น่าเสียดายที่รับ input ไม่เป็น เลยกลับมาตายรังด้วย Python เหมือนเดิม (แต่ก็มี Haskell โผล่มาครึ่งข้อ) ไม่แน่ใจว่ารอบต่อๆ ไปจะเขียน C++ ทันหรือเปล่า เพราะโดนจำกัดเวลาเหลือแค่ 2.5 ชั่วโมงแล้ว

ข้อแรกโจทย์ extended เกม OX ให้ใหญ่ขึ้นเป็นตาราง $4\times4$ แถมยังอนุญาตให้มี wildcard (เป็นได้ทั้ง X และ O) อย่างมาก 1 ที่บนกระดาน ก็ถามว่าเกมตอนนี้ใครชนะ หรือว่าเสมอ หรือว่ายังเล่นไม่จบ

เคยเจอคำถามเกี่ยวกับ grid แบบนี้มาพอสมควร อันที่จริงก็ต้องไล่เช็คทั้งแนวตั้ง แนวนอน และก็แนวทะแยงซ้ายขวาเลย แต่เพิ่งมาสำนึกได้ว่าเขียนแบบนั้นมี code ซ้ำกันเยอะๆ จะเริ่ม maintenance ยากละ เลยสังเกตว่าถ้าหมุน grid ให้ได้เป็นแบบนี้

    1 2 3      7 4 1
    4 5 6  =>  8 5 2
    7 8 9      9 6 3

จะสามารถ reuse code ส่วนที่เช็คแนวนอนมาเช็คแนวตั้งได้ด้วย เช่นเดียวกับ code เช็คแนวทะแยง การ implement แค่ส่วนนี้คงมีวิธีเจ๋งๆ ให้เลือกใช้เยอะอยู่ ส่วนผมที่มาจากสาย functional เลือกใช้ `transpose . reversed` ครับ

``` python
def transpose(grid):
    return [''.join(line) for line in zip(*grid)]

def chk_hori(grid):
    for line in grid:
        if all(c in 'XT' for c in line):
            return 'X won'
        if all(c in 'OT' for c in line):
            return 'O won'

def chk_diag(grid):
    if all(grid[i][i] in 'XT' for i in range(len(grid))):
        return 'X won'
    if all(grid[i][i] in 'OT' for i in range(len(grid))):
        return 'O won'

def chk_won(grid):
    for _ in range(2):
        for chk in [chk_hori, chk_diag]:
            answer = chk(grid)
            if answer:
                return answer
        grid = transpose(reversed(grid))

def chk_full(grid):
    return not any('.' in line for line in grid)

for case in range(int(input())):
    grid = [input() for _ in range(4)]
    input()
    answer = chk_won(grid)
    if not answer:
        answer = 'Draw' if chk_full(grid) else 'Game has not completed'
    print('Case #{}: {}'.format(case+1, answer))
```

---

ข้อถัดมาถามว่าสามารถใช้เครื่องตัดหญ้าอัตโนมัติ (ที่ดันวิ่งตรงไปข้างหน้าได้อย่างเดียว) ตัดหญ้าให้แต่ละช่องมีความสูงตาม pattern ที่วางไว้ได้หรือเปล่า

พบว่า algorithm ง่ายกว่าที่คิด คือดูว่าแต่ละจุดบนสนามหญ้านั้น ต้องมีความสูง**เท่ากับ**ความสูงหญ้าที่สูงที่สุดในแนวนอนหรือแนวตั้งเท่านั้น เพราะถ้าเกิดมีจุดที่สูงกว่าทั้งแนวนอนและแนวตั้งพร้อมกัน จะทำให้ไม่สามารถตัดหญ้าในช่องนั้นให้ต่ำกว่าค่าสูงสุดได้

``` python
def transpose(lawn):
    return [list(line) for line in zip(*lawn)]

def beautiful_garden(lawn, n, m):
    tlawn = transpose(lawn)
    def chk(y, x):
        return lawn[y][x] in [max(tlawn[x]), max(lawn[y])]
    return all(all(chk(y, x) for x in range(m)) for y in range(n))

for case in range(int(input())):
    n, m = [int(i) for i in input().split()]
    lawn = [[int(i) for i in input().split()] for _ in range(n)]
    answer = 'YES' if beautiful_garden(lawn, n, m) else 'NO'
    print('Case #{}: {}'.format(case+1, answer))
```

---

ข้อที่ 3 ให้ว่ามีเลข palindrome ที่รากที่สองของมันก็ยังเป็น palindrome ด้วยทั้งหมดกี่ตัวในช่วงที่กำหนด ซึ่งมีความรู้สึกว่าถ้าเล่นกับ palindrome แล้ว Haskell จะสวยงามมาก แต่ก็ไปตายที่ test กลางเลยกลับไปใช้ Python แทน

``` haskell
import Data.List.Split (splitOn)

boolAsNum b = if b then 1 else 0

isSquare x = root^2 == x
    where root = sqrt x

isPalindrome x = y == reverse y
    where y = show x

countFair x y
    | x > y     = 0
    | otherwise = (boolAsNum $ all isPalindrome [x,x^2]) + countFair (x+1) y

eachLoop nosLoop = do
    raw <- getLine
    let rawSqrtNum = [sqrt $ read x | x <- splitOn " " raw]
        [start, stop] = [f x | (f,x) <- zip [ceiling, floor] rawSqrtNum]
    putStrLn $ "Case #" ++ (show nosLoop) ++ ": " ++ (show $ countFair start stop)

main = do
    allLoop <- getLine
    sequence_ [eachLoop n | n <- [1..read allLoop]]
```

ส่วนนี่คือ Python ที่ optimize ไปนิดหน่อยสำหรับความยากปานกลาง โดยส่วนที่วนสร้างเลข palindrome ตัวถัดไปยังไม่ได้ optimize สำหรับโจทย์นี้โดยเฉพาะเลย (ว่าแล้วก็ต้องเขียนเก็บเข้า lib ตัวเองซะแล้ว)

``` python
odd = lambda x: x % 2 == 1
square = lambda n: int(n ** 0.5) ** 2 == n
palindrome = lambda n: str(n) == str(n)[::-1]

def int_sqrt(n):
    if n == 0:
        return 0
    a, b = divmod(n.bit_length(), 2)
    x = 2 ** (a + b)
    while True:
        y = x + n // x
        y //= 2
        if y >= x:
            return x
        x = y

def next_palindrome(n):
    s = str(n)
    size = len(s)

    fst = s[:size//2+1] if odd(size) else s[:size//2]
    lst = s[-size//2:]

    size_old_fst = len(fst)
    if fst <= lst[::-1]:
        fst = str(int(fst) + 1)

    lst = fst[:-1] if len(fst) > size_old_fst else fst
    return int(fst[:-1] + lst[::-1]) if odd(size) else int(fst + lst[::-1])

def palindrome_range(start, stop):
    while start < stop:
        if palindrome(start):
            yield start
        start = next_palindrome(start)

for case in range(int(input())):
    start, stop = [int(n) for n in input().split()]

    start = int_sqrt(start) + (0 if square(start) else 1)
    stop = int_sqrt(stop)

    answer = sum(palindrome(pal**2) for pal in palindrome_range(start, stop+1))
    print('Case #{}: {}'.format(case+1, answer))
```

---

ส่วนข้อ 4 ไม่ได้ทำ เพราะสังเกตเห็น pattern ของข้อ 3 เลยกะจะแก้ความยากระดับโหดสุด (input ใหญ่ได้ถึง $10^{100}$) แต่ลอง optimize ดูแล้วทำทันแค่ $10^{80}$ เท่านั้น ก็เลยต้องตัดใจไปตามระเบียบ เพราะแต้มเท่านี้ก็ถือว่าเพียงพอสำหรับรอบ 1 แล้วครับ ;)
