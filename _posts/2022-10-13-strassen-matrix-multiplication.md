---
title: Strassen's matrix multiplication
tags:
  - Linear Algebra
  - Divide and Conquer
  - Computer Science
  - Optimization
  - SVG
  - Interactive
  - English Post
date: 2022-10-13 23:32:23 +0700
thumbnail: /images/math/strassen.png
---

Consider two matrices, $A=[\;\begin{smallmatrix}a_{11}&a_{12} \newline a_{21}&a_{22}\end{smallmatrix}\;]$ and $B=[\;\begin{smallmatrix}b_{11}&b_{12} \newline b_{21}&b_{22}\end{smallmatrix}\;]$. The matrix multiplication $C=AB$ can be computed using the following expression:

$$
\begin{bmatrix} a_{11} & a_{12} \\ a_{21} & a_{22} \end{bmatrix}
\begin{bmatrix} b_{11} & b_{12} \\ b_{21} & b_{22} \end{bmatrix}
=
\begin{bmatrix}
a_{11}b_{11}+a_{12}b_{21} & a_{11}b_{12}+a_{12}b_{22} \\
a_{21}b_{11}+a_{22}b_{21} & a_{21}b_{12}+a_{22}b_{22}
\end{bmatrix}.
$$

Note that each element in the resulting matrix is in the form $c_{ij} = a_{i1}b_{1j}+a_{i2}b_{2j}$. Thus, there are two *basic* multiplications between numbers before they are summed up. (For matrices of dimension $n{\times}n$, we have $c_{ij} = \sum_1^n a_{i\square}b_{\square j}$ instead.)

The advantage of this equation is that each $a_{ij}$ and $b_{ij}$ doesn't have to be just scalars. They can also be submatrices of $A$ and $B$ that are equally partitioned.

For instance, when $A$ and $B$ are both $4{\times}4$ matrices, We have

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
\end{array}\;\right].
\end{align}
$$

Thus, we can apply [divide and conquer][] technique to derive an algorithm for this problem.

Naturally, the next question is: what is the complexity of this algorithm? The simplest analysis involves counting how many times the basic multiplication between numbers occurs.

Let's consider $n{\times}n$ matrices. When $n=2$, based on the previous observation that each element in the result matrix involves two basic multiplications, we end up with a total eight basic multiplications. Now, when $n=4$, we can observe that the problem is divided into eight subproblems of $2{\times}2$ matrix multiplication. This result in a total number of $8\cdot8=64$ basic multiplications.

Roughly speaking, we can conclude that with this basic multiplication counting, the complexity of the algorithm is $O(n^3)$. This complexity aligns well with the definition of matrix multiplication, suggesting that it might be an optimal solution that cannot be further improved...

However, it was not until 1969 that Volker Strassen propose a matrix multiplication algorithm that uses only seven multiplications in each layer. This technique relies on the observation that we don't need to compute each of $c_{ij}$ right away. Instead, we can find *a little bit* complicated intermediate results that intertwine with many elements. We can then combine these intermediate results into $c_{ij}$ later. Furthermore, we *must* reuse these intermediate results for different elements, thus reducing the number of multiplication used.

Precisely, we compute these intermediate results:

$$
\begin{align}
m_1 &= (a_{11}+a_{22})(b_{11}+b_{22}), \\
m_2 &= (a_{21}+a_{22})b_{11}, \\
m_3 &= a_{11}(b_{12}-b_{22}), \\
m_4 &= a_{22}(b_{21}-b_{11}), \\
m_5 &= (a_{11}+a_{12})b_{22}, \\
m_6 &= (a_{21}-a_{11})(b_{11}+b_{12}), \\
m_7 &= (a_{12}-a_{22})(b_{21}+b_{22}).
\end{align}
$$

Then we find $C=AB$ with

$$
\begin{bmatrix} c_{11} & c_{12} \\ c_{21} & c_{22} \end{bmatrix}
=
\begin{bmatrix}
m_1 + m_4 - m_5 + m_7 &
m_3 + m_5 \\
m_2 + m_4 &
m_1 - m_2 + m_3 + m_6
\end{bmatrix}.
$$

By reducing the number of multiplications to seven, the complexity is lowered to $O(n^{\log_27}) \approx O(n^{2.8})$.

The above system of equations can be complicated to understand. However, I found that [an explanatory picture on Wikipedia][wiki image strassen] helped me *visualize* the main concept of this algorithm. It's like a building block game where we need to build the correct building. Each building block occupies cells on a $4{\times}4$ table in the permutation grid between $A$ and $B$. We construct each $c_{ij}$ by selecting a combination of building blocks from $m_1$ to $m_7$.

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
> <script defer src="/scripts/strassen-matmul-block-game.js"></script>

While Strassen's algorithm seems to be only a slightly improvement, it marks a significant milestone that paved the path for the study of matrix multiplication algorithms. Over the past half-century, extensive research has been conducted in this area. (Even Strassen himself later purposed another faster algorithm, although his first algorithm is generally more well-known.) In the latest advancements in 2020, Josh Alman and Virginia Vassilevska Williams develop novel techniques that further reduce the complexity to $O(n^{2.3728596})$.



[divide and conquer]: //en.wikipedia.org/wiki/Divide-and-conquer_algorithm
[wiki image strassen]: //en.wikipedia.org/wiki/File:Strassen_algorithm.svg
