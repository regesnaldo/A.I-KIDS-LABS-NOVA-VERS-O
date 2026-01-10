import requests
import json

BASE_URL = "http://localhost:5000/api"

def verify_access():
    print("🔐 Verificando Regras de Acesso...")
    
    # 1. Sem Login
    print("\n🕵️ Cenário 1: Sem Login (Anônimo)")
    try:
        response = requests.get(f"{BASE_URL}/home")
        data = response.json()
        first_card = data['rows'][0]['cards'][0]
        locked = first_card.get('locked')
        print(f"   - Card 1 Locked: {locked}")
        
        if locked is True:
            print("   ✅ Sucesso: Conteúdo bloqueado para anônimos.")
        else:
            print("   ❌ Erro: Conteúdo deveria estar bloqueado.")
            
    except Exception as e:
        print(f"   ❌ Erro na requisição: {e}")

    # 2. Com Login
    print("\n👤 Cenário 2: Com Login (Agente Autenticado)")
    # Login para obter token
    login_payload = {"email": "agente007@kidslabs.com", "password": "missaoimpossivel"}
    try:
        # Usando Session para manter cookies se necessário, embora seja JWT
        s = requests.Session()
        login_res = s.post(f"{BASE_URL}/auth/login", json=login_payload)
        token = login_res.json().get('access_token')
        
        if token:
            headers = {"Authorization": f"Bearer {token}"}
            # Adiciona Content-Type por segurança
            headers["Content-Type"] = "application/json"
            
            response = s.get(f"{BASE_URL}/home", headers=headers)
            
            if response.status_code == 200:
                data = response.json()
                first_card = data['rows'][0]['cards'][0]
                locked = first_card.get('locked')
                print(f"   - Card 1 Locked: {locked}")
                
                if locked is False:
                    print("   ✅ Sucesso: Conteúdo liberado para agente logado.")
                else:
                    print("   ❌ Erro: Conteúdo deveria estar liberado.")
            else:
                  print(f"   ❌ Erro ao acessar home com token: Status {response.status_code}")
                  print(f"   Body: {response.text}")
        else:
             print("   ⚠️ Falha no login (verifique se o usuário existe)")
             
    except Exception as e:
        print(f"   ❌ Erro na requisição: {e}")

if __name__ == "__main__":
    verify_access()
