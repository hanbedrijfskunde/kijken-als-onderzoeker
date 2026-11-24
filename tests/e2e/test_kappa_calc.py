import json

from helpers import SLEUTEL, code_all

KEY = "kijken-als-onderzoeker/v1"


def test_calc_uses_example_when_s3_empty(page, site_url):
    page.goto(site_url + "#/station/4")
    calc = page.locator(".kappa-calc")
    assert "Je hebt station 3 nog niet gecodeerd." in calc.inner_text()
    eigen = calc.locator(".kc-resultaat").first.inner_text()
    assert "κ = 0,67" in eigen
    assert "aanzienlijk" in eigen and "bruikbaar" in eigen
    assert "‘Open vraag’ en ‘Doorvragen’ (2 keer)" in eigen


def test_calc_partial_s3_notice(page, site_url):
    page.goto(site_url + "#/station/3")
    code_all(page, SLEUTEL[:10])
    page.goto(site_url + "#/station/4")
    assert "Je codeerde 10 van de 15 beurten." in page.locator(".kappa-calc").inner_text()


def test_calc_identical_to_key(page, site_url):
    page.goto(site_url + "#/station/3")
    code_all(page, SLEUTEL)
    page.goto(site_url + "#/station/4")
    eigen = page.locator(".kappa-calc .kc-resultaat").first.inner_text()
    assert "κ = 1,00" in eigen and "bijna perfect" in eigen
    assert "Jullie zijn het overal over eens." in eigen


def test_calc_same_totals_demo(page, site_url):
    page.goto(site_url + "#/station/4")
    demo = page.locator(".blok--check .kc-zelfde")
    assert "κ = 0,20" in demo.inner_text()


def test_calc_kappa_undefined_message(page, site_url):
    page.goto(site_url)
    data = {"codes": {"s3": ["overig"] * 15, "partner": ["overig"] * 15}}
    page.evaluate(f"localStorage.setItem({json.dumps(KEY)}, {json.dumps(json.dumps(data))})")
    page.reload()
    page.goto(site_url + "#/station/4")
    partner = page.locator(".kc-partner")
    assert "Kappa is niet te berekenen" in partner.inner_text()
    assert "NaN" not in page.locator("article.station").inner_text()
