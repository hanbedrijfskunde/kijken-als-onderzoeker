import json

from helpers import SLEUTEL, code_all

KEY = "kijken-als-onderzoeker/v1"
CONTRAST = """
(sel) => {
  const lum = (c) => {
    const [r, g, b] = c.match(/\\d+/g).slice(0, 3).map((x) => {
      const v = Number(x) / 255;
      return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const e = document.querySelector(sel);
  let bgEl = e, bg = 'rgba(0, 0, 0, 0)';
  while (bgEl && (bg = getComputedStyle(bgEl).backgroundColor) === 'rgba(0, 0, 0, 0)') bgEl = bgEl.parentElement;
  const a = lum(getComputedStyle(e).color), b = lum(bg);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}
"""


def preset(page, site_url, data):
    page.goto(site_url)
    page.evaluate(f"localStorage.setItem({json.dumps(KEY)}, {json.dumps(json.dumps(data))})")
    page.reload()


def test_status_and_feedback_colours_meet_aa(page, site_url):
    preset(page, site_url, {"stations": {"s3": {"status": "bezig"}, "s4": {"status": "klaar"}}})
    assert page.evaluate(CONTRAST, '[data-status="bezig"] .kaart__status') >= 4.5
    assert page.evaluate(CONTRAST, '[data-status="klaar"] .kaart__status') >= 4.5
    assert page.evaluate(CONTRAST, '[data-status="klaar"] .kaart__nr') >= 4.5
    page.goto(site_url + "#/station/4")
    assert page.evaluate(CONTRAST, ".jekuntnu") >= 4.5
    assert page.evaluate(CONTRAST, ".matrix td.mis") >= 4.5


def test_missing_turn_is_named(page, site_url):
    page.goto(site_url + "#/station/3")
    code_all(page, SLEUTEL[:14])
    assert "Nog niet gecodeerd: beurt 15" in page.locator(".codeer__actie").inner_text()
    page.locator("fieldset.beurt").nth(14).get_by_label("Overig", exact=True).check()
    assert "Nog niet gecodeerd" not in page.locator(".codeer__actie").inner_text()


def test_unknown_stored_code_does_not_break_stations(page, site_url):
    preset(page, site_url, {"codes": {"s3": SLEUTEL[:14] + ["weg", "advies"]}})
    page.goto(site_url + "#/station/4")
    assert page.get_by_role("heading", level=1).inner_text() == "Klopt het?"
    assert "Je codeerde 14 van de 15 beurten." in page.locator(".kappa-calc").inner_text()
    page.goto(site_url + "#/station/3")
    assert page.locator("fieldset.beurt").count() == 15


def test_memory_mode_does_not_promise_saving(page, site_url):
    page.add_init_script("Storage.prototype.setItem = function () { throw new Error('blocked'); };")
    page.goto(site_url)
    assert "blijft in deze browser bewaard" not in page.locator(".kaart").inner_text()
    page.goto(site_url + "#/station/3")
    assert "wordt bewaard in deze browser" not in page.locator(".blok--project").inner_text()


def test_turn_feedback_is_quiet_and_turn_text_described(page, site_url):
    page.goto(site_url + "#/station/3")
    assert page.locator(".gesprek [aria-live]").count() == 0
    radio = page.locator("fieldset.beurt").nth(1).locator("input[type=radio]").first
    target = radio.get_attribute("aria-describedby")
    assert target
    assert page.locator(f"#{target}").inner_text() == "Leuk. Waarvoor ga je de nieuwe fiets vooral gebruiken?"
