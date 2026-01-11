from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required

recommendations_bp = Blueprint('recommendations', __name__)

@recommendations_bp.route('/', methods=['GET'])
@jwt_required(optional=True)
def get_recommendations():
    # Mock data for recommendations
    recommendations = [
        {
            "id": "rec1",
            "title": "Introdução à Lógica",
            "thumbnail": "https://placehold.co/300x200/1a1a1a/white?text=Logica",
            "reason": "Baseado no seu nível iniciante"
        },
        {
            "id": "rec2",
            "title": "Python para Crianças",
            "thumbnail": "https://placehold.co/300x200/1a1a1a/white?text=Python",
            "reason": "Popular entre sua faixa etária"
        },
        {
            "id": "rec3",
            "title": "Criando Jogos 2D",
            "thumbnail": "https://placehold.co/300x200/1a1a1a/white?text=Games",
            "reason": "Próximo passo na sua jornada"
        }
    ]
    
    return jsonify(recommendations), 200
