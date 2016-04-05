---
title: ทำไมผมเกลียด JavaScript
tags:
  - JavaScript
  - Programming
  - Joke
date: 2013-08-05 09:58:00 +0700
---

ลองเปิด JavaScript Console ของ browser แล้วป้อนคำสั่งเหล่านี้ลงไปดูครับ ...

{% highlight javascript %}
console> [] + []
""
console> [] + {}
"[object Object]"
console> {} + []
0
console> {} + {}
NaN
{% endhighlight %}

จาก [@garybernhardt][]

ก่อนหน้านี้เคยคิดว่าการเปรียบ `==` ประหลาดพอแล้วนะ (ยังดีที่มี `===` ช่วยชีวิต) แต่พอเจอแบบนี้ก็ทำเอาเสียหลักเลยทีเดียว

1. ด้วยเหตุผลที่ JavaScript ทำงานกับ HTML ซึ่งเป็น markup language ที่เน้นการแสดงผลด้วย string เป็นหลัก การเอา array (หรือ type อื่นใดที่ไม่ใช่ตัวเลข) บวกกับอะไรซักอย่าง จะได้ผลลัพท์เป็น string ทันที (คล้ายๆ กับที่ C ที่มองทุกอย่างเป็น pointer arithmetic) พอเอา array ว่างๆ มาบวกกันเลยได้ string ว่าง
2. ในทำนองเดียวกัน เมื่อเปลี่ยนเอา array ไปบวกกับ `{}` (ถือว่าเป็น object ใน JavaScript) ก็ทำให้ได้ผลลัพท์เป็น string ที่บอกว่านี่คือ object นั่นเอง
3. อย่างไรก็ตาม `{}` มีความหมายได้อีกอย่างคือ block (ที่ไม่ยอมทำหน้าที่เป็น variable scope ไปด้วยเหมือนภาษา C) ทำให้บรรทัดนี้มีค่าเทียบเท่ากับการเขียนเพียง `+[]` เครื่องหมายบวกเลยทำหน้าที่ทางคณิตศาสตร์อย่างเต็มที่ และมันเปลี่ยน array ว่างให้กลายเป็นค่า 0
4. ส่วน object อื่นใดที่ไม่ใช่ array, string ว่าง จะมีค่าเป็น [not a number][NaN]
 เมื่อเอามาดำเนินการทางคณิตศาสตร์ครับ

เฮ้อ จะเขียน JavaScript แต่ละทีมันเหนื่อย (ใจ) จริงๆ


[@garybernhardt]: https://www.destroyallsoftware.com/talks/wat
[NaN]: http://en.wikipedia.org/wiki/NaN
