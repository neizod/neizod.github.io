---
title: $\exists V {\subseteq} \lbrace v_1, \dots, v_n \rbrace \colon \sum V \equiv 0 \pmod{n}$
tags:
  - Number Theory
  - Mathematics
  - English Post
date: 2023-11-13 16:06:46 +0700
---

Last week I stumbled upon a nice little math problem: given a set of $n$ integers, show that there exists a nonempty subset $V \subseteq \lbrace v_1,v_2,\dots,v_n \rbrace$ such that $\sum V \equiv 0 \pmod{n}$.

Can you solve it? On the surface, this one feels intimidating --- there're $2^n$ subsets to consider. However, a nice simple technique made it as easy as a pie. So, maybe give it a shot?

{: .oversized .figure}
> ![](/images/math/pigeonhole.png)

**Solution**: Let $s_k$ be the sum of the first $k$ elements, that is

$$
s_k \equiv \sum_{i=1}^k v_i \pmod{n}.
$$

We are also allow an empty sum, $s_0=0$. Thus, there are $n{+}1$ sums. However, since we're working in $\mathbb{Z}/n\mathbb{Z}$, there are only $n$ distinct possible result. By [pigeonhole principle][], there must exists $s_i=s_j$ whose $0 \le i <j \le n $. Hence,

$$
s_j - s_i \equiv v_{i+1} + v_{i+2} + \cdots + v_j \equiv 0 \pmod{n}
$$

is an answer to the problem.


[pigeonhole principle]: //en.wikipedia.org/wiki/Pigeonhole_principle
