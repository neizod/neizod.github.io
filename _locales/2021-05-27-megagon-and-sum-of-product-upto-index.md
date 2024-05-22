---
title: Megagon และ $1+x_1(1+x_2(\dots))$
tags:
  - WikiPedia
  - Dynamic Programming
  - Python
  - SVG
  - Experimental
date: 2021-05-27 20:17:29 +0700
---

เรื่องของเรื่องก็คือ [@srakrn][] ไปเห็นว่าภาพ [megagon][] (ทรงปรกติล้านเหลี่ยม) บนเว็บ WikiPedia มันดันไม่ได้มีจำนวนหน้าตามชื่อของมัน แต่เป็นแค่วงกลมธรรมดาๆ เลยพยายามอัพโหลดไฟล์ SVG ที่มีจำนวนเหลี่ยมที่ถูกต้องขึ้นไป แต่โดนเว็บตีตกเพราะไฟล์ขนาดใหญ่เกินข้อจำกัดเพราะใชิวิธีลิสต์ทุกจุด ซักพัก [@ipats][] ก็มาเสนอว่าลองใช้แนวคิดของ [`<use>`][svg use] เพื่อลดขนาดไฟล์สิ ... ผลที่ได้ก็เป็นดังนี้

{: .figure}
> ![](/images/algorithm/misc/megagon.svg)
>
> เค้าเป็นทรงล้านเหลี่ยมจริงๆ นะ แค่พิกเซลไม่ละเอียดพอจะโชว์เหลี่ยมมุมของเค้าเท่านั้นเอง 🥺

ซึ่งตอนเริ่มเขียนโค้ดสร้างภาพนี้ก็นึกว่าจะไม่มีประเด็นอะไร แค่วาดเส้นตรงหนึ่งเส้นทิ้งไว้เป็นขอบตั้งต้นของทรงหลายเหลี่ยม ก๊อปปี้มันออกมาแล้วจับหมุนให้ปลายเส้นใหม่ไปต่อปลายเส้นเดิม ก๊อปปี้และหมุนซ้ำอีกไปเรื่อยๆ จนครบจำนวนหน้าเดี๋ยวก็ได้ทรงหลายเหลี่ยมเอง

แต่ถ้าทรงหลายเหลี่ยมที่ต้องการดันมีจำนวนเหลี่ยมเยอะมากหละ การค่อยๆ ก๊อปปี้ทีละหนึ่งเส้นนั้นคงไม่มีประสิทธิภาพแน่ มันน่าจะดีกว่าถ้าเราก๊อปปี้เส้นออกมาหลายๆ เส้นแล้วจัดกลุ่มไว้ก่อน หลังจากนั้นจึงค่อยก๊อปปี้ทั้งกลุ่มไปเลย แบบนี้เราจะสามารถสร้างเส้นเพิ่มขึ้นได้อย่างรวดเร็วเป็น[เอกซ์โพเนนเชียล][exponential growth]เชียวหละ

เช่น ถ้าเราอยากได้กลุ่มเส้นหนึ่งกลุ่มที่ประกอบด้วยเส้นตรงพื้นฐาน $1024$ เส้น เราอาจเริ่มจากก๊อปปี้เส้นตรงพื้นฐานออกมาสองเท่า แล้วจัดกลุ่มเส้นที่เพิ่งโดนก๊อปปี้มาใหม่ๆ นี้เป็นกลุ่มระดับหนึ่ง หลังจากนั้นก๊อปปี้กลุ่มระดับหนึ่งมาสองเท่าเพื่อจัดเป็นกลุ่มระดับสอง ก๊อปปี้กลุ่มระดับสองมาสองเท่าแล้วจัดเป็นกลุ่มระดับสาม ... เมื่อก๊อปปี้และจัดกลุ่มซ้ำแบบนี้ไปเรื่อยๆ (โดยแต่ละครั้งใช้เพียงกลุ่มก่อนหน้าหนึ่งระดับ) จนถึงกลุ่มระดับสิบ จะเห็นว่ากลุ่มสุดท้ายนี้ประกอบไปด้วยเส้นตั้งต้นพื้นฐานเป็นจำนวน $1024$ เส้นตามที่ต้องการ

ประเด็นคือการก๊อปปี้มาจัดกลุ่มแต่ละครั้งเช่นนี้ มันไม่ได้ทำลายกลุ่มในระดับก่อนหน้าทิ้งไปด้วยหนะสิ[^1] เพราะฉะนั้นถ้าเราทำการก๊อปปี้-จัดกลุ่มตามข้างต้นจนถึงกลุ่มระดับสิบ เราจะมีเส้นตรงทั้งหมดรวมเป็น

