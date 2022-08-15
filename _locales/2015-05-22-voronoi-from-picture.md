---
title: Voronoi จากภาพ
tags:
  - Art
  - Geometry
  - Computational Geometry
  - Image Processing
  - Python
date: 2015-05-22 02:43:00 +0700
---

วันก่อนไปเจอ[คำถามใน Code Golf][code golf challenge] มา เค้าให้สร้าง Voronoi เพื่อเลียนแบบภาพต้นฉบับครับ

อ่านแล้วสนุกดี ผลงานของคนอื่นที่ได้ๆ ก็ดูเหมือนงานศิลป์พวก Divisionism/Pointillism ด้วย เลยลองกลับมาเขียนเองแบบมั่วๆ บ้าง 555

``` python
import random
from PIL import Image
from PIL.ImageFilter import FIND_EDGES, GaussianBlur, SHARPEN

def coordinate(width, height):
    yield from ((x, y) for y in range(height) for x in range(width))

def normalized(choices):
    lower = min(weight for _, weight in choices)
    upper = max(weight for _, weight in choices)
    norm = lambda weight: (weight-lower) + (upper-lower)//4
    return [((x, y), norm(weight)) for (x, y), weight in choices]

def random_by_weight(choices):
    rand_val = random.uniform(0, sum(weight for _, weight in choices))
    index = 0
    count = 0
    while count < rand_val:
        count += choices[index][1]
        index += 1
    return choices.pop(index-1)[0]

def init_centroids(image, cells):
    width, height = image.size
    edge_img = image.filter(FIND_EDGES).filter(GaussianBlur).filter(SHARPEN)
    weight = lambda x, y: 256 - max(edge_img.getpixel((x, y)))
    choices = [((x, y), weight(x, y)) for x, y in coordinate(width, height)]
    return [random_by_weight(normalized(choices)) for _ in range(cells)]

def init_rgbs(image, centroids):
    rgb_im = image.convert('RGB')
    return [rgb_im.getpixel((x, y)) for x, y in centroids]

def simulate_voronoi(image_path, cells=25, scale=None):
    image = Image.open(image_path)
    if scale is not None:
        image.thumbnail((scale, scale), Image.ANTIALIAS)
    centroids = init_centroids(image, cells)
    rgbs = init_rgbs(image, centroids)
    return image.size, list(zip(centroids, rgbs))
```

ผลลัพธ์ที่ออกมาก็ประมาณนี้ครับ (ที่ 500 เซลล์ Voronoi)

| ![][bear]             | ![][pearl-earing]     |
| ![][great-wave]       | ![][starry-night]     |
| ![][saturn]           | ![][andromeda-galaxy] |
| ![][circle-in-circle] | ![][composition-2]    |

เอาไปสู้เขาไม่ได้หรอก เพราะเขียนไปมั่วแบบคนไม่มีพื้นฐาน image processing อะไรเลย แต่ก็สนุกดีได้ลองใช้ PIL เป็นครั้งแรกด้วย


[bear]: /images/algorithm/voronoi/bear.png
[pearl-earing]: /images/algorithm/voronoi/pearl-earing.png
[great-wave]: /images/algorithm/voronoi/great-wave.png
[starry-night]: /images/algorithm/voronoi/starry-night.png
[saturn]: /images/algorithm/voronoi/saturn.png
[andromeda-galaxy]: /images/algorithm/voronoi/andromeda-galaxy.png
[circle-in-circle]: /images/algorithm/voronoi/circles-in-circle.png
[composition-2]: /images/algorithm/voronoi/composition-2.png

[code golf challenge]: //codegolf.stackexchange.com/questions/50299/draw-an-image-as-a-voronoi-map
