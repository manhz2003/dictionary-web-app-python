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
            admin_role = Role(name_role='Admin')
            db.session.add(admin_role)
            db.session.commit()

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

        user_role = UserRoles(role_id=admin_role.id, user_id=new_user.id)
        db.session.add(user_role)
        db.session.commit()

        return new_user

    @staticmethod
    def register_user(data):
        # Kiểm tra xem email đã tồn tại chưa
        existing_user = User.query.filter_by(email=data['email']).first()
        if existing_user:
            return None, 'Email already exists'

        # Kiểm tra xem role user đã tồn tại chưa
        user_role = Role.query.filter_by(name_role='User').first()
        if not user_role:
            # Nếu chưa tồn tại, tạo role user mới
            user_role = Role(name_role='User', type=2)
            db.session.add(user_role)
            db.session.commit()

        # Tạo user mới với vai trò user và mã hóa mật khẩu
        new_user = User(
            address=data.get('address', ''),
            avatar=data.get('avatar', ''),
            email=data['email'],
            fullname=data['fullname'],
            password=data['password'],
            phone_number=data.get('phoneNumber', ''),
            refresh_token=data.get('refreshToken', '')
        )
        db.session.add(new_user)
        db.session.commit()

        # Gán role user cho user mới trong bảng trung gian user_roles
        user_role_mapping = UserRoles(role_id=user_role.id, user_id=new_user.id)
        db.session.add(user_role_mapping)
        db.session.commit()

        return new_user, None

    @staticmethod
    def login(data):
        email = data.get('email')
        password = data.get('password')

        user = User.query.filter_by(email=email).first()

        if not user or not user.check_password(password):
            return None

        roles = UserService.get_user_roles(user)

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
            'roles': roles,
            'basicUserInfo': user.basic_info(),
            'avatarUrl': ''
        }

    @staticmethod
    def get_user_roles(user):
        return [{'nameRole': role.name_role, 'type': role.type} for role in user.roles] if user.roles else []

    @staticmethod
    def change_password(email, old_password, new_password):
        # Tìm user dựa trên email
        user = User.query.filter_by(email=email).first()
        if not user:
            return None, 'User not found'

        # Kiểm tra mật khẩu cũ
        if not user.check_password(old_password):
            return None, 'Incorrect old password'

        # Cập nhật mật khẩu mới
        user.set_password(new_password)
        db.session.commit()

        return user, None

    @staticmethod
    def update_profile(data):
        user_id = data.get('userId')
        user = User.query.get(user_id)

        if not user:
            return None, 'User not found'

        # Cập nhật thông tin người dùng từ dữ liệu nhận được
        user.fullname = data.get('fullname', user.fullname)
        user.email = data.get('email', user.email)
        user.phone_number = data.get('phoneNumber', user.phone_number)
        user.address = data.get('address', user.address)
        user.avatar = data.get('avatar', user.avatar)

        # Lưu thay đổi vào cơ sở dữ liệu
        db.session.commit()

        return user, None

    @staticmethod
    def get_profile(user_id):
        user = User.query.get(user_id)
        return user

    @staticmethod
    def get_total_users():
        total_users = User.query.count()
        return total_users

    @staticmethod
    def get_all_users():
        users = User.query.all()
        result = []
        for user in users:
            user_data = {
                'id': user.id,
                'fullname': user.fullname,
                'email': user.email,
                'phoneNumber': user.phone_number,
                'address': user.address,
                'avatar': user.avatar,
                'roles': [role.name_role for role in user.roles]
            }
            result.append(user_data)
        return result

    @staticmethod
    def delete_user_by_id(user_id):
        user = User.query.get(user_id)
        if user:
            db.session.delete(user)
            db.session.commit()
            return True
        else:
            return False

    @staticmethod
    def update_user_by_id(data):
        user_id = data.get('userId')
        user = User.query.get(user_id)

        if not user:
            return None

        # Update thông tin user
        user.fullname = data.get('fullname', user.fullname)
        user.email = data.get('email', user.email)
        user.phone_number = data.get('phoneNumber', user.phone_number)
        user.address = data.get('address', user.address)

        # Lấy và cập nhật vai trò mới cho user
        role_id = data.get('roleId')
        if role_id:
            role = Role.query.get(role_id)
            if role:
                # Xóa hết các vai trò cũ của user trong bảng user_roles
                UserRoles.query.filter_by(user_id=user.id).delete()

                # Thêm vai trò mới vào bảng user_roles
                user_role = UserRoles(role_id=role.id, user_id=user.id)
                db.session.add(user_role)

        db.session.commit()
        return user

    @staticmethod
    def create_user(data):
        # Kiểm tra xem email đã tồn tại chưa
        existing_user = User.query.filter_by(email=data['email']).first()
        if existing_user:
            return None, 'Email already exists'

        # Kiểm tra xem role đã tồn tại chưa
        role_id = data.get('roleId')
        role = Role.query.get(role_id)
        if not role:
            return None, 'Role not found'

        # Tạo user mới với các giá trị mặc định hoặc None cho các trường không bắt buộc
        new_user = User(
            address=data.get('address', ''),
            email=data['email'],
            fullname=data['fullname'],
            avatar=data.get('avatar', None),  # Xử lý trường hợp avatar có thể là None
            password=data.get('password', ''),  # Xử lý trường hợp password có thể là None
            refresh_token=data.get('refreshToken', None),  # Xử lý trường hợp refreshToken có thể là None
            phone_number=data.get('phoneNumber', ''),
        )

        # Nếu password không tồn tại, không thực hiện mã hóa
        if new_user.password:
            new_user.set_password(new_user.password)

        db.session.add(new_user)
        db.session.commit()

        # Gán role cho user mới trong bảng trung gian user_roles
        user_role_mapping = UserRoles(role_id=role.id, user_id=new_user.id)
        db.session.add(user_role_mapping)
        db.session.commit()

        return new_user, None

