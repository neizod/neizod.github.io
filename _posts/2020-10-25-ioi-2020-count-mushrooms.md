---
title: "IOI 2020: นับเห็ดเปลี่ยนชนิด"
tags:
  - Olympiad in Informatics
  - Interactive Problem
  - Competitive Programming
  - Algorithm
  - C++
date: 2020-10-25 21:31:23 +0700
people:
  neizod: author, illustrator
  nonthaphat: coauthor, coder
---

โจทย์ข้อที่ยากทีสุดในการแข่งขัน IOI 2020 คงหนีไม่พ้นข้อที่ 2 ในวันที่ 2 ที่มีผู้เข้าแข่งขันเพียงคนเดียวที่ได้ 100 คะแนนเต็ม ตัวโจทย์เป็นแนว[โต้ตอบ][interactive problem] โดยจะให้คะแนนตามจำนวนครั้งที่โต้ตอบ ยิ่งสามารถทำได้ในจำนวนครั้งที่น้อยลงเท่าไหร่ ก็จะยิ่งได้คะแนนที่มากขึ้นเท่านั้น

โดยเนื้อหาโจทย์อย่างสรุปเล่าได้ว่า มีเห็ดอยู่สองชนิดที่มนุษย์ไม่สามารถแยกออกได้ด้วยตนเอง ส่วนเครื่องจักรที่มีก็สามารถนับจำนวน*การเปลี่ยนแปลงของชนิดเห็ด*ที่ใส่เข้าไปเป็นลำดับได้เท่านั้น เช่น เมื่อใส่เห็ด 5 ดอกที่มีชนิด $ABBAB$ เข้าไปตามลำดับจนเสร็จแล้วเดินเครื่อง เครื่องจักรจะตอบว่าเกิดการเปลี่ยนแปลงขึ้น 3 ครั้งนั่นเอง อย่างไรก็ตามการเดินเครื่องจักรแต่ละครั้งจะใช้พลังงานเท่ากับจำนวนเห็ดที่ใส่เข้าไป หากเรามีพลังงานอยู่ $100,000$ หน่วยพร้อมกับเห็ดอีก $20,000$ ดอก ซึ่งเราทราบว่าเห็ดดอกแรกสุดนั้นคือเห็ดตัวอย่างของชนิด $A$ และเราสามารถเรียงลำดับเห็ดใส่เข้าไปในเครื่องจักรอย่างไรก็ได้ จงเขียนโปรแกรมที่นับจำนวนเห็ดชนิด $A$ โดยพยายามลดจำนวนการเดินเครื่องให้เหลือน้อยที่สุดและยังใช้พลังงานไม่เกินที่กำหนด [ดูเว็บที่เก็บโจทย์ต้นฉบับ][problem statement]

{: .oversized .figure}
> ![](/images/algorithm/misc/mushrooms.png)
>
> ตัวอย่างการใส่เห็ดแบบต่างๆ และคำตอบจากเครื่องจักรที่บอกจำนวนครั้งที่เห็ดเปลี่ยนชนิด

## คว้าคะแนนขั้นต่ำจากข้อสังเกตพื้นฐาน

เกณฑ์การให้คะแนนขั้นต่ำสุดที่ 10 คะแนน ยินยอมให้มีการเดินเครื่องจักรได้มากถึง $20,000$ ครั้ง ดังนั้นในแต่ละครั้งเราจะใส่เห็ดเพียง 2 ดอก โดยหนึ่งในนั้นให้เป็นเห็ดดอกแรกที่เรารู้แน่นอนว่าคือชนิด $A$ แล้วจับคู่ทีละคู่กับเห็ดดอกอื่นๆ ที่เหลือ เมื่อนับจำนวนครั้งที่**ไม่มี**การเปลี่ยนแปลงแล้วบวกเพิ่มอีกหนึ่งก็จะได้จำนวนของเห็ดชนิด $A$ ทั้งหมดนั่นเอง

ส่วนเกณฑ์ 25 คะแนนในบันไดขั้นถัดไปนั้น จะห้ามเดินเครื่องจักรเกิน $10,010$ ครั้ง ซึ่งสามารถทำได้โดยใช้แนวคิดคล้ายกับข้างต้นเลย เพียงแต่ว่าเราจะใส่เห็ดเพิ่มเข้าไปเป็นครั้งละ 3 ดอกแทน โดยต้องใส่เห็ดชนิด $A$ ไว้ตรงกลางระหว่างเห็ดอีกสองดอกที่เราไม่รู้เท่านั้น เมื่อเดินเครื่องจักรแล้วจะพบว่า

