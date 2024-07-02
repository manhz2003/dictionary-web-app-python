# application/services/user_service.py
from application import db
from application.models.user import User
from application.models.role import Role
from application.models.user_roles import UserRoles

class UserService:
    @staticmethod
    def register_admin(data):
        # Kiểm tra xem role admin đã tồn tại chưa
        admin_role = Role.query.filter_by(name_role='Admin').first()
        if not admin_role:
            # Nếu chưa tồn tại, tạo role admin mới
            admin_role = Role(name_role='Admin')
            db.session.add(admin_role)
            db.session.commit()

        # Tạo user mới với vai trò admin và mã hóa mật khẩu
        new_user = User(
            address=data['address'],
            avatar=data['avatar'],
            email=data['email'],
            fullname=data['fullname'],
            password=data['password'],
            phone_number=data['phoneNumber'],
            refresh_token=data['refreshToken']
        )
        db.session.add(new_user)
        db.session.commit()

        # Gán role admin cho user mới trong bảng trung gian user_roles
        user_role = UserRoles(role_id=admin_role.id, user_id=new_user.id)
        db.session.add(user_role)
        db.session.commit()

        return new_user


    @staticmethod
    def login(data):
        email = data.get('email')
        password = data.get('password')

        user = User.query.filter_by(email=email).first()

        if not user or not user.check_password(password):
            return None

        # Lấy danh sách các vai trò của người dùng
        roles = UserService.get_user_roles(user)

        # Trả về một từ điển chứa thông tin của người dùng kèm vai trò
        return {
            'id': user.id,
            'fullname': user.fullname,
            'email': user.email,
            'phoneNumber': user.phone_number,
            'address': user.address,
            'password': user.password,
            'avatar': user.avatar,
            'refreshToken': user.refresh_token,
            'status': user.status,
            'roles': roles,  # Thêm thông tin về vai trò của người dùng
            'basicUserInfo': user.basic_info(),
            'avatarUrl': ''
        }

    @staticmethod
    def get_user_roles(user):
        return [{'nameRole': role.name_role, 'type': role.type} for role in user.roles] if user.roles else []