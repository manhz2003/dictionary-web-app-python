# application/models/user_roles.py
from application import db

class UserRoles(db.Model):
    __tablename__ = 'user_roles'

    id = db.Column(db.BigInteger, primary_key=True)
    role_id = db.Column(db.BigInteger, db.ForeignKey('roles.id'), nullable=False)
    user_id = db.Column(db.BigInteger, db.ForeignKey('users.id'), nullable=False)

    def __init__(self, role_id, user_id):
        self.role_id = role_id
        self.user_id = user_id
