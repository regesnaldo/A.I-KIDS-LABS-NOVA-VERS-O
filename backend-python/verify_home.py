import requests
import json

BASE_URL = "http://localhost:5000/api"

def verify_home():
    print("🚀 Verificando Endpoint Home (Netflix Style)...")
    try:
        response = requests.get(f"{BASE_URL}/home")
        if response.status_code == 200:
            data = response.json()
            rows = data.get('rows', [])
            print(f"   ✅ Status 200 OK")
            print(f"   📦 Rows recebidas: {len(rows)} (Esperado: 50)")
            
            if len(rows) > 0:
                first_row = rows[0]
                print(f"   🎬 Primeira Temporada: {first_row.get('titulo')}")
                cards = first_row.get('cards', [])
                print(f"   🃏 Cards na 1ª Temporada: {len(cards)} (Esperado: 10)")
                
                if len(cards) > 0:
                    c1 = cards[0]
                    c2 = cards[1] if len(cards) > 1 else None
                    
                    print(f"   🔍 Card 1: {c1.get('titulo')} | Locked: {c1.get('locked')} | Thumb: {c1.get('thumb')}")
                    if c1.get('locked') is False:
                         print("      ✅ Card 1 está desbloqueado corretamente.")
                    
                    if c2:
                         print(f"   🔍 Card 2: {c2.get('titulo')} | Locked: {c2.get('locked')}")
                         if c2.get('locked') is True:
                             print("      ✅ Card 2 está bloqueado corretamente.")
            
            if len(rows) == 50:
                print("\n✅ SUCESSO TOTAL: Estrutura da Home validada.")
            else:
                print("\n⚠️ AVISO: Quantidade de rows diferente do esperado.")

        else:
            print(f"   ❌ Erro: Status {response.status_code}")
            print(f"   Body: {response.text}")
            
    except Exception as e:
        print(f"   ❌ Falha na requisição: {e}")

if __name__ == "__main__":
    verify_home()
