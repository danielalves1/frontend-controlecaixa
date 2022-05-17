import React from "react";
import * as C from "@mui/material";

const Movimentacao = ({ data }) => {
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
            <C.Table>
              <C.TableHead>
                <C.TableRow>
                  <C.TableCell>
                    <C.Typography>Tipo</C.Typography>
                  </C.TableCell>
                  <C.TableCell>
                    <C.Typography>Descrição</C.Typography>
                  </C.TableCell>
                  <C.TableCell>
                    <C.Typography>Valor</C.Typography>
                  </C.TableCell>
                </C.TableRow>
              </C.TableHead>
              <C.TableBody>
                {(data &&
                  data.length > 0 &&
                  data.map((item) => (
                    <C.TableRow
                      key={`tr-${item.id}`}
                      style={{
                        ...(item.tipo === "E"
                          ? { backgroundColor: "#edf7ed", color: "#1e4620" }
                          : { backgroundColor: "#fdeded", color: "#5f2120" }),
                      }}
                    >
                      <C.TableCell>{item.tipo === "E" ? "Entrada" : "Saída"}</C.TableCell>
                      <C.TableCell>{new Date(item.data).toLocaleDateString()}</C.TableCell>
                      <C.TableCell>{item.descricao}</C.TableCell>
                      <C.TableCell>{item.valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</C.TableCell>
                    </C.TableRow>
                  ))) || (
                  <C.TableRow>
                    <C.TableCell colSpan={3}>Nenhum registro para exibir</C.TableCell>
                  </C.TableRow>
                )}
              </C.TableBody>
            </C.Table>
          </C.Grid>
        </C.Grid>
      </C.Paper>
    </C.Box>
  );
};

export default Movimentacao;
