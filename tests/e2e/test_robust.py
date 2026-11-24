import pytest

from helpers import NAAM, SLEUTEL, code_turn, stub_youtube

NOTICE = "Je antwoorden worden niet bewaard als je deze pagina sluit."
PAGES = ["#/", "#/station/0", "#/station/1", "#/station/2", "#/station/3", "#/station/4", "#/station/5"]


def test_storage_blocked_notice_once(page, site_url):
    page.add_init_script("Storage.prototype.setItem = function () { throw new Error('blocked'); };")
    page.goto(site_url)
    page.locator(".kaart__station").nth(3).click()
    page.get_by_role("link", name="Naar de kaart").first.click()
    page.locator(".kaart__station").nth(3).click()
    assert page.get_by_text(NOTICE).count() == 1
    code_turn(page, 0, SLEUTEL[0])
    assert page.locator("fieldset.beurt").nth(0).get_by_label(NAAM[SLEUTEL[0]], exact=True).is_checked()


@pytest.mark.parametrize("hash_", PAGES)
def test_no_horizontal_scroll_at_360(browser, site_url, hash_):
    ctx = browser.new_context(viewport={"width": 360, "height": 740})
    stub_youtube(ctx)
    pg = ctx.new_page()
    pg.goto(site_url + hash_)
    pg.wait_for_timeout(200)
    width = pg.evaluate("document.scrollingElement.scrollWidth")
    ctx.close()
    assert width <= 360, f"{hash_}: scrollWidth {width}"


NAMELESS = """
() => [...document.querySelectorAll('button, input, select, textarea')]
  .filter((e) => !(e.labels && e.labels.length) && !e.getAttribute('aria-label') && !e.textContent.trim())
  .map((e) => e.outerHTML.slice(0, 80))
"""


@pytest.mark.parametrize("hash_", PAGES)
def test_controls_have_names(page, site_url, hash_):
    page.goto(site_url + hash_)
    assert page.evaluate(NAMELESS) == []


def test_focus_visible(page, site_url):
    page.goto(site_url)
    for _ in range(12):
        page.keyboard.press("Tab")
        if page.evaluate("document.activeElement.classList.contains('kaart__station')"):
            break
    else:
        pytest.fail("no station card reached with Tab")
    style = page.evaluate("getComputedStyle(document.activeElement).outlineStyle")
    assert style != "none"
