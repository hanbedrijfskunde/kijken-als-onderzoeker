"""Station 2: Zelf coderen, met de klikteller."""
from playwright.sync_api import expect

S2 = "#/station/2"
NAMEN = {"eigen-bouwwerk": "Eigen bouwwerk bekijken", "strategie-wisselen": "Strategie wisselen",
         "plan-bekijken": "Plan bekijken", "afgeleid": "Afgeleid"}
SLEUTEL = {"eigen-bouwwerk": 1, "strategie-wisselen": 7, "plan-bekijken": 2, "afgeleid": 1}


def turf(page, code, keer=1):
    knop = page.locator(f'.turf__knop[data-code="{code}"]')
    for _ in range(keer):
        knop.click()


def telling(page, code):
    return page.locator(f'.turf__knop[data-code="{code}"] .turf__aantal').text_content()


def test_turf_counts_and_undo(page, site_url):
    page.goto(site_url + S2)
    turf(page, "strategie-wisselen", 3)
    assert telling(page, "strategie-wisselen") == "3"
    page.get_by_role("button", name="Laatste klik ongedaan maken").click()
    assert telling(page, "strategie-wisselen") == "2"


def test_turf_survives_reload(page, site_url):
    page.goto(site_url + S2)
    turf(page, "plan-bekijken", 2)
    turf(page, "afgeleid")
    page.reload()
    assert telling(page, "plan-bekijken") == "2"
    assert telling(page, "afgeleid") == "1"
    page.get_by_role("button", name="Laatste klik ongedaan maken").click()
    assert telling(page, "afgeleid") == "0"


def test_turf_compare_exact_key(page, site_url):
    page.goto(site_url + S2)
    expect(page.get_by_role("button", name="Vergelijk met de sleutel")).to_be_disabled()
    expect(page.locator(".check iframe")).to_have_count(0)
    for code, n in SLEUTEL.items():
        turf(page, code, n)
    page.get_by_role("button", name="Vergelijk met de sleutel").click()
    rijen = page.locator(".turf-vergelijk tbody tr")
    expect(rijen).to_have_count(4)
    for i in range(4):
        expect(rijen.nth(i)).to_contain_text("gelijk")
    expect(page.locator(".check")).to_contain_text("Je telde 4 van de 4 codes precies zoals de sleutel.")
    expect(page.locator(".check iframe")).to_have_count(1)
    expect(page.locator(".jekuntnu")).to_be_visible()


def test_turf_compare_explains_differences(page, site_url):
    page.goto(site_url + S2)
    turf(page, "afgeleid", 3)
    page.get_by_role("button", name="Vergelijk met de sleutel").click()
    expect(page.locator(".turf-vergelijk")).to_contain_text("Naar de moeder kijken telt niet")
    page.reload()
    expect(page.locator(".turf-vergelijk")).to_contain_text("Naar de moeder kijken telt niet")
    expect(page.locator(".check iframe")).to_have_count(1)


def test_turf_restart_clears_counts(page, site_url):
    page.goto(site_url + S2)
    turf(page, "eigen-bouwwerk", 2)
    page.get_by_role("button", name="Vergelijk met de sleutel").click()
    page.get_by_role("button", name="Opnieuw turven").click()
    assert telling(page, "eigen-bouwwerk") == "0"
    expect(page.locator(".turf-vergelijk")).to_have_count(0)
