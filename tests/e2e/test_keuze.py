"""Meerkeuze per item (stations 0, 1 en 5): knoppen, bewaard per item."""
import json

from playwright.sync_api import expect

from helpers import KEY, preset

S0 = "#/station/0"
S0_ITEM_0 = "Een filiaalmanager wil weten hoe vaak verkopers doorvragen als een klant iets vraagt."


def item(page, i):
    return page.locator(".keuze-item").nth(i)


def opgeslagen(page):
    return json.loads(page.evaluate(f"localStorage.getItem({json.dumps(KEY)})") or "{}")


def test_keuze_buttons_pressed_state(page, site_url):
    page.goto(site_url + S0)
    item(page, 0).get_by_role("button", name="Interview", exact=True).click()
    expect(item(page, 0).get_by_role("button", name="Interview", exact=True)).to_have_attribute("aria-pressed", "true")
    for ander in ("Observatie", "Enquête"):
        expect(item(page, 0).get_by_role("button", name=ander, exact=True)).to_have_attribute("aria-pressed", "false")


def test_keuze_arrow_keys_choose_nothing(page, site_url):
    page.goto(site_url + S0)
    item(page, 0).get_by_role("button", name="Observatie", exact=True).focus()
    for toets in ("ArrowRight", "ArrowRight", "ArrowDown"):
        page.keyboard.press(toets)
    expect(item(page, 0).locator(".keuze-item__fb")).to_be_empty()
    assert "keuze" not in opgeslagen(page)


def test_keuze_stored_by_item_text(page, site_url):
    page.goto(site_url + S0)
    item(page, 0).get_by_role("button", name="Interview", exact=True).click()
    assert opgeslagen(page)["keuze"]["s0"] == {S0_ITEM_0: "Interview"}


def test_keuze_reads_old_array(page, site_url):
    """De site van fase 2 bewaarde keuzes als lijst, op positie."""
    preset(page, site_url, {"keuze": {"s1": [0, 1]}})
    page.goto(site_url + "#/station/1")
    expect(item(page, 0).get_by_role("button", name="Waarneembaar", exact=True)).to_have_attribute("aria-pressed", "true")
    expect(item(page, 1).get_by_role("button", name="Niet waarneembaar", exact=True)).to_have_attribute("aria-pressed", "true")
    expect(item(page, 2).locator(".keuze-item__fb")).to_be_empty()
    assert isinstance(opgeslagen(page)["keuze"]["s1"], dict)


def test_keuze_feedback_region_rendered(page, site_url):
    """Een live regio die pas verschijnt als er tekst in komt, wordt door schermlezers vaak niet voorgelezen."""
    page.goto(site_url + S0)
    fb = item(page, 0).locator(".keuze-item__fb")
    assert fb.evaluate("e => getComputedStyle(e).display") != "none"