- ตอบ 0: เห็ดทั้ง 3 ดอกเป็นชนิด $A$
- ตอบ 1: มีเห็ดชนิด $A$ อยู่ 2 ดอก และเห็ดชนิด $B$ อีก 1 ดอก (ไม่สนใจว่า $B$ คือดอกไหน)
- ตอบ 2: เฉพาะเห็ดตรงกลางเป็นชนิด $A$ ส่วนอีก 2 ดอกเป็นเห็ดชนิด $B$

## วางโครงร่างเทคนิคชิงคะแนนที่มากขึ้น

สำหรับเกณฑ์การให้คะแนนขั้นถัดไปจะเกิดขึ้นเมื่อสามารถเดินเครื่องจักรได้ไม่เกิน $904$ ครั้ง โดยจะคิดคะแนนเป็นสัดส่วนกับจำนวนครั้งที่เดินเครื่องจักร คือจะได้คะแนน $100 \times 226 / Q$ คะแนนเมื่อ $Q$ คือจำนวนครั้งที่เดินเครื่องนั่นเอง (คะแนนสูงสุดตัดที่ 100 คะแนน หรือก็คือได้คะแนนเต็มเมื่อเดินเครื่องไม่เกิน $226$ ครั้ง)

เทคนิคสำคัญสำหรับการคว้าคะแนนในช่วงนี้จะอาศัยข้อสังเกตจากวิธีพื้นฐานที่ผ่านมา โดยใช้เห็ดที่เรารู้ชนิดอยู่แล้วเป็นจำนวนมากมาวางสับหว่างกับเห็ดที่เราต้องการนับ ซึ่งก็คือ สมมติว่าเรามีเห็ดที่รู้แน่ๆ ว่าเป็นชนิด $A$ อยู่ $m$ ดอก เราจะจัดเห็ดใส่ถาดเป็นลำดับเช่นนี้ก่อนส่งเข้าไปให้เครื่องจักรนับจำนวนครั้งของการเปลี่ยนแปลง

$$
\underbrace{x_1 \, A \; x_2 \, A \; x_3 \, A \; \dots \; x_m \, A}_{2m\text{ mushrooms}}
$$

เมื่อ $x_i$ สำหรับ $1 \le i \le m$ แทนเห็ดดอกที่เรายังไม่ทราบชนิด เนื่องจากเราแค่ต้องการนับว่าจาก $x_1$ ถึง $x_m$ มีเห็ดชนิด $A$ ทั้งหมดกี่ดอก โดยจำเป็นไม่ต้องสนใจว่าแต่ละ $x_i$ จะเป็นเห็ดชนิดใด สังเกตว่านอกจากที่ $x_1$ แล้ว หาก $x_i$ ดอกอื่นๆ เป็นเห็ดชนิด $B$ เครื่องจักรจะนับการเปลี่ยนแปลง ณ เห็ดดอกนั้นเพิ่มได้ 2 ครั้ง ส่วนเฉพาะที่ $x_1$ จะนับเพิ่มเพียง 1 ครั้ง ดังนั้นหากให้คำตอบที่ได้จากเครื่องจักรคือ $R$ เราจะได้ว่า

$$
\begin{align}
\text{COUNT}_B(m, R) &= \left\lceil \frac{R}2 \right\rceil \\
\text{COUNT}_A(m, R) &= m - \text{COUNT}_B(m, R)
\end{align}
$$

เทคนิคนี้ทำให้เราสามารถนับชนิดเห็ดจำนวนมากได้โดยไม่ต้องถามเครื่องจักรหลายครั้ง เช่น แม้ในกรณีที่ $n = 20,000$ แต่หากในจำนวนนั้นเรารู้เห็ดชนิดเดียวกันเป็นจำนวน $m=100$ อยู่ก่อนแล้ว เราสามารถใช้เครื่องจักรเพียงอีกแค่ $\frac{n-m}m = 199$ ครั้งเท่านั้น ก็จะนับจำนวนเห็ดแยกตามชนิดได้จนหมดครบทุกดอก

