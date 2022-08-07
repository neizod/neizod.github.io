---
title: "Code Jam 2022: ผลรวมเท่ากัน"
tags:
  - Competitive Programming
  - Interactive Problem
  - Google Code Jam
  - Python
date: 2022-04-12 15:42:27 +0700
---

ไม่ได้เล่นโค้ดแจมรอบที่ผ่านมาเพราะเพิ่งกลับกรุงเทพเลยนัดกินอาหารอินเดียกับ[แกงค์สัมภาษณ์งาน][self coding interview] กินเสร็จกลับมาบ้านแล้วเห็นว่าโจทย์ข้อนี้น่ารักดีเลยลองทำเล่นย้อนหลังดีกว่า

(ใจจริง) โจทย์ (คงอยาก) ให้เซต $S$ ซึ่งเก็บเลขจำนวนเต็มบวกหลายๆ ตัวมา แล้วให้เรา[พาทิชันเซต][partition]นี้เป็นสองสับเซตที่มีผลรวมเท่ากันแหละ แต่ถ้าแต่งโจทย์แบบนั้นก็คือเราจะได้[ปัญหาผลรวมสับเซต][subset sum]ที่ไม่น่ามีใครแก้ได้ทันในเวลาเข้าแข่งขันแทน 😝

ดังนั้นโจทย์จึง (ใจดี) ให้เรา*เลือก*สร้างสมาชิกของเซต $S$ ได้ครึ่งหนึ่ง แล้วอีกครึ่งหนึ่งกรรมการจะให้ตัวเลขอีกชุดที่รับประกันว่า $\sum S$ เป็นจำนวนคู่มา ให้หาวิธีฉลาดๆ ซักหน่อยเพื่อเลือกสมาชิกบางตัวนั้นมาเพื่อสร้างเซต $S$ ที่รับประกันว่าจะพาทิชันออกเป็นสองสับเซต (ที่ไม่จำเป็นต้องมีขนาดเท่ากัน) ที่มีผลรวมเท่ากันได้เสมอ

ข้อจำกัดอื่นๆ ได้แก่ $\abs{S}=2n$ ซึ่งก็คือให้เราเลือกสมาชิกได้ $n$ ตัว และสมาชิกแต่ละตัวนั้นมีค่าไม่เกิน $10^9$ ... น่าเสียดายนิดหน่อยที่ว่าโจทย์เลือกที่จะตรึงค่า $n=100$ ไม่ยอมแปรผันให้สนุกสนานในแต่ละเทสเคส 🤔


## ปัญหาบาลานซ์ตาชั่ง

ก่อนที่เราจะแก้โจทย์ข้างต้นอันสุดตื่นเต้น ขอแวะออกนอกเส้นทางหลักไปดูโจทย์สุดคลาสสิกโจทย์หนึ่งที่น่าสนใจไม่แพ้กัน ซึ่งก็คือโจทย์บาลานซ์ตาชั่ง ⚖️ โดยเราจะได้รับตาชั่งแบบโบราณที่ใช้วิธีถ่วงบาลานซ์น้ำหนักสิ่งของที่อยู่บนถาดสองข้างให้เท่ากัน ถ้าเราต้องการหาน้ำหนักของสิ่งของที่บ่งแยกความละเอียดเล็กสุดที่หนึ่งกรัม และมีน้ำหนักไม่เกินหนึ่งกำโลกรัม เราจะมีกลยุทธ์เพื่อสร้างตุ้มน้ำหนักมาถ่วงดุลตาชั่งได้อย่างไร?

หนึ่งในวิธีที่เรียบง่ายตรงไปตรงมาที่สุด ก็คือสร้างตุ้มน้ำหนักขนาดหนึ่งกรัมขึ้นมาหนึ่งพันชิ้นไปเลย 55555

ล้อเล่นนะ ถึงแม้ว่าคำตอบข้างต้นจะไม่ได้ผิดอะไร แต่มันก็ไม่สะดวกที่จะเอาไปใช้งานจริงได้ ถึงตอนนี้เราอาจจะเพิ่มเงื่อนไขบางอย่างที่ว่าจำนวนตุ้มน้ำหนักไม่ควรมีมากเกินไปด้วย

ซึ่งก็คือถ้าเราพยายามแก้โจทย์นี้อย่างชาญฉลาด เราอาจเลือกสร้างตุ้มน้ำหนักให้อยู่ในรูปสามยกกำลังไล่ไปเรื่อยๆ เช่นนี้

