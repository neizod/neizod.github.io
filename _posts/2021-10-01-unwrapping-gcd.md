---
title: $\gcd(a,b)=c \iff \gcd(da,db)=dc$
tags:
  - Mathematics
  - Number Theory
  - One-Liner
date: 2021-10-01 17:02:11 +0700
---

$$
dc = {\color{red}d} \gcd({\color{green}a},{\color{blue}b})
   = \left( \prod_{p \in \mathbb{P}} p^{\color{red}\delta_p} \right)
     \left( \prod_{p \in \mathbb{P}} p^{\min({\color{green}\alpha_p},{\color{blue}\beta_p})} \right)
   = \prod_{p \in \mathbb{P}} p^{\min({\color{red}\delta_p}+{\color{green}\alpha_p},
                                      {\color{red}\delta_p}+{\color{blue}\beta_p})}
   = \gcd({\color{red}d}{\color{green}a},{\color{red}d}{\color{blue}b})
$$
