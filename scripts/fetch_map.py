"""Build the coverage map's base image: Esri's World Light Gray Base (label-free) for the box
lon -0.68…0.04, lat 51.18…51.56, stitched from zoom-12 tiles and cropped to the box, saved as
public/images/coverage-map.webp. A one-off fetch of about 50 tiles; the attribution "Esri, HERE, Garmin,
© OpenStreetMap contributors" is shown on the map. The same box and Web Mercator maths are used in components/home/CoverageMap.tsx.

Run: python3 scripts/fetch_map.py
"""
import io
import math
import os
import urllib.request

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LON0, LON1, LAT0, LAT1 = -0.68, 0.04, 51.18, 51.56
Z, TILE = 12, 256
UA = {"User-Agent": "aboveboardgroup-demo/1.0 (one-off static map build)"}


def world(lon, lat):
    """Web Mercator position in pixels at zoom Z."""
    n = TILE * 2 ** Z
    x = (lon + 180) / 360 * n
    y = (1 - math.log(math.tan(math.radians(lat)) + 1 / math.cos(math.radians(lat))) / math.pi) / 2 * n
    return x, y


x0, y0 = world(LON0, LAT1)
x1, y1 = world(LON1, LAT0)
tx0, ty0, tx1, ty1 = int(x0 // TILE), int(y0 // TILE), int(x1 // TILE), int(y1 // TILE)
canvas = Image.new("RGB", ((tx1 - tx0 + 1) * TILE, (ty1 - ty0 + 1) * TILE))
for tx in range(tx0, tx1 + 1):
    for ty in range(ty0, ty1 + 1):
        url = f"https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{Z}/{ty}/{tx}"
        tile = Image.open(io.BytesIO(urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=30).read()))
        canvas.paste(tile.convert("RGB"), ((tx - tx0) * TILE, (ty - ty0) * TILE))
crop = canvas.crop((round(x0 - tx0 * TILE), round(y0 - ty0 * TILE), round(x1 - tx0 * TILE), round(y1 - ty0 * TILE)))
crop.save(os.path.join(ROOT, "public", "images", "coverage-map.webp"), "WEBP", quality=82, method=6)
print(crop.size)
