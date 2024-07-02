from flask import Flask
from flask_cors import CORS

from application import db
from application.controllers.role_controller import role_controller
from application.controllers.user_controller import user_controller, login_controller

app = Flask("openai-quickstart-python")
app.config.from_pyfile('config.py')

# Đăng ký Blueprint của role_controller
app.register_blueprint(role_controller)
app.register_blueprint(user_controller)
app.register_blueprint(login_controller)

# Kết nối đến cơ sở dữ liệu
db.init_app(app)

# Bật CORS cho tất cả các đường dẫn bắt đầu bằng '/api'
CORS(app, resources={r"/api/*": {"origins": "http://localhost:2024"}})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
