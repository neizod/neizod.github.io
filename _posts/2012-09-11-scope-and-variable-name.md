---
title: Scope และชื่อตัวแปร
tags:
  - JavaScript
  - Programming
  - Python
  - Haskell
date: 2012-09-11 12:54:00 +0700
---

JavaScript เป็นตัวอย่างที่ดี (หรือแย่?) ในเรื่อง scope ลองดู

``` javascript
function starline(n) {
    stars = ''
    for (i=0; i<n; i++)
        stars += '*'
    return stars + '\n'
}

function square(n) {
    shape = ''
    for (i=0; i<n; i++)
        shape += starline(n)
    return shape
}

console.log(square(5))
```

ความคาดหวังของเราคือรูปสี่เหลี่ยมจตุรัสที่สร้างจากดาวขนาด $5\times5$ แต่ถ้าลองรันโปรแกรมนี้ดู จะเห็นผลลัพท์เป็นรูปดาวที่มีแค่แถวเดียว นั่นเป็นเพราะว่า `i` ของ `square` กับ `i` ของ `starline` มันคือตัวเดียวกัน ทำให้หลังจากทำงานที่ `starline` เสร็จแล้ว `i` ที่ `square` ก็จะกลายเป็น 5 ไปด้วย ส่งผลให้หลุดออกจาก loop ทันที

ทางแก้สำหรับ JavaScript นี้ก็ไม่ยาก แค่เพิ่ม `var` ไว้หน้า `i` เพื่อประกาศว่าเป็นตัวแปรใน scope นี้ก็พอ (อันที่จริงก็ควรจะประกาศตัวแปรทุกตัวที่จะใช้) เพียงเท่านี้ ตัวแปรหนึ่งๆ ก็จะไม่หลุดออกไปนอก scope ที่มันอยู่แล้ว

...แต่คำถามก็คือ มันมีความจำเป็นจริงๆ หรือ ที่เราต้องไล่ประกาศตัวแปรแต่ละตัวในแต่ละ scope เพียงเพื่อไม่ให้มันหลุดไปยัง scope ที่ใหญ่กว่า

ลองดูตัวอย่างแบบเดียวกันใน Python บ้าง

``` python
def starline(n):
    stars = ''
    for i in range(n):
        stars += '*'
    return stars + '\n'

def square(n):
    shape = ''
    for i in range(n):
        shape += starline(n)
    return shape

print(square(5))
```

ความสามารถในการละการประกาศตัวแปรของแต่ละ scope คงไม่ช่วยเรื่อง readability มากเท่าใดนัก แต่มันช่วยให้เขียนโปรแกรมด้วยความกังวลน้อยลง โฟกัสกับเรื่องของ logic มากขึ้น แถมยังไม่ต้องเจอกับ bug ประหลาดอย่างด้านบนนั้นอีก ... อันที่จริง เราสามารถทำอย่างนี้ได้ด้วยซ้ำ

``` python
def square(n):
    shape = ''
    for i in range(n):
        for i in range(n):
            shape += '*'
        shape += '\n'
    return shape

print(square(5))
```

พอลองย้อนกลับไปดูดีๆ บางทีเราก็ไม่จำเป็นต้องเรียกตัวแปรบางตัวมาใช้เสมอไป (แค่ประกาศมันไว้เป็น loop index) แล้วงั้นทำไมไม่ทำให้ตัวแปรนั้นไม่มีชื่อไปซะเลยหละ?

``` haskell
square :: Integer -> String
square n = unlines [['*' | _ <- [1..n]] | _ <- [1..n]]

main = do putStrLn $ square 5
```

maintenance ง่ายขึ้นเป็นกองเลย (หรือเปล่า? 555)
