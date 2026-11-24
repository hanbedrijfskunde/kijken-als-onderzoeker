import re

from playwright.sync_api import expect

TITELS = ["Zeggen is geen doen", "Wat ga je zien?", "Zelf coderen",
          "Gesprekken als data", "Klopt het?", "Van turven naar besluit"]


def test_map_lists_stations(page, site_url):
    page.goto(site_url)
    cards = page.locator(".kaart__station")
    assert cards.count() == 6
    for i, titel in enumerate(TITELS):
        assert titel in cards.nth(i).inner_text()
    text = page.locator(".kaart").inner_text()
    for duur in ["20 min", "25 min", "30 min"]:
        assert duur in text
    assert page.get_by_role("link", name="Mijn observatieplan").count() == 1


def open_station_3(page, site_url):
    page.goto(site_url)
    page.locator(".kaart__station").nth(3).click()
    expect(page).to_have_url(re.compile(r"#/station/3$"))
    assert page.locator("h1").inner_text() == "Gesprekken als data"


def test_open_station_and_back(page, site_url):
    open_station_3(page, site_url)
    page.get_by_role("link", name="Naar de kaart").first.click()
    page.wait_for_selector(".kaart")
    assert "Bezig" in page.locator(".kaart__station").nth(3).inner_text()


def test_status_survives_reload(page, site_url):
    open_station_3(page, site_url)
    page.goto(site_url + "#/")
    page.reload()
    assert "Bezig" in page.locator(".kaart__station").nth(3).inner_text()


def test_reset_wipes_all(page, site_url):
    open_station_3(page, site_url)
    page.goto(site_url + "#/")
    page.get_by_role("button", name="Opnieuw beginnen").click()
    dialog = page.locator("dialog")
    assert dialog.is_visible()
    dialog.get_by_role("button", name="Ja, wis alles").click()
    assert "Nog niet" in page.locator(".kaart__station").nth(3).inner_text()


def test_reset_wipes_choices_and_tally(page, site_url):
    page.goto(site_url + "#/station/0")
    page.locator(".keuze-item").nth(0).get_by_label("Observatie", exact=True).check()
    page.goto(site_url + "#/station/2")
    page.locator('.turf__knop[data-code="afgeleid"]').click()
    page.goto(site_url + "#/")
    page.get_by_role("button", name="Opnieuw beginnen").click()
    page.locator("dialog").get_by_role("button", name="Ja, wis alles").click()
    page.goto(site_url + "#/station/0")
    expect(page.locator(".keuze-item input:checked")).to_have_count(0)
    page.goto(site_url + "#/station/2")
    assert page.locator('.turf__knop[data-code="afgeleid"] .turf__aantal').text_content() == "0"
