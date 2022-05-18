import React, { useState } from "react";
import "./style.scss";
import * as C from "@mui/material";
import CustomTextField from "../../components/CustomTextField";
import * as controller from "../../bin/controllers/CaixaController";

const FormCaixa = () => {
  const [caixa, setCaixa] = useState({});
  const [snack, setSnack] = useState({ open: false, message: "", severity: "success" });
  function handleClose() {
    setSnack({ open: false, message: "", severity: "success" });
  }

  function handleValueChange(value, name) {
    caixa[name] = value;
    setCaixa({ ...caixa });
  }

  function handleSave() {
    controller
      .cadastrarCaixa(caixa)
      .then((rs) => {
        if (rs.id) {
          setSnack({ open: true, message: "caixa cadastrado", severity: "success" });
          setTimeout(() => (window.location.pathname = "/"), 400);
        } else {
          setSnack({ open: true, message: "caixa não cadastrado", severity: "error" });
        }
      })
      .catch((err) => {
        console.log(err);
        setSnack({ open: true, message: `Ocorreu um erro\nCaixa não cadastrado`, severity: "error" });
      });
  }

  return (
    <div className="form-caixa--container">
      <header>
        <h1>Cadastrar Caixa</h1>
      </header>
      <div className="form-caixa--content">
        <C.TextField label="Descricao" onChange={(e) => handleValueChange(e.target.value, "descricao")} />
        <CustomTextField label="Saldo Inicial" name="valor" onValueChange={handleValueChange} />
        <C.Button onClick={handleSave} variant="contained">
          <C.Typography>Cadastrar</C.Typography>
        </C.Button>
      </div>
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
  );
};

export default FormCaixa;
