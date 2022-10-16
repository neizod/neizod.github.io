---
title: "while True: learn()"
tags:
  - Puzzle
  - Game
  - Review
  - Rant
  - English Post
date: 2022-09-06 22:01:00 +0700
origin:
  - name: Steam
    url: //steamcommunity.com/id/neizod/recommended/619150/
---

It's.......... like something doesn't added up.

{: .figure}
> ![](/images/game/cover/while-true-learn.jpg)

Before anything, this is NOT a programming game. Not in the conventional sense. It is, otherwise, a fuzzy-logic puzzle game. So prepare to be disappointed if you think you gonna learn some real-world programming concept from it.

It's also NOT a machine learning game either. Not in an *understandable* sense. Since everything you'll do is drag-and-drop *built-in machine learning function* (called node in this game) onto the screen and just wired them together to produce a desirable output. But the matter of HOW those functions work are left as an exercise to the player. Literally. Since at one point in the game, there's a message says:

{: .quote}
> Learn how it works (Warning, Maths, integrals, derivatives and other scientific word inside)
>
> LINK_TO_RANDOM_ARTICLE_OR_VIDEO_ON_THE_INTERNET
>
> while True: learn()


Math is already a hard subject, you don't have to make it scary (and isn't it YOUR job in the first place to try teaching these concepts via the game you create).

It's like you're start with a grand premise "learn how machine learning really works!", but then fail to even show what's behind the curtain.

For comparison, it's like saying "learn to build a car", then just give us a few simple LEGO System parts consisting of wheels, plates, and a minifigure!

Wheck! Some advance LEGO Technic sets even give us a lot of *real-world-engineering* details to build, such as V8 engine, differential, suspension, even sometimes a complex 8-speed gearbox!

That's fine. That's fine. Real world programmer *blindingly* implement machine learning with these ready-to-use tools in the same manner as this game anyway, right?

Well consider this. The game does measure things around *speed*, not *accuracy*.

Furthermore, the level design does revolve around the concept of three-star scoring. That is, build a machine that solve this level in 30 seconds to gain three stars, 40s for two, 50s then just one. But if the machine take longer than 1 minute then mission fail!

Oh boi, how can it be more wrong than this...

Apparently, player can buy upgrades to make their computer faster. So it's not depend on player's BRAIN anymore in order to solve the puzzle *efficiently*.

Secondly, who the well drawn the line between how many stars should we get. A *God*???

The star system is so broken since it suggest one and only one thing: the developer already know what's the *best* solution to tackle on a specific level. So they design the level to be efficiently solvable based on their envision. That's break immersion from the real-world puzzle (research, if you may) that we don't even know if we can *keep pushing* for a guaranteed improvement or not!

Take a look at Zachtronics, they themselves don't even know the most optimized way to solve their own designed puzzle. Their job is just only ensuring that there're at least one way to solve a level. Then the rest is up to the leader-board generated later by the community. So build your machine as slow as you like if you just want to progress, or spend lots of time optimize it so you feel proud of yourself being in the top percentile on the histogram. It's all up to you!

Zach's games, despite branding as "fake programming", actually teach us real world programming concepts! Especially when you aim to go faster by a magnitude. You have to actually go learning about real world optimization techniques. For example, a loop unrolling, like Duff's device.

Thus bring us to the most unforgivable point arose from the star system this game implemented. Which is it sometimes force us to do premature optimization, seeing that the level only need to be shaved another couple seconds in order to succeed.

What's programming aspects will players earn by this design? Not surprise if they're not learning anything. Instead they just fiddle around, rewire this to that, or even mess up with the PRNG's seed so that the puzzle *might* luckily be fast enough to satisfy the requirement. (Yet players will never know *why* it is faster.)

{: .figure}
> ![](/images/meme/my-code-works-i-dont-know-why.png)
>
> The meme about bad programmer -- sorry I lost track of image's origin

I'd rather say that's a dangerous seed (no pun intended!) to plant into the minds of us future programmer/people. Hence a deterministic thumb down.