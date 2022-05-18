import service from "../services";
import validateSession from "../utils/validateSession";

export async function cadastrarCaixa(caixa) {
  let userData = validateSession.getLoggedUserData();
  if (typeof userData !== "object") {
    return {
      error: true,
      message: "por favor, saia do sistema e acesse para tentar novamente",
      reason: "Não foi possível identificar o usuário logado",
    };
  }
  if (!caixa.descricao || caixa.descricao?.length < 1) {
    return {
      error: true,
      message: "A descrição do caixa é obrigatória",
      reason: "descrição não informada",
    };
  }
  caixa.saldoinicial = Number(caixa.saldoinicial);
  return await service.request("/caixa", "POST", userData.token, caixa);
}

export async function getCaixas(caixa) {
  let userData = validateSession.getLoggedUserData();
  if (typeof userData !== "object") {
    return {
      error: true,
      message: "por favor, saia do sistema e acesse para tentar novamente",
      reason: "Não foi possível identificar o usuário logado",
    };
  }
  return await service.request("/caixa", "GET", userData.token);
}
