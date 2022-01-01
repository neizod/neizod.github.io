#!/usr/bin/env python3

import numpy as np
import matplotlib.pyplot as plt


def center_of_mass(x1, y1, m1, x2, y2, m2):
    m0 = m1 + m2
    return m0, (m1*x1 + m2*x2)/m0, (m1*y1 + m2*y2)/m0


def gravitational_force(x, y, x0, y0, m0):
    f = m0 / np.hypot(x-x0, y-y0)**2
    a = np.arctan2(y0-y, x0-x)
    return f*np.cos(a), f*np.sin(a)


def centrifugal_force(x, y, x1, y1, m1, x2, y2, m2):
    m0, x0, y0 = center_of_mass(x1, y1, m1, x2, y2, m2)
    w2 = m0 / np.hypot(x1-x2, y1-y2)**3
    f = w2 * np.hypot(x-x0, y-y0)
    a = np.arctan2(y-y0, x-x0)
    return f*np.cos(a), f*np.sin(a)


def potential_energy(x, y, x1, y1, m1, x2, y2, m2):
    m0, x0, y0 = center_of_mass(x1, y1, m1, x2, y2, m2)
    r = np.hypot(x-x0, y-y0)
    r1 = np.hypot(x-x0-x1, y-y0-y1)
    r2 = np.hypot(x-x0-x2, y-y0-y2)
    w2 = m0 / np.hypot(x1-x2, y1-y2)**3
    return -(m1/r1 + m2/r2 + w2*r**2/2)


def normalize_force(u, v):
    return np.hypot(u, v)


def normalize_arrow(u, v):
    f = np.log(1+np.log(1+np.sqrt(np.hypot(u, v))))
    a = np.arctan2(v, u)
    return f*np.cos(a), f*np.sin(a)


# ============================================================================

x_s, y_s = 0, 0
m_s = 12

x_e, y_e = 6.66, 0
m_e = 1

_, x_c, y_c = center_of_mass(x_s, y_s, m_s, x_e, y_e, m_e)
x_s, y_s = x_s - x_c, y_s - y_c
x_e, y_e = x_e - x_c, y_e - y_c
x_c, y_c = 0, 0


# ============================================================================

G = 1000

xl, yl = np.meshgrid(np.linspace(-10, 10, G), np.linspace(-10, 10, G))
u_s, v_s = gravitational_force(xl, yl, x_s, y_s, m_s)
u_e, v_e = gravitational_force(xl, yl, x_e, y_e, m_e)
u_c, v_c = centrifugal_force(xl, yl, x_s, y_s, m_s, x_e, y_e, m_e)

ul = u_s + u_e + u_c
vl = v_s + v_e + v_c
fl = normalize_force(ul, vl)


# ============================================================================

N = 40

x, y = np.meshgrid(np.linspace(-10, 10, N), np.linspace(-10, 10, N))
u_s, v_s = gravitational_force(x, y, x_s, y_s, m_s)
u_e, v_e = gravitational_force(x, y, x_e, y_e, m_e)
u_c, v_c = centrifugal_force(x, y, x_s, y_s, m_s, x_e, y_e, m_e)

u = u_s + u_e + u_c
v = v_s + v_e + v_c
f = normalize_force(u, v)
u, v = normalize_arrow(u, v)


# ============================================================================

size = 16

plt.figure(figsize=(size,size))
plt.xlim([-10,+10])
plt.ylim([-10,+10])
plt.xticks([], [])
plt.yticks([], [])

plt.contour(xl, yl, np.clip(fl, 0, 0.25), 30, alpha=0.25, cmap='gray')
plt.quiver(x, y, u, v, -f, scale=20)

plt.scatter([x_s, x_e, x_c], [y_s, y_e, y_c], c=['#ee1111', '#4444ff', '#777777'])
plt.annotate('S', [x_s, y_s], [x_s, y_s-0.7], ha='center', c='#ee1111', fontsize=24, zorder=10)
plt.annotate('E', [x_e, y_e], [x_e, y_e-0.7], ha='center', c='#4444ff', fontsize=24, zorder=10)
plt.annotate('CM', [x_c, y_c], [x_c+0.2, y_c], va='center', c='#777777', fontsize=24, zorder=10)

plt.show()
