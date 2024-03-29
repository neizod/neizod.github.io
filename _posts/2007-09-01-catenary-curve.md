---
title: ตกท้องช้าง ฟิสิกส์ใกล้ตัวที่หลายคนมองข้าม
tags:
  - Physics
  - Differential Equation
date: 2007-09-01 19:18:00 +0700
---

ท่องเว็บมาได้นานพอสมควร  
เห็นว่าไม่ค่อยมีใครเขียนเรื่องแนวนี้  
ก็รู้สึกน่าเสียดายเหมือนกันนะครับ

เลยคิดว่า ถ้าเราไม่ลงมือเขียนเอง  
ไม่ต้องรอให้คนอื่นมาเขียนให้อ่าน  
แม้จะผิดบ้างถูกบ้าง แต่ก็ยังดี

คิดได้ก็งัดเอาความรู้ที่ผมเคยผจญภัย  
เอามาเขียนลงให้ทุกๆ คนอ่านกันครับ  
บางเรื่องก็ง่าย บางเรื่องก็ยาก  
จะพยายามเขียนให้อ่านรู้เรื่องนะครับ ^^"

ยังไงก็ขอฝากผลงานใหม่ด้วยนะครับ  
(เฮ้ย! ของเก่าก็เลิกดองซักทีเซ่)

ต้นตอของเรื่องนี้เกิดจากสายไฟครับ  
สายที่ถูกแขวนระหว่างเสาไฟนั่นแหละ  
ปรกติผมก็ไม่ได้สนใจมันหรอกครับ  
เพราะมันขึงไว้เกือบตึง ไม่สะดุดตา

แต่วันนั้นช่างไฟเขามาขึงสายไฟใหม่  
ผมก็ดูเขาขึงสาย แล้วก็คิดเรื่อยเปื่อย  
อึ่ม ทำไมมันย้อยเป็นรูปสวยงามจัง  
เหมือนกันรูปพาราโบลาที่เคยเรียนเลย

(ตอนที่เห็นนั้นผมก็ไม่รู้หรอกครับ  
ว่ารูปร่างเชือกนี้มีชื่อเรียกอย่างไร  
เลยหาบทพิสูจน์เอาในเน็ตไม่เจอ  
กว่าจะรู้ก็หลังจากนั้นได้ปีนึงเลย)

พอว่างๆ ก็ลองเขียนๆ สมการเล่น  
ได้ว่ารูปร่างเส้นเชือกที่ตกท้องช้าง  
แปรผันกับการปริพันธ์ของสมการ  
ความแตกต่างของมวลซ้ายกับขวา

ซึ่งสมการความแตกต่างของมวลเชือก  
โดยทั่วไปนั้น เป็นสมการเส้นตรง  
พอปริพันธ์ ก็จะได้สมการกำลังสอง

สมการรูปร่างเส้นเชือกที่ผมคิดไว้

$$
\begin{align*}
y &= kx^2  \\
k &= \text{อะไรก็จำไม่ได้แล้ว...}
\end{align*}
$$

(สมการกำลังกสองธรรมด้าธรรมดา)

หลังจากกำหนดสมการเชือกได้แล้ว  
ก็ทำการทดลองอีกนิดๆ หน่อยๆ  
ผลการทดลองคือตรงเป็นส่วนใหญ่  
จะคลาดเคลื่อนมากๆ ตรงท้องเชือก  
ซึ่งผมก็ไม่ได้เอะใจอะไรมากนัก

แต่ก็ลองเอาไปถามดูใน[วิชาการ.คอม][vcharkarn]  
ก็ได้[พี่ GFK][@GFK] ช่วยคอมเมนต์และแก้ไขให้  
จึงได้รู้ว่าที่จริง มันไม่ใช่รูปพาราโบลา  
แต่เป็นคอสไฮเปอร์โบลาต่างหาก

