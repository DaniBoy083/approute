// Endpoint simples para verificar disponibilidade da API do projeto.
export async function GET() {
  return Response.json({
    status: 'ok',
    method: 'GET',
    service: 'app-router-playground-api',
    timestamp: new Date().toISOString(),
  });
}

// Endpoint de teste para simular criacao (sem persistencia).
export async function POST() {
  return Response.json(
    {
      status: 'ok',
      method: 'POST',
      message: 'Health POST recebido. Nenhum dado foi persistido.',
      timestamp: new Date().toISOString(),
    },
    { status: 201 },
  );
}

// Endpoint de teste para simular atualizacao parcial (sem persistencia).
export async function PATCH() {
  return Response.json({
    status: 'ok',
    method: 'PATCH',
    message: 'Health PATCH recebido. Nenhum dado foi alterado permanentemente.',
    timestamp: new Date().toISOString(),
  });
}

// Endpoint de teste para simular remocao (sem persistencia).
export async function DELETE() {
  return Response.json({
    status: 'ok',
    method: 'DELETE',
    message: 'Health DELETE recebido. Nenhum recurso real foi removido.',
    timestamp: new Date().toISOString(),
  });
}
