---
title: การเข้ารหัสลับแบบเลื่อน
tags:
  - Cryptography
date: 2010-11-17 00:17:00 +0700
---

การเข้ารหัสลับแบบแรกที่ง่ายที่สุดนั้น คือการเข้ารหัสแบบเลื่อน ([shift cipher][])

วิธีการก็เป็นไปตามชื่อเลย คือทำการเลื่อนตัวอักษรออกไปตามความยาวที่ต้องการ เท่านั้นเองครับ

ชื่อเฉพาะที่น่าสนใจของวิธีนี้ คือ การเข้ารหัสลับแบบซีซาร์ อันเนื่องมาจากนี่เป็นวิธีที่จูเลียส ซีซาร์ใช้ในการส่งข้อความลับโดยการเลื่อนอักษรออกไป 3 ตำแหน่งนั่นเอง

เราสามารถเขียนการเข้ารหัสแบบเลื่อนเป็นภาษาคณิตศาสตร์ได้ดังนี้

ให้ $P = C = K = \mathbb{Z}_{26}$ สำหรับ $0 \le k \le 25$ ที่มี $x \in P$ และ $y \in C$ จะกล่าวว่า

$$
\begin{align}
e_k(x) &\equiv x + k \pmod{26} \\
d_k(y) &\equiv y - k \pmod{26}
\end{align}
$$

สำหรับบรรทัดแรก จะกล่าวถึงขนาดของ space ข้อมูลที่เราสนใจ ซึ่งในที่นี้ก็คืออักษรภาษาอังกฤษ 26 ตัวตามที่ตกลงกันแต่แรก

ส่วนต่อมาคือการกำหนด key space ที่ถูกนำไปใช้ในบรรทัดต่อไปว่ามีค่าอยู่ในช่วงระหว่าง 0 ถึง 25 นั่นเอง ซึ่งก็คือ  26 แบบนั่นเอง (ไม่ปลอดภัยอย่างแรง!!!)

ตรงนี้ที่ต้องเขียนบอกให้ชัดเจนเพราะเราอาจเขียนมันในกรณีอื่นอีกก็ได้ เช่นสำหรับ $k$ ที่เป็นเลขคู่ให้เลื่อนไปด้านหน้า ส่วน $k$ ที่เป็นเลขคี่ให้เลื่อนไปด้านหลัง เป็นต้นครับ

บรรทัด 2 คือการบอกว่าสำหรับ $k \in K$ นั้นใช้อย่างไร ในที่นี้ก็คือเลื่อนไปด้านหน้าตามขนาดของ $k$ นั่นเอง

---

เราจะมาเขียนโค้ดกัน โดยทดลงใน Python shell ตรงๆ

ในเบื้องต้นนั้น เราต้องรับค่าของข้อความที่ต้องการในรูปแบบของ String และกำหนด key ที่เราต้องการให้เลื่อนอักษรไป

``` python
>>> pain_text = 'testshiftcipher'
>>> k = 3
```

ต่อมา ให้สร้างตัวแปร string สำหรับเก็บรหัสลับ และวน loop เข้าไปแปลงค่าตัวอักษรแต่ละตัวออกมา

เนื่องจากรหัสอักษรในคอมพิวเตอร์นั้นเป็นรหัส ASCII ซึ่งเรียงกันไปตั้งแต่ `a = 97` ถึง `z = 122` อยู่แล้ว

ในขั้นต้นเพื่อความง่าย เราจะบวกค่าเหล่านี้เข้าไปทันทีด้วยค่า `k` แล้วแปลงกลับเป็นตัวอักษรเหมือนเดิม

``` python
>>> cipher_text = ''
>>> for i in range(len(pain_text)):
...     cipher_text += chr(ord(pain_text[i]) + k)
...
```

เราสามารถเรียก `cipher_text` ออกมาดูได้ จะเห็นว่าคำที่เราแปลงนั้นกลายเป็น `whvwvkliwflskhu` (เกือบ) เป็นที่เรียบร้อย

แต่ว่าโค้ดตรงนี้ยังมีปัญหาอยู่ เพราะว่าถ้าเราใส่อักษรท้ายๆ เข้าไปนั้น เมื่อแปลงเป็นรหัสแล้วก็มีสิทธิ์หลุดออกจากเซตของตัวอักษรอังกฤษไปเป็นอักษรแปลกๆ ได้

เช่นข้อความว่า `howareyoutoday` เมื่อใช้อัลกอริทึมเก่าจะได้ข้อความ `KRZDUH|RXWRGD|` จะเห็นว่ามี `|` ซึ่งไม่ใช่อักษรอังกฤษโผล่เข้ามา

ดังนั้นเราจึงต้องใช้ `if` เพื่อเช็คว่าค่าที่ได้นั้นเกิน `z` หรือยัง ถ้าเกินแล้วให้ลบค่าออกด้วย `26`

นอกจากนี้ เนื่องจากเราต้องการให้อักษรที่เข้ารหัสแล้วเป็นตัวพิมพ์ใหญ่ด้วย

จาก `A = 65` ดังนั้น `a - A = 32` เราจึงต้องลบค่าอักษรแต่ละตัวออกไปอีกตัวละ `32` ดังนี้

``` python
>>> pain_text = 'howareyoutoday'
>>> k = 3 
>>> cipher_text = ''
>>> for i in range(len(pain_text)):
...     temp = ord(pain_text[i]) + k
...     if temp > 122:
...         temp -= 26
...     temp -= 32
...     cipher_text += chr(temp)
...
```

คราวนี้เมื่อเราใส่ข้อความ `howareyoutoday` เข้าไป ก็จะได้ผลลัพท์เป็น `KRZDUHBRXWRGDB` เรียบร้อยแล้ว

ต่อไป เราจะสร้างไฟล์ `*.py` ขึ้นมาเพื่อเก็บฟังก์ชันที่เขียนให้ง่ายต่อการเรียกใช้ในครั้งถัดๆ ไป

โดยคราวนี้เราจะไม่เขียนลวกๆ แล้ว เพราะการเขียนที่เป็นระเบียบจะทำให้ดูแลและพัฒนา code ต่อภายหลังได้ง่ายขึ้น

``` python
start_lower = ord('a')
start_upper = ord('A')

def shift(pain_text, key):
    cipher_text = ''
    for i in range(len(pain_text)):
        char_num = lower_to_number(pain_text[i])
        char_num += key
        char_num %= 26
        cipher_text += number_to_upper(char_num)
    return cipher_text

def lower_to_number(text):
    return(ord(text) - start_lower)

def number_to_upper(num):
    return(chr(num + start_upper))
```

จัดการบันทึกไฟล์ที่เขียนนี้ (ในที่นี้ใช้ชื่อ `encrypt.py`) แล้ว `import` ไฟล์ผ่าน Python shell

เวลาจะเข้ารหัสก็เรียงฟังก์ชันนี้โดยพิมพ์ `encrypt.shift('abcdefg', 3)` เข้าไปเลย

(เปลี่ยน `'abcdefg'` เป็นคำที่ต้องการเข้ารหัส เปลี่ยนเลข `3` เป็น key ตามที่ต้องการให้เลื่อน) แค่นี้ก็เรียบร้อยแล้วครับ 😉

อ๋อ สำหรับวิธี decrypt นั้น ฝากเป็นการบ้านให้ไปคิดต่อละกันเน้อออ

```
JRRGOXFN
```


[shift cipher]: //en.wikipedia.org/wiki/Caesar_cipher
