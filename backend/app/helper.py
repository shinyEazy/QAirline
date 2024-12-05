import os
from app.schemas.user import UserCreateAdmin
import json
from core.security import bcrypt_context


def get_default_admin():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    admin_file_path = os.path.join(current_dir, "admin.json")
    with open(admin_file_path, "r") as admin_file:
        admin_data = json.load(admin_file)
        admin_data["password"] = bcrypt_context.hash(admin_data["password"])
    admin_user = UserCreateAdmin(**admin_data)

    return admin_user
