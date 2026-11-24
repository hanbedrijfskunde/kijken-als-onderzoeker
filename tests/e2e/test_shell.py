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
