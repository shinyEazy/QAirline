from fastapi import HTTPException
from sqlalchemy import Column


def seat_col_to_int(seat_col: str) -> int:
    """Convert seat column letter (e.g., 'A', 'B') to a number."""
    if len(seat_col) > 1:
        raise HTTPException(status_code=400, detail="Invalid length of seat column")
    return ord(seat_col.upper()) - ord("A") + 1


def conint(x: Column[int]):
    return int(str(x))
