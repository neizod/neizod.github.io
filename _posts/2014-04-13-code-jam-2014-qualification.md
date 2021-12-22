---
title: Code Jam 2014 รอบคัดเลือก
tags:
  - Competitive Programming
  - CoffeeScript
  - Google Code Jam
  - Python
  - Haskell
date: 2014-04-13 18:21:00 +0700
---

ปีนี้ปัญหาเยอะนิดหน่อยเพราะวันแข่งตรงกับวันเดินทางออกต่างจังหวัดพอดี และเนื่องจาก [#แล้วรถไฟความเร็วสูงกูหละ][where is my high speed train] ทำให้เสียเวลาเดินทางสั้นๆ แค่ 300 กว่ากิโลเมตรไป 8 ชั่วโมงครึ่ง แถมพอถึงที่หมายแล้วก็หาเวลาส่วนตัวไม่ค่อยได้เลย กว่าจะได้ลงมือจริงๆ ก็ตีหนึ่งแล้ว (มีเวลา 8 ชั่วโมงจาก 27 ชั่วโมง) ผลงานที่ได้เทียบกับ effort ที่สามารถลงให้มันไปถือว่าน่าผิดหวังเล็กน้อย :/

อย่างไรก็ตาม ปีนี้ก็บรรลุเป้าข้อนึงคือใช้ภาษาอย่างน้อย 3 ภาษาเขียนแก้โจทย์ ก็ได้แก่ Python, Haskell และ CoffeeScript (อันที่จริง CoffeeScript นี้แปลจาก Python มาตรงๆ นาทีเดียวเสร็จเลยนะ :P) ปีต่อไปพยายามตั้งเป้าไว้ที่ Racket/Scheme กับ matrix processing language ซักตัวครับ


## Magic Trick

มาดูข้อแรกข้อ A ที่ตามธรรมเนียมจะง่ายที่สุดกัน ยิ่งใช้ Python ยิ่งง่ายใหญ่เลยเพราะมี set intersection ให้ใช้ เราก็แค่หาว่า intersect ของตัวเลขที่นักมายากลถามมานั้นคืออะไร ถ้ามีตัวเดียวก็คือตัวนั้นแหละ ถ้ามีมากกว่าหนึ่งแปลว่านักมายากลแม่งกาก แต่ถ้าไม่มีเลยนี่ผู้ชมโกงแล้วหละ

``` python
def foo(answer_1, matrix_1, answer_2, matrix_2):
    candidate_1 = matrix_1[answer_1-1]
    candidate_2 = matrix_2[answer_2-1]
    final = set(candidate_1) & set(candidate_2)
    if len(final) == 0:
        return 'Volunteer cheated!'
    elif len(final) > 1:
        return 'Bad magician!'
    else:
        return final.pop()

for case in range(int(input())):
    answer_1 = int(input())
    matrix_1 = [[int(n) for n in input().split()] for _ in range(4)]
    answer_2 = int(input())
    matrix_2 = [[int(n) for n in input().split()] for _ in range(4)]
    answer = foo(answer_1, matrix_1, answer_2, matrix_2)
    print('Case #{}: {}'.format(case+1, answer))
```

---

## Cookie Clicker Alpha

ข้อ B ถัดมาเริ่มจะต้องสังเกตละ แต่เนื่องจากผมตั้งใจเขียนข้อนี้ในสไตล์แบบ clean code พอสมควร (ไม่มี comment, ตั้งชื่อตัวแปรให้รู้เรื่อง) ดังนี้ข้อนี้ขออธิบายด้วย code อย่างเดียวนะครับ

``` python
def optimal_cookie(new_farm_cost, prodct_cookie, finale_cookie):
    income_cookie = 2.0
    optimal_spent = 0
    while True:
        new_farm_time = new_farm_cost / income_cookie
        expect_cookie = prodct_cookie + income_cookie
        wait_win_time = finale_cookie / income_cookie
        upgd_win_time = finale_cookie / expect_cookie + new_farm_time
        if wait_win_time > upgd_win_time:
            income_cookie = expect_cookie
            optimal_spent += new_farm_time
        else:
            optimal_spent += wait_win_time
            break
        return optimal_spent

for case in range(int(input())):
    answer = optimal_cookie(*[float(n) for n in input().split()])
    print('Case #{}: {:.7f}'.format(case+1, answer))
```

หมายเหตุว่าข้อนี้ถ้าไป[ดูคำตอบผมในเว็บ][go-hero neizod] จะเห็นคำตอบสำหรับข้อเล็กเขียนด้วย Haskell ส่วนข้อใหญ่เขียนด้วย CoffeeScript ครับ แต่ในการทดลองนี้จะใช้อันไหนทดสอบที่ระดับใดก็ได้

---

## Deceitful War

กระโดดข้ามมาข้อ D ก่อน ข้อนี้ยากตรงที่เราต้อง proof จนได้ strategy ที่ดีที่สุด เราอาจสังเกตว่า ในเกม war ธรรมดามีวิธีเล่นที่ดีที่สุดดังนี้

- ถ้า Naomi เล่นกล่องที่หนักกว่าทุกกล่องของ Ken ทางเลือกที่ดีที่สุดสำหรับ Ken คือเล่นกล่องที่เบาที่สุด เพื่อให้กล่องที่เหลือๆ มีประสิทธิภาพในการสู้สูงที่สุด
- ถ้า Naomi เล่นกล่องที่เบากว่ากล่องบางกล่องของ Ken แล้ว Ken จะตอบโต้ด้วยกล่องที่หนักกว่ากล่องของ Naomi แต่เป็นกล่องที่เบาที่สุดที่ยังจะหนักกว่ากล่องของ Naomi เพราะการเล่นแบบนี้ทำให้ได้คะแนน และยังเก็บกล่องหนักๆ ไว้ใช้สู้ในอนาคตได้อีก

พอเกมเปลี่ยนมาเป็น deceitful war ทาง Naomi ก็ใช้ข้อได้เปรียบจากการล่วงรู้น้ำหนักกล่องของ Ken ทั้งหมดมาเล่น โดยยึดกลยุทธ์ดังนี้

-   Naomi สามารถเล่นกล่องที่เบาที่สุดของตน แต่หลอกว่ากล่องนี้มีน้ำหนักน้อยกว่ากล่องที่หนักที่สุดของ Ken เนื่องจาก Ken ยังยึดกฎเดิม เขาจะตอบโต้ด้วยกล่องที่หนักที่สุด (กินคะแนน)
-   Naomi สามารถเล่นกล่องที่เบาที่สุดของตน แต่หลอกว่ากล่องนี้มีน้ำหนักมากกว่ากล่องที่หนักที่สุดของ Ken เช่นกันเพราะ Ken ยึดกฎเดิม เขาจะตอบโต้ด้วยกล่องที่เบาที่สุด (ทิ้งของกากสุด)

เทคนิคสำคัญคือรอจังหวะที่แต่ละกล่องของ Naomi เมื่อเรียงน้ำหนักและนำไปจับคู่กับ Ken แล้ว ทุกกล่องมีน้ำหนักมากกว่า เมื่อนั้น Naomi จะใช้กลยุทธ์ล่างทันที แต่ถ้ายังไม่มีโอกาสก็จะยึดกลยุทธ์แรกไปก่อน เพื่อกำจัดกล่องหนักๆ ของ Ken ทิ้งไป

``` python
from collections import deque

def normal_war(ns, ks):
    c = 0
    while ns:
        n = ns.pop()
        if ks[-1] < n:
            ks.pop(0)
            c += 1
        else:
            i = 0
            while n > ks[i]:
                i += 1
            ks.pop(i)
    return c

def deceitful_war(ns, ks):
    while any(n < k for n, k in zip(ns, ks)):
        ns.popleft() and ks.pop()
    return len(ns)

for case in range(int(input())):
    _ = input()
    ns = sorted(float(n) for n in input().split())
    ks = sorted(float(n) for n in input().split())
    dw_answer = deceitful_war(deque(ns), deque(ks))
    nw_answer = normal_war(ns[:], ks[:])
    print('Case #{}: {} {}'.format(case+1, dw_answer, nw_answer))
```

---

## Minesweeper Master

ข้อ C ถามว่าในอุดมคติแล้ว เราสามารถกดปุ่มเดียวผ่าน minesweeper ได้มั้ย ซึ่งข้อนี้มีจุดน่าสนใจอยู่ที่การแตกเคสต่างๆ ออกมาให้ครอบคลุม ดังนี้

- ถ้ากระดานมีความกว้างแค่ 1 หน่วย ยังไงก็กดครั้งเดียวผ่านแน่ เพราะเราก็ให้ระเบิดทั้งหมดไปกองด้านนึง อีกด้านก็ไม่มีอะไร
- ถ้ากระดานมีความกว้าง 2 หน่วย เราจะได้ว่าต้องมีพื้นที่ว่าง 1 ช่อง (สำหรับกดครั้งเดียวผ่านเลย) หรือที่ว่างต้องเป็นเลขคู่ที่มากกว่า 2 (ถ้ามี 2 ช่องพอดีแม้ช่องนั้นจะอยู่ติดกันก็ต้องกด 2 ครั้ง)
- กระดานแบบอื่นๆ ทั้วไป พยายามกั้นช่องว่างให้ตัวเองเป็นจัตุรัสก่อน แล้วค่อยๆ เวนคืนที่ว่างเพิ่มเติม ดังนี้
  - ที่ว่าง 1 ช่องเป็นจัตุรัสขนาด 1x1 ง่ายสุด คือกดครั้งเดียวผ่านเลย อย่างไรก็ตาม ที่ว่างแบบนี้ทำให้เราไม่สามารถมีที่ว่าง 2, 3 ได้
  - ที่ว่าง 4 ช่องเป็นจัตุรัสขนาด 2x2 สามารถมีติ่งเพิ่มออกมาอีก 2, 4 ช่องได้ คือจะได้ ที่ว่างรวมเป็น 6, 8 ช่อง ส่วนติ่งที่เพิ่มแค่ 1, 3 ช่องเพิ่มไม่ได้
  - ที่ว่าง 9 ช่องเป็นจัตุรัสขนาด 3x3 และใหญ่กว่า คราวนี้จะมีติ่งเป็นเศษแค่ 1 ช่องก็ได้ ทำโดยไปยืมพื้นที่ว่างหัวมุมมาจับคู่เข้ากับติ่งนี้ซะ
  - สรุปว่าท่านี้ไม่รองรับการเหลือที่ว่างแค่ 2, 3, 5, 7 ครับ
  - ท่านี้ต้องพลิกแพลงนิดหน่อยด้วย ตรงที่ถ้าเกิดขนาดจัตุรัสใหญ่เกินด้านใดด้านหนึ่ง ต้องเปลี่ยนไปใช้โหมดเติมเต็มทีละบรรทัดแทน

อ่านข้อความอย่างเดียวอาจคิดไม่ออก ดูตัวอย่างการ fill แบบต่างๆ บนตาราง 4x4 นี้น่าจะง่ายกว่า

    Case #0:      Case #1:      Case #2:      Case #3:
    c...          c...          c...          c...
    ....          ....          ....          ....
    ....          ....          ....          ...*
    ....          ...*          ..**          ..**
    
    Case #4:      Case #5:      Case #6:      Case #7:
    c..*          c..*          c..*          c..*
    ...*          ...*          ...*          ...*
    ...*          ...*          ..**          ...*
    ...*          ..**          ..**          ****
    
    Case #8:      Case #9:      Case #10:     Case #11:
    c.**          Impossible    c.**          Impossible
    ..**                        ..**
    ..**                        ..**
    ..**                        ****
    
    Case #12:     Case #13:     Case #14:     Case #15:
    c.**          Impossible    Impossible    c***
    ..**                                      ****
    ****                                      ****
    ****                                      ****

ส่วน code ก็หน้าตาประมาณ

``` python
def transpose(matrix):
    return [list(line) for line in zip(*matrix)]

def fill_line(r, c, left):
    width, length = sorted([r, c])
    matrix = [['*' for _ in range(length)] for _ in range(width)]
    for i in range(width):
        matrix[i][:left//width] = ['.' for _ in range(left//width)]
    matrix[0][0] = 'c'
    return matrix if r == len(matrix) else transpose(matrix)

def fill_rect(r, c, left):
    width, length = sorted([r, c])
    sq_length = int(left**0.5)
    matrix = [['*' for _ in range(width)] for _ in range(length)]
    if sq_length > width:
        i = 0
        while left - width > 0:
            matrix[i] = ['.' for _ in range(width)]
            left -= width
            i += 1
        if left == 1:
            matrix[i-1][-1:] = ['*']
            matrix[i][:2] = ['.' for _ in range(2)]
        else:
            matrix[i][:left] = ['.' for _ in range(left)]
    else:
        i = 0
        while i < sq_length:
            matrix[i][:sq_length] = ['.' for _ in range(sq_length)]
            left -= sq_length
            i += 1
        if left > sq_length:
            if left == sq_length + 1:
                matrix[i][:sq_length-1] = ['.' for _ in range(sq_length-1)]
                left = 2
            else:
                matrix[i][:sq_length] = ['.' for _ in range(sq_length)]
                left -= sq_length
            if i == len(matrix)-1:
                matrix = transpose(matrix)
            else:
                i += 1
            matrix[i][:left] = ['.' for _ in range(left)]
        elif left > 0:
            if left == 1:
                matrix[i-1][sq_length-1:sq_length] = ['*']
                left = 2
            matrix[i][:left] = ['.' for _ in range(left)]
    matrix[0][0] = 'c'
    return matrix if r == len(matrix) else transpose(matrix)

def mine_fill(r, c, m):
    width = min(r, c)
    left = r * c - m
    if width == 1:
        if left == 0:
            return None
        return fill_line(r, c, left)
    if width == 2:
        if left in [0, 2] or left % 2 == 1 and left != 1:
            return None
        return fill_line(r, c, left)
    else:
        if left in [0, 2, 3, 5, 7]:
            return None
        return fill_rect(r, c, left)

for case in range(int(input())):
    r, c, m = [int(n) for n in input().split()]
    answer = mine_fill(r, c, m)
    print('Case #{}:'.format(case+1))
    if answer is None:
        print('Impossible')
    else:
        for line in answer:
            print(''.join(line))
```

ข้อนี้เสียดายมากที่หา bug ไม่เจอ มาเจออีกทีตอนแข่งจบไปแล้ว ไม่งั้นรอบนี้คงได้ทำคะแนนเต็มให้เป็นเกียรติเป็นศรี \\(TwT)/


[where is my high speed train]: //facebook.com/pages/แล้วรถไฟความเร็วสูงกูล่ะ/631153140260214
[go-hero neizod]: //www.go-hero.net/jam/14/name/neizod
