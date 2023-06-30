---
title: แก้ระบบสมการเชิงเส้นด้วยดีเทอร์มิแนนต์
tags:
  - Linear Algebra
  - Mathematics
date: 2023-06-30 21:21:21 +0700
---

เวลาเรามีระบบสมการเชิงเส้น $n$ ตัวแปร เราสามารถจับมันมาเขียนให้อยู่ในรูปเมทริกซ์ $A\vec{x} = \vec{y}$ ได้ ซึ่งก็คือ

$$
\begin{bmatrix}
a_{11} & a_{12} & \cdots & a_{1n} \\
a_{21} & a_{22} &        & a_{2n} \\
\vdots &        & \ddots & \vdots \\
a_{n1} & a_{n2} & \cdots & a_{nn}
\end{bmatrix}
\begin{bmatrix}
x_1 \\ x_2 \\ \vdots \\ x_n
\end{bmatrix}
=
\begin{bmatrix}
y_1 \\ y_2 \\ \vdots \\ y_n
\end{bmatrix}
\tag{1}\label{eq:system-equations}
$$

ในทางปฏิบัติ (ที่มีการแทนค่า $a_{ij}$ เป็นตัวเลขมาเรียบร้อยแล้ว) เราก็แค่ทำ[การกำจัดแบบ Gauss-Jordan][gauss-jordan elimination] บนตัวเมทริกซ์ดังกล่าว นั่นคือเริ่มจากสร้าง[เมทริกซ์แต่งเติม][augmented matrix] $[A \mid \vec{y}]$ มาก่อน แล้วแก้เมทริกซ์จนฝั่งซ้ายกลายเป็น[เมทริกซ์เอกลักษณ์][identity matrix] เราก็จะได้ว่าฝั่งขวาของเมทริกซ์จะกลายเป็นคำตอบของระบบสมการนั่นเอง

$$
\left[
\begin{array}{cccc:c}
a_{11} & a_{12} & \cdots & a_{1n} & y_1 \\
a_{21} & a_{22} &        & a_{2n} & y_2 \\
\vdots &        & \ddots & \vdots & \vdots \\
a_{n1} & a_{n2} & \cdots & a_{nn} & y_n
\end{array}
\right]
\quad\xrightarrow{\text{row ops}}\quad
\left[
\begin{array}{cccc:c}
1      & 0 & \cdots & 0      & x_1 \\
0      & 1 &        & 0      & x_2 \\
\vdots &   & \ddots & \vdots & \vdots \\
0      & 0 & \cdots & 1      & x_n
\end{array}
\right]
$$

ในทางทฤษฎีที่เรามองว่า $a_{ij}$ เป็นตัวแปร เราก็ยังสามารถแก้เมทริกซ์ดังกล่าวจนไปถึงคำตอบได้อยู่ดี แต่ความแย่ก็คือคำตอบที่ได้จะติดตัวแปรยุบยับเต็มไปหมด -- พูดอย่างเจาะจงคือ ที่แต่ละคำตอบ $x_i$ จำนวนพจน์ที่บวกลบบนตัวแปร $a_{ij}$ ก็มีจำนวนเป็น $O(n!)$ พจน์แล้ว

อย่างไรก็ตาม คำตอบเชิงทฤษฎีที่ติดตัวแปรจำนวนมากเช่นนี้ก็ไม่ได้แย่ไปหมดซะทีเดียว เพราะมันก็ยังสามารถลดรูปลงมาให้~~จดจำ~~เข้าใจง่ายได้อยู่ โดยเราจะดึงเอาแนวคิดของการเขียนทับเมทริกซ์มาช่วย เราจะพูดว่าเมทริกซ์ $M$ ถูกแก้ไขค่าในหลักที่ $k$ ด้วยการนำเวกเตอร์ $\vec{v}$ เขียนทับลงไป ดังนี้

