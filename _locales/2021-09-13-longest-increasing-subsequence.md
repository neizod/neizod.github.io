---
title: ลำดับย่อยค่าเพิ่มขึ้นที่ยาวที่สุด
tags:
  - Dynamic Programming
  - Graph Theory
  - Complexity
  - Python
  - SVG
  - Math Animation
date: 2021-09-13 15:37:08 +0700
thumbnail: /images/algorithm/lis/graph.png
---

โจทย์สุดพื้นฐานในเรื่อง[กำหนดการพลวัตร][dynamic programming] ถามแค่ว่าจากอาเรย์ของจำนวนเต็มขนาดความยาว $n$ ตัว ให้หาลำดับย่อย (เลือกแบบกระโดดข้ามได้แต่ห้ามสลับตำแหน่ง) ที่ยาวที่สุด ที่สมาชิกแต่ละตัวในลำดับย่อยนั้นมีค่า[เพิ่มขึ้นโดยแท้][strictly increasing] ซึ่งถ้าทำได้อย่างมีประสิทธิภาพเราจะได้อัลกอริทึมที่เร็ว $O(n \log n)$ และอันที่จริงมันก็ไม่ยากเลยเพราะเราสามารถเขียนแค่นี้เพื่อหาขนาดของลำดับย่อยที่ยาวที่สุดได้

``` python
from bisect import bisect_left

def lis_size(xs):
    tops = []
    for x in xs:
        i = bisect_left(tops, x)
        tops[i:i+1] = [x]
    return len(tops)
```

อย่างไรก็ตามมันจะมีจุดที่งงๆ เวลาที่เราไม่ได้ต้องการหาแค่ขนาดของลำดับย่อย แต่ยังต้องการไล่สมาชิกทุกตัวในลำดับที่ว่านั้นด้วย เพราะตัวแปร `tops` ในโค้ดข้างต้นนั้นมัน**ไม่ได้**เก็บลำดับดังกล่าว แต่ `tops[k-1]` จะเก็บเพียงแค่สมาชิกตัวสุดท้ายที่มีขนาดเล็กที่สุดเมื่อต้องการสร้างลำดับย่อยความยาว `k` ซึ่งการสร้างลำดับย่อยความยาวอื่นๆ อาจจะมีหรือไม่มี `tops[k-1]` ก็ได้ ... อนึ่งถ้าไปดู[แอนิเมชันใน WikiPedia][lis animation] ก็อาจสับสนจนเข้าใจไปว่าเราต้องทำกำหนดการพลวัตรบนตาราง 2 มิติเพื่อแก้ปัญหานี้หรือเปล่า ซึ่งไม่ใช่เลยเพราะเราใช้ตารางมิติเดียวก็เพียงพอแล้ว

และอันที่จริงมันน่าจะมีวิธีอธิบายให้เห็นภาพได้กระจ่างแจ้งง่ายดายกว่านั้น เช่นการใช้โครงสร้างข้อมูลแบบ[ต้นไม้มีราก][rooted tree]มาอธิบายประกอบ โดยเราจะไล่จับสมาชิกแต่ละตัวในอาเรย์ตั้งต้นมาสร้างเป็นโหนดต่อลงไปในต้นไม้ ซึ่งโหนดใหม่แต่ละโหนดที่เพิ่มเข้ามานั้นจะพยายามไปอยู่ ณ ความลึกที่ต่ำที่สุดที่มันมีค่าไม่น้อยกว่าโหนดเดิมในต้นไม้ แต่ที่ระดับความลึกหนึ่งๆ มันจะมองเห็นแค่โหนดที่เล็กที่สุดในระดับนั้นเท่านั้น

{: .figure}
> ![](/images/algorithm/lis/construct.svg)
>
> ตัวอย่างการใช้ต้นไม้มาช่วยอธิบายการสร้างลำดับย่อยค่าเพิ่มขึ้นที่ยาวที่สุด

หรือก็คือเขียนเป็นโค้ดเพิ่มอีกนิดหน่อยได้ดังนี้

``` python
from math import inf
from bisect import bisect_left
from collections import namedtuple

Node = namedtuple('Node', 'value prevent_eq parent', defaults=(-inf, -inf, None))
Node.ancestors = lambda s: ( [] if s.parent is None else
                             s.parent.ancestors() + [s.value] )

def lis(xs):
    tops = [Node()]
    for key, x in enumerate(xs):
        i = bisect_left(tops, Node(x))
        tops[i:i+1] = [Node(x, -key, tops[i-1])]
    return tops[-1].ancestors()
```