อย่างไรก็ตาม เรายังสามารถทำได้ดีกว่านั้นขึ้นไปอีก สังเกตว่าเห็ดดอกที่ $x_1$ นั้นถูกนับอย่างแปลกประหลาดไม่เหมือนเพื่อน ซึ่งก็คือหากคำตอบ $R$ เป็นเลขคู่ นั่นหมายความว่า $x_1$ ต้องเป็นเห็ดชนิด $A$ อย่างแน่นอน ดังนั้นหากในครั้งก่อนเราโชคดีเจอเห็ดชนิด $A$ ครั้งถัดไปเราก็จะสามารถจัดถาดด้วยเห็ดที่ไม่รู้ชนิดได้มากขึ้นเป็น $m+1$ ดอก และยิ่งเราเจอเห็ดชนิด $A$ มากขึ้นเรื่อยๆ เท่าไหร่ เราก็จะยิ่งใช้เครื่องจักรได้อย่างมีประสิทธิภาพมากขึ้นเท่านั้น

แล้วเราจะโชคร้ายได้แค่ไหนกัน? หากเราไม่เจอเห็ดชนิด $A$ เลย ถึงจุดหนึ่งเห็ดชนิด $B$ จะมีจำนวนมากกว่าเห็ดชนิด $A$ เราก็จะสลับไปใช้เห็ดชนิด $B$ เป็นหลักในการสับหว่างถามเครื่องจักรแทนนั่นเอง พิจารณากรณีเริ่มต้นที่เรามีเห็ดชนิด $A$ กับ $B$ อยู่อย่างละประมาณ $m$ ดอกพอกัน หากใช้เทคนิคในแนวเดียวกับ[การวิเคราะห์แบบถัวเฉลี่ย (amortized analysis)][amortized analysis] จะเห็นว่าเมื่อใช้เครื่องจักรไปเรื่อยๆ ขอบเขตล่างของเห็ดกองที่ใหญ่กว่าจะมีเห็ดเพิ่มขึ้นมาหนึ่งดอกต่อการใช้เครื่องจักรสองครั้ง นั่นหมายความว่าอย่างแย่ที่สุดแล้ว เราจะถามเครื่องจักรด้วยจำนวนครั้งที่น้อยลงเหลือประมาณ

$$
\begin{align}
n - 2m &= \overbrace{m + m + (m+1) + (m+1) + (m+2) + (m+2) + \dots + (m+q-1)}^\text{for simplicity, suppose we use the machine $2q$ times} \\
  &= 2 \left( m + (m+1) + (m+2) + \dots + (m+q-1) \right) \\
  &= 2 \left( qm + 1+2+\dots+(q-1) \right) \\
  &= 2 \left( qm + \frac{(q-1)q}2 \right) \\
  &= 2qm + (q-1)q \\
0 &= q^2 + (2m-1)q - (2m-n) \\
2q &= 1 - 2m \pm \sqrt{4m^2 -12m + 4n + 1} \\
\end{align}
$$

ซึ่งก็คือ ที่ $n=20,000$ และ $m=100$ จะได้ว่าต้องถามเครื่องจักรอย่างมากที่สุด $2q \approx 145.7$ ครั้งเท่านั้น

คำถามตอนนี้จะเหลือเพียงแค่ว่า ก่อนที่จะใช้ขั้นตอนวิธีที่เล่ามาเพื่อนับเห็ดแยกชนิดในระยะที่สอง เราควรทำอย่างไรเพื่อหาเห็ดชนิดเดียวกันมาให้ได้ $m$ ดอกในระยะที่หนึ่ง หากเราใช้วิธีพื้นฐานที่สุด (10 คะแนน) ที่ค่อยๆ ถามเห็ดที่ยังไม่รู้ชนิดครั้งละดอก จะเห็นว่าเราต้องถามอย่างมากสุด $2m-1$ ครั้งถึงจะมั่นใจได้ว่าได้เห็ดชนิดใดชนิดหนึ่งอย่างน้อย $m$ ดอก เมื่อนำขั้นตอนย่อยในระยะที่หนึ่งกับระยะที่สองมารวมกันก็จะได้ขั้นตอนวิธีสำหรับนับเห็ดทั้งหมด อย่างไรก็ตามเราจะพบว่าขั้นตอนวิธีนี้ยังมีประสิทธิภาพไม่ดีพอ เพราะด้วยกรณีที่ผ่านมาเราอาจยังต้องถามมากถึง $199 + 146 = 345$ ครั้ง หรือคิดออกมาเป็นคะแนนได้ $100 \times 226 / 345 \approx 77$ คะแนน


