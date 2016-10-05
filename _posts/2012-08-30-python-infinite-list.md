---
title: ทำ Infinite List ใน Python
tags:
  - Object-Oriented
  - Programming
  - Mathematics
  - Python
date: 2012-08-30 03:14:00 +0700
---

พอดีไปขุด [Project Euler][] มาเล่น แล้วมันต้องได้ยุ่งกับพวก infinity sequence อย่าง[จำนวนเฉพาะ][prime number], [ฟีโบนักชี][fibonacci number]บ่อยๆ ตอนแรกก็ใช้แค่ list ธรรมดาเนี่ยแหละ แล้วถ้า index ที่อยากได้ไม่มีก็ค่อยไปเรียก function แยกมาคำนวณแล้วเก็บข้อมูลกลับเข้า list เอา

ทีนี้เขียนไปเขียนมารู้สึกว่า code มันไม่สวยเอาซะเลย เพราะไอ้จำนวนเหล่านี้เนี่ย เวลาหามันจะกระโดดข้ามไป index ที่ต้องการไม่ได้อยู่แล้ว บวกกับจำนวนพวกนี้มันหาเพิ่มได้เรื่อยๆ ไม่มีที่สิ้นสุด ดังนั้นในสายตาของนักคณิตศาสตร์อย่างผม ถ้าเขียน `prime[100]` แล้วเจอฟ้องว่า `index out of range` นี่คงเซ็งน่าดู เลยคิดว่ามันน่าจะมีวิธี hack ให้ใช้ syntax นี้หาค่าใน index ที่ต้องการแม้จะยังไม่เคยคำนวณหาค่านี้มาก่อนนะ

ค้นไปค้นมาก็เจอ `list.__getitem__` เลยจัดการลงมือลุย

``` python
class InfinityList(list):
    def __iter__(self):
        n = 0
        while True:
            yield self[n]
            n += 1

    def __repr__(self):
        return super(InfinityList, self).__repr__()[:-1] + ', ...]'


class fibonacci(InfinityList):
    def __getitem__(self, n):
        while True:
            try:
                return super(InfinityList, self).__getitem__(n)
            except IndexError:
                self.append( super(InfinityList, self).__getitem__(-1) +
                             super(InfinityList, self).__getitem__(-2) )

    def __init__(self):
        super(InfinityList, self).__init__([1, 1])


class prime(InfinityList):
    def __getitem__(self, n):
        while True:
            try:
                return super(InfinityList, self).__getitem__(n)
            except IndexError:
                c = super(InfinityList, self).__getitem__(-1)
                while True:
                    c += 2
                    for p in self[:]:
                        if not c % p:
                            break
                    else:
                        self.append(c)
                        break

    def __init__(self):
        super(InfinityList, self).__init__([2, 3])

fibonacci = fibonacci()
prime = prime()
```

กรอเวลาไปข้างหน้า 8 ชั่วโมง ก็มีของเล่นใหม่ตามที่แปะเป็นตัวอย่างไว้ด้านบน

1. ใน `__getitem__` นี่ลืมไปว่าถ้าแก้ตรงนี้แล้วมันจะทำ recursion กับตัวเอง ทำให้ไม่สามารถใช้ syntax อย่าง `fibonacci[-1]` เพื่อดึงเอาตัวเลขออกมาได้ ก็เลยต้องเลี่ยงไปเรียก method จาก super class เอา
2. จะให้ syntax แบบ `list[n]` ทำงานโดยเรียก `__getitem__` ต้อง inherit class มาแล้ว define ไว้ตอนสร้าง class เท่านั้นด้วย มาสั่ง `class.__getitem__ = outer_function` ไม่ได้ (ป้องกัน injection เข้าระบบ)
3. ตัว `__getitem__` มันรับ parameter ได้อันเดียวก็จริง แต่ไม่ใช่แค่ตัวเลขเท่านั้น เพราะยังมี slice object อีกด้วย (นึกถึงเวลาเขียน `some_list[4:-4]` ไอ้ `[4:-4]` นั่นแหละ slice object) ดังนั้นงานนี้ play safe ใส่ `while True` ไปดีกว่า ช้าหน่อยยอมรับได้
4. สุดท้ายก็คืออยากให้ class พวกนี้เป็น static ไปซะ (ตอนแรกออกแบบว่าจะให้เขียนเป็น `prime.numbers[n]` ด้วยซ้ำ) แต่เหนื่อยมากขี้เกียจทำแล้ว เลยจับประกาศชื่อ fibonacci, prime ทับกับชื่อ class ตัวมันเองไปซะเลย ยังไงก็มีได้แค่ instance เดียวอยู่แล้วหนิ 555+

เพียงเท่านี้ ถ้าอยากได้ prime ตำแหน่งที่ 101 ก็แค่สั่ง

``` python
prime[100]
```

จบเลย ง่ายมั้ย? อยากลองเล่นเองแล้ว? ไป[จิ้ม code ได้จากที่นี่][mathapi]เลย XD


[Project Euler]: //projecteuler.net/
[prime number]: //en.wikipedia.org/wiki/Prime_number
[fibonacci number]: //en.wikipedia.org/wiki/Fibonacci_number
[mathapi]: //github.com/neizod/mathapi
