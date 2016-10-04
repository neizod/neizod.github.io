---
title: ทำ Debian Package ขึ้น Launchpad PPA
tags:
  - Software Development
  - Linux
  - Debian
  - Ubuntu
date: 2013-10-27 08:23:00 +0700
---

การทำ software package นั้นก็เปรียบเสมือนพ่อค้าคนกลาง หลักการทั่วๆ ไปคือ

1. สืบเสาะว่าในตลาด (package source) ตอนนี้ สินค้าชนิดไหนที่ลูกค้า (user) ต้องการแต่ยังไม่มี (หรือมีแต่ก็ยังไม่ดีพอ)
2. ตระเวณหาผู้ผลิตสินค้า (upstream) ชนิดนั้นๆ เจรจาต่อรองราคาซื้อสินค้า (app) มาตุนไว้
3. ปรับแต่งสินค้า (config) ให้เหมาะกับลูกค้า แล้วบรรจุหีบห่อ (packaging) ส่งขายหน้าร้านของตัวเอง (PPA)

หน้าที่ของคนออก software package จึงไม่ใช่การเขียน code สำหรับ software ตัวนั้นๆ ซักเท่าไหร่ แต่เป็นการ config และทดสอบ dependency ให้ทำงานได้บนระบบนั้นซะมากกว่า

อย่างไรก็ตาม บางครั้ง software ที่ต้องการทำ package ก็ไม่มี upstream เพราะอาจจะผูกติดกับ platform นั้นๆ (native package) อย่างเช่น theme หรือโปรแกรมเฉพาะสำหรับ platform

บังเอิญว่าอยากทำ theme package พอดี แต่ tutorial ที่เจอดันสอนแต่แบบที่ต้องพึ่ง upstream (และเน้นหนักด้าน config) แถมยังเอา bzr มาปนซะเยอะ (แน่นอนว่าผมพยายามใช้แต่ git ถ้าเป็นไปได้) สุดท้ายเลยไล่โหลด code ชาวบ้านมาดูถึงทำเป็น

วิธีการทำ native package สำหรับ Debian โดยคร่าวๆ ก็คือ

``` shell
mkdir proj-package/proj-0.9.0
cd proj-package/proj-0.9.0
dh_make --native
```

หมายเหตุว่าตอนนี้จำเป็นที่จะต้องห้อยเลข version ไว้ที่ชื่อ directory ด้วย ส่วน `proj-package` จะมีหรือไม่มีก็ได้ แต่พอเราทำ package แล้วไฟล์ต่างๆ จะมาอยู่ทำระดับเดียวกันกับ `proj-0.9.0` ดังนั้นถ้าไม่อยากให้ไฟล์อื่นๆ ปนกันมั่วก็สร้างไว้ด้วย

พอสั่งคำสั่งสุดท้ายเสร็จก็ตอบคำถามอีก 1-2 ข้อ จะมี directory ชื่อ `debian` โผล่มา ถึงตอนนี้ถ้าอยากแก้ `proj-0.9.0` เอา version ออกให้เหลือแค่ `proj` หรือกระทั่งเปลี่ยนเป็นชื่อใดๆ ก็ทำได้เลย

เรียบร้อยแล้วเข้าไปแก้ไฟล์ต่างๆ ใน `debian` ดังนี้

- ลบทุกไฟล์ที่ลงท้ายด้วย `.ex`, `.EX`
- ลบไฟล์ที่เกี่ยวกับ `README` และ directory `source`
- แก้ไฟล์ `copyright` เพิ่มชื่อเจ้าของผลงานการทำ package ลงไป
- แก้ไฟล์ `control` เพิ่มรายละเอียด อันนี้ยากหน่อย แนะนำให้ดูตัวอย่าง package ที่คล้ายๆ กันแล้วลอกมา

แก้เสร็จแล้วลอง build package ดู โดยกลับไปอยู่ที่ระดับเดียวกับ directory `debian` แล้วสั่ง

``` shell
debuild -us -uc
```

จะได้ไฟล์ `proj_0.9.0.deb` (Debian installer ที่สามารถ double click เพื่อติดตั้งได้) ที่ระดับ directory `proj-0.9.0` (กลับออกไป 1 ระดับ)

แต่ว่า package ตอนนี้มันยังเป็น package เปล่าๆ ไม่มีอะไร ถ้าต้องการระบุว่า package นี้จะติดตั้งไฟล์ไปที่ใดบ้าง ก็เอาไฟล์นั้นๆ ไปไว้ในระดับเดียวกันกับ `debian` เช่น

``` shell
proj-0.9.0
├── bin
│   ├── goodbye.sh      # install => /usr/bin/goodbye.sh
│   └── hello.sh        # install => /usr/bin/hello.sh
├── conf
│   └── greeting.conf   # install => /etc/greeting.conf
└── debian
```

แล้วก็เขียนไฟล์ `debian/install` เช่นนี้

``` shell
bin/* /usr/bin/
conf/* /etc/
```

หมายเหตุว่าไฟล์พวกนี้จะไปทับไฟล์ของ package อื่นๆ ไม่ได้ (ต้องเพิ่ม Conflict/Replace ใน `debian/control` -- จะยังไม่พูดถึงตอนนี้) อันที่จริง มันไม่ควรจะไปทับไฟล์ใดเลย เพราะตอน remove ไฟล์พวกนี้จะหายไปอัตโนมัติ ไม่ใช่ revert กลับไปเป็นของเดิม

ส่วน action ต่างๆ ที่จะทำตอนก่อนหรือหลังการ install / remove (เช่น install เสร็จแล้วก็ auto config เล็กน้อย) ก็เขียนเป็น shell script ใส่ `preinst`, `postinst`, `prerm`, `postrm` ไว้ใน directory `debian` นั่นแหละ

เมื่อ test build ที่เครื่อง local จนมั่นใจแล้ว ก็แก้ไฟล์ `debian/changelog` เปลี่ยน `unstable` เป็น codename ของระบบที่ใช้อยู่ (ดูได้ที่ `/etc/lsb-release`) และแก้ข้อมูลอื่นๆ ตามสมควร

เรียบร้อยแล้วกลับมาอยู่ที่ระดับเดียวกับ `proj-0.9.0` แล้วสั่ง

``` shell
>tar -zcvf proj_0.9.0.orig.tar.gz proj-0.9.0/

cd proj-0.9.0
debuild -S -k$PGPKey

cd ..
dput ppa:user/repo proj_0.9.0_source.changes
```

เพื่ออัพ package นี้ขึ้น PPA ที่ Launcpad ต่อไป (รอมัน build ประมาณครึ่งชั่วโมง)

ทีนี้ ถ้าเพื่อนเราที่ใช้ Debian/Ubuntu รุ่นที่เรา build package ตัวนี้ไว้ อยากจะ install package นี้ ก็บอกเพื่อนว่าทำแค่

``` shell
add-apt-repository ppa:user/repo
apt-get update
apt-get install proj
```

เท่ปะล่า :P
