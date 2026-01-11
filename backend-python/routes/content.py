from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from extensions import db
from models import Temporada, Missao

content_bp = Blueprint('content', __name__)

@content_bp.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    return jsonify({"ok": True}), 200

@content_bp.route('/home', methods=['GET'])
@jwt_required(optional=True)
def get_home_content():
    try:
        current_user_id = get_jwt_identity()
    except Exception:
        current_user_id = None
        
    temporadas = Temporada.query.order_by(Temporada.numero).all()
    rows = []
    
    for t in temporadas:
        missoes = Missao.query.filter_by(temporada_id=t.id).order_by(Missao.numero).all()
        cards = []
        for m in missoes:
            # Regra de Acesso:
            # Sem login -> locked = True (Conteúdo bloqueado)
            # Logado -> locked = False (Conteúdo liberado, assumindo plano ativo)
            if current_user_id:
                locked = False
            else:
                locked = True

            cards.append({
                "id": m.id,
                "numero": m.numero,
                "titulo": m.titulo,
                "thumb": f"https://cdn.kidslabs.com/thumbs/t{t.numero}m{m.numero}.jpg",
                "preview": f"https://cdn.kidslabs.com/previews/t{t.numero}m{m.numero}.mp4",
                "locked": locked
            })
            
        rows.append({
            "id": t.id,
            "numero": t.numero,
            "titulo": t.titulo,
            "descricao": t.descricao,
            "cards": cards
        })
        
    return jsonify({"rows": rows}), 200

@content_bp.route('/temporadas', methods=['GET'])
@content_bp.route('/seasons', methods=['GET'])
@jwt_required(optional=True)
def get_seasons():
    # Tente fetch do DB Neon; fallback mock se vazio
    temporadas = Temporada.query.order_by(Temporada.numero).all()
    
    if not temporadas:
        # Fallback mock data
        seasons_data = [{
            'id': i, 
            'titulo': f'Temporada {i}', 
            'descricao': 'Missões lúdicas de IA para kids', 
            'image': 'https://example.com/img.png', # Frontend compatibility
            'imagem': 'https://example.com/img.png'
        } for i in range(1, 51)]
        return jsonify(seasons_data), 200

    # Serialize DB objects
    return jsonify([{
        "id": t.id,
        "numero": t.numero,
        "title": t.titulo,
        "titulo": t.titulo,
        "description": t.descricao,
        "descricao": t.descricao,
        "image": f"https://cdn.kidslabs.com/covers/t{t.numero}.jpg",
        "imagem": f"https://cdn.kidslabs.com/covers/t{t.numero}.jpg"
    } for t in temporadas]), 200

@content_bp.route('/temporadas', methods=['POST'])
@jwt_required()
def create_temporada():
    data = request.get_json()
    
    # Validação simples
    if not data.get('numero') or not data.get('titulo'):
        return jsonify({"erro": "Número e Título são obrigatórios"}), 400

    nova_temporada = Temporada(
        numero=data.get('numero'),
        titulo=data.get('titulo'),
        descricao=data.get('descricao')
    )
    
    try:
        db.session.add(nova_temporada)
        db.session.commit()
        return jsonify({"mensagem": "Temporada criada com sucesso!", "id": nova_temporada.id}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"erro": "Erro ao criar temporada (verifique se o número já existe)"}), 400

@content_bp.route('/temporadas/<int:id>/missoes', methods=['GET'])
@jwt_required(optional=True)
def get_missoes_por_temporada(id):
    try:
        current_user_id = get_jwt_identity()
    except Exception:
        current_user_id = None

    temporada = Temporada.query.get(id)
    
    if not temporada:
        return jsonify({"erro": "Temporada não encontrada"}), 404
        
    missoes = Missao.query.filter_by(temporada_id=id).order_by(Missao.numero).all()
    
    return jsonify([{
        "id": m.id,
        "numero": m.numero,
        "titulo": m.titulo,
        "video_url": m.video_url,
        "conteudo_apoio": m.conteudo_apoio,
        "locked": False if current_user_id else True
    } for m in missoes]), 200
