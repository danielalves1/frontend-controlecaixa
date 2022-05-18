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
  const [anoList, setAnoList] = useState([]);
  const [movimentacao, setMovimentacao] = useState([]);
  const [mes, setMes] = useState();
  const [balanco, setBalanco] = useState(0.0);
  const [loading, setLoading] = useState(false);

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

  function getAnoList() {
    movimentacaoController.getAnosMovimentacao().then((rs) => {
      if (Array.isArray(rs)) setAnoList(rs);
    });
  }
  function getCaixaList() {
    caixaController.getCaixas().then((rs) => {
      if (Array.isArray(rs)) setCaixaList(rs);
    });
  }

  function getMovimentacao() {
    setLoading(true);
    movimentacaoController.getMovimentacao(filter.ano, filter.mes, filter.caixa).then((rs) => {
      if (Array.isArray(rs)) setMovimentacao(rs);
      setLoading(false);
    });
  }

  function getBalancoGeral() {
    movimentacaoController.getBalancoGeral().then((rs) => {
      setBalanco(rs);
    });
  }

  useEffect(() => setMes(new Date().getMonth() + 1), []);
  useEffect(getCaixaList, []);
  useEffect(getAnoList, []);
  useEffect(getMovimentacao, [filter]);
  useEffect(getBalancoGeral, [movimentacao]);

  function handleMesClick(selected) {
    console.log({ selected, mes });
    if (selected === filter.mes) {
      setMes(undefined);
      delete filter.mes;
      setFilter({ ...filter });
    } else {
      setMes(selected);
      filter.mes = selected;
      setFilter({ ...filter });
    }
  }

  const handleSelectChange = (event) => {
    filter[event.target.name] = event.target.value;
    if (filter[event.target.name] === "") delete filter[event.target.name];
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
            <Item style={{ display: "flex", gap: "10px" }}>
              <C.FormControl size="small" style={{ minWidth: 100 }}>
                <C.InputLabel id="demo-simple-select-label">Ano</C.InputLabel>
                <C.Select
                  color="primary"
                  defaultValue={filter.ano || new Date().getFullYear()}
                  value={filter.ano}
                  label="Ano"
                  name="ano"
                  onChange={handleSelectChange}
                >
                  {anoList.map((ano) => (
                    <C.MenuItem key={`caixa-${ano}`} value={ano}>
                      {ano}
                    </C.MenuItem>
                  ))}
                </C.Select>
              </C.FormControl>
              <C.FormControl size="small" style={{ minWidth: 200 }}>
                <C.InputLabel id="demo-simple-select-label">Caixa</C.InputLabel>
                <C.Select
                  name="caixa"
                  color="primary"
                  defaultValue={filter.caixa || ""}
                  value={filter.caixa}
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
            <Movimentacao loading={loading} data={movimentacao} />
          </C.Grid>
        </C.Grid>
      </C.Box>
    </div>
  );
};

export default HomePage;
