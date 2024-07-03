# application/models/example.py

from application import db

class Example(db.Model):
    __tablename__ = 'examples'

    id = db.Column(db.BigInteger, primary_key=True)
    example = db.Column(db.String(255), nullable=True)
    example_translation = db.Column(db.String(255), nullable=True)
    dictionary_id = db.Column(db.BigInteger, db.ForeignKey('dictionaries.id'), nullable=True)

    def __init__(self, example, example_translation, dictionary_id):
        self.example = example
        self.example_translation = example_translation
        self.dictionary_id = dictionary_id