$$
\lbrace 3^0, 3^1, \ldots ,3^6 \rbrace
=
\lbrace 1, 3, 9, 27, 81, 243, 729 \rbrace
$$

หัวใจสำคัญของการออกแบบเช่นนี้ คือเราจะใช้ตุ้มน้ำหนักมาถ่วงดุลกันเอง ไม่ได้ปล่อยให้ข้างหนึ่งของตาชั่งมีแต่ตุ้มน้ำหนักส่วนอีกข้างหนึ่งมีแต่สิ่งของที่เราต้องการเทียบน้ำหนัก ซึ่งเราอาจใช้ความรู้เรื่องเลขฐานสามมาช่วยพิสูจน์ได้ว่าด้วยตุ้มน้ำหนักชุดนี้ เราสามารถชั่งน้ำหนักตั้งแต่หนึ่งกรัมถึงหนึ่งกิโลกรัมได้

อย่างเช่นถ้าเราต้องการชั่งสิ่งของที่มีน้ำหนัก $x=300$ กรัม เราจะจัดตาชั่งได้เช่นนี้

|             ซ้าย              |  $x$  |           ขวา           |
| :--------------------------: | :---: | :---------------------: |
| $\lbrace 243, 81, 3 \rbrace$ | $300$ | $\lbrace 27, x \rbrace$ |

ก็ดูดี แต่รู้สึกว่าคิดเยอะไปหน่อย ทั้งที่เราอาจใช้เลขฐานสองมาช่วยก็ได้เช่นกัน คือเลือกสร้างตุ้มน้ำหนักในรูปสองยกกำลังแทน

$$
\lbrace 2^0, 2^1, \ldots, 2^9 \rbrace
=
\lbrace 1, 2, 4, 8, 16, 32, 64, 128, 256, 512 \rbrace
$$

แม้จะใช้ตุ้มน้ำหนักจำนวนเยอะกว่าเทคนิคตุ้มน้ำหนักสามยกกำลังนิดหน่อย แต่ก็ทำให้เราไม่ต้องกังวลกับการย้ายข้างตุ้มน้ำหนักอีกต่อไป เราสามารถปล่อยให้ถาดข้างหนึ่งของตาชั่งมีเพียงสิ่งของที่ต้องการชั่งได้เลย และมันก็รับประกันว่าจะชั่งน้ำหนักภายใต้หนึ่งกิโลกรัมได้ละเอียดถึงหน่วยหนึ่งกรัมเช่นกัน

|               ซ้าย               |  $x$  |         ขวา         |
| :-----------------------------: | :---: | :-----------------: |
| $\lbrace 256, 32, 8, 4 \rbrace$ | $300$ | $\lbrace x \rbrace$ |

ทีนี้ถ้าเกิดมีสาเหตุอะไรก็ไม่อาจทราบได้ ([พื้นคือลาวา!][the floor is lava]) ที่ทำให้โจทย์ข้างต้นมีเงื่อนไขเพิ่มเติมขึ้นมาว่า ลูกตุ้มน้ำหนักทั้งหมดที่มี จะต้องอยู่บนถาดตาชั่งข้างใดข้างหนึ่งเท่านั้น ไม่สามารถวางตุ้มน้ำหนักพักไว้นอกตาชั่งได้ แล้วอำนาจการจำแนกน้ำหนักของเราจะเปลี่ยนไปเป็นอย่างไร?

สำหรับการพยายามฉลาดโดยใช้ชุดตุ้มน้ำหนักแบบสามยกกำลังจะให้ผลลัพธ์ที่ชวนงุนงงกลับมา แต่ถ้าเราใช้ตุ้มน้ำหนักชุดสองยกกำลัง เราจะพบกับแพทเทิร์นอันสวยงามเช่นนี้

