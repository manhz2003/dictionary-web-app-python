from application import db

class Category(db.Model):
    __tablename__ = 'categories'

    id = db.Column(db.BigInteger, primary_key=True)
    describe = db.Column(db.String(255), nullable=True)
    name_category = db.Column(db.String(255), nullable=True)
    thumbnail = db.Column(db.Text, nullable=True)

    dictionaries = db.relationship('Dictionary', backref='category', lazy=True, cascade='all, delete-orphan')

    def __init__(self, name_category, thumbnail, describe=None):
        self.name_category = name_category
        self.thumbnail = thumbnail
        self.describe = describe

    def to_dict(self):
        return {
            'id': self.id,
            'nameCategory': self.name_category,
            'thumbnail': self.thumbnail,
            'describe': self.describe
        }
