---
title: คูณเมทริกซ์แบบ Strassen
tags:
  - Linear Algebra
  - Computer Science
  - Optimization
  - SVG
  - Experimental
date: 2022-10-13 23:32:23 +0700
thumbnail: /images/math/strassen.png
---

เวลาเรามีเมทริกซ์สองตัว $A=[\;\begin{smallmatrix}a_{11}&a_{12} \newline a_{21}&a_{22}\end{smallmatrix}\;]$ กับ $B=[\;\begin{smallmatrix}b_{11}&b_{12} \newline b_{21}&b_{22}\end{smallmatrix}\;]$ เราสามารหาผลคูณ $C=AB$ ได้ว่า

$$
\begin{bmatrix} a_{11} & a_{12} \\ a_{21} & a_{22} \end{bmatrix}
\begin{bmatrix} b_{11} & b_{12} \\ b_{21} & b_{22} \end{bmatrix}
=
\begin{bmatrix}
a_{11}b_{11}+a_{12}b_{21} & a_{11}b_{12}+a_{12}b_{22} \\
a_{21}b_{11}+a_{22}b_{21} & a_{21}b_{12}+a_{22}b_{22}
\end{bmatrix}
$$

จะเห็นว่าแต่ละสมาชิกในเมทริกซ์ผลลัพธ์นั้นอยู่ในรูป $c_{ij} = a_{i1}b_{1j}+a_{i2}b_{2j}$ ซึ่งก็คือมีการคูณกันสองครั้ง แล้วหลังจากนั้นจึงนำผลคูณมารวมกัน (สำหรับเมทริกซ์ขนาด $n{\times}n$ จะได้ $c_{ij} = \sum_1^n a_{i\square}b_{\square j}$ แทน)

ความเจ๋งของสมการข้างต้นก็คือ แต่ละค่า $a_{ij}$ และ $b_{ij}$ มันไม่ถูกจำกัดให้ต้องเป็นสเกลาร์เท่านั้น แต่ยังสามารถเป็นเมทริกซ์ย่อยของ $A$ และ $B$ ที่พาร์ทิชันมาให้มีขนาดเท่ากันได้อีกด้วย

ตัวอย่างเช่นเมื่อ $A$ และ $B$ เป็นเมทริกซ์ขนาด $4{\times}4$ เราจะได้

$$
\begin{align}
{\color{red}A}{\color{blue}B}
&=
{\color{red}\left[\;\begin{array}{c:c}
\boxed{\begin{matrix}a_{11} & a_{12} \\ a_{21} & a_{22}\end{matrix}}
&
\boxed{\begin{matrix}a_{13} & a_{14} \\ a_{23} & a_{24}\end{matrix}}
\\ \hdashline
\boxed{\begin{matrix}a_{31} & a_{32} \\ a_{41} & a_{42}\end{matrix}}
&
\boxed{\begin{matrix}a_{33} & a_{34} \\ a_{43} & a_{44}\end{matrix}}
\end{array}\;\right]}
{\color{blue}\left[\;\begin{array}{c:c}
\boxed{\begin{matrix}b_{11} & b_{12} \\ b_{21} & b_{22}\end{matrix}}
&
\boxed{\begin{matrix}b_{13} & b_{14} \\ b_{23} & b_{24}\end{matrix}}
\\ \hdashline
\boxed{\begin{matrix}b_{31} & b_{32} \\ b_{41} & b_{42}\end{matrix}}
&
\boxed{\begin{matrix}b_{33} & b_{34} \\ b_{43} & b_{44}\end{matrix}}
\end{array}\;\right]} \\
&=
\left[\;\begin{array}{c:c}
{\color{red}\boxed{\begin{matrix}a_{11} & a_{12} \\ a_{21} & a_{22}\end{matrix}}}\,
{\color{blue}\boxed{\begin{matrix}b_{11} & b_{12} \\ b_{21} & b_{22}\end{matrix}}}
+
{\color{red}\boxed{\begin{matrix}a_{13} & a_{14} \\ a_{23} & a_{24}\end{matrix}}}\,
{\color{blue}\boxed{\begin{matrix}b_{31} & b_{32} \\ b_{41} & b_{42}\end{matrix}}}
& \cdots \\ \hdashline
\vdots & \ddots
\end{array}\;\right] \\
&=
\left[\;\begin{array}{c:c}
\boxed{\begin{matrix}
\sum_1^2 a_{1\square}b_{\square1} & \sum_1^2 a_{1\square}b_{\square2} \\
\sum_1^2 a_{2\square}b_{\square1} & \sum_1^2 a_{2\square}b_{\square2}
\end{matrix}}
+
\boxed{\begin{matrix}
\sum_3^4 a_{1\square}b_{\square1} & \sum_3^4 a_{1\square}b_{\square2} \\
\sum_3^4 a_{2\square}b_{\square1} & \sum_3^4 a_{2\square}b_{\square2}
\end{matrix}}
& \cdots \\ \hdashline
\vdots & \ddots
\end{array}\;\right] \\
&=
\left[\;\begin{array}{cc:cc}
\sum_1^4 a_{1\square}b_{\square1} & \sum_1^4 a_{1\square}b_{\square2} & \cdots & \sum_1^4 a_{1\square}b_{\square4} \\
\sum_1^4 a_{2\square}b_{\square1} & \sum_1^4 a_{2\square}b_{\square2} && \\
\hdashline
\vdots && \ddots \\
\sum_1^4 a_{4\square}b_{\square1} &&& \sum_1^4 a_{4\square}b_{\square4}
\end{array}\;\right]
\end{align}
$$