|               ซ้าย               |  $x$  |         ขวา         |
| :-----------------------------: | :---: | :-----------------: |
| $\lbrace 512 \rbrace$ | $1$ | $\lbrace 256, 128, 64, 32, 16, 8, 4, 2, 1, x \rbrace$ |
| $\lbrace 512, 1 \rbrace$ | $3$ | $\lbrace 256, 128, 64, 32, 16, 8, 4, 2, x \rbrace$ |
| $\lbrace 512, 2 \rbrace$ | $5$ | $\lbrace 256, 128, 64, 32, 16, 8, 4, 1, x \rbrace$ |
| $\lbrace 512, 2, 1 \rbrace$ | $7$ | $\lbrace 256, 128, 64, 32, 16, 8, 4, x \rbrace$ |
| $\lbrace 512, 4 \rbrace$ | $9$ | $\lbrace 256, 128, 64, 32, 16, 8, 2, 1, x \rbrace$ |

หรือก็คือแม้เราจะไม่สามารถชั่งน้ำหนักทุกความละเอียดได้ แต่เราก็ยังสามารถชั่งน้ำหนักที่เป็นจำนวนคี่ได้ทั้งหมดอยู่ดีนั่นเอง


## ปัญหาพาทิชันเซต

ย้อนกลับมาที่ปัญหาตั้งต้นที่เป็นการพาทิชันเซตให้มีผลรวมเท่ากัน ถึงแม้ปัญหานี้จะยากขั้น NP-complete แต่หากเรายอมอ่อนเงื่อนไขลงมาว่าต้องการหาพาทิชันที่ทั้งสองสับเซตมีผลรวมไม่แตกต่างกันมากจนเกินไป (ต่างกันไม่เกิน $10^9$) เราก็จะสามารถแก้ปัญหานี้ได้อย่างมีประสิทธิภาพเลยทันที ซึ่งก็ทำได้ผ่านการดูสมาชิกแต่ละตัวใน $S$ ที่เรียงลำดับแล้ว หลังจากนั้นค่อยๆ หยิบสมาชิกมาเลือกว่าจะใส่ไปยังข้างซ้ายหรือขวาของพาทิชัน โดยพยายาม*บาลานซ์*ผลรวมให้แตกต่างกันไม่มากเกินไป ทั้งยังระลึกไว้ว่าเราต้องการให้ผลต่างเป็นจำนวนคี่อีกด้วย

เรายังจะใช้ความสามารถอีกอย่างหนึ่งที่โจทย์ให้มา ซึ่งก็คือการเลือกสมาชิกบางส่วนใน $S$ ได้เพื่อจองพื้นที่ไว้ให้ชุดตัวเลขที่อยู่ในรูปสองยกกำลัง (ไม่ต้องเอาเลขชุดนี้ไปบาลานซ์ในตอนต้น) หลังจากที่เราเห็นแล้วว่าฝั่งไหนของพาทิชันหนักกว่า เราก็จะใส่ตัวเลขชุดที่เหลือนี้ลงไปเพื่อดุลสองข้างของพาทิชันให้มีผลรวมเท่ากันเป๊ะนั่นเอง

``` python
from random import sample

UPPER_BOUND = 10**9
BINARY_BOUND = len(f'{UPPER_BOUND:b}')

def is_binary(x):
    return x == 2**len(f'{x:b}')

def make_binaries():
    return [2**i for i in range(BINARY_BOUND)]

def make_unique_random_evens(n):
    xs = [2*(r+1) for r in sample(range(UPPER_BOUND//2), n)]
    return [x for x in xs if not is_binary(x)][:n-BINARY_BOUND]

def strategic_picking(xs, diff=0):
    picks = []
    for x in xs:
        if diff < 0:
            diff += x
        else:
            diff -= x
            picks += [x]
    return diff, picks

def balance_with_binaries(odd_diff):
    assert odd_diff % 2 == 1
    _, picks = strategic_picking(reversed(make_binaries()), odd_diff)
    return picks

def ask(n):
    assert BINARY_BOUND <= n
    xs = make_unique_random_evens(n)
    print(' '.join(map(str, xs + make_binaries())))
    return xs

def listen():
    return [int(x) for x in input().split()]

def answer(xs):
    diff, picks = strategic_picking(sorted(xs))
    print(' '.join(map(str, picks + balance_with_binaries(diff))))

for _ in range(int(input())):
    n = int(input())
    xs = ask(n)
    xs += listen()
    answer(xs)
```


[self coding interview]: /2022/02/09/interview-question-sum-server-power.html

[partition]: //en.wikipedia.org/wiki/Partition_of_a_set
[subset sum]: //en.wikipedia.org/wiki/Subset_sum_problem
[the floor is lava]: //en.wikipedia.org/wiki/The_floor_is_lava