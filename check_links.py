import os, re, sys
from urllib.parse import unquote, urlparse

ROOT = os.path.dirname(os.path.abspath(__file__))
pages = [f for f in os.listdir(ROOT) if f.endswith('.html')]
fail = 0

for page in sorted(pages):
    html = open(os.path.join(ROOT, page), encoding='utf-8').read()
    # internal refs: local .html/.css/.js/.svg targets in href/src, skipping http/mailto/#only
    refs = re.findall(r'(?:href|src)="([^"]+)"', html)
    for ref in refs:
        if ref.startswith(('http://', 'https://', 'mailto:', 'data:', '#')):
            continue
        path = urlparse(ref).path
        target = unquote(path)
        # strip leading ./ and any directory traversal outside root
        full = os.path.normpath(os.path.join(ROOT, target))
        if not full.startswith(ROOT):
            print(f'FAIL {page}: escapes root -> {ref}')
            fail = 1
        elif not os.path.exists(full):
            print(f'FAIL {page}: dead link -> {ref}')
            fail = 1
        else:
            # check anchor exists in target file (same-page anchors too)
            m = urlparse(ref).fragment
            if '=' in m:
                m = m.split('=')[0]  # JS-parsed param hashes like #terminal=dog%20wallet
            if m:
                tpage = page if path == '' else path
                thtml = open(os.path.join(ROOT, tpage), encoding='utf-8').read()
                if f'id="{m}"' not in thtml:
                    print(f'FAIL {page}: missing anchor #{m} in {tpage}')
                    fail = 1
    h1s = re.findall(r'<h1[\s>]', html)
    status = 'OK ' if len(h1s) == 1 else 'FAIL'
    if len(h1s) != 1:
        fail = 1
    print(f'{status} {page}: <h1> count = {len(h1s)}')

sys.exit(fail)
