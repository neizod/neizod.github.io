---
title: เล่นกับ Twitter & App Engine
tags:
  - Programming
  - Diary
  - Twitter
  - Python
date: 2012-01-04 17:25:00 +0700
---

หลายวันก่อนไปกิน Sizzler กับ [@CrystalWingHero][] มา ก็เล่าให้ฟังว่าทำโปรเจคจบกับ [@nemopear][] ในหัวข้อที่จะย่อ twitter ให้สั้นลง (ได้อีก) ฟังแล้วก็น่าสนใจดีครับ scope ค่อนข้างใหญ่มาก คือข้อความที่ถูกส่งเข้าไปในระบบจะถูก encode ด้วยวิธีต่างๆ ตามที่ผู้ใช้เลือก (ย่อแบบธรรมดา, ย่อแบบเกรียน, ฯลฯ) แล้วก็ยิงเข้าไปโพสต์บน twitter สำหรับตัวโปรแกรมนั้นจะเรียกผ่าน API ที่สร้างจาก Google App Engine อีกทอดหนึ่ง แน่นอนว่าโปรเจคเมพๆ อย่างนี้ มีอาจารย์ [@pruet][] เป็นที่ปรึกษาครับ :D

ด้วยความสงสัยของผม เลยหยิบเอา [tweepy][] มาดัดแปลงเล่นนิดหน่อย ผลที่ได้ออกมาก็เป็นอย่างนี้ครับ

<blockquote class="twitter-tweet"><p>hll wrld</p>&mdash; Nattawut Phetmak (@neizod) <a href="https://twitter.com/#!/neizod/status/154457081032880128">January 4, 2012</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

เนื่องจากเสียเวลางมผิดจุดไปเยอะมาก (เยอะเกินไป อ่าน [dev.twitter.com][] ทำไมก็ไม่รู้ อ่าน [stackoverflow][] คงทำเสร็จด้วยเวลาน้อยกว่ากันครึ่งๆ) แถมยังเป็นโปรเจคที่ทำขำๆ จากการหยิบยืมไอเดียเพื่อนมาทดลองเล่นช่วงปีใหม่ว่างๆ อีก ตอนนี้ก็เลยมีแต่ client อย่างเดียวไม่มี API บน App Engine และไม่พัฒนาต่อแล้วครับ (ส่วน code หาดูได้ที่ [shrtntwt][] เลยครับ)

อ๋อ สุดท้ายนี้ก็สวัสดีปีใหม่ครับ :)


[@CrystalWingHero]: //twitter.com/CrystalWingHero
[@nemopear]: //twitter.com/nemopear
[@pruet]: //twitter.com/pruet

[tweepy]: //github.com/tweepy/tweepy
[dev.twitter.com]: //dev.twitter.com/dd
[stackoverflow]: //stackoverflow.com/
[shrtntwt]: //github.com/neizod/shrtntwt
