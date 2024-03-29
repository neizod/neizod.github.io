---
title: แผนภาพ Voronoi ที่เส้นขอบเป็นไฮเพอร์โบลา
tags:
  - Conic Section
  - Geometry
  - Computational Geometry
  - Mathematics
date: 2020-05-13 10:24:42 +0700
---

เคยเขียนถึงแผนภาพ Voronoi ไปบ้าง ([1][self voronoi picture], [2][self pollution idw]) ว่าแนวคิดมันคือการแบ่งแผนที่ออกเป็นเซลล์ เพื่อให้ข้อมูลว่าแต่ละเซลล์อยู่ใกล้กับจุดตั้งต้นจุดไหนมากที่สุด (มองจุดตั้งต้นเป็นสถานีดับเพลิงก็ได้ว่าจะแบ่งพื้นที่กันยังไงให้เวลาไฟไหม้แล้วรถดับเพลิงไปถึงจุดเกิดเหตุไวที่สุด)

อัลกอริทึมสำหรับคำนวณหาแผนภาพ Voronoi นั้นมีอยู่มากมาย แต่วิธีที่นำมาอธิบายได้ง่ายที่สุดคือการสร้างวงกลมล้อมรอบแต่ละสถานี แล้วขยายขนาดวงกลมออกมาเรื่อยๆ จนวงกลมชนกัน จุดที่ชนก็จะเป็นขอบเขตของแต่ละเซลล์ที่แต่ละสถานีต้องรับผิดชอบ ซึ่งเส้นขอบนี้จะเป็นเส้นตรงภายใต้เงื่อนไขที่ว่าแต่ละสถานีเริ่มขยายวงกลมพร้อมกันและขยายด้วยอัตราเร็วเท่ากัน

แล้วถ้าวงกลมที่ล้อมรอบแต่ละสถานีมีจุดเริ่มต้นขยายตัวไม่พร้อมกันหละ (เช่น บางสถานีที่เมื่อได้ข่าวไฟไหม้แล้วสามารถตระเตรียมรถดับเพลิงให้ออกปฏิบัติงานได้เร็วก่อนสถานีอื่น) เช่นนี้แล้วขอบของแต่ละเซลล์จะมีหน้าตาเปลี่ยนแปลงไปเป็นอย่างไร?

{: .oversized .figure}
> ![](/images/math/hyperbolic-voronoi/example.png)
>
> ตัวอย่างแผนภาพ Voronoi แบบที่แต่ละจุดตั้งต้นเริ่มขยายวงกลมล่วงหน้าไปก่อนไม่รอเริ่มพร้อมกัน

ปัญหานี้เป็นหนึ่งในปัญหาที่แตกหน่องอกงามออกมา โดยมันมีชื่อเฉพาะว่าแผนภาพ Voronoi ที่ถูกเพิ่มน้ำหนักด้วยการบวก ([additively weighted Voronoi diagram][wiki weighted voronoi]) ซึ่งสปอยล์คำตอบตรงนี้ก่อนเลยว่า ขอบเซลล์ที่ได้จะเป็นเส้นโค้งแบบ[ไฮเพอร์โบลา][wiki hyperbola]!

---

พิจารณาสถานี $A$ กับ $B$ ซึ่งสถานี $A$ เริ่มต้นขยายวงกลมไปก่อนแล้วด้วยขนาด $R$ หน่วย และทั้งสองสถานีต้องขยายวงกลมเพิ่มอีก $r$ หน่วย วงกลมทั้งสองถึงจะมาชนกันที่จุดขอบระหว่างเซลล์จุดแรก หากสนใจจุด $C$ ซึ่งเป็นจุดขอบเมื่อขยายวงกลมเพิ่มไปอีก $t$ หน่วย คำถามคือตำแหน่งของจุด $C$ จะอยู่ ณ พิกัดใด?

{: .figure}
> ![](/images/math/hyperbolic-voronoi/analyse-triangle.png)
>
> สามเหลี่ยมสำหรับวิเคราะห์ปัญหานี้

ดูเผินๆ เหมือนจะคำนวณตำแหน่ง $C$ ได้ยากมาก แต่เราสามารถเริ่มต้นที่การลากเส้นผ่านจุด $C$ ไปตั้งฉากกับ $\overline{AB}$ เพื่อสร้างจุดตัด $D$ ขึ้นมา ซึ่งก็คือเราจะได้ว่า $\overline{AB} = \overline{AD} + \overline{BD}$

