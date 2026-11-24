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
