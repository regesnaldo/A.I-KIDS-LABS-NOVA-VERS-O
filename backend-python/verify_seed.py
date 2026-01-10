from app import create_app
from extensions import db
from models import Temporada, Missao

app = create_app()

with app.app_context():
    t_count = Temporada.query.count()
    m_count = Missao.query.count()
    print(f"📊 Verificação de Integridade:")
    print(f"   - Temporadas: {t_count} (Esperado: 50)")
    print(f"   - Missões:    {m_count} (Esperado: 500)")
    
    if t_count == 50 and m_count == 500:
        print("\n✅ Sucesso: O banco de dados está sincronizado com a saída esperada.")
    else:
        print("\n❌ Atenção: Discrepância detectada.")