นั่นก็คือเราสามารถประยุกต์ใช้เทคนิค[แบ่งแยกและเอาชนะ][divide and conquer]เพื่อแก้ปัญหานี้ได้

แล้วอัลกอริทึมแบบดังกล่าวนั้นมีความซับซ้อนเป็นอย่างไร? ถ้าจะวิเคราะห์ให้ง่ายที่สุด เราก็อาจใช้วิธีนับว่ามีการคูณพื้นฐานระหว่างตัวเลขสองตัวเกิดขึ้นกี่ครั้ง

เริ่มจากเมทริกซ์ $n{\times}n$ เมื่อ $n=2$ จากข้อสังเกตที่ว่าแต่ละสมาชิกในเมทริกซ์มีการคูณสองครั้ง ดังนั้นการคูณกันรวมทั้งหมดจึงเป็นแปดครั้ง ต่อมาเมื่อเราเพิ่มขนาดเมทริกซ์เป็น $n=4$ จะได้ว่าเราเรียกตัวเองเป็นการคูณเมทริกซ์ย่อยขนาด $2{\times}2$ เป็นจำนวนแปดครั้ง ดังนั้นการคูณพื้นฐานรวมคือ $8\cdot8=64$ ครั้ง

เราจึงอาจสรุปได้คร่าวๆ ว่าความซับซ้อนของอัลกอริทึมคือ $O(n^3)$ ด้วยการนับจำนวนการคูณพื้นฐาน กอปรกับเมื่อเราย้อนกลับไปดูนิยามการคูณเมทริกซ์ข้างต้นแล้ว ความซับซ้อนที่ได้นี้ก็ดูจะสอดคล้องและไม่น่าจะถูกปรับปรุงให้ดีขึ้นกว่าเดิมได้อีก ...

จนกระทั่ง Volker Strassen เสนออัลกอริทึมสำหรับคูณเมทริกซ์ในปี 1969 ที่สามารถลดจำนวนการคูณในแต่ละชั้นให้ลดลงเหลือเพียงแค่เจ็ดครั้งได้ โดยอาศัยข้อสังเกตว่าเราไม่จำเป็นต้องคำนวณแต่ละ $c_{ij}$ ตรงๆ แต่เราจะเดินอ้อมด้วยการคำนวณผลคูณระหว่างทางที่ซับซ้อนกว่าเดิมเล็กน้อยเก็บไว้ก่อน แล้วค่อยนำผลคูณเหล่านั้นมาบวกกันเพื่อสร้างเป็นแต่ละ $c_{ij}$ ทีหลัง ซึ่งจุดสำคัญคือเราจะใช้ผลคูณบางค่าซ้ำในหลายที่ จึงทำให้เราประหยัดการคูณลงไปได้นั่นเอง

