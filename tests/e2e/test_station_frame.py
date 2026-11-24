def test_station_blocks_in_order(page, site_url):
    page.goto(site_url + "#/station/3")
    heads = page.locator("article.station h2").all_inner_texts()
    assert heads == ["Waarom", "Kijk", "Doe", "Check", "Mijn project"]
    frames = page.locator("article.station iframe")
    assert frames.count() >= 1
    for i in range(frames.count()):
        assert frames.nth(i).get_attribute("src").startswith(
            "https://www.youtube-nocookie.com/embed/cVtblRCvtRI?start=")
    stills = page.locator("article.station figure.still")
    assert stills.count() >= 1
    for i in range(stills.count()):
        fig = stills.nth(i)
        assert fig.locator("img").get_attribute("alt")
        assert "watch?v=cVtblRCvtRI&t=" in fig.locator("a").first.get_attribute("href")


def test_station_header_shows_duration_and_needs(page, site_url):
    page.goto(site_url + "#/station/3")
    head = page.locator("article.station .station__start").inner_text()
    assert "30 min" in page.locator("article.station").inner_text().lower()
    assert "Wat heb je nodig?" in head
