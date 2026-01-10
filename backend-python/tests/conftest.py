import pytest
import sys
import os

# Adiciona o diretório raiz ao path para garantir importação
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app import create_app
from extensions import db

@pytest.fixture
def client():
    # Cria a app usando a factory
    app = create_app()
    
    # Configurações de teste
    app.config["TESTING"] = True
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///:memory:"
    app.config["JWT_SECRET_KEY"] = "test-secret"

    with app.app_context():
        db.create_all()
        yield app.test_client()
        db.session.remove()
        db.drop_all()

@pytest.fixture
def app():
    # Fixture auxiliar caso algum teste precise da instância app diretamente
    app = create_app()
    app.config["TESTING"] = True
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///:memory:"
    app.config["JWT_SECRET_KEY"] = "test-secret"
    
    with app.app_context():
        db.create_all()
        yield app
        db.session.remove()
        db.drop_all()
