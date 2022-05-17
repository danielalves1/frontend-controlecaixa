import React, { useState } from "react";
import * as C from "@mui/material";
import "./style.scss";
import controller from "../../bin/controllers/LoginController";
import validateSession from "../../bin/utils/validateSession";

const LoginPage = () => {
  const [user, setUser] = useState({ usuario: "", senha: "" });
  const [snack, setSnack] = useState({ open: false, message: "", severity: "success" });

  function handleChange(field, value) {
    user[field] = value;
    setUser({ ...user });
  }

  async function handleLogin() {
    if (user.usuario.length > 0 && user.senha.length > 0) {
      let logged = await controller.login(user);
      if (!logged.error) {
        setSnack({ open: true, message: "Acesso permitido", severity: "success" });
        validateSession.setLoggedUserData(logged);
        setTimeout(() => {
          window.location.href = `${window.location.origin}/`;
        }, 2300);
      } else setSnack({ open: true, message: "Acesso negado", severity: "error" });
    } else {
      setSnack({ open: true, message: "Usuário e/ou senha obrigatórios", severity: "error" });
    }
  }

  function handleClose() {
    setSnack({ open: false, message: "", severity: "success" });
  }

  return (
    <div className="login--container">
      <div className="login--content">
        <header>
          <h1>Acesso restrito</h1>
        </header>
        <C.TextField label="Usuário" value={user.usuario} onChange={(e) => handleChange("usuario", e.target.value)} />
        <C.TextField type="password" label="Senha" value={user.senha} onChange={(e) => handleChange("senha", e.target.value)} />
        <C.Button onClick={handleLogin} variant="contained">
          Login
        </C.Button>
        <C.Snackbar
          open={snack.open}
          autoHideDuration={2000}
          message="Note archived"
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          onClose={handleClose}
        >
          <C.Alert onClose={handleClose} severity={snack.severity} sx={{ width: "100%" }}>
            {snack.message}
          </C.Alert>
        </C.Snackbar>
      </div>
    </div>
  );
};

export default LoginPage;
