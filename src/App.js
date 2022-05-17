import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import validateSession from "./bin/utils/validateSession";
import * as C from "@mui/material";
import * as I from "@mui/icons-material";

const HomePage = lazy(() => import("./pages"));
const LoginPage = lazy(() => import("./pages/login"));
const FormCaixaPage = lazy(() => import("./pages/formCaixa"));
const FormMovimentoPage = lazy(() => import("./pages/formMovimento"));

const pages = [
  { href: "/caixa/form", name: "+ Cadastrar Caixa" },
  { href: "/movimento/form", name: "+ Lançar Movimentação" },
];

function App() {
  Promise.resolve(validateSession.isLoggedUser());

  const handleLogout = () => {
    validateSession.destroySession();
  };
  return (
    <div className="App">
      {window.location.pathname !== "/login" && (
        <header>
          <C.AppBar position="static">
            <C.Container maxWidth="xl">
              <C.Toolbar sx={{ gap: 5 }}>
                <C.Typography textAlign="start" sx={{ flex: 1 }}>
                  Controle de Caixa
                </C.Typography>
                <C.Box sx={{ flexGrow: 0 }}>
                  <C.Tooltip title="Sair">
                    <C.IconButton onClick={handleLogout} sx={{ p: 0 }}>
                      <I.Logout sx={{ fontSize: "2.5rem", color: "#fff" }} />
                    </C.IconButton>
                  </C.Tooltip>
                </C.Box>
              </C.Toolbar>
            </C.Container>
          </C.AppBar>
          <C.Box>
            <C.Paper className="options">
              {pages.map((page) => (
                <C.Link href={page.href} key={page.href} variant="outlined" color="inherit">
                  <C.Typography textAlign="center">{page.name}</C.Typography>
                </C.Link>
              ))}
            </C.Paper>
          </C.Box>
        </header>
      )}
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/caixa/form" element={<FormCaixaPage />} />
        <Route path="/movimento/form" element={<FormMovimentoPage />} />
      </Routes>
    </div>
  );
}

export default App;
