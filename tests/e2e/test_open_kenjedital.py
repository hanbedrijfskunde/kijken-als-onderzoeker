from helpers import NAAM, SLEUTEL, code_all

VRAAG = "Welk bestaand codeerschema"


def answer_box(page):
    return page.locator(".blok--project textarea").first


def test_open_answer_survives_reload(page, site_url):
    page.goto(site_url + "#/station/3")
    answer_box(page).fill("Ik pas het schema uit deze tutorial aan.")
    page.reload()
    assert answer_box(page).input_value() == "Ik pas het schema uit deze tutorial aan."
    assert VRAAG in page.locator(".blok--project label").first.inner_text()


def test_compare_shows_checklist_and_saves_ticks(page, site_url):
    page.goto(site_url + "#/station/3")
    page.get_by_role("button", name="Vergelijk met het voorbeeld").click()
    boxes = page.locator(".blok--project input[type=checkbox]")
    assert boxes.count() == 4
    boxes.nth(0).check()
    boxes.nth(2).check()
    page.reload()
    boxes = page.locator(".blok--project input[type=checkbox]")
    assert boxes.nth(0).is_checked() and boxes.nth(2).is_checked()
    assert not boxes.nth(1).is_checked()


def kenjedital(page, juist):
    page.get_by_text("Ken je dit al? Doe de check").click()
    vragen = page.locator(".kenjedital fieldset")
    for i, keuze in enumerate(juist):
        vragen.nth(i).locator("input[type=radio]").nth(keuze).check()
    page.get_by_role("button", name="Controleer je antwoorden").click()


def test_kenjedital_all_correct_skips(page, site_url):
    page.goto(site_url + "#/station/3")
    kenjedital(page, [1, 1, 1])
    page.get_by_role("button", name="Sla dit station over").click()
    page.goto(site_url + "#/")
    assert "Overgeslagen" in page.locator(".kaart__station").nth(3).inner_text()


def test_kenjedital_wrong_keeps_status(page, site_url):
    page.goto(site_url + "#/station/3")
    kenjedital(page, [0, 1, 1])
    assert "Werk het station gewoon door." in page.locator(".kenjedital").inner_text()
    assert page.get_by_role("button", name="Sla dit station over").count() == 0
    page.goto(site_url + "#/")
    assert "Bezig" in page.locator(".kaart__station").nth(3).inner_text()


def test_reset_wipes_answers(page, site_url):
    page.goto(site_url + "#/station/3")
    code_all(page, SLEUTEL[:3])
    answer_box(page).fill("iets")
    page.get_by_role("button", name="Vergelijk met het voorbeeld").click()
    page.locator(".blok--project input[type=checkbox]").nth(0).check()
    page.goto(site_url + "#/")
    page.get_by_role("button", name="Opnieuw beginnen").click()
    page.locator("dialog").get_by_role("button", name="Ja, wis alles").click()
    page.reload()
    page.goto(site_url + "#/station/3")
    assert answer_box(page).input_value() == ""
    assert not page.locator("fieldset.beurt").nth(0).get_by_label(NAAM[SLEUTEL[0]], exact=True).is_checked()
    page.get_by_role("button", name="Vergelijk met het voorbeeld").click()
    assert not page.locator(".blok--project input[type=checkbox]").nth(0).is_checked()
