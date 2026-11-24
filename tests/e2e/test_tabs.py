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


def test_station_not_rebuilt_by_unrelated_write(context, site_url):
    """Opnieuw tekenen stopt een lopende video en wist wat de student nog niet bewaarde.
    Een station wordt dus alleen opnieuw getekend als iets verandert wat het station toont."""
    station = context.new_page()
    station.goto(site_url + "#/station/4")
    station.evaluate("window.__weergave = document.querySelector('#app article')")
    plan = context.new_page()
    plan.goto(site_url + "#/plan")
    plan.locator(".plan__groei textarea").fill("Ik meet gedrag, geen meningen.")
    plan.locator(".plan__checklist input[type=checkbox]").first.check()
    plan.wait_for_timeout(300)
    assert station.evaluate("window.__weergave === document.querySelector('#app article')")


BLOKKEER = "Storage.prototype.setItem = function () { throw new Error('blocked'); };"


def test_two_tabs_with_storage_blocked(browser, site_url):
    """Zonder opslag (privévenster, leeromgeving) delen tabbladen niets, maar breekt er ook niets."""
    ctx = browser.new_context()
    ctx.add_init_script(BLOKKEER)
    fouten = []
    plan = ctx.new_page()
    plan.on("pageerror", lambda e: fouten.append(str(e)))
    plan.goto(site_url + "#/plan")
    station = ctx.new_page()
    station.on("pageerror", lambda e: fouten.append(str(e)))
    station.goto(site_url + "#/station/0")
    station.locator("#open-begrip").fill(ANTWOORD)
    plan.locator(".plan__checklist input[type=checkbox]").first.check()
    expect(station.locator("#open-begrip")).to_have_value(ANTWOORD)
    expect(plan.locator(".melding-opslag")).to_have_count(1)
    assert fouten == []
    ctx.close()
