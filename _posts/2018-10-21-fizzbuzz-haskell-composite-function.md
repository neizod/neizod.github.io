---
title: FizzBuzz และฟังก์ชันประกอบใน Haskell
tags:
  - Haskell
  - Functional
  - Programming
  - Mathematics
  - Computer Science
  - Programming Interview Question
date: 2018-10-21 03:29:38 +0700
---

FizzBuzz น่าจะเป็นโจทย์ที่ถูกนำมาใช้ฝึกทดสอบการเขียนโปรแกรมขั้นพื้นฐาน (รู้จักแค่[วากยสัมพันธ์][syntax]และการแก้ปัญหาง่ายๆ โดยยังไม่เจาะลึกไปที่อัลกอริทึม) กันมากที่สุดโจทย์หนึ่ง ซึ่งถามเพียงแค่ว่าตัวเลขที่เห็นจะถูกแปลงเป็นคำว่าอะไร? โดยมีกฎว่าถ้าเลขนั้นหารสามลงตัวตอบ Fizz ถ้าหารห้าลงตัวตอบ Buzz ถ้าหารลงตัวพร้อมกันทั้งคู่ตอบ FizzBuzz หรือถ้าไม่เข้ากฎข้างต้นเลยก็ตอบตัวเลขเดิมกลับคืนมา

{: .oversized}
> | **number** | 1 | 2 | 3    | 4 | 5    | 6    | 7 | ... | 14 | 15       | 16 | ... |
> | **answer** | 1 | 2 | Fizz | 4 | Buzz | Fizz | 7 | ... | 14 | FizzBuzz | 16 | ... |

เราสามารถแก้โจทย์ด้วยคำสั่งแนว ถ้า-แล้ว ได้ง่ายๆ เช่นนี้

``` haskell
fizzBuzz number
  | mod number 15 == 0 = "FizzBuzz"
  | mod number  3 == 0 = "Fizz"
  | mod number  5 == 0 = "Buzz"
  | otherwise          = show number
```

ได้แค่นี้ก็น่าจะพอใจกับผลลัพธ์แล้ว ... จนกระทั้งความอยากรู้เข้ามาเคาะประตู เพราะดันนึกออกว่าภาษา Haskell สามารถทำ[ฟังก์ชันประกอบ (composite function)][composite function] แบบคณิตศาสตร์ได้ด้วย ก็เลยอยากเห็นว่า FizzBuzz แบบไม่ใช้ตัวแปรมันจะเขียนออกมาหน้าตาแบบไหน?

---

นั่งๆ เดินๆ คิดไปซักพักก็ตระหนักได้ว่า ฟังก์ชันประกอบเนี่ย จริงๆ มันก็คือการส่งต่อผลลัพธ์ระหว่างฟังก์ชันไปเรื่อยๆ ซึ่งจะทำให้เราสูญเสียข้อมูลของตัวแปร `number` ตอนแรกสุดไป (ไม่ใช่สิ่งที่เราต้องการ) ทางแก้คือต้องหาทางปั๊มตัวแปร `number` ออกมาหลายๆ ชุด คำนวณตัวแปรแต่ละชุดด้วยวิธีแตกต่างกัน แล้วค่อยรวมผลลัพธ์ทั้งหมดเข้ามาเป็นคำตอบ ...

ซึ่งมันก็คือ map-reduce นั่นเอง! เพียงแต่ตอน map เราทำกลับข้างจากปรกติ คือ map ข้อมูลชุดเดียวไปบนลิสต์ของฟังก์ชันที่แตกต่างกันแทน

ดังนั้นโค้ดที่คาดว่าจะได้ ก็ควรมีหน้าตาประมาณนี้

``` haskell
fizzBuzz number = reduce f0 (map (`id` number) [f1, f2, f3, ...])
```

แต่เนื่องจากเราอยากได้ผลลัพธ์เป็นฟังก์ชันประกอบ ดังนั้นต้องพยายามดึงตัวแปร `number` ออกไปไว้ด้านขวาสุดของการประกาศฟังก์ชันให้ได้ ซึ่งก็ทำได้ด้วยการ `flip` เช่นนี้

``` haskell
fizzBuzz number = reduce f0 (flip map [f1, f2, f3, ...] (`id` number))
```

เมื่อตัวแปรที่ต้องการอยู่ขวาสุดแล้ว ก็เรียบเรียงวงเล็บใหม่ด้วยการใช้ฟังก์ชันประกอบเข้ามาช่วย โดยจัดให้ตัวแปรที่ต้องการกำจัดออกมาอยู่ชั้นนอกสุด (ไม่ติดวงเล็บ)

``` haskell
fizzBuzz number = reduce f0 . flip map [f1, f2, f3, ...] . flip id $ number
```

ถึงตอนนี้ก็สามารถตัดตัวแปร `number` ทิ้งได้ทั้งสองข้างของสมการ

``` haskell
fizzBuzz = reduce f0 . flip map [f1, f2, f3, ...] . flip id
```

