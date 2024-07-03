from application.models.dictionary import Dictionary
from application.models.example_dictionary import Example
from application.models.category import Category

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
