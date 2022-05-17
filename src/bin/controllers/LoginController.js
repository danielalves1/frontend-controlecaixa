import service from "../services";
import validateSession from "../utils/validateSession";

const login = async (user, callback) => {
  if (user && user.usuario && user.senha) {
    const logged = await service.login(user);
    if (callback) await callback();
    if (logged && logged.token && logged.user) {
      validateSession.setLoggedUserData(logged);
    }
    return logged;
  } else {
    if (callback) await callback();
    return { error: true, message: "Erro ao tentar entrar", reason: "Usuário e senha obrigatórios" };
  }
};

const LoginController = { login };

export default LoginController;
