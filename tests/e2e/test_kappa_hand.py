def fill(page, po, pe, kappa):
    box = page.locator(".kappa-hand")
    box.locator('input[name="po"]').fill(po)
    box.locator('input[name="pe"]').fill(pe)
    box.locator('input[name="kappa"]').fill(kappa)
    box.get_by_role("button", name="Controleer je berekening").click()
    return box


def test_kappa_hand_accepts_comma_and_point(page, site_url):
    page.goto(site_url + "#/station/4")
    box = fill(page, "0,75", "0,51", "0,49")
    assert box.locator(".kh-veld.is-goed").count() == 3
    assert "Alle drie goed" in box.inner_text()
    page.goto(site_url + "#/station/4")
    page.reload()
    box = fill(page, "0.75", " 0.51 ", ".49")
    assert box.locator(".kh-veld.is-goed").count() == 3


def test_kappa_hand_wrong_value(page, site_url):
    page.goto(site_url + "#/station/4")
    box = fill(page, "0,6", "0,51", "0,49")
    assert box.locator('.kh-veld.is-anders input[name="po"]').count() == 1
    assert "Alle drie goed" not in box.inner_text()
    assert "Hint 1" in box.locator(".kh-veld.is-anders").inner_text()
    page.goto(site_url + "#/")
    assert "Klaar" not in page.locator(".kaart__station").nth(4).inner_text()
