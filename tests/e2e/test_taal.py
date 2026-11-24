"""Geen ontwerptaal of kapotte waarden in wat de student ziet."""
import re

import pytest

from helpers import SLEUTEL, code_all

PAGINAS = ["#/", "#/station/0", "#/station/1", "#/station/2", "#/station/3", "#/station/4", "#/station/5", "#/plan"]
VERBODEN = re.compile(r"§|TODO|TBD|NaN|undefined|\[object ")


@pytest.mark.parametrize("hash_", PAGINAS)
def test_no_design_language(page, site_url, hash_):
    page.goto(site_url + hash_)
    for d in page.locator("details").all():
        d.evaluate("(el) => { el.open = true; }")
    tekst = page.locator("body").inner_text()
    assert not VERBODEN.search(tekst), VERBODEN.search(tekst)


def test_no_broken_values_after_exercises(page, site_url):
    page.goto(site_url + "#/station/3")
    code_all(page, SLEUTEL)
    page.get_by_role("button", name="Controleer", exact=True).click()
    page.goto(site_url + "#/station/4")
    tekst = page.locator("body").inner_text()
    assert not VERBODEN.search(tekst), VERBODEN.search(tekst)
