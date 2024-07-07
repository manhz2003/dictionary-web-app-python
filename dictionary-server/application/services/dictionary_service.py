from application.models.dictionary import Dictionary
from application.models.example_dictionary import Example
from application.models.category import Category
from application import db


class DictionaryService:

    def get_dictionaries_with_examples(self):
        dictionaries = Dictionary.query.all()
        dictionaries_with_examples = []

        for dictionary in dictionaries:
            examples = Example.query.filter_by(dictionary_id=dictionary.id).all()
            category = Category.query.get(dictionary.category_id)

            dictionary_data = {
                "id": dictionary.id,
                "vietnamese": dictionary.vietnamese,
                "english": dictionary.english,
                "phoneticTranscription": dictionary.phonetic_transcription,
                "explanation": dictionary.explanation,
                "wordType": dictionary.word_type,
                "thumbnail": dictionary.thumbnail,
                "category": {
                    "id": category.id,
                    "nameCategory": category.name_category,
                    "thumbnail": category.thumbnail,
                    "description": category.describe
                },
                "englishExample": [example.example for example in examples],
                "vietnameseExample": [example.example_translation for example in examples]
            }
            dictionaries_with_examples.append(dictionary_data)

        return dictionaries_with_examples

    def create_dictionary(self, data):
        try:
            new_dictionaries = []

            for dictionary_data in data:
                new_dictionary = Dictionary(
                    vietnamese=dictionary_data['vietnamese'],
                    english=dictionary_data['english'],
                    phonetic_transcription=dictionary_data['phoneticTranscription'],
                    explanation=dictionary_data['explain'],
                    word_type=dictionary_data['wordType'],
                    thumbnail=dictionary_data.get('thumbnail'),
                    category_id=dictionary_data['category']
                )

                if 'englishExample' in dictionary_data and 'vietnameseExample' in dictionary_data:
                    for eng_example, vie_example in zip(dictionary_data['englishExample'],
                                                        dictionary_data['vietnameseExample']):
                        new_example = Example(
                            example=eng_example,
                            example_translation=vie_example,
                            dictionary_id=new_dictionary.id
                        )
                        new_dictionary.examples.append(new_example)

                db.session.add(new_dictionary)
                new_dictionaries.append(new_dictionary.serialize())

            db.session.commit()

            return new_dictionaries
        except Exception as e:
            print(f"Error creating dictionaries: {repr(e)}")
            db.session.rollback()
            return None

    def update_dictionary(self, data):
        try:
            print("Updating dictionary with data:")
            print(data)
            dictionary_id = data[0]['id']
            dictionary_to_update = Dictionary.query.get(dictionary_id)

            if not dictionary_to_update:
                return None, "Dictionary not found"

            dictionary_to_update.vietnamese = data[0]['vietnamese']
            dictionary_to_update.english = data[0]['english']
            dictionary_to_update.phonetic_transcription = data[0]['phoneticTranscription']
            dictionary_to_update.explanation = data[0]['explain']
            dictionary_to_update.word_type = data[0]['wordType']
            dictionary_to_update.thumbnail = data[0].get('thumbnail')
            dictionary_to_update.category_id = data[0]['category']

            # Xóa các ví dụ hiện có và thêm các ví dụ mới
            dictionary_to_update.examples.clear()

            if 'englishExample' in data[0] and 'vietnameseExample' in data[0]:
                for eng_example, vie_example in zip(data[0]['englishExample'], data[0]['vietnameseExample']):
                    new_example = Example(
                        example=eng_example,
                        example_translation=vie_example,
                        dictionary_id=dictionary_id
                    )
                    dictionary_to_update.examples.append(new_example)

            db.session.commit()

            return dictionary_to_update.serialize(), None
        except Exception as e:
            print(f"Error updating dictionary: {repr(e)}")
            db.session.rollback()
            return None, str(e)

    def delete_dictionary(self, dictionary_id):
        try:
            # Tìm từ điển cần xóa
            dictionary_to_delete = Dictionary.query.get(dictionary_id)

            if not dictionary_to_delete:
                return None

            # Xóa các ví dụ của từ điển
            Example.query.filter_by(dictionary_id=dictionary_id).delete()

            # Xóa từ điển
            db.session.delete(dictionary_to_delete)
            db.session.commit()

            return dictionary_to_delete
        except Exception as e:
            print(f"Error deleting dictionary: {repr(e)}")
            db.session.rollback()
            return None

    def get_total_vietnamese_count(self):
        total_vietnamese_count = Dictionary.query.count()
        return total_vietnamese_count

    def get_total_explanations_count(self):
        total_explanations_count = Dictionary.query.filter(Dictionary.explanation.isnot(None)).count()
        return total_explanations_count

    def get_dictionary_detail_by_id(self, dictionary_id):
        dictionary = Dictionary.query.get(dictionary_id)

        if not dictionary:
            return None

        examples = Example.query.filter_by(dictionary_id=dictionary_id).all()
        category = Category.query.get(dictionary.category_id)

        dictionary_detail = {
            "id": dictionary.id,
            "vietnamese": dictionary.vietnamese,
            "english": dictionary.english,
            "phoneticTranscription": dictionary.phonetic_transcription,
            "explanation": dictionary.explanation,
            "wordType": dictionary.word_type,
            "thumbnail": dictionary.thumbnail,
            "category": {
                "id": category.id,
                "nameCategory": category.name_category,
                "thumbnail": category.thumbnail,
                "description": category.describe
            },
            "englishExample": [example.example for example in examples],
            "vietnameseExample": [example.example_translation for example in examples]
        }

        return dictionary_detail

    def get_dictionaries_by_category_id(self, category_id):
        dictionaries = Dictionary.query.filter_by(category_id=category_id).all()

        if not dictionaries:
            return None

        dictionaries_list = []
        for dictionary in dictionaries:
            category = Category.query.get(dictionary.category_id)

            dictionary_data = {
                "id": dictionary.id,
                "vietnamese": dictionary.vietnamese,
                "english": dictionary.english,
                "phoneticTranscription": dictionary.phonetic_transcription,
                "explanation": dictionary.explanation,
                "wordType": dictionary.word_type,
                "thumbnail": dictionary.thumbnail,
                "category": {
                    "id": category.id,
                    "nameCategory": category.name_category,
                    "thumbnail": category.thumbnail,
                    "description": category.describe
                },
                "englishExample": None,
                "vietnameseExample": None
            }
            dictionaries_list.append(dictionary_data)

        return dictionaries_list

    def search_dictionaries_vietnamese(self, keyword, page, size):
        dictionaries = Dictionary.query.filter(Dictionary.english.like(f'%{keyword}%')).offset(page * size).limit(
            size).all()

        if not dictionaries:
            return None

        dictionaries_list = []
        for dictionary in dictionaries:
            category = Category.query.get(dictionary.category_id)

            dictionary_data = {
                "id": dictionary.id,
                "vietnamese": dictionary.vietnamese,
                "english": dictionary.english,
                "phoneticTranscription": dictionary.phonetic_transcription,
                "explanation": dictionary.explanation,
                "wordType": dictionary.word_type,
                "thumbnail": dictionary.thumbnail,
                "category": {
                    "id": category.id,
                    "nameCategory": category.name_category,
                    "thumbnail": category.thumbnail,
                    "description": category.describe
                },
                "englishExample": None,
                "vietnameseExample": None
            }
            dictionaries_list.append(dictionary_data)

        return dictionaries_list