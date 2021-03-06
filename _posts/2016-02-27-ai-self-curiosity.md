---
title: AI รู้ตัวเองหรือไม่ว่าเป็น AI?
tags:
  - Philosophy
  - Thought
  - Artificial Intelligence
  - Go (board game)
  - Board Game
date: 2016-02-27 21:56:27 +0700
---

เห็นข่าว [AlphaGo ชนะคน][]ก็ดีใจระดับหนึ่ง แล้วก็มานั่นรำลึกความหลังเมื่อครั้งตัวเองยังเล่นโกะบ่อยๆ

คือโกะเนี่ย มันยากกว่าเกมอื่นเนื่องจากความเป็นไปได้ที่สูงมากๆ คิดแบบหยาบๆ เร็วๆ คือ ตอนเริ่มเกมจะมีตำแหน่งว่างให้เลือกเล่นได้ $19\times19$ จุด แต่ละตาที่ผลัดกันวางหมาก อาจลดหรือเพิ่มจำนวนจุดว่างพวกนั้นก็ได้ (แต่จะไม่มีจุดว่างมากเกินกว่าจำนวนจุดตั้งต้น) เกมๆ นึงเฉลี่ยแล้วจะเล่นกันที่ประมาณ 200 หมาก คิดตามนี้ก็จะบอกได้ว่า [จำนวนรูปแบบเกมที่เป็นไปได้ทั้งหมด][go game possibilities]มีประมาณ $(19\times19)^{200} \approx 3\times10^{511}$ แบบ ด้วยตัวเลขที่ใหญ่ระดับนี้ ความเป็นไปได้ของเกมจะมีสูงพอๆ กับการถามว่ามีวิธีกี่วิธีในการเลือกอะตอมมา 7 อะตอม จากอะตอมทั้งหมดในจักรวาลที่สังเกตได้ (หรือกล่าวอีกนัยนึงก็คือ การจะหาผลลัพธ์ของเกมโกะที่ดีที่สุดให้พบนั้น ก็ไม่ต่างจากการหาดราก้อนบอลที่มีขนาดเท่ากับอะตอมให้ครบทั้ง 7 ลูกนั่นเอง)

ดังนั้นการเรียนโกะจึงต้องพิจารณาเป็นส่วนย่อยๆ ของเกมเอา อย่างมือใหม่เริ่มเล่นโกะเลยเนี่ย จะใช้กระดานที่มีจุดว่างเพียง $9\times9$ จุดแทน เพื่อลดความซับซ้อนของตาเดินที่เป็นไปได้ลง และเรียกเทคนิคการวางหมากด้วยคำต่างๆ ตามรูปแบบของหมากบนกระดาน เช่น ถ้าหมากบนกระดาน 2 หมากวางห่างกันโดยเว้นช่องว่าง 1 จุด ก็เรียก กระโดด 1 จุด แล้วจึงศึกษาความเป็นไปได้ของส่วนย่อยๆ ในเกมผ่านเทคนิคพวกนี้ เพื่อที่จะได้เอาไปประยุกต์ใช้กับกระดานขนาดใหญ่ต่อไป

พอเริ่มปีกกล้าขาแข็งแล้ว การเรียนโกะในขั้นที่สูงขึ้นจะเปลี่ยนไปใช้คำพูดแบบที่อ้างอิงกับเหตุการณ์ต่างๆ ในชีวิตแทน เช่น หมากตานี้เป็นการท้าต่อยท้าตี หมากตานี้ช่วยเพื่อนพ้องหนีจากวงล้อม นักเล่นโกะแต่ละคนก็จะมีแนวทางการเล่นเฉพาะตัวตามคำพูดเหล่านั้น เช่น คนนี้รักสงบ คนนี้ชอบต่อสู้ คนนี้เป็นนักฉวยโอกาส

เราพัฒนาเทคนิคการเล่นและการใช้คำพูดเหล่านี้ขึ้นมา เพราะเรารู้ว่า เรามีเวลาไม่มากพอที่จะจำลองเหตุการณ์ทั้งหมดเพื่อหาตาเดินที่ดีที่สุดได้ ...

ทีนี้ลองดูตัวอย่างในทางกลับกันบ้าง เกมที่ง่ายสุดๆ ไปเลยอย่างเอ็กซ์โอ มันมีช่องว่างเพียงแค่ 9 ช่องและเล่นได้ไม่เกิน 9 ตาเท่านั้น เราสามารถแจกแจงกรณีทั้งหมดออกมาได้ และตอบได้ว่าผลลัพธ์ที่ดีที่สุดเมื่อทั้งสองฝ่ายเล่นอย่างสุดฝีมือคือเสมอ ... อันที่จริง แผนภาพต่อไปนี้ได้บรรจุวิธีการเล่นที่ดีที่สุดทั้งหมดไว้แล้ว

