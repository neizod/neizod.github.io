---
title: การเข้ารหัสลับแบบฮิลล์
tags:
  - Cryptography
date: 2011-01-16 21:52:00 +0700
---

สวัสดีครับ หายหน้าหายตาไปหลายตอนเลย พอดีวันนี้ไปยืม [SyntaxHighlighter][] มาแปะเว็บเล่น เลยถือโอกาสอัพอะไรที่มันต้องใช้ขมองหน่อยละกัน 😉

แล้วเราก็มาต่อกันที่ การเข้ารหัสลับแบบฮิลล์ ([Hill Cipher][]) ซึ่งได้ชื่อมาจาก Lester S. Hill นักคณิตศาสตร์ชาวอเมริกัน โดยวิธีการนี้ได้ถูกคิดค้นและตีพิมพ์ในปี 1929 ครับ

วิธีการนี้จะกำหนดเมทริกซ์ 1 ตัวขึ้นมาเป็นกุญแจ แล้วเอาคำที่ต้องการเข้ารหัสมาคูณกับเมทริกซ์นี้ครับ ฟังดูไม่ยาก แต่ก็มีรายละเอียดเยอะมากทีเดียว ไปดูกันเลยครับ

ให้

- $m \in \mathbb{N}, m \ge 2$
- $P = C = \mathbb{Z}_{26}^m$
- $K$ เป็นเซตของเมทริกซ์มิติ $m \times m$ ที่มีอินเวอร์สบน $\mathbb{Z}_{26}$

สำหรับเมทริกซ์ $k \in K$ จะกล่าวว่า

$$
\begin{align}
e_k(x) &= xk \\
d_k(y) &= yk^{-1}
\end{align}
$$

ไม่มีอะไรยากเลยจริงๆ ครับ เพียงแต่ต้องระวังว่า การใช้กุญแจนั้น ต้องวางไว้หลังคำที่จะแปลงรหัสเสมอ

---

งั้นก็ไปดูการเขียนโค้ดกันเลยดีกว่า

เมทริกซ์ในโลกคอมพิวเตอร์นั้น สร้างได้ง่ายๆ โดย array 2 มิติ ซึ่งในภาษา python ก็คือการใช้ลิสต์ซ้อนลิสต์ เช่น `[[1, 2], [3, 4]]` ครับ แต่เนื่องจากตัวเลขทั้งหลายของเราดันไปอยู่บน $\mathbb{Z}_{26}$ ซะหนิ การเขียนฟังก์ชันสำหรับการคูณ/หาอินเวอร์สจึงต้องดัดแปลงเยอะอยู่

เพื่อความง่าย ในที่นี้เราเล่นกับเมทริกซ์ขนาด $2 \times 2$ เท่านั้นครับ

``` python
def make_matrix(a00=0, a01=0, a10=0, a11=0):
    return [[a00%26, a01%26], [a10%26, a11%26]]
```

ต่อมาเป็นการคูณเมทริกซ์ (เขียนเผื่อไว้สำหรับคูณเมทริกซ์ขนาด $n \times m$ ใดๆ)

``` python
def matrix_mul(matrix_1, matrix_2):
    result = make_matrix()
    for i in range(len(matrix_1)):
        for j in range(len(matrix_2[0])):
            for k in range(len(matrix_1[0])):
                result[i][j] += matrix_1[i][k] * matrix_2[k][j]
                result[i][j] %= 26
    return result
```

หา invert determinant และ invert matrix

``` python
def det_inv(m):
    det = m[0][0]*m[1][1] - m[0][1]*m[1][0]
    if det == 0:
        raise ZeroDivisionError('determinant is zero')
    return mul_inv(26, det%26)

def matrix_inv(m):
    scale = det_inv(m)
    result = make_matrix(m[1][1], -m[0][1], -m[1][0], m[0][0])
    for i in range(2):
        for j in range(2):
            result[i][j] *= scale
            result[i][j] %= 26
    return result
```

ถ้าทำได้ถึงตรงนี้ ที่เหลือก็ง่ายจิ๊บจิ๊บแล้วครับ

จะมีจุดที่ต้องตรวจสอบหน่อยก็คือ รหัสที่รับเข้ามาต้องยาวเป็นจำนวนคู่ และเมทริกซ์ที่รับเข้ามาต้องมีอินเวอร์ส (เหมือน[การเข้ารหัสแบบสัมพรรค][self affine cipher])


``` python
def hill(pain_text, key_matrix):
    if len(pain_text)%2 != 0:
        raise ValueError('text length must be even number')
    cipher_text = ''
    char_num = [[0, 0]]
    for i in range(len(pain_text)//2):
        char_num[0][0] = lower_to_number(pain_text[2*i])
        char_num[0][1] = lower_to_number(pain_text[2*i+1])
        char_num = matrix_mul(char_num, key_matrix)
        cipher_text += number_to_upper(char_num[0][0])
        cipher_text += number_to_upper(char_num[0][1])
    return cipher_text
```

ทีนี้เวลาเรียกใช้งาน ถ้าจะให้ง่ายก็ทำการเก็บตัวแปรที่เป็นเมทริกซ์ไว้ก่อนครับ เช่น

``` python
>>> a = encrypt.make_matrix(1, 5, 3, 4)
>>> encrypt.hill('testhill', a)
'FHXKFPSV'
```

ส่วนการถอดรหัสก็ง่ายเหมือนเดิมครับ เลยฝากไว้เป็นการบ้านละกัน 😝

```
HJIFLQSEKGZQ
```


[self affine cipher]: /2010/11/21/affine-cipher.html

[SyntaxHighlighter]: //alexgorbatchev.com/SyntaxHighlighter/
[Hill Cipher]: //en.wikipedia.org/wiki/Hill_cipher
