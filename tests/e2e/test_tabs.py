"""Twee tabbladen tegelijk: werk uit het ene tabblad mag het andere niet overschrijven."""
from playwright.sync_api import expect

ANTWOORD = "Klantgerichtheid van verkopers, want wat ze zeggen en doen verschilt."


def test_answer_survives_other_tab(context, site_url):
    plan = context.new_page()
    plan.goto(site_url + "#/plan")
    expect(plan.locator(".plan__checklist")).to_be_visible()
    station = context.new_page()
    station.goto(site_url + "#/station/0")
    station.locator("#open-begrip").fill(ANTWOORD)
    # Het plan-tabblad is geopend vóór het antwoord bestond, en schrijft daarna zelf iets.
    plan.locator(".plan__checklist input[type=checkbox]").first.check()
    station.reload()
    expect(station.locator("#open-begrip")).to_have_value(ANTWOORD)


def test_other_tab_shows_new_answer(context, site_url):
    plan = context.new_page()
    plan.goto(site_url + "#/plan")
    expect(plan.locator(".plan__sectie").nth(0)).to_contain_text("Nog niet ingevuld")
    station = context.new_page()
    station.goto(site_url + "#/station/0")
    station.locator("#open-begrip").fill(ANTWOORD)
    expect(plan.locator(".plan__sectie").nth(0)).to_contain_text(ANTWOORD)
