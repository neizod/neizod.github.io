---
title: Code Jam 2018 รอบคัดเลือก
tags:
  - Competitive Programming
  - Google Code Jam
  - Python
date: 2018-04-08 18:34:16 +0700
---

หลังจาก[พลาดท่าอย่างไม่น่าให้อภัยไปในปี 2014][codejam 2014 qual] ปีนี้ก็ถึงเวลาได้คะแนนเต็มซักที 😂

... ซึ่งเอาจริงๆ อาจจะเป็นเพราะ Code Jam เปลี่ยนกฎกติการระบบการแข่งใหม่ เลยแต่งโจทย์ครั้งแรกให้มันง่ายลงก็ได้ ซึ่งด้วยความไม่ชินกับระบบใหม่นี้ เลยทำให้รอบนี้เราเลือกเขียนแต่ Python ที่ถนัดที่สุดเพียงภาษาเดียว

---

## Saving The Universe Again

ข้อง่ายข้อแรก แค่แปลงรหัสคำสั่งของเอเลี่ยนให้กลายเป็นผลบวกพลังโจมตีในรูปนี้

$$
\text{damage} = a_0 2^0 + a_1 2^1 + a_2 2^2 + \dots + a_n 2^n
$$

โดยที่แต่ละ $a_i$ คือจำนวนการปรากฏของคำสั่ง `S` ที่มีคำสั่ง `C` ปรากฏอยู่ก่อนหน้าเป็นจำนวณ $i$ ครั้ง

ต่อมาก็ดูว่าค่า damage มีมากกว่า shield หรือเปล่า? ถ้าใช่ก็ลดค่า $a_x; x = \max_{a_i \neq 0} i$ ลงไปหนึ่ง แล้วเพิ่มค่าใน $a_{x-1}$ ขึ้นมาหนึ่งแทน เสร็จแล้วก็วนคำนวณค่า damage ไปเรื่อยๆ จนกว่า shield จะป้องกันได้นั่นเอง

``` python
def make_attack_group(instructions):
    ls = [0]
    for inst in instructions:
        if inst == 'S':
            ls[-1] += 1
        else:
            ls += [0]
    return ls

def min_swap(shield, instructions):
    attack_group = make_attack_group(instructions)
    if sum(attack_group) > shield:
        return 'IMPOSSIBLE'
    time_swap = 0
    while shield < sum(a*2**i for i, a in enumerate(attack_group)):
        if attack_group[-1] == 0:
            attack_group.pop()
        else:
            time_swap += 1
            attack_group[-1] -= 1
            attack_group[-2] += 1
    return time_swap

for case in range(int(input())):
    raw_shield, instructions = input().split()
    shield = int(raw_shield)
    answer = min_swap(shield, instructions)
    print('Case #{}: {}'.format(case+1, answer))
```

หมายเหตุ: การ hack ลดค่าโจมตีจากคำสั่งที่มีพลังโจมตีมากที่สุดลงมาเรื่อยๆ จะให้ผลลัพธ์เป็นจำนวนครั้งที่ต้อง hack น้อยสุดเสมอ ซึ่งสามารถพิสูจน์ด้วยเทคนิคพื้นฐานที่เรียกว่า greedy stays ahead ครับ

---

## Trouble Sort

ถ้า implement วิธีจัดเรียงตามที่โจทย์บอก จะกินเวลาเป็น $O(n^2)$ ซึ่งไม่น่าส่งคำตอบได้ทัน (หรือถึงแม้ทันก็ไม่เท่) ดังนั้นมาสังเกตสมบัติตลกๆ ของการจัดเรียงแบบสารพันปัญหานี้

```
                 swap    swap    swap
              v-------v-------v-------v-------
sequence = [ a0, a1, a2, a3, a4, a5, a6, a7, ..., an ]
                  ^-------^-------^-------^---
                     swap    swap    swap
```

จะเห็นว่า ของในตำแหน่งเลขคู่จะถูกสลับได้กับของในตำแหน่งเลขคู่เท่านั้น และเป็นไปในทำนองเดียวกันกับของที่อยู่ในตำแหน่งเลขคี่

