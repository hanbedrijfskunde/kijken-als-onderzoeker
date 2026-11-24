"""Station 1: Wat ga je zien?"""
from pathlib import Path

from playwright.sync_api import expect

S1 = "#/station/1"


def sleutel():
    """Read the key from the content module, so the test follows the content."""
    import json, subprocess
    root = Path(__file__).resolve().parents[2]
    out = subprocess.run(["node", "--input-type=module", "-e",
                          "import { GEDRAG } from './site/js/content/s1.js'; console.log(JSON.stringify(GEDRAG.map((g) => g.waarneembaar)))"],
                         cwd=root, capture_output=True, text=True, check=True).stdout
    return json.loads(out)


def kies(page, i, waarneembaar):
    label = "Waarneembaar" if waarneembaar else "Niet waarneembaar"
    page.locator(".keuze-item").nth(i).get_by_label(label, exact=True).check()


def test_s1_sort_feedback_and_done(page, site_url):
    key = sleutel()
    page.goto(site_url + S1)
    kies(page, 0, not key[0])
    fb = page.locator(".keuze-item").nth(0).locator(".keuze-item__fb")
    juist = "Waarneembaar" if key[0] else "Niet waarneembaar"
    fout = "Niet waarneembaar" if key[0] else "Waarneembaar"
    expect(fb).to_contain_text(f"Je koos {fout}; de sleutel zegt {juist}.")
    for i, w in enumerate(key):
        kies(page, i, w)
    expect(fb).to_contain_text(f"Goed: {juist}.")
    expect(page.locator(".check")).to_contain_text("Je deelde 10 van de 10 beschrijvingen in zoals de sleutel.")
    expect(page.locator(".jekuntnu")).to_be_visible()
    page.goto(site_url + "#/")
    assert "Klaar" in page.locator(".kaart__station").nth(1).text_content()


def test_s1_rewrite_blocks_have_examples(page, site_url):
    page.goto(site_url + S1)
    doe = page.locator(".blok--doe")
    expect(doe.locator("textarea")).to_have_count(2)
    expect(doe.get_by_role("button", name="Vergelijk met het voorbeeld")).to_have_count(2)


def test_s1_choices_survive_reload(page, site_url):
    page.goto(site_url + S1)
    kies(page, 3, True)
    page.reload()
    expect(page.locator(".keuze-item").nth(3).get_by_label("Waarneembaar", exact=True)).to_be_checked()
    expect(page.locator(".keuze-item").nth(3).locator(".keuze-item__fb")).not_to_be_empty()
