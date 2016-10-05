---
title: Code Jam 2012 รอบคัดเลือก
tags:
  - Programming
  - Google Code Jam
  - Python
  - One-Liner
date: 2012-04-27 03:18:00 +0700
---

สืบเนื่องจาก [@Blltz][] กับ [@ngfar][] มาเที่ยวบ้าน เลยนั่งปั่น Daiblo II กันตั้งแต่ตีสองตีสามจนถึงเจ็ดโมงเช้า กว่าจะเริ่มทำโจทย์ (ซึ่งควรจะเริ่มทำตั้งแต่หกโมงเช้าเลย)

ข้อแรก ง่ายๆ แค่ [substitution cipher][] ธรรมดา ก็โยน input เข้าไป map กันแล้วสร้างเป็น dict ออกมา ทีนี้เวลามันเหลือ เลยเล่นกับ code ซักหน่อย ให้คนตามอ่านปวดหัวเล่น (ของจริงมันอยู่ในบรรทัดเดียว แต่อันนี้แยกบรรทัดให้อ่านง่ายๆ ละนะ) :P

``` python
print('\n'.join(
    'Case #{}: {}'.format(
        t+1,
        ''.join(d[c]
            for d in [dict(zip('abcdefghijklmnopqrstuvwxyz ',
                               'yhesocvxduiglbkrztnwjpfmaq '))]
            for c in input()))
    for t in range(int(input()))))
```

แล้วก็เพิ่งมานึกได้ว่า ไม่ต้องสร้างเป็น dict ก็ได้นี่หว่า...

---

ข้อถัดมา อันนี้ทดในกระดาษ กระจายรูปแบบออกมาแล้วจะพบว่า ถ้าคะแนน mod 3 แล้วได้ 1 ไม่มีทางที่จะเป็นเซอร์ไพรส์ เลยดูแค่ที่มันไม่ใช่พอ แล้วก็เพิ่มข้อยกเว้นคะแนนแค่ 0 กับ 1 ด้วย

``` python
from math import ceil

for t in range(int(input())):
    gg, surprise, expected, *point = (int(n) for n in input().split())
    point.sort(reverse=True)

    count = 0
    for p in point:
        if ceil(p/3) >= expected:
            count += 1
        elif surprise > 0 and ceil(p/3)+1 >= expected:
            if p%3 == 1 or p in (0, 1):
                continue
            count += 1
            surprise -= 1

    print('Case #{}: {}'.format(t+1, count))
```

ถ้าดูตาม code แล้ว จะเห็นว่าเริ่มมาสั่ง sort ไว้เลย (จริงๆ ไม่ต้องก็ได้) คือตอนนั้นเตรียม optimize ไว้แล้ว แต่เท่าที่จับเวลาดูไม่น่าเป็นห่วง เลยไม่ optimize ดีกว่า เดี๋ยวเจอ bug ซ่อนเร้น

---

ข้อสาม สมองเริ่มตายเพราะไม่ได้นอนทั้งคืน + เห็นคำว่า *re*cycle เลยเขียนแบบ recursive (ที่ไม่จำเป็นต้อง recursive) ซะเลย 555+

``` python
def recycle(m, r):
    global pair, count
    if r > 0:
        m = m%digit * 10 + int(m/digit)
        if lower <= n < m <= upper and m not in pair.setdefault(n, []):
            pair[n].append(m)
            count += 1
        recycle(m, r-1)

for t in range(int(input())):
    lower, upper = [int(n) for n in input().split()]
    round = len(str(lower)) - 1
    digit = 10 ** round

    pair = {}
    count = 0
    for n in range(lower, upper+1):
        recycle(n, round)

    print('Case #{}: {}'.format(t+1, count))
```

อันนี้ optimize นิดหน่อย ตอนแรกทำการกลับเลขโดยแปลงเป็น str -> สลับที่ str -> แปลงกลับเป็นตัวเลข ปรากฎว่ากินเวลาไปเกินกว่ารับได้ เลยเปลี่ยนวิธีเขียนเป็น math ถ้า test แค่ส่วนกลับเลขก็เร็วกว่าเป็นสิบเท่าเหมือนกัน แต่ไม่ได้ลอง test ทั้ง script ดูว่าเร็วจนน่าพอใจหรือเปล่า

อนึ่ง พอเอาไปรันใน pypy แล้วไม่มีปัญหาเรื่องความเร็วเลยแฮะ เสียเวลา optimize ทำไมเนี่ย

(ข้อนี้แอบโดน [@lewcpe][] ว่าตรงที่ทำไมใช้ global ไม่ return เอาตามธรรมดาวิสัยฟังก์ชั่นทั่วไปด้วย)

---

พอทำ 3 ข้อแรกเสร็จก็ออกไปเล่นสงกรานต์ กลับมาตอนดึกๆ นั่งมึนหัวอยู่พักนึงแล้วก็คิดวิธีแก้ปัญหาข้อ 4 ได้ (แบบเดียวกับเฉลยบนเว็บ คือสร้างภาพแบบ reflex แล้วใช้วงกลมร้อมรั้วนับเอา) แต่ตอนนั้นคิดวิธี implement ดีๆ ไม่ออกแล้ว แถมเท่าที่ลองเขียนเล่นๆ ก็คิดว่าน่าจะต้องเจองานหนักกว่า 200 บรรทัดแน่ๆ (เวลาไม่น่าพอ) และยังเลือกไม่ถูกอีกว่าจะเขียนแบบ OOP หรือ functional ดี เลยตัดสินใจนอนดีกว่า

แล้วเจอกันรอบ 1A ครับ ~


[@Blltz]: //twitter.com/Blltz
[@ngfar]: //twitter.com/ngfar
[@lewcpe]: //twitter.com/lewcpe

[substitution cipher]: //en.wikipedia.org/wiki/Substitution_cipher
