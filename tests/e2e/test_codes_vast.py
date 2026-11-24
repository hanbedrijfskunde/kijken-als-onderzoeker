"""Station 3: after Controleer the codes are fixed, so the differences reach station 4."""
import json

from playwright.sync_api import expect

from helpers import SLEUTEL, code_all

KEY = "kijken-als-onderzoeker/v1"
S3 = "#/station/3"
VAST = "Je codes staan vast; in station 4 reken je ermee."
EEN_FOUT = SLEUTEL[:13] + ["samenvatten"] + SLEUTEL[14:]  # beurt 14: Samenvatten, de sleutel zegt Advies


def controleer(page):
    page.get_by_role("button", name="Controleer", exact=True).click()


def open_inputs(page):
    return page.locator("fieldset.beurt input:enabled").count()


def test_hint_before_check(page, site_url):
    page.goto(site_url + S3)
    code_all(page, SLEUTEL)
    expect(page.locator(".codeer__actie")).to_contain_text("Na Controleer staan je codes vast.")


def test_codes_locked_after_check(page, site_url):
    page.goto(site_url + S3)
    code_all(page, EEN_FOUT)
    controleer(page)
    assert open_inputs(page) == 0
    expect(page.locator(".codeer__actie")).to_contain_text(VAST)
    expect(page.get_by_role("button", name="Controleer", exact=True)).to_have_count(0)


def test_locked_codes_and_feedback_survive_reload(page, site_url):
    page.goto(site_url + S3)
    code_all(page, EEN_FOUT)
    controleer(page)
    page.reload()
    assert open_inputs(page) == 0
    beurt = page.locator("fieldset.beurt").nth(13)
    expect(beurt.get_by_label("Samenvatten", exact=True)).to_be_checked()
    expect(beurt.locator(".beurt__feedback")).to_contain_text("de sleutel zegt Advies")
    expect(page.locator(".check")).to_contain_text("Je codeerde 14 van de 15 beurten zoals de sleutel.")


def test_differences_reach_station_4(page, site_url):
    page.goto(site_url + S3)
    code_all(page, EEN_FOUT)
    controleer(page)
    page.goto(site_url + "#/station/4")
    expect(page.locator(".kappa-calc")).to_contain_text("‘Samenvatten’ en ‘Advies’ (1 keer)")


def test_reset_unlocks(page, site_url):
    page.goto(site_url + S3)
    code_all(page, SLEUTEL)
    controleer(page)
    page.goto(site_url + "#/")
    page.get_by_role("button", name="Opnieuw beginnen").click()
    page.locator("dialog").get_by_role("button", name="Ja, wis alles").click()
    page.goto(site_url + S3)
    assert open_inputs(page) == 75
    expect(page.locator("fieldset.beurt input:checked")).to_have_count(0)


def test_lock_released_when_a_stored_code_is_unknown(page, site_url):
    page.goto(site_url)
    data = {"codes": {"s3": SLEUTEL[:14] + ["weg"], "s3vast": True}}
    page.evaluate(f"localStorage.setItem({json.dumps(KEY)}, {json.dumps(json.dumps(data))})")
    page.reload()
    page.goto(site_url + S3)
    assert open_inputs(page) == 75
    expect(page.locator(".codeer__actie")).to_contain_text("Nog niet gecodeerd: beurt 15.")
