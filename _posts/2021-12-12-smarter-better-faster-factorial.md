---
title: เร็วขึ้นอีกสิเจ้าแฟกทอเรียล!
tags:
  - Factorial
  - Algorithm
  - Optimization
date: 2021-12-12 23:50:50 +0700
---

นิยาม[แฟกทอเรียล][factorial]นั้นเรียบง่ายจนใครๆ ก็สามารถ implement ตามได้ สมมติต้องการ $20!$ เราก็แค่คำนวณ

$$
20! = 1 \times 2 \times 3 \times \cdots \times 20
$$

วิเคราะห์แบบหยาบๆ อัลกอริทึมนี้จับตัวเลขมาคูณกันมากที่สุด $n$ ครั้ง คำถามคือเราจะทำได้เร็วกว่านี้อีกมั้ย?

สังเกตว่าถ้าเราแบ่งลำดับการคูณของตัวเลขจำนวณคู่และจำนวณคี่ออกจากกัน เราจะเห็นแพทเทิร์นที่คุ้นหน้าคุ้นตาขึ้นมาทันที

$$
\begin{align}
20! &= (1 \times 3 \times 5 \times 7 \times 9 \times 11 \times 13 \times 15 \times 17 \times 19) \;\times \\
    &\phantom{=\;\;} (2 \times 4 \times 6 \times 8 \times 10 \times 12 \times 14 \times 16 \times 18 \times 20) \\
    &= (1 \times 3 \times 5 \times 7 \times 9 \times 11 \times 13 \times 15 \times 17 \times 19) \;\times \\
    &\phantom{=\;\;} (1 \times 2 \times 3 \times 4 \times 5 \times 6 \times 7 \times 8 \times 9 \times 10) \times {\color{red}2^{10}} \\
\end{align}
$$

ซึ่งหมายความว่า เราอาจใช้เทคนิคแนว[แบ่งแยกและเอาชนะ][divide and conquer]ไปคำนวณปัญหาเดียวกันในเคสที่เล็กลง หลังจากนั้นก็เอาผลลัพธ์มาช่วยแก้ปัญหากับเคสที่ใหญ่กว่าได้

แล้วเราจะหยุดทำไมแค่ตรงนี้หละ? ในเมื่อเราสามารถแตกปัญหาย่อยลงไปได้อีก

$$
\begin{align}
20! &= (1 \times 3 \times 5 \times 7 \times 9 \times 11 \times 13 \times 15 \times 17 \times 19) \;\times \\
    &\phantom{=\;\;} (2 \times 4 \times 6 \times 8 \times 10 \times 12 \times 14 \times 16 \times 18 \times 20) \\
    &= (1 \times 3 \times 5 \times 7 \times 9 \times 11 \times 13 \times 15 \times 17 \times 19) \;\times \\
    &\phantom{=\;\;} (2 \times 6 \times 10 \times 14 \times 18) \;\times \\
    &\phantom{=\;\;} (4 \times 8 \times 12 \times 16 \times 20) \\
    &= (1 \times 3 \times 5 \times 7 \times 9 \times 11 \times 13 \times 15 \times 17 \times 19) \;\times \\
    &\phantom{=\;\;} (2 \times 6 \times 10 \times 14 \times 18) \;\times \\
    &\phantom{=\;\;} (4 \times 12 \times 20) \;\times \\
    &\phantom{=\;\;} (8 \times 16) \\
    &= (1 \times 3 \times 5 \times 7 \times 9 \times 11 \times 13 \times 15 \times 17 \times 19) \;\times \\
    &\phantom{=\;\;} (2 \times 6 \times 10 \times 14 \times 18) \;\times \\
    &\phantom{=\;\;} (4 \times 12 \times 20) \;\times \\
    &\phantom{=\;\;} (8) \;\times \\
    &\phantom{=\;\;} (16) \\
    &= (1 \times 3 \times 5 \times 7 \times 9 \times 11 \times 13 \times 15 \times 17 \times 19) \;\times & {\color{red}1^{10}}\times \\
    &\phantom{=\;\;} (1 \times 3 \times 5 \times 7 \times 9) \;\times & {\color{red}2^{5\phantom0}}\times \\
    &\phantom{=\;\;} (1 \times 3 \times 5) \;\times & {\color{red}4^{3\phantom0}}\times \\
    &\phantom{=\;\;} (1) \;\times & {\color{red}8^{1\phantom0}}\times \\
    &\phantom{=\;\;} (1) \;\times & {\color{red}16^{1\phantom0}}\phantom{\times}
