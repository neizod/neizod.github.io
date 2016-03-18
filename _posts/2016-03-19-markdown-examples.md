---
title: Markdown by Examples
tags:
  - Markdown
  - Example
date: 2016-03-19 05:25:32 +0700
---

This post show result from various Markdown techniques. To learn more, see file at `_post/2016-03-19-markdown-examples.md` for source.


Text
----

**Lorem ipsum** dolor sit amet, consectetur adipiscing *elit*. Proin blandit eros sapien, ***pharetra egestas justo pellentesque vel***. Ut rutrum, `ex vel fringilla interdum`, arcu turpis euismod odio, id molestie lectus lectus sit amet velit. <del>Donec suscipit consectetur sagittis.</del> Praesent quis varius nibh, vel luctus metus. Praesent egestas nisl eget nisl tempus molestie. Cras at finibus purus. Aenean porttitor efficitur dui ut iaculis.


Quotes
------

> Nulla sit amet consectetur augue. Quisque sed dolor purus.
> Nulla magna est elit. Quisque gravida.
>
> -- Ignotus Philosophus


List
----

1. Fusce sodales eros ac sagittis fermentum.
  0. Etiam hendrerit urna nec velit gravida, sit amet facilisis diam hendrerit.
  0. Duis eu est tristique, sollicitudin velit lobortis, tincidunt orci.
2. Morbi et nibh eu nulla pretium aliquet.
3. Nam posuere arcu et congue commodo.
  - Donec ultrices odio vitae consectetur tempor.
  - Donec blandit dolor et arcu hendrerit ultricies.
  - Donec ac mi a enim iaculis luctus sed a felis.
4. Quisque non mauris feugiat, tempus lectus sed, hendrerit odio.


Link
----

- <https://example.com>
- [Example][]
- [Another Example][Example]
- [Yet Another Example](https://example.com)

[Example]: https://example.com  "haha gotcha!"


Image
-----

![800px x400px]({{ site.baseurl }}/images/800x400.png)


Table
-----

| Codice | Curabitur                 | Nos |
|:------ |:-------------------------:| ---:|
| Alpha  | libero et diam facilisis. |  23 |
| Beta   | vulputate quam ac.        |  42 |
| Pi     | semper eget sit amet mi.  | 314 |


Code
----

{% highlight haskell %}
factorial :: Integer -> Integer
factorial =
    let tailfact acc 0 = acc
        tailfact acc n = tailfact (n * acc) (n - 1)
    in  tailfact 1
{% endhighlight %}


Math
----

Inline math $ e^{\pi i} + 1 = 0 $, and display math:

$$
    \sum\limits_{k=0}^{n-1} e^{2\pi ik/n} = 0
$$
