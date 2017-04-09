---
title: Code Jam 2017 รอบคัดเลือก
tags:
  - Programming
  - Google Code Jam
  - Python
date: 2017-04-09 14:48:13 +0700
---

ปีนี้มีธุระนู่นนี่นั่นพอดี ไม่ได้ถ่างตารอทำโจทย์ตั้งแต่เริ่มแข่งหกโมงเช้าเหมือนสมัยยังเด็ก พอออกไปทำธุระเสร็จกว่าจะกลับถึงบ้านเคลียร์ชีวิตเรียบร้อยก็ตีสองกว่าแล้ว หมดแรงหลับเป็นตาย ตอนหัวถึงหมอนว่าจะเทแม่งละ แต่อะไรเข้าฝันไม่รู้จนสะดุ้งตื่น เหลือบมองนาฬิกาแล้วเหลือเวลาให้ทำโจทย์ชั่วโมงนิดๆ เลยเขียนลวกๆ ด้วย Python ส่งไปแค่ภาษาเดียว (ไม่เหมือนปีก่อนๆ ที่มีเวลาทั้งวันเลยได้เล่นสนุกกับภาษาแปลกๆ เต็มที่แล้ว) แถมพอส่งคำตอบข้อเล็กจนได้คะแนนพอผ่านรอบถัดไป ก็ส่งข้อใหญ่ตามแบบไม่สนว่าจะมีบั๊กอะไรแล้วพุ่งกลับเตียงไปนอนต่อ

โชคดีหน่อยที่ระหว่างวันพิมพ์โจทย์ใส่กระดาษติดมือมาเผื่อคิดเวลาว่าง (แค่รถติดอย่างเดียวก็เสียเวลาชีวิตชิบหายละ อยู่บนถนนวันละสองสามชั่วโมงนี่ไม่ไหวนะ!) สามข้อแรกที่ไม่ยากเลยสามารถทดๆ วาดๆ ในกระดาษเอาได้ ตอนที่เขียนโปรแกรมนั่นเลยไม่ได้กดดันเพราะเพิ่งตื่นสมองไม่แล่นอะไรเท่าไหร่

แต่ก็ยังทำข้อที่สี่ไม่ได้เหมือนเดิม สงสัยชาตินี้คงไม่มีทางได้ร้อยคะแนนเต็มแล้วละมั้ง

เบื่อเล่าเรื่องตัวเองละ แปะโค้ดแบบไม่อธิบายละเอียดละกัน เหนื่อย

---

ข้อแรกง่าย แค่ไล่ๆ วนไปก็จบแล้ว เสียดายมากที่ไม่ได้ลองเขียน Haskell หรือพวกภาษา recursive เพราะดูแล้วมันน่าจะสนุกมากเลย


``` python
def flip(pancake):
    return '+' if pancake == '-' else '-'

def flips(pancakes):
    return [flip(pancake) for pancake in pancakes]

def can_flip(pancakes, size):
    pancakes = list(pancakes)
    flip_times = 0
    for start in range(len(pancakes)-size+1):
        if pancakes[start] == '-':
            pancakes[start:start+size] = flips(pancakes[start:start+size])
            flip_times += 1
    if all(pancake == '+' for pancake in pancakes):
        return flip_times
    return 'IMPOSSIBLE'

def main():
    for case in range(int(input())):
        pancakes, raw_k = input().split()
        print('Case #{}: {}'.format(case+1, can_flip(pancakes, int(raw_k))))

if __name__ == '__main__':
    main()
```

---

ข้อสองแก้ได้ด้วยเทคนิคหลักคล้ายๆ ข้อแรกเลย แค่เปลี่ยนทิศทางเป็นดูตัวเลขจากขวามาซ้ายแทน

``` python
from itertools import count

def is_tidy(string):
    return all(before <= after for before, after in zip(string, string[1:]))

def last_tidy(string):
    for length in count(2):
        if length > len(string):
            return string
        tail_digits = string[-length:]
        if not is_tidy(tail_digits):
            length -= 1
            tail_adjust = string[:-length] + ('0'*(length))
            string = str(int(tail_adjust)-1)

def main():
    for case in range(int(input())):
        print('Case #{}: {}'.format(case+1, last_tidy(input())))

if __name__ == '__main__':
    main()
```

---

ข้อสามตอนอ่านโจทย์อาจจะงงๆ หน่อยตรง `max of min(L, R)` แต่ถ้าเข้าใจนิยามตรงนั้นได้ที่เหลือก็ง่ายขึ้นเป็นกองแล้ว

ข้อสังเกตสำคัญอีกประการหนึ่งก็คือ เค้าต้องการคำตอบแค่บอกว่าซ้าย/ขวาของคนสุดท้ายมีขนาดเท่าไหร่ ไม่ได้ต้องการตำแหน่งเป๊ะๆ เพราะงั้นแปลงทุกอย่างเป็นตัวเลขก็พอแล้ว ไม่ต้องเก็บแผนผังห้องน้ำทั้งหมดในอาเรย์

``` python
from collections import defaultdict

def is_odd(number):
    return number % 2 == 1

def calc_lr(number):
    half = number // 2
    if is_odd(number):
        return half, half
    else:
        return half-1, half

def find_stalls(stalls, persons):
    avail = defaultdict(int, {stalls: 1})
    while persons:
        choose = max(avail)
        size = avail[choose]
        del avail[choose]
        left, right = calc_lr(choose)
        if persons <= size:
            return right, left
        persons -= size
        avail[left] += size
        avail[right] += size

def main():
    for case in range(int(input())):
        n, k = [int(n) for n in input().split()]
        print('Case #{}: {} {}'.format(case+1, *find_stalls(n, k)))

if __name__ == '__main__':
    main()

```

---

หวังว่ารอบหน้าจะมีสมาธิทำโจทย์ได้ดีกว่านี้ อยากได้เสื้อแล้ว
