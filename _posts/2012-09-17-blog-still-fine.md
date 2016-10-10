---
title: ยังไหว...
tags:
  - Programming
  - Shit
date: 2012-09-17 15:54:00 +0700
---

วันก่อนเจอคำถามงี่เง่าว่า $1000^{1000}$ กับ $101^{999}$ อันไหนมากกว่ากัน?  แล้วก็บอกว่าห้ามใช้ sense ด้วยนะ

ห้ามใช้ sense ก็กดเครื่องคิดเลขไปสิโว้ย

{: .figure}
> ![](/images/power-versus.jpg)
>
> คนตั้งคำถามคงคิดไม่ถึงเนาะ ว่าเครื่องคิดเลขบ้าอะไรจะหาคำตอบของเลขใหญ่ๆ ขนาดนั้นได้

เลยลองเขียนอะไรเล่นๆ เพื่อทดสอบประสิทธิภาพทางการคำนวณตัวเลขดู พบว่าตัวเลขระดับหมื่นหลักก็ยังไหว

{: .figure}
> ![](/images/large-fib.jpg)
>
> Fibonacci ลำดับที่ 57075 เมื่อเขียนในฐานสิบจะต้องใช้ตัวอักษร 11928 ตัว

อันที่จริง ด้วย algorithm dynamic programming ง่ายๆ เช่นด้านบนนี้ จะเอาไปใช้คำนวณหา Fibonacci ลำดับที่ห้าล้าน ซึ่งถ้าจะเขียนออกมาในเลขฐานสิบ ต้องใช้ตัวอักษรถึง 1044939 ตัวก็ยังไหวนะ (ภายในเวลาประมาณครึ่งนาทีเอง)

ก็อย่าประเมินประสิทธิภาพของคอมพิวเตอร์ต่ำไปละกัน ;)