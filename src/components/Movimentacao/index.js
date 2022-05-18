import React from "react";
import * as C from "@mui/material";
import CustomGenericTable from "../CustomGenericTable";

const Movimentacao = ({ data, loading }) => {
  const tableHeader = [
    { field: "tipo", type: "string", title: "Tipo", sort: true, props: {} },
    { field: "data", type: "date", title: "Data", sort: true, props: {} },
    { field: "descricao", type: "string", title: "Descrição", sort: true, props: {} },
    { field: "valor", type: "string", title: "Email", sort: true, props: {} },
  ];
  return (
    <C.Box>
      <C.Paper>
        <C.Grid container>
          <C.Grid item xs={12}>
            <C.Typography fontWeight={500} padding={"0 10px"} fontSize={16} sx={{ marginTop: "-10px" }}>
              <span style={{ marginTop: "-20px", padding: "0 10px", background: "#fff", borderRadius: "4px" }}>Movimentação do Mês</span>
            </C.Typography>
          </C.Grid>
          <C.Grid item xs={12}>
            <CustomGenericTable loading={loading} options={{ tableHeader }} fill={data || []} />
          </C.Grid>
        </C.Grid>
      </C.Paper>
    </C.Box>
  );
};

export default Movimentacao;
