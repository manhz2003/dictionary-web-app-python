# application/services/dictionary_service.py

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
                    "nameCategory": category.name_category,  # Adjusted to name_category
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
                # Create a new dictionary object
                new_dictionary = Dictionary(
                    vietnamese=dictionary_data['vietnamese'],
                    english=dictionary_data['english'],
                    phonetic_transcription=dictionary_data['phoneticTranscription'],
                    explanation=dictionary_data['explain'],
                    word_type=dictionary_data['wordType'],
                    thumbnail=dictionary_data.get('thumbnail'),  # Handle optional field
                    category_id=dictionary_data['category']
                )

                # Add examples if provided
                if 'englishExample' in dictionary_data and 'vietnameseExample' in dictionary_data:
                    for eng_example, vie_example in zip(dictionary_data['englishExample'],
                                                        dictionary_data['vietnameseExample']):
                        new_example = Example(
                            example=eng_example,
                            example_translation=vie_example,
                            dictionary_id=new_dictionary.id  # Assign dictionary_id to the example
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
