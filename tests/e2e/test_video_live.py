"""Laden alle ingesloten fragmenten bij YouTube zonder foutmelding?

Alleen met ECHTE_VIDEO=1, want dit hangt af van YouTube. Draai het vlak voor een uitvoering, tegen de live site:
    ECHTE_VIDEO=1 SITE_URL=https://hanbedrijfskunde.github.io/kijken-als-onderzoeker/ \\
        python3 -m pytest tests/e2e/test_video_live.py
"""
import os

import pytest
from playwright.sync_api import expect

from helpers import preset

pytestmark = pytest.mark.skipif(not os.environ.get("ECHTE_VIDEO"), reason="alleen met ECHTE_VIDEO=1")

TITEL = "Behind the Research"

# De bespreking in station 2 verschijnt pas na het vergelijken; zet die stand vooraf.
NA_VERGELIJKEN = {"tally": {"s2": {"history": ["afgeleid"], "vergeleken": True, "besproken": True}}}


@pytest.mark.parametrize("nr", range(6))
def test_video_fragments_load(page, site_url, nr):
    preset(page, site_url, NA_VERGELIJKEN)
    page.goto(site_url + f"#/station/{nr}")
    for d in page.locator("details").all():
        d.evaluate("(el) => { el.open = true; }")
    kaders = page.locator("iframe")
    assert kaders.count() > 0
    for i in range(kaders.count()):
        kader = kaders.nth(i)
        kader.scroll_into_view_if_needed()
        frame = kader.element_handle().content_frame()
        # Een speler die werkt, toont de titel. Bij een fout toont YouTube alleen een zin in de taal van de
        # browser (zoals "Deze video is niet beschikbaar"), zonder vaste foutklasse; daarom deze positieve controle.
        # Locators en geen wait_for_function: YouTube eist Trusted Types en weigert code als tekst.
        try:
            expect(frame.locator("body")).to_contain_text(TITEL, timeout=20000)
        except AssertionError:
            tekst = frame.locator("body").inner_text()[:120]
            pytest.fail(f"station {nr}, fragment {i + 1}: geen werkende speler. YouTube toont: {tekst!r}")
