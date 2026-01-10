from app import app, db
from sqlalchemy import inspect

print("🚀 Iniciando Criação de Tabelas no Neon DB...")

with app.app_context():
    # Cria todas as tabelas definidas nos modelos
    db.create_all()
    print("✅ Tabelas criadas com sucesso (se não existiam).")

    # Verificação
    inspector = inspect(db.engine)
    tables = inspector.get_table_names()
    
    print("\n🔍 Relatório de Tabelas no Banco:")
    for table in tables:
        print(f"   - 📦 {table}")

    if 'temporadas' in tables and 'missoes' in tables and 'users' in tables:
        print("\n✅ SUCESSO: As tabelas 'users', 'temporadas' e 'missoes' foram detectadas.")
    else:
        print("\n❌ ERRO: Tabelas não encontradas.")
