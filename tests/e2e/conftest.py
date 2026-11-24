"""Fixtures: serve site/ over http with serve.py (or use SITE_URL) and drive Chromium with Playwright."""
import os
import socket
import subprocess
import sys
import time
from pathlib import Path
from urllib.request import urlopen

import pytest

os.environ.setdefault("PLAYWRIGHT_BROWSERS_PATH", str(Path.home() / ".cache" / "ms-playwright"))
from playwright.sync_api import sync_playwright  # noqa: E402

sys.path.insert(0, str(Path(__file__).resolve().parent))
from helpers import stub_youtube  # noqa: E402

SITE = Path(__file__).resolve().parents[2] / "site"


def _free_port():
    with socket.socket() as s:
        s.bind(("127.0.0.1", 0))
        return s.getsockname()[1]


@pytest.fixture(scope="session")
def site_url():
    if os.environ.get("SITE_URL"):
        yield os.environ["SITE_URL"].rstrip("/") + "/"
        return
    port = _free_port()
    proc = subprocess.Popen(
        [sys.executable, str(Path(__file__).resolve().parent / "serve.py"), str(port), str(SITE)],
        stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
    )
    url = f"http://127.0.0.1:{port}/"
    for _ in range(50):
        try:
            urlopen(url, timeout=0.2)
            break
        except OSError:
            time.sleep(0.1)
    yield url
    proc.terminate()
    proc.wait()


@pytest.fixture(scope="session")
def browser():
    with sync_playwright() as p:
        b = p.chromium.launch()
        yield b
        b.close()


@pytest.fixture
def context(browser):
    ctx = browser.new_context()
    stub_youtube(ctx)
    yield ctx
    ctx.close()


@pytest.fixture
def page(context):
    pg = context.new_page()
    pg.set_default_timeout(5000)
    pg.set_default_navigation_timeout(10000)
    # Bewijs voor wisselvallige fouten: pytest toont deze uitvoer alleen bij een test die faalt.
    sporen = []
    pg.on("pageerror", lambda e: sporen.append(f"pageerror: {e}"))
    pg.on("console", lambda m: m.type == "error" and sporen.append(f"console: {m.text}"))
    pg.on("requestfailed", lambda r: "127.0.0.1" in r.url and sporen.append(f"requestfailed: {r.url} {r.failure}"))
    yield pg
    for spoor in sporen:
        print(spoor)
