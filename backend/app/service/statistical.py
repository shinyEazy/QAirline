from datetime import datetime, timedelta
from sqlalchemy import func
from sqlalchemy.orm import Session
from app.models import Passenger, Booking, Flight

def get_ticket_count_by_period(db: Session, period: str = 'day'):
    """
    Calculate total ticket count for different time periods
    
    :param db: Database session
    :param period: 'day', 'week', 'month', or 'year'
    :return: Total number of tickets
    """
    # Get the current date
    now = datetime.now()
    
    # Base query to count passengers through bookings
    query = db.query(func.count(Passenger.passenger_id))
    
    # Apply time-based filtering based on the period
    if period == 'day':
        start_time = now.replace(hour=0, minute=0, second=0, microsecond=0)
        end_time = start_time + timedelta(days=1)
        query = query.join(Booking, Passenger.booking_id == Booking.booking_id)
        query = query.join(Flight, Booking.flight_id == Flight.flight_id)
        query = query.filter(
            Flight.estimated_departure_time >= start_time,
            Flight.estimated_departure_time < end_time
        )
    
    elif period == 'week':
        start_time = now - timedelta(days=now.weekday())
        start_time = start_time.replace(hour=0, minute=0, second=0, microsecond=0)
        end_time = start_time + timedelta(days=7)
        query = query.join(Booking, Passenger.booking_id == Booking.booking_id)
        query = query.join(Flight, Booking.flight_id == Flight.flight_id)
        query = query.filter(
            Flight.estimated_departure_time >= start_time,
            Flight.estimated_departure_time < end_time
        )
    
    elif period == 'month':
        start_time = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        if now.month == 12:
            end_time = datetime(now.year + 1, 1, 1)
        else:
            end_time = datetime(now.year, now.month + 1, 1)
        query = query.join(Booking, Passenger.booking_id == Booking.booking_id)
        query = query.join(Flight, Booking.flight_id == Flight.flight_id)
        query = query.filter(
            Flight.estimated_departure_time >= start_time,
            Flight.estimated_departure_time < end_time
        )
    
    elif period == 'year':
        start_time = now.replace(month=1, day=1, hour=0, minute=0, second=0, microsecond=0)
        end_time = datetime(now.year + 1, 1, 1)
        query = query.join(Booking, Passenger.booking_id == Booking.booking_id)
        query = query.join(Flight, Booking.flight_id == Flight.flight_id)
        query = query.filter(
            Flight.estimated_departure_time >= start_time,
            Flight.estimated_departure_time < end_time
        )
    
    else:
        raise ValueError("Invalid period. Choose 'day', 'week', 'month', or 'year'.")
    
    # Execute and return the count
    return query.scalar()

# Example usage functions
def get_daily_ticket_count(db: Session):
    """Get total tickets for today"""
    return get_ticket_count_by_period(db, 'day')

def get_weekly_ticket_count(db: Session):
    """Get total tickets for this week"""
    return get_ticket_count_by_period(db, 'week')

def get_monthly_ticket_count(db: Session):
    """Get total tickets for this month"""
    return get_ticket_count_by_period(db, 'month')

def get_yearly_ticket_count(db: Session):
    """Get total tickets for this year"""
    return get_ticket_count_by_period(db, 'year')

# Optional: Get detailed ticket count breakdown
def get_ticket_count_details(db: Session):
    """
    Get ticket counts for different time periods
    
    :param db: Database session
    :return: Dictionary with ticket counts
    """
    return {
        'daily': get_daily_ticket_count(db),
        'weekly': get_weekly_ticket_count(db),
        'monthly': get_monthly_ticket_count(db),
        'yearly': get_yearly_ticket_count(db)
    }