from application import db
from application.models.example_dictionary import Example


class Dictionary(db.Model):
    __tablename__ = 'dictionaries'

    id = db.Column(db.BigInteger, primary_key=True)
    vietnamese = db.Column(db.String(255), nullable=False)
    english = db.Column(db.String(255), nullable=False)
    phonetic_transcription = db.Column(db.String(255), nullable=False)
    explanation = db.Column(db.Text, nullable=False)
    word_type = db.Column(db.String(50), nullable=False)
    thumbnail = db.Column(db.String(255), nullable=True)
    category_id = db.Column(db.BigInteger, db.ForeignKey('categories.id'), nullable=False)
    examples = db.relationship('Example', backref='dictionary', lazy=True)

    def __init__(self, vietnamese, english, phonetic_transcription, explanation, word_type, thumbnail, category_id):
        self.vietnamese = vietnamese
        self.english = english
        self.phonetic_transcription = phonetic_transcription
        self.explanation = explanation
        self.word_type = word_type
        self.thumbnail = thumbnail
        self.category_id = category_id

    def serialize(self):
        return {
            "id": self.id,
            "vietnamese": self.vietnamese,
            "english": self.english,
            "phoneticTranscription": self.phonetic_transcription,
            "explanation": self.explanation,
            "wordType": self.word_type,
            "thumbnail": self.thumbnail,
            "category_id": self.category_id
        }