## เก็บงานให้เรียบร้อยมุ่งสู่คะแนนเต็ม

จากหัวข้อที่ผ่านมา จะเห็นว่าการหาเห็ดชนิดเดียวกันให้ได้ $m$ ดอกในระยะที่หนึ่งนั้นยังมีประสิทธิภาพไม่ดีนัก เราจะปรับปรุงส่วนนี้ด้วยการใช้เครื่องจักรเพียง 1 ครั้งแล้วพยายามบอกชนิดของเห็ดให้ได้ 2.5 ดอกโดยเฉลี่ย

เนื่องจากเริ่มต้นมาเรารู้ชนิดเห็ดที่แน่ชัดอยู่เพียงแค่ดอกเดียว ดังนั้นการถามครั้งแรกๆ คงเลี่ยงไม่ได้ที่ต้องถามเห็ดครั้งละหนึ่งดอก (จัดถาดเห็ดอยู่ในรูป $x_1A$) เราจะใช้เทคนิค**ถามหนึ่งรู้หนึ่ง**ไม่เกิน 2 ครั้ง เพื่อรับประกันว่าจะมีเห็ดชนิดใดชนิดหนึ่งจำนวน 2 ดอก

เมื่อมีเห็ดชนิดเดียวกัน 2 ดอกแล้ว (ต่อไปนี้เพื่อความสะดวกจะสมมติให้เห็ดชนิดที่มีมากกว่าเป็นชนิด $A$ ไปเลย) เราจะจัดถาดเห็ดถามในรูป $x_1A\,x_2A$ ซึ่งก็คือถามครั้งเดียวระบุชนิดเห็ดได้ถึงสองดอก เพราะคำตอบในเลขฐานสองของการถามเช่นนี้จะสามารถบอกได้ทันทีว่าเห็ดดอกใดเป็นชนิดไหน ซึ่งก็คือ

1. บิตที่ 0 ของคำตอบเป็น 0 เมื่อและก็ต่อเมื่อ $x_1$ เป็นเห็ดชนิด $A$
2. บิตที่ 1 ของคำตอบเป็น 0 เมื่อและก็ต่อเมื่อ $x_2$ เป็นเห็ดชนิด $A$

เราจะใช้เทคนิค**ถามสองรู้สอง**อีกเพียงไม่เกิน 2 ครั้ง ก็จะได้เห็ดชนิด $A$ มาอย่างน้อย 3 ดอก

หลังจากนั้นเราจะจัดถาดด้วยเห็ดที่ไม่รู้ชนิดครั้งละสามดอกเช่นนี้ $x_1A\,x_2A\,x_3A$ จากเทคนิคที่เคยเห็นผ่านมาแล้ว เราคงบอกได้ไม่ยากว่า $x_1$ คือเห็ดชนิด $A$ หรือไม่ อย่างไรก็ตามสำหรับ $x_2$ และ $x_3$ นั้น เราพบว่า

1. หากคำตอบเป็น 0 หรือ 1 นั่นคือ $x_2$ และ $x_3$ เป็นเห็ดชนิด $A$ ทั้งคู่
2. หากคำตอบเป็น 4 หรือ 5 นั่นคือ $x_2$ และ $x_3$ เป็นเห็ดชนิด $B$ ทั้งคู่
3. หากคำตอบเป็น 2 หรือ 3 จะบอกได้แค่ว่า $x_2$ กับ $x_3$ เป็นเห็ดชนิดต่างกัน

เทคนิคดังกล่าวคือการ**ถามสามอาจรู้หนึ่งหรือสาม** หากมันล้มเหลวโดยระบุชนิดเห็ดได้เพียงดอกเดียว อย่างน้อยเราจะรู้ว่าเห็ดอีกสองดอกต้องไม่เป็นชนิดเดียวกัน ถึงตอนนี้เราจะจัดการกับความกำกวมนี้โดยใช้เห็ดชนิด $B$ เข้ามาช่วย ซึ่งแบ่งได้เป็น 2 กรณี คือ

