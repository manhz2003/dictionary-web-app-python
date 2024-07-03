from flask import Blueprint, jsonify, request  # Thêm request từ Flask
from application.services.dictionary_service import DictionaryService

dictionary_bp = Blueprint('dictionary_bp', __name__, url_prefix='/api/dictionaries')

dictionary_service = DictionaryService()

@dictionary_bp.route('/', methods=['GET'])
def get_dictionaries_with_examples():
    dictionaries = dictionary_service.get_dictionaries_with_examples()
    return jsonify(dictionaries), 200


@dictionary_bp.route('/dictionary', methods=['POST'])
def create_dictionary():
    data = request.json  # Lấy dữ liệu từ body của request
    if not data:
        return jsonify({'error': 'Invalid data, JSON body required'}), 400

    # Thực hiện tạo mới từ điển
    new_dictionary = dictionary_service.create_dictionary(data)
    if new_dictionary:
        return jsonify(new_dictionary), 201  # Trả về mã status 201 Created khi tạo mới thành công
    else:
        return jsonify({'error': 'Failed to create dictionary'}), 500


@dictionary_bp.route('/update', methods=['PUT'])
def update_dictionary():
    try:
        data = request.get_json()
        updated_dictionary, error = dictionary_service.update_dictionary(data)  # Sử dụng dictionary_service thay vì service

        if error:
            return jsonify({"message": "Failed to update dictionary", "error": error}), 400

        return jsonify(updated_dictionary), 200

    except Exception as e:
        return jsonify({"message": "Internal Server Error", "error": str(e)}), 500


@dictionary_bp.route('/<int:dictionary_id>', methods=['DELETE'])
def delete_dictionary(dictionary_id):
    deleted_dictionary = dictionary_service.delete_dictionary(dictionary_id)
    if deleted_dictionary:
        return jsonify({'message': f'Dictionary with ID {dictionary_id} and its examples deleted'}), 200
    else:
        return jsonify({'error': 'Dictionary not found'}), 404


@dictionary_bp.route('/total-counts', methods=['GET'])
def get_total_dictionary_and_explanation_counts():
    total_vietnamese_count = dictionary_service.get_total_vietnamese_count()
    total_explanations_count = dictionary_service.get_total_explanations_count()

    return jsonify({
        "totalVietnameseCount": total_vietnamese_count,
        "totalExplanationsCount": total_explanations_count
    }), 200

