---
title: เฉลยโจทย์ HLP Hackathon ด้วย Python
tags:
  - Programming
  - Python
date: 2011-07-26 23:40:00 +0700
---

สืบเนื่องจากงาน [HLP Hackathon][] อันสุด*เมามันส์*ได้จบไป ทางทีมงาน[หัวลำโพง][hlp]ก็ได้ปล่อยโจทย์ออกมาให้ชาว geek ที่ไม่ได้ร่วมแข่งขันมาประลองฝีมือแล้ว

เนื่องจากผมเป็นหนึ่งในผู้เข้าแข่งขันงานนี้ จึงขอนำ code ทีเขียนอย่าง*มึนเมา*ด้วย Python 3 ในวันแข่งมา review อีกรอบให้สวยงามขึ้น และคิดว่าคงมีประโยชน์อยู่บ้างสำหรับผู้ที่ยังมีพลัง code ไม่แก่กล้าพอจะได้นำไปศึกษาต่อครับ ^^

โดยผมขอเฉลยเฉพาะข้อที่ใช้ programming จริงจังนะครับ ข้อฮาๆ อย่าง sudoku ถ้าคุณหาคำตอบไม่ได้ภายใน 30 วินาทีแปลว่ายัง geek ไม่พอครับ!!! ;P [(คำใบ้)][sudoku solver]

<iframe src="https://drive.google.com/file/d/0BybyHZwaW9AISkhLWDFtX1p1VDQ/preview" width="640" height="480"></iframe>

---

## 6. แปลงเลขฐานหกสิบสาม

ข้อนี้ง่ายๆ ครับ กดเครื่องคิดเลขทำมือยังได้เลย

``` python
def sixtythree(n):
    if n == 0:
        return '0'
    m = []
    while n > 0:
        m.append(n%63)
        n = n //63
    m.reverse()
    return m

map = [i for i in range(10)]
map.extend([chr(i+97) for i in range(26)])
map.extend([chr(i+65) for i in range(26)])
map.append('_')

num = 9124569914

##########

print("http://molo.me/p/", end='')
out = sixtythree(num)
for i in range(len(out)):
    print(map[out[i]], end='')
```


## 7. ถอดรหัสข้อความลับ

ปวดหัวหน่อยนึงกับการที่ Python เป็น dynamic type เวลาลงไปยุ่งกับ bit เลยยากกว่า static type ดังนั้นการ define ฟังก์ชันสำหรับ circular shift ต้องระวังดีๆ ครับ

``` python
import re

def cshift(a, n):
    n %= 8
    l = a >> n
    r = a << (8-n)%8
    r %= 2**8
    return l | r

map = [chr(96+26-i) for i in range(26)]

word = []
while True:
    try:
        raw = input()
    except EOFError:
        break

    raw = re.sub('0x', '', raw)
    raw = re.split(' ', raw)

    for i in range(len(raw)):
        raw[i] = int(raw[i], 16)
    word.extend(raw)

###############

for i in range(len(word)):
    word[i] = cshift(word[i], i)
    word[i] -= 65
    word[i] = map[word[i]]
    print(word[i], end='')
```

อนึ่ง ข้อนี้รับ input ทาง `stdio` นะครับ เขียน input เก็บเป็นไฟล์แล้วจาก terminal/cmd ก็ใช้คำสั่ง `python script.py < input.txt `จะสะดวกขึ้นมากครับ


## 9. ภาพปริศนา

มาเป็นไฟล์ raw อย่างนี้ ไม่ยากเลยครับ (โดยส่วนตัวผมขี้เกียจ output เป็นรูป งานนี้ใช้ notepad เปิดไฟล์ text เอาแล้ว pan หาดีๆ นะครับ!)

``` python
p = open('input.raw', 'rb')

out = ''
for i in range(640*480):
    rch = p.read(1)
    if ord(rch) == 1:
        out += '0'
    else:
        out += ' '
    och = p.read(3)
    if i%640 == 0:
        out += '\n'
p.close()

f = open('out.txt', 'w')
f.write(out)
f.close()
```


## 10. หารร่วมมาก

ปัญหาเดียวของข้อนี้คือ อย่าทำตอนเมาเป็นอันขาด!  เพราะวันแข่งไม่มี test case แบบไฟล์มาให้ ได้คีย์มือเองแล้วจะพบว่ามันนรกแตกมาก!!! (รับทาง `stdio` เช่นกันครับ)

``` python
import re

def gcd(a, b):
    if b == 0:
        return a
    else:
        return gcd(b, a%b)

def mgcd(nlist):
    a = nlist[0]
    for i in range(1, len(nlist)):
        a = gcd(a, nlist[i])
    return a

tc = []
while True:
    try:
        raw = input()
    except EOFError:
        break

    raw = re.split(', ', raw)
    for i in range(len(raw)):
        raw[i] = int(raw[i])

    tc.append(mgcd(raw))

########

out = 0
for i in tc:
    out = out ^ i
print(out)
```


## 11. ภาพปริศนายิ่งขึ้น!

