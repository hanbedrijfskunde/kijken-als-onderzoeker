"""Station 0: Zeggen is geen doen."""
from playwright.sync_api import expect

from helpers import stub_youtube

S0 = "#/station/0"


def situatie(page, i):
    return page.locator(".keuze-item").nth(i)


def kies(page, i, methode):
    situatie(page, i).get_by_role("button", name=methode, exact=True).click()


def test_s0_situations_feedback(page, site_url):
    page.goto(site_url + S0)
    kies(page, 0, "Interview")
    expect(situatie(page, 0).locator(".keuze-item__fb")).to_contain_text("Je koos Interview; hier past Observatie beter.")
    kies(page, 0, "Observatie")
    expect(situatie(page, 0).locator(".keuze-item__fb")).to_contain_text("Goed: Observatie.")
    kies(page, 1, "Interview")
    expect(situatie(page, 1).locator(".keuze-item__fb")).to_contain_text("Goed: Interview.")
    kies(page, 2, "Enquête")
    expect(situatie(page, 2).locator(".keuze-item__fb")).to_contain_text("Goed: Enquête.")
    expect(page.locator(".check")).to_contain_text("Je koos 3 van de 3 keer de methode die het best past.")
    expect(page.locator(".jekuntnu")).to_be_visible()
    page.goto(site_url + "#/")
    assert "Klaar" in page.locator(".kaart__station").nth(0).text_content()


def test_s0_choices_survive_reload(page, site_url):
    page.goto(site_url + S0)
    kies(page, 1, "Enquête")
    page.reload()
    expect(situatie(page, 1).get_by_role("button", name="Enquête", exact=True)).to_have_attribute("aria-pressed", "true")
    expect(situatie(page, 1).locator(".keuze-item__fb")).to_contain_text("Je koos Enquête; hier past Interview beter.")


def test_s0_nulmeting_saved(page, site_url):
    page.goto(site_url + S0)
    vak = page.locator(".blok--doe textarea").first
    vak.fill("Ik zou het de verkopers vragen.")
    page.reload()
    assert page.locator(".blok--doe textarea").first.input_value() == "Ik zou het de verkopers vragen."
    expect(page.locator(".blok--doe").get_by_role("button", name="Vergelijk met het voorbeeld")).to_have_count(0)


def test_s0_is_no_placeholder(page, site_url):
    page.goto(site_url + S0)
    expect(page.locator("h1")).to_have_text("Zeggen is geen doen")
    expect(page.get_by_text("Dit station volgt nog.")).to_have_count(0)


def alle_drie(page):
    kies(page, 0, "Observatie")
    kies(page, 1, "Interview")
    kies(page, 2, "Enquête")


def test_s0_reminds_when_nulmeting_is_empty(page, site_url):
    page.goto(site_url + S0)
    alle_drie(page)
    expect(page.locator(".check")).to_contain_text("nog niet geschreven")
    expect(page.locator(".check")).not_to_contain_text("bewaard")


def test_s0_confirms_when_nulmeting_is_written(page, site_url):
    page.goto(site_url + S0)
    page.locator(".blok--doe textarea").first.fill("Ik zou het de verkopers vragen.")
    alle_drie(page)
    expect(page.locator(".check")).to_contain_text("Je nulmeting is bewaard")


def test_vormen_table_fits_at_360(browser, site_url):
    ctx = browser.new_context(viewport={"width": 360, "height": 740})
    stub_youtube(ctx)
    page = ctx.new_page()
    page.goto(site_url + S0)
    te_breed = page.evaluate("""() => [...document.querySelectorAll('.vormen th, .vormen td')]
        .filter((c) => c.scrollWidth > c.clientWidth + 1).map((c) => c.textContent.slice(0, 30))""")
    assert te_breed == []
    ctx.close()
