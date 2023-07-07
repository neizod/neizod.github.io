---
title: ยินดียิ่งนัก LaTeX พิมพ์ไทยได้แล้ว
tags:
  - Open Source
  - LaTeX
date: 2013-07-25 12:05:00 +0700
origin:
  - name: Google+
    url: //plus.google.com/+neizod/posts/aR38MYhNyDG
---

ผมไม่ใช่ผู้ใช้ LaTeX ตั้งแต่ยุคแรกๆ แม้ว่าจะสนใจคณิตศาสตร์ก็ตาม การเขียนแทนสมการของผมแทบทั้งหมดนั้นสำเร็จได้ด้วยปากกาและกระดาษ ถ้าต้องการแสดงสมการในคอมก็จะเป็น plain text เพียงอย่างเดียว

ประสบการณ์ใช้ LaTeX ครั้งแรกเกิดขึ้นเมื่อ 5 ปีก่อนในวิชา Mathematics Software ซึ่งนับได้ว่าไม่น่าประทับใจเท่าที่ควร (และทำให้เกิดโครงการ [EzMath][] ตามมา) และยังเลวร้ายขึ้นไปอีกเมื่อผมย้ายมาใช้ Linux เต็มตัวเมื่อสองปีก่อน เพื่อพบว่าการทำให้ LaTeX พิมพ์งานภาษาไทยได้นั้นยุ่งยากมาก จนสุดท้ายต้องหนีไป XeLaTeX หรือกลับไปใช้ MS Word ที่มหาวิทยาลัยแทน

อย่างไรก็ตาม สถานการณ์ตอนนี้เริ่มดูดีขึ้น หลังจาก [@theppitak][] สามารถ[ส่ง ThaiLaTeX กลับเข้าไปยังต้นน้ำ][thailatex merged upstream])ได้สำเร็จ ต่อไปนี้ถ้าต้องการพิมพ์ไทยก็แค่ลงโปรแกรม

``` shell
$ apt-get install texlive-full
```

แล้วก็เริ่มพิมพ์งานได้เลย ไม่ต้อง config / download
อะไรเพิ่มเติมอีกต่อไป

``` tex
\documentclass{article}
\usepackage[english,thai]{babel}
\usepackage[utf8x]{inputenc}
\begin{document}
สวัสดีอีกครั้ง $ e^{\pi i} + 1 = 0 $
\end{document}
```

ขอบคุณอีกครั้งที่ช่วยผลักดันวงการซอฟท์แวร์ไทยครับ


[@theppitak]: //twitter.com/theppitak

[EzMath]: //github.com/neizod/ezmath
[thailatex merged upstream]: //thep.blogspot.com/2013/05/future-of-thailatex.html
