---
title: เขียน Loop ยังไงดี?
tags:
  - Programming
  - PHP
  - Python
date: 2012-08-20 00:40:00 +0700
---

ในการเขียนโปรแกรม เรามักต้องพบปะกับท่านี้เสมอๆ

``` python
text = input()
while text != 'exit':
    # do something with text
    # ...
    text = input()
```

ดูเผินๆ ก็ไม่น่ามีปัญหาอะไร แต่นี่จะทำให้โปรแกรมเมอร์สำคัญผิดกับ input ครั้งแรก หรือไม่งั้นก็มองโค้ดผ่านๆ แล้วนึกว่า input ด้านนอกนั้นจะไม่เกี่ยวกับกิจกรรมที่เกิดขึ้นใน while loop ที่ตามมาเลย (ยิ่งถ้าต้องมีการ pre-process input ก่อนที่จะเอาไป check while อีก) ทางแก้ง่ายๆ คือเปลี่ยนไปเขียนแบบนี้แทน

``` python
while True:
    text = input()
    if text == 'exit':
        break
    # do something with text
    # ...
```

---

อีกเรื่องที่ไม่ค่อยเกี่ยวกันเท่าไหร่คือ การรับข้อมูลจาก database มาแสดงผล ส่วนใหญ่จะทำท่านี้

``` php
<?php

$result = mysql_query($sql);
while ($row = mysql_fetch_row($result)) {
    echo $row[0], $row[1], $row[2];
}
```

ในทางปฎิบัติมันก็ใช้ได้เลย แต่ถ้ามาคิดๆ ดูแล้ว ข้อมูลที่ query ออกมาจาก database ได้นั้นควรจะมีจำนวนจำกัดเสมอ (ไม่มี database ไหนที่เก็บข้อมูลได้เป็น infinity เป็นแน่??) นั่นหมายความว่าทางทฤษฎีแล้ว มันไม่ควรเขียนด้วย while loop แต่ควรเขียนด้วย for loop (อาจเป็น for-each loop) เช่นนี้

``` php
<?php

// codeigniter active record
$query = $this->db->get($sql);
foreach ($query->result() as $row) {
    echo $row->title, $row->author, $row->content;
}
```

ท่านี้จะทำให้มีปัญหาด้าน memory (เพราะต้อง query ข้อมูลทั้งหมดออกมาเก็บไว้ใน array ก่อน แล้วจึงค่อยวนเข้าไปอ่านข้อมูลใน array นั้น) ซึ่งแก้ได้ที่ระดับ library โดยเปลี่ยนไปใช้ generator แทน array

---

ท้ายสุด กลับไปที่ while loop แบบแรก โดยมีเงื่อนไขเพิ่มเติมตรงที่อยากรู้ว่าเป็นการทำงานรอบที่เท่าไหร่ อาจเขียนเพิ่มเป็น

``` php
i = 0
while True:
    text = input()
    if text == 'exit':
        break
    # do something with text
    # ...
    print('loop no:', i, '; input is:', text)
    i += 1
```

จะเห็นว่ามี `i = 0` เป็น initial statement อยู่นอก scope ของ while ตรงนี้จริงๆ ไม่มีปัญหาอะไรเลย แต่ถ้าอยากให้มันสวยขึ้นด้วยการจัดระเบียบ block สามารถใช้ประโยชน์ของ infinity generator ได้

``` python
from itertools import count

for i in count():
    text = input()
    if text == 'exit':
        break
    # do something with text
    # ...
    print('loop no:', i, '; input is:', text)
```

หรือยิ่งไปกว่านั้น ทำการเปลี่ยนรูปแบบการเขียนเพื่อให้ไม่ต้องตรวจสอบสำหรับ break ออกจาก loop แต่ไปตรวจตั้งแต่หัว loop เลยว่าหลุดออกจาก loop นี้หรือยัง อย่างนี้

``` python
from itertools import count

for i, text in zip(count(), iter(input, 'exit')):
    # do something with text
    # ...
    print('loop no:', i, '; input is:', text)
```

แนวคิดจะเปลี่ยนไปนิดนึงด้วย ตรงที่เราไม่ได้ใช้ while loop แล้ว (loop แต่ละครั้งไม่เชื่อมโยงกัน) เปลี่ยนมาเป็น for loop (แต่ละครั้งมีความเกี่ยวเนื่องกัน อย่างน้อยๆ ก็ index ที่ไล่กันไปเรื่อยๆ) นั่นเอง ซึ่งส่วนตัวแล้วผมชอบอย่างหลังมากกว่า
