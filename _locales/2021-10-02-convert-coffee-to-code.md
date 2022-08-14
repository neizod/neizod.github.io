---
title: Coffee → Code
tags:
  - Brainfuck
date: 2021-10-02 21:39:44 +0700
---

Hacktoberfest วนกลับมาอีกทั้งที ก็ได้เวลาเขียนโปรแกรมเพื่อค้ำจุนโลก opensource อีกซักครั้ง ขอประเดิมปีนี้ด้วย repo สำหรับโค้ดสนุกๆ จาก [@narze][] ที่แค่ให้[แปลงคำว่า Coffee ไปเป็นคำว่า Code][coffee to code repo] ซึ่งก็ดูไม่ได้เกินจริงซักเท่าไหร่สำหรับโปรแกรมเมอร์อย่างเราๆ 😂

แต่จะทำยังไงให้มัน*สนุก*หละ? คิดว่าถ้าใช้ภาษา mainstream ที่ใช้ในชีวิตประจำวันมาเป็นสิบปีอยู่แล้ว (อย่าง Python, C++) มันก็คงไม่สนุกสำหรับเราอีกต่อไป เลยนึกย้อนไปถึงช่วงที่ Google Code Jam ยอมให้เขียนโค้ดภาษาใดก็ได้ ก็จำได้ว่าติดใจ Brainfuck เหลือเกิน (ถึงแม้จะ[เคยใช้แค่ครั้งเดียว][self code jam brainfuck]ก็เถอะ) 5555555 เพราะงั้นเอามันมาเขียนอีกรอบดีกว่า

```
PART 1 INIT THE WORD COFFEE
===========================
++++ ++++ ++++ ++++     work with hexadecimal
[                       this loop will init 6 chars closest to coffee
  > ++++                add 2 plus in this line to lower 1st char
  > ++++ +++            or delete 2 plus onward to upper all chars
  > ++++ ++
  > ++++ ++
  > ++++ ++
  > ++++ ++
<<<< << - ]             condition to exit the dowhile loop
> +++                   adjust @ to c
> -                     adjust p to o
> ++++ ++               you
> ++++ ++               get
> ++++ +                the
> ++++ +                idea
[<]                     reset head
>[.>]<[<]               print the initial word / this line can be omitted


PART 2 CONVERT COFFEE TO CODE
=============================
>                       skip the c
>                       skip the o
> --                    change 1st f to d
> [-]                   remove 2nd f
> [-]                   remove 1st e
> [-<<+>>]              move 2nd e to the back of previous d
<<[<]                   reset head
>[.>]<[<]               print the final word after conversion
```

ไปลองไล่การทำงานของมันได้ที่ [fatiheriki.github.io/brainfuck-visualizer][visualize brainfuck] ได้เลย


[self code jam brainfuck]: /2016/04/10/code-jam-2016-qualification.html

[@narze]: //twitter.com/narze

[coffee to code repo]: //github.com/narze/coffee-to-code/
[visualize brainfuck]:  //fatiherikli.github.io/brainfuck-visualizer/#KysrKyArKysrICsrKysgKysrKwpbCiAgPiArKysrCiAgPiArKysrICsrKwogID4gKysrKyArKwogID4gKysrKyArKwogID4gKysrKyArKwogID4gKysrKyArKwo8PDw8IDw8IC0gXQo+ICsrKwo+IC0KPiArKysrICsrCj4gKysrKyArKwo+ICsrKysgKwo+ICsrKysgKwpbPF0KPlsuPl08WzxdCgoKPgo+Cj4gLS0KPiBbLV0KPiBbLV0KPiBbLTw8Kz4+XQo8PFs8XQo+Wy4+XTxbPF0=