เขียนให้ชัดๆ ก็คือ เราจะเริ่มคำนวณผลคูณระหว่างทางเหล่านี้ทิ้งไว้

$$
\begin{align}
m_1 &= (a_{11}+a_{22})(b_{11}+b_{22}) \\
m_2 &= (a_{21}+a_{22})b_{11} \\
m_3 &= a_{11}(b_{12}-b_{22}) \\
m_4 &= a_{22}(b_{21}-b_{11}) \\
m_5 &= (a_{11}+a_{12})b_{22} \\
m_6 &= (a_{21}-a_{11})(b_{11}+b_{12}) \\
m_7 &= (a_{12}-a_{22})(b_{21}+b_{22})
\end{align}
$$

แล้วจึงหา $C=AB$ จาก

$$
\begin{bmatrix} c_{11} & c_{12} \\ c_{21} & c_{22} \end{bmatrix}
=
\begin{bmatrix}
m_1 + m_4 - m_5 + m_7 &
m_3 + m_5 \\
m_2 + m_4 &
m_1 - m_2 + m_3 + m_6
\end{bmatrix}
$$

เนื่องจากเราลดการคูณเหลือเพียงเจ็ดครั้ง จึงได้ว่าความซับซ้อนลดเหลือ $O(n^{\log_27}) \approx O(n^{2.8})$

ชุดสมการข้างต้นนั้นจะว่าไปก็ดูซับซ้อนพอสมควร แต่ผมพบว่า[ภาพประกอบบนวิกิพีเดีย][wiki image strassen]นั้นช่วยให้*เห็นภาพ*แนวคิดหลักของอัลกอริทึมได้ดีมากๆ ซึ่งก็คือเราอาจมองมันเป็นเกมประกอบตัวต่อให้ได้รูปทรงตามที่ต้องการก็ได้ โดยตัวต่อที่เราสนใจนั้นมีรูปร่างเป็นตารางขนาด $4{\times}4$ ของทุกความเป็นไปได้ของการจับคู่คูณกันระหว่างทุกสมาชิกใน $A$ กับ $B$ และเราจะสร้างแต่ละ $c_{ij}$ ผ่านการจับตัวต่อ $m_1$ ถึง $m_7$ มาประกอบกัน

