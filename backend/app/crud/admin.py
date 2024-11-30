from .crud_utils import *
from models import Admin
from sqlalchemy.orm import Session
from datetime import datetime
from schemas import AdminCreate, AdminUpdate


def get_admin(admin_id: int, db: Session) -> Admin:
    """
    Equivalent to a SQL query that is 'SELECT * FROM table admins where admins.id = admin_id'
    Returns admin
    """
    db_admin = db.query(Admin).filter(Admin.admin_id == admin_id).first()

    # if not db_admin:
    # raise HTTPException(status_code=404, detail="admin not found")
    return db_admin


def get_all_admins(db: Session):
    """
    Equivalent to a SQL query that is 'SELECT * FROM table admins'
    Returns admin
    """
    return db.query(Admin).all()


def get_admin_by_username(admin_username: str, db: Session) -> Admin:
    """
    Equivalent to a SQL query that is 'SELECT * FROM table admins where admins.email = admin_email'
    Returns admin
    """
    db_admin = db.query(Admin).filter(Admin.username == admin_username).first()

    return db_admin


def delete_admin(db_admin: Admin, db: Session) -> Admin:
    """
    Equivalent to a SQL query that is 'DELETE FROM table admins where admins.id = admin_id'
    Returns admin
    """
    # return the deleted object, cascade is on for passengers and admin
    return delete(db_admin, db)


def create_admin(admin: AdminCreate, db: Session):
    # note: Cần phải xây dựng cơ sở trước rồi sẽ tạo authentication với hashing password sau.
    """
    Equivalent to a SQL query that is 'INSERT INTO admins values (admin.email, admin.password, datetime.now)'
    """

    return create(Admin, db, admin.dict())


def update_admin(db_admin: Admin, admin: AdminUpdate, db: Session):
    """
    Equivalent to a SQL query that is 'UPDATE admins SET password=admin.password WHERE admins.id = admin_id'
    """
    return update(db_admin, db, admin.dict())
