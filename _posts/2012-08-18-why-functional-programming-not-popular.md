---
title: ทำไม Functional Programming ถึงไม่ได้รับความนิยม
tags:
- Programming
- Functional
- Ruby
- Python
- Haskell
- Shell
date: 2012-08-18 00:18:24 +0700
---

จากที่ [@lewcpe][] คอมเมนท์ไว้ในตอนก่อน เลยลองมานั่งนึกดูว่าทำไม functional programming ถึงไม่ได้รับความนิยมเท่าไหร่

คิดว่าสาเหตุใหญ่ๆ น่าจะเป็นเพราะปรกติแล้ว มนุษย์เราจะคิดการทำงานทาง `ซ้าย -> ขวา` คิดจากส่วนที่เล็กสุดออกไปยังระดับที่ใหญ่ขึ้นเรื่อยๆ เช่นเขียนโปรแกรมอย่างนี้

Shell:

{% highlight shell %}
echo 'hello to the old world' | tr ' ' '\n' | sort -r | paste -sd ' '
{% endhighlight %}

Ruby:

{% highlight ruby %}
puts 'hello to the old world'.split.sort.reverse.join ' '
{% endhighlight %}

แต่ในการเขียนโปรแกรมแบบ functional programming เวลาคิดถึงการทำงานจะเป็นในทิศทาง `ซ้าย <- ขวา` แทน ซึ่งขัดกับความรู้สึกของเรา

Python:

{% highlight python %}
print(' '.join(reversed(sorted('hello to the old world'.split()))))
{% endhighlight %}

Haskell:

{% highlight haskell %}
print (join " " . reverse . sort . splitOn " ") "hello to the old world"
{% endhighlight %}

เอาเป็นว่าถ้าไม่รู้มาก่อนว่าเจอโปรแกรมแบบนี้แล้วให้อ่านจากขวามาซ้าย รับรองว่างานนี้มีงงแน่ๆ

---

อีกเรื่องที่ยากคงเป็นเพราะไม่มี for/while loop มีแต่ recursion ให้ใช้ อันนี้สาย imperative ทำใจลำบากพอควรเลย

ส่วนเรื่องอื่นๆ อย่าง immutable คงไม่มีปัญหาเท่าไหร่ อันที่จริงถ้าไม่สนว่าจะ optimize กันสุดๆ ไม่ว่าจะเขียนด้วยภาษาอะไรก็ควรยึดเรื่องนี้ไว้หน่อย มันทำให้ bug งี่เง่าหายไปได้หลายตัวเลยหละ :3


[@lewcpe]: http://twitter.com/lewcpe