{: .flex.column.align-center .oversized}
> <div class="horizontal">
>   <div id="c11" class="vertical product">
>     <svg width="101" height="101" viewbox="-50.5 -50.5 101 101">
>       <rect x="-50" y="-50" width="100" height="100" fill="#fff" />
>       <g class="cells" />
>       <g class="lines" stroke="black" />
>     </svg>
>     <div>$c_{11}$</div>
>   </div>
>   <div id="c12" class="vertical product">
>     <svg width="101" height="101" viewbox="-50.5 -50.5 101 101">
>       <rect x="-50" y="-50" width="100" height="100" fill="#fff" />
>       <g class="cells" />
>       <g class="lines" stroke="black" />
>     </svg>
>     <div>$c_{12}$</div>
>   </div>
>   <div id="c21" class="vertical product">
>     <svg width="101" height="101" viewbox="-50.5 -50.5 101 101">
>       <rect x="-50" y="-50" width="100" height="100" fill="#fff" />
>       <g class="cells" />
>       <g class="lines" stroke="black" />
>     </svg>
>     <div>$c_{21}$</div>
>   </div>
>   <div id="c22" class="vertical product">
>     <svg width="101" height="101" viewbox="-50.5 -50.5 101 101">
>       <rect x="-50" y="-50" width="100" height="100" fill="#fff" />
>       <g class="cells" />
>       <g class="lines" stroke="black" />
>     </svg>
>     <div>$c_{22}$</div>
>   </div>
> </div>
>
> <div id="game">
>   <svg width="100%" viewbox="-250.5 -250.5 501 501">
>     <g>
>       <rect id="cell11" x="-200" y="-200" width="100" height="100" />
>       <rect id="cell12" x="-100" y="-200" width="100" height="100" />
>       <rect id="cell13" x="0"    y="-200" width="100" height="100" />
>       <rect id="cell14" x="+100" y="-200" width="100" height="100" />
>       <rect id="cell21" x="-200" y="-100" width="100" height="100" />
>       <rect id="cell22" x="-100" y="-100" width="100" height="100" />
>       <rect id="cell23" x="0"    y="-100" width="100" height="100" />
>       <rect id="cell24" x="+100" y="-100" width="100" height="100" />
>       <rect id="cell31" x="-200" y="0"    width="100" height="100" />
>       <rect id="cell32" x="-100" y="0"    width="100" height="100" />
>       <rect id="cell33" x="0"    y="0"    width="100" height="100" />
>       <rect id="cell34" x="+100" y="0"    width="100" height="100" />
>       <rect id="cell41" x="-200" y="+100" width="100" height="100" />
>       <rect id="cell42" x="-100" y="+100" width="100" height="100" />
>       <rect id="cell43" x="0"    y="+100" width="100" height="100" />
>       <rect id="cell44" x="+100" y="+100" width="100" height="100" />
>     </g>
>     <g font-family="monospace" dominant-baseline="middle" text-anchor="middle">
>       <g font-size="2.25em">
>         <text id="text11" x="-150" y="-150" />
>         <text id="text12" x="-50"  y="-150" />
>         <text id="text13" x="+50"  y="-150" />
>         <text id="text14" x="+150" y="-150" />
>         <text id="text21" x="-150" y="-50"  />
>         <text id="text22" x="-50"  y="-50"  />
>         <text id="text23" x="+50"  y="-50"  />
>         <text id="text24" x="+150" y="-50"  />
>         <text id="text31" x="-150" y="+50"  />
>         <text id="text32" x="-50"  y="+50"  />
>         <text id="text33" x="+50"  y="+50"  />
>         <text id="text34" x="+150" y="+50"  />
>         <text id="text41" x="-150" y="+150" />
>         <text id="text42" x="-50"  y="+150" />
>         <text id="text43" x="+50"  y="+150" />
>         <text id="text44" x="+150" y="+150" />
>       </g>
>       <g font-style="italic">
>         <text x="-145" y="-220"><tspan font-size="1.75em">a</tspan><tspan font-size="1.25em" dy="+10">11</tspan></text>
>         <text x="-45"  y="-220"><tspan font-size="1.75em">a</tspan><tspan font-size="1.25em" dy="+10">12</tspan></text>
>         <text x="+55"  y="-220"><tspan font-size="1.75em">a</tspan><tspan font-size="1.25em" dy="+10">21</tspan></text>
>         <text x="+155" y="-220"><tspan font-size="1.75em">a</tspan><tspan font-size="1.25em" dy="+10">22</tspan></text>
>         <text x="-225" y="-150"><tspan font-size="1.75em">b</tspan><tspan font-size="1.25em" dy="+10">11</tspan></text>
>         <text x="-225" y="-50" ><tspan font-size="1.75em">b</tspan><tspan font-size="1.25em" dy="+10">21</tspan></text>
>         <text x="-225" y="+50" ><tspan font-size="1.75em">b</tspan><tspan font-size="1.25em" dy="+10">12</tspan></text>
>         <text x="-225" y="+150"><tspan font-size="1.75em">b</tspan><tspan font-size="1.25em" dy="+10">22</tspan></text>
>       </g>
>     </g>
>     <g stroke="black">
>       <line x1="-200" y1="-200" x2="-200" y2="+200" />
>       <line x1="-100" y1="-200" x2="-100" y2="+200" />
>       <line x1="0"    y1="-200" x2="0"    y2="+200" />
>       <line x1="+100" y1="-200" x2="+100" y2="+200" />
>       <line x1="+200" y1="-200" x2="+200" y2="+200" />
>       <line x1="-200" y1="-200" x2="+200" y2="-200" />
>       <line x1="-200" y1="-100" x2="+200" y2="-100" />
>       <line x1="-200" y1="0"    x2="+200" y2="0"    />
>       <line x1="-200" y1="+100" x2="+200" y2="+100" />
>       <line x1="-200" y1="+200" x2="+200" y2="+200" />
>     </g>
>   </svg>
> </div>
>
> <div class="horizontal">
>   <div id="m1" class="vertical piece">
>     <svg onclick="cycle(1)" width="51" height="51" viewbox="-25.5 -25.5 51 51">
>       <rect x="-24" y="-24" width="48" height="48" fill="#fff" />
>       <g class="cells" />
>       <g class="lines" stroke="black" />
>     </svg>
>     <div>$m_1$</div>
>     <div class="control">
>       <button class="sub" onclick="sub(1)">-</button>
>       <button class="zero" onclick="zero(1)">0</button>
>       <button class="add" onclick="add(1)">+</button>
>     </div>
>   </div>
>   <div id="m2" class="vertical piece">
>     <svg onclick="cycle(2)" width="51" height="51" viewbox="-25.5 -25.5 51 51">
>       <rect x="-24" y="-24" width="48" height="48" fill="#fff" />
>       <g class="cells" />
>       <g class="lines" stroke="black" />
>     </svg>
>     <div>$m_2$</div>
>     <div class="control">
>       <button class="sub" onclick="sub(2)">-</button>
>       <button class="zero" onclick="zero(2)">0</button>
>       <button class="add" onclick="add(2)">+</button>
>     </div>
>   </div>
>   <div id="m3" class="vertical piece">
>     <svg onclick="cycle(3)" width="51" height="51" viewbox="-25.5 -25.5 51 51">
>       <rect x="-24" y="-24" width="48" height="48" fill="#fff" />
>       <g class="cells" />
>       <g class="lines" stroke="black" />
>     </svg>
>     <div>$m_3$</div>
>     <div class="control">
>       <button class="sub" onclick="sub(3)">-</button>
>       <button class="zero" onclick="zero(3)">0</button>
>       <button class="add" onclick="add(3)">+</button>
>     </div>
>   </div>
>   <div id="m4" class="vertical piece">
>     <svg onclick="cycle(4)" width="51" height="51" viewbox="-25.5 -25.5 51 51">
>       <rect x="-24" y="-24" width="48" height="48" fill="#fff" />
>       <g class="cells" />
>       <g class="lines" stroke="black" />
>     </svg>
>     <div>$m_4$</div>
>     <div class="control">
>       <button class="sub" onclick="sub(4)">-</button>
>       <button class="zero" onclick="zero(4)">0</button>
>       <button class="add" onclick="add(4)">+</button>
>     </div>
>   </div>
>   <div id="m5" class="vertical piece">
>     <svg onclick="cycle(5)" width="51" height="51" viewbox="-25.5 -25.5 51 51">
>       <rect x="-24" y="-24" width="48" height="48" fill="#fff" />
>       <g class="cells" />
>       <g class="lines" stroke="black" />
>     </svg>
>     <div>$m_5$</div>
>     <div class="control">
>       <button class="sub" onclick="sub(5)">-</button>
>       <button class="zero" onclick="zero(5)">0</button>
>       <button class="add" onclick="add(5)">+</button>
>     </div>
>   </div>
>   <div id="m6" class="vertical piece">
>     <svg onclick="cycle(6)" width="51" height="51" viewbox="-25.5 -25.5 51 51">
>       <rect x="-24" y="-24" width="48" height="48" fill="#fff" />
>       <g class="cells" />
>       <g class="lines" stroke="black" />
>     </svg>
>     <div>$m_6$</div>
>     <div class="control">
>       <button class="sub" onclick="sub(6)">-</button>
>       <button class="zero" onclick="zero(6)">0</button>
>       <button class="add" onclick="add(6)">+</button>
>     </div>
>   </div>
>   <div id="m7" class="vertical piece">
>     <svg onclick="cycle(7)" width="51" height="51" viewbox="-25.5 -25.5 51 51">
>       <rect x="-24" y="-24" width="48" height="48" fill="#fff" />
>       <g class="cells" />
>       <g class="lines" stroke="black" />
>     </svg>
>     <div>$m_7$</div>
>     <div class="control">
>       <button class="sub" onclick="sub(7)">-</button>
>       <button class="zero" onclick="zero(7)">0</button>
>       <button class="add" onclick="add(7)">+</button>
>     </div>
>   </div>
> </div>
>
> <div id="meta-control">
>   <button onclick="invert()">invert</button>
>   <button onclick="reset()">clear</button>
> </div>
>
> <style>
> .horizontal {
>   display: flex;
>   flex-wrap: wrap;
>   justify-content: center;
> }
>
> .vertical {
>   display: flex;
>   flex-direction: column;
>   align-items: center;
> }
>
> .product {
>   margin:  1em;
>   padding: 1em;
>   border: solid 1px;
>   border-radius: 1em;
> }
>
> .product rect.same {
>   fill: #0c0;
> }
>
> .piece {
>   margin:  0.5em;
>   padding: 0.5em;
>   border: dashed 1px;
>   border-radius: 0.5em;
> }
> .piece.sub {
>   background-color: #f99;
> }
> .piece.zero {
>   background-color: #ddd;
> }
> .piece.add {
>   background-color: #9f9;
> }
>
> .piece .control button {
>   font-family: monospace;
> }
>
> .piece.sub rect.same {
>   fill: #c00;
> }
> .piece.sub rect.diff {
>   fill: #0c0;
> }
> .piece.zero rect.same {
>   fill: #aaa;
> }
> .piece.zero rect.diff {
>   fill: #000;
> }
> .piece.add rect.same {
>   fill: #0c0;
> }
> .piece.add rect.diff {
>   fill: #c00;
> }
>
> #game {
>   width: 100%;
>   max-width: 501px;
> }
>
> #game rect.under {
>   fill: #c00;
> }
> #game rect.zero {
>   fill: #fff;
> }
> #game rect.one {
>   fill: #0c0;
> }
> #game rect.over {
>   fill: #00c;
> }
>
> #game text.under,
> #game text.over,
> #game text.zero {
>   fill: #fff;
> }
>
> #game text.one {
>   fill: #000;
> }
>
> #meta-control {
>   margin: 1em;
> }
> </style>
>
> <script defer>
> let states = [0,0,0,0,0,0,0];
>
> const targets = [
>   [[true, 0, 0], [true, 1, 1]],
>   [[true, 2, 0], [true, 3, 1]],
>   [[true, 0, 2], [true, 1, 3]],
>   [[true, 2, 2], [true, 3, 3]],
> ];
> const pieces = [
>   [[true, 0, 0], [true, 0, 3], [true, 3, 0], [true, 3, 3]],
>   [[true, 0, 2], [true, 0, 3]],
>   [[true, 2, 0], [false, 3, 0]],
>   [[false, 0, 3], [true, 1, 3]],
>   [[true, 3, 0], [true, 3, 1]],
>   [[false, 0, 0], [false, 2, 0], [true, 0, 2], [true, 2, 2]],
>   [[true, 1, 1], [true, 3, 1], [false, 1, 3], [false, 3, 3]],
> ];
>
> const attach_class = (id, class_name) => {
>   const mi = document.getElementById(id);
>   for (const name of ['sub', 'add', 'zero', 'one', 'under', 'over']) {
>     mi.classList.remove(name);
>   }
>   mi.classList.add(class_name);
> };
>
> const attach_disabled = (id, which) => {
>   const mi = document.getElementById(id);
>   for (const element of mi.getElementsByTagName('button')) {
>     element.removeAttribute('disabled');
>   }
>   mi.getElementsByClassName(which)[0].setAttribute('disabled', '');
> };
>
> const sub = (i) => {
>   attach_disabled(`m${i}`, 'sub');
>   attach_class(`m${i}`, 'sub');
>   update(i, -1);
> };
>
> const zero = (i) => {
>   attach_disabled(`m${i}`, 'zero');
>   attach_class(`m${i}`, 'zero');
>   update(i, 0);
> };
>
> const add = (i) => {
>   attach_disabled(`m${i}`, 'add');
>   attach_class(`m${i}`, 'add');
>   update(i, +1);
> };
>
> const cycle = (i) => {
>   [zero, add, sub][1 + states[i-1]](i);
> };
>
> const make_lines = function*(size) {
>   for (const axis of ['xy','yx']) {
>     for (let i=0; i<5; i++) {
>       const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
>       line.setAttribute(`${axis[0]}1`, -2*size);
>       line.setAttribute(`${axis[0]}2`, +2*size);
>       line.setAttribute(`${axis[1]}1`, (i-2)*size);
>       line.setAttribute(`${axis[1]}2`, (i-2)*size);
>       yield line;
>     }
>   }
> };
>
> const make_rect = (size, r, c, class_name) => {
>   const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
>   rect.classList.add(class_name);
>   rect.setAttribute('x', size*(c-2));
>   rect.setAttribute('y', size*(r-2));
>   rect.setAttribute('width', size);
>   rect.setAttribute('height', size);
>   return rect;
> };
>
> const populate = (id, spec) => {
>   const size = id.startsWith('m') ? 12 : 25;
>   const lines = document.getElementById(id).getElementsByClassName('lines')[0];
>   for (const line of make_lines(size)) {
>     lines.append(line);
>   }
>   const cells = document.getElementById(id).getElementsByClassName('cells')[0];
>   for (const [same, r, c] of spec) {
>     cells.append(make_rect(size, r, c, same ? 'same' : 'diff'));
>   }
> };
>
> const decide_class = (cell) => {
>   if (cell === 0)
>     return 'zero';
>   if (cell === 1)
>     return 'one';
>   if (cell > 1)
>     return 'over';
>   return 'under';
> };
>
> const update = (i, value) => {
>   states[i-1] = value;
>   let game = [...Array(4)].map(_ => Array(4).fill(0));
>   for (let k=0; k<7; k++) {
>     for (const [same, r, c] of pieces[k]) {
>       game[r][c] += (same ? +1 : -1) * states[k];
>     }
>   }
>   for (let r=0; r<4; r++) {
>     for (let c=0; c<4; c++) {
>       const class_name = decide_class(game[r][c]);
>       attach_class(`cell${r+1}${c+1}`, class_name);
>       attach_class(`text${r+1}${c+1}`, class_name);
>       const text = document.getElementById(`text${r+1}${c+1}`);
>       text.innerHTML = `${game[r][c] > 0 ? '+' : ''}${game[r][c]}`;
>     }
>   }
> };
>
> const reset = () => {
>   for (let i=0; i<7; i++) {
>     zero(i+1);
>   }
> };
>
> const invert = () => {
>   for (let i=0; i<7; i++) {
>     if (states[i] === 1) {
>       sub(i+1);
>     } else if (states[i] === -1) {
>       add(i+1);
>     }
>   }
> };
>
> const init = () => {
>   for (let i=0; i<2; i++) {
>     for (let j=0; j<2; j++) {
>       populate(`c${i+1}${j+1}`, targets[2*i+j]);
>     }
>   }
>   for (let i=0; i<7; i++) {
>     populate(`m${i+1}`, pieces[i]);
>   }
>   reset();
> };
>
> init();
> </script>

