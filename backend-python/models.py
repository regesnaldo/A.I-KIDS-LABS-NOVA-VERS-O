from extensions import db
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

# --- MODELOS DE ELITE ---
class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password, method='pbkdf2:sha256', salt_length=16)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class Temporada(db.Model):
    __tablename__ = 'temporadas'
    id = db.Column(db.Integer, primary_key=True)
    numero = db.Column(db.Integer, unique=True, nullable=False)
    titulo = db.Column(db.String(100), nullable=False)
    descricao = db.Column(db.Text, nullable=True)
    # Relacionamento: Uma temporada tem muitas missões
    missoes = db.relationship('Missao', backref='temporada', lazy=True)

class Missao(db.Model):
    __tablename__ = 'missoes'
    id = db.Column(db.Integer, primary_key=True)
    temporada_id = db.Column(db.Integer, db.ForeignKey('temporadas.id'), nullable=False)
    numero = db.Column(db.Integer, nullable=False)
    titulo = db.Column(db.String(100), nullable=False)
    video_url = db.Column(db.String(255), nullable=True)
    conteudo_apoio = db.Column(db.Text, nullable=True)
