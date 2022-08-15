---
title: การเรียกตัวเองผ่านการปริพันธ์
tags:
  - Factorial
  - Recursion
  - Functional
  - Mathematics
date: 2012-09-13 14:24:00 +0700
---

ฟังก์ชัน[แฟกทอเรียล][factorial]นั้นมีนิยามง่ายๆ ตรงไปตรงมา นั่นคือ ผลคูณของจำนวนเต็มบวกตั้งแต่ $1$ ไปจนถึง $n$

``` haskell
factorial n = product [1..n]
```

ซึ่งถ้าสังเกตดูซักหน่อย จะพบว่ามันสามารถเขียนนิยามเป็น[การเรียกตัวเอง][recursion]ได้

``` haskell
factorial 1 = 1
factorial n = n * factorial (n - 1)
```

ตอนนี้เราอาจเพิ่มนิยามที่ว่า $0! = 1$ เพื่อความสะดวกในการกระจายพจน์สำหรับคำนวณความน่าจะเป็น

แต่ทั้งหมดนี้จะมีปัญหาอยู่อย่างนึง ตรงที่ทุกอย่างเป็น[คณิตศาสตร์บนจำนวนเต็ม][discrete math]หมดเลย นั่นคือเราไม่สามารถหาอะไรอย่าง $0.5!$ ได้

ถ้าดูจากที่มาและการใช้งานของมัน (ส่วนมากเป็นเรื่องความน่าจะเป็นนั่นแหละ) ก็อาจนับว่าไม่มีปัญหา แต่สำหรับนักคณิตศาสตร์บริสุทธิ์แล้ว มันก็น่าจะมีอะไรซักอย่างมาตอบคำถามตรงนี้ได้นะ

---

โชคดี (?) ที่เรามีเลขมหัศจรรย์อย่าง $e$ ซึ่งมีสมบัติประหลาดว่า

$$
e^x = \frac{d}{dx} e^x
$$

ดูๆ ไปแล้ว มันก็คล้ายกับ[คอมบิเนเตอร์จุดตรึงที่เคยพูดไว้ในตอนก่อนๆ][self y comb] เพียงแต่เปลี่ยนจากการเรียกฟังก์ชันเป็นการหาอนุพันธ์-ปริพันธ์แทน โดยมีจุดสิ้นสุดการเรียกตัวเองที่

$$
\begin{align}
\int_0^\infty \frac{1}{e^x} \;dx
&= - \frac{1}{e^\infty} + \frac{1}{e^0} \\
&= 1
\end{align}
$$

นี่ทำให้เราสามารถเขียนการเรียกตัวเองในรูปของการปริพันธ์ได้ เช่น

$$
\Gamma(n) = \int_0^\infty \frac{1}{e^t} t^{n-1} \;dt
$$

ลองดูสมบัติของมันโดยทำการปริพันธ์เข้าไป จะได้ว่า

$$
\begin{align}
\Gamma(n)
&= \int_0^\infty \frac{1}{e^t} t^{n-1} \;dt \\
&= \int_0^\infty u \;dv
   & \text{let}\; u = \frac{1}{e^t}, dv = t^{n-1} \;dt \\
&= \left[ uv \right]_0^\infty - \int_0^\infty v \;du \\
&= \frac{1}{n} \left( \lim_{t \to \infty} \frac{1}{e^t} t^n - \frac{1}{e^0} 0^n \right) - \int_0^\infty v \;du \\
&= 0 - \int_0^\infty v du \\
&= \frac{1}{n} \int_0^\infty \frac{1}{e^t} t^n \;dt \\
&= \frac{\Gamma(n+1)}{n}
\end{align}
$$

ดังนั้น จะเห็นว่า

$$
\begin{align}
\Gamma(1) &= 1 \\
\Gamma(n) &= (n-1) \Gamma(n-1) \\
          &= (n-1)(n-2) \Gamma(n-2) \\
          &= \cdots
\end{align}
$$

ซึ่งก็คือ

$$
n! = \Gamma(n+1)
$$

---

ถึงตอนนี้ก็คงตอบคำถามได้แล้วว่า $0.5!$ นั้น สามารถหาค่าได้จาก

$$
\begin{align}
\Gamma(1.5) &= \frac{1}{2} \Gamma\left(\frac{1}{2}\right) \\
\Gamma(0.5) &= \int_0^\infty \frac{1}{e^t} \frac{1}{\sqrt t} \;dt \\
            &= 2 \int_0^\infty \frac{1}{ e^{u^2} } \;du
               & \text{let}\; du = \frac{1}{\sqrt t} \\
            &= \int_{-\infty}^\infty \frac{1}{ e^{u^2} } \;du \\
            &= \sqrt\pi \\
\Gamma(1.5) &= \frac{\sqrt\pi}{2}
\end{align}
$$

ตอนพยายามหาค่าของ $\Gamma(0.5)$ ต้องใช้ความรู้เรื่องการหาปริพันธ์สองชั้นและการแปลงระนาบเข้าช่วย ถ้ายังมีพลังลุยต่อวิดีโอนี้น่าจะช่วยอธิบายเพิ่มได้

<iframe width="853" height="480" src="https://www.youtube.com/embed/fWOGfzC3IeY" frameborder="0" allowfullscreen></iframe>

ข้อดีของการเขียนในรูปปริพันธ์นี่มีอีกอย่าง คือถ้ารู้สึกว่าพิสูจน์ห่าค่าตรงๆ แบบนี้มันยากไป จะเลี่ยงไปใช้[ปริพันธ์แบบรีมันน์][Riemann integral]เพื่อประมาณค่าแทนก็ย่อมได้ครับ



[self y comb]: /2012/08/22/what-is-y-combinator.html

[factorial]: //en.wikipedia.org/wiki/Factorial
[recursion]: //en.wikipedia.org/wiki/Recursion
[discrete math]: //en.wikipedia.org/wiki/Discrete_mathematics
[Riemann integral]: //en.wikipedia.org/wiki/Riemann_integral