ดังนั้นอัลกอริทึมการจัดเรียงที่โจทย์บอก จึงสามารถถูกเลียนแบบได้ด้วยการจัดเรียงของในตำแหน่งเลขคู่และเลขคี่แยกกันนั่้นเอง

การจัดเรียงสิ่งของด้วยอัลกอริทึมอื่นที่ดีพอ จะกินเวลาแค่ $O(n \log n)$ เท่านั้น ซึ่งก็คือเราสามารถเร่งความเร็วอัลกอริทึมเลียนแบบของโจทย์ได้ด้วยเวลาที่น้อยลง จึงควรจะแก้โจทย์ข้อนี้ได้ทันไม่มีปัญหา

``` python
from itertools import count

def trouble_sort(ls):
    ls[0::2] = sorted(ls[0::2])
    ls[1::2] = sorted(ls[1::2])
    return ls

def check_trouble_sort(ls):
    ls = trouble_sort(ls)
    for index, a, b in zip(count(), ls, ls[1:]):
        if a > b:
            return index
    return 'OK'

for case in range(int(input())):
    input()
    ls = [int(n) for n in input().split()]
    answer = check_trouble_sort(ls)
    print('Case #{}: {}'.format(case+1, answer))
```

---

## Go, Gopher!

เนื่องจากการสั่งขุดพื้น 1 ช่องมีความน่าจะเป็นที่จะขุดช่องนั้นได้เพียง 1 ใน 9 จึงไม่ควรไปหวังว่าจะขุดเป็นพื้นที่สี่เหลี่ยมสวยๆ ด้วยการบอกตำแหน่งเป๊ะๆ ได้

สิ่งที่ทำได้คือเปลี่ยนไปมองว่าต้องการสั่งขุดสี่เหลี่ยมขนาด 3x3 ช่องไปเลย (ผ่านการขุดหลายครั้งโดยการบอกตำแหน่งเดิมซ้ำๆ) เรียบร้อยแล้วจึงจับเอาสี่เหลี่ยมจัตุรัสที่เพิ่งสร้างได้นี้ไปสร้างเป็นสี่เหลี่ยมใหญ่ๆ ตามที่โจทย์ต้องการต่อไป

