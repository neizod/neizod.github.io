---
title: Word Count Goal
tags:
  - Writing
  - Markdown
  - Application
date: 2018-12-22 23:04:17 +0700
---

ซักครึ่งเดือนก่อนอาจารย์ [@jittat][] เอาแอพแนว [Ulysses][] (แต่อยู่บน Android) มาให้ดู พร้อมบรรยายสรรพคุณต่างๆ นานาของมันว่าช่วยให้เขียนงานได้ไหลลื่นขึ้นมาอย่างมากมายเลยนะ ทั้งส่วนของการจดบันทึกไอเดียเล็กน้อยๆ ที่แล่นผ่านเข้ามาในชีวิตแต่ละวัน การเขียนที่เน้นเขียนจริงๆ โดยไม่ต้องกังวลเรื่องจัดย่อหน้า และการติดตามเป้าหมายว่าแต่ละวันเขียนไปได้ถึงไหนแล้วบ้าง โดยทั้งหมดนี้แอพจะคอยซิงค์ข้อมูลระหว่างคอมพิวเตอร์และมือถือให้เอง

สองข้อแรกนี่ไม่ยาก และตอนนี้เราเองก็มี workflow เพื่อจัดการมันอยู่แล้ว คือจดไอเดีย (หรือแม้กระทั่งทั้งบทความ) ลง [Google Keep][] เพื่อซิงค์ข้ามเครื่องไปเขียนต่อยอด/แก้ไขขัดเกลาได้ง่ายๆ ทุกที่ทุกเวลา แล้วพอเนื้อหาหลักเส้นสิ้นพร้อมเผยแพร่ก็มาจัดย่อหน้าด้วย Markdown ผ่านโปรแกรม [Typora][self typora] อีกที

ส่วนที่ยังไม่เคยมีก็คือการติดตามเป้าหมายการเขียนเนี่ยแหละ ซึ่งเอาจริงๆ แล้วมันน่าจะยากมาก ถ้าทำงานหลายคนก็คงต้องพึ่งบ.ก.มาคอยตรวจดูเรื่อยๆ ว่างานเขียนเป็นยังไง ไปถึงไหน ยังไม่ออกทะเลใช่มั้ย แต่ที่ผ่านมานี่เขียนเป็นงานอดิเรกคนเดียวมาตลอดไง เลยไม่รู้ไม่เคยสนใจจะวัดเป้าหมายการเขียนซักที[^1]

ซึ่งแอพ Ulysses ก็ไม่ได้เสนอวิธีติดตามเป้าหมายเชิงคุณภาพเหมือนกัน (ซึ่งก็โอเค ถ้าแอพมันสามารถวัดตรงนี้ได้ด้วย AI ก็คงถึงเวลาที่เราจะตกงานกันหมด) เพียงแค่วัดเป้าหมายเชิงปริมาณด้วยมาตราที่เราคุ้นเคยกันดีที่สุดเมื่อพูดถึงงานเขียน นั่นก็คือการนับจำนวนคำนั่นเอง

มองดู workflow ของตัวเองที่มีอยู่แล้วเทียบกับราคาที่ต้องจ่ายถ้าอยากใช้แอพ ก็คิดได้ว่าเขียนแค่ส่วนติดตามเป้าหมายมาใช้เองน่าจะดีกว่า 😂

ตัดทอนรายละเอียดโค้ดและเทคนิคเบื้องหลังทิ้งไปทั้งหมด ผ่านไปครึ่งวันก็ได้โปรแกรม [wc_goal][] และผลลัพธ์นี้ออกมา

```
year |   wc   |              hist             
---- | ------ | ------------------------------
2007 |  20006 | █████████████████
2008 |   5775 | █████
2009 |  12185 | ██████████
2010 |  12148 | ██████████
2011 |   6815 | ██████
2012 |  17806 | ███████████████
2013 |  11822 | ██████████
2014 |  13296 | ███████████
2015 |  11417 | ██████████
2016 |  22176 | ███████████████████
2017 |   8864 | ████████
2018 |  35201 | ██████████████████████████████
```

น่าเสียดายที่ยังไม่มีส่วนที่ติดตามผลโดยตรง แต่ใช้วิธีแสดงประวัติเป็นรอบสัปดาห์/เดือน/ปีเอาว่าที่ผ่านมาเขียนไปแล้วกี่คำ ... ก็น่าจะพอถูไถไปได้แหละน่า อย่างน้อยก็ได้เห็นว่ามีปีที่หล่นหาย[^2] แล้วก็มีปีที่บ้าพลัง[^3] สลับกันไปเป็นช่วงๆ ตามแต่เวลาว่างที่พอจะเจียดมาได้ในช่วงชีวิตนั้นๆ

เอาจริงๆ อยากปรับปรุงโค้ดให้มากกว่านี้ เช่น ทำให้มันติดตามเป้าหมายได้จริงๆ รองรับไฟล์ที่หลากหลายกว่า Markdown หรือติดตามบทความใดๆ บนเว็บได้ด้วยไม่ใช่แค่ไฟล์ในเครื่อง ... แต่เหนื่อยละ แล้วนี่ก็ไม่ใช่เป้าหมายหลักด้วย งั้นก็ทำแค่เท่าที่ต้องทำก็แล้วกัน พร้อมหวังว่าจะมีใครใจดีมาช่วยพัฒนาต่อ 😜


[^1]: อย่างดีสุดที่เคยทำ ก็คือตั้งเป้าไว้ว่าจะเขียนอย่างน้อยเดือนละบทความ ... ซึ่งพอลองบังคับตัวเองให้ทำตามก็พบว่ายากมาก จนบางเดือนนี่ถึงขั้นเขียนแค่ไม่ถึงร้อยคำเพื่อกันบล็อกเงียบเหงา 😅
[^2]: ทั้งนี้ทั้งนั้น ยังไม่นับรวมบทความบนเว็บอื่นๆ เช่น Blognone
[^3]: ซึ่งก็ยังเทียบไม่ได้เลยกับการเขียนหนังสือทั้งเล่มที่มีจำนวนคำประมาณห้าหมื่นถึงหนึ่งแสนคำ


[self typora]: /2017/07/31/typora.html

[@jittat]: //twitter.com/jittat

[wc_goal]: //github.com/neizod/wc_goal
[Ulysses]: //ulysses.app/
[Google Keep]: //www.google.com/keep/