$$
1 + 2 + 4 + 8 + 16 + \cdots + 512 + 1024 = 2047
$$

การคำนวณมันจะซับซ้อนยิ่งกว่านี้อีกถ้าจำนวนการก๊อปปี้ในแต่ละกลุ่มดันไม่เท่ากัน เช่น เริ่มที่เส้นพื้นฐาน $1$ เส้น สร้างกลุ่มระดับหนึ่งเป็น $4$ เท่าของเส้นพื้นฐาน สร้างกลุ่มระดับสองเป็น $2$ เท่าของกลุ่มระดับหนึ่ง และสร้างกลุ่มระดับสามเป็น $3$ เท่าของกลุ่มระดับสอง ดังนั้นเราจะได้ว่าสุดท้ายเรามีเส้นรวมทั้งหมด

$$
\underbrace{1}_\text{base}
+ \underbrace{1\cdot4}_\text{1st level}
+ \underbrace{1\cdot4\cdot2}_\text{2nd level}
+ \underbrace{1\cdot4\cdot2\cdot3}_\text{3rd level}
= 37
$$

หรือก็คือ ถ้าให้ $n$ เป็นจำนวนสิ่งของรวมทั้งหมดที่จะ*มี*ผ่านการก๊อปปี้ไป $k$ ระดับ โดยที่แต่ละระดับ $i$ เราจะก๊อปปี้สิ่งของจากระดับก่อนหน้าเป็นจำนวน $x_i$ ชุด ดังนั้นเราจะคำนวณหา $n$ ได้จาก

$$
\begin{align}
n &= 1 + x_1 + x_1x_2 + x_1x_2x_3 + \cdots + x_1x_2x_3\dots x_k
   = 1 + \sum_{j=1}^k \left( \prod_{i=1}^j x_i \right) \\
  &= 1 + x_1(1 + x_2(1 + x_3(1 + \cdots (1+x_k))))
\end{align}
$$

แต่ถ้าเกิดเราไม่รู้ว่าควรจะกำหนดค่า $x_i$ แต่ละค่ายังไง เพียงแต่มีเป้าหมายว่าอยากได้ $n$ เป็นเท่าไหร่หละ เราจะสามารถคำนวณย้อนกลับมาเพื่อหา $x_i$ ได้หรือเปล่า? สังเกตว่าสมการดังกล่าวมีอย่างน้อยหนึ่งคำตอบเสมอซึ่งก็คือให้ทุก $x_i = 1$ (และ $k=n-1$) ไปเลย เราอาจไม่สนใจ[ผลเฉลยโดยปริยาย][trivial]เช่นนี้ แต่พยายามเลือกคำตอบที่กดค่า $\sum x_i$ ให้ต่ำที่สุดด้วย (มองเป็นค่าก่อสร้างหรือความยาวโค้ดก๊อปปี้ก็ได้) แล้วเราจะแก้ปัญหานี้ได้อย่างไร?

ลองเริ่มจากตัวอย่างกันดูก่อน สมมติเราต้องการ $n=17$ เริ่มแรกเรารู้แล้วว่ามีเส้นพื้นฐาน $1$ เส้นให้ใช้ ทำให้เราเหลือ $16$ เส้นที่ต้องสร้างเพิ่ม ถ้าเราเลือกก๊อปปี้เส้นพื้นฐาน $2$ ชุดมาจัดเป็นกลุ่มระดับหนึ่ง ($x_1=2$) แปลว่าจำนวนเส้นที่ต้องการสร้างจะลดลงเหลือ $14$ เส้น แต่ต่อไปการก๊อปปี้ของระดับหนึ่งจะก๊อปปี้ออกมาครั้งละ $2$ เส้นแล้ว ซึ่งก็ถือว่ายังทำได้เพราะ $2 \mid 14$ (สองหารสิบสี่ลงตัว) เราอาจเปลี่ยนไปมองว่าเราเหลือของที่ต้องสร้าง $14/2=7$ ชุดเลยก็ได้ และถ้าเลือกสร้างกลุ่มระดับสองที่มีของเป็น $7$ เท่าของระดับหนึ่ง ($x_2=7$) เราก็จะได้เส้นตรงครบทั้งหมด $17$ เส้นตามต้องการ โดยมีค่าก่อสร้าง $\sum x_i = 9$ หน่วยนั่นเอง

