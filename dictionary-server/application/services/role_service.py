# application/services/role_service.py

from application import db
from application.models.role import Role


class RoleService:
    @staticmethod
    def get_all_roles():
        return Role.query.all()

    @staticmethod
    def get_role_by_id(role_id):
        return Role.query.get_or_404(role_id)

    @staticmethod
    def create_roles(roles_data):
        roles = []
        for role_data in roles_data:
            new_role = Role(name_role=role_data['nameRole'], type=role_data['type'])
            db.session.add(new_role)
            roles.append(new_role)
        db.session.commit()
        return roles

    @staticmethod
    def update_role(role_id, name):
        role = Role.query.get_or_404(role_id)
        role.name = name
        db.session.commit()
        return role

    @staticmethod
    def delete_role(role_id):
        role = Role.query.get_or_404(role_id)
        db.session.delete(role)
        db.session.commit()
