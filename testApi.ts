// testApi.ts
import { createCliente } from "./services/api";

async function main() {
  try {
    const res = await createCliente({
      nome: "Teste API",
      cpf: "12345678900",
      endereco: "Rua de Teste",
      dataCadastro: new Date().toISOString(),
    });
    console.log("OK:", res);
  } catch (err) {
    console.error("Erro:", err);
  }
}

main();
