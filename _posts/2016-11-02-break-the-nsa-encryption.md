---
title: Break the NSA Encryption
tags:
  - Cryptography
  - Number Theory
  - Hacking
  - Puzzle
  - Exploit
  - English Post
date: 2016-11-02 06:20:06 +0700
origin:
  - name: Gist
    url: //gist.github.com/neizod/a0389fa0364e3ebeada6bcfb7a1cfcbb
---

[Challenge on Gist][] from [this Facebook Post][] provide an interesting question on cracking the NSA encryption. Doesn't this hook you enough? Let's roll. :D

Note, you can also test the validity of logic in this file with the command:

``` shell
$ python3 -m doctest this-file.md --verbose
```


Preamble
--------

This section is just a math function/constant defined for easy to use later.

Even though, you should not proceed until you know how it works? Why it necessary?

``` python
>>> from collections import Counter
>>> from itertools import product as cartesian_product

>>> def singleton(f):
...     return f()

>>> @singleton
... def primes(bound=10**6):
...     sieve = [True] * bound
...     sieve[0] = sieve[1] = False
...     cur = 0
...     while cur < bound:
...         if sieve[cur]:
...             for idx in range(2*cur, bound, cur):
...                 sieve[idx] = False
...         cur += 1
...     return [idx for idx, is_prime in enumerate(sieve) if is_prime]

>>> def factorized(number):
...     if number == 1:
...         yield 1
...     for prime in primes:
...         if prime**2 > number:
...             break
...         while number % prime == 0:
...             yield prime
...             number //= prime
...     if number > 1:
...         if prime**2 > number:
...             yield number
...         else:
...             raise ValueError('Number too big to be factorized.')

>>> def product(numbers, initial=1):
...     for number in numbers:
...         initial *= number
...     return initial

>>> def divisors(factors):
...     factor_set = ({p**i for i in range(k+1)} for p, k in Counter(factors).items())
...     return sorted(product(c) for c in cartesian_product(*factor_set))
```


Introduction
------------

### Let There Be Let

1.  Message $C$ is a cipher text that we (sneaky) see it (naughty you :P).
2.  Message $P$ is a plain text that we want to find.
3.  $E$ is a encrypt function that maps $P \to C$, in other word $E(P) = C$.
4.  $D$ is a decrypt function that works in reversed way of $E$. i.e., $D(E(P)) = P$.
5.  $K$ is a key to make function $E$ and $D$ stronger. It can be use in addition to those function as $E(P, K) = C$.

### What We Already Known

Message $C$ is what we got, it is a huge number represent in base 10 with length of 609 chars.

``` python
>>> C = 434384569820012709749978085023147407174684824178941182826833799495931410023794845922767533429746537016995520506439457550763575993604402054742042654701475990703513534158579743446096171193503041071008550601683001839024513922875537448251544812606790879783442587227277601837740236112564627038091170167413493638174350319534049389495771259593223970367601200671312435588244337256711215093040169407379877379400242759675821842258110296156050808143302683071999772732555638568114446076107646435540182476596386155629693774180289540430199704239923354089531930534807431109632462125230336414045829798557815327441670222304200
```

We precisely know how $E$ works: Let message $P$ has length of $n$ chars (index of each char in $P$ starts from $1$ to $n$ for convenient). Then $C$ can be computed with:

$$
E(P, K) = \ord(p_1) K^n + \ord(p_2) K^{n-1} + \ord(p_3) K^{n-2} + \cdots + \ord(p_n) K^1
$$

Where $\ord$ is a function that maps ASCII char to integer.

``` python
>>> def E(P, K):
...    C = 0
...    for p in P:
...        C += ord(p)
...        C *= K
...    return C
```

From here, we can easily see that the decrypt algorithm is:

``` python
>>> def D(C, K):
...     P = ''
...     while C:
...         C //= K
...         P = chr(C%K) + P
...         C -= C % K
...     return P
```


Speculation
-----------

### Key range

Assume original message $P$ has length of 32 chars. Now, for simplicity of concrete example, let just assume that all $\ord(p)$ in $P$ is 1. By analyzing the encryption function, we see that:

$$
K^{32} + K^{31} + K^{30} + \cdots + K^1 = C
$$

Since $K^{32}$ is very much larger than $\sum_{i=0}^{31} K^i$, we may say that:

$$
K = \sqrt[32]{C}
$$

Approximate result from this roughly calculation is:

$$
K \approx 10.470 \times 10^{18}
$$

**Note:** this is not the final answer, just compute it to see how large the number can be.

Assume original message $P$ is also has format of MD5, hence only ASCII char that can represent hex are allowed. Which tells us that valid char range are `0-9`, `a-f`, and `A-F`. These translated with $\ord$ function to the interval values of $[48,57]$, $[97,102]$, and $[65,70]$, respectively. Consider worst case where answer use the lower `a-f`, each $\ord(p)$ from $P$ can be ranged from $[48,102]$.

