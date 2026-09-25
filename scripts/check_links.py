"""Check every outbound link on the homepage against the live site.

Reads the prerendered page (.next/server/app/index.html, so run `npm run build` first). Every link rendered into the
HTML is checked, including both commercial tabs (the hidden panel is still in the markup). The menu renders only its
open tab, so the other tabs' links are read from lib/menu.ts.

aboveboardgroup.co.uk is a single-page app: its server answers 200 for ANY path (an unknown path renders the app's
"not found" view in the browser), so status codes cannot be trusted there. Its own links are therefore checked
against the live sitemap.xml instead, plus /register and /login, the account routes of its tenders board (their
page chunks, RegisterPage-*.js and LoginPage-*.js, are in the live bundle). External links are checked by status.
Social networks that block scripted requests are reported separately rather than as failures.

Run: python3 scripts/check_links.py
"""
import concurrent.futures
import html
import os
import re
import urllib.error
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = "https://aboveboardgroup.co.uk"
UA = {"User-Agent": "Mozilla/5.0 (Macintosh) link-check"}

page = open(os.path.join(ROOT, ".next", "server", "app", "index.html"), encoding="utf8").read()
links = {html.unescape(h) for h in re.findall(r'href="([^"]+)"', page)}
# Only the open menu tab renders its links, so the tab data is read from lib/menu.ts: ["Name", "slug"] pairs under
# `const industries` go to /industry/, under `const guides` to /blog/.
menu = open(os.path.join(ROOT, "lib", "menu.ts"), encoding="utf8").read()
industries_src, guides_src = menu.split("const industries")[1].split("const guides")
pair = r'\["[^"]+", "([a-z0-9-]+)"\]'
links.update(f"{SITE}/industry/{slug}" for slug in re.findall(pair, industries_src))
links.update(f"{SITE}/blog/{slug}" for slug in re.findall(pair, guides_src.split("export const menuTabs")[0]))

outbound = sorted(l for l in links if l.startswith("http") and "/_next/" not in l and not l.endswith((".css", ".js", ".woff2", ".png", ".ico", ".webp", ".svg")))
own = [l for l in outbound if l.startswith(SITE)]
external = [l for l in outbound if not l.startswith(SITE)]
anchors = sorted(l for l in links if l.startswith("#"))
other = sorted(l for l in links if l.startswith(("mailto:", "tel:")))

with urllib.request.urlopen(urllib.request.Request(SITE + "/sitemap.xml", headers=UA), timeout=30) as r:
    sitemap = set(re.findall(r"<loc>([^<]+)</loc>", r.read().decode()))
known = sitemap | {SITE + "/register", SITE + "/login"}
missing = [l for l in own if l.rstrip("/") not in {k.rstrip("/") for k in known}]

# In-page anchors must point at an id on the page.
ids = set(re.findall(r'id="([^"]+)"', page))
dead_anchors = [a for a in anchors if a not in ("#", "#top") and a[1:] not in ids]


def status(url):
    try:
        with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=30) as r:
            return url, r.status
    except urllib.error.HTTPError as e:
        return url, e.code
    except Exception as e:  # noqa: BLE001
        return url, str(e)[:60]


with concurrent.futures.ThreadPoolExecutor(12) as pool:
    results = list(pool.map(status, external))
blocked_hosts = ("linkedin.com", "google.com", "share.google", "whatsapp.com")
bad = [r for r in results if r[1] != 200 and not any(h in r[0] for h in blocked_hosts)]
social = [r for r in results if any(h in r[0] for h in blocked_hosts)]

print(f"{len(own)} links to aboveboardgroup.co.uk checked against its sitemap ({len(sitemap)} URLs)")
print(f"{len(external)} external links checked by status; {len(anchors)} in-page anchors {anchors}; {len(other)} tel/mailto {other}")
for url, code in social:
    print(f"  social  {code}  {url}")
for url in missing:
    print(f"  NOT IN SITEMAP  {url}")
for url, code in bad:
    print(f"  FAIL    {code}  {url}")
for a in dead_anchors:
    print(f"  DEAD ANCHOR  {a}")
problems = len(missing) + len(bad) + len(dead_anchors)
print("all good" if not problems else f"{problems} problems")
