
const API_URL = 'http://localhost:5001/api';

async function testRoutes() {
  console.log('Iniciando testes de rotas...');

  try {
    // 1. Health Check
    console.log('Testando /health...');
    const healthRes = await fetch(`${API_URL}/health`);
    console.log(`Health Status: ${healthRes.status} ${healthRes.statusText}`);
    if (healthRes.ok) {
        const data = await healthRes.json();
        console.log('Health Data:', data);
    }

    // 2. Modules List
    console.log('\nTestando /modules...');
    const modulesRes = await fetch(`${API_URL}/modules`);
    console.log(`Modules Status: ${modulesRes.status} ${modulesRes.statusText}`);
    let moduleId = null;
    if (modulesRes.ok) {
        const data = await modulesRes.json();
        console.log(`Modules Count: ${data.count}`);
        if (data.data && data.data.length > 0) {
            moduleId = data.data[0].id;
            console.log(`Pegando ID do primeiro módulo para teste: ${moduleId}`);
        }
    }

    // 3. Single Module
    if (moduleId) {
        console.log(`\nTestando /modules/${moduleId}...`);
        const moduleRes = await fetch(`${API_URL}/modules/${moduleId}`);
        console.log(`Module Detail Status: ${moduleRes.status} ${moduleRes.statusText}`);
    }

    console.log('\nTestes concluídos.');

  } catch (error) {
    console.error('Erro ao conectar com a API:', error.message);
  }
}

testRoutes();