\end{align}
$$

หรือก็คือเราสามารถลดรูปปัญหาเป็นการหาผลคูณของเลขจำนวนคี่ในโครงสร้างเช่นนี้แทน แล้วจึงค่อยเอาไปคูณกับเลขคู่ที่จับแยกไว้ ... มองผ่านๆ อาจจะเหมือนไม่ได้ช่วยเร่งความเร็วเลย เพราะในส่วนเลขคี่เราก็ยังต้องคูณเป็นจำนวน $n$ ครั้งเท่าเดิม เพิ่มเติมขึ้นมาก็คือต้องเอาไปคูณกับเลขคู่อีกหลายตัวทางด้านขวาเสียอีก

แต่ระลึกไว้ว่าเราทำงานบนเลขฐานสอง ที่การคูณเลขใดๆ ด้วย $2^k$ นั้นเป็นเพียงการเลื่อนบิตไปทางซ้าย $k$ บิต อนึ่งการคูณเพียงเลขคี่นั้นก็ยังเร็วกว่าการคูณเลขทั้งหมด เพราะผลลัพธ์ระหว่างทางของการคูณเลขคี่นั้นมีขนาดบิตของตัวเลขที่สั้นกว่านั่นเอง ถึงตรงนี้ที่เราคูณเพียงเลขคี่และค่อยๆ เลื่อนบิตก็เร็วกว่าเดิมแล้ว

แต่มาสังเกตว่าค่า $k$ ก็มีโครงสร้างที่รวบรัดเรียบง่ายเช่นกัน ซึ่งในกรณีนี้คำนวณได้จาก

$$
\begin{align}
k &= \log_2( 1^{10} \times 2^5 \times 4^3 \times 8^1 \times 16^1 ) \\
  &= 0{\times}10 + 1{\times}5 + 2{\times}3 + 3{\times}1 + 4{\times}1 \\
  &= 18
\end{align}
$$

หรือเทียบเท่ากับการนับจำนวนบิต `1` ในเลขฐานสองของค่า $n$ ตั้งต้น เรียบร้อยแล้วก็เอา $n$ ไปลบทิ้งนั่นเอง หมายความว่าเราสามารถรู้ได้อย่างเร็วเลยว่าต้องเลื่อนกี่บิต ไม่ต้องค่อยๆ เลื่อนบิตหลายครั้งด้วย

เรายังทำได้ดีกว่านี้อีก ย้อนกลับไปสังเกตส่วนการคูณเลขคี่ จะเห็นการคูณเลขซ้ำๆ กันเป็นจำนวนมาก เช่นนี้

$$
\begin{align}
20! &= ({\color{lightgray}1 \times 3 \times 5 \times 7 \times 9} \times 11 \times 13 \times 15 \times 17 \times 19) \;\times & {\color{red}1^{10}}\times \\
    &\phantom{=\;\;} ({\color{lightgray}1 \times 3 \times 5} \times 7 \times 9) \;\times & {\color{red}2^{5\phantom0}}\times \\
    &\phantom{=\;\;} ({\color{lightgray}1} \times 3 \times 5) \;\times & {\color{red}4^{3\phantom0}}\times \\
    &\phantom{=\;\;} ({\color{lightgray}1}) \;\times & {\color{red}8^{1\phantom0}}\times \\
    &\phantom{=\;\;} (1) \;\times & {\color{red}16^{1\phantom0}}\phantom{\times} \\
    &= (1)^5 (3 \times 5)^3 (7 \times 9)^2 (11 \times 13 \times 15 \times 17 \times 19)^1 \;\times & {\color{red}2^{18}\phantom{\times}}
