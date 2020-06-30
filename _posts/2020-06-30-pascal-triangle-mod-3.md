---
title: สามเหลี่ยมปาสคาลมอดุโลสาม
tags:
  - Mathematics
  - Recursive
  - Python
date: 2020-06-30 23:48:04 +0700
---

ชาตินี้น่าจะเคยเขียน[สามเหลี่ยมปาสคาล][pascal triangle]เล่นมานับครั้งไม่ถ้วน และก็มีครั้งนึงที่รู้สึกยูเรก้าเพราะว่าลองเอาค่าแต่ละตัวในสามเหลี่ยมปาสคาลมามอดุโลสอง จนได้เป็น[สามเหลี่ยมเซียร์พินสกิ][sierpinski triangle] (จำได้แม่นเพราะว่าไปขีดเขียนเล่นบน iPad เครื่องใหม่ของ [@NutSnC][] เนี่ยแหละ 555) ... มาวันนี้เจอความรู้สึกแบบนั้นอีกครั้งนึง เพราะดันทะลึงเอาเจ้าสามเหลี่ยมสารพัดประโยชน์นี้ไปมอดุโลสาม จนได้ผลลัพธ์หน้าตาออกมาแบบนี้

{: .oversized .figure}
> ![](/images/math/pascal-mod3.png)
>
> สามเหลี่ยมปาสคาลที่ถูกมอดุโลด้วยสาม โดยสีขาว, ดำ, แดง แทนค่า 0, 1, 2 ตามลำดับ

ก็จะเห็นว่ายังได้รูปทรงที่เป็น fractal คืนมาอยู่ดี โดยสังเกตว่ามีหน่วยที่เล็กที่สุดเป็นสามเหลี่ยมขนาด 3 แถว ซึ่งประกอบด้วยจุดสีดำเกือบทั้งหมดยกเว้นจุดตรงกลางของบรรทัดล่างสุดที่เป็นสีแดง และสามารถสร้างด้วยการวนซ้ำ (iteration) ได้โดยการขยายจุดสีดำด้วยสามเหลี่ยมแบบเดียวกับตนเอง และขยายจุดสีแดงด้วยสามเหลี่ยมแบบเดียวตนเองที่สลับสีดำ-แดงนั่นเอง

(หรืออาจมองว่าหน่วยเล็กสุดคือข้าวหลามตัดกว้าง 3 สูง 5 โดยประกอบไปด้วยสามเหลี่ยมชี้ขึ้น 3 บรรทัดที่มีสีดำและแดงปนกันตามข้างต้น และสามเหลี่ยมชี้ลงอีก 2 บรรทัดที่มีแต่สีขาวก็ย่อมได้)

นี่ทำให้เราเขียนโค้ดสำหรับหา ${n \choose k} {\pmod 3}$ แต่ละตัวได้ในเวลา $O(\log n)$ ดังนี้

``` python
table = [ [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
          [[1, 1, 1], [1, 2, 0], [1, 0, 0]],
          [[2, 2, 2], [2, 1, 0], [2, 0, 0]], ]

def base(n):
    b = 3
    while b <= n:
        b *= 3
    return b // 3

def ternary(n, b):
    while b != 0:
        d, n = divmod(n, b)
        b //= 3
        yield d

def choose_mod3(n, k):
    t = 1
    for y, x in zip(ternary(n-k, base(n)), ternary(k, base(n))):
        t = table[t][y][x]
    return t
```

อย่าลืมว่า $n$ เป็นข้อมูลตัวเลขที่ถูกแสดงค่าด้วยขนาดข้อมูลเพียง $O(\log n)$ บิต ดังนั้นอัลกอริทึมนี้มีความซับซ้อนเป็นเชิงเส้นขึ้นกับขนาดข้อมูลนำเข้า ซึ่งดีกว่าการคำนวณ factorial ผ่านการคูณหลายต่อหลายครั้งนั่นเอง

ถึงจุดนี้ (ที่ควรต้องนอนแล้ว) ก็แอบสงสัยต่อไปว่า สามเหลี่ยมปาสคาลที่มอดุโลด้วยค่าอื่นๆ จะมีหน้าตาแปลกประหลาดมหัศจรรย์ขนาดไหนกันนะ?

---

## ภาคผนวก

โค้ดสำหรับวาดภาพประกอบบทความ


``` python
from math import factorial
from PIL import Image, ImageDraw

choose = lambda n, k: factorial(n) // factorial(n-k) // factorial(k)

class PascalMod3(object):
    def __init__(self, rows, radius):
        self.rows = rows
        self.radius = radius
        self.width = 1 + int(2*self.radius*self.rows)
        self.height = 1 + int(2*self.radius + (3**0.5)*self.radius*(self.rows-1))
        self.draw()

    def location(self, n, k):
        x = self.width/2 + 2*self.radius*k - self.radius*n
        y = self.radius + (3**0.5)*self.radius*n
        return x-self.radius, y-self.radius, x+self.radius, y+self.radius

    def color(self, n, k):
        return ['white', 'black', 'red'][choose(n, k) % 3]

    def draw(self):
        image = Image.new('RGB', (self.width, self.height), 'white')
        draw = ImageDraw.Draw(image)
        for n in range(self.rows):
            for k in range(n+1):
                draw.ellipse(self.location(n, k), self.color(n, k), 'black')
        image.save('pascal-mod3.png')
```



[@NutSnC]: //twitter.com/NutSnC

[pascal triangle]: //en.wikipedia.org/wiki/Pascal%27s_triangle
[sierpinski triangle]: //en.wikipedia.org/wiki/Sierpi%C5%84ski_triangle
