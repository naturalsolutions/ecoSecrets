from datetime import datetime


def compare_date(first_date: str, second_date: datetime):
    date_obj = datetime.fromisoformat(first_date)
    assert date_obj.year == second_date.year
    assert date_obj.month == second_date.month
    assert date_obj.day == second_date.day

    return True
