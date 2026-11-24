from playwright.sync_api import expect
def test_shell_house_style(page, site_url):
    page.goto(site_url)
    logo = page.locator("header img").first
    assert logo.get_attribute("alt") == "HAN University of Applied Sciences"
    assert logo.is_visible()
    assert page.locator('meta[name="robots"]').get_attribute("content") == "noindex"
    assert page.locator("html").get_attribute("lang") == "nl"
    footer = page.locator("footer")
    assert "Behind the Research" in footer.inner_text()
    assert footer.locator('a[href*="watch?v=cVtblRCvtRI"]').count() >= 1
    magenta = page.evaluate(
        "getComputedStyle(document.documentElement).getPropertyValue('--magenta').trim()"
    )
    assert magenta == "#e50056"
    assert page.locator('link[rel="icon"]').get_attribute("href").endswith("han-logo.svg")


STANDAARD = "Kijken als onderzoeker · Observatie als onderzoeksmethode"


def test_title_per_view(page, site_url):
    page.goto(site_url + "#/station/3")
    expect(page).to_have_title("Gesprekken als data · Kijken als onderzoeker")
    page.goto(site_url + "#/plan")
    expect(page).to_have_title("Mijn observatieplan · Kijken als onderzoeker")
    page.goto(site_url + "#/")
    expect(page).to_have_title(STANDAARD)


def test_focus_on_heading_after_navigation(page, site_url):
    page.goto(site_url + "#/")
    page.locator(".kaart__station").nth(3).click()
    expect(page.get_by_role("heading", level=1)).to_have_text("Gesprekken als data")
    assert page.evaluate("document.activeElement.tagName") == "H1"
    assert page.evaluate("document.activeElement.textContent") == "Gesprekken als data"
