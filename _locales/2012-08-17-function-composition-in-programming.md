---
title: Function Composition กับ Programming
tags:
  - Programming
  - Functional
  - Mathematics
  - Haskell
  - Computer Science
date: 2012-08-17 15:42:00 +0700
---

ตอนม.ปลาย คงเคยเห็นฟังก์ชั่นที่เขียนแทนด้วยสัญลักษณ์ $g \circ f$ กันมาแล้ว ซึ่งมันหมายความง่ายๆ เช่นนี้

$$
(g \circ f) (x) = g(f(x))
$$

(นิยามเต็มๆ ของมันคือ ถ้า $f: X \to Y$ และ $g: Y \to Z$ แล้ว $g \circ f: X \to Z$ -- ที่ต้องนิยามเช่นนี้เพราะเราจะสามารถละการเขียนตัวแปร $x$ ติดไปกับนิยามได้)

ในการเขียนโปรแกรม (โดยเฉพาะเชิง functional) เรามักต้องทำงานแบบฟังก์ชันต่อเนื่อง คือ output จาก function หนึ่ง จะถูกนำมาใช้เป็น input ให้ฟังก์ชันถัดไปเป็นลูกโซ่

เขียนอธิบายเป็นภาษาโปรแกรมได้คือ

``` python
first_input = x
first_output = f(first_input)
second_input = first_output
second_output = g(second_input)
y = second_output
```

หรือเพื่อไม่ให้เปลืองตัวแปร ทั้งหมดนี้สามารถย่อได้เหลือ

``` python
y = g(f(x))
```

คำถามคือ ถ้าเราต้องการประกาศแค่ฟังก์ชั่นที่ทำงานต่อกันไปเรื่อยๆ เช่นนี้ โดยที่ไม่ต้องการใส่ input ให้ฟังก์ชั่นโดยทันที เราจะทำอย่างไร?

ทางออกหนึ่งคือใช้ lambda เข้าช่วย

``` python
h = lambda x: g(f(x))
```

แล้วเวลาจะเรียกใช้ฟังก์ชั่นนี้ ก็แค่สั่ง

``` python
y = h(x)
```

ฟังดูง่ายดี แต่นึกดูอีกที ทำไมเราถึงต้องทำอะไรให้มันยุ่งยากด้วยการเอา `lambda` เข้ามาเกี่ยวด้วย?

ในภาษา imperative คงไม่มีทางเลือกอื่น แต่สำหรับภาษา functional จ๋าอย่าง Haskell เราสามารถเขียนแบบนี้ได้

``` haskell
let h = g . f
```

จะเห็นว่าง่ายดายเหมือนกับ $g \circ f$ ตอนแรกเลย เวลาใช้ก็แค่

``` haskell
h x
```

หรือถ้าจะละการประกาศฟังก์ชั่น $h$ ทิ้งไป เพื่อหาผลลัพท์ทันทีเลย ก็ทำได้โดย

``` haskell
(g . f) x
```

อ่าห์... นี่มันคณิตศาสตร์ชัดๆ!!
