import pytest
import sys
import os
from app import app as flask_app  # Đảm bảo import đúng Flask app của bạn

# Fixture để tạo client test cho ứng dụng Flask
@pytest.fixture
def client():
    """Create a test client for the Flask application."""
    with flask_app.test_client() as client:
        yield client

# Hàm trả về dữ liệu của các từ điển để sử dụng trong các test case
@pytest.fixture
def dictionaries_data():
    return [
    {
        "english": "New English Dictionary",
        "vietnamese": "Từ điển tiếng Việt mới",
        "phoneticTranscription": "new transcription",
        "explain": "New explanation",
        "wordType": "noun",
        "category": 6,
        "thumbnail": "https://example.com/new-thumbnail.jpg",
        "englishExample": [
            "New English example",
            "Another new English example"
        ],
        "vietnameseExample": [
            "Ví dụ tiếng Việt mới",
            "Ví dụ tiếng Việt khác mới"
        ]
    },
     {
        "english": "New English Dictionary",
        "vietnamese": "Từ điển tiếng Việt mới",
        "phoneticTranscription": "new transcription",
        "explain": "New explanation",
        "wordType": "noun",
        "category": 6,
        "thumbnail": "https://example.com/new-thumbnail.jpg",
        "englishExample": [
            "New English example",
            "Another new English example"
        ],
        "vietnameseExample": [
            "Ví dụ tiếng Việt mới",
            "Ví dụ tiếng Việt khác mới"
        ]
    }
]


# Test case để tạo nhiều từ điển mới
def test_create_multiple_dictionaries(client, dictionaries_data):
    for data in dictionaries_data:
        response = client.post('/api/dictionaries/dictionary', json=data)
        assert response.status_code == 201
        assert 'id' in response.json

# Test case để lấy danh sách từ điển với ví dụ
def test_get_dictionaries_with_examples(client):
    response = client.get('/api/dictionaries/')
    assert response.status_code == 200
    assert isinstance(response.json, list)
    assert len(response.json) > 0