จะพิสูจน์อย่างเร็วและย่อนะครับ  
อ่านไม่รู้เรื่องก็อย่าโทษกันหละ...  
(ผมยังอ่านไม่รู้เรื่องเลย)

สัญลักษณ์  
$\mu$ คือ มวลของเชือกต่อหน่วยความยาว (ตามแนวเชือก)  
$T$ คือ แรงตึงเชือกที่ จุด $(x,y)$ ใดๆ บนเส้นเชือก  
$T_0$ คือ แรงตึงเชือกที่ จุด $(0,0)$  
$s$ คือ ความยาวเชือกที่เริ่มวัดจากจุด $(0,0)$ ไปยังจุด $(x,y)$ บนเส้นเชือก

ก่อนอื่น จินตนาการรูปเชือกที่โดนแขวนนะครับ  
(เพราะผมจะไม่วาดรูปให้ อิอิ)

สมดุลในแกน Y $(\sum F_y = 0)$  
$(T + \Delta T) \sin(\theta + \Delta\theta) = T \sin\theta + \mu g \Delta s$

คูณกระจายและแตกฟังก์ชันไซน์  
แล้วจึงค่อยให้ $\Delta\theta$ มีค่าน้อยๆ  
$\cos\Delta\theta \approx 1$ และ $\sin\Delta\theta \approx \Delta\theta$  
สมการนี้ก็จะกลายเป็น

$$
T(\Delta\theta)\cos\theta + (\Delta T)\sin\theta + (\Delta T)(\Delta\theta)\cos\theta = \mu g \Delta s
$$

เนื่องจาก $(\Delta T)(\Delta\theta)\cos\theta$ มีค่าน้อยมาก  
เมื่อเทียบกับ $T(\Delta\theta)\cos\theta$ และ $(\Delta T)\sin\theta)$  
จึงไม่ต้องไปสนพจน์ $(\Delta T)(\Delta\theta)\cos\theta$  
สมการจึงเหลือแค่

$$
T(\Delta\theta)\cos\theta + (\Delta T)\sin\theta = \mu g \Delta s
$$

จับ $\Delta\theta$ มาหารทั้งสมการ  
แล้วเทคลิมิต $\Delta\theta \to 0$ ก็จะได้

$$
\frac{d}{d\theta} T\sin\theta = \mu g \frac{ds}{d\theta}
$$

ชี้แจงเกี่ยวกับการเขียนสัญลักษณ์อนุพันธ์  
ผมชอบเขียนให้ $d/d\theta$ ชิดกันอย่างนี้  
แล้วค่อยใส่ฟังก์ชันที่จะหาอนุพันธ์ด้านหลัง  
ก็คือเขียนแบบนี้ $d/d\theta(\dots)$  
(ไม่ชอบเขียนแบบนี้ $d\dots/d\theta$)  
แต่ถ้ามีตัวแปรเดียวก็เขียน $ds/d\theta$ ครับ  
หวังว่าคงไม่งงไปซะก่อนนะ...

แต่ $T\cos\theta = T_0$  
และ $\tan\theta = dy/dx$  
จึงได้ว่า

$$
\frac{d}{d\theta}\left(T_0 \frac{dy}{dx}\right) = \mu g \frac{ds}{d\theta}
$$

ได้แล้วก็เก็บไว้ก่อนนะ...

ต่อมาก็พิจรณาสมดุลในแกน X $(\sum F_x = 0)$  
$(T + \Delta T)\sin(\theta + \Delta\theta) = T\cos\theta$

สมการสั้นกว่าแนวแกน Y ตั้งเยอะเนาะ  
ทำเหมือนเดิมเลยครับ คูณกระจาย  
แตกฟังก์ชันไซน์ ให้ $\Delta\theta$ มีค่าน้อยๆ  
ก็จะได้สมการใหม่เป็น

$$
T(\Delta\theta)\sin\theta + (\Delta T)\cos\theta + (\Delta T)(\Delta\theta)\sin\theta = 0
$$

