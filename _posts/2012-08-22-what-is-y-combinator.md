---
title: อะไรคือ Y Combinator
tags:
  - Programming
  - Functional
  - Philosophy
  - Python
  - Recursion
  - Computer Science
date: 2012-08-22 13:34:00 +0700
---

ถึงตอนนี้เราคงทำ recursion บน lambda เป็นกันแล้ว (ถ้ายังไม่เป็น แนะนำให้อ่าน[ตอนก่อน][recursive lambda])

กลับไปดูอีกรอบ จะเห็นว่าตอนเรียก recursion ต้องใส่ชื่อฟังก์ชันตัวเองลงไปเป็นตัวแปรหนึ่งเสมอ

``` python
lambda f, x: 1 if x == 0 else x * f(f, x-1)
```

แล้วถ้าเราไม่อยากทำอย่างนี้หละ อยากจะเรียกแค่ `f(x-1)` เหมือนการเรียกใช้งานฟังก์ชันตามปรกติทั่วไป จะทำได้มั้ย?

ถอยหนึ่งก้าว กลับไปเขียน factorial แบบธรรมดาๆ ก่อน

``` python
f = lambda x: 1 if x == 0 else x * f(x-1)
```

ฟังก์ชันนี้ยังคงสามารถเรียกใช้ได้ เนื่องจากว่าเราจองชื่อ `f` ไว้ให้มันแล้ว (ซึ่งไม่ใช่สิ่งที่เราต้องการ) นั่นหมายความว่าชื่อ `f` ต้องมีปรากฏอยู่ใน scope นี้จึงจะทำ recursion ได้ และมันมีอีกวิธีนึงที่จะทำให้ `f` ปรากฏอยู่ภายใน scope นี้โดยไม่ต้องจองชื่อหรือส่งผ่านเป็นตัวแปรใน scope เดียวกัน คือ

``` python
lambda f: lambda x: 1 if x == 0 else x * f(x-1)
```

แต่การประกาศเช่นนี้จะทำให้เราไม่สามารถใช้ฟังก์ชันได้ทันที เพราะเราต้องเอาฟังก์ชั่นนี้ส่งไปเป็นตัวแปรให้ตัวมันเองเรื่อยๆ เช่น ถ้าต้องการหา 5 factorial ต้องเขียนออกมาอย่างนี้

``` python
(lambda f: lambda x: 1 if x == 0 else x * f(x-1))(
  (lambda f: lambda x: 1 if x == 0 else x * f(x-1))(
    (lambda f: lambda x: 1 if x == 0 else x * f(x-1))(
      (lambda f: lambda x: 1 if x == 0 else x * f(x-1))(
        (lambda f: lambda x: 1 if x == 0 else x * f(x-1))(
          (lambda f: lambda x: 1 if x == 0 else x * f(x-1))(
            (lambda whatever: 42)
          )
        )
      )
    )
  )
)(5)
```

นั่นหมายความว่าเราต้องการอะไรซักอย่าง ที่จะทำหน้าที่ generate ฟังก์ชันของเรานี้ออกมาเรื่อยๆ ไม่ว่าจะมีอะไรเกิดขึ้นก็ตาม นี่คือแนวคิดของ [fixed-point combinator][] โดยมีตัวหนึ่งที่เป็นมีชื่อเสียงเป็นที่รู้จักกันมากคือ Y combinator ซึ่งเขียนได้ดังนี้

``` python
Y = lambda f: (lambda x: f(lambda v: x(x)(v)))(lambda x: f(lambda v: x(x)(v)))
```

หรือนิยามทางคณิตศาสตร์คือ $Y = \lambda f.(\lambda x.f(x\;x))(\lambda x.f(x\;x))$ ซึ่งไม่จำเป็นต้องติดตัวแปร $v$ มาด้วย

และเมื่อเราสำรวจการทำงานของมัน จะเห็นได้ว่า

$$
\begin{align}
Y\;g &= \Big( {\color{blue}\lambda f}.\big(\lambda x.{\color{blue}f}(x\;x)\big) \; \big(\lambda x.{\color{blue}f}(x\;x)\big) \Big) \; {\color{red}g}  \\
     &= \big(\lambda x.{\color{green}g}(x\;x)\big) \; \big(\lambda x.{\color{green}g}(x\;x)\big) \\
     &= \big({\color{blue}\lambda x}.g({\color{blue}x}\;{\color{blue}x})\big) \; {\color{red}\big(\lambda x.g(x\;x)\big)} \\
     &= g\Big( {\color{green}\big(\lambda x.g(x\;x)\big)}\;{\color{green}\big(\lambda x.g(x\;x)\big)} \Big) \\
     &= g\Big( \big(\lambda x.{\color{green}g}(x\;x)\big)\;\big(\lambda x.{\color{green}g}(x\;x)\big) \Big) \\
     &= g\Big( \Big( {\color{blue}\lambda f}. \big(\lambda x.{\color{blue}f}(x\;x)\big)\;\big(\lambda x.{\color{blue}f}(x\;x)\big) \Big) \; {\color{red}g} \Big) \\
     &= g \big( Y\;g \big) \\
     &= g \big( g \big( Y\;g \big) \big) = g \big( g \big( g \big( Y\;g \big) \big) \big) = g \big( g \big( g \big( g \big( \cdots \big) \big) \big) \big)
\end{align}
$$

วิธีเอามาใช้งานก็ไม่ยุ่งยาก เพียง

``` python
(lambda f: (lambda x: f(lambda v: x(x)(v)))(lambda x: f(lambda v: x(x)(v))))( # Y
  lambda factorial:                                  # function name
    lambda n: 1 if n == 0 else n * factorial(n-1)    # function definition
  )(5)                                               # applying argument
```

ลองเปลี่ยนมาหา Fibonacci บ้าง ก็แค่เปลี่ยนเป็น

``` python
(lambda f: (lambda x: f(lambda v: x(x)(v)))(lambda x: f(lambda v: x(x)(v))))(
  lambda fib:
    lambda n: n if n <= 1 else fib(n-1) + fib(n-2)
  )(5)
```

ง่ายจริงป่ะ?


[recursive lambda]: /2012/08/21/recursion-on-lambda.html

[fixed-point combinator]: //en.wikipedia.org/wiki/Fixed-point_combinator
