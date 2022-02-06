---
title: แก้โจทย์ป้ายสมัครงาน Google แบบบรรทัดเดียว
tags:
  - Competitive Programming
  - Functional
  - Python
  - One-Liner
date: 2012-09-03 08:10:00 +0700
---

นอนไม่หลับ บวกกับช่วงนี้แก้โจทย์เล่นเยอะไปหน่อย เหมือนสมองไม่อยากหยุดแก้โจทย์ 555

แล้วก็นึกได้ว่า ไอ้[โจทย์ป้ายสมัครงานของ Google อันนี้][google viral recruit billboard] ยังไม่เคยแก้เล่นเองเลยนี่หว่า

![](/images/event/misc/google-billboard.jpg)

แต่ถ้าจะให้แก้ตามปรกติธรรมดา ก็ดูจะไม่ท้าทายซักเท่าไหร่ไปแล้ว (เพราะเล่นไปอ่านเฉลยมาเรียบร้อย) แบบนี้เลยต้องเพิ่ม standard ให้กับตัวเองด้วยการเขียนเป็น one-liner โดยไม่พึ่งพา stdlib ซะเลย

ตัวโจทย์คงไม่ต้องแปลแล้ว? (ถ้าตีโจทย์ไม่ออกจริงๆ แนะนำ[บล็อก @khajochi ตอนนี้][@khajochi solution]เลย) เอาเป็นว่าเริ่มกันเลยดีกว่านะ

---

โดย algorithm ที่จะใช้คำนวณหาค่า $e$ คือ

$$
e = 1 + \frac{1}{1!} + \frac{1}{2!} + \frac{1}{3!} + \frac{1}{4!} + \cdots
$$

ต้องใช้ algorithm นี้เพราะว่ามันให้ค่าทศนิยมได้แม่นยำรวดเร็วพอสมควร และยัง implement ตามไม่ยากเท่าไหร่ ในที่นี้ใช้ถึงแค่พจน์ $\frac{1}{200!}$ ก็ให้ค่าออกมาแม่นยำเกือบ 400 ตำแหน่งแล้ว

มาเริ่มที่ส่วนที่เล็กที่สุด ฟังก์ชั่น factorial ที่ดูเผินๆ ก็ไม่มีอะไรประหลาด แต่ถ้าจะเขียนแบบ one-liner ก็เลี่ยงไม่ได้ที่จะต้องเขียนเป็น recursion และต้องไม่จองชื่อ function ไว้ก่อนด้วย ซึ่งก็ทำได้โดยใช้ combinator แบบนี้

``` python
factorial = lambda n: (lambda f, x: f(f, x))(lambda r, y: y*r(r, y-1) if y > 1 else 1, n)
```

(รายละเอียดอ่านได้จาก[ตอนก่อนๆ][recursion lambda])

ต่อมาคือการจับแต่ละพจน์มาบวกกัน ซึ่งจะ implement ตรงๆ แบบนี้ไม่ได้

``` python
sum(1/factorial(i) for i in range(200))
```

เพราะ `float` มันเก็บ precision ของทศนิยมได้เล็กนิดเดียว ดังนั้นเราต้องดัดแปลงสมการต้นแบบให้กลายเป็น

$$
\begin{align}
e &= \left( 1 + \frac{1}{1!} + \frac{1}{2!} + \frac{1}{3!} + \frac{1}{4!} + \cdots \right) \left( \frac{\prod\limits_{i=1}^{\infty}i!}{\prod\limits_{i=1}^{\infty}i!} \right) \\
  &= \frac{ \left( \prod\limits_{i=1}^{\infty}i!  + \frac{\prod\limits_{i=1}^{\infty}i!}{1!} + \frac{\prod\limits_{i=1}^{\infty}i!}{2!} + \frac{\prod\limits_{i=1}^{\infty}i!}{3!} + \frac{\prod\limits_{i=1}^{\infty}i!}{4!} + \cdots \right) }{ \prod\limits_{i=1}^{\infty}i! }
\end{align}
$$

