# application/controllers/user_controller.py

from flask import Blueprint, jsonify, request
from application.services.user_service import UserService

user_controller = Blueprint('user_controller', __name__, url_prefix='/api/users')

@user_controller.route('/register/admin', methods=['POST'])
def register_admin():
    data = request.json  # Lấy dữ liệu từ request
    new_user = UserService.register_admin(data)  # Gọi UserService để đăng ký admin
    return jsonify(new_user.serialize()), 201

login_controller = Blueprint('login_controller', __name__, url_prefix='/api/users')

@login_controller.route('/login', methods=['POST'])
def login():
    data = request.json
    user = UserService.login(data)

    if not user:
        return jsonify({'error': 'Invalid email or password'}), 401

    # Chỉnh sửa ở đây để đảm bảo trả về dữ liệu theo đúng định dạng
    return jsonify({
        'phoneNumber': user['phoneNumber'],  # Sử dụng key 'phoneNumber' trong từ điển user
        'address': user['address'],  # Sử dụng key 'address' trong từ điển user
        'roles': user['roles'],  # Sử dụng key 'roles' trong từ điển user
        'id': user['id'],  # Sử dụng key 'id' trong từ điển user
        'fullname': user['fullname'],  # Sử dụng key 'fullname' trong từ điển user
        'avatar': user['avatar'],  # Sử dụng key 'avatar' trong từ điển user
        'email': user['email'],  # Sử dụng key 'email' trong từ điển user
        'status': user['status']  # Sử dụng key 'status' trong từ điển user
    }), 200