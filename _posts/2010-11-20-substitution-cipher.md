---
title: การเข้ารหัสลับแบบจับคู่
tags:
  - Cryptography
date: 2010-11-20 02:28:00 +0700
---

การเข้ารหัสลับด้วยวิธีต่อมานั้นก็คือ การเข้ารหัสลับแบบจับคู่ ([substitution cipher][])

วิธีการก็ไม่รู้ว่าจะอธิบายให้ยุ่งยากทำไมเนาะ 😅

แต่ก็เอาถอะ ไหนๆ ก็พูดในเชิงคณิตศาสตร์ละ งั้นก็ลงอธิบายแบบคณิตศาสตร์เลยละกัน

ให้ $P = C = \mathbb{Z}_{26}$ และ $K$ คือเซตของวิธีเรียงสับเปลี่ยนตัวเลข $\lbrace 0, 1, \dots, 25 \rbrace$ ทั้งหมดที่เป็นไปได้

และให้ $\pi \in K$ เป็น mapping function ของการเรียงสับเปลี่ยนตัวเลข $\pi: P \to C$ จะกล่าวว่า

$$
\begin{align}
e_k(x) &= \pi(x) \\
d_k(y) &= \pi^{-1}(y)
\end{align}
$$

จะเห็นว่า key space จะใหญ่ถึง $26!$ หรือประมาณ $4.03 \times 10^{26}$ เลยทีเดียว (แต่ก็ยังไม่ปลอดภัยอยู่ดี!)

---

จุดที่อาจเสียเวลาหน่อยคือตอนสร้าง key ขึ้นมา เพราะต้องเรียงสับเปลี่ยนตัวเลขถึง 26 ตัว

งั้นก็ต้องใช้เครื่องทุ่นแรงกันหน่อยหละ ก่อนอื่นก็สร้างลิสต์ของเลข 26 ตัวขึ้นมาก่อน

``` python
>>> substitute_key = list(range(26))
```

ต่อมาเราจะสับเปลี่ยนเลขพวกนี้แล้ว ซึ่งสามารถทำได้โดยใช้[ขั้นตอนวิธีของ Fisher--Yates][shuffle algorithm]

``` python
>>> from random import shuffle
>>> shuffle(substitute_key)
```

จัดการเปลี่ยนมันให้เป็นตัวอักษร และเซฟเป็นไฟล์ `*.txt` ซะ (เพราะต้องได้ใช้ในอนาคตแน่นอน!)

``` python
>>> mapping = ''
>>> for i in range(26):
...     mapping += chr(substitute_key[i] + ord('A'))
... 
>>> f = open('map_key.txt', 'w')
>>> f.write(mapping)
>>> f.close()
```

ตอนนี้ เราจะได้ไฟล์ `map_key.txt` ออกมา ซึ่งบรรจุการจับคู่ของตัวอักษรแล้วครับ

สำหรับการจับคู่ของผมในครั้งนี้ (ไล่จาก `a` ไป `z`) คือ `XLNYKIHFJWTRBMVPGSAUZQECOD`

ต่อมา เช่นเดียวกับที่เราได้เขียนฟังก์ชันไว้ใช้ในตอนที่แล้ว คราวนี้เราจะเปิดไฟล์เดิมมาเขียนเพิ่ม ดังนี้ครับ

``` python
def substitution(pain_text, key_file):
    cipher_text = ''
    mapping = []
    for i in range(26):
        mapping.append(0)
    f = open(key_file)
    for i in range(26):
        mapping[i] = upper_to_number(f.read(1))
    f.close()
    for i in range(len(pain_text)):
        char_num = lower_to_number(pain_text[i])
        char_num = mapping[char_num]
        cipher_text += number_to_upper(char_num)
    return cipher_text

def upper_to_number(text):
    return(ord(text) - start_upper)
```

เสร็จเรียบร้อย ลองเรียกใช้ฟังก์ชันโดยการ `import encrypt` เข้ามาก่อน

และเรียกที่อยู่ฟังก์ชัน `encrypt.substitution('canyoureadme', 'map_key.txt')`

ก็ได้ผลลัพท์เป็น `NXMOVZSKXYBK` ครับ

```
AKKOVZMKCUUJBK
```


[substitution cipher]: //en.wikipedia.org/wiki/Substitution_cipher
[shuffle algorithm]: //en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