$$
M_{k:\vec{v}} = \begin{bmatrix}
m_{1,1} & \cdots & m_{1,k-1} & {\color{red}v_1}    & m_{1,k+1} & \cdots & m_{1,n} \\
\vdots  & \ddots & \vdots    & {\color{red}\vdots} & \vdots    & \ddots & \vdots \\
m_{n,1} & \cdots & m_{n,k-1} & {\color{red}v_n}    & m_{n,k+1} & \cdots & m_{n,n}
\end{bmatrix}
$$

เช่นนี้แล้วเราจะได้คำตอบของระบบสมการที่สรุปสั้นๆ ผ่าน[ดีเทอร์มิแนนต์][determinant]ได้ว่าคือ

$$
x_k = \frac{\det A_{k:\vec{y}}}{\det A}
\tag{2}\label{eq:cramer}
$$

ตัวอย่างเช่น $A$ เป็นเมทริกซ์ขนาด $2{\times}2$ เราจะได้

$$
\begin{align}
x_1 &= \det\begin{bmatrix} {\color{red}y_1} & a_{12} \\ {\color{red}y_2} & a_{22} \end{bmatrix}
     / \det\begin{bmatrix} a_{11} & a_{12} \\ a_{21} & a_{22}\end{bmatrix}
     = \frac{y_1a_{22} - y_2a_{12}}{a_{11}a_{22}-a_{21}a_{12}}
     , \\
x_2 &= \det\begin{bmatrix} a_{11} & {\color{red}y_1} \\ a_{21} & {\color{red}y_2} \end{bmatrix}
     / \det\begin{bmatrix} a_{11} & a_{12} \\ a_{21} & a_{22}\end{bmatrix}
     = \frac{a_{11}y_2 - a_{21}y_1}{a_{11}a_{22}-a_{21}a_{12}}
\end{align}
$$

การพิสูจน์ก็น่าจะมีหลากหลายวิธี แต่อันที่ผมไปเจอมาแล้วรู้สึกเข้าใจได้ง่ายสุดคงหนีไม่พ้น[คำตอบของคุณ Rene Schipperus][math.sx why cramer] ที่เริ่มจากการเปลี่ยน $\vec{x}$ ในสมการที่ $\eqref{eq:system-equations}$ ให้เป็นเมทริกซ์เอกลักษณ์ที่ถูกเขียนทับด้วย $\vec{x}$ แทน ซึ่งจะเห็นว่าเวกเตอร์ $\vec{y}$ เดิมด้านขวามือของสมการก็จะเปลี่ยนไปเป็นเมทริกซ์เช่นกัน

$$
\begin{bmatrix}
a_{11} & a_{12} & \cdots & a_{1n} \\
a_{21} & a_{22} &        & a_{2n} \\
\vdots &        & \ddots & \vdots \\
a_{n1} & a_{n2} & \cdots & a_{nn}
\end{bmatrix}
\begin{bmatrix}
       &   & {\color{red}\vdots}  &   & \\
       & 1 & {\color{red}x_{k-1}} & 0 & \\
\cdots & 0 & {\color{red}x_k}     & 0 & \cdots \\
       & 0 & {\color{red}x_{k+1}} & 1 & \\
       &   & {\color{red}\vdots}  &   & \\
\end{bmatrix}
=
\begin{bmatrix}
       &             & {\color{red}\vdots}  &             & \\
       & a_{k-1,k-1} & {\color{red}y_{k-1}} & a_{k-1,k+1} & \\
\cdots & a_{k,k-1}   & {\color{red}y_k}     & a_{k,k+1} & \cdots \\
       & a_{k+1,k-1} & {\color{red}y_{k+1}} & a_{k+1,k+1} & \\
       &             & {\color{red}\vdots}  &             & \\
\end{bmatrix}
$$

หรือก็คือ $AI_{k:\vec{x}} = A_{k:\vec{y}}$ นั่นเอง

ซึ่งเหตุผลที่เรา*เลือก*เอา $\vec{x}$ ไปเขียนทับบนเมทริกซ์เอกลักษณ์เช่นนั้น ก็เพราะว่า

