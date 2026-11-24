from helpers import SLEUTEL, code_all, code_turn


def test_codeer_all_correct(page, site_url):
    page.goto(site_url + "#/station/3")
    code_all(page, SLEUTEL)
    page.get_by_role("button", name="Controleer").click()
    assert "Je codeerde 15 van de 15 beurten zoals de sleutel." in page.locator(".blok--check").inner_text()
    page.goto(site_url + "#/")
    assert "Klaar" in page.locator(".kaart__station").nth(3).inner_text()


def test_codeer_one_wrong_shows_reason(page, site_url):
    page.goto(site_url + "#/station/3")
    codes = list(SLEUTEL)
    codes[6] = "open-vraag"
    code_all(page, codes)
    page.get_by_role("button", name="Controleer").click()
    turn = page.locator("fieldset.beurt").nth(6).inner_text()
    assert "Je codeerde Open vraag; de sleutel zegt Overig." in turn
    assert "het antwoord is ja of nee" in turn
    assert "14 van de 15" in page.locator(".blok--check").inner_text()


def test_codeer_disabled_until_complete(page, site_url):
    page.goto(site_url + "#/station/3")
    code_all(page, SLEUTEL[:14])
    assert page.get_by_role("button", name="Controleer").is_disabled()
    code_turn(page, 14, SLEUTEL[14])
    assert page.get_by_role("button", name="Controleer").is_enabled()


def test_codeer_survives_reload(page, site_url):
    page.goto(site_url + "#/station/3")
    code_all(page, SLEUTEL[:5])
    page.reload()
    for i in range(5):
        from helpers import NAAM
        assert page.locator("fieldset.beurt").nth(i).get_by_label(NAAM[SLEUTEL[i]], exact=True).is_checked()
