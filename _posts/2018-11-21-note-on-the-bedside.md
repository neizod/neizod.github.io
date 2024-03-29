---
title: เขียนไว้ข้างเตียง
tags:
  - Music Video
  - Cryptography
  - Experimental
  - Rant
date: 2018-11-21 00:52:39 +0700
---

จำได้ว่าชอบเวอร์ชันนันทิดา แก้วบัวสายมากๆ (น่าจะเพราะแม่เปิดฟังบ่อยๆ) คิดว่าเพลงมันเข้าขั้นอมตะไปแล้ว ก็ไม่คิดว่าจะมีใครหยิบมารีเมค

<iframe width="853" height="480" src="https://www.youtube.com/embed/EfVLmAsay1g" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

จนไม่กี่วันก่อนก็เห็นว่า PARADOX เอาเพลงนี้มาตีความใหม่ โดยใส่ความเป็นร็อกตามสไตล์ที่ถนัดเข้าไป ก็ถือว่าโอเคนะ ไม่ทำทับแนวเดิมที่ตั้งมาตรฐานไว้สูง แถมยังดึงดูดคนรุ่นใหม่ให้มาสนใจเพลงนี้ได้อีกด้วย

ดู MV แว๊บแรกแล้วยอมรับเลยว่าโคตรตื่นเต้น เฮ้ย เพลงแม่งใส่รหัส 0-1 มาให้หวะ น่าจะมีเรื่องราวมีการผูกปมอะไรเจ๋งๆ ให้ถอดรหัสค้นหาเบื้องลึกเบื้องหลังอะไรแน่ๆ

แต่ว่าพอดูไปเรื่อยๆ แล้วถึงกับกุมขมับ โค้ดต่างๆ ที่เห็นนี่มันคืออะไรกัน? กฎการไขรหัสลับก็ไม่ชัดเจน โค้ดรหัสที่ให้มาก็ดูขาดๆ หายๆ สุดท้ายก็เลยหาความลับที่ซ่อนไว้ไม่เจอ

เริ่มตั้งแต่รหัสที่ใช้ มีแค่เลข 0-1 ก็จริง แต่มันไม่ใช่รหัส ASCII แบบที่คนทำงานสายคอมพิวเตอร์คุ้นเคยกัน ... ซึ่งก็โอเคอันนี้ยอมรับได้ ในเมื่อต้องการให้เป็นรหัสลับ ก็ไม่ควรใช้มาตรฐานเดียวกันกับรหัสอะไรที่มีอยู่จริง ไม่งั้นคนอื่นคงถอดรหัสดูความลับเอาได้ง่ายๆ

แล้วความคาใจอย่างแรกก็เริ่มปรากฏ เมื่อไล่ดูโค้ดแต่ละตัวไปเรื่อยๆ และพบว่า มันไม่ได้มีความยาวเท่ากันหมดนะ บางตัวสั้นแค่ 7 อักษร ส่วนอีกบางตัวก็ยาวได้ถึง 9 ตัวอักษร ... เอ่อ ทำไมไม่ใช้โค้ดยาวเท่าๆ กันนะ? อย่างน้อยจะได้มีความเป็นระเบียบเรียบร้อยสวยงาม

ก็ยังจะอุตสาห์คิดแก้ต่างให้ โดยคิดว่า[รหัสมอร์ส][morse code]เค้ายังให้โค้ดอักษรแต่ละตัวยาวไม่เท่ากันเลยนะ MV นี้ก็อาจจะ[เข้ารหัสแบบฮัฟฟ์แมน][huffman coding] ที่ย่อตัวอักษรที่ใช้บ่อยๆ ให้สั้นกว่าตัวอื่น เพื่อบีบอัดโค้ดผลลัพธ์ให้ประหยัดสั้นที่สุดก็เป็นได้ และอาจมีการทำ [พาริตีบิต][parity bit]หรือ[เช็คซัม][checksum] เพื่อ[ตรวจสอบความผิดพลาด][error detection]ว่าส่ง/รับรหัสมาถูกต้องครบถ้วนหรือเปล่า เลยได้ผลลัพธ์ออกมาเป็นโค้ดอย่างที่เห็นนี้

แต่มันก็ยังมีความคาใจอย่างที่สองที่โผลมาพร้อมกัน คือในกระดาษที่เป็นกุญแจสำหรับถอดรหัสเนี่ย มันดันไม่เรียงตัวอักษรให้หาโค้ดง่ายๆ เอาซะเลย กลับไปสลับที่ตัวอักษรมั่วๆ แล้วก็ให้อักษรมาไม่ครบทุกตัวอีก ... แถมที่งงที่สุดก็คือ ตัวอักษรตัวเดียวดันมีได้หลายโค้ด!!

{: .figure}
> ```
>  ????????  001111000  010110010  011011110  011101010
>     ?          C          Y          O          U
>  11000001  100011100  011001010  011000011  011101001
>     B          Y          A          R          E
> 110000111  001100110  010010010  010110110  010111100
>     S          T          B          E          A
> 110001100  111001100  101011110  010101011  011101110
>     A          P          U          T          I
> 100001111  1100011111 010100001  010111110  011011011
>     R          Q          F          U          L
> 110011100  10001100   011010000  011011110  011011101
>     P          W          T          O          D
> 110010110  11001000   011001010  010110010
>     Q          R          A          Y
> ```
>
> กุญแจถอดรหัสที่จะเห็นในนาทีที่ 0:29, 0:40, 2:10

ก็ยังจะพอแถให้ได้อยู่นะ ว่าถ้าดูแค่ 3 คอลัมน์ขวา มันจะได้เรียงว่า "YOU ARE BEAUTIFUL TODAY"