แต่ถ้าในขั้นตอนที่จะสร้างกลุ่มระดับหนึ่ง เราเปลี่ยนไปก๊อปปี้ด้วย $3$ เท่าของเส้นพื้นฐานแทน ตอนนี้เราจะเหลือเส้นที่ต้องสร้าง $13$ เส้น และทำให้สร้างไม่ได้ทันทีเพราะ $3 \nmid 13$ นั่นเอง ซึ่งสำหรับการก๊อปปี้เพื่อสร้างกลุ่มระดับหนึ่งด้วย $\lbrace 5, 6, 7, 9, 10, 11, 12, 13, 14, 15 \rbrace$ เท่าของเส้นพื้นฐานก็จะเจอทางตันเช่นเดียวกัน

อย่างไรก็ตาม ถ้าเราเลือกสร้างกลุ่มระดับที่หนึ่งเป็น $4$ เท่าของเส้นตรงพื้นฐาน ($x_1=4$) เราจะเหลือเส้นตรงที่ต้องสร้างเป็น $12$ เส้น (หรือ $12/4=3$ เท่าของกลุ่มระดับหนึ่ง) และเมื่อเราเลือกสร้างกลุ่มระดับที่สองเป็น $3$ เท่าของกลุ่มระดับหนึ่ง ($x_2=3$) เราก็จะได้ว่า $\sum x_i=7$ ซึ่งเป็นค่าก่อสร้างที่ถูกกว่าคำตอบที่ผ่านมา และยังเป็นค่าก่อสร้างที่ถูกที่สุดในทุกคำตอบที่เป็นไปได้ของ $n=17$ อีกด้วย

จากตัวอย่างข้างต้น เราได้ข้อสังเกตว่า จำนวนก๊อปปี้ในแต่ละครั้งนั้นต้องหารลงตัวกับของที่เหลือที่จะก๊อปปี้เท่านั้น นอกจากนี้เรายังสามารถมองปัญหาเป็นการเวียนเกิดได้ โดยแต่ละครั้งที่เราลบสิ่งของที่ถูกสร้างในระดับหนึ่งๆ ออกไปแล้ว สิ่งของที่เหลืออยู่เมื่อหารด้วยขนาดของสิ่งที่เพิ่งสร้างในประวัติศาสตร์อันใกล้ ก็จะถูกสร้างด้วยด้วยวิธีทำนองเดียวกันต่อไปได้นั่นเอง หรือก็คือเราสามารถใช้[กำหนดการพลวัต][dynamic programming]มาแก้ปัญหานี้ได้ ให้ $c$ เป็นฟังก์ชันค่าก่อสร้าง เราสามารถเขียนมันออกมาในรูปสมการเวียนเกิดได้ดังนี้

$$
c(i) = \min_{d \in \mathbb{N},\; d | i}\left( d + c\left( {\frac{i}{d}-1} \right) \right)
$$

ซึ่งจะทำให้ได้ $x_i$ ที่ให้ค่าก่อสร้างถูกที่สุดสำหรับการสร้าง megagon ($n=10^6$) คือ

$$
\begin{array}{c|cc}
i & 1 & 2 & 3 & 4 & 5 & 6 & 7 & 8 & 9 & 10 & 11 & 12 \\
\hline
x_i & 3 & 2 & 5 & 4 & 4 & 3 & 3 & 5 & 3 & 2 & 2 & 2
\end{array}
$$

ที่เหลือก็แค่ใช้ตรีโกณมิติมาคำนวณความยาวของเส้นตั้งต้นและตำแหน่งของเส้นต่างๆ หลังถูกจับหมุน เราก็จะสร้าง megagon ออกมาได้แล้ว

...

ซะเมื่อไหร่กันหละ! เพราะถึงแม้เราจะได้โค้ดการก๊อปปี้ที่สั้นลงเป็นพันเป็นหมื่นเท่าจากการลิสต์ทุกจุดก็จริง แต่ SVG (หรือสเปคเครื่อง?) ในตอนนี้ก็ไม่สามารถรับมือกับการลากเส้นจำนวนเป็นล้านได้ และแม้จะลากได้เพราะตัวมาตรฐานเป็นการสร้างภาพแบบเวกเตอร์ก็ตาม แต่เราก็ต้องระบุตำแหน่งต่างๆ ด้วยพิกเซลอยู่ดี ทำให้การเร็นเดอร์ภาพที่ความละเอียดหน้าจอต่ำๆ จะไม่มีเส้นขอบแสดงให้เราเห็น เพราะแต่ละเส้นนั้นสั้นกว่าหนึ่งพิกเซลมากๆ จนโดนปัดทิ้งไปนั่นเอง

