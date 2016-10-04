---
title: "CoffeeScript มหัศจรรย์: ลูกศรเปลี่ยน Scope"
tags:
  - JavaScript
  - Programming
  - CoffeeScript
  - jQuery
date: 2013-09-10 14:55:00 +0700
---

JavaScript เป็นภาษา functional ที่คนมักเข้าใจผิดว่ามันเป็น OOP (ด้วยตัว syntax ที่หน้าตาคล้าย C/Java เสียเหลือเกิน) ด้วยความเข้าใจผิดและไม่มี syntax ประกาศ class โดยตรง ทำให้ framework หลายๆ เจ้าพยายาม define syntax นี้กันเอง ตัวอย่างเช่นใน CoffeeScript

``` coffeescript
class Dog
    constructor: (@name, @owner) ->
        me = $('<button>').addClass('dog').append(@name).click(@bark)
        $('#animals').append(me)

    bark: ->
        alert(@name + ': Bark bark. I love you, ' + @owner + '. Bark!')

bone = new Dog('Bonnie', 'Alice')
```

ดูดีและเหมือนภาษา OOP ทั่วไปเลยทีเดียว นอกจากนี้เมื่อทดสอบบน console จะเห็นว่า `bone.bark()` แสดงผลลัพท์ที่ถูกต้อง ไม่น่ามีปัญหาอะไร

อย่างไรก็ตาม ด้วยความเป็น dynamic scope ทำให้ฟังก์ชัน `bark` ไปใช้ scope จาก jQuery แทน ถ้ากดปุ่มจะเห็นว่าคราวนี้มี undefined ในข้อความ (เพราะ `me` ที่เป็น jQuery object ไม่มี attribute `owner`)

วิธีแก้แบบ JavaScript จะคล้ายๆ Python คือสร้าง `self` ที่ชี้กลับมาหาตัวเราจริงๆ แล้วให้ `this` เป็นแบบ dynamic ตามปรกติ

``` coffeescript
class Dog
    constructor: (@name, @owner) ->
        self = this
        me = $('<button>').addClass('dog').append(@name).click -> self.bark()
        $('#animals').append(me)

    bark: ->
        alert(@name + ': Bark bark. I love you, ' + @owner + '. Bark!')
```

ส่วน CoffeeScript มีท่าง่ายกว่านั้น แค่ใช้ fat arrow ก็พอ

``` coffeescript
class Dog
    constructor: (@name, @owner) ->
        me = $('<button>').addClass('dog').append(@name).click(@bark)
        $('#animals').append(me)

    bark: =>
        alert(@name + ': Bark bark. I love you, ' + @owner + '. Bark!')
```

ว่าแล้วก็แอบเห็นด้วยกับทวีตนี้ :P

<blockquote class="twitter-tweet"><a href="https://twitter.com/neizod">@neizod</a> <a href="https://twitter.com/plynoi">@plynoi</a> น่าจะชื่อ arrowscript
— v038 (@vi038) <a href="https://twitter.com/vi038/statuses/376763260386566144">September 8, 2013</a></blockquote>
