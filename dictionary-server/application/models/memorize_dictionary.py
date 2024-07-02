# application/models/memorize_dictionary.py
from application import db

class MemorizeDictionary(db.Model):
    __tablename__ = 'memorize_dictionaries'

    id = db.Column(db.BigInteger, primary_key=True)
    dictionary_id = db.Column(db.BigInteger, db.ForeignKey('dictionaries.id'), nullable=True)
    user_id = db.Column(db.BigInteger, db.ForeignKey('users.id'), nullable=True)

    def __init__(self, dictionary_id, user_id):
        self.dictionary_id = dictionary_id
        self.user_id = user_id
