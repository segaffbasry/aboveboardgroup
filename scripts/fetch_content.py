"""Snapshot the homepage content of aboveboardgroup.co.uk.

The live site is a Readdy (Vite + React) single-page app: the homepage HTML is an empty #root and every piece of
content is a literal inside the main JS bundle. This script reads that bundle, pulls out the data arrays the
homepage renders (team, stats, projects, gallery, tips, reviews, LinkedIn posts) into content/home.json, and
downloads every photograph into public/images/ as WebP.

Kept: only what the homepage displays. Dropped: form endpoints, phone numbers inside personal posts, account data.
Needs Pillow (pip install pillow). Run: python3 scripts/fetch_content.py
"""
import io
import json
import os
import re
import urllib.request

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = "https://aboveboardgroup.co.uk"
UA = {"User-Agent": "Mozilla/5.0 (Macintosh) content-snapshot"}


def get(url):
    with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60) as r:
        return r.read()


shell = get(SITE + "/").decode()
bundle_path = re.search(r'src="(/assets/index-[^"]+\.js)"', shell).group(1)
js = get(SITE + bundle_path).decode()


def array(anchor):
    """Returns the source of the JS array literal that contains `anchor`."""
    i = js.index(anchor)
    start = js.rfind("=[", 0, i) + 1
    depth, j = 0, start
    while True:
        c = js[j]
        if c == "`":  # skip template literals, which may contain brackets
            j = js.index("`", j + 1)
        elif c == "[":
            depth += 1
        elif c == "]":
            depth -= 1
            if depth == 0:
                return js[start:j + 1]
        j += 1


def to_json(src):
    """Minified object literals -> JSON: quote keys, backticks -> strings, !0/!1 -> booleans, 1e3 -> 1000."""
    out, i = [], 0
    while i < len(src):
        c = src[i]
        if c == "`":
            end = src.index("`", i + 1)
            out.append(json.dumps(src[i + 1:end]))
            i = end + 1
            continue
        out.append(c)
        i += 1
    s = "".join(out)
    s = re.sub(r"([{,])([A-Za-z_]\w*):", r'\1"\2":', s)
    s = s.replace("!0", "true").replace("!1", "false")
    s = re.sub(r":(\d+)e(\d+)", lambda m: ":" + str(int(m.group(1)) * 10 ** int(m.group(2))), s)
    return json.loads(s)


team = to_json(array("role:`Managing Director`"))
stats = to_json(array("label:`Projects Completed`"))
projects = to_json(array("name:`Splashes Leisure Centre`"))
gallery = to_json(array("alt:`Aboveboard Group site work`"))
tips = to_json(array("title:`Consider Heat Pump Technology`"))
reviews = to_json(array("name:`Hannah Claire`"))
posts = to_json(array("text:`100% fill rate."))

# The homepage feed: company posts about the work, from the two directors. Personal posts, reposts of other
# companies' hiring ads and posts carrying personal mobile numbers are left out.
keep = ("100% fill rate", "First full month", "A client rang me Friday", "We placed an engineer", "This week we’ve started", "We turned down a 70 FCU")
posts = [p for p in posts if p["text"].startswith(keep) and not p.get("isRepost")]

os.makedirs(os.path.join(ROOT, "public", "images"), exist_ok=True)


def save(url, name, max_width=1800):
    """Downloads one image and stores it as WebP (logos keep their alpha). Returns the local path and size."""
    im = Image.open(io.BytesIO(get(url)))
    im = im.convert("RGBA") if im.mode in ("RGBA", "LA", "P") else im.convert("RGB")
    if im.width > max_width:
        im = im.resize((max_width, round(im.height * max_width / im.width)), Image.LANCZOS)
    path = f"/images/{name}.webp"
    im.save(os.path.join(ROOT, "public", path.lstrip("/")), "WEBP", quality=84, method=6)
    return {"src": path, "width": im.width, "height": im.height}


slug = lambda s: re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")
for member in team:
    member["image"] = save(member["image"], f"team-{slug(member['name'])}", 900)
for project in projects:
    project["image"] = save(project["image"], f"project-{slug(project['name'])}", 1200)
for n, photo in enumerate(gallery, 1):
    photo["image"] = save(photo.pop("src"), f"site-work-{n:02d}", 1400)
for post in posts:
    post.pop("avatar", None)
    post.pop("imageUrl", None)

hero = save(re.search(r'alt:`Commercial Air Conditioning Installation`[^}]*?src:`([^`]+)`|src:`([^`]+)`[^}]*?alt:`Commercial Air Conditioning Installation`', js).group(0).split("src:`")[1].split("`")[0], "hero-install")
about = save("https://storage.readdy-site.link/project_files/9435a312-c7db-4fa3-8712-dd64feb0a3c0/f3ca970a-5393-459e-9cc2-7c86cf7a9c2e_aboveboard_group_higher_quality.jpg?v=15d5c10c02ad7d0887a0c7969e722375", "about-team")
avatars = {
    "dan": save("https://static.readdy.ai/image/4a891bf01ca77aa59d4e684a3f5f885b/a559cc4448efb3ac49b73a17a5cd6c13.png", "avatar-dan-scott", 160),
    "taylor": team[0]["image"],
}

data = {"source": SITE, "bundle": bundle_path, "hero": hero, "about": about, "team": team, "stats": stats,
        "projects": projects, "gallery": gallery, "tips": tips, "reviews": reviews, "posts": posts, "avatars": avatars}
os.makedirs(os.path.join(ROOT, "content"), exist_ok=True)
json.dump(data, open(os.path.join(ROOT, "content", "home.json"), "w"), indent=1, ensure_ascii=False)
print({k: len(v) for k, v in data.items() if isinstance(v, list)})
