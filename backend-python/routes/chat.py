from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
import datetime
import random

chat_bp = Blueprint('chat', __name__)

@chat_bp.route('/', methods=['POST'])
@jwt_required(optional=True)
def chat():
    data = request.get_json()
    user_message = data.get('message', '')
    context = data.get('context', {})
    
    # Simple rule-based responses for now
    responses = [
        "Isso é fascinante! Quer saber mais sobre como a IA funciona?",
        "Ótima pergunta! Na programação, a lógica é tudo.",
        "Você está indo muito bem! Continue explorando os módulos.",
        "Eu sou uma IA em treinamento, mas posso te ajudar a encontrar a próxima missão!",
        "Que tal tentarmos resolver um desafio de código juntos?"
    ]
    
    ai_response = random.choice(responses)
    
    # If user is not logged in, we can add a gentle reminder, but jwt_required(optional=True) handles the check
    current_user_id = get_jwt_identity()
    if not current_user_id:
        ai_response += " (Dica: Faça login para salvar seu progresso!)"

    return jsonify({
        "success": True,
        "data": {
            "message": ai_response,
            "timestamp": datetime.datetime.now().isoformat()
        }
    }), 200