นอกจากนี้ เรายังจะได้สมบัติพื้นฐานของสามเหลี่ยมมุมฉาก $\triangle ADC$ และ $\triangle BDC$ มาใช้อีกด้วย คือ

$$
\begin{align*}
\overline{AC}^2 &= \overline{AD}^2 + \overline{CD}^2 \\
\overline{BC}^2 &= \overline{BD}^2 + \overline{CD}^2
\end{align*}
$$

ซึ่งจะทำให้ได้ว่า

$$
\begin{align*}
\overline{AC}^2 - \overline{AD}^2
    &= \overline{BC}^2 - \overline{BD}^2 \\
    &= \overline{BC}^2 - \left( \overline{AB} - \overline{AD} \right)^2 \\
    &= \overline{BC}^2 - \left( \overline{AB}^2 - 2 \overline{AB} \cdot \overline{AD} + \overline{AD}^2 \right) \\
    &= \overline{BC}^2 - \overline{AB}^2 + 2 \overline{AB} \cdot \overline{AD} - \overline{AD}^2
\end{align*}
$$

ย้ายข้างและจัดรูป ก็จะได้คำตอบ

$$
\overline{AD} = \frac{ \overline{AB}^2 + \overline{AC}^2 - \overline{BC}^2 }{2\overline{AB}}
$$

เมื่อรู้ $\overline{AD}$ ก็ง่ายแล้ว เพราะย้อนกลับไปใช้พีทาโกรัสหา $\overline{CD}$ โดยตรงได้ทันที

$$
\overline{CD} = \pm \sqrt{ \overline{AC}^2 - \overline{AD}^2 }
$$

---

ตอนนี้เพื่อความง่ายในการวิเคราะห์ต่อ สมมติให้ $\overline{AB}$ ขนานกับแกน $X$ โดยให้ $A=\left(\frac{-R-2r}2,0\right)$ และ $B=\left(\frac{R+2r}2,0\right)$ แล้วแทนค่าความยาวด้านต่างๆ ลงไปเพื่อหาตำแหน่งของ $C=(x,y)$ เริ่มจากหาตำแหน่งในแกน $X$ ก่อน ก็จะได้ว่า

$$
\begin{align}
x &= \frac{ (R+2r)^2 + (R+r+t)^2 - (r+t)^2 }{ 2(R+2r) } \\
  &= r + R \left( 1 + \frac{t}{R+2r} \right) \\
t &= (R+2r)\left( \frac{x-r}{R} - 1 \right) \\
\end{align}
$$

และเมื่อหาตำแหน่งในแกน $Y$ ก็จะได้

$$
\begin{align}
y^2 &= (R+r+t)^2 - \left(\frac{R}2+r+x\right)^2 \\
    &= \left( \frac{R^2 + 2xR + 4xr}{2R} \right)^2 - \left( \frac{R^2 + 2rR + 2xR}{2R} \right)^2 \\
    &= \frac1{R^2} \left( 4x^2rR + 4x^2r^2 - rR^3 - r^2R^2 \right)
\end{align}
$$

ถึงจะได้ข้อมูลตำแหน่งมาครบก็อาจจะยังมองไม่ชัดถึงหน้าตาสมการว่าเป็นไฮเพอร์โบลาได้อย่างไร แต่ถ้าอดทนจัดรูปต่อไปอีกหน่อยก็จะเห็นว่าสมการข้างต้นมันสามารถกลายเป็น

$$
1 = \frac{4x^2}{R^2} - \frac{y^2}{rR+r^2}
$$

ซึ่งก็คือไฮเพอร์โบลา ที่มีค่า $a=\frac{R}2, c=\frac{R+2r}2$ นั่นเอง

---

ป.ล. อันที่จริงไม่ต้องวิเคราะห์ยืดยาวก็ได้ เพราะวิธีการข้างต้นก็เป็นนิยามการสร้างไฮเพอร์โบลาอยู่แล้ว 🤪

[self voronoi picture]: /2015/05/22/voronoi-from-picture.html
[self pollution idw]: /2019/10/11/interpolate-bkk-pollution-idw.html

[wiki hyperbola]: //en.wikipedia.org/wiki/Hyperbola
[wiki weighted voronoi]: //en.wikipedia.org/wiki/Weighted_Voronoi_diagram
