"""Het observatieplan: alle Mijn project-antwoorden op één pagina."""
from playwright.sync_api import expect

from helpers import preset, stub_youtube

TITELS = ["Begrip en waarom observatie", "Indicatoren en codeboekregel",
          "Eenheid, plek, duur, vastlegging en toestemming", "Codeerschema", "Betrouwbaarheid", "Beslissing en grenzen"]


def test_plan_shows_answers_in_order(page, site_url):
    preset(page, site_url, {"answers": {"begrip": "Klantgerichtheid in vier filialen.", "beslissing": "Training in filiaal C."}})
    page.goto(site_url + "#/plan")
    koppen = page.locator(".plan__sectie h2").all_text_contents()
    assert koppen == [f"{i + 1}. {t}" for i, t in enumerate(TITELS)]
    expect(page.locator(".plan__sectie").nth(0)).to_contain_text("Klantgerichtheid in vier filialen.")
    leeg = page.locator(".plan__sectie").nth(4)
    expect(leeg).to_contain_text("Nog niet ingevuld")
    expect(leeg.get_by_role("link", name="Naar station 4")).to_have_attribute("href", "#/station/4")


def test_plan_copy_to_clipboard(browser, site_url):
    ctx = browser.new_context(permissions=["clipboard-read", "clipboard-write"])
    stub_youtube(ctx)
    page = ctx.new_page()
    preset(page, site_url, {"answers": {"begrip": "Klantgerichtheid."}})
    page.goto(site_url + "#/plan")
    page.get_by_role("button", name="Kopieer als tekst").click()
    expect(page.locator(".plan__melding")).to_contain_text("Gekopieerd")
    tekst = page.evaluate("navigator.clipboard.readText()")
    assert tekst.startswith("1. Begrip en waarom observatie\nKlantgerichtheid.")
    ctx.close()


def test_plan_copy_fallback_selects_text(page, site_url):
    page.add_init_script("Object.defineProperty(navigator, 'clipboard', { value: { writeText: () => Promise.reject(new Error('nee')) } });")
    page.goto(site_url + "#/plan")
    page.get_by_role("button", name="Kopieer als tekst").click()
    vak = page.locator(".plan__kopie textarea")
    expect(vak).to_be_visible()
    assert vak.input_value().startswith("1. Begrip en waarom observatie")
    expect(page.locator(".plan__kopie")).to_contain_text("Selecteer de tekst en kopieer hem.")


def test_plan_print_hides_buttons(page, site_url):
    page.goto(site_url + "#/plan")
    page.emulate_media(media="print")
    expect(page.get_by_role("button", name="Kopieer als tekst")).to_be_hidden()
    expect(page.get_by_role("button", name="Print of bewaar als pdf")).to_be_hidden()
    expect(page.locator(".kop")).to_be_hidden()
    expect(page.get_by_role("link", name="Naar de kaart")).to_be_hidden()
    expect(page.locator(".plan__sectie").first).to_be_visible()


def test_plan_nulmeting_beside_new_answer(page, site_url):
    preset(page, site_url, {"answers": {"nulmeting": "Ik zou het de verkopers vragen."}})
    page.goto(site_url + "#/plan")
    groei = page.locator(".plan__groei")
    expect(groei).to_contain_text("Ik zou het de verkopers vragen.")
    groei.locator("textarea").fill("Ik tel doorvragen per uur, met een codeboek.")
    page.reload()
    assert page.locator(".plan__groei textarea").input_value() == "Ik tel doorvragen per uur, met een codeboek."


def test_plan_checklist_saved(page, site_url):
    page.goto(site_url + "#/plan")
    vinkjes = page.locator(".plan__checklist input[type=checkbox]")
    expect(vinkjes).to_have_count(6)
    vinkjes.nth(1).check()
    vinkjes.nth(5).check()
    page.reload()
    vinkjes = page.locator(".plan__checklist input[type=checkbox]")
    assert [vinkjes.nth(i).is_checked() for i in range(6)] == [False, True, False, False, False, True]


def test_no_placeholder_left(page, site_url):
    for nr in range(6):
        page.goto(site_url + f"#/station/{nr}")
        expect(page.locator("h1")).not_to_have_text("")
        expect(page.get_by_text("Dit station volgt nog")).to_have_count(0)
    page.goto(site_url + "#/plan")
    expect(page.locator(".plan__sectie")).to_have_count(6)
