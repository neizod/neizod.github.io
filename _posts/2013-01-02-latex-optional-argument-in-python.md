---
title: ทำ Optional Argument แบบ $\LaTeX$ ใน Python
tags:
  - Object-Oriented
  - Functional
  - Mathematics
  - Python
  - LaTeX
date: 2013-01-02 03:58:00 +0700
---

command ใน $\LaTeX$ นั้นมีวิธีเรียกใช้ที่ต่างจากภาษาโดยทั่วไปอยู่บ้าง ลองดู

{% highlight latex %}
\sqrt{x}
\sqrt[3]{x}
{% endhighlight %}

อันด้านบนจะวาด $\sqrt{x}$ (รากที่สองของ $x$ --- โดยปรกติ รากที่สองไม่จำเป็นต้องมีเลข 2 กำกับ) ส่วนอันล่างจะวาด $\sqrt[3]{x}$ ออกมา

รูปร่างของ syntax ที่น่าสนใจคือ ส่วนที่เป็น optional argument จะถูกเรียกขึ้นมาก่อน main argument แถมยังใช้วงเล็บแยกกันอีก นี่ทำให้การ [currying][] เป็นไปได้อย่างง่ายดาย

{% highlight latex %}
\newcommand{\cbrt}{\sqrt[3]}
...
\cbrt{x}
{% endhighlight %}

จริงๆ แล้วทาง math ก็มีฟังก์ชันในแนวคิดนี้อยู่เยอะ อย่างเช่น [$\sigma_{x}(n)$][divisor function] ซึ่งเขียนแบบนี้แล้วเข้าใจง่ายกว่า $\sigma(n, x)$ และยังไม่สับสนอีกว่า argument ตัวไหนที่ควรเป็น $n$ หรือ $x$ กันแน่

แล้วถ้าอยากได้แบบนี้ใน Python บ้าง? ง่ายนิดเดียวเพราะใช้เทคนิคเดียวกับ [Infinite List][self-ref infinite list] นั่นเอง

{% highlight python %}
@singleton
class sigma:
    def __call__(self, n, x=1):
        if n == 1:
            return 1
        return product( sum((k**x)**i for i in range(v+1))
                            for k, v in Counter(factor(n)).items() )
    def __getitem__(self, x):
        def partial_sigma(n):
            return self(n, x)
        return partial_sigma
{% endhighlight %}

คราวนี้จะเขียน

{% highlight python %}
6 == sigma[1](6) - 6
{% endhighlight %}

หรือกระทั่ง

{% highlight python %}
tau = sigma[0]
...
[tau(i) for i in range(return 1, 10)]
{% endhighlight %}

ก็ย่อมได้


[currying]: http://en.wikipedia.org/wiki/Currying
[divisor function]: http://en.wikipedia.org/wiki/Divisor_function
[self-ref infinite list]: http://neizod.blogspot.com/2012/08/infinity-list-python.html
