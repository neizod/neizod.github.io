---
title: Bit Flag
tags:
  - Programming
  - PHP
  - C++
  - Python
date: 2013-04-07 15:41:00 +0700
---

ในภาษาสมัยใหม่ เราคงคุ้นเคยกับการเขียนฟังก์ชั่น (และเรียกใช้) แบบนี้

``` python
def foo(n, m, a=False, b=False, c=False):
    if a:
        n += 42
    if b:
        n *= 7
    if c:
        n **= 2
    return n % m

...

foo(5, 99)
foo(5, 99, a=True)
foo(5, 99, c=True)
foo(5, 99, c=True, b=True, a=True)
```

โชคร้ายที่ระบบ keyword argument ไม่ได้เป็นแบบนี้ทุกภาษา อย่างเช่นใน PHP ถ้าจะเปิดตัว flag c เพียงตัวเดียว ก็ยังคงต้องบอกว่า a, b ถูกปิดอยู่ด้วย (ต้องบอกสถานะของ flag ทุกตัวที่อยู่ก่อนหน้า c)

ทางออกง่ายๆ แต่ทำให้ syntax ดูรุงรังหน่อยคือการให้ argument ส่วนที่เป็น flag ใช้ datatype แบบ hash table เช่นนี้


``` php
<?php

function foo($n, $m, $options=array()) {
    if (array_key_exists('a', $options) && $options['a'])
        $n += 42;
    if (array_key_exists('b', $options) && $options['b'])
        $n *= 7;
    if (array_key_exists('c', $options) && $options['c'])
        $n *= $n;
    return $n % $m;
}

...

foo(5, 99);
foo(5, 99, array('a' => true));
foo(5, 99, array('c' => true));
foo(5, 99, array('c' => true, 'b' => true, 'a' => true));
```

ทางออกที่คลาสสิก (แต่ปวดหัว) กว่าคือการใช้ bit flag แบบนี้

``` c++
const int A = 0x01;
const int B = 0x02;
const int C = 0x04;

int foo(int n, int m, int options) {
    if (options & A)
        n += 42;
    if (options & B)
        n *= 7;
    if (options & C)
        n *= n;
    return n % m;
}

...

foo(5, 99, 0);
foo(5, 99, A);
foo(5, 99, C);
foo(5, 99, C|B|A);
```

หลายคนอาจบอกว่าการใช้ bit flag นั้นมีข้อดีเหนือกว่า keyword argument ตรงที่สามารถ store สถานะของ flag เก็บไว้ใน data ตัวหนึ่ง (เพื่อที่จะนำไปใช้ซ้ำในที่อื่น) ซึ่งข้อได้เปรียบนี้ไม่เป็นความจริงเลยสำหรับภาษาที่แตก array, hash table ลงไปเป็น argument ได้

``` python
args = [5, 99]
flags = {'b': True, 'c': True}

foo(*args, **flags) == foo(5, 99, b=True, c=True)
```

ก็เลือกใช้ความสามารถเหล่านี้ตามความสะดวกของแต่ละภาษานะครับ อย่าไปฝืนมันมากถ้าตัวภาษามันไม่ได้ออกแบบให้ทำเรื่องยากๆ บางเรื่องไว้แต่แรก
