"""Station 3 op een telefoon: het codeboek staat boven het gesprek, maar moet bij elke beurt binnen bereik zijn."""
import pytest
from playwright.sync_api import expect

from helpers import SLEUTEL, code_all, stub_youtube

S3 = "#/station/3"


@pytest.fixture
def telefoon(browser, site_url):
    ctx = browser.new_context(viewport={"width": 360, "height": 740})
    stub_youtube(ctx)
    page = ctx.new_page()
    page.set_default_timeout(5000)
    page.goto(site_url + S3)
    yield page
    ctx.close()


def knop(page):
    return page.locator(".codeer").get_by_role("button", name="Codeboek", exact=True)


def in_beeld(page, locator):
    vak = locator.bounding_box()
    return vak is not None and vak["y"] >= 0 and vak["y"] + vak["height"] <= page.viewport_size["height"]


def test_codeboek_button_in_view_at_turn_10(telefoon):
    telefoon.locator("fieldset.beurt").nth(9).scroll_into_view_if_needed()
    expect(knop(telefoon)).to_be_visible()
    assert in_beeld(telefoon, knop(telefoon))


def test_codeboek_dialog_opens_and_closes(telefoon):
    telefoon.locator("fieldset.beurt").nth(9).scroll_into_view_if_needed()
    knop(telefoon).click()
    dialoog = telefoon.get_by_role("dialog", name="Codeboek")
    expect(dialoog).to_be_visible()
    expect(dialoog).to_contain_text("Beslisregel")
    telefoon.keyboard.press("Escape")
    expect(dialoog).to_be_hidden()
    assert telefoon.evaluate("document.activeElement.textContent.trim()") == "Codeboek"


def test_codeboek_dialog_close_button(telefoon):
    knop(telefoon).click()
    dialoog = telefoon.get_by_role("dialog", name="Codeboek")
    dialoog.get_by_role("button", name="Sluiten").click()
    expect(dialoog).to_be_hidden()


def test_codeboek_button_works_after_locking(telefoon):
    code_all(telefoon, SLEUTEL)
    telefoon.get_by_role("button", name="Controleer", exact=True).click()
    knop(telefoon).click()
    expect(telefoon.get_by_role("dialog", name="Codeboek")).to_be_visible()


def test_codeboek_button_hidden_wide(browser, site_url):
    ctx = browser.new_context(viewport={"width": 1366, "height": 768})
    stub_youtube(ctx)
    page = ctx.new_page()
    page.goto(site_url + S3)
    expect(page.locator(".codeboek").first).to_be_visible()
    expect(knop(page)).to_be_hidden()
    ctx.close()


def test_focus_never_hidden_under_codeboek_button(telefoon):
    """Wie met Tab door de beurten gaat, mag de focus niet onder de zwevende knop kwijtraken.
    Tab springt naar het gekozen rondje; Doorvragen staat rechts, waar de knop zweeft."""
    code_all(telefoon, ["doorvragen"] * 15)
    getest = 0
    for i in range(4, 14):
        radio = telefoon.locator("fieldset.beurt").nth(i).get_by_label("Doorvragen", exact=True)
        # Zet het rondje net boven de onderrand van het scherm, en ga er met Tab naartoe.
        radio.evaluate("r => scrollTo(0, r.getBoundingClientRect().top + scrollY - innerHeight + 40)")
        vorige = telefoon.locator("fieldset.beurt").nth(i - 1).get_by_label("Doorvragen", exact=True)
        vorige.evaluate("e => e.focus({ preventScroll: true })")
        telefoon.keyboard.press("Tab")
        if telefoon.evaluate("document.activeElement.name") != f"beurt-{i}":
            continue
        getest += 1
        k = knop(telefoon).bounding_box()
        r = telefoon.evaluate("(() => { const r = document.activeElement.getBoundingClientRect();"
                              " return {x: r.x - 3, y: r.y - 3, w: r.width + 6, h: r.height + 6}; })()")
        overlap = (r["x"] < k["x"] + k["width"] and k["x"] < r["x"] + r["w"]
                   and r["y"] < k["y"] + k["height"] and k["y"] < r["y"] + r["h"])
        assert not overlap, f"beurt {i + 1}: de focus valt onder de knop Codeboek"
    assert getest > 0


def test_codeboek_dialog_with_storage_blocked(browser, site_url):
    ctx = browser.new_context(viewport={"width": 360, "height": 740})
    ctx.add_init_script("Storage.prototype.setItem = function () { throw new Error('blocked'); };")
    stub_youtube(ctx)
    page = ctx.new_page()
    fouten = []
    page.on("pageerror", lambda e: fouten.append(str(e)))
    page.goto(site_url + S3)
    code_all(page, SLEUTEL[:3])
    knop(page).click()
    dialoog = page.get_by_role("dialog", name="Codeboek")
    expect(dialoog).to_be_visible()
    page.keyboard.press("Escape")
    expect(dialoog).to_be_hidden()
    assert fouten == []
    ctx.close()
