import service from "../services";
import validateSession from "../utils/validateSession";

export async function getBalancoGeral() {
  let userData = validateSession.getLoggedUserData();
  if (typeof userData !== "object") {
    return {
      error: true,
      message: "por favor, saia do sistema e acesse para tentar novamente",
      reason: "Não foi possível identificar o usuário logado",
    };
  }
  return await service.request("/movimentacao/balanco", "GET", userData.token);
}

export async function getMovimentacao(ano, mes) {
  let userData = validateSession.getLoggedUserData();
  if (typeof userData !== "object") {
    return {
      error: true,
      message: "por favor, saia do sistema e acesse para tentar novamente",
      reason: "Não foi possível identificar o usuário logado",
    };
  }
  let filter = "";
  if (ano) filter += `?ano=${ano}`;
  if (mes) filter += filter !== "" ? `&mes=${mes}` : `?ano=${new Date().getFullYear()}&mes=${mes}`;
  return await service.request(`/movimentacao${filter}`, "GET", userData.token);
}