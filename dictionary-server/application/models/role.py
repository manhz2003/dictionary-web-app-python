# application/models/role.py

from application import db

class Role(db.Model):
    __tablename__ = 'roles'

    id = db.Column(db.BigInteger, primary_key=True)
    name_role = db.Column(db.String(255), nullable=False)

    # Thêm thuộc tính type
    type = db.Column(db.Integer, nullable=False, default=0)  # Ví dụ: mặc định là 0

    def __init__(self, name_role, type=0):
        self.name_role = name_role
        self.type = type

    def serialize(self):
        return {
            'id': self.id,
            'nameRole': self.name_role,
            'type': self.type  # Bổ sung type vào serialize method
        }
