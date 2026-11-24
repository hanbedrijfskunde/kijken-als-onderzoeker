"""Shared helpers for the e2e tests."""
NAAM = {"open-vraag": "Open vraag", "doorvragen": "Doorvragen", "samenvatten": "Samenvatten",
        "advies": "Advies", "overig": "Overig"}
SLEUTEL = ["overig", "open-vraag", "doorvragen", "doorvragen", "overig", "samenvatten", "overig",
           "advies", "doorvragen", "advies", "doorvragen", "advies", "open-vraag", "advies", "overig"]


def code_turn(page, i, code):
    """Give salesperson turn i (0-based) a code in station 3."""
    page.locator("fieldset.beurt").nth(i).get_by_label(NAAM[code], exact=True).check()


def code_all(page, codes):
    for i, c in enumerate(codes):
        code_turn(page, i, c)


LEGE_VIDEO = "<!doctype html><title>video</title>"


def stub_youtube(ctx):
    """Give embedded YouTube videos an empty page. Tests check that a video is there, not what it shows;
    this keeps load times independent of YouTube (measured: 0.03-0.93 s with, 0.06 s without)."""
    ctx.route("**/*youtube*/embed/**", lambda r: r.fulfill(status=200, content_type="text/html", body=LEGE_VIDEO))


KEY = "kijken-als-onderzoeker/v1"


def preset(page, site_url, data):
    """Put data in the store before the app reads it."""
    import json
    page.goto(site_url)
    page.evaluate(f"localStorage.setItem({json.dumps(KEY)}, {json.dumps(json.dumps(data))})")
    page.reload()
