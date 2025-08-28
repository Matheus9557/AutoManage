const API_URL = "https://us-central1-automanage-2db06.cloudfunctions.net/api";

export async function createCliente(data: {
  nome: string;
  cpf: string;
  endereco: string;
  dataCadastro: string;
}) {
  const response = await fetch(`${API_URL}/clientes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Erro ao cadastrar cliente");
  }

  return response.json();
}