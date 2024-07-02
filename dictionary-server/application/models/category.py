# application/models/category.py
from application import db

class Category(db.Model):
    __tablename__ = 'categories'

    id = db.Column(db.BigInteger, primary_key=True)
    describe = db.Column(db.String(255), nullable=True)
    name_category = db.Column(db.String(255), nullable=True)
    thumbnail = db.Column(db.Text, nullable=True)

    dictionaries = db.relationship('Dictionary', backref='category', lazy=True, cascade='all, delete-orphan')

    def __init__(self, describe, name_category, thumbnail):
        self.describe = describe
        self.name_category = name_category
        self.thumbnail = thumbnail