แม้อัลกอริทึมของ Strassen จะดูว่าเป็นการปรับปรุงความซับซ้อนเพียงเล็กน้อย แต่ก็นับเป็นหมุดหมายสำคัญของการเริ่มต้นศึกษาวิจัยการคูณเมทริกซ์ กว่าครึ่งศตวรรษที่ผ่านมาก็มีการพัฒนามาตลอดโดยนักวิจัยที่หลากหลาย (Strassen เองก็เสนออัลกอริทึมที่ดีกว่าเดิมอีกด้วย แต่ทั่วไปแล้วเมื่อพูดถึงอัลกอริทึมของ Strassen ก็จะหมายถึงอัลกอริทึมแรกสุดที่เขานำเสนอ) โดยล่าสุดเมื่อปี 2020 ที่ผ่านมา ทีมวิจัยที่ประกอบด้วย Josh Alman และ Virginia Vassilevska Williams ได้พัฒนาเทคนิคใหม่ๆ ซึ่งสามารถปรับปรุงความซับซ้อนของการคูณเมทริกซ์ให้เหลือเพียง $O(n^{2.3728596})$



[divide and conquer]: //en.wikipedia.org/wiki/Divide-and-conquer_algorithm
[wiki image strassen]: //en.wikipedia.org/wiki/File:Strassen_algorithm.svg
