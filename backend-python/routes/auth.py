from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from models import db, User
import datetime

auth_bp = Blueprint('auth', __name__)

# Rota de Registro: Cria novos agentes no sistema
@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"erro": "Email e senha são obrigatórios"}), 400

    # Verifica se usuário já existe
    if User.query.filter_by(email=email).first():
        return jsonify({"erro": "Email já cadastrado"}), 400

    # Cria novo usuário
    new_user = User(email=email)
    new_user.set_password(password)
    
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"mensagem": "Agente registrado com sucesso!"}), 201

# Rota de Login: Emite o passe de acesso (JWT)
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()

    if user and user.check_password(password):
        # Token expira em 1 hora
        expires = datetime.timedelta(hours=1)
        access_token = create_access_token(identity=user.id, expires_delta=expires)
        return jsonify({
            "mensagem": "Login realizado com sucesso",
            "access_token": access_token,
            "user": {"id": user.id, "email": user.email}
        }), 200
    
    return jsonify({"erro": "Credenciais inválidas"}), 401
