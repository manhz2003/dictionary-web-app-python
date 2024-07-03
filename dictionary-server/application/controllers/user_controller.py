# application/controllers/user_controller.py

from flask import Blueprint, jsonify, request
from application.services.user_service import UserService

user_controller = Blueprint('user_controller', __name__, url_prefix='/api/users')


@user_controller.route('/register/admin', methods=['POST'])
def register_admin():
    data = request.json
    new_user = UserService.register_admin(data)
    return jsonify(new_user.serialize()), 201


@user_controller.route('/register/user', methods=['POST'])
def register_user():
    data = request.json
    new_user, error = UserService.register_user(data)

    if error:
        return jsonify({'error': error}), 400

    return jsonify(new_user.serialize()), 201


@user_controller.route('/login', methods=['POST'])
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


@user_controller.route('/change-password', methods=['PUT'])
def change_password():
    data = request.json
    email = data.get('email')
    old_password = data.get('oldPassword')
    new_password = data.get('newPassword')

    user, error = UserService.change_password(email, old_password, new_password)

    if error:
        return jsonify({'error': error}), 400

    if not user:
        return jsonify({'error': 'User not found'}), 404

    return jsonify({'message': 'Password updated successfully'}), 200


@user_controller.route('/update-profile', methods=['PUT'])
def update_profile():
    data = request.json
    updated_user, error = UserService.update_profile(data)

    if error:
        return jsonify({'error': error}), 400

    return jsonify(updated_user.serialize()), 200


@user_controller.route('/get-profile/<int:user_id>', methods=['GET'])
def get_profile(user_id):
    user = UserService.get_profile(user_id)

    if not user:
        return jsonify({'error': 'User not found'}), 404

    return jsonify({
        'phoneNumber': user.phone_number,
        'address': user.address,
        'id': user.id,
        'fullname': user.fullname,
        'avatar': user.avatar,
        'email': user.email
    }), 200