กรณีแรกเมื่อเรามีเห็ดชนิด $B$ อยู่น้อยกว่า 2 ดอก เราจะใช้เทคนิคแบบเดียวกับ**ถามสองรู้สอง**เลย เพียงแต่เปลี่ยนไปจัดถาดเห็ดด้วย $x_3A\,x_4A$ นอกจากนี้อย่าลืมว่าชนิดของเห็ด $x_3$ ที่หาได้ก็จะบ่งบอกย้อนไปถึงชนิดของเห็ด $x_2$ ด้วย เราจะเรียกเทคนิคนี้ว่า**แก้กำกวมถามสองรู้สาม**

ส่วนอีกกรณีเราจะจัดถาดเห็ด $B\,x_2BA\,x_3A\,x_4A\,x_5$ เพื่อถามเครื่องจักร เมื่อนำคำตอบที่ได้ไปลบหนึ่ง (เพราะมีการเปลี่ยนแปลงแน่ๆ จากคู่เห็ดที่เราตั้งใจใส่เข้าไปหนึ่งครั้ง) คำตอบใหม่จะมีค่าได้ตั้งแต่ 0 ถึง 7 พิจารณาคำตอบใหม่นี้ในเลขฐานสองจะพบว่า

1. บิตที่ 2 ของคำตอบใหม่เป็น 0 เมื่อและก็ต่อเมื่อ $x_3$ เป็นเห็ดชนิด $A$
2. บิตที่ 1 ของคำตอบใหม่เป็น 0 เมื่อและก็ต่อเมื่อ $x_4$ เป็นเห็ดชนิด $A$
3. บิตที่ 0 ของคำตอบใหม่เป็น 0 เมื่อและก็ต่อเมื่อ $x_5$ เป็นเห็ดชนิด $A$

เรียกกระบวนการนี้ว่า**แก้กำกวมถามสี่รู้สี่** (และเช่นเคย ชนิดเห็ดของ $x_3$ จะบ่งบอกชนิดเห็ด $x_2$) ดังนั้นในภาพรวม เราจะใช้เทคนิค**ถามสามอาจรู้หนึ่งหรือสาม**ไปเรื่อยๆ แล้วสลับไปเลือกใช้เทคนิค**แก้กำกวมถามสองรู้สาม**หรือ**แก้กำกวมถามสี่รู้สี่** จนกระทั่งเราได้เห็ดชนิด $A$ มาอย่างน้อย $m$ ดอก

แล้วเราจะต้องใช้เครื่องจักรในระยะที่หนึ่งด้วยเทคนิคเหล่าไปเป็นจำนวนเท่าไหร่? สมมติว่าเราสนใจ $m$ ขนาดใหญ่ๆ เราอาจตัดการ**ถามหนึ่งรู้หนึ่ง**และ**ถามสองรู้สอง**ที่จะเกิดขึ้นเพียงไม่กี่ครั้งออกจากการวิเคราะห์ไปเลย หลังจากนั้นเราจะ**ถามสามอาจรู้หนึ่งหรือสาม**เป็นส่วนใหญ่ ซึ่งอาจให้ประสิทธิภาพแย่ได้หากต้องแก้กำกวมเป็นจำนวนมาก แต่เนื่องจากการ**แก้กำกวมถามสองรู้สาม**เกิดขึ้นได้อย่างมากที่สุดเพียง 2 ครั้ง เราอาจตัดมันออกจากการวิเคราะห์ได้ด้วยเช่นกัน เหลือเพียงแค่การ**แก้กำกวมถามสี่รู้สี่** ดังนั้นด้วยคู่ของการ**ถามสามอาจรู้หนึ่งหรือสาม**และ**แก้กำกวมถามสี่รู้สี่**จะระบุชนิดเห็ดได้ 5 ดอกต่อการถาม 2 ครั้ง และเนื่องจากเราอาจต้องระบุชนิดเห็ดมากถึง $2m$ ดอก ดังนั้นเราจะต้องถามประมาณ $2m/2.5 = 0.8m$ ครั้งนั่นเอง

ให้ $Q_n(m)$ เป็นจำนวนครั้งทั้งหมดที่ต้องถามเครื่องจักร ก็จะได้ว่า

$$
\begin{align}
Q_n(m) &= 0.8m + 1 - 2m \pm \sqrt{4m^2 -12m + 4n + 1} \\
Q'_n(m) &= \frac{4m-6}{\sqrt{4m^2 - 12m + 4n + 1}} - \frac65
\end{align}
$$

แก้อนุพันธ์ $Q'_n(m) = 0$ เพื่อหาค่า $m$ ที่เหมาะสมที่สุด จะได้

