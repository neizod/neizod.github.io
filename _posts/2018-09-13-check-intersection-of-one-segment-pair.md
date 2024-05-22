---
title: ตรวจว่าส่วนของเส้นตรงสองเส้นตัดกันหรือไม่
tags:
  - Mathematics
  - Geometry
  - Linear Algebra
  - Python
  - Algorithm
  - Computer Science
  - Computational Geometry
  - Math Animation
date: 2018-09-13 08:54:20 +0700
revise:
  - date: 2018-09-14 16:56:09 +0700
    note: แก้ไขคำอธิบายผลคูณจุด ตามคำแนะนำของ [Pramook Khungurn](//facebook.com/pramook)
---

โจทย์คณิตศาสตร์ง่ายๆ ที่น่าจะเป็นจุดก่อกำเนิดของวิชา[เรขาคณิตคำนวณ (computational geometry)][computational geometry] อาจมาจากคำถามแค่ว่า เราจะตรวจสอบได้อย่างไรว่าส่วนของเส้นตรงสองเส้นที่สนใจตัดกันหรือไม่?

{: .figure}
> ![](/images/algorithm/segment-intersection/cover.png)
>
> ตัวอย่างการตัดกันของส่วนของเส้นตรง ในภาพนี้มีแค่สีเขียวคู่กลางเท่านั้นที่ตัดกัน

มองเผินๆ นี่น่าจะไม่เป็นปัญหาสำหรับเราด้วยซ้ำ เพราะเราสามารถทำความเข้าใจปัญหาดังกล่าวในเชิงรูปภาพได้อย่างเป็นธรรมชาติ แต่กับคอมพิวเตอร์นั้นไม่ใช่ ข้อมูลส่วนของเส้นตรงที่คอมพิวเตอร์รู้จัก อาจถูกจำกัดเหลือเพียงพิกัดของจุดปลายทั้งสองข้างเท่านั้น

แล้วเราจะแก้ปัญหานี้ได้อย่างไร? ลองจินตนาการดูว่าตอนนี้เรายืนคุมหางเสือที่ท้ายเรือลำหนึ่ง (ส่วนของเส้นตรง $\overline{pq}$) และหันหน้ามองตรงออกไปยังหัวเรือ หากเราเห็นเรืออีกลำ (ส่วนของเส้นตรง $\overline{rs}$) มีหัวเรือและท้ายเรืออยู่ทั้ง[กราบซ้ายและกราบขวา][port starboard]เมื่อเทียบกับเรือเรา (ทิศทางทวนเข็มและตามเข็มนาฬิกา) นั่นแปลว่าเรือของเราสามารถแล่นตรงๆ ไปตัดเรืออีกลำได้

แต่การพิจารณาจากเรือเพียงลำเดียวนั้นไม่พอ เพราะหากมองจากเรืออีกลำ (ส่วนของเส้นตรง $\overline{rs}$) อาจเห็นว่าเรือของเรา (ส่วนของเส้นตรง $\overline{pq}$) อยู่ฝั่งกราบขวาทั้งลำเลยก็ได้ (เช่นตัวอย่างภาพการตัดกันของส่วนของเส้นตรงสีฟ้าข้างต้น) ซึ่งนั่นหมายความว่าเรือทั้งสองยังไม่แล่นชนกัน การตรวจว่าส่วนของเส้นตรงตัดกันหรือไม่ จึงต้องพิจารณาตามข้างต้นจากส่วนของเส้นตรงทั้งสองเส้น

ต่อไปเราจะสร้างเครื่องมือเพื่อพิจารณาว่าจุดใดๆ ที่เลือกมา อยู่ฝั่งทวนเข็มนาฬิกาเมื่อเทียบกับส่วนของเส้นตรงที่สนใจหรือไม่

ตอนนี้หากยังจำกันได้ [ผลคูณจุด][dot product]ของเวกเตอร์สองตัว นิยามว่าเป็นผลรวมของผลคูณของขนาดในแต่ละพิกัด ซึ่งในระนาบสองมิติก็คือ $\vec{u} \cdot \vec{v} = u_x v_x + u_y v_y$ แต่แทนที่เราจะแตกขนาดของเวกเตอร์ทั้งสองตัวลงไปยังทั้งสองแกน X-Y เราอาจเลือกใช้แกนใดๆ ที่ขนานกับ $\vec{u}$ ไปเลยก็ได้ ทีนี้ตอนแตกขนาด $\vec{v}$ เราก็จะสนใจแค่ด้านที่ขนานกับ $\vec{u}$ เท่านั้น (เพราะผลคูณอื่นๆ ในแกนที่ตั้งฉากกันจะมีค่าเป็นศูนย์) ดังนั้นก็จะเหลือเพียง $\vec{u}\cdot\vec{v} = \abs{\vec{u}}\abs{\vec{v}}\cos\theta$ เมื่อ $\theta$ เป็นมุมระหว่าง $\vec{u}$ นับวนทวนเข็มนาฬิกาไปหา $\vec{v}$

{: .figure}
> ![](/images/math/dot-product.gif)
>
> อนิเมชันตัวอย่างผลคูณจุดของเวกเตอร์ โดยในที่นี้พื้นที่สีแดงแทนค่าผลคูณที่เป็นบวก

เราอาจมองผลคูณจุดในรูปของพื้นที่ก็ได้ โดยเริ่มจากการแตก $\vec{v}$ ลงมาเป็น $\vec{v}'$ ที่มีขนาด $\abs{\vec{v}}\cos\theta$ บนแกนเดียวกันกับ $\vec{u}$ ก่อน แล้วสร้าง $\vec{v}_N'$ ซึ่งเกิดจากการหมุน $\vec{v}'$ ทวนเข็มไป $90^\circ$ องศา จะเห็นว่าพื้นที่สี่เหลี่ยมผืนผ้าที่มีด้านเป็น $\vec{u}$ และ $\vec{v}_N'$ มีค่าเป็นบวกก็ต่อเมื่อ $\vec{v}$ มีทิศทางบางส่วนหันไปทางเดียวกับ $\vec{u}$ (และเป็นลบเมื่อหันในทิศตรงข้าม และเป็นศูนย์เมื่อตั้งฉากกันพอดี) ... แต่สิ่งที่เราต้องการคือการแบ่งว่า $\vec{v}$ อยู่ในทิศทางทวนเข็มหรือตามเข็มจาก $\vec{u}$ ดังนั้นถ้าเราสร้าง $\vec{u}_N = \left[\begin{smallmatrix}-u_y \newline u_x\end{smallmatrix}\right]$ ซึ่งเป็นเวกเตอร์ที่ตั้งฉากในทิศทวนเข็มกับ $\vec{u}$ แล้วคำนวณ $\vec{u}_N\cdot\vec{v}$ จะเห็นว่าผลคูณจุดนี้มีค่าเป็นบวกเมื่อ $0^\circ<\theta<180^\circ$ และมีค่าเป็นลบเมื่อ $180^\circ<\theta<360^\circ$ นั่นเอง (โดย $\theta$ ยังเป็นมุมระหว่าง $\vec{u}$ กับ $\vec{v}$ เดิม ไม่ใช่มุมระหว่ง $\vec{u}_N$ กับ $\vec{v}$)

ด้วยความช่วยเหลือจาก[ฟังก์ชันบ่งเครื่องหมาย ($\sgn$)][sign function] เราอาจสร้างฟังก์ชันสำหรับตรวจสอบว่าจุด $v$ อยู่ฝั่งทวนเข็มนาฬิกาจากเส้นตรงจากจุด $(0,0)$ ไปยังจุด $u$ หรือไม่ ออกมาเป็นสมการได้ดังนี้

$$
\begin{align*}
CCW(u, v, w)
&= \sgn(\vec{u}_N \cdot \vec{v}) \\
&= \sgn(u_x v_y - u_y v_x) \\
&= \sgn \begin{vmatrix} u_x & v_x \\ u_y & v_y \end{vmatrix}
\end{align*}
$$

แต่อย่าลืมว่า $\vec{u}$ และ $\vec{v}$ นั้น เป็นเวกเตอร์ที่โดน[เลื่อน][translation]มาคำนวณที่จุด $(0,0)$ หากเวกเตอร์ของการเลื่อนคือ $\vec{w}$ ค่าใน[ดีเทอร์มิแนนต์][determinant]ข้างต้นจะกลายเป็น

$$
\begin{vmatrix}
u_x-w_x & v_x-w_x \\
u_y-w_y & v_y-w_y
\end{vmatrix} =
\begin{vmatrix}
u_x & v_x & w_x \\
u_y & v_y & w_y \\
1   & 1   & 1
\end{vmatrix}
$$

(พอเห็นแบบนี้แล้วคุ้นตามากๆ จนนั่งท่องเน็ตเพิ่มอีกซักพักก็พบว่า ถ้าเอาค่าจากดีเทอร์มิแนนต์ไปหารสองก็จะได้พื้นที่สามเหลี่ยมพอดี! ... โอ้โห ทำไมตอนนั้นไม่ตั้งใจเรียน[พีชคณิตเชิงเส้น][linear algebra]ให้มากกว่านี้ 😂)

เมื่อได้ฟังก์ชัน $CCW$ มาแล้ว จะหาว่าส่วนของเส้นตรง $\overline{pq}$ และ $\overline{rs}$ ตัดกันหรือไม่ ก็ทำได้ง่ายๆ เพียง

$$
\begin{align*}
CUT(\overline{pq}, \overline{rs}) &= CCW(p, q, r) \oplus CCW(p, q, s) \\
INTERSECT(\overline{pq}, \overline{rs}) &= CUT(\overline{pq}, \overline{rs}) \land CUT(\overline{rs}, \overline{pq})
\end{align*}
$$

## อ้างอิง

- Don Sheehy, 2010. Computational Geometry: Lecture 3.

---

ป.ล. ส่วนนี่คือโค้ด Python สำหรับใครที่ต้องการเอาไปลองเล่นตาม 😉

``` python
from operator import mul
from functools import reduce
from collections import namedtuple

prod = lambda ls: reduce(mul, ls)

Matrix = namedtuple('Matrix', 'm')      # dimension 3x3 only.
Matrix.from_points = lambda u, v, w: Matrix([ [u.x, v.x, w.x],
                                              [u.y, v.y, w.y],
                                              [  1,   1,   1] ])
Matrix.diag_down = lambda self: ((self.m[j][(i+j)%3] for j in range(3))
                                                     for i in range(3))
Matrix.diag_up = lambda self: ((self.m[j][(i+3-j)%3] for j in range(3))
                                                     for i in range(3))
Matrix.det = lambda self: ( sum(prod(d) for d in self.diag_down())
                          - sum(prod(d) for d in self.diag_up()) )

Point = namedtuple('Point', 'x y')

Segment = namedtuple('Segment', 'p q')
Segment.from_floats = lambda x0, y0, x1, y1: Segment(Point(x0, y0), Point(x1, y1))
Segment.ccw = lambda self, p: Matrix.from_points(p, *self).det() > 0
Segment.through = lambda self, other: self.ccw(other.p) ^ self.ccw(other.q)
Segment.intersect = lambda self, other: self.through(other) and other.through(self)


# example
import matplotlib.pyplot as plt
segments = [ Segment.from_floats(0.4, 0.8, 1.5, 1.6),
             Segment.from_floats(0.0, 4.2, 2.3, 0.0) ]
print('Segment intersect?', segments[0].intersect(segments[1]))
plt.plot(*(pair for a, b in segments for pair in [(a.x, b.x), (a.y, b.y)]))
plt.show()
```


[computational geometry]: //en.wikipedia.org/wiki/Computational_geometry
[dot product]: //en.wikipedia.org/wiki/Dot_product
[port starboard]: //en.wikipedia.org/wiki/Port_and_starboard
[sign function]: //en.wikipedia.org/wiki/Sign_function
[translation]: //en.wikipedia.org/wiki/Translation_(geometry)
[determinant]: //en.wikipedia.org/wiki/Determinant
[linear algebra]: //en.wikipedia.org/wiki/Linear_algebra
