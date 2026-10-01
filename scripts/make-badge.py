"""Draw the 88x31 nm.works button as an animated GIF.

A photocopied specimen plate: a sweetgum seed pod (the spiky balls all
over NC sidewalks) rendered as a rotating halftone beside the name, a
registration mark, and a print ruler, with a copier scan bar sweeping across
now and then. Text is drawn from hand-made bitmaps so it stays crisp at 1x.
All lettering is lowercase to match the site's nav and footer.
Also writes public/favicon.svg: a still frame of the pod as pixel squares.
Run: python3 scripts/make-badge.py
"""

import math
import random
from pathlib import Path

from PIL import Image, ImageDraw

W, H = 88, 31
FRAMES = 48
SCAN_FRAMES = 24
FRAME_MS = 70
SPIKES = 14
SS = 8  # supersampling for the specimen

PAPER = (214, 212, 204)
PAPER_DARK = (196, 194, 186)
INK = (34, 31, 29)
RUST = (138, 74, 44)
SCAN = (244, 246, 236)
SCAN_EDGE = (222, 240, 226)

BAYER = [[0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5]]

# 5x7 lowercase for the name: x-height rows 2-6, ascenders from row 0.
BIG = {
    "n": [".....", ".....", "XXXX.", "X...X", "X...X", "X...X", "X...X"],
    "m": [".....", ".....", "XX.X.", "X.X.X", "X.X.X", "X.X.X", "X.X.X"],
    "w": [".....", ".....", "X...X", "X...X", "X.X.X", "X.X.X", ".X.X."],
    "o": [".....", ".....", ".XXX.", "X...X", "X...X", "X...X", ".XXX."],
    "r": [".....", ".....", "X.XX.", "XX..X", "X....", "X....", "X...."],
    "k": ["X....", "X....", "X..X.", "X.X..", "XX...", "X.X..", "X..X."],
    "s": [".....", ".....", ".XXXX", "X....", ".XXX.", "....X", "XXXX."],
    ".": [".", ".", ".", ".", ".", ".", "X"],
}

# 3-wide lowercase for labels: ascender row 0, x-height rows 1-4, descender row 5.
SMALL = {
    "r": ["...", "X.X", "XX.", "X..", "X..", "..."],
    "a": ["...", "XX.", ".XX", "X.X", ".XX", "..."],
    "l": [".X.", ".X.", ".X.", ".X.", ".X.", "..."],
    "e": ["...", ".X.", "XXX", "X..", ".XX", "..."],
    "i": [".X.", "...", ".X.", ".X.", ".X.", "..."],
    "g": ["...", ".XX", "X.X", ".XX", "..X", "XX."],
    "h": ["X..", "X..", "XX.", "X.X", "X.X", "..."],
    "n": ["...", "XX.", "X.X", "X.X", "X.X", "..."],
    "c": ["...", ".XX", "X..", "X..", ".XX", "..."],
    "s": ["...", ".XX", "X..", "..X", "XX.", "..."],
    "p": ["...", "XX.", "X.X", "X.X", "XX.", "X.."],
    "q": ["...", ".XX", "X.X", "X.X", ".XX", "..X"],
    "u": ["...", "X.X", "X.X", "X.X", ".XX", "..."],
    "d": ["..X", "..X", ".XX", "X.X", ".XX", "..."],
    "b": ["X..", "X..", "XX.", "X.X", "XX.", "..."],
    "m": [".....", "XXXX.", "X.X.X", "X.X.X", "X.X.X", "....."],
    "0": [".X.", "X.X", "X.X", "X.X", ".X.", "..."],
    "1": [".X", "XX", ".X", ".X", ".X", ".."],
    ".": [".", ".", ".", ".", "X", "."],
    " ": ["..", "..", "..", "..", "..", ".."],
}


def blit(img, bitmap, x, y, color):
    for dy, row in enumerate(bitmap):
        for dx, cell in enumerate(row):
            if cell == "X":
                img.putpixel((x + dx, y + dy), color)


def text(img, font, s, x, y, color, gap=1):
    for ch in s:
        glyph = font[ch]
        blit(img, glyph, x, y, color)
        x += len(glyph[0]) + gap


def text_width(font, s, gap=1):
    return sum(len(font[ch][0]) + gap for ch in s) - gap


def specimen(angle, size=23, half=0.14):
    """Sweetgum pod at supersampled scale, returned as 0..1 darkness per pixel."""
    big = size * SS
    c = big / 2
    img = Image.new("L", (big, big), 255)
    d = ImageDraw.Draw(img)
    k = size / 23
    core, tip = 4.4 * SS * k, 11.2 * SS * k
    # Spikes first so the core sits on top. Alternate long and short horns.
    for i in range(SPIKES):
        a = angle + i * 2 * math.pi / SPIKES
        reach = tip if i % 2 == 0 else tip * 0.82
        poly = [
            (c + math.cos(a - half) * core * 0.9, c + math.sin(a - half) * core * 0.9),
            (c + math.cos(a) * reach, c + math.sin(a) * reach),
            (c + math.cos(a + half) * core * 0.9, c + math.sin(a + half) * core * 0.9),
        ]
        # Lit side of each horn is lighter, like a photographed object.
        shade = 25 + int(45 * (0.5 + 0.5 * math.cos(a + 2.4)))
        d.polygon(poly, fill=shade)
    # Core with a soft highlight toward the upper left.
    for r in range(int(core), 0, -1):
        t = r / core
        d.ellipse([c - r, c - r, c + r, c + r], fill=int(70 + 150 * (1 - t) ** 1.2))
    hx, hy = c - core * 0.35, c - core * 0.35
    d.ellipse([hx - core * 0.3, hy - core * 0.3, hx + core * 0.3, hy + core * 0.3], fill=200)
    # Seed pores rotate with the pod.
    for k in range(7):
        a = angle + k * 2 * math.pi / 7 + 0.3
        px, py = c + math.cos(a) * core * 0.55, c + math.sin(a) * core * 0.55
        rr = core * 0.13
        d.ellipse([px - rr, py - rr, px + rr, py + rr], fill=20)
    small = img.resize((size, size), Image.LANCZOS)
    return [[1 - small.getpixel((x, y)) / 255 for x in range(size)] for y in range(size)]