กำจัดตัวที่มีค่าน้อยๆ คือกำจัด $(\Delta T)(\Delta\theta)\sin\theta$  
เพราะเมื่อเทียบกับ $T(\Delta\theta)\sin\theta$ และ $(\Delta T)\cos\theta$  
แล้ว $(\Delta T)(\Delta\theta)\sin\theta$ มีค่าน้อยจนไม่ต้องสน  
สมการจึงเหลือแค่

$$
T(\Delta\theta)\sin\theta + (\Delta T)\cos\theta = 0
$$

หาร $\Delta\theta$ แล้วเทคลิมิต $\Delta\theta \to 0$ ได้

$$
\frac{d}{d\theta} T\cos\theta = 0
$$

สมการนี้ชี้ว่า แรงตึงเชือกในแนวนอน  
มีค่าเท่ากันตลอดทั้งเส้น และเนื่องจาก  
$T\cos\theta = T_0$ (ยังจำได้มั้ย?)  
จึงทำให้ $d/d\theta(T_0 dy/dx) = \mu g (ds/d\theta)$ เป็น

$$
T_0 \frac{d}{d\theta}\left(\frac{dy}{dx}\right) = \mu g \frac{ds}{d\theta}
$$

ใช้กฎลูกโซ่เข้าช่วย และย้ายข้าง ได้

$$
\frac{d^2y}{dx^2} = \frac{\mu g}{T_0}\frac{ds}{dx}
$$

และจากสมการหาความยาวเส้นกราฟ  
คือ $ds/dx = \sqrt{1+(dy/dx)^2}$ จึงได้ว่า

$$
\frac{d^2y}{dx^2} = \frac{\mu g}{T_0} \sqrt{1+\left(\frac{dy}{dx}\right)^2}
$$

ถึงตอนนี้ กำหนดให้ $Y = dy/dx$ จะได้ว่า

$$
\frac{dY}{dx} = \frac{μg}{T_0} \sqrt{1+Y^2}
$$

แก้สมการนี้ด้วยการปริพันธ์  
(ยาก+ยาว = ไม่พิมพ์ลงให้ละ อิอิ)  
ท้ายที่สุด จะได้ออกมาว่า

$$
y = \frac{T_0}{\mu g} \left( \cosh\frac{\mu g x}{T_0} + 1\right)
$$

(อยากได้พิสูจน์ฉบับเต็ม เมลมาขอได้ครับ)

จัดรูปสมการให้สวยงาม ก็จะได้ว่า  
สมการรูปร่างเส้นเชือก $(x,y)$ คือ

$$
\begin{align*}
y &= k \left(\cosh\frac{x}{k} - 1\right) \\
k &= \frac{T_0}{\mu g}
\end{align*}
$$

สำหรับฟังก์ชัน $y = \cosh x$  
เป็นหนึ่งในไฮเปอร์โบลิกฟังก์ชัน  
ที่มีลักษณะคล้ายพาราโบลามาก  
กำหนดโดยเอกซ์โพเนนเชียลดังนี้

$$
\cosh x = \frac{e^x + e^{-x}}{2}
$$

ตอนแรกผมไม่ได้คิดถึง $\cosh x$ เลย  
แต่พอได้อ่านพิสูจน์ใหม่ ก็เห็นด้วยครับ

และพอเทียบกับผลการทดลองที่มีอยู่  
ก็พบว่าแทบไม่คลาดเคลื่อนเลยครับ

(อึ่ม... ไม่รู้จะจบยังไงแฮะ)  
เอาเป็นว่า ขอจบตอนนี้เลยละกันครับ  
หวังว่าจะได้รับความรู้ไปบ้างนะครับ ^^


## อ้างอิง

- Meriam & Kraige , Engineering Mechanics (Statics) Fifth Edition , John Wiley


[@GFK]: //www.vcharkarn.com/my/1122

[vcharkarn]: //www.vcharkarn.com/