$$
\det I_{k:\vec{x}} = x_k
$$

และก็เพราะว่าดีเทอร์มิแนนต์เป็น[ฟังก์ชันเชิงการคูณ][multiplicative function] จึงทำให้เราได้ข้อสรุปตามสมการ $\eqref{eq:cramer}$ ในที่สุด

ผลลัพธ์สมการ $\eqref{eq:cramer}$ นี้เรียกว่า[กฎของ Cramer][cramer's rule] และถึงแม้มันจะดูเรียบง่ายสวยงาม (จนไปถึงขั้นน่าทึ่งว่าอยู่ดีๆ ก็มีดีเทอร์มิแนนต์หลุดออกมาได้ไง) แต่ก็[มีคนให้ข้อสังเกต][math.sx determinant origin]ว่า ถ้าไล่ดูตามประวัติศาสตร์คณิตศาสตร์ตะวันตก ดีเทอร์มิแนนต์นี่เป็นผลลัพธ์โดยตรงจากการพยายามแก้ระบบสมการเชิงเส้นหลายตัวแปรตามข้างต้นเลย

และถ้าเรายังจำกันได้ว่า คำตอบของแต่ละ $x_k$ มันถูกเขียนอยู่ในรูปผลรวมที่มีจำนวน $O(n!)$ พจน์ นั่นเพราะจริงๆ แล้วค่า $\det A$ เป็นผลรวมที่แต่ละพจน์ถูกเขียนอยู่ในรูปของ $\prod_{k=1}^n a_{k,\ell_k}$ โดยที่ $\ell_u=\ell_v$ เมื่อและก็ต่อเมื่อ $u=v$ ดังนั้นมันก็คือการเรียงสับเปลี่ยนสิ่งของ $n$ ชิ้นที่มีวิธีที่แตกต่างกันทั้งหมด $n!$ แบบ ซึ่งตีความได้ว่าเมื่อเราหยิบ $a_{ij}$ มาใช้แล้ว เราจะไม่สามารถหยิบช่องอื่นในเมทริกซ์ตรงหลักที่ $i$ หรือแถวที่ $j$ มาใช้งานได้อีก (สะท้อนผ่าน[ไมเนอร์/โคแฟคเตอร์][minor matrix]ว่าทำไมเราถึงต้องทำลายหลักที่ $i$ และแถวที่ $j$ ทิ้ง) ส่วนการที่บางพจน์นั้นเป็นบวกหรือลบก็เป็นไปในทำนองเดียวกับหลักการเพิ่มเข้าและตัดออกเพื่อดุลค่าของเมทริกซ์นั่นเอง

รู้สึกว่าเป็นเรื่องที่ต้องมือเปื้อนด้วยตัวเองตั้งแต่ต้นถึงจะเก็ต ถ้าโผล่มาเจอนิยาม/สูตรดีเทอร์มิแนนต์เลยนี่โคตรงง ... จริงๆ อยากเอากระดาษทดตรงช่วงที่โซ้วสมการเมทริกซ์มาลงด้วย แต่คิดว่าปล่อยไว้เป็นการบ้านน่าจะเป็นผลดีกับผู้อ่านมากกว่า 5555555



[gauss-jordan elimination]: //en.wikipedia.org/wiki/Gaussian_elimination
[augmented matrix]: //en.wikipedia.org/wiki/Augmented_matrix
[identity matrix]: //en.wikipedia.org/wiki/Identity_matrix
[determinant]: //en.wikipedia.org/wiki/Determinant
[multiplicative function]: //en.wikipedia.org/wiki/Multiplicative_function
[cramer's rule]: //en.wikipedia.org/wiki/Cramer%27s_rule
[minor matrix]: //en.wikipedia.org/wiki/Minor_(linear_algebra)
[math.sx why cramer]: //math.stackexchange.com/a/1941606/26082
[math.sx determinant origin]: //math.stackexchange.com/a/1977593/26082
