---
title: Kick @neizod
source: //github.com/neizod/kick
demo: //neizod.github.io/kick
date: 2013-12-14
display_date: Dec 2013
---

สืบเนื่องมาจากใน twitter มีแต่คน [#ถีบเนยสด][] บวกกับช่วงนั้นกำลังติดเกมแนวพิมพ์สัมผัส ก็เลยได้ไอเดียออกมาเป็นเกมนี้เลย เย่

เกมเขียนด้วย CoffeeScript ครับ ส่วนหนึ่งก็เพราะว่าไม่ถนัดเครื่องมืออื่นเลยที่สร้างงานด้าน GUI ได้นอกจากเว็บ (อีกส่วนก็เพราะว่าเกลียด JavaScript ... เอ้ย) แถมมีข้อจำกัดที่ว่าไม่มี server ของตัวเอง เลยต้องทำทั้งหมดเป็น client side ซึ่งก็โชคดีที่ GitHub Pages มันรองรับการ CoffeeScript ด้วย

---

ด้านวิชวลดีไซน์นั้น ... ตอนนั้นเบลอๆ ละจับแพะชนแกะไปหมด 555 จำได้แค่ว่าไม่ค่อยชอบเกมพิมพ์สัมผัสบางเกมที่เลื่อนคำเข้ามาจากซ้ายไปขวา (เช่น เกม typespeed บน Linux command line) เลยเปลี่ยนทิศทางให้เลื่อนคำจากขวาไปซ้ายแทน แล้วก็ถ้าคำยังไม่พื้นหน้าจอไปหมดทั้งคำ ก็ยังพิมพ์คำนั้นได้อยู่

    Kick neizod!^beta                       120 fps
     _____________________________________________       _
    |                                             |      ^
    |                                 <= moving wo|      |
    |                                             |      3
    |             <= moving word =<               |      0
    |                                             |      0
    |ing word =<                                  |      p
    |_____________________________________________|      x
                                           _______       _
    [pa] [er]    << inventory words >>    |       |      ^
    [lvl    ]                             | |\_/| |      1
    [health ]                             | (^w^) |      8
    [score  ]                             |_______|      0

    plyr info                             boss info
    |<-180->|<----------- 640px --------->|<-180->|
    |<------------------ 1000px ----------------->|

แต่เพราะว่าหน้าจอคอมพิวเตอร์ปัจจุบันใหญ่ขึ้นมากแล้ว จะโชว์แค่ส่วนที่คำเลื่อนๆ เลยก็เปลืองพื้นที่ เลยเพิ่มส่วนของ info เข้าไป 2 ฝั่ง ฝั่งแรกเป็น player info ก็มีพวกเลเวล, ชีวิต, คะแนน พร้อมปุ่มกดหยุดเกม, ลบตัวอักษร ส่วนฝั่งขวามีแต่รูป avatar เรา ซึ่งถือว่าเป็น boss ของเกมนี้ โดย boss จะทำหน้าเปลี่ยนไปเรื่อยๆ ตามเลเวลของผู้เล่น

---

ส่วนที่ยากที่สุดจริงๆ คงเป็นดีไซน์การให้คะแนน ก็ไม่ค่อยอยากให้คะแนนแบบ 1 ตัวอักษร = 1 คะแนนเท่าไหร่ เพราะด่านหลังๆ ที่ตัวอักษรเลื่อนเร็วขึ้นก็น่าจะได้คะแนนมากขึ้นด้วย เลยแบ่งความยากเป็นเลเวลๆ ไป แล้วก็เอาคะแนนฐานของแต่ละคำ (1 ตัวอักษร = 1 คะแนน) ไปคูณเลเวลด้วย ...

ซึ่งก็ยังคิดว่า คิดคะแนนแบบนี้ยังดูง่ายไป (555) เลยเพิ่มความซับซ้อนเข้าไปอีกโดยปล่อยให้ผู้เล่นพิมพ์คำศัพท์ไปได้เรื่อยๆ ยังไม่คิดคะแนนทันที แต่เมื่อมีจำนวนคำศัพท์เก็บไว้ได้จนพอใจแล้ว ก็พิมพ์คำสั่งสุดท้ายให้คิดคะแนน (ซึ่งก็คือชื่อเราเอง) แล้วคำศัพท์ที่พิมพ์ได้แต่ละคำ จะถูกคูณคะแนนตามเลเวลลดหลั่นลงไปเรื่อยๆ ซึ่งสามารถอธิบายด้วยแผนภาพนี้

    level       = 3
    typed words = [ charge , jab , punch , stap , kick , @neizod ]
    base score  = [    5   ,  3  ,   5   ,   4  ,   4  ,     -   ]
    multiplier  = [    3   ,  2  ,   1   ,   1  ,   1  ,     -   ]
    total score =     15   +  6  +   5   +   4  +   4  =    34

และส่วนที่เจ๋งที่สุดคือตอนทำอธิบายวิธีเล่น ตอนแรกก็คิดว่าจับภาพหน้าจอตอนเล่นๆ เองแล้วมาเขียนอธิบายเลยก็พอ ซึ่งพอทำไปได้หน่อยๆ แล้วรู้สึกเหนื่อยแฮะ มาคิดอีกที เอ่อ เราก็มีเอนจิ้นเกมแล้วนี่หว่า ทำไมไม่เขียนอธิบายวิธีเล่น on-top กับเอนจิ้นเกมไปเลยนะ? สุดท้ายเลยได้ how to play เจ๋งๆ แบบนั้นครับ

ป.ล. ใครจะเอาไปอ้างอิงอะไร พึงระลึกไว้ว่านี่เป็นการเขียนเกมครั้งแรกของผมนะ :p


[#ถีบเนยสด]: //twitter.com/search?q=%23ถีบเนยสด