แล้วความคาใจที่ทำให้เซ็งที่สุดก็บังเกิด เมื่อ MV แสดงให้เห็นว่ามีกุญแจไขรหัสชุดที่สอง! ซึ่งมองแว็บแรกก็ดูดี เพราะมันเรียงตัวอักษรต่างๆ ไว้ให้เรียบร้อยแล้ว

{: .figure}
> ```
> 01011001  01101111  010110??  ????????  ????????
>    A         B         C         D         E
> 01100101  01100001  0110010?  01100001  ????????
>    F         G         H         I         J
> 01001001  01011011  0100100?  01011011  01001001
>    K         L         M         N         O
> 10101001  01010101  10101001  1010101   10101001
>    P         Q         R         S         T
> 010100??  01011111  01010000  ???????   010100??
>    U         V         W         X         Y
> 01101000  01101111  ????????  ???????   ????????
>    Z         1         2         3         4
> 011????   01011001  ????????  ???????   ????????
>    5         6         7         8         9
> ```
>
> กุญแจถอดรหัสชุดที่สอง ในนาทีที่ 2:12, 2:19, 2:46

แต่นอกจากกุญแจชุดที่สองจะให้ตัวอักษรแต่ละตัวใช้โค้ดต่างไปจากกุญแจชุดแรกแล้ว ทำไมตัวอักษรคนละตัวในกุญแจชุดนี้ถึงใช้โค้ดเดียวกันได้วะ! เฮ้ยแล้วแบบนี้แม่งจะไขรหัสได้ยังไง??

และแม้ลายมือนางเอกจะน่ารัก แต่โค้ดที่เธอจดๆ ลงกระดาษตลอดทั้ง MV น้อยตัวมากที่จะสามารถย้อนกลับไปหาโค้ดในกุญแจได้จริงๆ ยิ่งพอเป็นประโยคที่ประโยคที่ถอดรหัสมาให้เทียบกันด้วยแล้ว ยิ่งรู้เลยว่าเขียนตัวเลขลงไปมั่วๆ แน่นอน

ก็เอาง่ายๆ ว่าโค้ดตอนต้นเพลงในเพจเจอร์ คุณเธอจดลงกระดาษมาแปลแค่ 10 ตัวอักษร แล้วทำไมถอดรหัสเสร็จถึงแปลงกลับไปเป็นประโยคที่ยาว 23 ตัวอักษรซะได้?

---

อึม ... ถ้ามองในแง่ดี คนทำ MV นี่ถือว่าประสบความสำเร็จมากๆ นะ ที่ทำให้รหัสลับมันเป็นรหัสลับจริงๆ ไม่มีใครสามารถไขมันออกได้

แต่ถ้ามองตามความเป็นจริง เฮ้ย นี่มันงานเผานี่หว่า! หาข้อมูลมาไม่เป๊ะ คิดอยากทำอะไรก็ทำลงไปแบบมั่วๆ ขอแค่ให้ภาพลักษณ์ออกมาดูสวยๆ ฮิปๆ คูลๆ แต่จริงๆ แล้วข้างในสุดแสนจะกลวง ไม่ได้มีความหมายอะไรให้ค้นหาแม้แต่นิดเดียว

ก็ไม่น่าแปลกใจที่ MV จะดึงดูคอมเมนต์ประเภท "สมัยก่อนนี่ดีจัง จะบอกรักแต่ละทีต้องบอกเป็น 0-1 ค่อยๆ ถอดรหัสทีละตัว"

ฟังดูดี แต่ถามจริงเกิดไม่ทันยุคนั้นหรือเป็นพวกบ้ามโน? เพจเจอร์มันส่งเป็นตัวอักษรที่มนุษย์อ่านรู้เรื่องได้ ไม่ต้องมาบอกกันเป็นรหัส 0-1 บ้าบอเหมือนใน MV นี้

ส่วนที่ต้องส่งเป็นรหัส ก็เพราะว่าเค้าไม่อยากให้ใครจับได้ว่าเป็นชู้ไง! ซึ่งสมัยนี้ถ้าริจะเป็นชู้กันแม่งก็ยังต้องส่งรหัสลับอยู่ดี ไม่ได้เป็นเรื่องโรแมนติกหรือว่าจำกัดอยู่แค่ในอดีตแต่อย่างใด

แล้วไอ้การเข้ารหัสลับเพื่อซ่อนข้อความจากสายตาคนอื่น แทนที่จะไปเลือกการเข้ารหัสที่มันสั้นง่ายตีความได้รวดเร็ว ไม่ต้องพกกุญแจใหญ่ยักษ์มาถอดรหัสทีละตัวอักษร (เช่น 23 = เจอกัน, 42 = ที่เดิม, 69 = 😮😛) กลับไปเลือกใช้รหัส 0-1 ที่มองผ่านๆ แล้วสวยงามสมกับเป็นยุคดิจิทัล แต่เมื่อเจาะลึกลงไปในรายละเอียดแล้วกลับพบว่าใช้อย่างมั่วๆ ผิดๆ ซะได้!

เซ็ง เซ็ง เซ็ง เจอแบบนี้เข้าไปก็คงได้แต่ถอนหายใจแล้วบอกว่า

```
SVhGTiBCUlggU0RVREdSQQ==
```


[morse code]: //en.wikipedia.org/wiki/Morse_code
[huffman coding]: //en.wikipedia.org/wiki/Huffman_coding
[error detection]: //en.wikipedia.org/wiki/Error_detection_and_correction

[parity bit]: //en.wikipedia.org/wiki/Parity_bit
[checksum]: //en.wikipedia.org/wiki/Checksum