โชคดีที่มี [`<polyline>`][svg polyline] มาแก้ปัญหาตรงนี้ได้ โดยแนวคิดคือเปลี่ยนไปลากชุดเส้นพื้นฐานที่ยาวมากกว่าหนึ่งด้านแทน นั่นก็คือเราจะเพิ่มตัวแปร $x_0$ ที่บอกว่าชุดเส้นเริ่มต้นพื้นฐานมีกี่ด้านเข้ามา ซึ่งจะทำให้สมการคำนวณค่า $n$ เปลี่ยนไปนิดนึงเป็น

$$
n = x_0(1 + x_1(1 + x_2(1 + \cdots (1+x_k))))
  = \sum_{j=0}^k \left( \prod_{i=0}^j x_i \right)
$$

และจากการทดลอง พบว่าค่าที่พอเหมาะพอเจาะกับการวาดภาพออกมาจริงๆ อยู่ที่ $x_0=50$ ซึ่งให้ผลลัพธ์เป็น megagon ที่ยังคงความเล็กกระทัดรัดของไฟล์ ในขณะที่สามารถเร็นเดอร์ภาพที่ต้องการออกมาได้ ดังจะเห็นได้จากภาพตั้งแต่ต้นบทความนั่นเอง

{: .figure}
> ![](/images/algorithm/misc/megagon.svg#zoom-250x)
>
> ซูม 250 เท่าก็เริ่มเห็นเหลี่ยมมุมของเค้าแล้วใช่มั้ยล่า 😝

โดยภาพแรกสุดนั้นมีความละเอียดที่ 500 คูณ 500 พิกเซล ส่วนภาพที่สองที่ถูกซูมเข้ามาถึง 250 เท่านี้ มันคือการโชว์พื้นที่ 2 คูณ 2 พิกเซลในภาพตั้งต้นนั่นเอง ซึ่งแสดงขอบของ megagon ที่หนา 1 พิกเซล แต่มีความกว้างน้อยยิ่งกว่า 0.1 พิกเซลเสียอีกแม้จะสร้างจากเส้นพื้นฐานขนาด 50 ด้านแล้วก็ตาม แถมแต่ละชุดเส้นพื้นฐานหลังถูกหมุนแล้วยังมีช่องว่างระหว่างกันอยู่นิดหน่อยอีกด้วย ซึ่งน่าจะเกิดจากความละเอียดของเลขทศนิยมหละมั้ง?

สุดท้ายนี้ก็ขอลากันไปด้วยโค้ดสำหรับสร้างภาพ

``` python
from types import SimpleNamespace as namespace
from math import sin, cos, tan, radians
from operator import mul
from functools import reduce
from itertools import product as cartesian_product
from collections import Counter

def translate(center, x, y):
    return x+center, y+center

def _rotate(angle, x, y):
    return x*cos(angle) - y*sin(angle), x*sin(angle) + y*cos(angle)

def rotate(x, y, angle, center):
    return translate(center, *_rotate(angle, *translate(-center, x, y)))

def iter_primes(memo=namespace(pi=0, ps=[2, 3])):
    k = 0
    while True:
        while len(memo.ps) <= k:
            head = memo.ps[memo.pi]**2 + 1
            memo.pi += 1
            tail = memo.ps[memo.pi]**2
            seive = list(range(head, tail))
            for p in memo.ps[:memo.pi]:
                size = 1 + (tail - head + (head%-p)) // p
                seive[-head%p::p] = [0] * size
            memo.ps += (p for p in seive if p)
        yield memo.ps[k]
        k += 1

def factors(n):
    if n == 1:
        return [1]
    fs = []
    for p in iter_primes():
        if p**2 > n:
            break
        while n % p == 0:
            fs += [p]
            n //= p
    if n > 1:
        fs += [n]
    return fs

def divisors(n):
    gfs = ({p**i for i in range(k+1)} for p, k in Counter(factors(n)).items())
    return sorted(reduce(mul, ts) for ts in cartesian_product(*gfs))

def calc_ngon(layers):
    r = 1
    for v in reversed(layers):
        r *= v
        r += 1
    return r - 1

def calc_layers(ngon, memo=[()]):
    while len(memo) < ngon+1:
        row = [(d, *memo[len(memo)//d-1]) for d in divisors(len(memo))]
        memo += [min(row, key=lambda r: (sum(r), len(r)))]
    return memo[ngon]

class Polygon(object):
    def __init__(self, data):
        if isinstance(data, int):
            self.ngon = data
            self.rel_pieces = calc_layers(data)
        elif isinstance(data, list) or isinstance(data, iter):
            self.rel_pieces = data
            self.ngon = calc_ngon(data)
        else:
            raise KeyError('initial data must be int or list of int.')
        if self.ngon < 3:
            raise KeyError('its absurd to draw a polygon with nos sides < 3.')
        self.angle = 360/self.ngon
        self.abs_pieces = [self.rel_pieces[0]]
        self.tot_pieces = [self.rel_pieces[0]]
        self._init_pieces_info()

    def _init_pieces_info(self):
        for i in range(1, len(self.rel_pieces)):
            self.abs_pieces += [self.abs_pieces[i-1] * self.rel_pieces[i]]
            self.tot_pieces += [self.tot_pieces[i-1] + self.abs_pieces[i]]

    def _base(self, radius, padding, precision):
        center = radius + padding
        x = center - (radius * tan(radians(self.angle/2)))
        y = padding
        spec = []
        for _ in range(self.rel_pieces[0]+1):
            spec += f'{round(x, precision)},{round(y, precision)}',
            x, y = rotate(x, y, radians(self.angle), center)
        color = 'stroke="#000" fill="none"'
        yield f'<g id="a0"><polyline {color} points="{" ".join(spec)}" /></g>'

    def _group(self, k, radius, padding, precision):
        if k == 0:
            yield from self._base(radius, padding, precision)
            return
        center = radius + padding
        theta = self.angle * self.abs_pieces[k-1]
        yield f'<g id="a{k}">'
        for i in range(1, 1+self.rel_pieces[k]):
            rot = round(theta*i, precision)
            transform = f'transform="rotate({rot} {center} {center})"'
            yield f'<use xlink:href="#a{k-1}" {transform} />'
        yield '</g>'

    def _svg(self, radius, padding, precision):
        size = 2 * (radius + padding)
        xmlns = 'xmlns="http://www.w3.org/2000/svg"'
        xlink = 'xmlns:xlink="http://www.w3.org/1999/xlink"'
        yield f'<svg {xmlns} {xlink} height="{size}" width="{size}">'
        for i, _ in enumerate(self.rel_pieces):
            yield from self._group(i, radius, padding, precision)
        yield '</svg>'

    def svg(self, radius, padding, precision):
        return '\n'.join(self._svg(radius, padding, precision))
```

ป.ล. [Tanapoom Laoaroon][] มาสะกิดว่าแนวคิดกำหนดการพลวัตข้างต้น มันไปคล้ายโจทย์ Matrygons จาก Google Code Jam เมื่อสัปดาห์ที่แล้วที่พูดถึงเรื่องทรงหลายเหลี่ยมปรกติเหมือนกันอีกด้วย! เพียงแค่ในโจทย์นั้นเค้าเปลี่ยนไปใช้ฟังก์ชันวัตถุประสงค์ที่หา $k$ ที่ใหญ่ที่สุดแทน พร้อมข้อจำกัดจากความเป็นทรงหลายเหลี่ยมที่ $x_0 \ge 3$ และ $x_i \neq 1$ หรือแก้โค้ดนิดหน่อยก็จะได้โจทย์ข้อนั้นเป็น corollary นั่นเอง 😜


[^1]: หาข้อมูลไปเรื่อยๆ เพิ่งเจอว่ามี [`<defs>`][svg defs] ที่เอาไว้กำหนดวิธีวาดภาพเป็นกลุ่มๆ โดยที่ยังไม่วาดลงไปบนผืนผ้าใบ ถ้าใช้ฟีเจอร์นี้ก็น่าจะประยุกต์ใช้แนวคิดเลขฐานสองได้สบายเลย 555



[@srakrn]: //twitter.com/srakrn
[@ipats]: //twitter.com/ipats
[Tanapoom Laoaroon]: //facebook.com/TanapoomLaoaroon

[megagon]: //en.wikipedia.org/wiki/Megagon
[exponential growth]: //en.wikipedia.org/wiki/Exponential_growth
[trivial]: //en.wikipedia.org/wiki/Triviality_(mathematics)
[dynamic programming]: //en.wikipedia.org/wiki/Dynamic_programming

[svg use]: //developer.mozilla.org/en-US/docs/Web/SVG/Element/use
[svg polyline]: //developer.mozilla.org/en-US/docs/Web/SVG/Element/polyline
[svg defs]: //developer.mozilla.org/en-US/docs/Web/SVG/Element/defs