เทคนิคหนึ่ง (ใน Python) ที่ใช้ได้เสมอๆ เมื่อต้องการทศนิยมละเอียด $n$ ตำแหน่ง คือคูณด้วย $10^n$ เข้าไปเพื่อให้กลายเป็นจำนวนเต็ม แล้วค่อยนำไปหารปัดเศษทีหลังสุดนั่นเอง ดังนั้น

$$
\left\lfloor e \times 10^n \right\rfloor = \left\lfloor \frac{ \left( \prod\limits_{i=1}^{\infty}i!  + \frac{\prod\limits_{i=1}^{\infty}i!}{1!} + \frac{\prod\limits_{i=1}^{\infty}i!}{2!} + \frac{\prod\limits_{i=1}^{\infty}i!}{3!} + \frac{\prod\limits_{i=1}^{\infty}i!}{4!} + \cdots \right) 10^n }{ \prod\limits_{i=1}^{\infty}i! } \right\rfloor
$$

แต่จากการสังเกตที่เคยทำมาแล้ว เราต้องการ $n=400$ และไล่คูณค่า factorial ไปแค่ $200$ ก็พอ ไม่ต้องถึง $\infty$ ดังนั้น

$$
\left\lfloor e \times 10^{400} \right\rfloor = \left\lfloor \frac{ \left( \prod\limits_{i=1}^{200}i!  + \frac{\prod\limits_{i=1}^{200}i!}{1!} + \frac{\prod\limits_{i=1}^{200}i!}{2!} + \frac{\prod\limits_{i=1}^{200}i!}{3!} + \frac{\prod\limits_{i=1}^{200}i!}{4!} + \cdots \right) 10^{400} }{ \prod\limits_{i=1}^{200}i! } \right\rfloor
$$

จะเห็นว่าถ้าเรียงลำดับ operator ดีๆ เราจะไม่สูญเสีย precision เพราะไม่ต้องแปลงเลขไปเป็น `float` เลย

ได้แนวคิดแล้วก็เริ่ม implement กัน เริ่มโดยหา factorial ของพจน์ต่างๆ ตามปรกติ

``` python
fact_each = [factorial(i) for i in range(200)]
```

ทีนี้เพื่อป้องกันการคำนวณซ้ำหลายรอบ ก็เอา lambda มาห่อหุ้มมันซะ ซึ่งสิ่งที่เราต้องการต่อจากนี้คือผลคูณรวมของค่าทั้งหมด โดยเรายังคงต้องใช้ list เดิมนี้อยู่ ดังนั้น

``` python
prod_and_fact_each = (lambda l: [reduce(lambda x, y: x*y, l), l])(fact_each)
```

ถึงตอนนี้ก็ได้เวลาเอาผลคูณรวมของ factorial ทุกตัว มาหารแต่ละตัวใน list นั้นแล้ว (เรายังต้องใช้ผลคูณรวมอีกรอบ ดังนั้นส่งต่อมันด้วย)

``` python
prod_and_div_each = (lambda a, l: [a, [a // i for i in l]])(*prod_and_fact_each)
```

สุดท้ายก็จับทุกตัวมาบวกกัน คูณด้วย $10^{400}$ แล้วค่อยหารด้วยค่ารวมนั้น

``` python
e = str((lambda a, l: 10**400 * sum(l) // a)(*prod_and_div_each))
```

เท่านี้ก็ได้เลข $e$ ที่มีทศนิยมตามต้องการแล้วนะ ❤️

---

สำหรับส่วนที่สองจะมาดูที่จำนวนเฉพาะ เนื่องจากเลข 10 หลักค่าที่ใหญ่ที่สุดคือ $n=9999999999$ การที่จะบอกว่ามันเป็นจำนวนเฉพาะหรือไม่ ก็ทดสอบด้วยการเอาไปหารจำนวนเฉพาะทุกตัวที่น้อยกว่ามันไปจนถึง $\lfloor\sqrt{n}\rfloor$ ซึ่งหมายความว่าเราตรวจถึงแค่จำนวนเฉพาะที่น้อยกว่า $\lfloor\sqrt{9999999999}\rfloor=99999$ ก็พอแล้ว

