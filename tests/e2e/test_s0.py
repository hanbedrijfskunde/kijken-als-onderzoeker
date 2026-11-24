"""Station 0: Zeggen is geen doen."""
from playwright.sync_api import expect

S0 = "#/station/0"


def situatie(page, i):
    return page.locator(".keuze-item").nth(i)


def kies(page, i, methode):
    situatie(page, i).get_by_label(methode, exact=True).check()


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
    expect(situatie(page, 1).get_by_label("Enquête", exact=True)).to_be_checked()
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