เหมือนจะยากแต่ก็ไม่มากไปกว่าข้อ 9 เลยครับ ^--^

``` python
p = []
for i in range(1, 5):
    p.append(open('input' + str(i) + '.raw', 'rb'))

out = ''
for i in range(640*480):
    same = True
    chk = p[0].read(4)
    for j in range(1, 4):
        tmp = p[j].read(4)
        if chk != tmp:
            same = False

    if same:
        out += '0'
    else:
        out += ' '
    if i%640 == 0:
        out += '\n'

for i in range(4):
    p[i].close()

f = open('out.txt', 'w')
f.write(out)
f.close()
```


# 12. เดินทางตามหาหัวใจ

ใช้ recursive technique แล้วชีวิตง่ายขึ้นจมครับ ใครไม่แม่นไปเทรนมาดีๆ นะครับ ^^b

``` python
ways = 0
z = 1
#        0,      4,        9,        e,
map = [ [0,0,0,0,0,0,0,0,z,0,0,0,0,z,0,0,0], # 0
        [0,0,0,0,z,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,z,0],
        [0,0,0,0,0,0,0,0,0,z,0,0,0,0,0,0,0],
        [0,0,z,0,0,0,z,0,z,0,z,0,0,0,0,0,0], # 4
        [0,0,0,0,0,0,0,0,z,z,0,z,0,0,0,0,0],
        [z,0,0,z,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,z,0,z,0,0,0,z,0,0,0,0,z,0],
        [0,0,0,0,0,0,0,z,z,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,z,0,0,0], # 9
        [0,0,0,0,0,0,0,0,0,0,0,0,z,0,0,0,0],
        [0,0,0,z,0,0,0,0,0,0,0,z,0,0,0,0,0],
        [0,0,0,0,0,0,0,z,0,z,z,0,0,0,0,0,0],
        [0,0,0,0,0,z,0,0,z,0,0,z,0,0,0,0,0],
        [z,0,0,z,0,0,z,0,0,0,0,0,0,0,0,z,0], # e
        [0,0,0,z,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,z,0,0,0,0,0,0,0,0,0,0,0,0,0,z,0] ]

def rerun(x, y):
    global ways
    if map[y][x] == 1:
        return
    if x != 16 and y != 16:
        rerun(x+1, y)
        rerun(x, y+1)
    elif x == 16 and y != 16:
        rerun(x, y+1)
    elif x != 16 and y == 16:
        rerun(x+1, y)
    else:
        ways += 1
        return

#########

rerun(0, 0)
print(ways - 41604)
```

เพิ่มเติมสำหรับผู้สนใจ Dynamic Programming สามารถดูตัวอย่างข้อนี้ได้จาก[บล๊อกตอนนี้ของคุณ @tanin][@tanin solution] ครับ


## 13. ศิลปะนามธรรม

ข้อนี้ยากสมชื่อจริงๆ ครับ! ด้วย recursive technique บน Python ผมพบว่าสามารถหาคำตอบได้แค่ภาพที่ 1 และ 5 เท่านั้น T^T ใครมีไอเดียเด็ดๆ ไม่ให้เกิด stack overflow มาคุยกันครับ

__edited:__ แก้ไขตามคำแนะนำของคุณ [@tanin][] โดยการเอาบรรทัดที่ 13 ออกก็แก้โจทย์ได้เลยครับ! เจ๋งจริงๆ

``` python
import re
import sys
import math

def refill(x, y, color):
    if not 0 <= x < 200 or not 0 <= y < 200:
        return
    if color == map[y][x]:
        map[y][x] = ''
        refill(x+1, y, color)
        refill(x, y+1, color)
        refill(x-1, y, color)
        # refill(x, y-1, color)     # remove as suggested by @tanin
    else:
        return

if len(sys.argv) > 1:
    name = sys.argv[1]
else:
    name = input()
if '.bmp' not in name:
    name += '.bmp'
p = open(name, 'rb')
p.read(54)

map = []
for i in range(200):
    map.append([])
    for j in range(200):
        map[i].append(p.read(3))
p.close()

obj = 0
for y in range(200):
    for x in range(200):
        if map[y][x] != '':
            refill(x, y, map[y][x])
            obj += 1
print(math.floor(math.sqrt(obj)))
```

ปล. ข้อนี้ผมคิดไม่ออกในเวลานะ แต่พอกลับมาบ้านแล้วทำได้เฉยแฮะ ^^" และด้วยความที่ผมใช้ Python 3 ทำให้ยังไม่มี lib สำหรับอ่านไฟล์รูปภาพแบบ `.png` ดังนั้นผมจึงใช้ Paint เซฟภาพให้เป็น `.bmp` เอาครับ

---

สุดท้ายนี้ก็ May the Code be with You นะครับ สวัสดีครับ ^^


[@tanin]: //twitter.com/tanin

[HLP Hackathon]: //www.hlpth.com/hackathon/
[hlp]: //www.hlpth.com/
[sudoku solver]: //sudokusolver.tk/en
[@tanin solution]: //tanin-programming.blogspot.com/2011/07/simple-dynamic-programming.html
