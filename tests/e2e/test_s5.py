"""Station 5: Van turven naar besluit."""
import json
import subprocess
from pathlib import Path

from playwright.sync_api import expect

S5 = "#/station/5"


def sleutel():
    root = Path(__file__).resolve().parents[2]
    out = subprocess.run(["node", "--input-type=module", "-e",
                          "import { BESLISSINGEN } from './site/js/content/s5.js'; console.log(JSON.stringify(BESLISSINGEN.map((b) => b.onderbouwd)))"],
                         cwd=root, capture_output=True, text=True, check=True).stdout
    return json.loads(out)


def kies(page, i, onderbouwd):
    label = "Onderbouwd" if onderbouwd else "Niet onderbouwd"
    page.locator(".keuze-item").nth(i).get_by_label(label, exact=True).check()


def test_s5_table_per_hour(page, site_url):
    page.goto(site_url + S5)
    tabel = page.locator(".besluit__tabel")
    expect(tabel).to_contain_text("Filiaal C")
    rij_c = tabel.locator("tbody tr").nth(2)
    expect(rij_c).to_contain_text("2,5")


def test_s5_decisions_feedback(page, site_url):
    key = sleutel()
    page.goto(site_url + S5)
    kies(page, 0, not key[0])
    fb = page.locator(".keuze-item").nth(0).locator(".keuze-item__fb")
    expect(fb).to_contain_text("Je koos")
    for i, k in enumerate(key):
        kies(page, i, k)
    expect(fb).to_contain_text("Goed:")
    expect(page.locator(".check")).to_contain_text("Je beoordeelde 6 van de 6 beslissingen zoals de sleutel.")
    expect(page.locator(".jekuntnu")).to_be_visible()
    page.goto(site_url + "#/")
    assert "Klaar" in page.locator(".kaart__station").nth(5).text_content()
