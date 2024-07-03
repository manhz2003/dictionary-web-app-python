from flask import Blueprint, jsonify, request
from application.services.category_service import CategoryService

category_controller = Blueprint('category_controller', __name__, url_prefix='/api/categories')


@category_controller.route('', methods=['POST'])
def create_category():
    data = request.get_json()

    if not data:
        return jsonify({'error': 'Invalid JSON'}), 400

    name_category = data.get('nameCategory')
    thumbnail = data.get('thumbnail')
    describe = data.get('description')

    if not name_category or not thumbnail:
        return jsonify({'error': 'Missing required fields'}), 400

    # Create a new Category
    new_category, error = CategoryService.create_category(name_category, thumbnail, describe)

    if error:
        return jsonify({'error': error}), 400

    return jsonify({'message': 'Category created successfully', 'category': new_category.to_dict()}), 201


@category_controller.route('', methods=['GET'])
def get_all_categories():
    categories = CategoryService.get_all_categories()
    categories_list = [category.to_dict() for category in categories]
    return jsonify(categories_list), 200


@category_controller.route('/', methods=['PUT'])
def update_category():
    data = request.get_json()
    category_id = data.get('id')
    updated_category = CategoryService.update_category(category_id, data)
    if updated_category:
        return jsonify({'message': 'Category updated successfully', 'category': updated_category.to_dict()}), 200
    return jsonify({'message': 'Category not found or update failed'}), 404


@category_controller.route('/<int:id>', methods=['DELETE'])
def delete_category(id):
    deleted = CategoryService.delete_category(id)
    if deleted:
        return jsonify({'message': 'Category deleted successfully'}), 200
    return jsonify({'message': 'Category not found or delete failed'}), 404


@category_controller.route('/count', methods=['GET'])
def count_categories():
    count = CategoryService.count_categories()
    return str(count), 200