def plate(grain):
    img = Image.new("RGB", (W, H), PAPER)
    for x, y in grain:
        img.putpixel((x, y), PAPER_DARK)
    # Ruled frame with small corner crosses, like a plate border.
    for x in range(1, W - 1):
        img.putpixel((x, 1), INK)
        img.putpixel((x, H - 2), INK)
    for y in range(1, H - 1):
        img.putpixel((1, y), INK)
        img.putpixel((W - 2, y), INK)
    for cx, cy in ((1, 1), (W - 2, 1), (1, H - 2), (W - 2, H - 2)):
        for dx, dy in ((-1, 0), (0, -1), (1, 0), (0, 1)):
            x, y = cx + dx, cy + dy
            if 0 <= x < W and 0 <= y < H:
                img.putpixel((x, y), INK)
    # Dashed divider between specimen and text.
    for y in range(4, H - 4, 2):
        img.putpixel((29, y), INK)
    # Name centered in the right panel, with a print ruler along the bottom.
    panel_x, panel_w = 31, W - 3 - 31
    name = "nm.works"
    text(img, BIG, name, panel_x + (panel_w - text_width(BIG, name)) // 2 + 1, 12, INK)
    # Registration mark, the crosshair target used to line up press plates.
    cx, cy = 81, 5
    for deg in range(0, 360, 10):
        img.putpixel((round(cx + 2 * math.cos(math.radians(deg))), round(cy + 2 * math.sin(math.radians(deg)))), INK)
    for d in range(-3, 4):
        img.putpixel((cx + d, cy), INK)
        img.putpixel((cx, cy + d), INK)
    for x in range(32, 85):
        img.putpixel((x, 27), INK)
        if (x - 32) % 3 == 0:
            img.putpixel((x, 26), INK)
        if (x - 32) % 12 == 0:
            img.putpixel((x, 25), INK)
    return img


def draw_specimen(img, field, ox, oy):
    for y, row in enumerate(field):
        for x, v in enumerate(row):
            t = (BAYER[y % 4][x % 4] + 0.5) / 16
            if v > 0.62 + t * 0.3:
                img.putpixel((ox + x, oy + y), INK)
            elif v > 0.2 + t * 0.35:
                img.putpixel((ox + x, oy + y), RUST if (x + y) % 2 else INK)


def scan(img, frame):
    if frame >= SCAN_FRAMES:
        return
    pos = -4 + frame * (W + 8) / SCAN_FRAMES
    for x in range(W):
        dist = x - pos
        if 0 <= dist < 3:
            for y in range(H):
                p = img.getpixel((x, y))
                img.putpixel((x, y), SCAN if p != INK else (96, 98, 92))
        elif -1 <= dist < 0:
            for y in range(H):
                if img.getpixel((x, y)) != INK:
                    img.putpixel((x, y), SCAN_EDGE)


def favicon(path):
    """Still frame of the pod on plate paper, as crisp pixel squares in SVG."""
    n = 32
    img = Image.new("RGB", (n, n), PAPER)
    for i in range(n):
        for edge in ((i, 0), (i, n - 1), (0, i), (n - 1, i)):
            img.putpixel(edge, INK)
    # Bolder than the badge so it survives at 16px: thick horns, no dither.
    field = specimen(0.2, size=30, half=0.22)
    for y, row in enumerate(field):
        for x, v in enumerate(row):
            if v > 0.5:
                img.putpixel((1 + x, 1 + y), INK)
            elif v > 0.22:
                img.putpixel((1 + x, 1 + y), RUST)
    rects = []
    for y in range(n):
        x = 0
        while x < n:
            color = img.getpixel((x, y))
            run = 1
            while x + run < n and img.getpixel((x + run, y)) == color:
                run += 1
            if color != PAPER:
                rects.append(f'<rect x="{x}" y="{y}" width="{run}" height="1" fill="#{color[0]:02x}{color[1]:02x}{color[2]:02x}"/>')
            x += run
    paper = f"#{PAPER[0]:02x}{PAPER[1]:02x}{PAPER[2]:02x}"
    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {n} {n}" shape-rendering="crispEdges">'
        f'<rect width="{n}" height="{n}" fill="{paper}"/>{"".join(rects)}</svg>'
    )
    path.write_text(svg)


def main():
    rnd = random.Random(5)
    grain = [(rnd.randrange(W), rnd.randrange(H)) for _ in range(40)]
    frames = []
    for f in range(FRAMES):
        img = plate(grain)
        angle = f * (2 * math.pi / SPIKES) / FRAMES * 2
        draw_specimen(img, specimen(angle), 4, 4)
        scan(img, f)
        frames.append(img)
    out = Path(__file__).resolve().parent.parent / "public" / "badges"
    out.mkdir(parents=True, exist_ok=True)
    path = out / "nm-works-88x31.gif"
    frames[0].save(path, save_all=True, append_images=frames[1:], duration=FRAME_MS, loop=0, disposal=1)
    print(f"wrote {path}")
    icon = out.parent / "favicon.svg"
    favicon(icon)
    print(f"wrote {icon}")


if __name__ == "__main__":
    main()
