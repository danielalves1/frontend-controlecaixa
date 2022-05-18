import React from "react";
import * as C from "@mui/material";

export const Item = C.styled(C.Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const CardMovimentacao = ({ entradas, saidas, balanco, title, filtroAno, saldoinicial }) => {
  return (
    <Item>
      <C.Grid container spacing={1}>
        <C.Grid item xs={12} sx={{ textAlign: "start" }}>
          <C.Typography fontWeight={500} padding={"0 10px"} fontSize={16} sx={{ marginTop: "-20px" }}>
            <span style={{ padding: "0 10px", background: "#fff", borderRadius: "4px" }}>{title}</span>
          </C.Typography>
        </C.Grid>
        {filtroAno && (
          <C.Grid item xs={5} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            {filtroAno}
          </C.Grid>
        )}
        <C.Grid item xs={filtroAno ? 7 : 12} style={{ padding: "5px 16px" }}>
          <C.Grid container>
            <C.Grid item xs={6} sx={{ textAlign: "end" }}>
              Entradas:
            </C.Grid>
            <C.Grid item xs={6} sx={{ textAlign: "end" }}>
              {entradas?.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </C.Grid>
            <C.Grid item xs={6} sx={{ textAlign: "end" }}>
              Saídas:
            </C.Grid>
            <C.Grid item xs={6} sx={{ textAlign: "end" }}>
              {saidas?.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </C.Grid>
            <C.Divider />
            <C.Grid item xs={6} sx={{ textAlign: "end" }}>
              Saldo:
            </C.Grid>
            <C.Grid
              item
              xs={6}
              sx={{ textAlign: "end", color: (balanco || (entradas || 0) - (saidas || 0) + (saldoinicial || 0)) < 0 ? "#f00" : "inherit" }}
            >
              {(balanco || (entradas || 0) - (saidas || 0) + (saldoinicial || 0)).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </C.Grid>
          </C.Grid>
        </C.Grid>
      </C.Grid>
    </Item>
  );
};

export default CardMovimentacao;