เริ่มด้วยฟังก์ชั่นเพิ่มจำนวนเฉพาะเข้าไป

``` python
add_prime = lambda p, t: p + [t] if all(t % q for q in p) else p
```

ฟังก์ชั่นนี้จะรับตัวแปร 2 ตัวคือ list ของจำนวนเฉพาะก่อนหน้า และเลขที่จะตรวจว่าเป็นจำนวนเฉพาะหรือเปล่า ส่วนค่าที่คืนมานั้น ถ้าเป็นจำนวนเฉพาะจะคืน list ที่เพิ่มจำนวนที่ตรวจเข้าไปด้วย ดังนั้นสิ่งที่เราต้องทำคือใส่ list ว่างๆ เข้าไปก่อน แล้วส่งเลขที่น้อยที่สุดคือ $2$ เข้าไปตรวจ หลังจากได้ list ที่มีเลข $2$ ก็ส่งเลข $3,4,5,6,...,99999$ เข้าไปตรวจทีละตัว โดย list ที่เป็นผลลัพท์แต่ละครั้งที่ได้มาก็จะเก็บไว้ใช้ต่อไปเรื่อยๆ นี่ก็คือแนวคิดของ reduce นั่นเอง ซึ่งก็จะเขียนได้ว่า

``` python
p = reduce(add_prime, [[], 2] + range(3, 100000, 2))
```

ถึงตอนนี้ก็มีจำนวนเฉพาะทั้งหมดที่ต้องการสำหรับงานนี้แล้ว :3

---

สุดท้าย ได้เวลาจับทุกอย่างมารวมกัน เริ่มจากการพยายาม loop ไปยังเลข 10 หลักในทศนิยมของ $e$ ก่อน ซึ่งก็คือ

``` python
[e[i:10+i] for e in [e] for i in range(len(e)-9)]
```

แต่เนื่องจากเราต้องการ filter ตัวที่ไม่ใช่จำนวนเฉพาะออกไป ซึ่งคราวนี้เราจะเปลี่ยนมาทดสอบด้วยฟังก์ชั่น

``` python
test_prime = lambda p, e: all(int(e) % q for q in p)
```

ดังนั้นก็จะได้

``` python
[e[i:10+i] for e, p in [[e, p]] for i in range(len(e)-9) if test_prime(p, e[i:10+i])]
```

แน่นอนว่างานนี้เราต้องการแค่จำนวนเฉพาะตัวแรกที่เจอ ดังนั้นสามารถเปลี่ยนไปเขียน

``` python
next(e[i:10+i] for e, p in [[e, p]] for i in range(len(e)-9) if test_prime(p, e[i:10+i]))
```

ก็จะได้คำตอบแล้วหละ \\(^0^)/

---

สำหรับ [code ฉบับเต็มๆ][one-liner solution] ที่เป็น one-liner (แต่ขึ้นบรรทัดใหม่เพื่อให้อ่านสะดวก) คือ

``` python
next(e[i:10+i] for e, p in [[
        str((lambda a, l: 10**400 * sum(l) / a)(*
            (lambda a, l: [a, [a / i for i in l]])(*
                (lambda l: [reduce(lambda x, y: x*y, l), l])(
                    [(lambda f, x: f(f, x))(
                           lambda r, y: y * r(r, y-1) if y > 1 else 1, i)
                        for i in range(200)])))),
        reduce(
            lambda ps, t: ps + [t] if all(t % p for p in ps) else ps,
            [[], 2] + range(3, 100000, 2))]]
    for i in range(len(e)-9)
        if all(int(e[i:10+i]) % q for q in p))
```

happy coding นะครับ ^^


[recursion lambda]: /2012/08/21/recursion-on-lambda.html

[google viral recruit billboard]: //googleblog.blogspot.com/2004/07/warning-we-brake-for-number-theory.html
[@khajochi solution]: //www.khajochi.com/2008/12/official-google-blog-warning-we-brake.html
[one-liner solution]: //gist.github.com/3605921
