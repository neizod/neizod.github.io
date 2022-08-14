---
title: Selected Speed Solution for Opus Magnum
tags:
  - Chemistry
  - Game
  - Puzzle
  - Optimization
  - Zachtronics
  - English Post
date: 2022-08-14 20:17:24 +0700
thumbnail: /images/game/opus-magnum/static-magic-ink.png
---

Opus Magnum is a game about *al*chemistry, which is a cryptic academic discipline in the renaissance era. Unlike [MOLEK-SYNTEZ][self molek-syntez] (that focus on nowadays organic chemistry), this game consider the four basic *western* elements: earth (🜃), wind (🜁), fire (🜂), and water (🜄); alongside with metals and the neutral salt (🜔) to create any compound of our need. I've put some of my speedy-yet-satisfy-to-watch solutions here in the hope that it might lure you to fall in love with this game. ⚠️ Lots of large images and spoilers ⚠️


## Refined Gold

The first puzzle (apart from the tutorial) ask us to turn metals into gold. Which is done by (re)applying quicksilver (☿) again and again to turn lead (♄) into tin (♃) into iron (♂) into copper (♀) into silver (☾) and finally into gold (☉).

![](/images/game/opus-magnum/refined-gold-210-62-21.gif)


## Mist of Incapacitation

This one ask us to combine the air element with metals, specifically quicksilver and tin. The throughput is at maximum since we have to convert lead into tin first, thus pulling two air and two quicksilver per loop and then ship the product in just the next two cycles.

![](/images/game/opus-magnum/mist-of-incapacitation-240-26-28.gif)


## Explosive Phial

I have a lot of joy arranging this one into the shape of a butterfly! Well... I mean the product require to be three marbles, but we only have two input marbles. It looks like a terrible optimizing idea to make one product at a time using both input. So why don't have two separate mini-machines that use only one input each?

![](/images/game/opus-magnum/explosive-phial-400-22-56.gif)

## Airship Fuel

Huge one. This time it ask for four marbles product, while giving three input marbles. Which I find that making two unidentical mini-machines result in the fastest overall machine.

![](/images/game/opus-magnum/airship-fuel-535-19-45.gif)

## Rocket Propellant

Another one with the odd/even product/input. Five marbles are required but two marbles are given at a time. It... kinda *ugly* compare to my other solutions. But the pinnacle of this solution is that it *was* the cheapest design with the maximum throughput on reddit's community leaderboard (standing for half a day then beaten by another player 😂).

![](/images/game/opus-magnum/rocket-propellant-275-33-74.gif)

## Invisible Ink

Like the butterfly one that I can mirror mini-machines. However this one require distinct elements in detail (the element of life and dead). I feel like this one looks like the black magician somehow.

![](/images/game/opus-magnum/invisible-ink-460-50-52.gif)

## Water Purifier

It's a monstrous monster making water-snack with million hands then eats. Chomp chomp!

![](/images/game/opus-magnum/water-purifier-470-45-59.gif)

## Voltaic Coil

The *infinity* puzzle. This one is not the fastest possible on the leaderboard. But I suspect that trying to make this kind of puzzle go faster would destroy the aesthetic of the machine, so I gave up optimizing more.

![](/images/game/opus-magnum/voltaic-coil-280-58-83.gif)

## Climbing Rope Fiber

And by optimizing the infinity puzzle, I hack this one to go faster by moving the finished product to the output section asap. Then move the product back to bond with the newly created part. Yuck, it kinda ugly, but its also lands me on the top 1% leaderboard.

![](/images/game/opus-magnum/climbing-rope-fiber-260-75-54.gif)


## Salty Separation

Done with the main game and not yet satisfy? Go grab one of my puzzle over Steam's workshop. Yes, I design it with the *fastest* way to optimize in mind.

![](/images/game/opus-magnum/salty-separation-200-9-16.gif)


## Ravari's Wheel

The first kind of bonus puzzle, which are not that hard, but it just don't fit in the story (well... this game has a good *love* story). Though I can make this the fastest and having a nice looking, but I think the back-and-forth rotation is kinda wrong. Maybe there should be a way to rotate the wheel in only one direction?

![](/images/game/opus-magnum/ravari-wheel-350-98-41.gif)

## Rat Poison

But what's excite me more is the second kind of bonus puzzle where the machine's size does matter. The difficulty is spiked from normal puzzles with infinite playfield. Luckily, It still relatively easy for me since I encounter puzzles with lots of space constraint before (looking at you, SpaceChem). Unluckily, I don't think this one is the most optimized yet.

![](/images/game/opus-magnum/rat-poison-435-75-150.gif)


## Hexstabilized Salt

Since the bonus puzzle has limit the size of the machine already, there's no point in reducing the size furthermore. Thus enable a new way to play by optimizing code length instead! That is we have to think in term of loop with the excess unprocessed marbles lying around. Like this one that the GIF doesn't capture the full loop, but you can guess that we'll build another hex-salt on the left side with an exceeding water marbles.

![](/images/game/opus-magnum/hexstabilized-salt-170-281-33.gif)



[self molek-syntez]: /2022/07/07/my-molek-syntez-solutions.html
