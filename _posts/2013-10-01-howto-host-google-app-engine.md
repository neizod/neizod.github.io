---
title: ฝากหน้าเว็บขำๆ กับ Google App Engine
tags:
  - Programming
  - App Engine
  - Google
date: 2013-10-01 17:40:00 +0700
---

ช่วงนี้เล่น JavaScript / CoffeeScript / CSS บ่อย พอโปรแกรมเริ่มซับซ้อนขึ้น ครั้นจะแสดงตัวอย่างด้วย code เพียวๆ ให้นั่งนึกตามคงไม่ไหว เลยต้องหาที่ฝากไฟล์แบบแสดงเป็นหน้าเว็บซักหน่อย จะได้ demo เจ้าตัว mock up นี้อย่างสะดวกราบรื่น ไม่ต้องเปิดเครื่องตัวเองโชว์หรือให้คนอื่นเข้ามาทาง ip address

ทางออกที่สวยงามที่สุดสำหรับผมคือ Google App Engine ครับ เพราะนอกจากจะได้ URL ที่สั้นและสะอาดแล้ว ยังสามารถพัฒนา controller เบื้องหลังต่ออย่างเนียนๆ ในอนาคตได้อีก

วิธีการก็ไม่ยุ่งยากครับ โหลด [App Engine SDK][]) (ผมใช้แบบ command line) มาพร้อม[สร้าง application ใหม่][new app] เรียบร้อยแล้วไปยัง directory ที่เก็บ file เว็บของเรา (`.html`, `.css`, `.js`, `.jpg` ฯลฯ) สร้าง directory ใหม่ชื่อว่า `static` แล้วย้าย file ทุกอันไปไว้ใน directory ใหม่นี้ ถ้าทำถูกต้องโครงสร้าง directory
จะออกมาประมาณนี้ครับ

    .
    └── static
        ├── beautiful.css
        ├── img/
        ├── index.html
        ├── jquery.min.js
        └── logic.js

หลังจากนั้น สร้างไฟล์ `app.yaml` แล้วเขียนข้อมูลดังนี้

``` yaml
application: application-name
version: 0-alpha
api_version: 1

runtime: php
threadsafe: true

handlers:
- url: /
  static_files: static/index.html
  upload: static/
- url: /(.*)
  static_files: static/\1
  upload: static/(.*)
```

อย่าลืมเปลี่ยนบรรทัดแรกให้เป็นชื่อ application ตามที่สมัครไว้กับ App Engine ด้วยนะครับ

ถึงตอนนี้ ถ้าใช้ command line เพียงสั่ง `appcfg.py update .` ก็เรียบร้อย ส่วน GUI ให้สั่ง import application เพื่อเลือก directory นี้เข้ามา แล้วกด deploy ครับ

---

อย่างไรก็ตาม วิธีนี้ฝากได้แต่ไฟล์ static เท่านั้น ถ้าเป็นไฟล์ script ที่ทำงานฝั่ง server (เช่น `.php`) มันจะไม่แปลเป็น `.html` ให้ครับ ระวังว่าจะเผลออัพไฟล์ source code ที่มีข้อมูลที่ไม่อยากให้ใครเห็นนะครับ

ถ้าอยากให้ server แปล `.php` ก็เอาไฟล์ `.php` ทั้งหลายออกจาก directory static มาไว้ที่ directory หลัก แล้วเพิ่ม `handlers` นี้ไว้ก่อนอันสุดท้ายครับ

``` yaml
- url: /(.*)\.php
  script: \1.php
```

ทั้งนี้ database ของ App Engine นั้นไม่ใช่ MySQL นะครับ ถ้าจะติดต่อ database ด้วยอาจต้องศึกษาเพิ่มนิดหน่อยแล้วหละ ;)

ก็น่าจะเป็นทางเลือกที่น่าสนใจไม่น้อย ตั้งแต่คนที่แค่มองหา host ขำๆ ไว้ฝากหน้าเว็บส่งงาน mock up ไม่กี่ครั้ง ไปจนถึงเหล่าผู้พัฒนา prototype ทั้งหลายที่อาจต้องขยาย project ในอนาคตเลย


[App Engine SDK]: //developers.google.com/appengine/
[new app]: //appengine.google.com/
