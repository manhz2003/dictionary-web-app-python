# app.py
from flask_cors import CORS
from flask import Flask
from application import db
from application.controllers.role_controller import role_controller
from application.controllers.user_controller import user_controller
from application.controllers.category_controller import category_controller
from application.controllers.dictionary_controller import dictionary_bp

app = Flask(__name__)
app.config.from_pyfile('config.py')

# Đăng ký Blueprint cho các controller
app.register_blueprint(role_controller)
app.register_blueprint(user_controller)
app.register_blueprint(category_controller)
app.register_blueprint(dictionary_bp)

# Kết nối đến cơ sở dữ liệu
db.init_app(app)

# Cấu hình CORS
CORS(app, resources={r"/api/*": {"origins": "http://localhost:2024", "supports_credentials": True}})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)