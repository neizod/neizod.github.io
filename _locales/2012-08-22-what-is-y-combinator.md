---
title: อะไรคือ Y Combinator?
tags:
  - Programming
  - Functional
  - Philosophy
  - Python
  - Recursion
  - Computer Science
date: 2012-08-22 13:34:00 +0700
---

ถึงตอนนี้เราคง[เรียกตัวเอง][recursion]บน[แลมบ์ดา][lambda]เป็นกันแล้ว (ถ้ายังไม่เป็น แนะนำให้อ่าน[ตอนก่อน][self lambda recursion])

กลับไปดูอีกรอบ จะเห็นว่าตอนเรียกตัวเอง เราจะต้องใส่ชื่อฟังก์ชันตัวเองลงไปเป็นตัวแปรหนึ่งเสมอ

``` python
lambda f, x: 1 if x == 0 else x * f(f, x-1)
```

แล้วถ้าเราไม่อยากทำอะไรอย่างนี้หละ อยากจะเขียนแค่ `f(x-1)` เหมือนกับการเรียกใช้งานฟังก์ชันตามปรกติทั่วไป จะทำได้มั้ย?

ถอยหนึ่งก้าว กลับไปเขียนแฟคทอเรียลแบบธรรมดาๆ ก่อน

``` python
f = lambda x: 1 if x == 0 else x * f(x-1)
```

ฟังก์ชันนี้ยังคงสามารถเรียกใช้ได้ เนื่องจากว่าเราจองชื่อ `f` ไว้ให้มันแล้ว (ซึ่งไม่ใช่สิ่งที่เราต้องการ) นั่นหมายความว่าชื่อ `f` ต้องมีปรากฏอยู่ใน[ขอบเขต][scope]นี้จึงจะเรียกตัวเองได้ และมันมีอีกวิธีนึงที่จะทำให้ `f` ปรากฏอยู่ภายในขอบเขตนี้ได้โดยไม่ต้องจองชื่อหรือส่งผ่านเป็นตัวแปรในขอบเขตเดียวกัน คือ

``` python
lambda f: lambda x: 1 if x == 0 else x * f(x-1)
```

แต่การประกาศเช่นนี้จะทำให้เราไม่สามารถใช้ฟังก์ชันได้ทันที เพราะเราต้องเอาฟังก์ชั่นนี้ส่งไปเป็นตัวแปรให้ตัวมันเองเรื่อยๆ เช่น ถ้าเราต้องการหา $5!$ เราต้องเขียนออกมาอย่างนี้

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
)(5) # i know, its a sin writing lisp-sy code with c style indentation
```

ซึ่งก็คือเราต้องซ้อนการเขียน `lambda f: ...` ด้วยตนเอง ในกรณีของ $5!$ นั้นเราต้องซ้อนไปอย่างน้อยๆ ห้า(บวกหนึ่ง)ครั้ง และยิ่งต้องการหาค่าแฟคทอเรียลสูงๆ เราก็ยิ่งต้องซ้อนมันมากขึ้นเป็นเงาตามตัว

นั่นหมายความว่าเราต้องการอะไรซักอย่างที่จะทำหน้าที่*ส่งผ่าน*ฟังก์ชันที่นิยามการเรียกตัวเองต่อไปเรื่อยๆ เป็นอนันต์ครั้งโดยอัตโนมัติ นี่คือแนวคิดของคอมบิเนเตอร์จุดตรึง ([fixed-point combinator][]) โดยมีตัวหนึ่งที่เป็นมีชื่อเสียงเป็นที่รู้จักกันมากคือ Y combinator ซึ่งเขียนได้ดังนี้

``` python
Y = lambda f: (lambda x: f(lambda v: x(x)(v)))(lambda x: f(lambda v: x(x)(v)))
```

หรือนิยามทางคณิตศาสตร์ว่า $Y = \lambda f.(\lambda x.f(x\;x))(\lambda x.f(x\;x))$ ที่ไม่ต้องเขียนตัวแปร $v$ ห้อยท้าย

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

ลองเปลี่ยนมาหาเลขฟีโบนัชชีบ้าง ก็แค่เปลี่ยนเป็น

``` python
(lambda f: (lambda x: f(lambda v: x(x)(v)))(lambda x: f(lambda v: x(x)(v))))(
  lambda fib:
    lambda n: n if n <= 1 else fib(n-1) + fib(n-2)
  )(5)
```

ง่ายจริงป่ะ?



[self lambda recursion]: /2012/08/21/recursion-on-lambda.html

[recursion]: //en.wikipedia.org/wiki/Recursion
[lambda]: //en.wikipedia.org/wiki/Anonymous_function
[scope]: //en.wikipedia.org/wiki/Scope_(computer_science)
[fixed-point combinator]: //en.wikipedia.org/wiki/Fixed-point_combinator