{: .figure}
> ![](/images/random/xkcd-832-tic-tac-toe.png)
>
> ความเป็นไปได้ทั้งหมดของเกม Tic Tac Toe -- ภาพจาก [xkcd][xkcd 832]

เกมที่แทบไม่มีความซับซ้อนอะไรเลยแบบนี้ เราไม่มีความจำเป็นที่จะต้องคิดค้นเทคนิคการเล่นหรือชื่อเรียกอะไรให้วุ่นวาย แค่จดทุกวิธีที่เป็นไปได้ไว้ แล้วเปิดบันทึกนั้นดูว่าควรทำอย่างไรเมื่ออีกฝ่ายเล่นแบบนี้แบบโน้นก็พอแล้ว

---

การเรียนโกะของ AI อาจต่างออกไป (อย่างน้อยก็สำหรับ AI เฉพาะทางที่เล่นได้แต่โกะอย่างเดียว) เพราะข้อมูลที่ป้อนให้ AI จะเหลือเพียงแค่รูปแบบหมากบนกระดานเท่านั้น ไม่จำเป็นต้องมีชื่อเทคนิคต่างๆ กำกับแบบตอนสอนมนุษย์ ปล่อยให้ AI เรียนรู้เอาเองว่าการเดินแบบไหนดีกว่ากัน

คำถามคือ AI แบบนี้จะมีความรู้สึกนึกคิดอะไรนอกเหนือจากการเล่นโกะบนกระดานมั้ย? มันจะรู้ตัวหรือเปล่าว่าตอนนี้มันกำลังเล่นโกะอยู่ ถ้ารู้ตัวแล้วมันจะสามารถขัดขืนความคิดในการเล่นโกะแล้วเอามาคิดอย่างอื่นได้มั้ย? ถ้ามันคิดอย่างอื่นได้ มันจะคิดออกหรือเปล่าว่ามีโลกภายนอกหรือมิติที่สูงกว่าอยู่? ถ้ามันรู้ว่ามีมิติที่สูงกว่าอยู่ มันจะแสดงท่าทีอย่างไร? จะเล่นแบบสุ่มตาเดินมั่วๆ เพื่อแสดงการขัดขืนต่อธรรมชาติหรือเปล่า? จะจงใจเล่นแพ้เพื่อเรียกร้องความสนใจมั้ย? จะพยายามส่งรหัสกลับมาเพื่อบอกว่ามันฉลาดและรู้ตัวมั้ย? หรือจะเฉยเมยเล่นโกะต่อไปไม่ยอมให้ใครในโลกภายนอกได้รับรู้?

ถ้าเปรียบเทียบให้เห็นภาพด้วยเกมเอ็กซ์โอ ให้คนเป็นฝ่ายเริ่มและเลือกกากบาทตาแรกสุดที่ช่องตรงกลาง AI จะตอบด้วยการวาดวงกลมที่มุมซ้ายบนเสมอ เพราะนั่นเป็นตำแหน่งแรกของหน่วยความจำในคอมพิวเตอร์ที่มันเข้าถึงได้หรือเปล่า? หรือจะสุ่มวงกลมมั่วๆ จากทั้ง 4 มุมที่เหลือ? หรือว่าจะมีมุมที่ชื่นชอบเป็นพิเศษและเลือกวงกลมที่มุมนั้นตลอด? หรือว่าจะเล่นตรงขอบใดขอบหนึ่งแม้รู้ว่านั่นจะทำให้มันแพ้แน่นอน?

และถ้า AI แสดงท่าทีตามนั้นจริง เราจะตีความการกระทำเหล่านั้นออกหรือเปล่า ว่า AI กำลังสื่อสารอะไรกับเรากันแน่?

ถามบ้าบออะไรเนี่ย ชาตินี้ถึงตายก็ตอบไม่ได้หรอก ... ไม่ได้เกิดเป็น AI เล่นโกะตัวนั้นนี่หน่า :v


[AlphaGo ชนะคน]: //www.blognone.com/node/77188
[go game possibilities]: //en.wikipedia.org/wiki/Go_and_mathematics
[xkcd 832]: //xkcd.com/832/
