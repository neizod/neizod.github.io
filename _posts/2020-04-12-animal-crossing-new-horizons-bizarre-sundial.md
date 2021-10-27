---
title: Animal Crossing New Horizons' Bizarre Sundial 
tags:
  - Astronomy
  - Experimental
  - Game
  - English Post
date: 2020-04-12 21:47:13 +0700
thumbnail: /images/game/acnh/sundial.jpg
origin:
  - name: Twitter
    url: //twitter.com/neizod/status/1249079170820268032
---

Shadow casting is not an easy task to process.  A very realistic shadow rendering in a 3D modeling program requires great resources and a lot of computation time.  It is unsurprising that even the top-rated games from just two decades ago, such as [Half-Life][] and [The Sims][], do not have shadow rendering in their games.

The same goes with prior titles in the Animal Crossing series too.  Despite difficulties and limitations, developers wriggled around with various techniques to capture the feeling of shadow, such as showing a simple static circle under an object as a fake shadow.

<iframe width="853" height="480" src="https://www.youtube.com/embed/sRWjpjNVOCM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

When the New Horizons' trailer launched, fans (or was it just me?) went wild just by seeing not only a detailed shadow works but also changeable in size and direction too (3:37-3:45 in the above video).

So I started tracing shadow during different times of the day, hoping to make an in-game sundial that is close to one in real life, turned out only to discover a weird phenomenon behind the scene!

{: .oversized .figure}
> ![](/images/game/acnh/sundial.jpg)
>
> My prototype sundial in Animal Crossing: New Horizons

As seen from the picture above, the weird thing is that the sun moves super fast around midday, contradicting the real life sundial where each interval is almost the same size ([example from Wikipedia][wiki sundial]).

So shadow casting from the sun in this game is unrealistic.  However, I think this is not a technical issue, but the developer intended to make it this way!  Because the gimmick of Animal Crossing series is to experience the game with the same clock in real life!  So if we play it in the morning, the sun will be on the right side of screen; if we come back later after dinner, then it will be night time in the game too.

The gimmick is great, but might pose some threats to office workers!?  Imagine that we are a 9-to-5 person, what time would we be free to play this game?  I can see it as 4 possibilities:

1. Morning: not right out of the bed, but when commuting to work.
2. Noon: grab some lunch and make a quick check on our island.
3. Evening: another short play while commuting back home.
4. Night: a long play before we hit the hay.

Commuting-play in the morning and evening is not a problem since the playtime is usually limited by the trip.  And we can play almost unlimitely at night until we get drowsy anyway.  So the most interesting portion is around noon.  Take a look at the 11:30 to 12:30 interval, if the game treats shadow casting from the sun realistically, we might not notice the shift of shadow from east to west.  Since we hardly observed changes, we might not feel accomplished playing at noon.  This might makes us yearning to play more and cost us to going to work late.

So the game exaggerates this interval, makes the shadow shift real quick around noon.  Therefore it is easier for us to feel and beware of time change...  Well, at least that's my guess, I don't know if I got it right or not, but overall, I think this is a nice touch.

{: .figure}
> ![](/images/game/acnh/patterns.jpg)
>
> My custom design for April's sundial

For anyone interested to install this sundial, grab my custom design at `MA-0191-5786-4622` and place them on the ground like this:

| (-2,+3) | (-1,+3) | (0,+3) | (+1,+3) | (+2,+3) |
| (-2,+2) | blank   | blank  | blank   | (+2,+2) |
| (-2,+1) | blank   | blank  | blank   | (+2,+1) |
| blank   | blank   | blank  | blank   | blank   |

Be caution that the sundial with this design needs to be adjust monthly.


[Half-Life]: //en.wikipedia.org/wiki/Half-Life_(video_game)
[The Sims]: //en.wikipedia.org/wiki/The_Sims_(video_game)

[wiki sundial]: //en.wikipedia.org/wiki/File:Garden_sundial_MN_2007.JPG