\end{align}
$$

ซึ่งในส่วนการยกกำลังเราสามารถใช้เทคนิค[การสร้างจัตุรัส][expo by squaring] ที่มีรายละเอียดเป็นการเลื่อนบิตของเลขยกกำลังไปทางขวาแทนการหารสองมาช่วยได้อีก จึงทำให้เราประหยัดการคูณ/หาร และเก็บมันไว้ใช้เฉพาะกับการคำนวณตัวเลขในแฟกทอเรียลเท่านั้นได้

นอกจากนี้ ลำดับการคูณเลขเรียงกันก็มีผล จากตัวอย่าง $11{\times}13{\times}15{\times}17{\times}19$ หากเราคำนวณไล่จากซ้ายไปขวาเรื่อยๆ ซึ่งก็คือ $((((11{\times}13){\times}15){\times}17){\times}19)$ ผลลัพธ์ยิบย่อยระหว่างทางจะมีบิตเพิ่มขึ้นเรื่อยๆ จนมีจำนวนบิตเข้าใกล้จำนวนบิตของผลลัพธ์สุดท้าย แต่หากเราพยายามแบ่งชุดการคูณออกเป็นสองข้างที่มีจำนวนการคูณใกล้เคียงกัน เช่นอาจแบ่งเป็น $((11{\times}13){\times}15){\times}(17{\times}19)$ จะเห็นว่าผลลัพธ์ระหว่างทางนั้นใช้จำนวนบิตเก็บข้อมูลน้อยกว่า โดยน้อยลงเหลือประมาณครึ่งหนึ่งของจำนวนบิตของผลลัพธ์สุดท้ายเท่านั้น

ดังนั้นสรุปแล้ว อัลกอริทึมนี้จะใช้การคูณลดเหลือ $\frac{n}2$ ครั้งสำหรับการคูณเลขคี่ทุกตัวที่น้อยกว่า $n$ ส่วนการคูณที่แฝงอยู่ในการยกกำลังก็ใช้รวมกันอีกไม่เกิน $\frac{n}2$ ครั้ง แม้ว่ารวมกันแล้วจะกลายเป็นใช้การคูณไม่เกิน $n$ ครั้งเหมือนเดิม แต่ก็เห็นได้ชัดว่ามันทำงานเร็วกว่าด้วยหลายสาเหตุ ตั้งแต่ใช้บิตเก็บข้อมูลเล็กกว่า จำนวนการคูณที่เรียกใช้ก็ไม่มากครั้งกว่า ไปจนถึงการใช้เทคนิคบนเลขฐานสองมาช่วยคำนวณได้อีกหลายจุดอีกด้วย

อัลกอริทึมใน[แนวคิดนี้][factorial divide conquer]ถูกนำไปใช้งานจริงบน Python 3.2+ ([กระดานพูดคุยนักพัฒนา][python issue 8692], [โค้ด C บรรทัดที่ 1218-1460][python implementation]) ซึ่งผู้ใช้ Stack Overflow [รายงาน][stackoverflow factorial]ว่าฟังก์ชันดังกล่าวเร็วขึ้นประมาณห้าเท่าเมื่อคำนวณ $10000!$ และจะเร็วห่างกันมากยิ่งขึ้นไปอีกเมื่อตัวเลขมีขนาดใหญ่ยิ่งขึ้นกว่านี้ด้วย


[factorial]: //en.wikipedia.org/wiki/Factorial
[divide and conquer]: //en.wikipedia.org/wiki/Divide-and-conquer_algorithm
[expo by squaring]: //en.wikipedia.org/wiki/Exponentiation_by_squaring
[factorial divide conquer]: //www.luschny.de/math/factorial/binarysplitfact.html
[python issue 8692]: //bugs.python.org/issue8692
[python implementation]: //hg.python.org/cpython/file/7937aa6b7e92/Modules/mathmodule.c#l1218
[stackoverflow factorial]: //stackoverflow.com/questions/9815252/
