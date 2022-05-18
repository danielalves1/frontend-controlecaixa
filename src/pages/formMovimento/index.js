import React, { useState, useEffect } from "react";
import * as C from "@mui/material";
import "./style.scss";
import CustomTextField from "../../components/CustomTextField";
import * as controller from "../../bin/controllers/MovimentoController";
import * as caixaController from "../../bin/controllers/CaixaController";

const FormMovimento = () => {
  const [movimento, setMovimento] = useState({ data: new Date().toISOString().substring(0, 10), tipo: "", descricao: "", valor: 0 });
  const [snack, setSnack] = useState({ open: false, message: "", severity: "success" });
  const [caixaList, setCaixaList] = useState([]);
  const [formValid, setFormValid] = useState(false);

  function getCaixaList() {
    caixaController.getCaixas().then((rs) => {
      if (Array.isArray(rs)) setCaixaList(rs);
    });
  }
  useEffect(getCaixaList, []);

  function handleClose() {
    setSnack({ open: false, message: "", severity: "success" });
  }

  function handleValueChange(value, name) {
    if (name === "valor") value = value.replace(",", ".");
    movimento[name] = value;
    setMovimento({ ...movimento });
  }

  function handleSave() {
    controller
      .createMovimento(movimento)
      .then((rs) => {
        if (rs.id) {
          setSnack({ open: true, message: "Movimento lançado", severity: "success" });
          setTimeout(() => (window.location.pathname = "/"), 400);
        } else {
          setSnack({ open: true, message: `Não foi possível lançar o movimento\n${rs.message || ""}`, severity: "error" });
        }
      })
      .catch((err) => {
        console.log(err);
        setSnack({ open: true, message: `Ocorreu um erro\nNão foi possível lançar o movimento`, severity: "error" });
      });
  }

  function handleTypeChange(event) {
    movimento.tipo = event.target.value;
    setMovimento({ ...movimento });
  }
  const handleSelectChange = (event) => {
    movimento.caixa = { id: event.target.value };
    if (movimento.caixa === "") delete movimento.caixa;
    setMovimento({ ...movimento });
  };

  function validateFields() {
    setTimeout(() => {
      let valid =
        movimento.caixa?.id !== undefined &&
        movimento.data !== undefined &&
        movimento.tipo !== undefined &&
        Number(movimento.valor) > 0 &&
        movimento.descricao !== undefined;
      console.log(valid);
      setFormValid(valid);
    }, 100);
  }

  return (
    <div className="form-movimento--container">
      <header>
        <h1>Lançar movimentação</h1>
      </header>
      <form onChangeCapture={validateFields} className="form-movimento--content">
        <C.FormControl className="row-container" required>
          <C.FormLabel>Tipo</C.FormLabel>
          <C.RadioGroup className="row">
            <C.FormControlLabel
              control={<C.Radio value="E" checked={movimento.tipo === "E"} onChange={handleTypeChange} />}
              label="Entrada"
            />
            <C.FormControlLabel
              control={<C.Radio value="S" checked={movimento.tipo === "S"} onChange={handleTypeChange} />}
              label="Saída"
            />
          </C.RadioGroup>
        </C.FormControl>
        <C.FormControl style={{ minWidth: 200 }} required>
          <C.InputLabel id="demo-simple-select-label">Caixa</C.InputLabel>
          <C.Select
            color="primary"
            defaultValue={movimento.caixa?.id || ""}
            value={movimento.caixa?.id || ""}
            label="Caixa"
            onChange={handleSelectChange}
          >
            <C.MenuItem value="">Todos</C.MenuItem>
            {caixaList.map((caixa) => (
              <C.MenuItem key={`caixa-${caixa.id}`} value={caixa.id}>
                {caixa.id} - {caixa.descricao}
              </C.MenuItem>
            ))}
          </C.Select>
        </C.FormControl>
        <C.TextField required type="date" label="Data" value={movimento.data} onChange={(e) => handleValueChange(e.target.value, "data")} />
        <C.TextField required label="Descrição" onChange={(e) => handleValueChange(e.target.value, "descricao")} />
        <CustomTextField className="required" label="Valor" name="valor" onValueChange={handleValueChange} />
        <C.Button disabled={!formValid} onClick={handleSave} variant="contained">
          <C.Typography>Cadastrar</C.Typography>
        </C.Button>
      </form>
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

export default FormMovimento;
