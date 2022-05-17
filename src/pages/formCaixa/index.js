import React, { useState } from "react";
import "./style.scss";
import * as C from "@mui/material";
import CustomTextField from "../../components/CustomTextField";

const FormCaixa = () => {
  const [caixa, setCaixa] = useState({});

  function handleValueChange(value, name) {
    caixa[name] = value;
    setCaixa({ ...caixa });
  }
  return (
    <div className="form-caixa--container">
      <header>
        <h1>Cadastrar Caixa</h1>
      </header>
      <div className="form-caixa--content">
        <C.TextField label="Descricao" onChange={(e) => handleValueChange(e.target.value, "descricao")} />
        <CustomTextField label="Saldo Inicial" name="valor" onValueChange={handleValueChange} />
      </div>
    </div>
  );
};

export default FormCaixa;
