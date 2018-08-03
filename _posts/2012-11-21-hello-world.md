---
title: สวัสดีโลก!
tags:
  - Programming
date: 2012-11-21 18:15:00 +0700
---

สืบเนื่องจากวันนี้เป็นวัน [World Hello Day][] ที่แนะนำให้ออกไปทักทายกับคนอื่นๆ อย่างน้อย 10 คน ...  พอดีเห็นชื่อกิจกรรมมันสวยดี เลยอยาก say hello บ้าง

เริ่มดัวยทักทายกับ C

``` c
#include <stdio.h>

int main(void) {
    printf("Hello, world!\n");
    return 0;
}
```

จะเห็นว่า C เป็นภาษาที่มี boilerplate เยอะพอสมควร แต่ก็น่าจะแพ้ภาษาถัดมาอย่าง Java

``` java
public class IJustWannaSayHelloWhyINeedToNameThis {
    public static void main(String[] args) {
        System.out.println("Hello, world!");
    }
}
```

ส่วน C++ นั้นจะต่างออกไป ตรงที่มองข้อความที่จะพิมพ์ในรูปของ stream

``` c++

#include <iostream>
using namespace std;

int main() {
    cout << "Hello, world!" << endl;
    return 0;
}
```

ย้ายมาดูฝั่งภาษาขั้นสูง ซึ่งเป็นที่นิยมสำหรับคนทำ web อย่าง PHP บ้าง

``` php
<?='Hello, world!'?>
```

สั้นดี แต่ถ้าไม่รู้จักกันมาก่อนนี่คงงงไปพักใหญ่ เทียบไม่ได้กับ Python ที่เน้นเรื่อง readability สุดๆ

``` python
print 'Hello, world!'
```

ลองมาดูภาษาที่หลายคนคงมึนใน syntax อย่าง Common LISP

``` common-lisp
(write-line "Hello, world!")
```

นอกจากจะจัดวงเล็บประหลาดแล้ว ชื่อฟังก์ชันยังประหลาดกว่าชาวบ้านเค้าด้วย ... แต่นี่ก็คงไม่ประหลาดเท่าแนวคิดที่ว่า ตัวแปรไม่สามารถเปลี่ยนค่าได้ใน Haskell

``` haskell
main = do
    putStrLn "Hello, wolrd!"
```

อันที่จริง ภาษาขั้นสูงก็ควรจะช่วยโปรแกรมเมอร์ให้ทำงานได้ง่ายขึ้นอยู่แล้ว เพราะถ้าเจอแบบ Brainfuck เข้าไปคงมึน

```
++++++++++ [>+++++++>++++++++++>+++>+<<<<-]
    >++.>+.+++++++..+++.>++.
    <<+++++++++++++++.>.+++.------.--------.>+.>.
```

แต่ถ้า obfuscate แล้วสวยงามอย่างนี้ก็ยอมนะ

{: .figure}
> ![](/images/program/misc/piet-hello-world.png)
>
> จาก [Piet Program Gallery][]

สวัสดีกันมาตั้ง 9 ครั้งแล้ว ครั้งที่เหลือก็ลองออกไปค้นหาสิ่งใหม่ๆ ดูบ้างนะฮะ


[World Hello Day]: //www.everyday-readers.com/blog/on-the-day/21-nov-world-hello-day/
[Piet Program Gallery]: //www.dangermouse.net/esoteric/piet/samples.html
