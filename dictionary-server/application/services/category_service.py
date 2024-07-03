from application import db
from application.models.category import Category

class CategoryService:
    @staticmethod
    def create_category(name_category, thumbnail, describe):
        try:
            # Create a new Category object
            new_category = Category(
                name_category=name_category,
                thumbnail=thumbnail,
                describe=describe
            )

            # Add to session and commit to database
            db.session.add(new_category)
            db.session.commit()

            return new_category, None
        except Exception as e:
            return None, str(e)

    @staticmethod
    def get_all_categories():
        return Category.query.all()

    @staticmethod
    def update_category(category_id, data):
        category = Category.query.get(category_id)
        if category:
            category.name_category = data.get('nameCategory', category.name_category)
            category.thumbnail = data.get('thumbnail', category.thumbnail)
            category.describe = data.get('description', category.describe)
            db.session.commit()
            return category
        return None

    @staticmethod
    def delete_category(id):
        try:
            category = Category.query.get(id)
            if category:
                db.session.delete(category)
                db.session.commit()
                return True
            else:
                return False
        except Exception as e:
            db.session.rollback()
            return False

    @staticmethod
    def count_categories():
        return Category.query.count()