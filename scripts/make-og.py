"""Draw the 1200x630 social preview image (public/og.png) in the site's style.

Composes the cream page panel, red clay bar, the outlined wordmark from
public/wordmark.svg, the tagline, the pine-and-dogwood divider, and the
footer badge from public/badges/. Uses macOS system fonts (Times New Roman,
Arial, Courier New) for the text. Run after make-badge.py:
python3 scripts/make-og.py
"""

import re
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
FONTS = Path("/System/Library/Fonts/Supplemental")

W, H = 1200, 630
SS = 2  # supersample, then downscale for smooth edges

OUTSIDE = (221, 230, 234)
PANEL = (251, 246, 233)
BAR = (168, 70, 42)
BAR_TEXT = (251, 246, 233)
INK = (43, 38, 33)
HEADING = (47, 79, 58)
STONE = (138, 129, 114)
STONE_LIGHT = (207, 198, 180)
HIGHLIGHT = (255, 253, 246)


def font(name, size):
    return ImageFont.truetype(str(FONTS / name), size * SS)


def parse_path(d):
    """Flatten an SVG path (M/L/H/V/Q/Z, absolute) into closed polygons."""
    tokens = re.findall(r"[MLHVQZ]|-?\d*\.?\d+", d)
    polys, current = [], []
    cmd, i = None, 0
    x = y = 0.0

    def num():
        nonlocal i
        v = float(tokens[i])
        i += 1
        return v

    while i < len(tokens):
        t = tokens[i]
        if t.isalpha():
            cmd = t
            i += 1
            if cmd == "Z":
                if current:
                    polys.append(current)
                current = []
                continue
        elif cmd == "M":
            cmd = "L"  # extra coordinate pairs after M are implicit L
        if cmd == "M":
            if current:
                polys.append(current)
            x, y = num(), num()
            current = [(x, y)]
        elif cmd == "L":
            x, y = num(), num()
            current.append((x, y))
        elif cmd == "H":
            x = num()
            current.append((x, y))
        elif cmd == "V":
            y = num()
            current.append((x, y))
        elif cmd == "Q":
            cx, cy, ex, ey = num(), num(), num(), num()
            for s in range(1, 9):
                u = s / 8
                current.append((
                    (1 - u) ** 2 * x + 2 * (1 - u) * u * cx + u * u * ex,
                    (1 - u) ** 2 * y + 2 * (1 - u) * u * cy + u * u * ey,
                ))
            x, y = ex, ey
    if current:
        polys.append(current)
    return polys


def wordmark(target_width):
    svg = (ROOT / "public" / "wordmark.svg").read_text()
    vx, vy, vw, vh = map(float, re.search(r'viewBox="([^"]+)"', svg).group(1).split())
    d = re.search(r' d="([^"]+)"', svg).group(1)
    scale = target_width / vw
    w, h = round(vw * scale), round(vh * scale)
    mask = Image.new("1", (w, h), 0)
    # Even-odd fill: XOR each subpath so counters in o, a, e stay open.
    for poly in parse_path(d):
        layer = Image.new("1", (w, h), 0)
        pts = [((px - vx) * scale, (py - vy) * scale) for px, py in poly]
        if len(pts) > 2:
            ImageDraw.Draw(layer).polygon(pts, fill=1)
            mask = ImageChops.logical_xor(mask, layer)
    return mask.convert("L")


def centered(draw, text, y, fnt, fill):
    width = draw.textlength(text, font=fnt)
    draw.text(((W * SS - width) / 2, y), text, font=fnt, fill=fill)


def main():
    img = Image.new("RGB", (W * SS, H * SS), OUTSIDE)
    d = ImageDraw.Draw(img)
    m = 28 * SS
    x0, y0, x1, y1 = m, m, W * SS - m, H * SS - m

    # Groove border: dark outer edge, light inner edge, like border: groove.
    g = 5 * SS
    d.rectangle([x0, y0, x1, y1], fill=STONE_LIGHT)
    d.rectangle([x0, y0, x1 - g // 2, y1 - g // 2], fill=STONE)
    d.rectangle([x0 + g // 2, y0 + g // 2, x1, y1], fill=HIGHLIGHT)
    d.rectangle([x0 + g, y0 + g, x1 - g, y1 - g], fill=PANEL)

    # Red clay bar with the domain, right-aligned like the site header.
    bx0, by0, bx1 = x0 + g + 2 * SS, y0 + g + 2 * SS, x1 - g - 2 * SS
    bar_h = 40 * SS
    d.rectangle([bx0, by0, bx1, by0 + bar_h], fill=BAR)
    bar_font = font("Arial Bold.ttf", 22)
    label = "nm.works"
    lw = d.textlength(label, font=bar_font)
    d.text((bx1 - lw - 16 * SS, by0 + 8 * SS), label, font=bar_font, fill=BAR_TEXT)

    # Wordmark, centered.
    mark = wordmark(700 * SS)
    mx = (W * SS - mark.width) // 2
    my = by0 + bar_h + 48 * SS
    img.paste(Image.new("RGB", mark.size, INK), (mx, my), mark)

    # Tagline and rule.
    ty = my + mark.height + 22 * SS
    centered(d, "email & marketing automation, variable data, production QA", ty, font("Times New Roman Italic.ttf", 30), INK)
    ry = ty + 62 * SS
    d.line([(x0 + 110 * SS, ry), (x1 - 110 * SS, ry)], fill=STONE, width=SS)
    d.line([(x0 + 110 * SS, ry + SS), (x1 - 110 * SS, ry + SS)], fill=HIGHLIGHT, width=SS)

    # Pine-and-dogwood divider, with the dogwood in clay.
    mono = font("Courier New.ttf", 24)
    left, flower, right = "^ ~ ^^ ~~ ^ ~~~ ^^^ ~~ ", "(@)", " ~~ ^^^ ~~~ ^ ~~ ^^ ~ ^"
    total = d.textlength(left + flower + right, font=mono)
    dx, dy = (W * SS - total) / 2, ry + 26 * SS
    d.text((dx, dy), left, font=mono, fill=HEADING)
    dx += d.textlength(left, font=mono)
    d.text((dx, dy), flower, font=font("Courier New Bold.ttf", 24), fill=BAR)
    dx += d.textlength(flower, font=mono)
    d.text((dx, dy), right, font=mono, fill=HEADING)

    out = img.resize((W, H), Image.LANCZOS)

    # Footer badge at 3x, pixel-sharp, pasted after downscaling.
    badge = Image.open(ROOT / "public" / "badges" / "nm-works-88x31.gif")
    badge.seek(0)
    badge = badge.convert("RGB").resize((88 * 3, 31 * 3), Image.NEAREST)
    out.paste(badge, ((W - badge.width) // 2, H - 28 - 5 - 30 - badge.height))

    path = ROOT / "public" / "og.png"
    out.save(path, optimize=True)
    print(f"wrote {path}")


if __name__ == "__main__":
    main()