เราสามารถใช้ [coupon collector's problem][] มาประมาณได้ว่าการขุดรูปสี่เหลี่ยมจัตุรัสนี้ จะต้องขุดประมาณกี่ครั้งถึงจะสำเร็จ ซึ่งก็คือ

$$
\begin{align*}
\mathbf{E}(T)
&= \frac{n}{1} + \frac{n}{2} + \frac{n}{3} + \dots + \frac{n}{n} \\
&= \frac{9}{1} + \frac{9}{2} + \frac{9}{3} + \dots + \frac{9}{9} \\
&= 25.4607
\end{align*}
$$

โจทย์ต้องการให้ขุดพื้นที่มากที่สุด 200 ช่อง ซึ่งก็คือต้องขุดสี่เหลี่ยมจัตุรัสเล็กๆ นี้ทั้งหมด 23 รูป แต่ละรูปประมาณว่าขุด 26 ครั้งจึงเสร็จ คูณกันแล้วน่าจะขุดประมาณ 598 ครั้ง ซึ่งน้อยกว่าขีดจำกัดที่ให้ขุดได้ 1000 ครั้งไปเกือบครึ่ง ดังนั้นน่าจะไม่ซวยขุดดินที่เดิมซ้ำๆ จนเหนื่อยแต่ไม่ได้สนามอย่างที่พอใจเนาะ 😉

``` python
def interact(size):
    x = 42
    y = 23
    holes_dug = set()
    while True:
        print(x, y)
        rx, ry = [int(n) for n in input().split()]
        if (rx, ry) == (-1, -1):
            exit(42)
        elif (rx, ry) == (0, 0):
            break
        holes_dug |= {(rx, ry)}
        if len(holes_dug) == 9:
            holes_dug.clear()
            y += 3

for case in range(int(input())):
    size = int(input())
    interact(size)
```

หมายเหตุ: Python ไม่ต้องพึ่ง `sys.stdout.flush` ก็พ่นผลลัพธ์ให้เลยทุกครั้งที่มีการขึ้นบรรดทัดใหม่

---

## Cubic UFO

ข้อนี้เริ่มขี้เกียจอธิบายละ เอาที่ทดบนไวท์บอร์ดไปแกะเองละกันนะ 555

{: .oversized .figure}
> ![](/images/algorithm/misc/cubic-ufo.jpg)
>
> สูตรคำนวณพื้นที่เงา UFO เมื่อ UFO หมุนตามแกนต่างๆ

``` python
import math

def rotate(point, x_angle, z_angle):
    point = ( point[0],
              math.cos(x_angle) * point[1] - math.sin(x_angle) * point[2],
              math.sin(x_angle) * point[1] + math.cos(x_angle) * point[2], )
    point = ( math.cos(z_angle) * point[0] - math.sin(z_angle) * point[1],
              math.sin(z_angle) * point[0] + math.cos(z_angle) * point[1],
              point[2], )
    return point

def get_points_from_rotation(x_angle, z_angle):
    points = [(0.5, 0, 0), (0, 0.5, 0), (0, 0, 0.5)]
    return [rotate(point, x_angle, z_angle) for point in points]

def hexagon_shadow(angle):
    return 2**0.5 * math.cos(angle) + math.sin(angle)

def rotate_two_axis(area):
    lower = 0
    upper = math.atan(1/2**0.5)
    while True:
        angle = (lower+upper) / 2
        guess_area = hexagon_shadow(angle)
        if math.isclose(guess_area, area):
            break
        elif guess_area < area:
            lower = angle
        elif guess_area > area:
            upper = angle
    return math.radians(45), angle

def rotate_one_axis(area):
    angle = math.radians(45) - math.acos(area/2**0.5)
    return angle, 0

def compatible_points(area):
    if area <= 2**0.5:
        x_angle, z_angle = rotate_one_axis(area)
    else:
        x_angle, z_angle = rotate_two_axis(area)
    return get_points_from_rotation(x_angle, z_angle)

for case in range(int(input())):
    area = float(input())
    answers = compatible_points(area)
    print('Case #{}:'.format(case+1))
    for point in answers:
        print(' '.join(str(num) for num in point))
```

หมายเหตุ: จุดที่ขาดหายไปจากการทดบนกระดานคือ [rotation matrix][] (ซึ่งน่าจะเป็นเรื่องพื้นฐานได้แล้วนะ) ถ้าใครยังไม่รู้จักคุ้นเคย ไปดูรูปตัวอย่างพร้อมสมการจากลิงก์ wiki น่าต้นจะเข้าใจได้ในเวลาไม่นานครับ

---

ด้วยคะแนนเต็มครั้งนี้ ทำให้ rank ต่ำกว่าพันแล้ว! มีโอกาสได้เสื้อมากกว่าปีไหนๆ เลย 🙌

ไว้ลุ้นกันใหม่อีกครั้งในรอบหนึ่งครับ

ป.ล. โดน penalty ข้อแรกไป 5 ครั้งเพราะ server เอ๋อ เราเลยนึกว่ากดส่งคำตอบแล้วยังไม่ไป เลยกดส่งโค้ดเดิมมันซ้ำๆ อยู่นั่นแหละ 🙄

ป.ล.ล. ระบบใหม่ทำ friend list หาย อดส่อง (ง่ายๆ) เลยว่าเพื่อนๆ ได้คะแนนเท่าไหร่กันมั่ง แถมยังโหลดโค้ดคนอื่นมาดูไม่ได้แล้ว 😭

[codejam 2014 qual]: /2014/04/13/code-jam-2014-qualification.html
[coupon collector's problem]: //en.wikipedia.org/wiki/Coupon_collector%27s_problem
[rotation matrix]: //en.wikipedia.org/wiki/Rotation_matrix#In_three_dimensions
