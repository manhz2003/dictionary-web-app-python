# application/models/dictionary.py
from application import db

class Dictionary(db.Model):
    __tablename__ = 'dictionaries'

    id = db.Column(db.BigInteger, primary_key=True)
    english = db.Column(db.String(255), nullable=True)
    explanation = db.Column(db.Text, nullable=True)
    phonetic_transcription = db.Column(db.String(255), nullable=True)
    thumbnail = db.Column(db.Text, nullable=True)
    vietnamese = db.Column(db.String(255), nullable=True)
    word_type = db.Column(db.String(255), nullable=True)
    category_id = db.Column(db.BigInteger, db.ForeignKey('categories.id'), nullable=True)

    examples = db.relationship('Example', backref='dictionary', lazy=True, cascade='all, delete-orphan')

    def __init__(self, english, explanation, phonetic_transcription, thumbnail, vietnamese, word_type, category_id):
        self.english = english
        self.explanation = explanation
        self.phonetic_transcription = phonetic_transcription
        self.thumbnail = thumbnail
        self.vietnamese = vietnamese
        self.word_type = word_type
        self.category_id = category_id