$$
m = \frac34\left( 2 \pm \sqrt{n-2} \right)
$$

นั่นก็คือ ในกรณีที่ $n=20,000$ เราควรหาเห็ดชนิดเดียวกันในระยะที่หนึ่งไว้ประมาณ $m \approx 107.6$ ดอก แล้วหลังจากนั้นจึงแค่นับชนิดเห็ดที่สนใจพร้อมค่อยๆ ขยายปริมาณเห็ดที่รู้ชนิดในระยะที่สอง ซึ่งทั้งหมดนี้จะทำให้เครื่องจักรถูกเรียกใช้รวมไม่เกิน $Q_n(108) \approx 225.5$ ครั้ง


## โค้ด

``` c++
#include "mushrooms.h"
#include <bits/stdc++.h>
using namespace std;

bool swapped = false;
bool conflict = false;
int i = 1;
int just_count_A = 0;
int just_count_B = 0;
vector<int> A = { 0 };
vector<int> B = { };

int calc_pivots_size(int n) {
    return 1.5 + (3*sqrt(n-2)/4);
}

void make_swap() {
    swapped = not swapped;
    swap(just_count_A, just_count_B);
    swap(A, B);
}

bool decide_swap() {
    if (A.size() < B.size()) {
        make_swap();
    }
    return true;
}

int handle_parity(int parity) {
    (parity == 0 ? A : B).push_back(i);
    return 1;
}

int handle_pair(int raw_info) {
    int flag2b = raw_info >> 1;
    if (flag2b & 0b01) {
        conflict = true;
        return 0;
    }
    (flag2b & 0b10 ? B : A).push_back(i);
    (flag2b & 0b10 ? B : A).push_back(i+1);
    return 2;
}

int handle_conflict_slow(int flag2b) {
    (flag2b & 0b01 ? A : B).push_back(i);
    (flag2b & 0b01 ? B : A).push_back(i+1);
    (flag2b & 0b10 ? B : A).push_back(i+2);
    conflict = false;
    return 3;
}

int handle_conflict_fast(int raw_info) {
    int flag3b = raw_info - 1;
    (flag3b & 0b100 ? A : B).push_back(i);
    (flag3b & 0b100 ? B : A).push_back(i+1);
    (flag3b & 0b010 ? B : A).push_back(i+2);
    (flag3b & 0b001 ? B : A).push_back(i+3);
    conflict = false;
    return 4;
}

void get_pivots(int n) {
    int info;
    int size = calc_pivots_size(n);
    while (decide_swap() and (int)A.size() < size and i+4 < n) {
        if (not conflict) {
            switch (A.size()) {
                case 1:
                    i += handle_parity(use_machine({ i, A[0] }));
                    break;
                case 2:
                    info = use_machine({ i, A[0], i+1, A[1] });
                    i += handle_parity(info%2);
                    i += handle_parity(info/2);
                    break;
                default:
                    info = use_machine({ i, A[0], i+1, A[1], i+2, A[2] });
                    i += handle_parity(info%2);
                    i += handle_pair(info);
            }
        } else if (B.size() < 2) {
            info = use_machine({ i+1, A[0], i+2, A[1] });
            i += handle_conflict_slow(info);
        } else {
            info = use_machine({ B[0], i, B[1], A[0], i+1, A[1], i+2, A[2], i+3 });
            i += handle_conflict_fast(info);
        }
    }
}

vector<int> make_sample(int size) {
    vector<int> sample = { };
    for (int j=0; j<size; j++) {
        sample.insert(sample.end(), { i+j, A[j] });
    }
    return sample;
}

void count_the_rest(int n) {
    while (decide_swap() and i < n) {
        int test_size = min((int)A.size(), n-i);
        int info = use_machine(make_sample(test_size));
        i += handle_parity(info%2);
        i += test_size-1;
        just_count_A += (test_size-1) - (info/2);
        just_count_B += info/2;
    }
}

int count_mushrooms(int n) {
    get_pivots(n);
    count_the_rest(n);
    if (swapped) {
        make_swap();
    }
    return A.size() + just_count_A;
}
```



[interactive problem]: //www.geeksforgeeks.org/interactive-problems-in-competitive-programming/
[problem statement]: //ioi2020.sg/ioi-2020-tasks/
[amortized analysis]: //en.wikipedia.org/wiki/Amortized_analysis
