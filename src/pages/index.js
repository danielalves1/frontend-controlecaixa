import React, { useEffect, useState } from "react";
import * as movimentacaoController from "../bin/controllers/MovimentoController";
import * as caixaController from "../bin/controllers/CaixaController";
import * as C from "@mui/material";
import "./style.scss";
import CardMovimentacao, { Item } from "../components/CardMovimentacao";
import Movimentacao from "../components/Movimentacao";

const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

const HomePage = () => {
  const [filter, setFilter] = useState({ ano: new Date().getFullYear(), caixa: "" });
  const [caixaList, setCaixaList] = useState([]);
  const [movimentacao, setMovimentacao] = useState([]);
  const [mes, setMes] = useState();
  const [balanco, setBalanco] = useState(0.0);

  function getEntradas() {
    let total = 0.0;
    movimentacao.forEach((mov) => {
      if (mov.tipo === "E") {
        total += mov.valor;
      }
    });
    return total;
  }
  function getSaidas() {
    let total = 0.0;
    movimentacao.forEach((mov) => {
      if (mov.tipo === "S") {
        total += mov.valor;
      }
    });
    return total;
  }

  function getCaixaList() {
    caixaController.getCaixas().then((rs) => {
      console.log({ caixas: rs });
      if (Array.isArray(rs)) setCaixaList(rs);
    });
  }

  function getMovimentacao() {
    movimentacaoController.getMovimentacao(filter.ano, filter.mes).then((rs) => {
      console.log(rs);
      if (Array.isArray(rs)) setMovimentacao(rs);
    });
  }

  function getBalancoGeral() {
    movimentacaoController.getBalancoGeral().then((rs) => {
      console.log(rs);
      setBalanco(rs);
    });
  }

  useEffect(() => setMes(new Date().getMonth() + 1), []);
  useEffect(getCaixaList, []);
  useEffect(getMovimentacao, [filter]);
  useEffect(getBalancoGeral, [movimentacao]);

  function handleMesClick(mes) {
    if (mes === filter.mes) {
      setMes(undefined);
      delete filter.mes;
      setFilter({ ...filter });
    } else {
      setMes(mes);
    }
    filter.mes = mes;
    setFilter({ ...filter });
  }

  const handleSelectChange = (event) => {
    filter.caixa = event.target.value;
    setFilter({ ...filter });
  };

  return (
    <div className="home--container">
      <header>
        <h1>Movimentação</h1>
      </header>
      <C.Box className="box--content">
        <C.Grid container spacing={2}>
          <C.Grid item xs={12}>
            <Item>
              <C.FormControl size="small" style={{minWidth: 200}}>
                <C.InputLabel id="demo-simple-select-label">Caixa</C.InputLabel>
                <C.Select
                  color="primary"
                  defaultValue={filter.caixa || ""}
                  value={filter.caixa}
                  label="Caixa"
                  onChange={handleSelectChange}
                >
                  <C.MenuItem value="">Selecione</C.MenuItem>
                  {caixaList.map((caixa) => (
                    <C.MenuItem key={`caixa-${caixa.id}`} value={caixa.id}>
                      {caixa.id} - {caixa.descricao}
                    </C.MenuItem>
                  ))}
                </C.Select>
              </C.FormControl>
            </Item>
            <Item>
              {meses.map((item, index) => (
                <C.Button variant={index === mes - 1 ? "contained" : "text"} key={`mes-${index}`} onClick={() => handleMesClick(index + 1)}>
                  {item}
                </C.Button>
              ))}
            </Item>
          </C.Grid>
          <C.Grid item xs={6}>
            <CardMovimentacao title={`Entradas e Saídas do Mês`} entradas={getEntradas()} saidas={getSaidas()} />
          </C.Grid>
          <C.Grid item xs={6}>
            <CardMovimentacao title="Balanço Geral" entradas={balanco?.entradas} saidas={balanco?.saidas} balanco={balanco?.balanco} />
          </C.Grid>
          <C.Grid item xs={12}>
            <Movimentacao data={movimentacao} />
          </C.Grid>
        </C.Grid>
      </C.Box>
    </div>
  );
};

export default HomePage;
