import requests
import sys

BASE_URL = "http://localhost:5000/api"

def verify_endpoints():
    print("🚀 Iniciando Verificação dos Endpoints Públicos...")

    # 1. GET /api/temporadas
    print("\n📡 Testando GET /api/temporadas...")
    first_season_id = None
    try:
        response = requests.get(f"{BASE_URL}/temporadas")
        if response.status_code == 200:
            data = response.json()
            count = len(data)
            print(f"   ✅ Status 200 OK")
            print(f"   📦 Recebido: {count} temporadas")
            if count > 0:
                first_season_id = data[0]['id']
                print(f"   ℹ️ ID da primeira temporada encontrada: {first_season_id}")
            
            if count == 50:
                print("   ✅ Quantidade correta (50)")
            else:
                print(f"   ❌ Quantidade incorreta (Esperado: 50, Recebido: {count})")
        else:
            print(f"   ❌ Erro: Status {response.status_code}")
            print(f"   Body: {response.text}")
    except Exception as e:
        print(f"   ❌ Falha na requisição: {e}")

    if first_season_id is None:
        print("\n❌ Não foi possível prosseguir: Nenhuma temporada encontrada.")
        return

    # 2. GET /api/temporadas/<id>/missoes
    print(f"\n📡 Testando GET /api/temporadas/{first_season_id}/missoes...")
    try:
        response = requests.get(f"{BASE_URL}/temporadas/{first_season_id}/missoes")
        if response.status_code == 200:
            data = response.json()
            count = len(data)
            print(f"   ✅ Status 200 OK")
            print(f"   📦 Recebido: {count} missões para Temporada 1")
            if count == 10:
                print("   ✅ Quantidade correta (10)")
                # Verifica estrutura básica da primeira missão
                m1 = data[0]
                if all(k in m1 for k in ('id', 'numero', 'titulo', 'video_url', 'conteudo_apoio')):
                    print("   ✅ Estrutura do JSON validada (campos presentes)")
                else:
                    print("   ❌ Estrutura do JSON incorreta")
            else:
                print(f"   ❌ Quantidade incorreta (Esperado: 10, Recebido: {count})")
        else:
            print(f"   ❌ Erro: Status {response.status_code}")
            print(f"   Body: {response.text}")
    except Exception as e:
        print(f"   ❌ Falha na requisição: {e}")

if __name__ == "__main__":
    verify_endpoints()
