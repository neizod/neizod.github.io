---
title: Coffee → Code
tags:
  - Brainfuck
  - English Post
date: 2021-10-02 21:39:44 +0700
---

Hacktoberfest again! It's time to help the world became a better place by contributing opensource repos. This year I'll start with a fun little puzzle from [@narze][] that ask to [change Coffee into Code][coffee to code repo]. Which should be super duper (too) easy 😂

Well, let's make it *fun* also. Ditch the mainstream daily life language (those Python, C++) and just follow the early Google Code Jam philosophy that's allow esoteric language. So, let's Brainfuck again! (though I've [use it just once][self code jam brainfuck] lol)

```
PART 1 INIT THE WORD COFFEE
===========================
++++ ++++ ++++ ++++     work with hexadecimal
[                       this loop will init 6 chars closest to coffee
  > ++++                add 2 plus in this line to lower 1st char
  > ++++ +++            or delete 2 plus onward to upper all chars
  > ++++ ++
  > ++++ ++
  > ++++ ++
  > ++++ ++
<<<< << - ]             condition to exit the dowhile loop
> +++                   adjust @ to c
> -                     adjust p to o
> ++++ ++               you
> ++++ ++               get
> ++++ +                the
> ++++ +                idea
[<]                     reset head
>[.>]<[<]               print the initial word / this line can be omitted


PART 2 CONVERT COFFEE TO CODE
=============================
>                       skip the c
>                       skip the o
> --                    change 1st f to d
> [-]                   remove 2nd f
> [-]                   remove 1st e
> [-<<+>>]              move 2nd e to the back of previous d
<<[<]                   reset head
>[.>]<[<]               print the final word after conversion
```

Inspecting it worth a million words. So go try it at [fatiheriki.github.io/brainfuck-visualizer][visualize brainfuck].


[self code jam brainfuck]: /2016/04/10/code-jam-2016-qualification.html

[@narze]: //twitter.com/narze

[coffee to code repo]: //github.com/narze/coffee-to-code/
[visualize brainfuck]:  //fatiherikli.github.io/brainfuck-visualizer/#KysrKyArKysrICsrKysgKysrKwpbCiAgPiArKysrCiAgPiArKysrICsrKwogID4gKysrKyArKwogID4gKysrKyArKwogID4gKysrKyArKwogID4gKysrKyArKwo8PDw8IDw8IC0gXQo+ICsrKwo+IC0KPiArKysrICsrCj4gKysrKyArKwo+ICsrKysgKwo+ICsrKysgKwpbPF0KPlsuPl08WzxdCgoKPgo+Cj4gLS0KPiBbLV0KPiBbLV0KPiBbLTw8Kz4+XQo8PFs8XQo+Wy4+XTxbPF0=

