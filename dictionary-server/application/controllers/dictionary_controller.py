from flask import Blueprint, jsonify, request
from application.services.dictionary_service import DictionaryService

# Blueprint để cấu trúc chia tác controller riêng ra và phải đăng ký nó để sử dụng controller đó
dictionary_bp = Blueprint('dictionary_bp', __name__, url_prefix='/api/dictionaries')

dictionary_service = DictionaryService()


# trả về 1 tuple gồm (dictionary, status_code)
@dictionary_bp.route('/', methods=['GET'])
def get_dictionaries_with_examples():
    dictionaries = dictionary_service.get_dictionaries_with_examples()
    return jsonify(dictionaries), 200


@dictionary_bp.route('/dictionary', methods=['POST'])
def create_dictionary():
    data = request.json
    if not data:
        return jsonify({'error': 'Invalid data, JSON body required'}), 400
    new_dictionary = dictionary_service.create_dictionary(data)
    if new_dictionary:
        return jsonify(new_dictionary), 201
    else:
        return jsonify({'error': 'Failed to create dictionary'}), 500


@dictionary_bp.route('/update', methods=['PUT'])
def update_dictionary():
    try:
        data = request.get_json()
        updated_dictionary, error = dictionary_service.update_dictionary(data)

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


@dictionary_bp.route('/<int:dictionary_id>', methods=['GET'])
def search_dictionary_detail_by_id(dictionary_id):
    dictionary_detail = dictionary_service.get_dictionary_detail_by_id(dictionary_id)

    if not dictionary_detail:
        return jsonify({'error': 'Dictionary not found'}), 404

    return jsonify(dictionary_detail), 200


@dictionary_bp.route('/search-by-category/<int:category_id>', methods=['GET'])
def search_dictionary_by_category_id(category_id):
    dictionaries = dictionary_service.get_dictionaries_by_category_id(category_id)

    if not dictionaries:
        return jsonify({'error': 'No dictionaries found for the category'}), 404

    return jsonify(dictionaries), 200


@dictionary_bp.route('/search', methods=['GET'])
def search_dictionary_vietnamese():
    keyword = request.args.get('keyword')
    page = int(request.args.get('page', 0))
    size = int(request.args.get('size', 10))

    dictionaries = dictionary_service.search_dictionaries_vietnamese(keyword, page, size)

    if not dictionaries:
        return jsonify({'error': 'No dictionaries found for the keyword'}), 404

    return jsonify(dictionaries), 200
