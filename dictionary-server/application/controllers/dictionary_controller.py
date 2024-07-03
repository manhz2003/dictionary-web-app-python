from flask import Blueprint, jsonify
from application.services.dictionary_service import DictionaryService

dictionary_bp = Blueprint('dictionary_bp', __name__, url_prefix='/api/dictionaries')

dictionary_service = DictionaryService()


@dictionary_bp.route('/', methods=['GET'])
def get_dictionaries_with_examples():
    dictionaries = dictionary_service.get_dictionaries_with_examples()
    return jsonify(dictionaries), 200
