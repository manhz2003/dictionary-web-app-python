# application/controllers/user_controller.py

from flask import Blueprint, jsonify, request
from application.services.user_service import UserService

user_controller = Blueprint('user_controller', __name__, url_prefix='/api/users')


@user_controller.route('/register/admin', methods=['POST'])
def register_admin():
    data = request.json
    new_user = UserService.register_admin(data)
    return jsonify(new_user.serialize()), 201


user_register_controller = Blueprint('user_register_controller', __name__, url_prefix='/api/users')


@user_register_controller.route('/register/user', methods=['POST'])
def register_user():
    data = request.json
    new_user, error = UserService.register_user(data)

    if error:
        return jsonify({'error': error}), 400

    return jsonify(new_user.serialize()), 201


login_controller = Blueprint('login_controller', __name__, url_prefix='/api/users')


@login_controller.route('/login', methods=['POST'])
def login():
    data = request.json
    user = UserService.login(data)

    if not user:
        return jsonify({'error': 'Invalid email or password'}), 401

    return jsonify({
        'phoneNumber': user['phoneNumber'],
        'address': user['address'],
        'roles': user['roles'],
        'id': user['id'],
        'fullname': user['fullname'],
        'avatar': user['avatar'],
        'email': user['email'],
        'status': user['status']
    }), 200
