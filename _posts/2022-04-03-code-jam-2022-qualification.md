---
title: Code Jam 2022 รอบคัดเลือก
tags:
  - Competitive Programming
  - Google Code Jam
  - Python
  - R
  - Haskell
date: 2022-04-03 14:10:26 +0700
---

เทศกาลทดลองเขียนโปรแกรมด้วยภาษาใหม่ๆ วนกลับมาอีกปี ปีนี้ Google รู้ใจ(?) ทำ easter egg จำลอง[บัตรเจาะรู][punched card]แบบคอมพิวเตอร์ยุค 1970 มาให้เล่นกันเลยทีเดียว 🤪

## Punched Cards

{: .oversized .figure}
> ![](/images/algorithm/misc/punched-cards-python.png)
>
> นั่งเจาะเล่นจนจำได้ว่าวงเล็บเปิด/ปิดคือ 58 กับ control บน/ล่าง ถถถถถ

## 3D Printings

``` haskell
import Control.Monad (replicateM)
import Text.Printf (printf)

getIntegers = do
    xs <- getLine
    return [read x :: Integer | x <- words xs]

transpose xs
  | any null xs = []
  | otherwise   = (map head xs) : (transpose $ map tail xs)

pickAmount x ys = (min x (1000000 - sum ys)) : ys

sumToMillion xs = foldr pickAmount [] xs

test t = do
    printers <- replicateM 3 getIntegers
    let [c,m,y,k] = map minimum $ transpose printers
    let answer = if c+m+y+k < 1000000
        then "IMPOSSIBLE"
        else unwords $ map show $ sumToMillion [c,m,y,k]
    printf "Case #%d: %s\n" t answer

main = do
    [loops] <- getIntegers
    sequence_ [test t | t <- [1..loops]]
```

## d1000000

``` R
longest_straight <- function(n, dice) {
    n + min(0, min(sort(dice) - 1:n))
}

f <- file("stdin", "r")
for (t in 1:as.integer(readLines(f, n=1))) {
    n <- as.integer(readLines(f, n=1))
    dice <- as.integer(unlist(strsplit(readLines(f, n=1), " ")))
    answer <- longest_straight(n, dice)
    cat(paste0("Case #", t, ": ", answer, "\n"))
}
```

จริงๆ ข้อนี้ R รันไม่ผ่าน ... น่าจะติดขอควดตรงอ่านข้อมูลนำเข้าขนาดใหญ่ยักษ์ไม่ไหวเนี่ยแหละ พอเปลี่ยนไปเขียนด้วย C++ ด้วยอัลกอริทึมแบบเดิมเป๊ะๆ แล้วถูกเลย นับว่าน่าเสียดายมากๆ ที่ภาษาที่เล่นกับข้อมูลแล้วสนุกกลับเอามาใช้ทำโจทย์ไม่ได้ 🙁

## Chain Reactions

``` python
import sys
sys.setrecursionlimit(250000)

class Node(object):
    def __init__(self):
        self.fun = 0
        self.children = []

    def __repr__(self):
        if not self.children:
            return f'Leaf({self.fun})'
        return f'Node({self.fun}, {self.children})'

    def reduce_tree(self):
        while len(self.children) == 1:
            child = self.children[0]
            self.fun = max(self.fun, child.fun)
            self.children = child.children
        for child in self.children:
            child.reduce_tree()

    def _auxfun(self):
        if not self.children:
            return (self.fun, self.fun)
        subtrees = [child._auxfun() for child in self.children]
        serious = min(subtrees)[0]
        head = max(serious, self.fun)
        acc = sum(st[1] for st in subtrees) + (head-serious)
        return (head, acc)

    def maximum_fun(self):
        self.reduce_tree()
        return self._auxfun()[1]

for t in range(int(input())):
    n = int(input())
    nodes = [Node() for _ in range(n+1)]
    for i, fun in enumerate(map(int, input().split()), 1):
        nodes[i].fun = fun
    for child, parent in enumerate(map(int, input().split()), 1):
        nodes[parent].children += [nodes[child]]
    answer = nodes[0].maximum_fun()
    print(f'Case #{t+1}: {answer}')
```

ส่วน `reduce_tree` นั้นไม่จำเป็นต้องทำก็ได้ถ้าเครื่องคอมพิวเตอร์รับมือกับการเขียนฟังก์ชันเรียกตัวเองลึกลงไปเป็นแสนครั้งไหว ซึ่งเครื่องที่เราใช้เขียนโปรแกรมก็ไหวแหละ (และเครื่องคอมทั่วไปในปัจจุบันก็ควรไหวด้วย) แต่เครื่องฝั่งกรรมการกลับโยน Runtime Error ใส่ตอนทดสอบข้อมูลนำเข้าชุดที่ซ่อนไว้ซะงั้น (หมดโอกาสแก้ตัว) ทั้งที่โจทย์บอกว่าให้ลิมิต $N \le 10^5$ ซึ่งเราก็ตั้งค่าใน `setrecursionlimit` แล้วบวกเผื่อไปอีกนิดหน่อยตามนั้นแล้ว ... กลายเป็นว่าโดน Python เล่นงาน(?) เพราะถ้าจะเอาให้ชัวร์ต้องตั้งลิมิตเผื่อไว้เยอะเป็นสองเท่ากว่าๆ เลยต่างหาก!!



[punched card]: //en.wikipedia.org/wiki/Punched_card