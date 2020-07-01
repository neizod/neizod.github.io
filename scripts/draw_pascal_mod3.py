#!/usr/bin/env python3


from math import factorial
from PIL import Image, ImageDraw


choose = lambda n, k: factorial(n) // factorial(n-k) // factorial(k)


class PascalMod3(object):
    def __init__(self, rows, radius):
        self.rows = rows
        self.radius = radius
        self.width = 1 + int(2*self.radius*self.rows)
        self.height = 1 + int(2*self.radius + (3**0.5)*self.radius*(self.rows-1))
        self.draw()

    def location(self, n, k):
        x = self.width/2 + 2*self.radius*k - self.radius*n
        y = self.radius + (3**0.5)*self.radius*n
        return x-self.radius, y-self.radius, x+self.radius, y+self.radius

    def color(self, n, k):
        return ['white', 'black', 'red'][choose(n, k) % 3]

    def draw(self):
        image = Image.new('RGB', (self.width, self.height), 'white')
        draw = ImageDraw.Draw(image)
        for n in range(self.rows):
            for k in range(n+1):
                draw.ellipse(self.location(n, k), self.color(n, k), 'black')
        image.save('pascal-mod3.png')



def main():
    PascalMod3(3**4, 24)


if __name__ == '__main__':
    main()