Assume every char in $P$ is `0`, its $\ord$ value is $48$, and $K_u$ is an upper bound of the key:

$$
\begin{align}
48 K_u^{32} + 48 K_u^{31} + \cdots + 48 K_u &= C \\
                                48 K_u^{32} &\approx C \\
                                        K_u &\approx \sqrt[32]{C \over 48} \\
                                            &\approx 9.280 \times 10^{18}
\end{align}
$$

``` python
>>> Ku = 9280 * 10**15
```

Assume every char in $P$ is `f`, its $\ord$ value is $102$, and $K_\ell$ is a lower bound of the key:

$$
\begin{align}
102 K_\ell^{32} + 102 K_\ell^{31} + \cdots + 102 K_\ell &= C \\
                                        102 K_\ell^{32} &\approx C \\
                                                 K_\ell &\approx \sqrt[32]{C \over 102} \\
                                                        &\approx 9.060 \times 10^{18}
\end{align}
$$

``` python
>>> Kl = 9060 * 10**15
```

So basically, if you select a key $K$ that *is not* satisfy with $K_\ell \le K \le K_u$. Then we'll never got to the answer because $E(P, K) \ne C$ for every possible $P$.

### Possible Keys

Take a look at the encrypt function, we see that:

$$
\begin{align}
E(P, K) &= \ord(p_1) K^n + \ord(p_2) K^{n-1} + \cdots + \ord(p_n) K^1 \\
        &= \left( \ord(p_1) K^{n-1} + \ord(p_2) K^{n-2} + \cdots + \ord(p_n) \right) K
\end{align}
$$

This may be the weakest link of the function that allow us to attack. It tell us that $K$ must be divisor of $C$. In other word, $0 \equiv C \pmod{K}$.

We need prime number ups to the largest possible $K$, $K_u = 9.280 \times 10^{18}$. Unfortunately, computation that much primes is impossible nowadays. The best we can do here is to find as much factors as possible.

``` python
>>> it = factorized(C)
>>> factors = []
>>> try:
...     while True:
...         factors += [next(it)]
... except ValueError:
...     pass

>>> factors
[2, 2, 2, 3, 5, 5, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 41, 106903]
```

The remaining number may be a large final prime, or may be it can be factorized further. We can ignore this number, as long as every factors from it is larger than $K_u$ (we don't know whether this hold, but let's say it do). In case you wonder, that giant monstrous number whose survive the factorize process is:

    1198162896844627574951254304167077865137441451269873420210823707907632078858692758046877232069029631575824857410083756805246859463940310819141386606731750942905572044682630074951510603667141665966096621398351556391207139334515227387293097732317039812158636295421558919175442502050687175932172864893273289106253699350521598092326361993640396143041026264695563620680179489564427544445897926837177366506825782997292755798068057150593688470132473887043210442755344189289139842977367860902098509084703400379089529999185583555055563981243234518434795150565878268478914709009755243001770283983741

Next is to find all of the divisors of $C$, for example:

- $2$ is a divisor of $C$, since $2$ is one of its factors.
- $2^3 = 8$ is a divisor of $C$, since $2$ occur three times in the factors.
- $2^2 \times 13 \times 41 = 2132$ is also a divisor of $C$, same idea as above.

Then we will filter only divisors that falls in the key range.

``` python
>>> Ks = [k for k in divisors(factors) if Kl < k < Ku]

>>> Ks
[9063554107792192905]
```

Luckily enough, only one possible key shows up here! So now we'll take that key as the key to the answer. (If this key failed, then more brain power to be put in this challenge :p)


Result and Discussion
---------------------

### Unfold to Plain Text

Now we have a key $K$, it's time to retrieve original message $P$.

``` python
>>> K = Ks[0]
>>> D(C, K)
'e0d00b9f337d357c6faa2f8ceae4a60d'
```

Looks like MD5 hash.

### The Real Answer

Try hashing every words in your English dictionary to see which word maps to that hash, if you want to have some more fun (and make you feel like you just conquer the hacker's world). Otherwise just ask rainbow table anywhere on the internet.

**Spoiler alert!**

``` python
>>> from hashlib import md5
>>> md5('cryptography'.encode()).hexdigest() == D(C, K)
True
```

### Summary

By best practice, the key must be large prime in order to be uncrackable. However, we're very lucky that 1.) the key is a composite number, 2.) we know the length of the original plain text 3.) the character space used in plain text is very narrow. These flaws allow us to break the code in no time, though some aspect of the methodology may looks weird and unscalable. Thanks for a good puzzle. ;)


[Challenge on Gist]: //gist.github.com/anonymous/7d19a35c54e7dac40fa1a470df4a209a
[this Facebook Post]: //facebook.com/longhackz/photos/a.1560357644219017.1073741828.1559669844287797/1753068201614626/
