# application/models/user.py
from application import db
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.BigInteger, primary_key=True)
    address = db.Column(db.String(255), nullable=True)
    avatar = db.Column(db.Text, nullable=True)
    email = db.Column(db.String(255), nullable=True)
    fullname = db.Column(db.String(255), nullable=True)
    password = db.Column(db.String(255), nullable=True)
    phone_number = db.Column(db.String(255), nullable=True)
    refresh_token = db.Column(db.String(255), nullable=True)
    status = db.Column(db.Boolean, default=True, nullable=False)

    roles = db.relationship('Role', secondary='user_roles', lazy='subquery',
                            backref=db.backref('users', lazy=True))

    def __init__(self, address, avatar, email, fullname, password, phone_number, refresh_token, status=True):
        self.address = address
        self.avatar = avatar
        self.email = email
        self.fullname = fullname
        self.set_password(password)  # Mã hóa mật khẩu khi khởi tạo
        self.phone_number = phone_number
        self.refresh_token = refresh_token
        self.status = status

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def serialize(self):
        return {
            'id': self.id,
            'fullname': self.fullname,
            'email': self.email,
            'phoneNumber': self.phone_number,
            'address': self.address,
            'password': self.password,
            'avatar': self.avatar,
            'refreshToken': self.refresh_token,
            'status': self.status,
            'userRoles': [{'nameRole': role.name_role, 'type': role.type} for role in self.roles],
            'roles': [],  # Để dễ dàng chỉnh sửa nếu cần
            'basicUserInfo': {
                'id': self.id,
                'fullname': self.fullname,
                'email': self.email,
                'phoneNumber': self.phone_number,
                'address': self.address,
                'avatar': self.avatar,
                'status': self.status
            },
            'avatarUrl': ''
        }

    def basic_info(self):
        return {
            'id': self.id,
            'address': self.address,
            'avatar': self.avatar,
            'email': self.email,
            'fullname': self.fullname,
            'phone_number': self.phone_number,
            'status': self.status,
            'roles': [role.name_role for role in self.roles]
        }