แต่นั่นก็อาจไม่ใช่คำตอบเดียวที่เป็นไปได้ของลำดับย่อยที่ยาวที่สุด ถ้าเรากลับไปดูขั้นตอนการเพิ่มโหนดลงต้นไม้ที่ต้องชี้กลับไปหาโหนด `parent` ในความลึกก่อนหน้า เราจะพบว่ามันไม่จำเป็นต้องชี้ไปโหนดที่มีค่าน้อยสุดเท่านั้น แต่โหนดใหม่นี้สามารถชี้ไปยังโหนดเดิมโหนดไหนก็ได้ที่มีค่าน้อยกว่ามันเลย หรือในอีกแง่หนึ่งคือเราจะไม่สร้างต้นไม้แล้ว แต่สร้างเป็นกราฟมีทิศทางแบ่งเป็นเลเยอร์ตามระดับความลึกแทน โดยให้โหนดใหม่ที่เพิ่มเข้ามาชี้กลับไปยังทุกโหนด `parents` ในความลึกก่อนหน้าที่มีค่าน้อยกว่านั่นเอง

{: .figure}
> ![](/images/algorithm/lis/distinct.svg)
>
> ตัวอย่างคำตอบลำดับย่อยที่ยาวที่สุด โดยกรณีนี้มี 4 ลำดับย่อยที่แตกต่างกัน

สังเกตว่าในแต่ละชั้นเราอาจชี้กลับไปหา `parents` ได้หลายตัว ดังนั้นจำนวนคำตอบลำดับย่อยที่แตกต่างกันก็อาจเพิ่มเป็น[เอกซ์โพเนนเชียล][exponential growth]ได้ ซึ่งถ้าเราต้องการจะไล่เขียนทุกลำดับย่อยอยู่แล้วก็ไม่มีทางทำได้เร็วกว่านี้ แต่ถ้าต้องการนับแค่จำนวนคำตอบที่แตกต่างกัน เราก็อาจใช้ท่านับจำนวนดิบสะสมแล้วคำนวณเฉพาะจุดที่ต้องการเพื่อทำให้ความเร็วยังคงเป็น $O(n \log n)$ เช่นนี้ได้

``` python
PreCell = namedtuple('PreCell', 'inv_value acc parent_index')
Cell = namedtuple('Cell', 'acc value parent_index')

def lis_signature(xs):
    tops = [-inf]
    layers = [[PreCell(-inf, 0, 0), PreCell(inf, 1, 0)]]
    for x in xs:
        i = bisect_left(tops, x)
        tops[i:i+1] = [x]
        if i == len(layers):
            layers += [[PreCell(-inf, 0, 0)]]
        j = bisect_left(layers[i-1], PreCell(-x, inf, inf))
        c = layers[i-1][-1].acc - layers[i-1][j-1].acc + layers[i][-1].acc
        layers[i] += [PreCell(-x, c, j)]
    return [[Cell(c, -x, j) for x, c, j in layer] for layer in layers]

def lis_count(xs):
    return lis_signature(xs)[-1][-1].acc
```

และถึงแม้ว่าจำนวนวิธีที่แตกต่างกันจะมีขนาดใหญ่โตแบบเอกซ์โพเนนเชียล แต่หนึ่งในมุมมองที่น่าสนใจต่อปัญหาประเภทที่มีเซตคำตอบใหญ่จนไม่สามารถไล่เขียนครบทุกวิธีได้ คือการเลือกเขียนเฉพาะบางวิธีที่แตกต่างกัน ณ ดัชนีต่างๆ ที่เราสนใจ ซึ่งเราควรทำตรงนี้ให้ได้เร็ว เช่น เร็ว $O(n)$ ต่อการไล่เขียนหนึ่งวิธีที่เป็นไปได้เมื่อมีการคำนวณคุณลักษณะของอาเรย์ตั้งต้นเก็บไว้ก่อนแล้ว โค้ดต่อไปนี้เป็นหนึ่งในวิธีไล่ดัชนีของลำดับย่อยจากหลังมาหน้าให้ไม่ซ้ำกัน

``` python
def lis_index(xs, index=0):
    assert 0 <= index < lis_count(xs)
    signature = lis_signature(xs)
    parent_index = 0
    ys = []
    for layer in reversed(signature[1:]):
        index += layer[parent_index].acc
        locate_index = bisect_left(layer, Cell(index, inf, inf))
        index -= layer[locate_index-1].acc
        parent_index = layer[locate_index].parent_index - 1
        ys += [layer[locate_index].value]
    return ys[::-1]
```

ป.ล. ขอบคุณ [@lewcpe][] ที่มาแนะนำโมดูล `bisect` ใน Python ทำให้ไม่ต้องกังวลเวลาจะเขียน[การค้นหาแบบทวิภาค][binary search]แล้ว 😂


[@lewcpe]: //twitter.com/public_lewcpe

[dynamic programming]: //en.wikipedia.org/wiki/Dynamic_programming
[strictly increasing]: //en.wikipedia.org/wiki/Monotonic_function#Monotonicity_in_calculus_and_analysis
[lis animation]: //en.wikipedia.org/wiki/File:LISDemo.gif
[rooted tree]: //en.wikipedia.org/wiki/Tree_(graph_theory)#Rooted_tree
[exponential growth]: //en.wikipedia.org/wiki/Exponential_growth
[binary search]: //en.wikipedia.org/wiki/Binary_search_algorithm
