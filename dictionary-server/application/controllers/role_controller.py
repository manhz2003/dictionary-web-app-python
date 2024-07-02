from flask import Blueprint, jsonify, request
from application.services.role_service import RoleService

role_controller = Blueprint('role_controller', __name__, url_prefix='/api/roles')

# api get all roles
@role_controller.route('', methods=['GET'])
def get_roles():
    roles = RoleService.get_all_roles()
    return jsonify([role.serialize() for role in roles]), 200  # Trả về mã status 200 OK khi thành công

@role_controller.route('/<int:role_id>', methods=['GET'])
def get_role(role_id):
    role = RoleService.get_role_by_id(role_id)
    if not role:
        return jsonify({'error': 'Role not found'}), 404  # Trả về mã status 404 Not Found nếu không tìm thấy role
    return jsonify(role.serialize()), 200  # Trả về mã status 200 OK khi thành công

@role_controller.route('/bulk', methods=['POST'])
def create_roles():
    data = request.json
    roles = RoleService.create_roles(data)
    return jsonify([role.serialize() for role in roles]), 201  # Trả về mã status 201 Created khi tạo mới thành công

@role_controller.route('/<int:role_id>', methods=['PUT'])
def update_role(role_id):
    data = request.json
    updated_role = RoleService.update_role(role_id, data.get('nameRole'))
    if not updated_role:
        return jsonify({'error': 'Role not found'}), 404  # Trả về mã status 404 Not Found nếu không tìm thấy role
    return jsonify(updated_role.serialize()), 200  # Trả về mã status 200 OK khi cập nhật thành công

@role_controller.route('/<int:role_id>', methods=['DELETE'])
def delete_role(role_id):
    if RoleService.delete_role(role_id):
        return '', 204  # Trả về mã status 204 No Content khi xóa thành công
    else:
        return jsonify({'error': 'Role not found'}), 404  # Trả về mã status 404 Not Found nếu không tìm thấy role
