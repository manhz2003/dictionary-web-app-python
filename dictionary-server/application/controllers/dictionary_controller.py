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