---

ถ้ามองอนาคตไปไกลๆ จะพบว่าเทคนิคตอน map กลับด้านเป็นอะไรที่ได้ใช้บ่อยมาก และมันก็คงจะสวยกว่าถ้าสามารถเขียนเป็นฟังก์ชันประกอบได้เช่นกัน นั่นหมายความว่าเราอาจเปลี่ยนส่วนหลังของสมการข้างต้น

``` haskell
distribute fs = flip map fs . flip id
```

ให้กลายเป็น

``` haskell
distribute = flip (.) (flip id) . flip map
```

---

ถึงตอนนี้ก็ได้เวลามาออกแบบการ reduce และฟังก์ชันอื่นๆ ที่เกี่ยวข้อง ซึ่งหนึ่งในทางเลือกที่เป็นไปได้อาจมีหน้าตาประมาณนี้

``` haskell
f1 :: Int -> String -- output Fizz, Buzz, or FizzBuzz; according to rules.
                    -- otherwise output empty string.
f2 :: Int -> String -- output the number in string (acted as default case).
f0 :: [String] -> String -- output first non-empty string, in other word:
                         -- output f1 if it has some value, otherwise f2.
fizzBuzz = reduce f0 . distribute [f1, f2]
```

ส่วนที่ซับซ้อนที่สุดคงหนีไม่พ้นฟังก์ชัน `f1` ซึ่งเราจะเริ่มพิจารณาจากโจทย์เวอร์ชันง่ายที่ตรวจแค่การหาร 3 ลงตัวเพียงอย่างเดียว (ตอบแค่ Fizz) ฟังก์ชันหนึ่งที่เป็นไปได้ก็คือ

``` haskell
f1 n = (["Fizz",""] !!) $ fromEnum $ not $ (== 0) $ (mod n 3)
```

แต่โจทย์จริงเราต้องรองรับกรณีเลข 5 ด้วย ... [การปั๊มโค้ด][copy-paste engineering] `f1` ออกมาอีกชุดแล้วแก้ค่าแค่บางตัวแปรคงไม่ใช่ทางเลือกที่ดีนัก ดังนั้นเราจะทำเช่นนี้แทน

``` haskell
say word m n = ([word,""] !!) $ fromEnum $ not $ (== 0) $ (mod n m)
f1 = foldr1 (++) . distribute [say "Fizz" 3, say "Buzz" 5]
```

สังเกตว่าที่ท้ายฟังก์ชัน `say` มีการใช้ฟังก์ชัน `mod` ซึ่งรับ 2 ตัวแปร แต่การทำฟังก์ชันประกอบนั้นทุกฟังก์ชันจะต้องเป็นแบบตัวแปรเดียว ... ตรงนี้สามารถใช้ `curry` มาช่วยยุบตัวแปรรวมกันได้ (แล้วค่อย `uncurry` ให้กลับมาเป็น 2 ตัวแปรเหมือนเดิม)

``` haskell
index = fromEnum . not . (== 0)
say word = curry (([word,""] !!) . index . uncurry (flip mod))
```

เช่นเดิม เราใช้เทคนิค `flip` จากตอนต้นของบล็อกนี้เพื่อกำจัดตัวแปร `word`

``` haskell
say = curry . flip (.) (index . uncurry (flip mod)) . (!!) . (:[""])
```

---

มาถึงจุดนี้ก็ไม่เหลืออะไรยากแล้ว เพราะ `reduce f0` นั้นทำได้โดย `head . dropWhile null` ส่วน `f2` ก็คือฟังก์ชัน `show` ตรงๆ นั่นเอง

ดังนั้น โค้ดสุดท้ายที่ไม่ง้อการใช้ตัวแปรเมื่อประกาศฟังก์ชันเลย คือ

``` haskell
distribute :: [a -> b] -> a -> [b]
distribute = flip (.) (flip id) . flip map

index :: Int -> Int
index = fromEnum . not . (== 0)

say :: String -> Int -> Int -> String
say = curry . flip (.) (index . uncurry (flip mod)) . (!!) . (:[""])

rules :: Int -> String
rules = foldr1 (++) . distribute [say "Fizz" 3, say "Buzz" 5]

fizzBuzz :: Int -> String
fizzBuzz = head . dropWhile null . distribute [rules, show]
```

อึม ... ทำไปทำไมเนี่ย 😂

ป.ล. ถ้าอยากได้กฎใหม่ๆ ก็แค่เพิ่มลิสต์ `rules` เช่น เมื่อใส่ `say "Up" 7` คำตอบบางตัวจะเปลี่ยนเป็น

{: .oversized}
> | **number** | 7  | 21     | 35     | 105        |
> | **answer** | Up | FizzUp | BuzzUp | FizzBuzzUp |


[composite function]: /2012/08/17/function-composition-in-programming.html

[syntax]: //en.wikipedia.org/wiki/Syntax
[copy-paste engineering]: //en.wikipedia.org/wiki/Copy_and_paste_programming
