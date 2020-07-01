#!/usr/bin/env python3

from collections import namedtuple
from blist import blist, sortedlist


Point = namedtuple('Point', 'x y')

Segment = namedtuple('Segment', 'p q')
Segment.from_floats = lambda x0, y0, x1, y1: Segment.from_points(Point(x0, y0), Point(x1, y1))
Segment.from_points = lambda p, q: Segment(*sorted([p, q]))
Segment.ccw = lambda self, p: Triangle(p, *self).ccw()
Segment.cut = lambda self, other: self.ccw(other.p) ^ self.ccw(other.q)
Segment.det = lambda self: self.p.x*self.q.y - self.p.y*self.q.x
Segment.dx = lambda self: self.p.x - self.q.x
Segment.dy = lambda self: self.p.y - self.q.y

Pair = namedtuple('Pair', 's t')
Pair.from_segments = lambda s, t: Pair(*sorted([s, t]))
Pair.denominator = lambda self: self.s.dx()*self.t.dy() - self.s.dy()*self.t.dx()
Pair.is_intersect = lambda self: self.s.cut(self.t) and self.t.cut(self.s)
Pair.intersect_coord = ( lambda self:
          None if not self.is_intersect() else
          Point( (self.s.det()*self.t.dx() - self.s.dx()*self.t.det()) / self.denominator(),
                 (self.s.det()*self.t.dy() - self.s.dy()*self.t.det()) / self.denominator() ))

Triangle = namedtuple('Triangle', 'u v w')
Triangle.ccw = lambda self: round(self.det(), 9) > 0
Triangle.det = lambda self: ( self.u.x*self.v.y - self.u.y*self.v.x +
                              self.v.x*self.w.y - self.v.y*self.w.x +
                              self.w.x*self.u.y - self.w.y*self.u.x )

AddEvent = namedtuple('AddEvent', 'p s t')		# dummy 3rd attr
AddEvent.from_segment = lambda s: AddEvent(s.p, s, s)

DelEvent = namedtuple('DelEvent', 'p s t')		# dummy 3rd attr
DelEvent.from_segment = lambda s: DelEvent(s.q, s, s)

IntersectEvent = namedtuple('IntersectEvent', 'p s t')
IntersectEvent.from_segments = lambda s, t: IntersectEvent.from_pair(Pair.from_segments(s, t))
IntersectEvent.from_pair = lambda ps: IntersectEvent(ps.intersect_coord(), *ps)


def init_events(segments):
    events = sortedlist()
    for s in segments:
        events.add(AddEvent.from_segment(s))
        events.add(DelEvent.from_segment(s))
    return events


def add_intersect_event(i, j, status, events):
    if 0 <= i < len(status) and 0 <= j < len(status):
        intersection = IntersectEvent.from_segments(status[i], status[j])
        if ( intersection.p is not None
                and intersection not in events
                and events[0].p <= intersection.p <= events[-1].p ):
            events.add(intersection)
            return [intersection]
    return []


def ccw_bin_search(event, status):
    lo = 0
    hi = len(status)
    while lo < hi:
        i = (lo+hi) // 2
        if status[i].ccw(event.p):
            lo = i + 1
        else:
            hi = i
    return lo


def add_status(event, status):
    i = ccw_bin_search(event, status)
    status.insert(i, event.s)
    return i


def del_status(event, status):
    i = ccw_bin_search(event, status)
    del status[i]
    return i


def sweep(segments):
    intersections = set()
    status = blist()
    events = init_events(segments)
    while events:
        draw(segments, events, status, intersections, stage=Stage.BEGIN)
        hl = []
        if isinstance(events[0], AddEvent):
            i = add_status(events[0], status)
            hl += add_intersect_event(i, i-1, status, events)
            hl += add_intersect_event(i, i+1, status, events)
        elif isinstance(events[0], DelEvent):
            i = del_status(events[0], status)
            hl += add_intersect_event(i-1, i, status, events)
        else:
            intersections.add(Pair(events[0].s, events[0].t))
            i = ccw_bin_search(events[0], status)
            status[i], status[i+1] = status[i+1], status[i]
            hl += add_intersect_event(i-1, i-0, status, events)
            hl += add_intersect_event(i+1, i+2, status, events)
        draw(segments, events, status, intersections, stage=Stage.FINISH, highlight=hl)
    return intersections


# ============================================================================


import matplotlib.pyplot as plt
from enum import IntEnum


NAMES = 'ABCDEF'
COLORS = [ '#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd',
           '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf', ]


class Stage(IntEnum):
    BEGIN = 1
    FINISH = 2


def get_numero(segments, events):
    out = []
    for e in events:
        i = segments.index(e.s)
        j = segments.index(e.t)
        if isinstance(e, AddEvent):
            out += [f'+{NAMES[i]}']
        elif isinstance(e, DelEvent):
            out += [f'-{NAMES[i]}']
        else:
            out += [f'{NAMES[i]}x{NAMES[j]}']
    return out


def get_filename(events, stage):
    x = events[0].p.x
    filename = f'frame_{int(x*100):02}'
    filename += f'_{stage}'
    filename += '.png'
    return filename


def draw(segments, events, status, intersections, stage, highlight=[]):
    filename = get_filename(events, stage)
    fig = plt.figure(figsize=(16*0.5, 9*0.5))
    lines = []
    for i, s, co in zip(NAMES, segments, COLORS):
        st = '-' if s in status else '--'
        line_obj, = plt.plot( [s.p.x, s.q.x], [s.p.y, s.q.y],
                              color=co, linestyle=st, label=i,
                              linewidth=1.5, zorder=1 )
        lines += [line_obj]
    for e in events:
        if isinstance(e, IntersectEvent):
            plt.scatter([e.p.x], [e.p.y], color='#17becf', s=100, zorder=2)
    for ps in intersections:
        x, y = ps.intersect_coord()
        plt.scatter([x], [y], color='#000000', zorder=2)
    plt.axvline(x=events[0].p.x, color='#7f7f7f', linestyle=':', linewidth=1.5)
    if stage == Stage.FINISH:
        del events[0]
    string = ', '.join(get_numero(segments, events))
    plt.title(f'Events: [{string}]', loc='left')
    plt.legend(handles=lines, loc=4)
    fig.savefig(filename)
    plt.close(fig)


def main():
    segments = [ Segment.from_floats(0.06, 0.44, 0.44, 0.36),
                 Segment.from_floats(0.13, 0.51, 0.22, 0.38),
                 Segment.from_floats(0.26, 0.78, 0.97, 0.48),
                 Segment.from_floats(0.31, 0.17, 0.90, 0.72),
                 Segment.from_floats(0.55, 0.20, 0.95, 0.61),
                 Segment.from_floats(0.69, 0.64, 0.93, 0.66), ]
    sweep(segments)


if __name__ == '__main__':
    main()
